import { z } from "zod";
import { zaxios } from "~/utils/axios";

// TODO: Fix response schema
const loginWithEmailResponseSchema = zaxios.response(z.object({}));
type LoginWithEmailResponse = z.infer<typeof loginWithEmailResponseSchema>;

abstract class LoginBaseApi {
  abstract loginWithEmail(
    email: string,
    password: string
  ): Promise<LoginWithEmailResponse>;
}

class LoginApi extends LoginBaseApi {
  // TODO: Should be changed login logic after server implemented.
  loginWithEmail: LoginBaseApi["loginWithEmail"] = async (
    email: string,
    password: string
  ) => {
    return zaxios.post(loginWithEmailResponseSchema, "/login", {
      username: email,
      password,
    });
  };
}

class LoginMockApi extends LoginBaseApi {
  loginWithEmail: LoginBaseApi["loginWithEmail"] = async (
    email: string,
    password: string
  ) => {
    console.log("🚀 ~ file: index.ts:33 ~ LoginMockApi ~ email:", email);
    console.log("🚀 ~ file: index.ts:33 ~ LoginMockApi ~ password:", password);
    return new Promise((res) => {
      setTimeout(() => {
        res({
          data: {},
        });
      }, 500);
    });
  };
}

export const loginApi = import.meta.env.DEV
  ? new LoginMockApi()
  : new LoginApi();
