const html = String.raw;

// event
/**
 * @description column 에 hover 했을 때 동작할 event 입니다.
 * @param {*} event
 */
export const columnHoverEvent = (event) => {
  console.log(
    "event.target.dataItem.dataContext: ",
    event.target.dataItem.dataContext
  );
};

// adapter
export const legendMarkerRectanglesStrokeDashArrayAdapter = (
  strokeDasharray,
  target
) => {
  if (target.dataItem.dataContext.get("name") === "part 1") {
    return [3, 3];
  } else {
    return strokeDasharray;
  }
};

/**
 * @description series의 툴팁을 설정하는 adapter 입니다.
 * @param {*} tooltipHTML - 기존에 설정되어 있던 tooltip HTML 입니다.
 * @param {*} target - 데이터의 개별 항목입니다.
 */
export const seriesTooltipHTMLAdapter = (tooltipHTML, target) => {
  let data = target.dataItem.dataContext;

  let element = "";
  Object.keys(data).map((key) => {
    let value = data[key];
    element += `<div>${key}: ${value}</div>`;
  });

  return html`
    <div style="padding: 10px">
      <div>{categoryX} {valueY}</div>
      <div>
        ${target.dataItem.get("categoryX")} ${target.dataItem.get("valueY")}
      </div>
      ${element}
    </div>
  `;
};

// advanced
/**
 * visible, fill, fillopacity 를 조정하여 axisfill 을 보여준다.
 * @param {*} param0
 */
export const setCustom = ({ am5, xyVueInstance }) => {
  // add axisfill adapter
  xyVueInstance.data.xAxis
    .get("renderer")
    .axisFills.template.adapters.add(
      "fillOpacity",
      function (fillOpacity, target) {
        if (target.dataItem.dataContext.part1 > 11000) {
          return 0.2;
        } else {
          return fillOpacity;
        }
      }
    );

  // axis fill default set
  xyVueInstance.data.xAxis.get("renderer").axisFills.template.setAll({
    visible: true,
    fillOpacity: 0,
    fill: am5.color("#FF6961"),
  });

  // axis fill hover handler
  xyVueInstance.data.xAxis
    .get("renderer")
    .axisFills.template.events.on("pointerover", function (ev) {
      let color;
      let fillOpacity = 0.2;

      if (ev.target.dataItem.dataContext.part1 > 11000) {
        color = am5.color("#ad5cad");
      } else {
        color = am5.color("#579ffb");
      }

      if (!xyVueInstance.data.chart.get("userData").isAbnomalDetectEvent) {
        color = am5.color("#579ffb");
      }

      ev.target.set("fill", color);
      ev.target.set("fillOpacity", fillOpacity);
    });

  // axis fill mouse out handler
  xyVueInstance.data.xAxis
    .get("renderer")
    .axisFills.template.events.on("pointerout", function (ev) {
      let fillOpacity;

      if (ev.target.dataItem.dataContext.part1 > 11000) {
        fillOpacity = 0.2;
      } else {
        fillOpacity = 0;
      }

      if (!xyVueInstance.data.chart.get("userData").isAbnomalDetectEvent) {
        fillOpacity = 0;
      }

      ev.target.setAll({
        fill: am5.color("#FF6961"),
        fillOpacity: fillOpacity,
      });
    });

  // axis fill click handler
  xyVueInstance.data.xAxis
    .get("renderer")
    .axisFills.template.events.on("click", function (ev) {
      console.log(ev.target.dataItem.dataContext.part1);
    });
};

export const setCustomLegend = ({ am5, xyVueInstance }) => {
  xyVueInstance.data.legend.itemContainers.template.setup = function (
    itemContainer
  ) {
    itemContainer.events.on("click", function (ev) {
      if (ev.target.dataItem.dataContext.name === "abnormal detact") {
        if (!xyVueInstance.data.chart.get("userData").isAbnomalDetectEvent) {
          // 비정상 감지 on
          xyVueInstance.data.chart.set("userData", {
            isAbnomalDetectEvent: true,
          });

          xyVueInstance.data.xAxis
            .get("renderer")
            .axisFills.template.adapters.add(
              "fillOpacity",
              function (fillOpacity, target) {
                if (target.dataItem.dataContext.part1 > 11000) {
                  return 0.2;
                } else {
                  return fillOpacity;
                }
              }
            );

          xyVueInstance.data.legend.data.setAll([
            ...xyVueInstance.data.chart.series.values,
            {
              name: "abnormal detact",
              fill: am5.Color.lighten(am5.color("#ff0000"), 0.8),
              stroke: am5.Color.lighten(am5.color("#ff0000"), 0.6),
            },
          ]);
        } else {
          // 비정상 감지 off
          xyVueInstance.data.chart.set("userData", {
            isAbnomalDetectEvent: false,
          });

          xyVueInstance.data.xAxis
            .get("renderer")
            .axisFills.template.adapters.remove("fillOpacity");

          xyVueInstance.data.legend.data.setAll([
            ...xyVueInstance.data.chart.series.values,
            {
              name: "abnormal detact",
              fill: am5.Color.lighten(am5.color("#000000"), 0.8),
              stroke: am5.Color.lighten(am5.color("#000000"), 0.6),
            },
          ]);
        }
        xyVueInstance.data.xAxis.data.setAll(xyVueInstance.data.data);
      }
    });
  };

  xyVueInstance.data.chart.set("userData", {
    isAbnomalDetectEvent: true,
  });

  if (xyVueInstance.data.chart.get("userData").isAbnomalDetectEvent) {
    xyVueInstance.data.legend.data.setAll([
      ...xyVueInstance.data.chart.series.values,
      {
        name: "abnormal detact",
        fill: am5.Color.lighten(am5.color("#ff0000"), 0.8),
        stroke: am5.Color.lighten(am5.color("#ff0000"), 0.6),
      },
    ]);
  }
};
