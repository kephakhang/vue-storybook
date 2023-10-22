/**
 * export size of tab module small or large
 */
export type TabModuleType = "primary-tab" | "secondary-tab";

/**
 * export style of tab number horizontal or vertical
 */
export type TabModuleStyle = "horizontal" | "vertical";

/**
 * export tab button type
 */
export type TabButtonType = {
  title: string;
  icon: string;
  active?: boolean;
};
