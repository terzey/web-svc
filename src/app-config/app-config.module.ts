import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';
import { AppConfigController } from './app-config.controller';

@Module({
  imports: [ConfigModule.forRoot({ cache: true })],
  providers: [ConfigService, AppConfigService],
  exports: [AppConfigService],
  controllers: [AppConfigController],
})
export class AppConfigModule {}
