<template>
  <div class="uiControls">
    <slot></slot>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.uiControls {
  display: flex;
  flex-wrap: wrap;
  margin: 0 0 0 -17.5px;
  padding: 0;

  * {
    line-height: 1;
  }

  > * {
    padding: 5px 10px;
    vertical-align: middle;
    display: flex;
    align-items: center;

    &:not(:first-child) {
      border-left: 1px solid #DDD;
    }

    &:last-child {
      padding-right: 0;
    }
  }
}
</style>
