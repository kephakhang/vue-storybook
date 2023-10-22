export type WidgetGroupSize = "large" | "medium" | "small";
export type WidgetChildrenInfo = {
  [key: string]: WidgetChildInfo;
};
export type WidgetChildInfo = {
  size: number;
};
