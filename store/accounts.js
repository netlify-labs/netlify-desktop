import auth from '~/helpers/auth-helper';

export const state = {
  currentAccount: {},
  accounts: [],
  state: '',
};

export const getters = {
  isLoading: state => state.state === 'loading',
};

export const actions = {
  async getAccounts({ commit }) {
    commit('REQUEST_ACCOUNTS');

    try {
      const accounts = await auth.api.listAccountsForUser();

      commit('RECEIVE_ACCOUNTS_SUCCESS', accounts);
      commit('SET_CURRENT_ACCOUNT', accounts[0]);
    } catch (e) {
      commit('RECEIVE_ACCOUNTS_ERROR');
      throw e;
    }
  },
  setCurrentAccount({ commit, dispatch }, account) {
    commit('SET_CURRENT_ACCOUNT', account);
    dispatch('sites/getSites', null, { root: true });
  },
};

export const mutations = {
  REQUEST_ACCOUNTS(state) {
    state.state = 'loading';
  },
  RECEIVE_ACCOUNTS_SUCCESS(state, payload) {
    state.accounts = payload;
    state.state = 'success';
  },
  RECEIVE_ACCOUNTS_ERROR(state) {
    state.state = 'error';
  },

  SET_CURRENT_ACCOUNT(state, account) {
    state.currentAccount = account;
  },
};
