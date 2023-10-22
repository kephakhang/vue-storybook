import { useQuery } from "@tanstack/vue-query";
import { StorageSerializers, useLocalStorage } from "@vueuse/core";
import type { RemovableRef } from "@vueuse/core";
import { computed, watch } from "vue";

import { commonApi, type SystemCodes } from "../api";

export const useSystemCodes = () => {
  // To prevent https://github.com/microsoft/TypeScript/issues/42873 this error,
  // We should specify the type of the return value of useSessionStorage in this line.
  const systemCodes: RemovableRef<SystemCodes> = useLocalStorage<SystemCodes>(
    "codes",
    null,
    {
      serializer: StorageSerializers.object,
      deep: true,
    }
  );
  const isFetchingEnabled = computed(() => systemCodes.value === null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["systemCodes"],
    queryFn: async () => {
      const res = await commonApi.getSystemCodes();
      return res.data;
    },
    enabled: isFetchingEnabled,
  });

  watch(data, () => {
    if (!data.value) return;
    systemCodes.value = data.value;
  });

  return {
    systemCodes,
    isLoading,
    error,
  };
};
