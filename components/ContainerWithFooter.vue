<template>
  <div class="container">
    <div class="scroll-panel">
      <slot></slot>
    </div>
    <footer class="footer">
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  grid-template-rows: auto 50px;
}

.footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 9px;
  background: #0e1e24;
}
</style>
