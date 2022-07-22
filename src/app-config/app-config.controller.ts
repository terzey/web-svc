import { Controller, Get } from '@nestjs/common';
import { IVersion } from './types';
import { AppConfigService } from './app-config.service';

@Controller('/self/version')
export class AppConfigController {
  constructor(private appConfigService: AppConfigService) {}

  @Get()
  getBuild(): IVersion {
    return this.appConfigService.getVersion();
  }
}
