export const STATUS_ACCESS_LIST = [
  {
    label: "Enabled",
    value: "ENABLED",
  },
  {
    label: "Disabled",
    value: "DISABLED",
  },
  {
    label: "Request Access",
    value: "REQUESTED",
  },
] as const;

export type statusAccessType = (typeof STATUS_ACCESS_LIST)[number]["value"];

export const ACCESS_LEVEL_LIST = [
  {
    label: "Regular",
    value: "REGULAR",
  },
  {
    label: "Admin",
    value: "ADMIN",
  },
  {
    label: "Role Rest User",
    value: "ROLE_REST_USER",
  },
] as const;
export type accessLevelType = (typeof ACCESS_LEVEL_LIST)[number]["value"];

export const PASSWORD_PATTERN =
  "^(?=.*[A-Z])(?=.*\\d)(?=.*[.,!@#$%^&\\+=\\-_])[A-Za-z\\d.,!@#$%^&\\+=\\-_]{8,}$" as const;
