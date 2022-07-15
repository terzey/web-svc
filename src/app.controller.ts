import { Controller, Get } from '@nestjs/common';
import { AppService, IVersion } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/self/version')
  getVersion(): IVersion {
    return this.appService.getVersion();
  }
}
