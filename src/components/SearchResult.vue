<template>
    <ul>
        <ListItem v-for="sm in searchMusicList" :key="sm.id" :item="sm"></ListItem>
    </ul>
</template>
<script>
import ListItem from './ListItem';
export default {
    props:[
        'searchMusicList'
    ],
    components:{
        ListItem
    }
}
</script>
<style lang="less" scoped>

</style>