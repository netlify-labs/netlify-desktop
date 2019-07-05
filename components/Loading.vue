<template>
  <div class="loading">
    <div class="line" v-for="line in 9" :key="line"></div>
  </div>
</template>
<style scoped>
.loading {
  padding: 10px;
}
.line {
  height: 15px;
  margin-bottom: 15px;
  border-radius: 2px;
  background: linear-gradient(90deg, rgba(204, 204, 204, 1.0), rgba(204, 204, 204, 0.2));
  background-size: 400% 400%;
  animation: Loading 3s ease infinite;
}

@keyframes Loading {
  0%{
    background-position:0% 50%;
    width: 0%;
  }
  50%{
    background-position:100% 50%;
    width: 50%;
  }
  100%{
    background-position:0% 50%;
    width: 100%;
  }
}
</style>