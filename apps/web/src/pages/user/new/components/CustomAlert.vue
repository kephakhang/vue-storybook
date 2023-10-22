<script setup lang="ts">
import { CtaButton } from "@emdn/ui";
import { Icon } from "@iconify/vue";
import {
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogRoot,
  AlertDialogTitle,
} from "radix-vue";

defineProps<{
  open: boolean;
  handleOpen: (value: boolean) => void;
  message: string;
}>();
</script>

<template>
  <AlertDialogRoot
    :open="open"
    @update:open="handleOpen"
  >
    <AlertDialogPortal>
      <AlertDialogOverlay
        class="fixed inset-0 grid place-items-center overflow-y-auto bg-[rgba(0_0_0_/_0.5)]"
      >
        <AlertDialogContent
          class="pointer-events-auto relative flex w-full max-w-xs flex-col rounded-md border-[unset] bg-white bg-clip-padding shadow-lg"
        >
          <AlertDialogTitle
            class="flex items-start justify-between rounded-t-md border-b border-solid border-b-slate-300 p-4 text-lg font-medium"
          >
            <h5>Notification</h5>
            <button @click="handleOpen(false)">
              <Icon
                icon="ri:close-fill"
                class="h-5 w-5 text-stone-800"
              />
            </button>
          </AlertDialogTitle>
          <AlertDialogDescription
            class="flex items-start justify-between rounded-t-md border-b border-solid border-b-slate-300 p-4 text-base text-slate-700"
          >
            {{ message }}
          </AlertDialogDescription>
          <div
            class="flex items-center justify-end border-t border-solid border-t-slate-300 p-4"
          >
            <AlertDialogAction @click="handleOpen(false)">
              <CtaButton
                class="border-blue-300 bg-blue-300 text-base text-white hover:bg-blue-300"
              >
                OK
              </CtaButton>
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialogPortal>
  </AlertDialogRoot>
</template>
