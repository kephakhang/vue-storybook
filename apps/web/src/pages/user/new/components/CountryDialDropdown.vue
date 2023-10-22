<script setup lang="ts">
import { Icon } from "@iconify/vue";
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectPortal,
  SelectRoot,
  SelectTrigger,
  SelectViewport,
} from "radix-vue";
import { computed } from "vue";
import { useSystemCodes } from "~/common/hooks/useSystemCodes";

const props = defineProps<{
  selectedValue: string;
  onSelect: (value: string) => void;
}>();

const { systemCodes } = useSystemCodes();

const countryDialList = computed(() => {
  return (systemCodes.value.CountryCode || []).map((item) => ({
    ...item,
    code: item.code?.toLowerCase(),
  }));
});

const selectedCodeItem = computed(() => {
  return countryDialList.value.find(
    (item) => item.description === props.selectedValue
  );
});
</script>

<template>
  <SelectRoot
    :model-value="selectedValue"
    class="z-10"
    @update:model-value="onSelect"
  >
    <SelectTrigger
      class="ml-2 block w-24 rounded border border-solid border-slate-300 bg-white bg-clip-padding px-3 py-1.5 text-base leading-normal text-slate-900 outline-0 transition-[border-color,shadow] delay-150 ease-in-out"
    >
      <div class="flex flex-row">
        <Icon
          :icon="`flag:${selectedCodeItem?.code}-4x3`"
          class="mr-2.5 h-5 w-5"
        />
        +{{ selectedCodeItem?.description }}
      </div>
    </SelectTrigger>

    <SelectPortal to="div">
      <SelectContent
        class="w-80 overflow-y-auto rounded border-solid border-slate-300 bg-white shadow-lg will-change-[opacity,transform]"
        position="popper"
        :side-offset="5"
        side="top"
      >
        <SelectViewport class="max-h-[200px] p-1">
          <SelectGroup>
            <SelectItem
              v-for="(option, index) in countryDialList"
              :key="index"
              class="relative clear-both block w-full cursor-pointer whitespace-nowrap border-0 bg-transparent px-5 py-1 text-base font-normal text-slate-900 hover:bg-sky-50 focus:bg-sky-50 focus-visible:outline-0"
              :value="option.description || ''"
            >
              <Icon
                :icon="`flag:${option.code}-4x3`"
                class="-ml-2.5 mr-2.5 inline-block h-5 w-5 text-center text-gray-300"
              />
              {{ option.title }} +{{ option.description }}
            </SelectItem>
          </SelectGroup>
        </SelectViewport>
      </SelectContent>
    </SelectPortal>
  </SelectRoot>
</template>
