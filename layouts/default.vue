<template>
  <div class="content">
    <header class="header">
      <a class="back" @click="previousScreen">
        <font-awesome-icon
          icon="chevron-left"
          v-if="backButton"
        ></font-awesome-icon>
      </a>
      <h1 class="title">{{ title }}</h1>
      <img v-if="loggedIn" class="avatar" :src="userAvatar" />
    </header>
    <nuxt ref="page" />
    <footer class="footer"></footer>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
export default {
  head() {
    const self = this;

    return {
      changed(meta) {
        self.title = meta.title;
      },
    };
  },
  data() {
    return {
      title: '',
    };
  },
  computed: {
    ...mapState('nav', ['backButton']),
    ...mapState('auth', ['loggedIn']),
    ...mapGetters('auth', ['userAvatar']),
  },
  methods: {
    previousScreen() {
      this.$router.go(-1);
    },
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
  font-size: 16px;
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
