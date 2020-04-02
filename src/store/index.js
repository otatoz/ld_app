import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import home from './modules/home'

export default new Vuex.Store({
  modules:{
    user,
    home
  }
})
