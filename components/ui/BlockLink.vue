<template>
  <component :is="component" v-bind="$attrs"><slot></slot></component>
</template>

<script>
export default {
  props: {
    component: {
      type: String,
      required: false,
      default: 'nuxt-link',
    },
  },
};
</script>

<style scoped>
a {
  font-weight: bold;
  text-decoration: none;
  color: #000;
}

a::before {
  content: '';
  display: block;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 0;
}
</style>
