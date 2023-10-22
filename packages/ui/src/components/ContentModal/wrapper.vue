<script lang="ts">
import { defineComponent } from "@vue/composition-api";
import ContentModal from "./index.vue";

export default defineComponent({
  components: { ContentModal },
  data() {
    return {
      isOpened: false,
    };
  },
});
</script>

<template>
  <div>
    <button
      :style="{
        cursor: 'pointer',
      }"
      @click="() => (isOpened = true)"
    >
      Open
    </button>
    <content-modal
      title="Title"
      :is-opened="isOpened"
      :on-close="() => (isOpened = false)"
      width="1000px"
      height="calc(100vh - 80px)"
    >
      hello
    </content-modal>
  </div>
</template>
