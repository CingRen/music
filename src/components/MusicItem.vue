<template>
<div>
<Loading v-if="newMusicList.length<=0"/>
<ul class="newMusicList">
    <ListItem v-for="item in newMusicList" :item="item" :key="item.id"></ListItem>
                                        <!--item.id 以 'playMusic'传到父级 Recommend --> 
</ul>
</div>

</template>
<script>
import Loading from '../components/Loading'
import ListItem from '../components/ListItem'

export default {
    name:"MusicItem",
    props:{
        newMusicList:{
            default:function(){
                return []
            }
        },
    },
    components:{
        Loading,
        ListItem
    },
    filters:{
        forNum(value){
            if(value<10){
                value = "0"+value
            }
            return value
        }
    }
}
</script>