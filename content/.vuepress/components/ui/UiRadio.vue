<template>
  <div class="uiRadio">
    <label v-if="label"
           class="uiRadio__label"
           :data-count="count"
           :data-count-state="countState"
    >{{ label }}:</label>
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

    count: {
      type: [Number, String]
    },

    countState: {
      type: [Number, String]
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
    position: relative;
    padding: .5em;
    font-weight: 600;

    &[data-count]:after {
      position: absolute;
      content: attr(data-count);
      font-size: .8em;
      color: $accentColor;
      top: 1px;
      right: -1px;
    }

    &[data-count][data-count-state="0"]:after {
      color: $grey-light;
    }

    &[data-count=""]:after {
      color: white !important;
    }
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
