import PieChart from "~/components/Chart/amcharts5/pie/index.vue";

export default {
  title: "Components/Chart/pie/adapters",
  component: PieChart,
};

const html = String.raw;

const DefaultTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { "pie-chart": PieChart },
  template: html`
    <div>
      <pie-chart v-bind="$props"></pie-chart>
      ${description}
    </div>
  `,
});

let description = `
<div class="story-description-box">
  <div>
    <p>If seriesTooltipHTMLAdapter is set as props, <b>target</b> is received as the first parameter and <b>tooltipHTML</b> is received as the second parameter.</p>
    <p>props 로 seriesTooltipHTMLAdapter를 설정하면 첫번째 parameter로 target을 받아오고, 두번째 parameter로 tooltipHTML을 받아옵니다.</p>
  </div>

  <div>
    <p>The tooltip will be set as the value returned here.</p>
    <p>여기서 return을 해주는 값으로 tooltip 이 설정되게 됩니다.</p>  
  </div>

  <div>
    <p>Here, if tooltipHTML is returned as it is, the set tooltipHTML is displayed</p>
    <p>여기서 tooltipHTML을 그대로 리턴하면 설정한 tooltipHTML이 전시됩니다.</p>  
  </div>

  <div>
    <p>you can customize the tooltip by accessing individual data through target.dataItem.dataContext.</p>
    <p>target.dataItem.dataContext를 통해 개별 data에 접근하여 tooltip 을 custom 할 수 있습니다.</p>  
  </div>

  <div>
    <p>Can get and customize the {valueY} (the Y axis value of the hover item) when hover a item by using target.dataItem.get('valueY').</p>
    <p>target.dataItem.get('valueY')로 호버한 아이템의 Y축 값 {valueY}을 얻고 커스터마이징 할 수 있습니다.</p>  
  </div>
</div>`;

/**
 * @description series의 툴팁을 설정하는 adapter 입니다.
 * @param {*} tooltipHTML - 기존에 설정되어 있던 tooltip HTML 입니다.
 * @param {*} target - 데이터의 개별 항목입니다.
 */
function seriesTooltipHTMLAdapter(tooltipHTML, target) {
  if (target.dataItem.dataContext) {
    return `
    <div style="padding: 10px; background: white;">
      <div>
        <b>keys</b>: ${Object.keys(target.dataItem.dataContext)}
      </div>
      <div> 
        <b>values</b>: ${Object.values(target.dataItem.dataContext)}
      </div>
    </div>
    `;
  } else {
    return tooltipHTML;
  }
}

export const SeriesTooltipHTMLAdatper = DefaultTemplate.bind({});

SeriesTooltipHTMLAdatper.args = {
  seriesTooltipHTMLAdapter,
  chartSet: {
    innerContent: {
      html: `
      <div style="display: flex; flex-direction: column; align-items: center;">
        <span style="font-weight: 700; font-size: 50px; color: #3491ff;">Donut</span>
        <span style="font-size: 16px;">Inner Label</span>
      </div>`,
    },
  },
  data: [{ processingTime: 10, warmupTime: 10, cooldownTime: 2 }],
  pieDataBinder: [
    {
      key: "processingTime",
      displayName: "Processing Time",
    },
    {
      key: "warmupTime",
      displayName: "Warmup Time",
    },
    {
      key: "cooldownTime",
      displayName: "Cooldown Time",
    },
  ],
  category: "displayName",
};
