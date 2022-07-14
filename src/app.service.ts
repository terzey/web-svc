import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { version } from '../package.json';
import { ConfigException } from './common/types/ConfigException';

export interface IVersion {
  version: string;
  branch: string;
  timestamp: string;
  commit: string;
}

@Injectable()
export class AppService implements OnApplicationBootstrap {
  private version;

  getHello(): string {
    return 'Hello World!';
  }

  getVersion(): IVersion {
    return this.version;
  }

  onApplicationBootstrap(): any {
    const dir = dirname(module.filename);
    const path = join(dir, '../build.json');
    try {
      const build = readFileSync(path).toString();
      const { branch, timestamp, commit } = JSON.parse(build);
      this.version = {
        version,
        branch,
        timestamp,
        commit,
      };
    } catch (e) {
      throw new ConfigException(`Cannot read build file. Error: ${e}`);
    }
  }
}
