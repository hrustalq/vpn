export interface TokenParsedResponse {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
}
