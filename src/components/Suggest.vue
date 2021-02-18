<template>
    <ul>
        <li>搜索：{{keywords}}</li>
        <li v-for="s in suggests" :key="s.id" @click="$emit('searchResult',s.name)">{{s|filtType}}{{s.name}}</li>
    </ul>
</template>
<script>

export default {
    props:{
        suggests:{
            type:Array,
            default:function(){
                return [];
            }
        },
        keywords:{
            type:String,
            default:''
        }
    },
    filters:{
        filtType(v){
            if(typeof v.artists != 'undefined'){
                return '歌曲'
            }else if(typeof v.artist != 'undefined'){
                return '专辑'
            }else{
                return '歌手'
            }
        }
    }
}
</script>
<style lang="less" scoped>

</style>