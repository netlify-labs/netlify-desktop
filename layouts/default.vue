<template>
  <div class="content">
    <header class="header">
      <a class="back" @click="previousScreen">
        <font-awesome-icon
          icon="chevron-left"
          v-if="backButton"
        ></font-awesome-icon>
      </a>
      <span class="title">{{ title }}</span>
      <img class="avatar" :src="userAvatar" v-if="loggedIn" />
    </header>
    <nuxt />
    <footer class="footer"></footer>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  computed: {
    ...mapState('nav', ['backButton']),
    ...mapState('auth', ['loggedIn']),
    ...mapGetters('auth', ['userAvatar']),
  },
  methods: {
    previousScreen() {
      this.$router.go(-1);
    },
    ...mapMutations('nav', ['setTitle']),
  },
  mounted() {
    console.log(this);
  },
};
</script>
<style scoped>
.content {
  height: 100vh;
  display: grid;
  grid-template-rows: 50px auto 50px;
}
.header,
.footer {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 9px;
  background: #0e1e24;
}

.back {
  width: 12px;
  color: white;
  cursor: pointer;
}

.title {
  color: white;
  flex-grow: 1;
  text-align: center;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 100%;
  color: white;
  border: 2px solid #717e82;
}
</style>
