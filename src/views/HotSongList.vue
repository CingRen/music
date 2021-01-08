<template>
    <div class="HotSongList">
        <div class="hotbg">
            <div class="hotlogo"></div>
            <div class="hotdate">更新日期：01月15日</div>
        </div>
        <div><MusicItem :hotList="hotList"></MusicItem></div>
    </div>
</template>
<script>

import MusicItem from '../components/MusicItem'

export default {
    name:"HotSongList",
    components:{
        MusicItem
    },
    data(){
        return {
            hotList:[]
        }
    },
    beforeRouteEnter(to,from,next){//路由守卫，在路径进入之前获取数据
    //this不可用
    next(vm=>{
      vm.$http.get('/personalized/newsong').then(data=>{//获取最新音乐列表
        vm.hotList=data;
        // console.log(data)
      });
    });
  },
}
</script>
<style lang="less" scoped>
    .HotSongList{
        .hotbg{
            width: 100%;
            height: 180px;
            background-image: url(../assets/hot_music_bg_3x.jpg);
            background-size: 100% 100%;
            position: relative;
            .hotlogo{
                position: absolute;
                top: 30px;
                left: 20px;
                width: 142px;
                height: 67px;
                background-color: blue;
                background: url(../assets/index_icon_3x.png) no-repeat;
                background-position: -24px -30px;
                background-size: 166px 97px;
            }
            .hotdate{
                position: absolute;
                top: 110px;
                left: 20px;
                color: #fff;
                font-size: 10px;
            }
        }
    }
</style>