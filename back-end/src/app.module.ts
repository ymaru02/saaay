import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { SampleController } from './controllers/sample.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestUser } from './entity/sample/user.entity';
import { TestTodo } from './entity/sample/todo.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TypeOrmModule.forFeature([TestUser]),
    TypeOrmModule.forFeature([TestTodo]),
  ],
  controllers: [AppController, SampleController],
  providers: [AppService, SampleService],
})
export class AppModule {}
