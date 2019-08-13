<template>
  <div class="scroll-panel">
    <Loading v-if="isLoading" :count="1" />
    <div v-else class="site-details">
      <h3>{{ currentSite.name }}</h3>
      <button
        :disabled="isDeploying"
        :class="{ loading: isDeploying }"
        type="button"
        class="btn"
        @click="triggerDeploy(siteId)"
      >
        Trigger deploy
      </button>
    </div>
    <Loading v-if="isLoadingDeploys" :count="3" />
    <div v-else>
      <List>
        <ListItem v-for="deploy in deploys" :key="deploy.id">
          <Deploy :deploy="deploy" :last-deploy-id="currentSite.deploy_id" />
        </ListItem>
      </List>
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
}

.btn {
  margin-top: 8px;
}
</style>
