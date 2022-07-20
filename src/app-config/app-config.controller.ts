import { Controller, Get } from '@nestjs/common';
import { IVersion } from './types';
import { AppConfigService } from './app-config.service';

@Controller('app-config')
export class AppConfigController {
  constructor(private appConfigService: AppConfigService) {}

  @Get('/self/version')
  getBuild(): IVersion {
    return this.appConfigService.getVersion();
  }
}
