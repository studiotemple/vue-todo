export default {
  namespaced: true,
  state: () => ({
    a: 123,
    b: []
  }),
  getters: {
    someGetter1 (state, getters) {
      return state.a + 1
    },
    someGetter2 (state, getters) {
      return state.a + getters.someGetter1
    }
  },
  mutations: {
    someMutatios (state, payload) {
      state.a = 789
      state.b.push(payload)
    }
  },
  actions: {
    someAction1 ({ state, getters, commit, dispatch }, payload) {
      state.a = 789
      state.b.push(payload)
      commit('someMutatios', payload)
    },
    someAction2 (context, payload) {
      context.commit('someMutation')
      context.dispatch('someAction1', payload)
    }
  }
}
