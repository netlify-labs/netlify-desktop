export const state = () => ({
  backButton: false,
});

export const mutations = {
  setBackButton(state, backButton) {
    state.backButton = backButton;
  },
};
