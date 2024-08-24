export class UserEntity {
  id: string;

  name: string | null;

  email: string;

  emailVerified: Date | null;

  password: string | null;

  image: string | null;
}
