<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  onBeforeUnmount,
  onMounted,
  reactive,
  ref,
} from "@vue/composition-api";
import { DropdownContextKey } from "~/components/DropdownV2/keys";

export default defineComponent({
  setup(_, context) {
    const { open, position, maxWidth, distance, triggerElement, onClose } =
      inject(DropdownContextKey)!;
    const hasHeader = ref(false);
    const hasFooter = ref(false);
    const contentRef = ref<HTMLElement | null>(null);
    const contentBodyRef = ref<HTMLElement | null>(null);
    const coordinates = reactive({
      x: 0,
      y: 0,
    });

    const positionComputed = computed(() => {
      return {
        left: `${coordinates.x}px`,
        top: `${coordinates.y}px`,
      };
    });

    const clickOutsideToClose = (e: MouseEvent) => {
      const eventTarget = e.target as HTMLElement;

      if (
        open.value &&
        !contentRef.value?.contains(eventTarget) &&
        !triggerElement.value?.contains(eventTarget)
      ) {
        onClose?.();
      }
    };

    const getPosition = () => {
      if (!triggerElement.value || !contentRef.value) return;

      const triggerRect = triggerElement.value.getBoundingClientRect();
      const contentRect = contentRef.value.getBoundingClientRect();
      const scrollLeft = window.scrollX;
      const scrollTop = window.scrollY;

      if (triggerRect && contentRect) {
        let coordinateX;
        let coordinateY;

        switch (position.value) {
          case "auto":
            const windowHeight =
              window.innerHeight || document.documentElement.clientHeight;
            const threshold = windowHeight * (1 - 30 / 100);

            if (triggerRect.top > threshold) {
              coordinateX =
                scrollLeft +
                triggerRect.left +
                triggerRect.width / 2 -
                contentRect.width / 2;
              coordinateY =
                scrollTop + triggerRect.top - contentRect.height - distance;
            } else {
              coordinateX =
                scrollLeft +
                triggerRect.left +
                triggerRect.width / 2 -
                contentRect.width / 2;
              coordinateY =
                scrollTop + triggerRect.top + triggerRect.height + distance;
            }
            break;

          case "top":
            coordinateX =
              scrollLeft +
              triggerRect.left +
              triggerRect.width / 2 -
              contentRect.width / 2;
            coordinateY =
              scrollTop + triggerRect.top - contentRect.height - distance;
            break;

          case "top-left":
            coordinateX = scrollLeft + triggerRect.left;
            coordinateY =
              scrollTop + triggerRect.top - contentRect.height - distance;
            break;

          case "top-right":
            coordinateX =
              scrollLeft +
              triggerRect.left +
              triggerRect.width -
              contentRect.width;
            coordinateY =
              scrollTop + triggerRect.top - contentRect.height - distance;
            break;

          case "bottom":
            coordinateX =
              scrollLeft +
              triggerRect.left +
              triggerRect.width / 2 -
              contentRect.width / 2;
            coordinateY =
              scrollTop + triggerRect.top + triggerRect.height + distance;
            break;

          case "bottom-left":
            coordinateX = scrollLeft + triggerRect.left;
            coordinateY =
              scrollTop + triggerRect.top + triggerRect.height + distance;
            break;

          case "bottom-right":
            coordinateX =
              scrollLeft +
              triggerRect.left +
              triggerRect.width -
              contentRect.width;
            coordinateY =
              scrollTop + triggerRect.top + triggerRect.height + distance;
            break;

          case "left":
            coordinateX =
              scrollLeft + triggerRect.left - contentRect.width - distance;
            coordinateY =
              scrollTop +
              triggerRect.top +
              triggerRect.height / 2 -
              contentRect.height / 2;
            break;

          case "left-top":
            coordinateX =
              scrollLeft + triggerRect.left - contentRect.width - distance;
            coordinateY = scrollTop + triggerRect.top;
            break;

          case "left-bottom":
            coordinateX =
              scrollLeft + triggerRect.left - contentRect.width - distance;
            coordinateY = scrollTop + triggerRect.bottom - contentRect.height;
            break;

          case "right":
            coordinateX =
              scrollLeft + triggerRect.left + triggerRect.width + distance;
            coordinateY =
              scrollTop +
              triggerRect.top +
              triggerRect.height / 2 -
              contentRect.height / 2;
            break;

          case "right-top":
            coordinateX =
              scrollLeft + triggerRect.left + triggerRect.width + distance;
            coordinateY = scrollTop + triggerRect.top;
            break;

          case "right-bottom":
            coordinateX =
              scrollLeft + triggerRect.left + triggerRect.width + distance;
            coordinateY = scrollTop + triggerRect.bottom - contentRect.height;
            break;
        }

        coordinates.x = coordinateX;
        coordinates.y = coordinateY;
      }
    };

    const setMaxHeight = () => {
      const contentBodyEl = contentBodyRef.value;

      if (contentBodyEl && contentBodyEl.childElementCount > 4) {
        contentBodyEl.style.maxHeight = `${
          contentBodyEl.children[0].getBoundingClientRect().height * 4 + 6
        }px`;
      }
    };

    onBeforeMount(() => {
      if (context.slots["header"]) hasHeader.value = true;
      if (context.slots["footer"]) hasFooter.value = true;
    });

    onMounted(() => {
      window.addEventListener("resize", getPosition);
      window.addEventListener("click", clickOutsideToClose, {
        capture: true,
      });

      setMaxHeight();
      getPosition();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("resize", getPosition);
      window.removeEventListener("click", clickOutsideToClose, {
        capture: true,
      });
    });

    return {
      open,
      maxWidth,
      contentRef,
      contentBodyRef,
      positionComputed,
      hasHeader,
      hasFooter,
    };
  },
});
</script>

<template>
  <div
    ref="contentRef"
    class="content-container"
    :style="[positionComputed, { maxWidth: maxWidth }]"
  >
    <div
      v-if="hasHeader"
      class="header-container"
    >
      <slot name="header"></slot>
    </div>
    <div
      ref="contentBodyRef"
      class="body-container"
    >
      <slot></slot>
    </div>
    <div
      v-if="hasFooter"
      class="footer-container"
    >
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.content-container {
  width: fit-content;
  height: auto;
  box-sizing: border-box;
  position: absolute;
  padding: 0.125rem;
  background: #ffffff;
  box-shadow: 0 0.063rem 0.25rem 0 rgba(0, 0, 0, 0.25);
  z-index: 99999;

  .body-container {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    overflow: auto;

    &::-webkit-scrollbar {
      -webkit-appearance: none;
      width: 0.313rem;
    }

    &::-webkit-scrollbar-thumb {
      background: #d6dade;
      border-radius: 0.063rem;
    }
  }

  .header-container {
    width: 100%;
    padding-bottom: 2px;
  }

  .footer-container {
    width: 100%;
    padding-top: 2px;
  }
}
</style>
