import {
  BadRequestException,
  Injectable,
  OnApplicationBootstrap,
} from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Gauge, LabelValues, Summary } from 'prom-client';
import {
  PREFIX,
  Build,
  HttpRequestDurationSeconds,
  MemoryLimitBytes,
  MemoryBytes,
  MemoryUsageRatio,
  ProcessCpuLimitSeconds,
  ProcessCpuUsageRatio,
  ProcessCpuSecondsTotal,
  UptimeSeconds,
  HttpRequestCountTotal,
  Watchdog,
} from './metrics';
import { AppConfigService } from '../app-config/app-config.service';
import { uptime, memoryUsage, cpuUsage, hrtime } from 'node:process';

interface ICpuTick {
  timeNanoseconds: bigint;
  cpuTimeMicroseconds: number;
}

export enum WatchdogValue {
  Off = 0,
  On = 1,
}

const watchdogRegexp = new RegExp(`^\\s*${PREFIX}_watchdog\\s+([01])\\s*$`);
const commentLineRegexp = new RegExp(`^\\s*#.*$`);

@Injectable()
export class MetricsService implements OnApplicationBootstrap {
  constructor(
    private appConfigService: AppConfigService,
    @InjectMetric(HttpRequestDurationSeconds.name)
    private httpRequestDuration: Summary<string>,
    @InjectMetric(HttpRequestCountTotal.name)
    private httpRequestCountTotal: Counter<string>,
    @InjectMetric(UptimeSeconds.name)
    private uptime: Gauge<string>,
    @InjectMetric(Build.name)
    private build: Gauge<string>,
    @InjectMetric(MemoryBytes.name)
    private memoryBytes: Gauge<string>,
    @InjectMetric(MemoryUsageRatio.name)
    private memoryUsageRatio: Gauge<string>,
    @InjectMetric(MemoryLimitBytes.name)
    private memoryLimitBytes: Gauge<string>,
    @InjectMetric(ProcessCpuSecondsTotal.name)
    private processCpuSecondsTotal: Gauge<string>,
    @InjectMetric(ProcessCpuLimitSeconds.name)
    private processCpuLimitSeconds: Gauge<string>,
    @InjectMetric(ProcessCpuUsageRatio.name)
    private processCpuUsageRatio: Gauge<string>,
    @InjectMetric(Watchdog.name)
    private watchdog: Gauge<string>,
  ) {}

  private lastCpuTick: ICpuTick;
  private watchdogValue: WatchdogValue;

  httpRequestStartTimer(): (labels?: LabelValues<string>) => void {
    return this.httpRequestDuration.startTimer();
  }

  getHttpRequestCountTotal(): Counter<string> {
    return this.httpRequestCountTotal;
  }

  setMetrics(value: string): boolean {
    let watchdogValue = this.watchdogValue;
    if (!value) {
      return false;
    }
    value.split('\n').forEach((line) => {
      if (line.match(commentLineRegexp)) {
        return;
      }
      const match = line.match(watchdogRegexp);
      if (!match) {
        throw new BadRequestException(`Failed to parse metric: "${line}"`);
      }
      watchdogValue = parseInt(match[1], 10);
    });
    const modified = watchdogValue !== this.watchdogValue;
    if (modified) {
      this.watchdogValue = watchdogValue;
      this.watchdog.set(watchdogValue);
    }
    return modified;
  }

  observeCustomMetrics() {
    this.uptime.set(uptime());
    const rssBytes = memoryUsage.rss();
    this.memoryBytes.set(rssBytes);
    this.memoryUsageRatio.set(
      rssBytes / this.appConfigService.getMemoryLimitBytes(),
    );
    const { user, system } = cpuUsage();
    const timeNanoseconds = hrtime.bigint();
    const cpuTimeMicroseconds = user + system;
    if (this.lastCpuTick) {
      const timeDurationMicroseconds = Number(
        (timeNanoseconds - this.lastCpuTick.timeNanoseconds) / 1000n,
      );
      const cpuDurationMicroseconds =
        cpuTimeMicroseconds - this.lastCpuTick.cpuTimeMicroseconds;
      const cpuUsage =
        cpuDurationMicroseconds /
        timeDurationMicroseconds /
        (this.appConfigService.getCpuLimitMilliseconds() / 1000);
      this.processCpuUsageRatio.set(cpuUsage);
    }
    this.processCpuSecondsTotal.set(cpuTimeMicroseconds * 1e-6);
    this.lastCpuTick = {
      timeNanoseconds,
      cpuTimeMicroseconds,
    };
  }

  onApplicationBootstrap(): any {
    const { version, chartVersion, branch, timestamp, commit } =
      this.appConfigService.getVersion();
    this.build.set({ version, chartVersion, branch, timestamp, commit }, 1);
    this.memoryLimitBytes.set(this.appConfigService.getMemoryLimitBytes());
    this.processCpuLimitSeconds.set(
      this.appConfigService.getCpuLimitMilliseconds() * 1e-3,
    );
    this.watchdogValue = WatchdogValue.Off;
    this.watchdog.set(this.watchdogValue);
  }
}
