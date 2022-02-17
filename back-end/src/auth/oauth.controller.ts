import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GoogleOauthGuard } from './oauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('google') // 1
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect') // 2
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req, @Res() res: Response) {
    console.log(req.user);
    res.cookie('access_token', req.user.accessToken);
    this.authService.signInWithGoogle(req);
    res.redirect('http://localhost:8080');
  }
}
