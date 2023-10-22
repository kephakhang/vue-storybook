import type { Meta, StoryObj } from "@storybook/vue";
import Accordion from "./accordion.vue";

type AccordionInstance = InstanceType<typeof Accordion>;
const meta: Meta<AccordionInstance> = {
  title: "Components/Accordion",
  component: Accordion,
};

export default meta;
type Story = StoryObj<AccordionInstance>;

export const Default: Story = {
  render(_, { argTypes }) {
    return {
      components: { Accordion },
      props: Object.keys(argTypes),
      template: String.raw`
        <accordion :style-props="styleProps">
          <template #header>
            <div>Basic Information (Static)</div>
          </template>
          <template #body>
            <div>
              <table>
                <tr>
                  <th>Tooling ID</th>
                  <td>A201923890234</td>
                </tr>
                <tr>
                  <th>Sensor ID</th>
                  <td>NCM1049382934</td>
                </tr>
                <tr>
                  <th>Tooling Letter</th>
                  <td></td>
                </tr>
                <tr>
                  <th>Tooling Type</th>
                  <td>Injection Mold</td>
                </tr>
                <tr>
                  <th>Tooling Complexity</th>
                  <td>B</td>
                </tr>
                <tr>
                  <th>Forecasted Max Shot</th>
                  <td>1,000,000</td>
                </tr>
                <tr>
                  <th>Forecasted Tool Life (year)</th>
                  <td></td>
                </tr>
                <tr>
                  <th>Year of Tool Made</th>
                  <td></td>
                </tr>
                <tr>
                  <th>Engineer in Charge</th>
                  <td>Test Emoldino</td>
                </tr>
                <tr>
                  <th>Tool Description</th>
                  <td>
                    This tooling’s description should be written right here to view.
                  </td>
                </tr>
              </table>
            </div>
          </template>
        </accordion>
      `,
    };
  },
  args: {
    styleProps: {
      width: "600px",
    },
  },
};

export const Multiple: Story = {
  render(_, { argTypes }) {
    return {
      components: { Accordion },
      props: Object.keys(argTypes),
      template: String.raw`
        <div>
          <Accordion :style-props="styleProps">
            <template #header> Heading 1 </template>
            <template #body>
              <div style="padding: 20px; border: 1px solid #d6dade">Body text 1</div>
            </template>
          </Accordion>
          <Accordion :style-props="styleProps">
            <template #header> Heading 2 </template>
            <template #body>
              <div style="padding: 20px; border: 1px solid #d6dade">Body text 2</div>
            </template>
          </Accordion>
          <Accordion :style-props="styleProps">
            <template #header> Heading 3 </template>
            <template #body>
              <div style="padding: 20px; border: 1px solid #d6dade">Body text 3</div>
            </template>
          </Accordion>
        </div>
      `,
    };
  },
  args: {
    styleProps: {
      width: "600px",
    },
  },
};
