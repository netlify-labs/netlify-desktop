<template>
  <div class="scroll-panel">
    <template v-if="loading">
      <Loading></Loading>
    </template>
    <template v-else>
      <div class="site-details">
        <h3>{{ currentSite.name }}</h3>
        <section v-if="isDeployed(currentSite)">
          <h3>Production Deploys</h3>
          <ul>
            <li v-for="deploy in currentDeploys" :key="deploy.id">
              {{deploy.context}}
              {{deploy.branch}}
              {{shortenCommitRef(deploy.commit_ref)}}
              {{deploy.title}}
            </li>
          </ul>
        </section>
        <p v-else class="alert alert-warning">Not yet deployed</p>
      </div>
    </template>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import Loading from "~/components/Loading.vue"
import authHelper from "~/helpers/auth-helper"
export default {
  components: {
    Loading
  },
  async mounted() {
    const site_id = this.$route.params.id
    const site = await authHelper.api.getSite({ site_id })
    const deploys = await authHelper.api.listSiteDeploys({ site_id })
    this.setCurrentSite(site)
    this.setCurrentDeploys(deploys)
    this.setTitle(site.name)
    this.setLoading(false)
  },

  computed: {
    ...mapState('nav', [
      'loading'
    ]),
    ...mapState('sites', [
      'currentSite',
      'currentDeploys'
    ]),
    ...mapGetters('sites', [
      'siteTitle',
      'isDeployed',
      'shortenCommitRef'
    ])
  },

  methods: {
    ...mapMutations('sites', [
      'setCurrentSite',
      'setCurrentDeploys'
    ]),
    ...mapMutations('nav', [
      'setTitle',
      'setLoading'
    ])
  }
}
</script>
<style>
  .site-details {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
  }
</style>
