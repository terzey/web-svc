import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Gauge, LabelValues, Summary } from 'prom-client';
import {
  Build,
  HttpRequestDurationSeconds,
  MemoryLimitBytes,
  MemoryBytes,
  MemoryPercents,
  ProcessCpuLimitSeconds,
  ProcessCpuPercents,
  ProcessCpuSecondsTotal,
  UptimeSeconds,
} from './metrics';
import { AppConfigService } from '../app-config/app-config.service';
import { uptime, memoryUsage, cpuUsage, hrtime } from 'node:process';

interface ICpuTick {
  timeNanoseconds: bigint;
  cpuTimeMicroseconds: number;
}

@Injectable()
export class MetricsService implements OnApplicationBootstrap {
  constructor(
    private appConfigService: AppConfigService,
    @InjectMetric(HttpRequestDurationSeconds.name)
    private httpRequestDuration: Summary<string>,
    @InjectMetric(UptimeSeconds.name)
    private uptime: Gauge<string>,
    @InjectMetric(Build.name)
    private build: Gauge<string>,
    @InjectMetric(MemoryBytes.name)
    private memoryBytes,
    @InjectMetric(MemoryPercents.name)
    private memoryPercents,
    @InjectMetric(MemoryLimitBytes.name)
    private memoryLimitBytes,
    @InjectMetric(ProcessCpuSecondsTotal.name)
    private processCpuSecondsTotal,
    @InjectMetric(ProcessCpuLimitSeconds.name)
    private processCpuLimitSeconds,
    @InjectMetric(ProcessCpuPercents.name)
    private processCpuPercents,
  ) {}

  private lastCpuTick: ICpuTick;

  httpRequestStartTimer(): (labels?: LabelValues<string>) => void {
    return this.httpRequestDuration.startTimer();
  }

  observeCustomMetrics() {
    this.uptime.set(uptime());
    const rssBytes = memoryUsage.rss();
    this.memoryBytes.set(rssBytes);
    this.memoryPercents.set(
      (100.0 * rssBytes) / this.appConfigService.getMemoryLimitBytes(),
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
      this.processCpuPercents.set(100 * cpuUsage);
    }
    this.processCpuSecondsTotal.set(cpuTimeMicroseconds * 1e-6);
    this.lastCpuTick = {
      timeNanoseconds,
      cpuTimeMicroseconds,
    };
  }

  onApplicationBootstrap(): any {
    const { version, chartVersion, branch, timestamp, commit } =
      this.appConfigService.getBuild();
    this.build.set({ version, chartVersion, branch, timestamp, commit }, 1);
    this.memoryLimitBytes.set(this.appConfigService.getMemoryLimitBytes());
    this.processCpuLimitSeconds.set(
      this.appConfigService.getCpuLimitMilliseconds() * 1e-3,
    );
  }
}
