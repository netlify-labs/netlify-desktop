export default function(context) {
  context.store.commit('nav/setBackButton', context.route.name !== 'sites');
}
