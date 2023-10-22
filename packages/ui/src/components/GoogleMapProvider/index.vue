<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  mounted: function () {
    this.createGoogleMapScript();
  },
  methods: {
    createGoogleMapScript() {
      ((g) => {
        var h,
          a,
          k,
          p = "The Google Maps JavaScript API",
          c = "google",
          l = "importLibrary",
          q = "__ib__",
          m = document,
          b = window;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}),
          r = new Set(),
          e = new URLSearchParams(),
          u = () =>
            h ||
            (h = new Promise(async (f, n) => {
              await (a = m.createElement("script"));
              e.set("libraries", [...r] + "");
              for (k in g)
                e.set(
                  k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()),
                  g[k]
                );
              e.set("callback", c + ".maps." + q);
              a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
              d[q] = f;
              a.onerror = () => (h = n(Error(p + " could not load.")));
              a.nonce = m.querySelector("script[nonce]")?.nonce || "";
              m.head.append(a);
            }));
        d[l]
          ? console.warn(p + " only loads once. Ignoring:", g)
          : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n)));
      })({
        // key: "AIzaSyCq47vxk2O8x3i5lamblutqhAL78LCYkRQ", // mms 에 있던 oldkey. 누구의 계정인지 알 수 없음.
        key: "AIzaSyBUovdhr95iIrtFrQ3nMIaXPLstuIdrmcM", // new key: emoldino google account (gcp-manager@emoldino.com) 으로 key 생성
        v: "weekly",
        // 'v' 매개변수를 사용하여 사용할 버전(주간, 베타, 알파 등)을 나타냅니다.
        // 카멜 케이스를 사용하여 필요에 따라 다른 부트스트랩 매개변수를 추가합니다.
      });
    },
  },
});
</script>

<template>
  <div style="width: 100%; height: 100%"><slot></slot></div>
</template>
