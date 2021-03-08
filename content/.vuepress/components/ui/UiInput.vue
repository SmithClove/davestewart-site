<template>
  <div class="uiInput">
    <input class="uiInput__text"
           type="text"
           autocomplete="off"
           placeholder="Type to filter..."
           v-model="input"
    >
    <span v-if="input"
          class="uiInput__clear"
          @click="input = ''"
    >&times;</span>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
    },

    placeholder: {
      type: String,
    },
  },

  computed: {
    input: {
      get () {
        return this.value
      },

      set (value) {
        this.$emit('input', value)
      }
    }
  },
}
</script>

<style lang="scss">
@import "../../styles/variables";
.uiInput {
  position: relative;
  display: flex;
  color: $textColor;
  font-size: 14px;
  line-height: 1;
  margin: 0 7px;

  &__clear {
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    bottom: 0;
    width: 30px;
    line-height: 30px;
    font-size: 1.3rem;
    //font-weight: 600;
    vertical-align: middle;
    text-align: center;
    color: $grey-light;
    cursor: default;
    &:hover {
      color: unset;
    }
  }
}
</style>
