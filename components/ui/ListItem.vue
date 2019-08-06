<template>
  <li>
    <slot></slot>
  </li>
</template>

<style scoped>
li {
  display: flex;
  position: relative;
  padding: 12px 8px;
  align-items: center;
}

li:nth-child(even) {
  background-color: rgba(14, 30, 37, 0.02);
}

li:hover {
  background-color: rgba(14, 30, 37, 0.05);
}
</style>
