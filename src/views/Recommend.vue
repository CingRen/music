<template>
  <div class="Recommend">
    <Title>推荐歌单</Title>
    <ul class="recommendList">
      <router-link v-for="rem in recommendMusicList" :key="rem.id" to="/" tag="li">
      <div>
        <img :src="rem.picUrl" />
        <span>{{rem.playCount|formatNum}}</span>
      </div>
      <p>{{rem.name}}</p>
      </router-link>
    </ul>
    <Title>最新音乐</Title>
    
    <MusicItem :newMusicList="newMusicList"></MusicItem>
    
  </div>
</template>

<script>
import Title from '../components/Title'
import MusicItem from '../components/MusicItem'

export default {
  name: 'Recommend',
  components: {
    Title,
    MusicItem
  },
  data(){
    return {
      recommendMusicList:[],
      newMusicList:[],
      // hotSearch:[]
    }
  },

  beforeRouteEnter(to,from,next){//路由守卫，在路径进入之前获取数据
  //this不可用
    next(vm=>{
      vm.$http.get('/personalized?limit=6').then(data=>{
        vm.recommendMusicList=data;
        // console.log(data)
      });
      vm.$http.get('/personalized/newsong').then(data=>{//获取最新音乐列表
        vm.newMusicList=data;
        // console.log(data)
      });
      vm.$http.get('/search/hot/detail').then(data=>{//获取热门搜索
        vm.hotSearch=data.hots;
        console.log(data)
      });
    });
  },
  filters:{//拦截器
    formatNum(value){
      return (value/10000).toFixed(1)+"万"
    }
  }
}
</script>
<style lang="less" scoped>
  ul.recommendList{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    li{
      width: 33%;
      margin-bottom: 16px;
      div{
        position: relative;
        span{
          position: absolute;
          right: 3px;
          top: 2px;
          color: #fff;
          text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.5);
        }
      }
      p{
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          padding: 6px 2px 0 6px;
          min-height: 30px;
          line-height: 1.2;
          font-size: 13px;
          text-align: start;
        }
    }
  }
</style>
