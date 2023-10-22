<script lang="ts">
import markerDefaultIcon from "~assets/images/common-component/map-marker-default.svg";
import markerDisabledIcon from "~assets/images/common-component/map-marker-disabled.svg";

import {
  defineComponent,
  inject,
  watch,
  toRef,
  nextTick,
  ref,
  type PropType,
  type Ref,
} from "@vue/composition-api";

import { isReadyBingMapKey } from "./keys";
import type {
  MapTypeId,
  Pushpin,
  PushpinEventKey,
  PushpinEvent,
} from "~/types/BingMap/index";

export default defineComponent({
  name: "BingMap",
  props: {
    mapTypeId: {
      type: String as PropType<MapTypeId>,
      default: "road",
    },
    mapOptions: Object as PropType<Microsoft.Maps.IMapOptions>,
    viewOptions: Object as PropType<Microsoft.Maps.IViewOptions>,
    pushpinList: Array as PropType<Pushpin<unknown>[]>,
    pushpinEvent: Object as PropType<PushpinEvent<unknown>>,
  },
  setup(props) {
    const isReadyBingMap = inject<Ref<boolean>>(isReadyBingMapKey)!;
    const bingMapRef = ref<HTMLElement | null>(null);
    const combinedViewOptions = ref<Microsoft.Maps.IViewOptions>({});
    const combinedMapOptions = ref<Microsoft.Maps.IMapOptions>({});
    const bingmap = ref<Microsoft.Maps.Map>();
    const mapTypeId = toRef(props, "mapTypeId");
    const mapOptions = toRef(props, "mapOptions");
    const viewOptions = toRef(props, "viewOptions");
    const pushpinList = toRef(props, "pushpinList");
    const pushpinEvent = toRef(props, "pushpinEvent");

    const createMap = () => {
      nextTick(() => {
        setCombinedMapOptions();
        setCombinedViewOptions();
        setBingMapContainer();
        setPushpin();
      });
    };

    const setCombinedMapOptions = () => {
      combinedMapOptions.value = {
        maxBounds: new Microsoft.Maps.LocationRect(
          new Microsoft.Maps.Location(0, 0),
          360,
          180
        ),
        showDashboard: false,
        showMapTypeSelector: false,
        enableClickableLogo: false,
        showLocateMeButton: false,
        showScalebar: false,
        showTermsLink: false,
        showZoomButtons: false,
        ...mapOptions.value,
      };
    };
    // combine viewOption (default setting & props setting)
    const setCombinedViewOptions = () => {
      combinedViewOptions.value = {
        zoom: 1,
        mapTypeId: Microsoft.Maps.MapTypeId[mapTypeId.value],
        ...viewOptions.value,
      };
    };

    // https://learn.microsoft.com/en-us/bingmaps/v8-web-control/map-control-api/map-class
    const setBingMapContainer = () => {
      if (!bingmap.value) {
        bingmap.value = new Microsoft.Maps.Map(bingMapRef.value!, {
          ...combinedMapOptions.value,
          ...combinedViewOptions.value,
        });
      }
    };
    const setPushpin = () => {
      // dispose pushpinList
      if (bingmap.value?.entities.getLength()) {
        for (let i = bingmap.value.entities.getLength() - 1; i >= 0; i--) {
          let pushpin = bingmap.value.entities.get(i);
          if (pushpin instanceof window.Microsoft.Maps.Pushpin) {
            bingmap.value.entities.removeAt(i);
          }
        }
      }
      // create pushpin
      if (bingmap.value && pushpinList.value) {
        pushpinList.value.map((pushpinProp) => {
          let pushpin = new window.Microsoft.Maps.Pushpin(
            new Microsoft.Maps.Location(
              pushpinProp.location.latitude,
              pushpinProp.location.longitude
            ),
            {
              icon: pushpinProp?.custom?.disabled
                ? markerDisabledIcon
                : markerDefaultIcon,
              ...pushpinProp.options,
            }
          );
          //Add mouse events to the pushpin.
          setPushPinEvent(pushpin, pushpinProp?.custom?.data);
          bingmap.value!.entities.push(pushpin);
        });
      }
    };
    // pushpin handler
    const setPushPinEvent = (
      pushpin: Microsoft.Maps.Pushpin,
      data: unknown
    ) => {
      if (pushpinEvent.value) {
        Object.keys(pushpinEvent.value).map((key) => {
          const eventName = key as PushpinEventKey;
          const pushpinHandler = pushpinEvent.value![eventName];
          Microsoft.Maps.Events.addHandler(
            pushpin,
            eventName,
            (
              event:
                | Microsoft.Maps.IMouseEventArgs
                | Microsoft.Maps.IPrimitiveChangedEventArgs
            ) => pushpinHandler!({ event, pushpin, data })
          );
        });
      }
    };

    const googleFullscreenButtonStyle = `
    position: absolute;
    z-index: 2;
    top: 0;
    right: 0;
    background: none rgb(255, 255, 255);
    margin: 10px;
    cursor: pointer;
    user-select: none;
    border-radius: 2px;
    height: 40px;
    width: 40px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px -1px;
    display: flex;
    justify-content: center;
    align-items: center;
    `;

    const expandIconUrl =
      "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M0%200v6h2V2h4V0H0zm16%200h-4v2h4v4h2V0h-2zm0%2016h-4v2h6v-6h-2v4zM2%2012H0v6h6v-2H2v-4z%22/%3E%3C/svg%3E";

    const contractIconUrl =
      "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20viewBox%3D%220%200%2018%2018%22%3E%3Cpath%20fill%3D%22%23666%22%20d%3D%22M4%204H0v2h6V0H4v4zm10%200V0h-2v6h6V4h-4zm-2%2014h2v-4h4v-2h-6v6zM0%2014h4v4h2v-6H0v2z%22/%3E%3C/svg%3E";

    const isFullScreened = ref<boolean>(false);

    const toggleFullScreen = async () => {
      if (isFullScreened.value) {
        await document.exitFullscreen();
        isFullScreened.value = false;
      } else {
        await bingMapRef.value?.requestFullscreen();
        isFullScreened.value = true;
      }
    };

    watch(
      isReadyBingMap,
      () => {
        if (isReadyBingMap.value) createMap();
      },
      { immediate: true }
    );

    watch(
      mapTypeId,
      (newVal: MapTypeId) => {
        if (bingmap.value && Object.keys(bingmap.value).length > 0) {
          bingmap.value.setMapType(Microsoft.Maps.MapTypeId[newVal]);
        }
      },
      { deep: true }
    );

    watch(
      pushpinList,
      () => {
        if (isReadyBingMap.value) createMap();
      },
      { deep: true }
    );

    return {
      isReadyBingMap,
      bingMapRef,
      combinedViewOptions,
      combinedMapOptions,
      bingmap,
      createMap,
      setCombinedMapOptions,
      setCombinedViewOptions,
      setBingMapContainer,
      setPushpin,
      setPushPinEvent,
      toggleFullScreen,
      googleFullscreenButtonStyle,
      expandIconUrl,
      contractIconUrl,
      isFullScreened,
    };
  },
});
</script>

<template>
  <div
    ref="bingMapRef"
    style="width: 100%; height: 100%"
  >
    <!-- expand or contract button -->
    <div
      :style="googleFullscreenButtonStyle"
      @click="toggleFullScreen"
    >
      <img
        :src="isFullScreened ? contractIconUrl : expandIconUrl"
        style="width: 18px; height: 18px"
      />
    </div>
  </div>
</template>
