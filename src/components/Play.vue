<template>
  <div class="player">
      <audio ref="musicplayer" autoplay
      :src="`https://music.163.com/song/media/outer/url?id=${musicID}.mp3`"
      @timeupdate="timeupdate" />
      <div class="playerBar">
        <i ref="imgs" class="imgs">  <!--光碟-->
          <img :src="song.al.picUrl" alt="">
        </i>
        <i @click="showFull">   <!--歌手、歌名-->
          {{song.name}}-{{song.ar[0].name}}
        </i>
        <i @click="togglePlay">    <!--暂停、播放按键-->
          <canvas ref = "canvas" width="50px" height="50px"></canvas>  <!--画布-->
        </i>
      </div>
      <!-- :style="{backgroundImage:`url(${picUrl})`}" -->
      <div class="fullLrc" v-show="isFullLrc" :style="{backgroundImage:`linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${song.al.picUrl})`}"> <!--播放器变大-->
      <div class="musicNav"  @click="off"><!--音乐导航-->
        <div class="mnT"><!--后退 歌曲  歌词-->
          <div class="left" @click="isFullLrc=false"></div><!--返回-->
          <div class="right"><span>推荐</span> | <span :class="{while:gequWhile == true}" @click="gequ">歌曲</span> | <span @click="geci" :class="{while:geciWhile == true}">歌词</span></div>
        </div> 
        <div class="musicName">
          <p>{{song.name}}</p>
          <p>{{song.ar[0].name}}</p>
        </div>
      </div>
        <div class="lrc">   <!--下半部分 白色-->
          <!-- <img src="../assets/pointer" alt="">   -->
          <div class="pointer" :class="{rot:playact==false}" v-show="lyricShow"></div><!--指针-->
          <div class="vinyl" ref="vinyl" v-show="lyricShow">   <!--黑胶-->
            <div :style="{backgroundImage:`url(${song.al.picUrl})`}"></div>
          </div>
          <div class="mnB" ref="mnB">
              <ul ref="geci" :style="{   
                transform:`translateY(-${lrcCurrent*25-lrcCenter}px)` 
              }">
                <li v-for="(lrc,i) in lrcArr" :key="i" :class="{active:i==lrcCurrent}">{{lrc.lyric}}</li> <!--歌词-->
              </ul>
            </div>
            <div class="progress"><!--进度条-->
            <div class="gang"></div>
              <div class="tiao" ref="tiao"></div>
              <div class="ball" ref="ball"></div>
              </div>  
            <div class="control">  <!--播放控件-->
              <div class="row">
                <div class="more"  @click="mListShow"></div>   <!--添加歌曲列表-->
                <div class="pre" @click="preSong"></div>   <!--上一首-->
                <div class="container"> 
                  <div class="Btn" @click="act">  <!--播放、暂停-->
                    <div class="pause" :class="{act:playact==true}">
                      <div class="line_1"></div>
                      <div class="line_2"></div>
                    </div>
                    <div class="play" :class="{act:playact==true}">
                      <div class="line_1"></div>
                      <div class="line_2"></div>
                      <div class="line_3"></div>
                    </div>
                  </div>
                </div>
                <div class="next" @click="nextSong"> <!--下一首-->
                </div>
                <div class="heart"></div>   <!--喜欢-->
              </div>
            </div>
          </div>
      </div>
      <div class="myList" v-show="myListShow">  <!--我的歌曲列表-->
          <div class="mlTOP">当前播放<span>({{myListLength}})</span></div>
          <ul>
            <li v-for="(my,k) in myListsong" :key="k" @click="listPlay(my.songID)" :class="{active:my.songID == musicID}">{{my.songName}}<span :class="{active:my.songID == musicID}"> - {{my.singerName}}</span></li>
          </ul>
           <div class="mlBottom" @click="off">关闭</div>
      </div>
  </div>
