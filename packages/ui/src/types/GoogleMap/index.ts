export type MarkerEventKey =
  | "animation_changed"
  | "click"
  | "clickable_changed"
  | "contextmenu"
  | "cursor_changed"
  | "dblclick"
  | "drag"
  | "dragend"
  | "draggable_changed"
  | "dragstart"
  | "flat_changed"
  | "icon_changled"
  | "mousedown"
  | "mouseout"
  | "mouseover"
  | "mouseup"
  | "position_changed"
  | "shape_changed"
  | "title_changed"
  | "visible_changed"
  | "zindex_changed";

export type MapEventKey =
  | "bounds_changed"
  | "center_changed"
  | "click"
  | "contextmenu"
  | "dblclick"
  | "drag"
  | "dragend"
  | "dragstart"
  | "heading_changed"
  | "idle"
  | "isfractionalzoomenabled_changed"
  | "mapcapabilities_changed"
  | "maptypeid_changed"
  | "mousemove"
  | "mouseout"
  | "mouseover"
  | "projection_changed"
  | "renderingtype_changed"
  | "tilesloaded"
  | "tilt_changed"
  | "zoom_changed";

export type MarkerListType<T> = {
  custom?: {
    disabled?: boolean;
    data?: T;
  };
  markerOptions: google.maps.MarkerOptions;
};

export type MarkerEventType<T> = {
  [key in MarkerEventKey]?: (args: {
    event: google.maps.MapMouseEvent;
    marker: google.maps.Marker;
    data?: T;
  }) => void;
};

export type MapEventType = {
  [key in MapEventKey]?: (event: google.maps.MapMouseEvent) => void;
};
