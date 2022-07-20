import { Test, TestingModule } from '@nestjs/testing';
import { AppConfigController } from './app-config.controller';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from './app-config.service';

describe('AppConfigController', () => {
  let controller: AppConfigController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppConfigController],
      providers: [ConfigService, AppConfigService],
    }).compile();

    controller = module.get<AppConfigController>(AppConfigController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
