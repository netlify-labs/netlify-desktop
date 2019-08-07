<template>
  <div class="scroll-panel">
    <Loading v-if="isLoading" :count="1" />
    <div v-else class="site-details">
      <h3>{{ currentSite.name }}</h3>
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
import { remote } from 'electron';
import { mapActions, mapState, mapGetters } from 'vuex';
import ContainerWithFooter from '~/components/ContainerWithFooter.vue';
import Loading from '~/components/Loading.vue';
import List from '~/components/ui/List.vue';
import ListItem from '~/components/ui/ListItem.vue';
import Deploy from '~/components/Deploy.vue';

const { Menu, MenuItem } = remote;

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
    const siteId = this.$route.params.id;

    this.getSite(siteId);
    this.getDeploys(siteId);
  },
  computed: {
    ...mapState('sites', ['currentSite']),
    ...mapState('deploys', ['deploys']),
    ...mapGetters('sites', ['isLoading', 'isDeployed']),
    ...mapGetters('deploys', {
      isLoadingDeploys: 'isLoading',
    }),
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.btn {
  margin-left: auto;
}
</style>
