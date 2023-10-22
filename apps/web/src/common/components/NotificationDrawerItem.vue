<script setup lang="ts">
import { CtaButton } from "@emdn/ui";
import { Icon, iconExists } from "@iconify/vue";
import { type ButtonHTMLAttributes, computed, toRef } from "vue";
import { getRelativeTime } from "~/utils/common";
import type { NotificationCategory, NotificationContent } from "../api";

interface Props extends /* @vue-ignore */ ButtonHTMLAttributes {
  avatarColor?: string;
  notification: NotificationContent;
}

const props = defineProps<Props>();

const notification = toRef(() => props.notification);
const buttonText = computed(() => {
  return getButtonTextFromCategory(
    notification.value.notiCategory,
    notification.value.notiCode
  );
});

const getButtonTextFromCategory = (
  category: NotificationCategory,
  code?: string
) => {
  switch (category) {
    case "ALERT":
      return "View Alert";
    case "WORK_ORDER":
      if (
        code &&
        [
          "WO_DECLINED",
          "WO_CANCELLED",
          "WO_CPT_REJECTED",
          "WO_CPT_CANCELLED",
          "WO_MOD_REJECTED",
          "WO_CRT_DECLINED",
        ].includes(code)
      )
        return "View Reason";
      return "View Work Order";
    case "DATA_REQUEST":
      return "View Reason";
    default:
      return;
  }
};

const leadingIcon = computed(() => {
  const category = notification.value.notiCategory;

  if (category === "USER_ACCESS") return "fluent:people-28-filled";
  if (category !== "ALERT") return;

  const link = notification.value.linkTo;
  const defaultIcon = "mdi:bell-circle-outline";
  if (!link) return defaultIcon;

  const url = new URL(link, location.href);
  const hash = url.hash.slice(1);
  const icon = `emdn:${hash}-alert`;

  if (iconExists(icon)) return icon;
  return defaultIcon;
});
</script>
<template>
  <button
    class="flex w-full cursor-pointer items-center border-b border-b-stone-200 p-2"
  >
    <div class="relative">
      <div
        class="relative grid h-10 w-10 shrink-0 place-items-center rounded-full bg-blue-100 text-[#4B4B4B]"
        :style="{
          backgroundColor: avatarColor,
        }"
      >
        <Icon
          v-if="leadingIcon"
          :icon="leadingIcon"
          class="text-blue-500"
          :class="
            notification.notiCategory === 'USER_ACCESS' ? 'h-6 w-6' : 'h-7 w-7'
          "
        />
        <span v-else>
          {{
            notification.senderName
              .split(" ")
              .reduce(
                (acc, curr) =>
                  acc.length >= 2 ? acc : `${acc}${curr.charAt(0)}`,
                ""
              )
              .toUpperCase()
          }}
        </span>
      </div>
      <div
        v-if="!notification.readDateTime"
        class="absolute left-0 top-0 h-3 w-3 rounded-full bg-red-600"
      ></div>
    </div>
    <div class="w-3"></div>
    <div class="w-full">
      <p class="w-full text-left text-base leading-snug">
        {{ notification.content }}
      </p>
      <div class="h-1"></div>
      <div class="flex items-center justify-between">
        <span class="text-sm text-[#808080]">
          {{ getRelativeTime(notification.sentDateTime) }}
        </span>
        <CtaButton
          v-if="buttonText"
          class="text-sm"
        >
          {{ buttonText }}
        </CtaButton>
      </div>
    </div>
  </button>
</template>
