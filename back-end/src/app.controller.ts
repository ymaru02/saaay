import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';

@Controller()
export class AppController {
  private sampleService: SampleService = new SampleService();
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
