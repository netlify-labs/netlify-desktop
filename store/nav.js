export const state = () => ({
  backButton: false,
  title: '',
  loading: true
})

export const mutations = {
  setBackButton (state, backButton) {
    state.backButton = backButton
  },
  setTitle (state, title) {
    state.title = title
  },
  setLoading (state, loading) {
    state.loading = loading
  }
}
