import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UserDto } from 'src/models/user.dto';
import { UserService } from 'src/services/user.service';

// TODO : https://docs.nestjs.com/controllers https://wikidocs.net/148192

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get('/:userId')
  // getUser(@Param('userId') userId: string, @Res() res: Response) {
  //   res.status(HttpStatus.OK);

  //   this.userService
  //     .findUser(userId)
  //     .then((m) => {
  //       res.status(HttpStatus.OK).json(m);
  //     })
  //     .catch((err) => {
  //       res.status(HttpStatus.BAD_REQUEST).send();
  //       console.log(err);
  //     });
  // }

  @Get('/:userName')
  async getUserByName(
    @Param('userName') userName: string,
    @Res() res: Response,
  ) {
    console.log('find user :', userName);
    this.userService
      .findUserByUsername(userName)
      .then((userDto) => {
        res.status(HttpStatus.OK).json(userDto).send();
      })
      .catch((err) => {
        console.log(err);
        res.status(HttpStatus.BAD_GATEWAY).send();
      });
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
      res.status(HttpStatus.OK).json(user).send();
    } catch (err) {
      console.log(err);
      res.status(HttpStatus.BAD_GATEWAY).send();
    }
  }
}
