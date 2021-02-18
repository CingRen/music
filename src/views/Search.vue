<template>
    <div class="Search">
        <form @submit.stop.prevent="searchList(keywords)">
            <div class="top">
                <div class="sear">
                    <input type="text" v-model="keywords" placeholder="搜索歌曲、歌手、专辑">
                </div>
            </div>
        </form>
        <Suggest v-show="showSearch" :suggests="suggests" :keywords="keywords" @searchResult="searchList"></Suggest> <!-- 搜索提示 -->
        <Loading v-show="searching"></Loading><!-- 加载 -->
        <SearchResult v-show="showList" :searchMusicList="searchMusicList" /><!-- 搜索结果  歌单列表 -->
        <div class="bottom" v-show="showHotSearch">
            <p>热门搜索</p>
            <ul>
                <li v-for="(h,k) in hotSearch" :key="k" @click="cVal(h.first)">{{h.first}}</li>
            </ul>
        </div>
         <p ref="scrollbar" v-show="more"><Loading /></p>
         <!-- <router-link :to="`/search/${num+1}`">查看更多</router-link> -->
    </div>
</template>
<script>
import Suggest from '../components/Suggest'
import Loading from '../components/Loading'
import SearchResult from '../components/SearchResult'
export default {
    name:"Search",
    // props:{
    //     hotSearch:Array
    // },
    data(){
        return {
            hotSearch:[],
            keywords:'',
            suggests:[],
            searchMusicList:[],
            searching:false,//是否显示 加载loading
            showList:false,//是否显示  搜索结果
            showSearch:false,//是否显示  搜索提示
            showHotSearch:true,
            more:false,
            num:0
        }
    },
    components:{
        Suggest,
        Loading,
        SearchResult
    },
    created(){
      window.addEventListener('scroll',this.listenScroll);
    },
    destroy(){
        window.removeEventListener('scroll',this.listenScroll);//一定要移除
    },
    methods:{
        listenScroll(){
            let scrollTop=document.documentElement.scrollTop||document.body.scrollTop;//滚动距离
            let clientHeight=document.documentElement.clientHeight||document.body.clientHeight;//可视高度
            let barTop=this.$refs.scrollbar.offsetTop;//最后一个元素的距离顶部距离
            if((scrollTop+clientHeight)>barTop){
                this.more = true
                // this.num++;
            }
        },
        searchList(keywords){   //点击提示信息，输入框出现对应信息 并显示歌单列表
            // this.keywords = keywords;
            this.more = false;
            this.showList = false;
            this.axios.get('/search?keywords='+keywords).then(d=>{//根据关键词得到搜索的结果
            // console.log("aaa")
                if(d.code==200){
                    this.showList = true;
                    this.showSearch = false;
                    this.searchMusicList = d.result.songs.map(dat=>{ //数据筛选
                        return {
                            name:dat.name,
                            id:dat.id,
                            song:{
                                artists:dat.artists,
                                privilege:{
                                    maxbr:1
                                }
                            }
                        }
                    })
                }
            })
        },
        cVal(val){  //点击热门搜索 
            this.keywords = val;
            console.log(val)
        }
    },
    watch:{
        keywords(val){  //输入关键字，下面提示相应的信息
            // this.searching = true;
            this.suggests=[];
            this.$http.get('/search/suggest?keywords='+val).then(data=>{
                if(this.suggests == []){
                    // this.showSearch = false;
                    this.showHotSearch = true;
                }
                // console.log(data)
                if( data.code==200 && data.result.order){
                    let re = data.result.order.reduce((prev,v)=>{ //v(键名)  拿到关键字的  歌手或专辑或歌曲
                    if( v!=='playlists'){
                        //console.log(prev)                         //prev  v键名对应的属性值 结果
                        return prev.concat(data.result[v])  //concat 用于连接两个或多个数组
                    }  
                    // console.log(prev.concat(data.result[v]))
                    return prev;  
                },[]);
                this.suggests=re;
                // console.log(this.suggests)
                // console.log(re)
                // console.log("aaa")
                this.more = false;
                this.showList = false;
                this.showHotSearch = false;
                this.showSearch = true;
                if(this.keywords == ''){ //判断如果搜索的字词已经全部删除  suggests为空
                    this.suggests = [];
                    // this.showSearch = false;
                    // this.showHotSearch = true;
                }
                
                }
            }).finally(()=>{
                this.searching = false;
            })
        }
    },
    
    beforeRouteEnter(to,from,next){//路由守卫，在路径进入之前获取数据
    //this不可用
        next(vm=>{
            vm.$http.get('/search/hot').then(data=>{//获取热门搜索
                vm.hotSearch=data.result.hots;
                // console.log(data.hots[0].first)
            }).catch(error=>{
                console.log(error)
            });
            });
        },
    }
</script>
<style lang="less" scoped>
    .Search{
        .top{
            width: 100%;
            height: 70px;
            background-color: #FBFCFD;
            border-bottom: 1px solid #ddd;
            display: flex;
            justify-content: center;
            align-items: center;
            .sear{
                width: 93%;
                height: 30px;
                border-radius: 50px;
                background: url(../assets/放大镜.svg) no-repeat;
                background-position: 10px 9px;
                background-color: #EBECEC;
                background-size: 13px 13px;
                input{
                    width: 85%;
                    outline: medium;
                    border: none;
                    height: 30px;
                    line-height: 18px;
                    font-size: 14px;
                    color: #333;
                    background-color: #EBECEC;
                }
                input::-webkit-input-placeholder{
                    color:#ccc;
                }
            }
        }
        .bottom{
            p{
                text-align: left;
                font-size: 12px;
                line-height: 12px;
                color: #666;
                margin: 15px 0px 15px 10px;
            }
            ul{
                li{
                    float: left;
                    border: 1px solid #ccc;
                    padding: 5px 14px;
                    border-radius: 50px;
                    margin:0px 0px 10px 10px;
                    color:#333;
                    font-size: 14px;
                }
            }
        }
    }
</style>