import type { StyleValue } from "~/types/common";

/**
 * export type of icon tab icon size small/large
 */
export type TabIconSize = "small" | "large";
/**
 * export type of tab icon style horizontal/vertical
 */
export type TabIconStyle = "horizontal" | "vertical";
/**
 * export type of tab button
 */
export type TabButtonType = {
  title: string;
  icon: string;
  active?: boolean;
  iconStyle?: StyleValue;
};
