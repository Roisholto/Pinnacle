const mainSearch = {
  namespaced: true,
  state: {
    search_text: '',
    stores: {
      search_text: '',
      record: {},
      items: []
    },
    rests: {
      search_text: '',
      record: {},
      items: []
    },
    items: {
      search_text: '',
      items: [],
      record: {}
    }
  },

  mutations: {
    update_search_string: function (state, payload) {
      state.search_text = payload
    },

    update_items: function (state, payload) {
      let section = payload.section
      if (payload.search_text) {
        if (payload.search_text != state[section].search_text) {
          state[section].items = []
          state[section].record = {}

          state[section].search_text = payload.search_text
        } else {
        }
      }
      for (let i = 0; i < payload.items.length; i++) {
        payload.items[i].rid = Math.random()
        state[section].items.push(payload.items[i])
      }
      // state[section].items.push(...payload.items);
      state[section].record = payload.record
    },

    update_sub_search_text: function (state, payload) {
      state[payload.where].search_text = payload.text
      // payload should be {where:'', txt:''}
    },
    init: function (state, payload) {
      switch (payload) {
        case 'items':
          state.items = { items: [], record: {} }
          break

        case 'rests' :
          state.rests = { outlets: [], record: {} }
          break

        case 'stores':
          state.stores = { outlets: [], record: {} }
          break
      }
    }
  },

  actions: {
    update_search: function (ctx, payload) {
      ctx.commit('update_search_string', payload)
    },

    init_data: function ({ commit }, payload) {
      // which => stores | rests |items
      commit('init', payload)
    },

    update_items ({ commit }, payload) {

    }
  }
}

export default mainSearch
