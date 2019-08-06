<template>
  <NuxtLink v-bind="$attrs"><slot></slot></NuxtLink>
</template>

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
