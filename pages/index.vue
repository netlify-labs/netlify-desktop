<template>
  <div class="authentication">
    <h1 class="title">Netlify Desktop</h1>
    <a class="btn btn-primary" @click="login" v-if="!loggedIn">Authenticate</a>
  </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from 'vuex';
import authHelper from '~/helpers/auth-helper';
export default {
  async created() {
    this.gotoDeploys();
  },

  computed: {
    ...mapState('user', ['loggedIn']),
  },

  methods: {
    ...mapActions('user', ['setLoggedIn']),
    async login() {
      const token = await authHelper.login();
      this.gotoDeploys();
    },
    gotoDeploys() {
      this.setLoggedIn(authHelper.isLoggedIn);
      if (this.loggedIn) {
        this.$router.push({ name: 'sites' });
      }
    },
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 10px;
}
.authentication {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
