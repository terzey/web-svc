import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigException } from '../common/types/ConfigException';
import { dirname, join } from 'path';
import { readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { version as appVersion } from '../../package.json';
import { IVersion } from './types';

interface EnvironmentVariables {
  MEMORY_LIMIT_MB: number;
  CPU_LIMIT_MILLISECONDS: number;
  MEMORY_THRESHOLD_PERCENT: number;
  CHART_VERSION: string;
}

interface ICache {
  version: IVersion;
  cpuLimitMilliseconds: number;
  memoryLimitBytes: number;
  memoryThresholdPercents: number;
}

@Injectable()
export class AppConfigService implements OnModuleInit {
  constructor(private configService: ConfigService<EnvironmentVariables>) {}

  private cache: ICache;

  getCpuLimitMilliseconds() {
    return this.cache.cpuLimitMilliseconds;
  }

  getMemoryLimitBytes() {
    return this.cache.memoryLimitBytes;
  }

  getMemoryThresholdPercents() {
    return this.cache.memoryThresholdPercents;
  }

  getVersion(): IVersion {
    return this.cache.version;
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
    let version: IVersion;
    try {
      const dir = dirname(module.filename);
      const path = join(dir, '../../build.json');
      const content = readFileSync(path).toString();
      const { branch, timestamp, commit } = JSON.parse(content);
      version = {
        version: appVersion,
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
      version,
    };
  }

  onModuleInit(): any {
    this.loadCache();
  }
}
