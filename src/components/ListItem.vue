<template>
  <li :key="item.id">
    <div :class="{red : num<4}" class="right" v-if="num > 0 ">{{num|formatNum}}</div>
    <div class="addList" @click="addList"></div>
    <div class="left" @click='playMusic'>
      <div>{{ item.name }}</div>
      <p>
        <span v-if="item.song.privilege.maxbr > 320000"></span>{{ item.song.artists[0].name }}-{{ item.name }}
      </p>
    </div>
    <div class="right">
      <span></span>
    </div>
  </li>

</template>
<script>
export default {
  props: {
    item: Object,
    num:{
        type:Number,
        default:0
    }
  },
  data(){
    return {
        myListObj:{
          songID:0,
          songName:null,
          singerName:''
      }
    }
  },
  methods:{    //播放音乐器
    playMusic(){
      this.$root.playingMusic.musicID = this.item.id;
      this.getContent();
    },
    addList(){  //添加到歌单列表
      this.getContent();
    },
    getContent(){  //获取内容
        this.$root.playingMusic.musicIDList.push(this.item.id)   //传id 到main.js
        this.$http.get('/song/detail?ids='+this.item.id).then(data=>{  //获取点击的歌曲名字  歌手名
              // console.log(this.item.id)
              this.myListObj.songID = this.item.id;
              this.myListObj.songName = data.songs[0].name;
              this.myListObj.singerName = data.songs[0].ar[0].name;
              this.$root.playingMusic.myListSongList.push(this.myListObj);
        });
    }
  },
  filters:{
      formatNum(val){  //序号补零
          return val<10?"0"+val :val;
      }
  }
};
</script>
<style lang="less" scoped>
li {
  display: flex;
  margin-top: 10px;
  padding-left: 10px;
  .addList{
    margin: auto 0;
    width: 20px;
    height: 20px;
    background: url(../assets/addList.svg);
    background-size: 100%;
  }
  div.left {
    flex: 1;
    text-align: left;
    // border-bottom: 1px solid #888;
    border-bottom: 1px solid #e2dbea;
    div {
      font-size: 17px;
      color: #000;
    }
    p {
      font-size: 12px;
      color: #888;
      padding: 5px 0px;
      span {
        display: inline-block;
        width: 12px;
        height: 8px;
        background: url(../assets/index_icon_3x.png) no-repeat;
        background-size: 166px 97px;
        margin-right: 4px;
      }
    }
  }
  div.right {
    border-bottom: 1px solid #ddd;
    padding: 0px 5px;
    display: flex;
    align-items: center;
    span {
      display: inline-block;
      width: 22px;
      height: 22px;
      background: url(../assets/index_icon_3x.png) no-repeat;
      background-size: 166px 97px;
      background-position: -24px 0;
    }
  }
}
.red {
    color: red;
  }
</style>