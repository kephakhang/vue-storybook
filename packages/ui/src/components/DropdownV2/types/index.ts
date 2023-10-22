import type { Ref } from "@vue/composition-api";
import type { CSSProperties } from "~/types/common";

export type DropdownPosition =
  | "auto"
  | "top"
  | "top-left"
  | "top-right"
  | "bottom"
  | "bottom-left"
  | "bottom-right"
  | "left"
  | "left-top"
  | "left-bottom"
  | "right"
  | "right-top"
  | "right-bottom";

export interface DropdownMenuProvideValue {
  open: Ref<boolean>;
  position: Ref<DropdownPosition>;
  distance: number;
  maxWidth?: CSSProperties["maxWidth"];
  onOpenToggle?: () => void;
  onClose?: () => void;
  triggerElement: Ref<HTMLElement | null>;
}
