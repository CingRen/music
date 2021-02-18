import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
// import { turn } from 'core-js/fn/array'

Vue.config.productionTip = false
let playingMusic={
  musicID:0,
  musicIDList:[],
  isPlay:true,
  playingList:[],
  myListSongList:[]
}
new Vue({
  router,
  data:{
    playingMusic
  },
  render: h => h(App)
}).$mount('#app')
