<script lang="ts">
import { defineComponent, type PropType } from "@vue/composition-api";
import type {
  NotificationPriority,
  NotificationCategory,
} from "~/types/Notification";
import CtaButton from "~/components/Button/cta-button.vue";
import { shortenName } from "../utils/shorten-name";

export default defineComponent({
  components: { CtaButton },
  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String as PropType<NotificationCategory>,
      required: true,
    },
    priority: {
      type: String as PropType<NotificationPriority>,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    readAt: Date,
    updatedAt: Date,
  },
  emits: {
    click: (_: number) => true,
  },
  methods: {
    getPriorityColor(priority: NotificationPriority) {
      switch (priority) {
        case "HIGH":
          return "#E34537";
        case "MEDIUM":
          return "#F7CC57";
        case "LOW":
          return "#41CE77";
      }
    },
    parseTwoDigit(num: number) {
      return ("0" + num).slice(-2);
    },
    parseDate(date: Date) {
      const year = date.getFullYear();
      const month = this.parseTwoDigit(date.getMonth() + 1);
      const day = this.parseTwoDigit(date.getDate());
      return `${year}-${month}-${day}`;
    },
    parseTimeHMS(date: Date) {
      const hours = this.parseTwoDigit(date.getHours());
      const minutes = this.parseTwoDigit(date.getMinutes());
      const seconds = this.parseTwoDigit(date.getSeconds());
      return `${hours}:${minutes}:${seconds}`;
    },
    parseTimeAMPM(date: Date) {
      let hours = date.getHours();
      const minutes = this.parseTwoDigit(date.getMinutes());
      const ampm = hours >= 12 ? "PM" : "AM";

      hours %= 12;
      hours ||= 12;
      return `${this.parseTwoDigit(hours)}:${minutes}${ampm}`;
    },
    toTitleCase(str: string) {
      return str.replace(
        /\w\S*/g,
        (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase()
      );
    },
    shortenSenderName: shortenName,
  },
});
</script>
<template>
  <tr>
    <td style="white-space: nowrap">
      <p>{{ parseDate(createdAt) }}</p>
      <div style="height: 2px"></div>
      <p :class="$style.subtitle">{{ parseTimeHMS(createdAt) }}</p>
    </td>
    <td style="white-space: nowrap">
      <p>{{ toTitleCase(type.replace("_", " ")) }}</p>
      <div style="height: 2px"></div>
      <p
        v-if="updatedAt"
        :class="$style.subtitle"
      >
        Updated on {{ parseDate(updatedAt) }}
      </p>
      <p
        v-else
        :class="$style.subtitle"
      >
        -
      </p>
    </td>
    <td style="white-space: nowrap">
      <div
        :style="{
          height: '12px',
          width: '12px',
          backgroundColor: getPriorityColor(priority),
          display: 'inline-block',
          marginRight: '4px',
          borderRadius: '50%',
        }"
      ></div>
      <span>{{ toTitleCase(priority) }}</span>
    </td>
    <td>
      <div
        :style="{
          height: '24px',
          width: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#B4CDF2',
          borderRadius: '50%',
          fontSize: '12px',
        }"
      >
        {{ shortenSenderName(sender) }}
      </div>
    </td>
    <td>
      <CtaButton
        variant="text"
        :style-props="{ paddingLeft: 0 }"
        :click-handler="() => $emit('click', id)"
      >
        <div v-if="content.length > 85">{{ content.slice(0, 85) }}...</div>
        <div v-else>{{ content }}</div>
      </CtaButton>
    </td>
    <td style="white-space: nowrap">
      <p v-if="!!readAt">READ</p>
      <p v-else>UNREAD</p>
      <div style="height: 2px"></div>
      <p
        v-if="!!readAt"
        :class="$style.subtitle"
      >
        {{ parseDate(readAt) }} {{ parseTimeAMPM(readAt) }}
      </p>
      <p
        v-else
        :class="$style.subtitle"
      >
        -
      </p>
    </td>
  </tr>
</template>

<style lang="scss" module scoped>
@import "./styles.module.scss";
</style>
