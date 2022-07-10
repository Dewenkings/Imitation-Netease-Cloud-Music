<template>
  <div class="video">
    <nav-bar
    :navBarItem="navBarData"
    @clickBarItem="clickBarItem"></nav-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from 'components/navBar/NavBar.vue'
export default {
  name: 'Video',
  components: { NavBar },
  data () {
    return {
      navBarData: [
        { name: '视频', path: '/video/videolist' },
        { name: 'MV', path: '/video/mvlist' }
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
      this.$message.error('只有登录后才能进入视频页面哦!')
      this.$router.replace('/discover')
    }
  }
}
</script>

<style lang="less" scoped>
  .video {
    overflow-y: hidden;
    padding: 0 !important;
  }
</style>
