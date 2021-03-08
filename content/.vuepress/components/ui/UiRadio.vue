<template>
  <div class="uiRadio">
    <label class="uiRadio__label">{{ label }}:</label>
    <span v-for="option in options"
       class="uiRadio__option"
    ><a :href="`/search/?${name}=${option}`"
        :class="{ selected: option === value }"
        @click.prevent="click(option)">{{ option }}</a>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },

    name: {
      type: String,
    },

    options: {
      type: Array,
    },

    value: {
      type: String,
    },

  },

  methods: {
    click (value) {
      this.$emit('input', value)
    },
  },
}
</script>

<style lang="scss">
@import "../../styles/variables";

.uiRadio {
  display: flex;
  align-items: center;
  white-space: nowrap;
  color: $textColor;
  font-size: 14px;
  text-transform: capitalize;
  line-height: 1;

  &__label {
    padding: .5em;
    font-weight: 600;
  }

  &__option {

    a {
      color: $grey-light;
      padding: 3px 7px;
      &.selected {
        color: $accentColor;
      }
    }
  }
}
</style>
