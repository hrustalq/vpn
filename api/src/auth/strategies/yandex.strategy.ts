import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-yandex';

@Injectable()
export class YandexStrategy extends PassportStrategy(Strategy, 'yandex') {
  constructor() {
    super({
      clientID: 'your-yandex-client-id',
      clientSecret: 'your-yandex-client-secret',
      callbackURL: 'http://localhost:3000/auth/yandex/callback',
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (
      error: string | null,
      user: {
        id: string;
        displayName: string;
        email: string;
        accessToken: string;
      },
    ) => void,
  ) {
    const { id, displayName, emails } = profile;
    const user = {
      id,
      displayName,
      email: emails[0].value,
      accessToken,
    };
    done(null, user);
  }
}
