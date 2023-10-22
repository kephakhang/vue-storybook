/**
 * Category Types
 */
export type CategoryTypes =
  | "DOWNTIME"
  | "REGISTERED"
  | "UNCONFIRMED"
  | "CONFIRMED"
  | "HIGH"
  | "MEDIUM"
  | "LOW"
  | "PROLONGED"
  | "HIGH_RISK"
  | "MEDIUM_RISK"
  | "LOW_RISK"
  | "OVERDUE"
  | "UPCOMING"
  | "REQUESTED"
  | "DECLINED"
  | "CANCELLED"
  | "INACTIVE"
  | "PENDING"
  | "PENDING_APPROVAL"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "IN_PRODUCTION"
  | "IDLE"
  | "SENSOR_OFFLINE"
  | "SENSOR_DETACHED"
  | "NO_SENSOR"
  | "ON_STANDBY"
  | "CHANGED"
  | "DISPOSED"
  | "DISABLED"
  | "IN_USE"
  | "NOT_IN_USE"
  | "FAILURE"
  | "DISCARDED";

/**
 * Category style  maping
 */
export type CategoryToStyleMapType = {
  [key in CategoryTypes]:
    | "red"
    | "yellow"
    | "green"
    | "black"
    | "gray"
    | "dark_gray"
    | "purple_gray"
    | "purple"
    | "blue"
    | "orange"
    | "brown"
    | "black_bordered_gray"
    | "red_bordered_gray"
    | "black_bordered_white"
    | "red_dashed_white"
    | "light_orange"
    | "light_gray"
    | "light_blue";
};
