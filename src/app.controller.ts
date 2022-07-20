import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { AppConfigService, IBuild } from './app-config/app-config.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly appConfigService: AppConfigService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/self/build')
  getBuild(): IBuild {
    return this.appConfigService.getBuild();
  }
}
