<template>
  <div class="scroll-panel">
    <Loading v-if="isLoading"></Loading>
    <FilteredList
      v-else
      :data="sites"
      :filterKeys="['custom_domain', 'name']"
      placeholder="Search site"
    >
      <template #row="{ data }">
        <img
          :src="data.screenshot_url || require('~/assets/img/no-preview.png')"
          class="no-preview"
        />
        <BlockLink
          :to="{ name: 'sites-id', params: { id: data.id } }"
          class="site-name"
        >{{ data.custom_domain || data.name }}</BlockLink>
        <font-awesome-icon icon="chevron-right" class="icon" />
      </template>
    </FilteredList>
  </div>
</template>
<script>
import { mapActions, mapState, mapGetters } from "vuex";
import Loading from "~/components/Loading.vue";
import BlockLink from "~/components/ui/BlockLink.vue";
import FilteredList from "~/components/ui/FilteredList.vue";

export default {
  head() {
    return {
      title: `Sites (${this.sites.length})`
    };
  },
  components: {
    BlockLink,
    FilteredList,
    Loading
  },
  mounted() {
    if (this.sites.length === 0) {
      this.getSites();
    }
  },
  computed: {
    ...mapGetters("sites", ["isLoading"]),
    ...mapState("sites", ["sites"])
  },
  methods: {
    ...mapActions("sites", ["getSites"])
  }
};
</script>
<style scoped>
.sites-area {
  position: relative;
}

.no-preview {
  width: 32px;
  border: 1px solid #ccc;
  margin-right: 10px;
  border-radius: 4px;
}

.icon {
  margin-left: auto;
}
</style>
