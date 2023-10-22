<script lang="ts">
import {
  defineComponent,
  ref,
  toRef,
  watch,
  type PropType,
  computed,
} from "@vue/composition-api";
import { Widget, Tooltip, Icon, CtaButton, ProgressBar } from "../../..";
import type { ProcessChangeTopItem } from "~/pages/ProcessChange/types";

export default defineComponent({
  components: { Widget, Tooltip, Icon, CtaButton, ProgressBar },
  props: {
    changeEventData: {
      type: Array as PropType<ProcessChangeTopItem[]>,
      default: () => [],
    },
    resetTrigger: {
      type: Number,
    },
    selectedMoldId: {
      type: Number,
    },
    setSelectedMoldId: {
      type: Function as PropType<(id: number, scrollTop: number) => true>,
    },
    scrollTop: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const widgetBodyRef = ref<HTMLElement | null>(null);
    const selectedItem = toRef(props, "selectedMoldId");
    const eventData = toRef(props, "changeEventData");

    const checkBodyHasScroll = () => {
      return (
        widgetBodyRef.value &&
        widgetBodyRef.value.clientHeight < widgetBodyRef.value.scrollHeight
      );
    };

    const selectOneItem = async (id: number) => {
      props.setSelectedMoldId?.(
        id,
        widgetBodyRef.value ? widgetBodyRef.value.scrollTop : 0
      );
    };

    const totalCount = computed(() => {
      return eventData.value.reduce(
        (max, obj) => Math.max(max, obj.procChgCount),
        0
      );
    });

    watch(
      eventData,
      () => {
        if (widgetBodyRef.value) {
          if (checkBodyHasScroll()) {
            widgetBodyRef.value.style.paddingRight = "0.25rem";
          } else {
            widgetBodyRef.value.style.paddingRight = "0";
          }

          widgetBodyRef.value.scrollTo({
            top: props.scrollTop,
          });
        }
      },
      { deep: true }
    );

    watch(
      () => props.resetTrigger,
      () => {
        if (widgetBodyRef.value)
          widgetBodyRef.value.scrollTo({ top: 0, behavior: "smooth" });
      }
    );

    return {
      widgetBodyRef,
      eventData,
      totalCount,
      selectedItem,
      selectOneItem,
    };
  },
});
</script>

<template>
  <Widget
    header-text="Process Change Events"
    :style-props="{
      height: '100%',
      width: '100%',
    }"
    :body-style-props="{
      overflow: 'hidden',
    }"
  >
    <template #tooltip>
      <Tooltip position="bottom">
        <template #context>
          <Icon button-type="information-icon"></Icon>
        </template>
        <template #body>
          <span style="width: 18.625rem; text-align: left">
            Process Change Events displays the total number of changes detected
            per tooling for the selected time range.
          </span>
        </template>
      </Tooltip>
    </template>
    <template #body>
      <div :class="$style['body-container']">
        <div
          v-if="!eventData.length"
          :class="$style['empty-body']"
        >
          No Data Available
        </div>
        <div
          v-else
          ref="widgetBodyRef"
          :class="$style['body-wrapper']"
        >
          <div
            v-for="(data, index) in eventData"
            :key="index"
            :class="$style['item-wrapper']"
          >
            <CtaButton
              :style-props="{
                width: '5.25rem',
                height: '1rem',
                fontSize: '0.938rem',
                boxShadow: '0 0.063rem 0.25rem 0 rgba(0, 0, 0, 0.25)',
                padding: 0,
              }"
              :click-handler="() => selectOneItem(data.moldId)"
              :class="
                data.moldId === selectedItem ? $style['item-button-active'] : ''
              "
            >
              <div :class="$style['truncated-text']">
                {{ data.moldCode }}
              </div>
            </CtaButton>
            <div :class="$style['progress-bar-wrapper']">
              <ProgressBar
                :value="data.procChgCount"
                :buffer-value="totalCount"
                bg-color="#1A2281"
              >
                <template #value>
                  <span>{{ data.procChgCount }}</span>
                </template>
              </ProgressBar>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Widget>
</template>

<style lang="scss" module>
.body-container {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 1.25rem 0.75rem;

  & .empty-body {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #efefef;
    font-family:
      Helvetica Neue,
      Helvetica,
      Arial,
      sans-serif;
    font-size: 0.75rem;
    color: #4b4b4b;
  }
}

.body-wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  gap: 0.5rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 0.625rem;
  }

  &::-webkit-scrollbar-thumb {
    background: #d6dade;
    border-radius: 0.188rem;
  }

  &::-webkit-scrollbar-track {
    border: 0.063rem solid #d6dade;
    border-radius: 0.188rem;
  }
}

.item-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 0.25rem;
  width: 100%;
  height: 1.125rem;
}

.item-button-active {
  background: #3491ff !important;
  border: 0.031rem solid #d0d0d0 !important;
  border-radius: 0.188rem !important;
  color: #ffffff !important;
}

.item-button-active:hover {
  background: #3585e5 !important;
}

.progress-bar-wrapper {
  flex-grow: 1;
}

.truncated-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 0.5rem;
}
</style>
