<template>
  <div id="app">
    <!-- <Loading/> -->
   <TopNav></TopNav>
   <!--router-view 是路由匹配到视图组件显示位置-->
   <div>
      <keep-alive>
        <router-view/> <!--歌曲的ID传入到App.vue --> 
      </keep-alive>
   </div>
   <Play :musicID="$root.playingMusic.musicID"></Play>
   <!-- <audio src="https://music.163.com/song/media/outer/url?id=1810021934.mp3"></audio> -->
  </div>
</template>

<script>
//App.vue也是组件  是根组件

import TopNav from './components/TopNav'
import Play from './components/Play'
// import Loading from './components/Loading'
export default {
  name:'App',
  components:{
    TopNav,
    Play
    // Loading
  },
  data(){
    return {
    }
  },
  methods:{
    playMusic(id){
      // console.log(id)
      this.musicID = id;
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
/* audio{
  width: 100%;
  height: 50px;
} */
</style>
