import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
import { AccountController } from './controllers/account.controller';
import { AccountService } from './services/account.service';
@Module({
  imports: [],
  controllers: [AppController, SampleController, AccountController],
  providers: [AppService, SampleService, AccountService],
})
export class AppModule {}
