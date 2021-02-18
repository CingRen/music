<template>
    <div class="MusicList">
        <div class="top">
            <img class="topbg" :src="picUrl" >
            <div class="left">
                <img :src="picUrl" >
                <div class="Count"><i></i><div>{{playCount|formatNum}}</div></div>
            </div>
            <div class="right">
                <p>{{name}}</p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:"MusicList",
    data(){
        return {
            picUrl:"",
            name:'',
            playCount:'',
        }
    },
    beforeRouteEnter(to,from,next){//路由守卫，在路径进入之前获取数据
    //this不可用
        next(vm=>{
        vm.$http.get('/personalized?limit=6').then(data=>{
            let id = vm.$route.params.musicid;
            console.log(id)
            // console.log(data.result)
            for(let v of data.result){
                if(v.id == id){
                    vm.picUrl = v.picUrl; //图片传值
                    vm.name = v.name; //名称
                    vm.playCount = v.playCount; //听数量
                }
            }
            }).catch(error=>{
                console.log(error)
            });
        });
    },
    filters:{//拦截器
        formatNum(value){
            if(value.toString().length <= 4){
                return value
                }else if(value.toString().length > 4 && value.toString().length <= 8){
                    return (value/10000).toFixed(1)+"万"
                }else if(value.toString().length > 8){
                    return (value/10000/10000).toFixed(1)+"亿"
                }
        }
  }
}
</script>
<style lang="less" scoped>
@color=red;
    .MusicList{
        .top{
            position: relative;
            height: 180px;
            // padding: 30px 10px 30px 15px;
            overflow: hidden;
            .topbg{
                filter: blur(20px);
            }
            .left{
                width: 135px;
                height: 135px;
                position: absolute;
                top: 0;
                left: 0;
                img{
                    width: 100%;
                    height: 100%;
                    margin: 20px;
                }
                // @color=red;
                .Count{
                    position: absolute;
                    top: 20px;
                    left: 80px;
                    // background-color: blueviolet;
                    width: 74px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: '@color';
                    text-shadow: 1px 0 4px rgba(0,0,0,.55);
                    i{
                        display: inline-block;
                        width: 14px;
                        height: 13px;
                        background: url('../assets/耳机.svg')
                    }
                    div{
                        display: inline-block;
                        font-size: 12px;
                    }
                }
                
            }
            .right{
                position: absolute;
                top: 30px;
                left: 178px;
                text-shadow: 1px 0 4px rgba(0,0,0,.55);
                p{
                    padding-top: 1px;
                    font-size: 17px;
                    line-height: 1.3;
                    color: #fefefe;
                    height: 44px;
                    display: -webkit-box;
                    -webkit-box-pack: center;
                    z-index: 4;
                    text-align: left;
                }
            }
        }
    }
</style>