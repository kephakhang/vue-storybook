import { useQuery } from "@tanstack/vue-query";
import {
  StorageSerializers,
  useSessionStorage,
  // To prevent https://github.com/microsoft/TypeScript/issues/42873 this error,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type RemovableRef,
} from "@vueuse/core";
import { computed, watch } from "vue";

import { type AppInfo, commonApi } from "../api";

export const useAppInfo = () => {
  const server = useSessionStorage<string | null>("server", null, {
    serializer: StorageSerializers.string,
  });
  const type = useSessionStorage<string | null>("type", null, {
    serializer: StorageSerializers.string,
  });
  const language = useSessionStorage<string | null>("language", null, {
    serializer: StorageSerializers.string,
  });
  const localTimeZone = useSessionStorage<boolean | null>(
    "localTimeZone",
    null,
    { serializer: StorageSerializers.boolean }
  );
  const me = useSessionStorage<AppInfo["me"] | null>("me", null, {
    serializer: StorageSerializers.object,
  });
  const menuPermissions = useSessionStorage<AppInfo["menuPermissions"] | null>(
    "menuPermissions",
    null,
    { serializer: StorageSerializers.object }
  );
  const messages = useSessionStorage<AppInfo["messages"] | null>(
    "messages",
    null,
    { serializer: StorageSerializers.object }
  );
  const versions = useSessionStorage<AppInfo["versions"] | null>(
    "versions",
    null,
    { serializer: StorageSerializers.object }
  );
  const options = useSessionStorage<AppInfo["options"] | null>(
    "options",
    null,
    { serializer: StorageSerializers.object }
  );

  const isEmpty = computed(() => {
    return (
      server.value === null ||
      type.value === null ||
      language.value === null ||
      localTimeZone.value === null ||
      me.value === null ||
      menuPermissions.value === null ||
      messages.value === null ||
      versions.value === null ||
      options.value === null
    );
  });

  const clear = () => {
    server.value = null;
    type.value = null;
    language.value = null;
    localTimeZone.value = null;
    me.value = null;
    menuPermissions.value = null;
    messages.value = null;
    versions.value = null;
    options.value = null;
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["system"],
    queryFn: async () => {
      const res = await commonApi.getAppInfo();
      return res.data;
    },
    enabled: isEmpty,
  });

  watch(data, () => {
    if (!data.value) return;

    server.value = data.value.server;
    type.value = data.value.type;
    language.value = data.value.language;
    localTimeZone.value = data.value.localTimeZone;
    me.value = data.value.me;
    menuPermissions.value = data.value.menuPermissions;
    messages.value = data.value.messages;
    versions.value = data.value.versions;
    options.value = data.value.options;
  });

  return {
    isLoading,
    error,
    server,
    type,
    language,
    localTimeZone,
    me,
    menuPermissions,
    messages,
    versions,
    options,
    clear,
  };
};
