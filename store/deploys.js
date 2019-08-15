import auth from '~/helpers/auth-helper';

export const state = () => ({
  deploys: [],
  state: '',
});

export const getters = {
  isLoading: state => state.state === 'loading',
  isDeploying: state => state.state === 'loading_deploy',
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
  async triggerDeploy({ commit, dispatch }, site_id) {
    commit('REQUEST_TRIGGER_DEPLOY');

    try {
      await auth.api.createSiteBuild({ site_id });

      commit('RECEIVE_TRIGGER_DEPLOY_SUCCESS');
      dispatch('getDeploys', site_id);
    } catch (e) {
      commit('RECEIVE_TRIGGER_DEPLOY_ERROR');

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

  REQUEST_TRIGGER_DEPLOY(state) {
    state.state = 'loading_deploy';
  },
  RECEIVE_TRIGGER_DEPLOY_SUCCESS(state) {
    state.state = '';
  },
  RECEIVE_TRIGGER_DEPLOY_ERROR(state) {
    state.state = 'error_deploy';
  },
};
