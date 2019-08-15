<template>
  <div class="scroll-panel">
    <Loading v-if="isLoading" :count="1" />
    <div v-else class="site-details">
      <h3>{{ currentSite.name }}</h3>
      <div class="site-actions-container">
        <a :href="currentSite.admin_url" class="btn">Open</a>
        <button
          v-if="isDeployed"
          :disabled="isDeploying"
          :class="{ loading: isDeploying }"
          type="button"
          class="btn"
          @click="triggerDeploy(siteId)"
        >
          Trigger deploy
        </button>
      </div>
      <p v-if="!isDeployed" class="error">Site has not yet been deployed</p>
    </div>
    <Loading v-if="isLoadingDeploys" :count="3" />
    <div v-else>
      <List v-if="isDeployed">
        <ListItem v-for="deploy in deploys" :key="deploy.id">
          <Deploy :deploy="deploy" :last-deploy-id="currentSite.deploy_id" />
        </ListItem>
      </List>
      <section v-else class="deploy-message">
        <h3>Deploy straight from Git</h3>
        <p>
          Netlify will run your build command and deploy the result whenever you
          push to your Git repository, or if you prefer, drag a project folder
          to the deploy drop zone located at the bottom of the Deploys page.
        </p>
        <a
          href="https://www.netlify.com/docs/continuous-deployment"
          class="action-link"
          >Learn more about Deploys</a
        >
      </section>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Loading from '~/components/Loading.vue';
import List from '~/components/ui/List.vue';
import ListItem from '~/components/ui/ListItem.vue';
import Deploy from '~/components/Deploy.vue';

export default {
  head() {
    return {
      title: this.currentSite.name,
    };
  },
  components: {
    Deploy,
    List,
    ListItem,
    Loading,
  },
  mounted() {
    this.getSite(this.siteId);
    this.getDeploys(this.siteId);
  },
  computed: {
    ...mapState('sites', ['currentSite']),
    ...mapState('deploys', ['deploys']),
    ...mapGetters('sites', ['isLoading', 'isDeployed']),
    ...mapGetters('deploys', {
      isLoadingDeploys: 'isLoading',
      isDeploying: 'isDeploying',
    }),
    siteId() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions('sites', ['getSite', 'resetCurrentSite']),
    ...mapActions('deploys', ['getDeploys', 'triggerDeploy']),
  },
  beforeDestroy() {
    this.resetCurrentSite();
  },
};
</script>

<style>
.site-details {
  padding: 20px;
  box-shadow: 0 2px 4px 0 rgba(14, 30, 37, 0.12);
}

.deploy-message {
  padding: 20px;
}
.deploy-message p {
  margin: 8px 0 0;
}

.btn {
  margin-top: 8px;
}

.site-actions-container {
  display: flex;
}

.site-actions-container .btn {
  margin-right: 8px;
}
</style>
