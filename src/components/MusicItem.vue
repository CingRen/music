<template>
<div>
<ul class="newMusicList">
    <router-link v-for="item in newMusicList" :key="item.id" tag="li" to="/">
        <div class="left">
            <div>{{item.name}}</div>
            <p><span></span>{{item.song.artists[0].name}}-{{item.name}}</p>
        </div>
        <div class="right">
            <span></span>
        </div>
    </router-link>
</ul>
<ul class="hotList">
    <router-link v-for="(item,k) in hotList" :key="item.id" tag="li" to="/">
        <div class="num" :class="{red:k<3}">{{(k+1) | forNum}}</div>
        <div class="left">
            <div>{{item.name}}</div>
            <p><span></span>{{item.song.artists[0].name}}-{{item.name}}</p><span>{{item.song.artists.name}}</span>
        </div>
        <div class="right">
            <span></span>
        </div>
    </router-link>
</ul>
</div>


</template>
<script>
export default {
    name:"MusicItem",
    props:{
        newMusicList:Array,
        hotList:Array
    },
    filters:{
        forNum(value){
            if(value<10){
                value = "0"+value
            }
            return value
        }
    },
    data(){
        return{

        }
    },
    computed(){
        
    }
}
</script>
<style lang="less" scoped>
    .newMusicList,.hotList{
        li{
            display: flex;
            margin-top: 10px;
            padding-left: 10px;
            .num{
                // background-color: royalblue;
                width: 35px;
                line-height: 50px;
                font-size: 17px;
                color: #ccc;
            }
            .red{
                color:red
            }
            div.left{
                flex: 1;
                text-align: left;
                // border-bottom: 1px solid #888;
                border-bottom: 1px solid #E2DBEA;
                div{
                    font-size: 17px;
                    color:#000;
                }
                p{
                    font-size: 12px;
                    color:#888;
                    padding: 5px 0px;
                    span{
                        display: inline-block;
                        width: 12px;
                        height: 8px;
                        background: url(../assets/index_icon_3x.png) no-repeat;
                        background-size: 166px 97px;
                        margin-right: 4px
                    }
                }
            }
            div.right{
                border-bottom: 1px solid #ddd;
                padding: 0px 5px;
                display: flex;
                align-items: center;
                span{
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    background: url(../assets/index_icon_3x.png) no-repeat;
                    background-size: 166px 97px;
                    background-position: -24px 0;
                }
            }
        }
    }
</style>