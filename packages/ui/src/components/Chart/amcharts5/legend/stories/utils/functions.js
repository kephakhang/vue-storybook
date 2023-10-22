export const legendMarkerRectanglesStrokeDashArrayAdapter = (
  strokeDasharray,
  target
) => {
  if (target.dataItem.dataContext.legendName === "DashArray") {
    return [2, 3];
  } else {
    return strokeDasharray;
  }
};
