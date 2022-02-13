import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AppService } from './app.service';
import { SampleService } from './services/sample.service';
import { TodoDto } from './models/todo.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly sampleService: SampleService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }

  @Get('/sample')
  getSample(): TodoDto[] {
    return this.sampleService.getTodos();
  }

  @Post('/sample')
  createTodo(@Body() params: { text: string }): TodoDto {
    console.log(params.text);
    return this.sampleService.createTodo(params.text);
  }
}
