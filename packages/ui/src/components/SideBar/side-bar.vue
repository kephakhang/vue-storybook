<script lang="ts">
import {
  defineComponent,
  ref,
  watch,
  type PropType,
} from "@vue/composition-api";
import { useElementHover } from "@vueuse/core";

import AccordionContent from "~/components/AccordionV2/accordion-content.vue";
import AccordionItem from "~/components/AccordionV2/accordion-item.vue";
import AccordionRoot from "~/components/AccordionV2/accordion-root.vue";
import AccordionTrigger from "~/components/AccordionV2/accordion-trigger.vue";
import type { CSSProperties } from "~/types/common";
import type { SidebarMenu } from "~/types/SideBar";

import SideBarIconButton from "./components/side-bar-icon-button.vue";
import DownloadButton from "./components/download-button.vue";

export default defineComponent({
  components: {
    DownloadButton,
    SideBarIconButton,
    AccordionContent,
    AccordionItem,
    AccordionRoot,
    AccordionTrigger,
  },
  props: {
    menuList: {
      type: Array as PropType<SidebarMenu[]>,
      default: () => [],
    },
  },
  setup() {
    // TODO(sun.lee): Replace with CSS variables
    const primaryColor = "#040F31";
    const defaultClosedSideBarColor = "#818798";

    const isOpened = ref(true);
    const toggleButton = ref<HTMLElement | null>(null);
    const closedSidebar = ref<HTMLElement | null>(null);

    const toggle = () => {
      setBackgroundColor(toggleButton.value, primaryColor);
      setBackgroundColor(closedSidebar.value, defaultClosedSideBarColor);
      isOpened.value = !isOpened.value;
    };

    const isToggleButtonHovered = useElementHover(toggleButton);
    const isClosedSidebarHovered = useElementHover(closedSidebar);

    const setBackgroundColor = (
      element: HTMLElement | null,
      color: CSSProperties["background-color"]
    ) => {
      if (!element) return;
      element.style.backgroundColor = color as string;
    };

    watch(closedSidebar, () => {
      if (!closedSidebar.value) isClosedSidebarHovered.value = false;
    });

    watch([isToggleButtonHovered, isClosedSidebarHovered], (result) => {
      const isHovered = result.some((isHovered) => isHovered);

      if (!isHovered) {
        setBackgroundColor(toggleButton.value, primaryColor);
        setBackgroundColor(closedSidebar.value, defaultClosedSideBarColor);
        return;
      }

      if (isOpened.value) {
        setBackgroundColor(toggleButton.value, "rgb(111, 116, 136)");
      } else {
        setBackgroundColor(toggleButton.value, "#3585E5");
      }
      setBackgroundColor(closedSidebar.value, "#d8e2f8");
    });

    const onClick = (url?: string) => {
      if (url) location.href = url;
    };

    return { isOpened, toggle, onClick, toggleButton, closedSidebar };
  },
});
</script>

<template>
  <div style="position: relative">
    <button
      ref="toggleButton"
      :style="{
        display: 'grid',
        placeItems: 'center',
        position: 'absolute',
        width: '1.75rem',
        height: '1.75rem',
        borderRadius: '50%',
        top: '0.75rem',
        left: isOpened ? '3.25rem' : '0.5rem',
        background: '#040F31',
        transform: isOpened ? undefined : 'rotate(180deg)',
      }"
      @click="toggle"
    >
      <img
        src="~assets/images/icon/left-icon-sidebar.svg"
        alt="hide button"
      />
    </button>
    <div
      v-if="isOpened"
      :style="{
        width: '5.5rem',
        height: '100%',
        background: '#040F31',
        display: 'flex',
        flexDirection: 'column',
      }"
    >
      <div style="height: 3.25rem"></div>
      <AccordionRoot
        type="multiple"
        :default-value="menuList.map((menu) => menu.category)"
      >
        <AccordionItem
          v-for="menu in menuList"
          :value="menu.category"
        >
          <AccordionTrigger v-slot="{ rotate }">
            <div
              :style="{
                width: '100%',
                background: '#152143',
                height: '1rem',
                color: 'white',
                padding: '0 0.5rem',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
              }"
            >
              {{ menu.category }}
              <img
                :style="rotate"
                src="~assets/images/icon/arrow-up-blue.svg"
                alt="arrow up"
              />
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SideBarIconButton
              v-for="item in menu.children"
              :icon-url="item.iconUrl"
              :on-click="() => onClick(item.url)"
            >
              {{ item.name }}
            </SideBarIconButton>
            <div style="height: 1.5rem"></div>
          </AccordionContent>
        </AccordionItem>
      </AccordionRoot>
      <div style="flex: 1"></div>
      <div
        :style="{
          padding: '0.5rem 0.625rem',
          width: '100%',
          height: '3rem',
        }"
      >
        <DownloadButton />
      </div>
    </div>
    <div
      v-else
      ref="closedSidebar"
      :style="{
        height: '100%',
        width: '1.25rem',
        background: '#818798',
      }"
      @click="toggle"
    ></div>
  </div>
</template>
<style></style>
