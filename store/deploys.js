import auth from '~/helpers/auth-helper';

export const state = () => ({
  deploys: [],
  state: '',
});

export const getters = {
  isLoading: state => state.state === 'loading',
};

export const actions = {
  async getDeploys({ commit }, site_id) {
    commit('REQUEST_DEPLOYS');

    try {
      const deploys = await auth.api.listSiteDeploys({ site_id });

      commit('RECEIVE_DEPLOYS_SUCCESS', deploys);
    } catch (e) {
      commit('RECEIVE_DEPLOYS_ERROR');
    }
  },
  async triggerDeploy(_, site_id) {
    try {
      await auth.api.createSiteBuild({ site_id });
    } catch (e) {
      throw e;
    }
  },
};

export const mutations = {
  REQUEST_DEPLOYS(state) {
    state.state = 'loading';
  },
  RECEIVE_DEPLOYS_SUCCESS(state, payload) {
    state.deploys = payload.filter(d => d.context === 'production');
    state.state = 'success';
  },
  RECEIVE_DEPLOYS_ERROR(state) {
    state.state = 'error';
  },
};
