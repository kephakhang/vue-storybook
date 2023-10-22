<script>
export default {
  /**
   * @deprecated
   */
  props: {
    styleProps: String,
  },
};
</script>

<template>
  <div
    class="no-data-chart"
    :style="styleProps"
  >
    No Data Available
  </div>
</template>

<style scoped>
.no-data-chart {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #efefef;
  font-size: 12px;
  color: #4b4b4b;
}
</style>
