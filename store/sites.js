export const state = {
  sites: [],
  currentSite: {},
  currentDeploys: []
}

export const getters = {
  siteTitle() {
    return (site) => {
      return site.custom_domain || site.name
    }
  },

  deployStatus() {
    return (site) => {
      const deployed = !!site.deploy_id
      return {'deployed': deployed}
    }
  },

  screenshot() {
    return (site) => {
      if(site.screenshot_url) {
        return site.screenshot_url
      }
      return require('~/assets/img/no-preview.png');
    }
  },

  isDeployed() {
    return (site) => {
      return !!site.deploy_id
    }
  },

  shortenCommitRef() {
    return (ref) => {
      return ref ? ref.slice(0, 7) : ''
    }
  }
}

export const mutations = {
  setSites (state, sites) {
    state.sites = sites
  },
  setCurrentSite (state, currentSite) {
    state.currentSite = currentSite
  },
  setCurrentDeploys (state, currentDeploys) {
    state.currentDeploys = currentDeploys
  }
}
