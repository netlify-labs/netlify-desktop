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
};

export const actions = {
  async getSites({ commit }) {
    commit('REQUEST_SITES');

    try {
      const sites = await auth.api.listSites();

      commit('RECEIVE_SITES_SUCCESS', sites);
    } catch (e) {
      commit('RECEIVE_SITES_ERROR');

      throw e;
    }
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
};
