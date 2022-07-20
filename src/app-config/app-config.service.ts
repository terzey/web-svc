import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigException } from '../common/types/ConfigException';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { version } from '../../package.json';

interface EnvironmentVariables {
  MEMORY_LIMIT_MB: number;
  CPU_LIMIT_MILLISECONDS: number;
  MEMORY_THRESHOLD_PERCENT: number;
  CHART_VERSION: string;
}

export interface IBuild {
  version: string;
  chartVersion: string;
  branch: string;
  timestamp: string;
  commit: string;
}

interface ICache {
  build: IBuild;
  cpuLimitMilliseconds: number;
  memoryLimitBytes: number;
  memoryThresholdPercents: number;
}

@Injectable()
export class AppConfigService implements OnModuleInit {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  private cache: ICache;

  private build: IBuild;

  getCpuLimitMilliseconds() {
    return this.cache.cpuLimitMilliseconds;
  }

  getMemoryLimitBytes() {
    return this.cache.memoryLimitBytes;
  }

  getMemoryThresholdPercents() {
    return this.cache.memoryThresholdPercents;
  }

  getBuild(): IBuild {
    return this.cache.build;
  }

  private getEnvAsInt(name): number {
    const text = this.configService.get(name);
    const res = Number.parseInt(text, 10);
    if (Number.isNaN(res)) {
      throw new ConfigException(
        `Cannot read environment variable "${name}" "${text}" is not an integer`,
      );
    }
    return res;
  }

  private getEnvAsFloat(name): number {
    const text = this.configService.get(name);
    const res = Number.parseFloat(text);
    if (Number.isNaN(res)) {
      throw new ConfigException(
        `Cannot read environment variable "${name}" "${text}" is not a float`,
      );
    }
    return res;
  }

  private loadCache() {
    let build: IBuild;
    try {
      const dir = dirname(module.filename);
      const path = join(dir, '../../build.json');
      const content = readFileSync(path).toString();
      const { branch, timestamp, commit } = JSON.parse(content);
      build = {
        version,
        chartVersion: this.configService.get('CHART_VERSION'),
        branch,
        timestamp,
        commit,
      };
    } catch (e) {
      throw new ConfigException(`Cannot read build file. Error: ${e}`);
    }

    this.cache = {
      cpuLimitMilliseconds: this.getEnvAsFloat('CPU_LIMIT_MILLISECONDS'),
      memoryLimitBytes: this.getEnvAsInt('MEMORY_LIMIT_MB') * 1024 * 1024,
      memoryThresholdPercents:
        this.getEnvAsInt('MEMORY_THRESHOLD_PERCENT') / 100,
      build,
    };
  }

  onModuleInit(): any {
    this.loadCache();
  }
}
