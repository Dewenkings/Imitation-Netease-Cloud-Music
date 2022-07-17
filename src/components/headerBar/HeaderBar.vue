<template>
  <div class="headerBar">
    <div class="left">
      <img src="../../assets/img/logo.png" alt="">
    </div>
    <div class="center">
      <div class="buttons">
        <i class="iconfont icon-arrow-left-bold back" @click="$router.go(-1)"></i>
        <i class="iconfont icon-arrow-right-bold forward" @click="$router.go(1)"></i>
      </div>
      <!-- 搜索框 -->
      <div class="search">
          <el-popover placement="bottom" width="330" v-model="isSearchPopShow" popper-class="searchPop" trigger="focus">
            <el-input placeholder="请输入内容" prefix-icon="el-icon-search" size="mini" slot="reference" @input="inputSearch" @keyup.enter.native="onSubmit" v-model="searchInput">
            </el-input>
            <!-- 搜索历史不想做了，做的话可以将搜索历史存到localstorage中 -->
            <!-- 热搜榜 -->
            <div class="hotSearch" v-if="!searchSuggestList.songs">
              <div class="hotSearchTitle">热搜榜</div>
              <div class="hotSearchItem" v-for="(item, index) in hotSearchList" :key="index" @click="clickHotSearchItem(item.searchWord)">
                <div class="hotSearchIndex" :class="index < 3 ? 'topThree' : ''">
                  {{ index + 1 }}
                </div>
                <div class="hotSearchInfo">
                  <div class="hotSearchWord" :class="index < 3 ? 'hotSearchWordTopThree' : ''">
                    {{ item.searchWord }}
                  </div>
                  <div class="hotSearchContent">{{ item.content }}</div>
                </div>
              </div>
            </div>
            <!-- 搜索建议 -->
              <!-- 确切来说就是实时输入，给出搜索建议 -->
            <div class="searchSuggest">
              <div class="hotSearchTitle" v-if="searchSuggestList.songs">
                搜索建议
              </div>
              <!-- 单曲 -->
              <div class="searchSuggestItem" v-if="
                searchSuggestList.songs && searchSuggestList.songs.length != 0
              ">
                <div class="searchSuggestItemTitle">
                  <i class="iconfont icon-yinle"></i> 单曲
                </div>
                <div class="suggestItemDetail" v-for="(item, index) in searchSuggestList.songs" :key="index" @click = "clickSuggestSong(item.id)">
                  {{ item.name + " - " + item.artists[0].name }}
                </div>
              </div>
              <!-- 歌手 -->
              <div class="searchSuggestItem" v-if="
                searchSuggestList.artists && searchSuggestList.artists.length!==0">
                <div class="searchSuggestItemTitle">
                  <i class="iconfont icon-mic"></i> 歌手
                </div>
                <div class="suggestItemDetail" v-for="(item, index) in searchSuggestList.artists" :key="index" @click="clickSuggestSinger(item.id)">
                    {{item.name}}
                </div>
              </div>
              <!-- 专辑 -->
              <div class="searchSuggestItem" v-if="
                searchSuggestList.albums && searchSuggestList.albums.length != 0
              ">
                <div class="searchSuggestItemTitle">
                  <i class="iconfont icon-more"></i> 专辑
                </div>
                <div class="suggestItemDetail" v-for="(item, index) in searchSuggestList.albums" :key="index" @click="clickSuggestAlbum(item.id)">
                  {{ item.name + " - " + item.artist.name }}
                </div>
              </div>
              <!-- 歌单 -->
              <div class="searchSuggestItem" v-if="
                searchSuggestList.playlists && searchSuggestList.playlists.length != 0
              ">
                <div class="searchSuggestItemTitle">
                  <i class="iconfont icon-gedan"></i> 歌单
                </div>
                <div class="suggestItemDetail" v-for="(item, index) in searchSuggestList.playlists" :key="index" @click="clickSuggestMusicList(item.id)">
                  {{ item.name}}
                </div>
              </div>
            </div>
          </el-popover>
      </div>
    </div>
    <div class="right">
      <div class="user">
        <div class="avatar">
          <!-- 登录框用login页面--v-if="!userInfo.avatarUrl" -->
          <el-popover placement="bottom" width="330" trigger="click" v-if="!userInfo.avatarUrl">
          <!-- 子传父，这里直接采用匿名函数的形式进行赋值 -->
            <login :isRegisteredShow.sync="isRegisteredShow" @getUserInfo="
                (info) => {
                  // 登陆成功后返回相应数据
                  userInfo = info;
                  isPopoverShow = false;
                }
              "></login>
            <img src="../../assets/img/test.jpg" alt="" slot="reference" @click="isPopoverShow = !isPopoverShow" />
          </el-popover>
          <!-- 表示跳转到用户页面 -->
          <!-- src绑定地址 -->
          <img :src="userInfo.avatarUrl" alt="" slot="reference" v-else @click="goToPersonal" />
        </div>

        <div class="userName" v-if="userInfo.nickname">
          {{ userInfo.nickname }}
        </div>
        <div class="userName" v-else>点击头像登录</div>

      </div>
    </div>
    <!-- 注册框组件,注册数据变化触发,父子组件的数据、方法通信 -->
    <registered :isDialogShow = "isRegisteredShow" @closeRegistered="closeRegistered"></registered>
  </div>
