<script setup lang="ts">
import { CtaButton } from "@emdn/ui";
import { ref } from "vue";

import { AppFrame } from "~/common/components";
import tsIconUrl from "./typescript.svg?url";

const counter = ref(0);

function increaseCounter() {
  counter.value++;
}
</script>

<template>
  <AppFrame>
    <div class="flex h-full w-full flex-col items-center justify-center gap-2">
      <a
        href="https://vitejs.dev"
        target="_blank"
      >
        <img
          src="/vite.svg"
          alt="Vite logo"
        />
      </a>
      <a
        href="https://www.typescriptlang.org/"
        target="_blank"
      >
        <img
          :src="tsIconUrl"
          alt="TypeScript logo"
        />
      </a>
      <div>
        <button
          class="bg-blue-500"
          @click="increaseCounter"
        >
          counter value: {{ counter }}
        </button>
      </div>
      <CtaButton @click="increaseCounter">
        counter value: {{ counter }}
      </CtaButton>
      <CtaButton
        variant="outline"
        @click="increaseCounter"
      >
        counter value: {{ counter }}
      </CtaButton>
      <CtaButton
        variant="text"
        @click="increaseCounter"
      >
        counter value: {{ counter }}
      </CtaButton>
    </div>
  </AppFrame>
</template>
