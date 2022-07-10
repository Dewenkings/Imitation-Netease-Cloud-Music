<template>
  <div class="Search">
     <!-- navbar -->
    <nav-bar @clickBarItem="clickBarItem" :navBarItem="navBarData"></nav-bar>
    <div class="title"></div>
    <!-- 通过路由规则找到对应的组件进行渲染 -->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from 'components/navBar/NavBar.vue'
export default {
  name: 'Search',
  components: { NavBar },
  data () {
    return {
      navBarData: [
        {
          name: '单曲',
          path: `/search/searchsong/${this.$route.params.id}`
        },
        {
          name: '歌手',
          path: `/search/searchsinger/${this.$route.params.id}`
        },
        {
          name: '专辑',
          path: `/search/searchalbum/${this.$route.params.id}`
        },
        {
          name: '视频',
          path: `/search/searchvideo/${this.$route.params.id}`
        },
        {
          name: '歌单',
          path: `/search/searchmusiclist/${this.$route.params.id}`
        }
      ]
    }
  },
  methods: {
    //  点击navbar的回调,在子组件中监听到变化,在父组件进行跳转
    clickBarItem (path) {
      console.log('path', path)
      console.log('route.path', this.$route.path)
      // 当路径不同，进行页面跳转
      if (path !== this.$route.path) {
        this.$router.push(path)
      }
    }
  }
}
</script>
