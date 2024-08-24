import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtModuleConfig = {
  secret: process.env.JWT_SECRET,
  signOptions: {
    expiresIn: '15m',
  },
} satisfies JwtModuleOptions;

export const googleAuthConfig = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_CLIENT_SECRET,
  callbackUrl: `${process.env.APP_ORIGIN}:${process.env.APP_PORT}/auth/login/google/callback`,
};
