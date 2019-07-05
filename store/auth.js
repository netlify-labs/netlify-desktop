import authHelper from "../helpers/auth-helper"
export const state = () => ({
  user: {},
  loggedIn: false,
})

export const getters = {
  userId() {
    return authHelper.userId
  },
  userAvatar() {
    return authHelper.userAvatar
  }
}

export const mutations = {
  setUser (state, user) {
    state.user = user
  },
  setLoggedIn(state, loggedIn) {
    state.loggedIn = loggedIn
  }
}
