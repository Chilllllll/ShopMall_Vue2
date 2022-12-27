<!-- eslint-disable vue/no-unused-vars -->
<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 我是首页 -->
    <!-- 三级联动全局组件（无需import） -->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list='floor'/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'

import { mapState } from "vuex";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name:'Home',
  components:{
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  mounted() {
    this.$store.dispatch('getFloorList');
  },
  computed:{
    ...mapState({
        // eslint-disable-next-line no-unused-vars
        floorList: (state) =>  state.home.floorList,
    }),
    
  }
}
</script>

<style scoped>

</style>