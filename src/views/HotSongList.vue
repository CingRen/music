<template>
    <div class="HotSongList">
        <div class="hotbg">
            <div class="hotlogo"></div>
            <div class="hotdate">更新日期：{{updateDate|formatDate}}</div>
        </div>

        <Loading v-if="hotMusicList.length<=0"></Loading>
        <ul>
            <ListItem v-for="(item,k) in hotMusicList" :num="k+1" :item="item" :key="item.id">
                <div class="right">{{k+1}}</div>
            </ListItem>
        </ul>
        
        <!-- <router-link :to="`/hot/${num+1}`">查看更多</router-link> -->
        <button @click="loadMusic(++num)">查看更多...</button>
        <p class="kongge"></p>

    </div>
</template>
<script>

import ListItem from '../components/ListItem'
import Loading from '../components/Loading'

export default {
    name:"HotSongList",
    components:{
        ListItem,
        Loading
    },
    data(){
        return {
            updateDate:new Date(),
            hotMusicList:[],
            num:1
        }
    },
    methods:{
        loadMusic(vmm){
            // console.log(vmm)
            let musicids=[];
            // this.num++;
            this.$http.get('/top/list?idx=1').then(data=>{//获取热榜信息
                this.updateDate = data.playlist.updateTime;//获取更新日期
                musicids=data.playlist.trackIds.slice(20*(vmm-1),20*vmm);
                // console.log(vmm)
            }).then(()=>{
                for(let v of musicids){
                    this.$http.get('song/detail?ids='+v.id).then((data)=>{//根据热榜里面的歌曲id获取歌曲详细信息
                        this.hotMusicList.push({
                            name:data.songs[0].name,
                            id:data.songs[0].id,
                            song:{
                                privilege:{
                                    maxbr:data.privileges[0].maxbr
                                },
                                artists:data.songs[0].ar
                            }
                        });
                        // console.log(data)
                    })
                }
            }).catch(error=>{
                console.log(error)
            });
        }
    },
    beforeRouteEnter(to,from,next){//路由守卫，在路径进入之前获取数据
    //this不可用
    next(vm=>{
        vm.hotMusicList=[];
        vm.loadMusic(vm.num);
    });
  },
  beforeRouteUpdate(to,from,next){
      this.loadMusic()
      next();
  },
  filters:{
      formatDate(value){
          let d=new Date(value);
          let month = (d.getMonth()+1);
          let ri = (d.getDate());
          return (month<10?"0"+month:month)+"月"+(ri <10 ? "0"+ri : ri)+"日";
      }
  }
}
</script>
<style lang="less" scoped>
    .HotSongList{
        .hotbg{
            width: 100%;
            min-height: 180px;
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
        .kongge{
            height: 20px;
        }
    }
    .red{
        color: red;
    }
</style>