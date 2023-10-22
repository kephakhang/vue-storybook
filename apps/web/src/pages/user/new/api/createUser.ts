import { z } from "zod";
import { zaxios } from "~/utils/axios";
import { type statusAccessType, type accessLevelType } from "../types";

const statusAccessEnumSchema: z.ZodType<statusAccessType> = z.enum([
  "ENABLED",
  "DISABLED",
  "REQUESTED",
]);

const accessLevelSchema: z.ZodType<accessLevelType> = z.enum([
  "REGULAR",
  "ADMIN",
  "ROLE_REST_USER",
]);

const CreateUserInputSchema = z.object({
  status: statusAccessEnumSchema,
  accessLevel: accessLevelSchema,
  mobileDialingCode: z.string(),
  name: z.string(),
  email: z.string(),
  password: z.string(),
  passwordConfirm: z.string(),
  department: z.string(),
  position: z.string(),
  mobileNumber: z.string().optional(),
  companyId: z.number(),
  companyName: z.string(),
  companyType: z.string(),
  memo: z.string().optional(),
});

const createUserResponseSchema = z.object({
  success: z.boolean(),
  message: z.string().optional(),
});
const createUserResponse = zaxios.response(createUserResponseSchema);

export type CreateUserInputInput = z.infer<typeof CreateUserInputSchema>;

type CreateUserResponse = z.infer<typeof createUserResponseSchema>;

abstract class CreateUserBaseApi {
  abstract createUser(data: CreateUserInputInput): Promise<CreateUserResponse>;
}

class CreateUserApi extends CreateUserBaseApi {
  override createUser = async (data: CreateUserInputInput) => {
    return zaxios
      .post(createUserResponse, "/api/common/usr-stp/one", data)
      .then((res) => res.data);
  };
}

class CreateUserMockApi extends CreateUserApi {
  sleep(ms = 200) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  override createUser = async (_data: CreateUserInputInput) => {
    await this.sleep();
    return createUserResponseSchema.parse({ success: true });
  };
}

export const createUserApi = import.meta.env.DEV
  ? new CreateUserMockApi()
  : new CreateUserApi();
