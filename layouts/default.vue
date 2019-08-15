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
      <img v-if="loggedIn && userAvatar" class="avatar" :src="userAvatar" />
    </header>
    <nuxt ref="page" />
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';

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
    ...mapState('user', ['loggedIn']),
    ...mapGetters('user', ['userAvatar']),
  },
  methods: {
    ...mapActions('user', ['getCurrentUser']),
    previousScreen() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.getCurrentUser();
  },
  watch: {
    loggedIn: 'getCurrentUser',
  },
};
</script>
<style scoped>
.content {
  height: 100vh;
  display: grid;
  grid-template-rows: 50px auto;
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
