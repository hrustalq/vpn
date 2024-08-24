import { LoginPayload } from "./login";
import { SignupPayload } from "./signup";

export * from "./login";
export * from "./signup";
export * from "./token-parsed";

export default {
  async login(credentials: LoginPayload) {
    return await import("./login").then((module) =>
      module.default(credentials),
    );
  },
  async signup(credentials: SignupPayload) {
    return await import("./signup").then((module) =>
      module.default(credentials),
    );
  },
  async tokenParsed() {
    return await import("./token-parsed").then((module) => module.default());
  },
};
