<template>
  <div class="no-scroll-panel">
    <Loading v-if="loading"></Loading>
    <div class="sites-area" v-else>
      <input type="text" class="search" v-model="search" placeholder="Search Sites">
      <ul class="sites">
        <li class="site" v-for="site in filteredSites" :key="site.id">
          <font-awesome-icon icon="circle" class="deploy-status" :class="deployStatus(site)"></font-awesome-icon>
          <img :src="screenshot(site)" class="no-preview">
          <NuxtLink :to="'/sites/'+site.id" class="site-name">{{ siteTitle(site) }}</NuxtLink>
          <font-awesome-icon icon="chevron-right" class="icon"></font-awesome-icon>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import authHelper from "~/helpers/auth-helper"
import Loading from "~/components/Loading.vue"
export default {
  components: {
    Loading
  },
  async mounted() {
    const sites = await authHelper.api.listSites()
    this.setSites(sites)
    this.setTitle(`Sites (${this.sites.length})`)
    this.setLoading(false)
  },
  data() {
    return {
      search: ''
    }
  },
  computed: {
    filteredSites() {
      return this.sites.filter(site => {
        return this.siteTitle(site).toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    },
    ...mapGetters('sites', [
      'siteTitle',
      'deployStatus',
      'screenshot'
    ]),
    ...mapState('sites', [
      'sites'
    ]),
    ...mapState('nav', [
      'loading'
    ])
  },
  methods: {
    ...mapMutations('sites', [
      'setSites'
    ]),
    ...mapMutations('nav', [
      'setTitle',
      'setLoading'
    ])
  }
}
</script>
<style scoped>
.sites-area {
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.deploy-status {
  margin-right: 10px;
  font-size: 0.6rem;
  color: red;
}

.no-preview {
  width: 32px;
  border: 1px solid #CCC;
  margin-right: 10px;
  border-radius: 4px;
}

.deploy-status.deployed {
  color: green;
}

.search {
  font-size: 1rem;
}

.sites {
  overflow: scroll;
  flex-grow: 1;
}
.site {
  padding: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.site:hover {
  background-color: rgba(14,30,37,.05);
}

.site-name {
  font-weight: bold;
  flex-grow: 1;
  text-decoration: none;
  color: black;
}

.site:nth-child(2n) {
  background-color: rgba(14,30,37,.02);
}
</style>