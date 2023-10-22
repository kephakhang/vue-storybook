import PieChart from "~/components/Chart/amcharts5/pie/index.vue";

export default {
  title: "Components/Chart/pie/advanced",
  component: PieChart,
};

const html = String.raw;

const Default = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { "pie-chart": PieChart },
  template: html` <div>
    <pie-chart v-bind="$props"></pie-chart>
    ${description}
  </div>`,
});

let description = `
<div class="story-description-box">
  <div>
    <p></p>
    <p></p>
  </div>
</div>`;

export const NoData = Default.bind({});

NoData.args = {
  data: [{ key1: 0, key2: 0, key3: 0 }],
  pieDataBinder: [
    {
      key: "key1",
      displayName: "Processing Time",
    },
    {
      key: "key2",
      displayName: "Warmup Time",
    },
    {
      key: "key3",
      displayName: "Cooldown Time",
    },
  ],
  category: "displayName",
};
