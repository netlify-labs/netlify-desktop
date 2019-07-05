export default function (context) {
  context.store.commit('nav/setLoading', true)
  context.store.commit('nav/setTitle', '')
}