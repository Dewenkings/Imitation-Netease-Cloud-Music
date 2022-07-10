<template>
    <div class="favoritesContainer">
    <nav-bar @clickBarItem="clickBarItem" :navBarItem="navBarData"></nav-bar>
    <router-view class="favorite"></router-view>
  </div>

</template>

<script>
import NavBar from 'components/navBar/NavBar'
export default {
  components: {
    NavBar
  },
  data () {
    return {
      navBarData: [
        { name: '专辑', path: '/favorites/favoritealbum' },
        { name: '歌手', path: '/favorites/favoriteSinger' },
        { name: '视频', path: '/favorites/favoriteVideo' }
      ]
    }
  },
  methods: {
    // 接收navbar传来的点击事件
    clickBarItem (path) {
      this.$router.push(path)
    }
  },

  created () {
    if (!this.$store.state.isLogin) {
      this.$message.error('收藏页面只有登录后才能访问哦!')
      this.$router.replace('/index')
    }
  }
}
</script>

<style lang="less" scoped>

</style>
