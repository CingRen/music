<template>
    <div class="Search">
        <div class="top">
            <div class="sear">
                <input type="text" placeholder="搜索歌曲、歌手、专辑">
            </div>
        </div>
        <div class="bottom">
            <p>热门搜索</p>
            <ul>
                <!-- <router-link v-for="(h,k) in hotSearch" :key="k" tag="li">{{h[k]}}</router-link> -->
                <!-- <li>四级与你</li>
                <li>We Can't Stop</li>
                <li>我的世界父子</li>
                <li>敢爱干啥</li>
                <li>敢爱干</li>
                <li>敢爱干</li>
                <li>敢爱干</li>
                <li>敢爱</li>
                <li>敢爱的</li>
                <li>敢爱</li> -->
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name:"Search",
    // props:{
    //     hotSearch:Array
    // },
    data(){
        return {
            hotSearch:[]
        }
    },
    beforeRouteEnter(to,from,next){//路由守卫，在路径进入之前获取数据
    //this不可用
        next(vm=>{
            vm.$http.get('/search/hot/detail').then(data=>{//获取热门搜索
                vm.hotSearch=data.hots;
                console.log(data.hots[0].first)
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