import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { googleAuthConfig } from '../config';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: googleAuthConfig.clientId,
      clientSecret: googleAuthConfig.secret,
      callbackURL: googleAuthConfig.callbackUrl,
      scope: ['email', 'profile'],
    });
  }
}