</template>
<script>
export default {
  props:['musicID'],
  data(){
    return {
      song:{
        al:{
          picUrl:''//默认图片
        },
        name:null,
        ar:[
          {name:''}
        ]
      },
      lrcArr:[],
      isFullLrc:false,
      playact:false, //false播放， true暂停
      lrcCurrent:0,
      myList:[], //把获取的歌曲ID放在  这里面
      myListLength:0,  //上面这个数组的长度
      nextID:0,  //做上一首 下一首歌的时候 用到的
      myListShow:false,  //我的歌曲列表显示或隐藏
      myListsong:{},    //我的歌曲列表里面显示 歌曲、歌手的对象
      lyricShow:true,   //歌词出现和缩小
      gequWhile:true,    //歌曲 白色样式
      geciWhile:false,   //歌词白色样式
      lrcCenter:10    //歌词居中变量
    }
  },
  watch:{
    musicID(val){
        this.$http.get('/song/detail?ids='+val).then(data=>{  //获取歌曲详情
            this.song=data.songs[0];
            // console.log(this.song)
        });
        this.$http.defaults.baseURL="http://music.kele8.cn" //临时改变请求baseURL
        this.$http.get('/lyric?id='+val).then(lrcdata=>{  //获取歌词
            let lrc = lrcdata.lrc.lyric;
            this.lrcArr=lrc.split('\n');
            let reg=/\[(\d+):(\d+\.\d+)\](.+)/;
            this.lrcArr = this.lrcArr.map(lc=>{
              reg.test(lc);
              return {
                time:parseInt(RegExp.$1*60)+parseFloat(RegExp.$2),
                lyric:RegExp.$3
              }
            })
        });
        this.$http.defaults.baseURL="http://musicapi.leanapp.cn/" //改回来
        return val;
    }
  },
  methods:{  //事件
    gequ(){   //点击歌曲  出现 黑胶/指针
      this.lyricShow = true;
      this.gequWhile = true;
      this.geciWhile = false;
      this.lrcCenter = 10;
      this.$refs.mnB.style.top = '60%';
      this.$refs.mnB.style.height = '10%';
    },
    geci(){   //点击   出现歌词
      this.lyricShow = false;
      this.gequWhile = false;
      this.geciWhile = true;
      this.lrcCenter = 180;
      this.$refs.mnB.style.top = '5%';
      this.$refs.mnB.style.height = '60%';
    },
    listPlay(k){  //点击我个歌曲列表 里的某一首歌  即可播放   //k 获取歌曲的ID
        this.$root.playingMusic.musicID = k ;  //把ID赋给播放器 播放
    },
    off(){  //关闭我的歌曲列表
        this.myListShow = false;
    },
    mListShow(){      //我的歌曲列表
        this.myListShow = !this.myListShow;   //点击 我的歌曲列表显示、隐藏
        this.myListsong = this.$root.playingMusic.myListSongList;   //我的歌曲列表
        var result = [];           //我的歌曲列表   去重！！！
        var obj = {};
        for (var i = 0; i < this.myListsong.length; i++) {
          if (!obj[this.myListsong[i].songID]) {  //如果obj里面没有这个ID
            result.push(this.myListsong[i]);     //就把这一个对象 push进 result数组里
            obj[this.myListsong[i].songID] = true;   //obj里的这个ID也变为true
          }
        }
        this.myListsong = result;
        // console.log(this.myListsong)
    },
    preSong(){   //上一首歌
          this.cleanArray();
          this.myList.forEach((value,index)=>{   //拿到播放歌曲ID在我的歌曲列表里的下标
            this.myListLength = this.myList.length
            // console.log(this.myListsong.length)
            if(value == this.musicID){
              if(this.myList[index-1] == undefined){
                  this.nextID = this.myList[this.myList.length-1]
              }else{
                this.nextID = this.myList[index-1];
              }
            }
          })
          this.$root.playingMusic.musicID = this.nextID;  //把下一首歌的ID传到main.js 
    },
    nextSong(){    //下一首歌
          this.cleanArray();
          this.myList.forEach((value,index)=>{   //拿到播放歌曲ID在我的歌曲列表里的下标
            if(value == this.musicID){
              if(this.myList[index+1] == undefined){
                  this.nextID = this.myList[0]
              }else{
                this.nextID = this.myList[index+1];
              }
            }
          })
          this.$root.playingMusic.musicID = this.nextID;  //把下一首歌的ID传到main.js 
    },
    cleanArray(){  //把添加的ID存到新数组  然后  数组去重
        let musicIDList = this.$root.playingMusic.musicIDList;
          for(var i = 0 ; i < musicIDList.length; i++){     //去重
            if(this.myList.indexOf(musicIDList[i]) === -1){
              this.myList.push(musicIDList[i])
            }
          }
    },
    togglePlay(){
      if(this.$root.playingMusic.isPlay){  //如果歌曲正在播放 歌曲暂停
        this.$root.playingMusic.isPlay=false;  //歌曲暂停
        this.$refs.musicplayer.pause();//音乐暂停
        this.$refs.imgs.style.animationPlayState="paused";//光盘停止
        this.$refs.vinyl.style.animationPlayState="paused";//黑胶停止
        this.playact = true; //按钮 添加 类act  
      }else{
        this.$root.playingMusic.isPlay=true;  //否则歌曲暂停中  歌曲播放
        this.$refs.musicplayer.play();//音乐播放
        this.$refs.imgs.style.animationPlayState="running";//光盘走
        this.$refs.vinyl.style.animationPlayState="running";//黑胶走
        this.playact = false; //按钮 取消act类
        // animation: rollImg 16s linear 0s infinite;
      }
    },
    showFull(){   //点击播放器变大
      this.isFullLrc = true;
      // this.myListLength = this.myListsong.length;
      console.log(this.myListsong)
    },
    timeupdate(event){
      let audio = event.target;  //拿到audio
      let currentTime = audio.currentTime;//当前播放时间
      let durationTime = audio.duration; //音频总时长/s
      for(var i in this.lrcArr){
        var lrcTime = this.lrcArr[i].time;//歌词的时间
        //判断当前歌词的时间 如果小于等于当前播放时间 但是小于下一个歌词时间 当前歌词播放
        var i2 = parseInt(i)+1;   //
        // console.log(this.lrcArr)
        if(currentTime >= lrcTime && currentTime < this.lrcArr[i2].time){
            this.lrcCurrent = i;  //歌词第几句
            // console.log(i)
            break;
        }
      }
     this.drawCircle(currentTime,durationTime);
    },
    drawCircle(c,d){    //画布进度
      let ball = this.$refs.ball;
      let tiao = this.$refs.tiao;
      let canvas = this.$refs.canvas;  //创建一个画布
      let cxt = canvas.getContext('2d');//上下文
      cxt.beginPath();
      cxt.strokeStyle="red";
      cxt.arc(25,25,20,0,Math.PI*2); //画布的大小 半径 坐标
      cxt.stroke();
      cxt.closePath();

      //进度
      cxt.beginPath();
      cxt.strokeStyle="blue";
      cxt.arc(25,25,20,0,Math.PI*2*(c/d));
      cxt.stroke();
      cxt.closePath();

      var ballNum = (c/d*100).toFixed(2);
      //球进度
      ball.style.left = `${ballNum}%`;
      tiao.style.left = `${ballNum}%`;

      if(ballNum == "100.00"){
        this.playact = true;
        this.$refs.imgs.style.animationPlayState="paused";//光盘停止
        this.$refs.vinyl.style.animationPlayState="paused";//光盘停止
      }
    },
    act(){  //改变播放状态
      this.playact = !this.playact;
      this.togglePlay();
    }
  }
}
</script>
<style lang="less" scoped>
  @media screen and (max-width: 360px) {
      .vinyl {
          width: 200px;
          height: 200px;
      }
  }
  @media screen and (min-width: 360px) and (max-width: 540px) {
      .vinyl {
          width: 270px;
          height: 270px;
      }
  }
  @media screen and (min-width: 541px) and (max-width: 800px) {
      .vinyl {
          width: 400px;
          height: 400px;
      }
  }
  @media screen and (min-width: 800px) {
      .vinyl {
          width: 550px;
          height: 550px;
      }
  }
  .player{
    position: fixed;
    bottom:0px;
    background-color: #F3F3F3;
    width: 100%;
    audio{
      height:20px;
    }
    .playerBar{
      display: flex;
      i{
        display: inline-block;
        &:first-of-type{
          width: 50px;
          height: 50px;
          border-radius: 50%;
          animation: rollImg 16s linear 0s infinite;
          overflow: hidden;
        }
        &:nth-of-type(2){
          flex: 1;
        }
        &:last-of-type{
          width: 50px;
          height: 50px;
        }
      }
    }
    .fullLrc{
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-wrap: wrap;
      display: table;
      background-repeat: no-repeat;
      background-size: 100%;
      .musicNav{    //音乐顶部导航
        width: 100%;
        height: 25%;
        .mnT{
          width: 100%;
          height: 20%;
          display: flex;
          .left{
            background: url(../assets/back.png) no-repeat;
            background-size: 60% 60%;
            background-position: 6px 7px;
            width: 10%;
            height: 100%;
          }
          .right{
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            color: #fff;
            span{
              padding:0px 10px 0px 10px;
              color: #ccc;
              &.while{
                color: #fff;
                font-size: 1.2rem;
              }
            }
          }
        }
        .musicName{
          margin-top: 50px;
          & p:first-of-type{
            color: #fff;
            font-size: 2rem;
          }
          & p:last-of-type{
            color: #ccc;
            font-size: .6rem;
          }
        }
      }
      .lrc{    //音乐播放器下半部分  白色
        position: relative;
        width: 100%;
        height: 75%;
        display: flex;
        justify-content: center;
        background-color:#fff;
        border-radius: 50px 50px 0px 0px;
        .pointer{     //指针
            position: absolute;
            left: 270px;
            top: 57px;
            width: 100px;
            height: 155px;
            transform-origin:top right;
            transform: rotate(-30deg);
            // background-color: greenyellow;
            background-image: url(../assets/pointer.png);
            background-size: 100%;
            transition: transform .6s linear;
            z-index: 10;
            &.rot{
                transform-origin:top right;
                transform: rotate(0deg);
            }
        }
        .vinyl{   //黑胶
          position: absolute;
          top: 4vh;
          background: url(../assets/cd.png) no-repeat;
          background-size: 100%;
          border-radius: 50%;
          box-shadow: 0px 0px 26px rgba(0, 0, 0, 1);
          display: flex;
          justify-content: center;
          align-items: center;
          animation: rollImg 16s linear 0s infinite;
          div{
            width: 70%;
            height: 70%;
            border-radius: 50%;
            background-size: 100%;
            overflow: hidden;
          }
        }
        .mnB{   //歌词
          position: absolute;
          top:60%;
          // background-color:blue;
          width: 100%;
          height: 10%;
          overflow: hidden;
          ul{
              // height: 25px;
              // font-size: .8rem;
            li{
              height: 25px;
              font-size: .8rem;
              color: #ccc;
              &.active{
                color: #000;
                font-size: 1.2rem;
              }
            }
          }
        }
        .progress{  //进度条
          position: relative;
          top:75%;
          width: 75%;
          height: 20px;
          overflow: hidden;
          .gang{
            position: absolute;
            left: 0;
            top: 49%;
            width: 100%;
            height: 2px;
            background-color: #ccc;
          }
          .ball{
              position: absolute;
              left: 0px;
              top: 6px;
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: #000;
          }
          .tiao{
                position: absolute;
                left: 0;
                top: 10px;
                transform: translateX(-100%);
                width: 100%;
                height: 2px;
                background: #000;
              }
        }
        .control{  //播放控件
          position: absolute;
          bottom: 0px;
          width: 100%;
          height:20%;
          display: flex;
          justify-content: center;
          align-items: center;
          .row{
            width: 90%;
            height: 60%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .more{   //更多
                width: 30px;
                height: 30px;
                background:url(../assets/more.svg) no-repeat;
                background-size: 100%;
            }
            .pre{   //上一首
                width: 50px;
                height: 50px;
                background:url(../assets/pre.svg) no-repeat;
                background-size: 100%;
                border-radius: 50%;
            }
            .container{  // 播放/停止 
                width: 70px;
                height: 70px;
                background:black;
                border-radius: 50%;
                box-shadow: 0 0 5px rgba(0, 0, 0, 0.15), 0 2px 10px rgba(0, 0, 0, 0.1);
                display: flex;
                justify-content: center;
                align-items: center;
                .Btn{   //播放按钮
                    width: 50px;
                    height: 50px;
                    position: relative;
                    border-radius: 50%;
                    overflow: hidden;
                    .pause{
                        width: 100%;
                        height: 100%;
                        cursor: pointer;
                        position: absolute;
                        &.act .line_1{
                          left: 28%;
                        }
                        &.act .line_2{
                            margin: 100% 0;
                            right: 23%;
                        }
                        &.act div{
                          opacity: 1;
                        }
                        div{
                          position: absolute;
                          width: 8px;
                          height: 54%;
                          background: #fff;
                          border-radius: 10px;
                          transition: all 400ms cubic-bezier(0.8, 0, 0.33, 1);
                        }
                        .line_1{
                            margin: 25% 0;
                            left: 28%;
                        }
                        .line_2{
                            margin: 25% 0%;
                            right: 23%;
                            transition-delay: 280ms
                        }
                    }
                    .play{
                          width: 100%;
                          height: 100%;
                          cursor: pointer;
                          position: absolute;
                          &.act .line_2{
                              transform: rotate(-55deg) translateY(-9px) translateX(0px);
                          }
                          &.act .line_3{
                              transform: rotate(55deg) translateY(9px) translateX(0px);
                          }
                          &.act div{
                              opacity: 1;
                          }
                          div{
                            margin: 25% 0;
                            position: absolute;
                            width: 8px;
                            height: 56%;
                            background: #fff;
                            border-radius: 10px;
                            transition: all 400ms cubic-bezier(0.8, 0, 0.33, 1);
                          }
                          .line_1{
                              // margin: 25% 0;
                              left: 28%;
                          }
                          .line_2{
                              height: 54%;
                              left: 60%;
                              transform: rotate(-55deg) translateY(-50px) translateX(0px);
                              transition-delay: 100ms;
                          }
                          .line_3{
                              height: 54%;
                              left: 60%;
                              transform: rotate(55deg) translateY(-41px) translateX(0px);
                              transition-delay: 100ms;
                          }
                    }
                }
            }
            .next{
                width: 50px;
                height: 50px;
                background:url(../assets/next.svg) no-repeat;
                background-size: 100%;
                border-radius: 50%;
            }
            .heart{
                width: 30px;
                height: 30px;
                background:url(../assets/heart.svg) no-repeat;
                background-size: 100%;
            }
          }
        }
      }
    }
    .myList{   //我的歌曲列表
      position: fixed;
      bottom: 10%;
      width: 80%;
      height: 60%;
      border-radius: 20px;
      background-color: #e7eff3;
      display: flex;
      justify-content:flex-end;
      flex-wrap: wrap;
      z-index: 11;
      .mlTOP{   //我的歌曲列表   头部
        width: 95%;
        height: 15%;
        text-align: left;
        font-size: 1.2rem;
        font-weight: 600;
        border-radius: 20px 20px 0px 0px ;
        span{
          font-size: 1rem;
          color: #aaa;
        }
      }
      ul{
        width: 95%;
        height: 73%;
        li{
          height: 50px;
          line-height: 50px;
          text-align: left;
          border-bottom: .5px solid #ccc;
          // color: red;
          &.active{
            color: red;
          }
          span{
            font-size: .8rem;
            color:#aaa;
            &.active{
              color: red;
            }
          }
        }
      }
      .mlBottom{   //我的歌曲列表   底部
        width: 100%;
        height: 12%;
        line-height: 50px;
        text-align: center;
        font-size: 1.1rem;
        border-radius:0px 0px 20px 20px;
        border-top: .5px solid #ccc;
      }
    }
  }
  @keyframes rollImg{
    from{
      transform: rotate(0deg);
    }
    to{
      transform: rotate(360deg);
    }
  }
</style>