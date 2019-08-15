import auth from '~/helpers/auth-helper';

export const state = () => ({
  user: {},
  loggedIn: false,
});

export const getters = {
  userAvatar: state => state.user.avatar_url,
};

export const actions = {
  async getCurrentUser({ commit }) {
    try {
      const user = await auth.api.getCurrentUser();

      commit('RECEIVE_USER_SUCCESS', user);
    } catch (e) {
      throw e;
    }
  },
  setLoggedIn({ commit }, loggedIn) {
    commit('SET_LOGGED_IN', loggedIn);
  },
};

export const mutations = {
  RECEIVE_USER_SUCCESS(state, data) {
    state.user = data;
  },
  SET_LOGGED_IN(state, loggedIn) {
    state.loggedIn = loggedIn;
  },
};
