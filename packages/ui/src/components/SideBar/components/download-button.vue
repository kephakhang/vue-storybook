<script lang="ts">
import { defineComponent, ref, type PropType } from "@vue/composition-api";
import type { StyleValue } from "~/types/common";
import { useElementHover } from "@vueuse/core";

import downloadHoveredUrl from "~assets/images/download-hovered.svg?url";
import downloadUrl from "~assets/images/download.svg?url";

export default defineComponent({
  props: {
    styleProps: {
      type: [String, Object] as PropType<StyleValue>,
    },
  },
  setup() {
    const downloadButton = ref<HTMLElement | null>(null);
    const isHovered = useElementHover(downloadButton);

    // TODO(sun.lee): Add click event to move on to download page

    return { downloadButton, isHovered, downloadHoveredUrl, downloadUrl };
  },
});
</script>
<template>
  <div ref="downloadButton">
    <img
      :src="isHovered ? downloadHoveredUrl : downloadUrl"
      alt="download"
    />
  </div>
</template>
