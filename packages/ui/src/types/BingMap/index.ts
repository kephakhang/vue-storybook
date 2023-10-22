const mapTypeIds = [
  "aerial",
  "birdseye",
  "canvasDark",
  "canvasLight",
  "grayscale",
  "mercator",
  "ordnanceSurvey",
  "road",
  "streetside",
] as const;

export type MapTypeId = (typeof mapTypeIds)[number];

export type Pushpin<T> = {
  location: Pick<Microsoft.Maps.Location, "latitude" | "longitude">;
  options?: Microsoft.Maps.IPushpinOptions;
  custom?: {
    disabled?: boolean;
    data?: T;
  };
};

export type PushpinEventKey =
  | "changed"
  | "click"
  | "dblclick"
  | "drag"
  | "dragend"
  | "dragstart"
  | "mousedown"
  | "mouseout"
  | "mouseover"
  | "mouseup";

export type PushpinEvent<T> = {
  [key in PushpinEventKey]?: (args: {
    event:
      | Microsoft.Maps.IMouseEventArgs
      | Microsoft.Maps.IPrimitiveChangedEventArgs;
    pushpin: Microsoft.Maps.Pushpin;
    data?: T;
  }) => void;
};
