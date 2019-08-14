import auth from '~/helpers/auth-helper';

export const state = () => ({
  sites: [],
  state: '',
  currentSite: {},
  currentDeploys: [],
});

export const getters = {
  isLoading: state => state.state === 'loading',
  isError: state => state.state === 'error',
  isDeployed: state => state.currentSite.deploy_id,
};

export const actions = {
  async getSites({ commit, rootState: { accounts } }) {
    commit('REQUEST_SITES');

    try {
      const sites = await auth.api.listSitesForAccount({
        account_slug: accounts.currentAccount.slug,
      });

      commit('RECEIVE_SITES_SUCCESS', sites);
    } catch (e) {
      commit('RECEIVE_SITES_ERROR');

      throw e;
    }
  },
  async getSite({ commit }, site_id) {
    commit('REQUEST_SITE');

    try {
      const site = await auth.api.getSite({ site_id });

      commit('RECEIVE_SITE_SUCCESS', site);
    } catch (e) {
      commit('RECEIVE_SITE_ERROR');
      throw e;
    }
  },
  resetCurrentSite({ commit }) {
    commit('RESET_CURRENT_SITE');
  },
};

export const mutations = {
  REQUEST_SITES(state) {
    state.state = 'loading';
  },
  RECEIVE_SITES_SUCCESS(state, payload) {
    state.sites = payload;
    state.state = 'success';
  },
  RECEIVE_SITES_ERROR(state) {
    state.state = 'error';
  },

  REQUEST_SITE(state) {
    state.state = 'loading';
  },
  RECEIVE_SITE_SUCCESS(state, payload) {
    state.currentSite = payload;
    state.state = 'success';
  },
  RECEIVE_SITE_ERROR(state) {
    state.state = 'error';
  },
  RESET_CURRENT_SITE(state) {
    state.currentSite = {};
  },
};
