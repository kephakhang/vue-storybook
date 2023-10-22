export * from "./notification";

import { z } from "zod";
import { zaxios } from "~/utils/axios";

const basePermissionSchema = z.object({
  name: z.string(),
  url: z.string().nullable(),
  icon: z.string().nullable(),
  items: z.record(
    z
      .object({
        name: z.string(),
        type: z.string(),
        permitted: z.boolean(),
      })
      .partial()
  ),
});

type Permission = z.infer<typeof basePermissionSchema> & {
  children: Record<string, Permission>;
};

const permissionSchema: z.ZodType<Permission> = basePermissionSchema.extend({
  children: z.lazy(() => z.record(permissionSchema)),
});

const appInfoSchema = z.object({
  versions: z.array(
    z.object({
      version: z.string(),
      releaseDate: z.string(),
      items: z.array(z.object({ description: z.string() })),
    })
  ),
  server: z.string(),
  type: z.string(),
  localTimeZone: z.boolean(),
  language: z.string(),
  me: z.object({
    id: z.number(),
    name: z.string(),
    email: z.string().email(),
    admin: z.boolean(),
    company: z.object({
      id: z.number(),
      companyType: z.string(),
      companyCode: z.string(),
      name: z.string(),
      address: z.string(),
    }),
    notify: z.boolean(),
    accessRequest: z.boolean(),
    roles: z.array(
      z.object({
        id: z.number(),
        authority: z.string(),
        name: z.string(),
        description: z.string(),
        roleType: z.string(),
        roleTypeName: z.string(),
        // TOOD(sun.lee): Change type after finding types for `dashboardGroup`
        dashboardGroup: z.any(),
        menuIds: z.array(z.string()),
      })
    ),
    roleIds: z.array(z.string()),
    roleUserData: z.string(),
    contactDialingCountry: z.string(),
    mobileDialingCountry: z.string(),
  }),
  options: z
    .object({
      CLIENT: z.object({
        logoUrl: z.string(),
        worldMap: z.object({
          type: z.enum(["google", "amchart", "bing"]),
        }),
      }),
    })
    .passthrough(),
  menuPermissions: z.record(permissionSchema),
  messages: z.record(z.string()),
});
export type AppInfo = z.infer<typeof appInfoSchema>;

const appInfoResponseSchema = zaxios.response(appInfoSchema);
const systemCodesResponseSchema = zaxios.response(
  z.record(
    z.array(
      z.object({
        code: z.string().nullable(),
        title: z.string().nullable(),
        description: z.string().nullable(),
        enabled: z.boolean().nullable(),
      })
    )
  )
);
export type SystemCodes = z.infer<typeof systemCodesResponseSchema>["data"];

type AppInfoResponse = z.infer<typeof appInfoResponseSchema>;
type SystemCodesResponse = z.infer<typeof systemCodesResponseSchema>;

abstract class CommonBaseApi {
  abstract getAppInfo(): Promise<AppInfoResponse>;
  abstract getSystemCodes(): Promise<SystemCodesResponse>;
}

class CommonApi extends CommonBaseApi {
  override getAppInfo() {
    return zaxios.get(appInfoResponseSchema, "/api/common/man-pag");
  }
  override getSystemCodes() {
    return zaxios.get(systemCodesResponseSchema, "/api/codes");
  }
}

class CommonMockApi extends CommonBaseApi {
  override async getAppInfo() {
    const module = await import("./__mock__/man-pag.json");
    return appInfoResponseSchema.parse({ data: module.default });
  }
  override async getSystemCodes() {
    const module = await import("./__mock__/codes.json");
    return systemCodesResponseSchema.parse({ data: module.default });
  }
}

export const commonApi = import.meta.env.DEV
  ? new CommonMockApi()
  : new CommonApi();
