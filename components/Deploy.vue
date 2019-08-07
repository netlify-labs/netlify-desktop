<template>
  <div class="deploy">
    <a :href="deploy.deploy_ssl_url" class="context"
      ><strong>{{ context }}</strong></a
    >: {{ deploy.branch }}@<a :href="deploy.commit_url" class="monospace ref">{{
      commitRef
    }}</a>
    <BlockLink :href="deploy.admin_url + '/deploys/' + deploy.id" component="a">
      <Badge
        :variant="statusVariant"
        :class="{ visuallyhidden: statusText === 'success' }"
        >{{ statusText }}</Badge
      >
    </BlockLink>
  </div>
</template>

<script>
import BlockLink from './ui/BlockLink.vue';
import Badge from './ui/Badge.vue';

const IN_PROGRESS = 'in-progress';
const SKIPPED = 'skipped';
const SUCCESS = 'success';
const ERROR = 'error';
const REJECTED = 'rejected';
const FAILED = 'failed';
const PUBLISHED = 'published';

export default {
  components: {
    Badge,
    BlockLink,
  },
  props: {
    lastDeployId: {
      type: String,
      required: false,
      default: '',
    },
    deploy: {
      type: Object,
      required: true,
    },
  },
  computed: {
    context() {
      return (
        this.deploy.context.charAt(0).toUpperCase() +
        this.deploy.context.slice(1)
      );
    },
    commitRef() {
      return (this.deploy.commit_ref || 'HEAD').substring(0, 7);
    },
    statusText() {
      if (this.lastDeployId === this.deploy.id) {
        return PUBLISHED;
      }

      if (this.deploy.skipped) {
        return SKIPPED;
      }

      return (
        {
          ready: SUCCESS,
          done: SUCCESS,
          error: FAILED,
        }[this.deploy.state] || this.deploy.state
      );
    },
    statusVariant() {
      if (!this.deploy) {
        return null;
      }

      if (this.deploy.skipped) {
        return SKIPPED;
      }

      return (
        {
          ready: SUCCESS,
          done: SUCCESS,
          error: ERROR,
          rejected: REJECTED,
        }[this.deploy.state] || IN_PROGRESS
      );
    },
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.deploy {
  width: 100%;
}

.context {
  position: relative;
  color: #000;
  z-index: 1;
}

.ref {
  position: relative;
  color: inherit;
  border-bottom: 1px solid #e1e2e4;
  z-index: 1;
}

.ref:hover {
  border-bottom: 1px solid;
}
</style>
