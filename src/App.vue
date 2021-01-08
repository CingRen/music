<template>
  <div id="app">
   <TopNav></TopNav>
   <!--router-view 是路由匹配到视图组件显示位置-->
   <keep-alive>
      <router-view/>
   </keep-alive>
  </div>
</template>

<script>
//App.vue也是组件  是根组件
import TopNav from './components/TopNav'
export default {
  name:'App',
  components:{
    TopNav
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
</style>
