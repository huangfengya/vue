<template>
  <div class="progress-circle">
    <svg width="32" height="32" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"></circle>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="314" :stroke-dashoffset="dashOffset"></circle>
    </svg>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['percent'],
  computed: {
    dashOffset() {
      return 100 * Math.PI * (1 - this.percent)
    }
  }
}
</script>


<style lang="less" scoped>
.progress-circle {
  position: relative;
  circle {
    stroke-width: 8px;
    transform-origin: center;
    &.progress-background {
      transform: scale(0.9);
      stroke: lightcoral;
    }
    &.progress-bar {
      transform: scale(0.9) rotate(-90deg);
      stroke: lightpink;
    }
  }
}
</style>

