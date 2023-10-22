import type { InjectionKey } from "@vue/composition-api";
import type { DropdownMenuProvideValue } from "~/components/DropdownV2/types";

export const DropdownContextKey =
  Symbol() as InjectionKey<DropdownMenuProvideValue>;
