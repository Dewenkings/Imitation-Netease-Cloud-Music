<template>
  <div class="musicListContainer">
    <div class="musicList">
      <router-view></router-view>
    </div>
     <!-- 返回顶部组件 -->
    <go-top scrollObj=".musicListContainer"></go-top>
  </div>
</template>

<script>

import GoTop from 'components/goTop/GoTop.vue'
export default {
  name: 'MusicList',
  components: { GoTop }
}
</script>

<style scoped>
.musicListContainer {
  display: flex;
  justify-content: center;
  width: 100%;
}

.musicList {
  max-width: 1000px;
  padding: 10px;
  width: 100%;
}
</style>
