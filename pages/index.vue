<template>
  <div class="authentication">
    <h1 class="title">Netlify Desktop</h1>
    <a class="btn btn-primary" @click="login" v-if="!loggedIn">Authenticate</a>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex"
import authHelper from "~/helpers/auth-helper"
export default {
  async created() {
    this.gotoDeploys();
  },

  computed: {
    ...mapState('auth', [
      'loggedIn'
    ])
  },

  methods: {
    async login() {
      const token = await authHelper.login()
      this.gotoDeploys()
    },
    setLoginState() {
      this.setLoggedIn(authHelper.isLoggedIn)
    },
    gotoDeploys() {
      this.setLoginState()
      if(this.loggedIn) {
        this.$router.push({name: 'sites'})
      }
    },
    ...mapMutations('auth', [
      'setUser',
      'setLoggedIn'
    ])
  }
}
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
