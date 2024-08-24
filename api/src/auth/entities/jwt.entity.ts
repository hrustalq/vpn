export interface JwtPayload {
  iss: string;
  jti: string;
  sub: string;
  exp: number;
  iat: number;
}
