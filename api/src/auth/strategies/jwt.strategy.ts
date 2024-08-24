import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { jwtModuleConfig } from '../config';
import { JwtPayload } from '../entities/jwt.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtModuleConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const isBlacklisted = await this.authService.validateToken(payload.jti);
    if (isBlacklisted) throw new UnauthorizedException('Token blacklisted');
    return this.usersService.findUserByEmail(payload.sub);
  }
}
