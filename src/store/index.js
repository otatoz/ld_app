import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import user from './modules/user'
import home from './modules/home'
import article from './modules/article'
import video from './modules/video'

export default new Vuex.Store({
  modules:{
    user,
    home,
    article,
    video
  }
})
