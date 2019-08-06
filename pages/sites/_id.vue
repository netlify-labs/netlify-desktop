<template>
  <div class="scroll-panel">
    <Loading v-if="isLoading" />
    <div v-else class="site-details">
      <h3>{{ currentSite.name }}</h3>
    </div>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from 'vuex';
import Loading from '~/components/Loading.vue';

export default {
  head() {
    return {
      title: this.currentSite.name,
    };
  },
  components: {
    Loading,
  },
  mounted() {
    this.getSite(this.$route.params.id);
  },
  computed: {
    ...mapState('sites', ['currentSite']),
    ...mapGetters('sites', ['isLoading']),
  },
  methods: {
    ...mapActions('sites', ['getSite', 'resetCurrentSite']),
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
</style>
