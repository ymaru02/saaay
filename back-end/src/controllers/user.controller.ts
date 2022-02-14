import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticationError } from 'src/error/authentication.error';
import { ResourceError } from 'src/error/resource.error';
import { UserDto } from 'src/models/user.dto';
import { UserService } from 'src/services/user.service';

// TODO : https://docs.nestjs.com/controllers https://wikidocs.net/148192

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/:userName')
  async searchUsername(
    @Param('userName') userName: string,
    @Res() res: Response,
  ) {
    console.log('search user :', userName);
    try {
      const userDtos = await this.userService.findUserByUsername(userName);
      res.status(HttpStatus.OK).json(userDtos);
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.BAD_GATEWAY).send();
    }
  }

  @Post('/email')
  async searchEmail(@Body() params: { email: string }, @Res() res: Response) {
    try {
      const userDto = await this.userService.findUserByEmail(params.email);
      res.status(HttpStatus.OK).json(userDto);
    } catch (err) {
      console.log(err);
      if (err instanceof ResourceError) {
        res.status(err.httpStatus).json(err);
      } else {
        res.status(HttpStatus.BAD_GATEWAY).send();
      }
    }
  }

  @Post('/signup')
  async signup(@Body() userDto: UserDto, @Res() res: Response) {
    console.log('create user :', userDto);
    try {
      const newUser = await this.userService.createUser(userDto);
      res.status(HttpStatus.CREATED).json(newUser).send();
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.BAD_GATEWAY).send();
    }
  }

  @Post('/login')
  async signin(@Body() userDto: UserDto, @Res() res: Response) {
    console.log('login user :', userDto);
    try {
      const user = await this.userService.signinUser(userDto);
      // TODO : Login Token
      res.status(HttpStatus.OK).json(user).send();
    } catch (err) {
      console.log(err.toString());
      if (err instanceof AuthenticationError) {
        res.status(err.httpStatus).json(err);
      } else {
        res.status(HttpStatus.BAD_GATEWAY).send();
      }
    }
  }

  @Put('/profile')
  @UseGuards(JwtAuthGuard)
  async editProfile(@Body() userDto: UserDto, @Res() res: Response) {
    console.log('edit profile :', userDto);
    try {
      const updatedUser = await this.userService.editProfile(userDto);
      res.status(HttpStatus.OK).json(updatedUser);
    } catch (err) {
      console.log(err);
    }
  }

  @Patch('/user/password')
  @UseGuards(JwtAuthGuard)
  async editPassword(@Body() userDto: UserDto, @Res() res: Response) {
    console.log('edit password :', userDto);
    try {
      await this.userService.editPassword(userDto);
      res.status(HttpStatus.OK).send();
    } catch (err) {
      console.log(err);
    }
  }
}
