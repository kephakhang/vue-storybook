<script lang="ts">
import { provide, ref, defineComponent, onMounted } from "@vue/composition-api";
import { isReadyBingMapKey } from "../BingMap/keys";

export default defineComponent({
  name: "BingMapProvider",
  setup() {
    const timeoutID = ref<null | ReturnType<typeof setTimeout>>(null);
    const isReadyBingMap = ref(false);
    provide(isReadyBingMapKey, isReadyBingMap);

    function checkHasBingmap() {
      if (Microsoft) {
        isReadyBingMap.value = true;
        if (timeoutID.value) clearTimeout(timeoutID.value);
      } else {
        timeoutID.value = setTimeout(() => {
          checkHasBingmap();
        }, 1000);
      }
    }

    function createBingMapScript() {
      window.onloadBingMap = () => {
        isReadyBingMap.value = true;
      };

      // Add programmaticaly the external Bing maps api script
      // 프로그래밍 방식으로 외부 Bing 지도 API 스크립트 추가
      // bingmap account: emoldinodeveloper@gmail.com
      let bingmapKey =
        "At-15Xi0VEpIB3RdYt5STbnr_1vEZKySOcAh0h0tEyiCqLHLVNdQNd-tqj1nzyyY";
      let scriptTag = document.createElement("script");
      scriptTag.src = `https://www.bing.com/api/maps/mapcontrol?callback=onloadBingMap&key=${bingmapKey}`;
      scriptTag.id = "scriptBingMaps";

      // Inject the dynamic script in the DOM (DOM에 동적 스크립트 삽입)
      document.head.appendChild(scriptTag);
    }

    onMounted(() => {
      if (document.getElementById("scriptBingMaps")) {
        checkHasBingmap();
      } else {
        createBingMapScript();
      }
    });

    return { timeoutID, isReadyBingMap, checkHasBingmap, createBingMapScript };
  },
});
</script>

<template>
  <div style="width: 100%; height: 100%"><slot></slot></div>
</template>