</template>

<script>
import { handleMusicTime } from '../../plugins/util'
import Login from '../login/Login.vue'
import Registered from '../registered/Registered.vue'

// 节流定时器名称
let timer

export default {
  components: { Login, Registered },
  data () {
    return {
      // 用户信息
      userInfo: {},
      // 弹窗是否显示
      isPopoverShow: false,
      isSearchPopShow: false,
      // 热搜列表数据
      hotSearchList: [],
      // 需要搜索的内容
      searchInput: '',
      // 搜索建议列表
      searchSuggestList: {},
      // 是否显示注册框
      isRegisteredShow: false
    }
  },
  // 在该生命周期判断是否用户已经登陆了,
  async created () {
    // 获取热搜列表
    this.getHotSearch()
    // 更新当前用户信息
    this.getCurrentUserInfo()

    if (document.cookie.search('MUSIC_U=') !== -1) {
      // 如果本地存有cookie，则先暂时判定为已登录，
      // 以解决登录状态下在视频页等需要登录的页面刷新因为登录状态默认为false，
      // 需要等待获取用户信息请求结束后更新用户状态才有进入视频页的权限，导致被返回到发现音乐页面，体验很差
      // 后面获取用户信息将再次确认用户是否登录
      this.$store.commit('updataLoginState', true)
    }
  },
  methods: {

    // 跳转至个人页面
    goToPersonal () {
      if (this.$route.path !== `/personal/${this.userInfo.userId}`) {
        // 如果页面路径不是该路径，就设置为该路径
        this.$router.push({
          name: 'personal',
          // 后续登陆用户页面经常会用到这个参数
          params: { uid: this.userInfo.userId }
        })
      }
      console.log('route', this.$route)
    },
    // 关闭注册框
    closeRegistered () {
      this.isRegisteredShow = false
    },
    // 获取当前用户信息会立即执行
    async getCurrentUserInfo () {
      var timestamp = Date.parse(new Date())
      // 在登陆后就会发起请求，后端接口有规定
      const res = await this.$request('/user/account', {
        timestamp
      })
      console.log('获取当前用户信息', res)
      // 判断当前用户信息的profile
      if (res.data.profile !== null) {
        this.userInfo = res.data.profile
        // 更新登录状态
        this.$store.commit('updataLoginState', true)
        // 保存在会话存储中
        window.localStorage.setItem('userId', res.data.profile.userId)
      } else {
        // 未登录
        this.$store.commit('updataLoginState', false)
        // 如果localstorage存有userId就清除
        if (window.localStorage.getItem('userId')) {
          window.localStorage.removeItem('userId')
        }
      }
    },
    // 获取热搜列表
    async getHotSearch () {
      const res = await this.$request('/search/hot/detail')
      console.log('热搜列表', res.data.data)
      // 绑定
      this.hotSearchList = res.data.data
    },
    // 在输入框按下回车的回调
    onSubmit (e) {
      if (e.keyCode === 13 && this.searchInput !== '') {
        this.goSearch()
      }
    },
    // 跳转至搜索详情页面
    goSearch () {
      // 表示当我点击某个热搜时,跳转到对应页面,隐藏弹出页面(热搜框)
      this.isSearchPopShow = false
      this.$router.push({ name: 'search', params: { id: this.searchInput } })
    },
    // 点击热搜榜的回调
    clickHotSearchItem (searchWord) {
      this.searchInput = searchWord
      this.goSearch()
    },
    // 实时输入搜索
    inputSearch (e) {
      // console.log('开始搜索了')
      // 需要节流，在指定事件内请求一次
      clearTimeout(timer)
      if (e !== '') {
        timer = setTimeout(() => {
          this.getSearchSuggest(e)
        }, 500)
      } else {
        // 清空searchSuggestList
        this.searchSuggestList = {}
      }
    },
    // 获取搜索建议
    async getSearchSuggest (e) {
      console.log('指定时间开始获取搜索建议了')
      const res = await this.$request('/search/suggest', {
        keywords: e
      })
      // console.log('搜索建议：', res)
      this.searchSuggestList = res.data.result
      console.log(this.searchSuggestList)
    },
    // 根据id获取歌曲详情
    async getMusicInfo (ids) {
      const res = await this.$request('/song/detail', { ids })
      console.log(res)
      // 处理时间
      res.data.songs[0].dt = handleMusicTime(res.data.songs[0].dt)
      return res.data.songs[0]
    },
    // 后续添加功能

    // 点击搜索建议中专辑的回调
    clickSuggestAlbum (id) {
      // 关闭搜索框
      this.isSearchPopShow = false
      // 跳转页面
      this.$router.push({
        // 这里指的是route规则对应的name
        name: 'album', params: { id }
      })
    },
    // 点击搜索建议中歌手的回调
    clickSuggestSinger (id) {
      // 关闭搜索框
      this.isSearchPopShow = false
      // 跳转页面
      this.$router.push({
        // 这里指的是route规则对应的name
        name: 'singerDetail', params: { id }
      })
    },
    // 点击搜索建议中歌单的回调
    clickSuggestMusicList (id) {
      // 关闭搜索框
      this.isSearchPopShow = false
      // 页面跳转
      this.$router.push({ name: 'musicListDetail', params: { id } })
    },

    // 点击搜索建议中单曲的回调
    async clickSuggestSong (id) {
      // 点击播放音乐
      const row = await this.getMusicInfo(id)
      this.isSearchPopShow = false
      // 首先获取当前的歌单列表和歌曲索引
      const musicList = this.$store.state.musicList
      const currentIndex = this.$store.state.currentIndex
      // 先判断该歌曲是否已经在歌单中存在，避免重复点击导致歌单出现相同歌曲
      const isExist = musicList.find((item) => item.id === row.id)
      if (isExist) {
        // 如果已经存在 则只提交歌曲id并return出去
        this.$store.commit('updateMusicId', row.id)
        return
      }
      this.$store.commit('changePlayState', false)
      // 将请求到的歌曲详情插入到歌单对应位置并提交至vuex
      musicList.splice(currentIndex + 1, 0, row)
      this.$store.commit('updateMusicId', row.id)
      this.$store.commit('updateMusicList', {
        musicList,
        musicListId: this.$store.state.musicListId
      })
    }
  },
  watch: {
    '$store.state.isLogin' () {
      console.log('用户变化')
      if (this.$store.state.isLogin === false) {
        this.userInfo = {}
      }
    }
  }
}
</script>
<style lang="less" scoped>
  @import './HeaderBar-element.css';
  .headerBar {
    display: flex;
    align-items: center;
    width: 100%;
    height: 50px;
    position: relative;
    z-index: 30000;
  }

  .buttons {
    color: rgb(235, 235, 235);
    /* display: flex; */
    height: 22px;
  }
  .buttons i{
    background-color: #e13e3e;
    font-size: 12px;
    transform: scale(0.8);
    padding: 5px;
    height: 22px;
    width: 22px;
    // 圆
    border-radius: 50%;
    margin: 0 3px;
  }
  .left {
  width: 110px;
  margin: 0 50px 0 10px;
  }
  .left img {
    width: 100%;
  }
  .center {
    display: flex;
    align-items: center;
  }
  .right {
    display: flex;
    // 子绝父相，固定在右边位置
    position: absolute;
    right: 50px;
    line-height: 50px;
  }
  .user {
    display: flex;
    align-items: center;
  }
  .userName {
    font-size: 12px;
    color: rgba(255, 255, 255, 0.85);
    width: 100px;
  }
  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 7px;
    cursor: pointer;
  }
  .avatar img {
    width: 100%;
  }
  .loginButton {
    width: 100%;
    text-align: center;
  }

  .loginButton .el-button {
    width: 200px;
  }

  .search .el-input /deep/ input {
    border-radius: 15px !important;
    border-color: #e13e3e
  }
  // 搜索框样式
  .hotSearchTitle {
    font-size: 13px;
    margin: 10px 0 5px 20px;
  }
  .hotSearchItem {
    display: flex;
    align-items: center;
    padding: 6.5px 15px;
    cursor: pointer;
  }
  .hotSearchItem:hover {
    background-color: #f2f2f2;
  }
  .hotSearchIndex {
    margin-right: 15px;
    color: #aaa;
  }
  .topThree {
    color: #e13e3e;
  }
  .hotSearchWord {
    font-size: 12px;
    color: rgb(51, 51, 51);
  }
  .hotSearchWordTopThree {
    font-weight: 600;
    color: black;
  }
  .hotSearchContent {
    // font-size: 8px;这种是会默认成为12px的
    font-size: 12px;
    transform: scale(0.9) translateX(-5%);
  }
  // 搜索建议
  .searchSuggest {
    font-size: 12px;
  }
  .searchSuggestItemTitle {
    background-color: #f5f5f7;
    padding: 4px 8px;
  }
  .searchSuggestItemTitle i{
    font-size: 15px;
  }

  .searchSuggestItem {
    cursor: pointer;
  }
  .suggestItemDetail {
    padding: 4px 27px;
    font-size: 12px;
  }
  .suggestItemDetail:hover {
    background-color: #f2f2f2;
  }
</style>
