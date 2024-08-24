import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { Public } from 'src/_common/decorators/is-public.decorator';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/users/entities/user.entity';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalGuard)
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  async login(@Body() dto: { login: string }, @Res() res: Response) {
    const { accessToken, refreshToken } = await this.authService.login({
      provider: 'local',
      login: dto.login,
    });
    res
      .cookie('refreshToken', refreshToken, {
        sameSite: true,
        secure: true,
        httpOnly: true,
      })
      .send(accessToken);
  }

  @UseGuards(AuthGuard('yandex'))
  @Get('login/yandex')
  loginYandex() {}

  @UseGuards(AuthGuard('google'))
  @Get('login/google')
  loginGoogle() {}

  @Get('login/google/callback')
  @UseGuards(AuthGuard('google'))
  async googleCallback(@Req() req: Request, @Res() res: Response) {
    const { user } = req;
    const { accessToken, refreshToken } = await this.authService.login({
      provider: 'google',
      login: (user as { email: string }).email,
    });
    res
      .cookie('refreshToken', refreshToken, {
        sameSite: true,
        secure: true,
        httpOnly: true,
      })
      .redirect(`/?token=${accessToken}`);
  }

  @Get('login/yandex/callback')
  @UseGuards(AuthGuard('yandex'))
  async yandexCallback(@Req() req: Request, @Res() res: Response) {
    const { user } = req;
    // Handle the callback from Yandex OAuth2
    const { accessToken, refreshToken } = await this.authService.login({
      provider: 'yandex',
      login: (user as { email: string }).email,
    });
    res
      .cookie('refreshToken', refreshToken, {
        sameSite: true,
        secure: true,
        httpOnly: true,
      })
      .redirect(`/?token=${accessToken}`);
  }

  @Post('signup')
  @Public()
  async signUp(@Res() res: Response, @Body() dto: Omit<CreateUserDto, 'role'>) {
    const find = await this.usersService.findUserByEmail(dto.email);

    if (find) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const user = await this.usersService.create(dto);
    if (!user) {
      throw new InternalServerErrorException();
    }
    const { accessToken, refreshToken } = await this.authService.login({
      provider: 'credentials',
      login: user.email,
    });
    res
      .cookie('refreshToken', refreshToken, {
        sameSite: true,
        secure: true,
        httpOnly: true,
      })
      .send(accessToken);
  }

  @Get('status')
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    return req.user;
  }

  @Get('tokenParsed')
  @UseGuards(JwtGuard)
  tokenParsed(@Req() req: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...data } = req.user as UserEntity;
    return data;
  }

  @Get('refresh')
  refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.headers.cookie?.split('=')?.[1];
    if (!refreshToken) throw new UnauthorizedException('Token expired');

    const tokenParsed = this.authService.validateRefreshToken(refreshToken);
    if (!tokenParsed) throw new UnauthorizedException('Invalid token');

    const { sub } = tokenParsed;

    return this.login({ login: sub }, res);
  }

  @Get('logout')
  @HttpCode(HttpStatus.RESET_CONTENT)
  @UseGuards(JwtGuard)
  async logout(
    @Headers('Authorization') bearerToken: string,
    @Res() res: Response,
  ) {
    const token = bearerToken.split(' ')[1];
    await this.authService.logout(token);
    res
      .clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        path: '/',
      })
      .send();
  }
}
