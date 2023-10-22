<script lang="ts">
import markerDefaultIcon from "~assets/images/common-component/map-marker-default.svg";
import markerDisabledIcon from "~assets/images/common-component/map-marker-disabled.svg";

import {
  defineComponent,
  type PropType,
  ref,
  toRef,
  onMounted,
  watch,
  nextTick,
} from "@vue/composition-api";

import type {
  MarkerEventKey,
  MapEventKey,
  MarkerListType,
  MarkerEventType,
  MapEventType,
} from "../../types/GoogleMap/index";

export default defineComponent({
  name: "GoogleMap",
  props: {
    // TODO(emoldino-woojin): Add specific type
    markerList: Array as PropType<MarkerListType<unknown>[]>,
    markerEvent: Object as PropType<MarkerEventType<unknown>>,
    mapEvent: Object as PropType<MapEventType>,
  },
  setup(props) {
    const map = ref<google.maps.Map>();
    const markerArray = ref<google.maps.Marker[]>([]);

    const markerList = toRef(props, "markerList");
    const markerEvent = toRef(props, "markerEvent");
    const mapEvent = toRef(props, "mapEvent");

    const googleMap = ref<HTMLElement | null>(null);

    onMounted(() => {
      nextTick(() => {
        void initMap();
      });
    });

    watch([markerList, markerEvent, mapEvent], async () => {
      void (await initMap());
    });

    const initMap = async () => {
      await createMap();
      await createMarker();
    };

    const createMap = async () => {
      const { Map } = (await google.maps.importLibrary(
        "maps"
      )) as google.maps.MapsLibrary;

      if (!map.value) {
        map.value = new Map(googleMap.value!, {
          center: { lat: 26.7, lng: 37.3 }, // Center Coordinates: Egypt (temporary, for world map visibility)
          zoom: 1,
          mapId: "81f292f6820c498f", // Create google mapID with emoldino google account (gcp-manager@emoldino.com)
          fullscreenControl: true,
          mapTypeControl: false,
          zoomControl: false,
          streetViewControl: false,
          restriction: {
            latLngBounds: { north: 85, south: -85, west: -180, east: 180 }, // Boundary setting. Handled so that it does not drag beyond the south north boundary.
          },
        });
      }
      setMapHandler();
    };

    const createMarker = async () => {
      const { Marker } = (await google.maps.importLibrary(
        "marker"
      )) as google.maps.MarkerLibrary;

      if (markerArray.value) {
        markerArray.value.map((marker: google.maps.Marker) => {
          marker.setMap(null);
        });
      }

      if (props.markerList) {
        props.markerList.map((item) => {
          let marker = new Marker({
            map: map.value,
            icon: {
              url: item?.custom?.disabled
                ? markerDisabledIcon
                : markerDefaultIcon,
            },
            position: item.markerOptions.position,
            title: item.markerOptions.title,
          });
          setMarkerHandler(marker, item?.custom?.data);
          markerArray.value.push(marker);
        });
      }
    };

    // TODO(emoldino-woojin): Add specific type
    const setMarkerHandler = (marker: google.maps.Marker, data?: unknown) => {
      let markerEvent = props.markerEvent;
      if (markerEvent) {
        Object.keys(markerEvent).map((key) => {
          const eventName = key as MarkerEventKey;
          const markerHandler = markerEvent![eventName];
          if (markerHandler) {
            // If there is an existing marker event, it is removed.
            const hasListener = google.maps.event.hasListeners(
              marker,
              eventName
            );
            if (hasListener) {
              google.maps.event.clearListeners(marker, eventName);
            }
            // Add marker event
            marker.addListener(
              eventName,
              (event: google.maps.MapMouseEvent) => {
                markerHandler({ event, marker, data });
              }
            );
          }
        });
      }
    };
    const setMapHandler = () => {
      let mapEvent = props.mapEvent;
      if (mapEvent) {
        Object.keys(mapEvent).map((key) => {
          const eventName = key as MapEventKey;
          const mapHandler = mapEvent![eventName];
          if (mapHandler && map.value) {
            // If there is an existing map event, it is removed.
            const hasListener = google.maps.event.hasListeners(
              map.value,
              eventName
            );
            if (hasListener) {
              google.maps.event.clearListeners(map.value, eventName);
            }
            // Add map event
            map.value.addListener(
              eventName,
              (event: google.maps.MapMouseEvent) => {
                mapHandler(event);
              }
            );
          }
        });
      }
    };

    return {
      map,
      markerArray,
      googleMap,
      initMap,
      createMap,
      createMarker,
      setMarkerHandler,
      setMapHandler,
    };
  },
});
</script>

<template>
  <div
    ref="googleMap"
    style="width: 100%; height: 100%"
  ></div>
</template>
