<template>
    <div v-show="!$route.meta.showNav">
        <!-- <BigLogo></BigLogo> -->
        <ul class="topnav">
            <li><router-link tag="a" to="/">推荐音乐</router-link></li>
            <li><router-link tag="a" to="/hot/1">热歌榜</router-link></li>
            <li><router-link tag="a" to="/search/1">搜索</router-link></li>
        </ul>
    </div>
</template>
<script>
// import BigLogo from '../components/BigLogo'
export default {
    name:"TopNav",
    components:{
        // BigLogo
    }
}
</script>
<style lang="less" scoped>
    .topnav{
        display: flex;
        border-bottom: 1px solid #ddd;
        li{
            flex: 1 1 auto;
            line-height: 40px;
            font-size: 15px;
            a{
                display: inline-block;
                text-decoration: none;
                color:#000;
                &.router-link-exact-active{
                    color: red;
                    border-bottom: 3px solid red;
                }
            }
        }
    }
</style>