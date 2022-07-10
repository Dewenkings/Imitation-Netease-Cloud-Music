<template>
  <el-container>
    <!-- 头部区域 -->
    <el-header>
      <header-bar></header-bar>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside width="160px">
        <el-menu
        active-text-color="black"
        router
        :default-active="defaultActive"
        >
        <!-- 当el-menu配置了router,index就是配置的路径 -->
          <el-menu-item index="/discover">
            <i class="iconfont icon-yinle"></i>
            <span>发现音乐</span>
          </el-menu-item>
          <el-menu-item index="/video">
            <i class="iconfont icon-shipin"></i>
            <span>视频</span>
          </el-menu-item>
          <el-menu-item index="/favorites">
             <i class="iconfont icon-more"></i>
            <span>收藏</span>
          </el-menu-item>
          <el-menu-item index="/recommendmusic">
             <i class="iconfont icon-good"></i>
            <span>每日推荐</span>
          </el-menu-item>
          <!-- 多个组件,判断是否有 -->
          <el-menu-item-group  v-if="createdMusicList.length !== 0">
            <template slot="title" class="groupTitle">创建的歌单</template>
            <el-menu-item
              v-for="(item, index) in createdMusicList"
              :key="index"
              :index="'/musiclistdetail/' + item.id"
            >
              <i class="iconfont icon-gedan"></i>{{ item.name }}</el-menu-item
            >
          </el-menu-item-group>
          <el-menu-item-group  v-if="collectedMusicList.length !== 0">
            <template slot="title" class="groupTitle">收藏的歌单</template>
            <el-menu-item
              v-for="(item, index) in collectedMusicList"
              :key="index"
              :index="'/musiclistdetail/' + item.id"
            >
              <i class="iconfont icon-gedan"></i>{{ item.name }}</el-menu-item
            >
          </el-menu-item-group>
        </el-menu>
      </el-aside>
      <!-- 主题内容 -->
      <el-main>
        <!-- -- 给router-view添加key有可能对性能有一定的损耗，
        但是可以解决push同一个地址不同参数时不会重新渲染router-view的问题 -->
        <router-view class="routerView" :key="$route.fullPath"></router-view>
        <!-- 用于下载的a标签 -->
        <a
          :href="downloadMusicInfo.url"
          :download="downloadMusicInfo.name"
          target="_blank"
          id="downloadCurrentMusic"
        ></a>
      </el-main>
    </el-container>

    <!-- 底部区域 -->
    <bottom-control></bottom-control>
    <!-- 当点击具体事件时进行展示 -->
    <music-detail-card class="musicDetailCard"></music-detail-card>
  </el-container>
</template>

<script>

import axios from 'axios'

import BottomControl from './bottomControl/BottomControl.vue'
import HeaderBar from './headerBar/HeaderBar.vue'
import MusicDetailCard from 'views/musicDetailCard/MusicDetailCard.vue'

export default {
  components: {
    BottomControl,
    HeaderBar,
    MusicDetailCard
  },
  data () {
    return {
      // 激活指定的index
      defaultActive: '',
      // 创建的歌单,数组存放
      createdMusicList: [],
      // 收藏的歌单
      collectedMusicList: [],
      // 下载的音乐的信息
      downloadMusicInfo: {
        name: '',
        url: ''
      }

    }
  },
  methods: {
    // 请求创建的歌单
    async getUserMusicList () {
      if (!this.$store.state.isLogin) {
        this.$message.error('请先进行登录操作')
        return false
      }
      var timestamp = Date.parse(new Date())
      let res = await this.$request('/user/playlist', {
        // 将用户id存储到本地存储中
        uid: window.localStorage.getItem('userId'),
        timestamp
      })
      console.log('用户创建的歌单：', res)
      // 对数据进行处理分类
      res = res.data.playlist
      const index = res.findIndex((item) => item.subscribed === true)
      this.createdMusicList = res.slice(0, index)
      this.collectedMusicList = res.slice(index)
      this.createdMusicList[0].name = '我喜欢的音乐'
      // 将收藏的歌单上传至vuex
      this.$store.commit('updateCollectMusicList', this.collectedMusicList)
      // 将创建的歌单上传至vuex
      this.$store.commit('updateCreatedMusicList', this.createdMusicList)
    }
  },
  // 重定向后created不起作用,改为activated
  created () {
    // this.getUserMusicList()
    // if (this.$route.path.search('/musiclistdetail') === -1) {
    //   this.defaultActive = '/' + this.$route.path.split('/')[1]
    // } else {
    //   this.defaultActive = this.$route.path
    // }
  },
  watch: {
    '$route.path' (current) {
      // 取路由中的首地址 用于侧边栏的导航active
      if (current.search('/musiclistdetail') === -1) {
        this.defaultActive = '/' + current.split('/')[1]
      } else {
        this.defaultActive = current
      }
    },
    // 监听当前下载音乐信息
    '$store.state.downloadMusicInfo' (current) {
      axios
        .get(current.url, { responseType: 'blob' })
        .then((res) => {
          const blob = res.data
          const url = URL.createObjectURL(blob)
          // console.log(url);
          const a = document.querySelector('#downloadCurrentMusic')
          this.downloadMusicInfo.url = url
          this.downloadMusicInfo.name = current.name
          this.$nextTick(() => {
            a.click()
            // 用完释放URL对象
            URL.revokeObjectURL(url)
          })
        })
        .catch((err) => {
          console.log(err)
          this.$message.error('下载失败,请稍后重试!')
        })
    },
    // 监听收藏歌单的变化
    // '$store.state.collectMusicList' (current) {
    //   this.collectedMusicList = current
    // },
    // 监听vuex中的登录状态
    '$store.state.isLogin' (current) {
      console.log('登录状态', current)
      if (current) {
        this.getUserMusicList()
      } else {
        // 清空收藏和创建歌单
        this.createdMusicList = []
        this.collectedMusicList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.is-active {
  background-color: #f6f6f7;
  font-size: 14px;
  font-weight: 600;
}

.iconfont {
  font-size: 14px;
  margin: 5px !important;
}

.routerView {
  padding: 0 15px;
  margin: 0;
  width: 100%;
  height: calc(81vh - 0px); // -105px 改成 0px,就是那条竖的分割线，延长到底部
}

.el-header {
  background-color: #ec4141;
  height: 50px !important;
  padding: 0;
  margin: 0;
  z-index: 100;
}

.inBox{
  height: 100%;
}
.el-aside {
  border-right: 1px solid #ccc;
  height: calc(81vh - 0px); // -105px 改成 0px
}

.el-menu {
  border: none;
}

.el-menu-item:hover {
  background-color: #f5f5f6 !important;
}

.el-menu-item {
  font-size: 12px;
  padding: 0 0 0 10px !important;
  margin: 5px 0 !important;
  height: 30px;
  line-height: 30px;
}

.el-menu-item-group {
  margin-top: 10px;
}

.el-main {
  padding: 0;
}
</style>
