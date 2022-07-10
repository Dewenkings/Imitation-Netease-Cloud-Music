<template>
  <div v-if="singerInfo.cover" class="SingerDetail">
    <div class="listInfo">
      <!-- 歌手封面 -->
      <div class="listAvatar">
        <img :src="singerInfo.cover + '?param=300y300'" alt="" />
      </div>
      <!-- 右上侧信息 -->
      <div class="right">
        <!-- 标题 -->
        <div class="title">
          <div class="titleContent">{{singerInfo.name}}</div>
        </div>
        <!-- 操作按钮 -- to do -->
        <div class="buttons">
          <div class="buttonItem" @click="subSinger">
            <i class="iconfont icon-xihuan" :class="isSub ? 'red' : ''"></i>
            <span>{{ isSub ? "已收藏" : "收藏" }}</span>
          </div>
          <div class="buttonItem">
            <i class="iconfont icon-link"></i>
            <span>个人主页</span>
          </div>
        </div>
        <!-- 歌曲列表的歌曲数量和播放量 -->
        <div class="otherInfo">
          <div class="musicNum">单曲数：{{singerInfo.musicSize}}</div>
          <div class="musicNum">专辑数：{{singerInfo.albumSize}}</div>
          <div class="musicNum">MV数：{{singerInfo.mvSize}}</div>
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="musicList">
      <el-tabs value="first" @tab-click="clickTab">
        <el-tab-pane label="专辑" name="first">
          <div class="topSongs" v-if="topSongs.topSongs">
            <!-- 热门50首没有id，将歌手id作为listid -->
            <list-table
              :officialListDetailItem="topSongs"
              @handleRowClick="handleRowClick"
              @handleRowDbClick="handleRowDbClick"
              @clickCheckAll="allTopSongs"
              :isCheckAllShow="isCheckAllShow"
              :cover="require('/src/assets/img/topSongsLogo.png')"
              :listId="this.$route.params.id.toString()"
              >
              <div slot="header" class="header">
                <div class="title">热门50首</div>
              </div>
            </list-table>
          </div>
          <!-- 专辑, -->
           <div
            class="albumItemContainer"
            v-if="singerAlbum.length != 0"
            v-infinite-scroll="load"
            :infinite-scroll-disabled="disabled"
            :infinite-scroll-distance="300"
            :infinite-scroll-immediate="false"
          >
          <!-- 对每一个专辑都要调用一次该方法 -->
            <div
              class="albumItem"
              v-for="(item, index) in singerAlbum"
              :key="index"
            >
              <list-table
                :officialListDetailItem="item.songsObj"
                @clickCheckAll="clickListCardItem"
                :cover="item.album.blurPicUrl + '?param=300y300'"
                :listId="item.album.id.toString()"
              >
                <div slot="header" class="header">
                  <div class="title">{{ item.album.name }}</div>
                </div>
              </list-table>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="MV" name="second">
          <video-list-card
          :videoList="singerMvInfo.mvs"
          :isLoad="true"
          @clickListCardItem="goToVideoDetail"
          @bottomLoad="bottomLoad"
          ></video-list-card>
        </el-tab-pane>
        <el-tab-pane label="歌手详情" name="third">
          <div class="singerDesc">{{ singerInfo.briefDesc }}</div>
        </el-tab-pane>
        <el-tab-pane label="相似歌手" name="fourth">
          <div class="noSimiAritst" v-if="simiArtistList.length==0">
            没有相关歌手
          </div>
          <div v-else>
             <list-card
            :listCardData="simiArtistList"
            @clickListCardItem="clickToSinger">
            </list-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <go-top scrollObj=".SingerDetail"></go-top>
  </div>
</template>

<script>
import { handleMusicTime } from 'plugins/util'
import ListTable from 'components/listTable/ListTable.vue'
import ListCard from 'components/listCard/ListCard.vue'
import VideoListCard from 'components/videoListCard/VideoListCard.vue'
import GoTop from 'components/goTop/GoTop.vue'

// 记录上一首播放的音乐信息  用于清空小喇叭和红字样式
const currentRowInfo = {}
// 定时器名称
let timer
export default {
  components: { ListTable, ListCard, VideoListCard, GoTop },
  data () {
    return {
      singerInfo: {},
      // 热门50首
      topSongs: {},
      // 歌手专辑
      singerAlbum: [],
      // 专辑页数
      albumPage: 1,
      disabled: true,
      // 相似歌手
      simiArtistList: [],
      // 是否显示topSong的查看全部按钮
      isCheckAllShow: true,
      // 是否是双击操作
      isDbc: false,
      // 是否收藏了当前歌手(订阅)
      isSub: false,
      // 歌手mv数据
      singerMvInfo: { mvs: [], hasMore: false },
      // MV页数
      videoPage: 1
    }
  },
  methods: {
    // 请求歌手详情
    async getSingerInfo () {
      const res = await this.$request('/artist/detail', {
        id: this.$route.params.id
      })
      console.log(res)
      this.singerInfo = res.data.data.artist
    },
    // 请求歌手热门50首歌曲
    async getSingerTopSongs () {
      const res = await this.$request('/artist/top/song', {
        id: this.$route.params.id
      })
      // console.log('歌手热门50首歌曲', res)
      const topSongs = res.data.songs
      // 处理歌单中歌曲的时间
      topSongs.forEach((item, index) => {
        topSongs[index].dt = handleMusicTime(item.dt)
      })
      // topSongs改成对象，添加isOpen属性，用于点击查看列表所有歌曲
      this.topSongs = { topSongs, isOpen: false }
      console.log('歌手热门50首歌曲', this.topSongs)
    },
    // 请求歌手 mv 数据
    async getSingerMv () {
      // 这个接口没有offset 参数
      const res = await this.$request('/artist/mv', {
        id: this.$route.params.id,
        limit: 20 * this.videoPage
        // offset: (this.videoPage - 1) * 20
      })
      console.log('请求歌手MV列表：', res)
      this.singerMvInfo = res.data
    },
    // 请求歌手专辑列表
    async getAlbumInfo () {
      let res = await this.$request('/artist/album', {
        id: this.$route.params.id,
        limit: 20,
        offset: (this.albumPage - 1) * 20
      })
      console.log('歌手专辑列表', res)
      this.isAlbumMore = res.data.more
      res = res.data.hotAlbums
      await res.forEach((item) => {
        this.getAlbumDetail(item.id)
      })
    },
    // 请求专辑内容
    async getAlbumDetail (id) {
      let res = await this.$request('/album', { id })
      res = res.data
      console.log(res)
      const songs = res.songs
      // 处理歌曲中的时间
      songs.forEach((item, index) => {
        songs[index].dt = handleMusicTime(item.dt)
      })
      // 把一个专辑中所有歌曲内容存储在一个对象中,子组件设置了对象属性要求
      res.songsObj = { songs }
      this.singerAlbum.push(res)
      console.log('歌手专辑', this.singerAlbum)
    },
    // 事件函数
    // 行双击事件的回调
    // 这里的 id是歌曲id   index 双击歌曲在歌单(专辑）中的索引   listId是（专辑）歌单id
    handleRowDbClick ({ id, index, listId }) {
      console.log('id', id)
      console.log('index', index)
      console.log('listId', listId)
      this.isDbc = true
      this.handleViewDOM(id, listId, index)

      // 播放的逻辑操作
      if (listId !== this.$route.params.id) {
        const musicListIndex = this.singerAlbum.findIndex(
          (item) => item.album.id === listId
        )
        // console.log(musicListIndex);
        this.$store.commit('updateMusicId', id)
        // 如果歌单发生变化,则提交歌单到vuex
        if (listId !== this.$store.state.musicListId) {
          // 将歌单传到vuex
          this.$store.commit('updateMusicList', {
            musicList: this.singerAlbum[musicListIndex].songs,
            musicListId: listId
          })
        }
      } else {
        this.$store.commit('updateMusicId', id)
        // 如果歌单发生变化,则提交歌单到vuex
        // 如果是topsong 就拿歌手的id 当作listid 作为唯一辨识
        if (this.$route.params.id !== this.$store.state.musicListId) {
          // 将歌单传到vuex
          this.$store.commit('updateMusicList', {
            musicList: this.topSongs.topSongs,
            musicListId: this.$route.params.id
          })
        }
      }
    },
    // 收藏歌手(订阅)
    async subSinger () {
      if (!this.$store.state.isLogin) {
        this.$message.error('请先登录!')
        return
      }
      this.isSub = !this.isSub
      // 发送请求
      await this.$request('/artist/sub', {
        id: this.$route.params.id,
        t: this.isSub ? 1 : 0
      })
      // 每次进行修改操作后，都需要更新vuex里面的收藏list
      this.getSubSingerList()
    },
    // 请求收藏的歌手列表
    async getSubSingerList () {
      const timestamp = Date.parse(new Date())
      const res = await this.$request('/artist/sublist', {
        limit: 1000,
        timestamp
      })
      console.log(res.data.data)
      this.$store.commit('updateSubSingerList', res.data.data)
    },
    // 专辑上拉触底加载
    load () {
      // console.log('上拉触底')
      this.disabled = true
      this.albumPage += 1
      this.getAlbumInfo()
    },
    // mv上拉加载
    bottomLoad () {
      if (this.singerMvInfo.hasMore === true) {
        this.videoPage += 1
        this.getSingerMv()
      }
    },
    // 点击热门歌曲某行
    handleRowClick () {
      if (document.querySelector('.selectRow')) {
        document.querySelector('.selectRow').classList.remove('selectRow')
      }
      event.classList.add('selectRow')
    },
    // 点击视频卡片进入视频详情
    goToVideoDetail ({ id }) {
      if (!this.$store.state.isLogin) {
        this.$message.error('登录后才能观看MV哦!')
        return
      }
      // console.log(id);
      this.$router.push({ name: 'videoDetail', params: { id, type: 'mv' } })
    },
    // 点击榜单进入歌单详情界面
    clickListCardItem ({ listId }) {
      console.log(listId)
      this.$router.push({ name: 'album', params: { id: listId } })
    },
    // 点击进入相似歌手详情界面
    clickToSinger (id) {
      console.log(id)
      this.$router.push({ name: 'singerDetail', params: { id } })
    },
    handleViewDOM (id, listId, index) {
      // console.log('currentRowInfo', currentRowInfo)
      // 先清空之前的样式
      if (currentRowInfo.listId) {
        this.cleanStyle(currentRowInfo.i, currentRowInfo.listId)
      }
      const tables = document.querySelectorAll('table')
      // 这里的 id是歌曲id   index 双击歌曲在歌单中的索引   listId是歌单id
      let i = -1
      // 根据listId找歌单索引 listIndex
      let listIndex = -1
      // top50的情况
      if (listId === this.$route.params.id) {
        listIndex = 0
      } else {
        listIndex = this.singerAlbum.findIndex(
          (item) => item.album.id === listId
        )
        console.log('listIndex', listIndex)
        // 如果没有，说明目前还没有渲染或者还没有请求
        if (listIndex === -1) {
          console.log('can not find listIndex')
          return
        }
        listIndex += 1
      }

      // 找歌曲在歌单中的索引 i
      if (index === undefined) {
        // 分top50和专辑两种情况
        if (listIndex === 0) {
          i = this.topSongs.topSongs.findIndex((item) => item.id === id)
        } else {
          i = this.singerAlbum[listIndex - 1].songs.findIndex(
            (item) => item.id === id
          )
        }
      } else {
        i = index
      }

      console.log(i, 'i')
      console.log(index, 'index')
      // 渲染
      if (tables[listIndex] && tables[listIndex].children[i]) {
        const currentRow = tables[listIndex].children[i]
        // console.log(currentRow);
        currentRow.querySelector('.index').innerHTML =
          "<i class='iconfont icon-yinliang' style='color:#ff4e4e'></i>"
        currentRow.querySelector('.musicName').style.color = '#ff4e4e'

        // 保存当前数据 供下次清空样式使用
        currentRowInfo.i = i
        // 因为歌单的顺序可能会改变，所以不要直接保存索引
        currentRowInfo.listId = listId
        currentRowInfo.singerId = this.$route.params.id
        // 将currentRowInfo上传至vuex 供下次重新进入页面使用
        this.$store.commit('updateCurrentRowInfo', currentRowInfo)
      }
    },
    cleanStyle (i, listId) {
      const tables = document.querySelectorAll('table')
      // 找到歌单的索引
      let listIndex = -1
      if (listId === this.$route.params.id) {
        listIndex = 0
      } else { // 专辑的情况
        listIndex = this.singerAlbum.findIndex(
          (item) => item.album.id === listId
        )
        // 如果没有，说明目前还没有渲染或者还没有请求
        if (listIndex === -1) {
          console.log('can not find listIndex')
          return
        }
        listIndex += 1
      }
      // console.log("执行了清空");
      // console.log("listIndex:", listIndex);
      // console.log("i:", i);
      if (tables[listIndex] && tables[listIndex].children[i]) {
        const lastRow = tables[listIndex].children[i]
        lastRow.querySelector('.index').innerHTML = i + 1
        lastRow.querySelector('.musicName').style.color = '#1f1f1f'
      }
    },
    // 查看热门50首全部歌曲
    allTopSongs () {
      this.topSongs.isOpen = true
      this.isCheckAllShow = false
      // 查看全部后再次渲染样式
      setTimeout(() => {
        if (
          this.$store.state.currentRowInfo.singerId === this.$route.params.id
        ) {
          this.handleViewDOM(
            this.$store.state.musicId,
            this.$store.state.musicListId
          )
        }
      }, 500)
    },
    // 请求相似歌手数据
    async getSimiArtistInfo () {
      const res = await this.$request('/simi/artist', {
        id: this.$route.params.id
      })
      console.log('simiArtist:', res)
      this.simiArtistList = res.data.artists
    },
    // 点击el-tab-pane的回调
    clickTab (e) {
      console.log(e.index)
      if (e.index === 1 && this.singerMvInfo.mvs.length === 0) {
        this.getSingerMv()
      }
    }

  },
  created () {
    this.getSingerInfo()
  },
  async mounted () {
    await this.getSingerTopSongs()
    await this.getAlbumInfo()
    await this.getSimiArtistInfo()
    await this.getSingerMv()
  },
  watch: {
    singerAlbum () {
      if (this.singerAlbum.length !== 0 && this.isAlbumMore) {
        this.disabled = false
      } else {
        this.disabled = true
      }
    },
    // 音乐加载完成后重置isDbc
    '$store.state.isMusicLoad' (isMusicLoad) {
      if (!isMusicLoad) {
        this.isDbc = false
      }
    },

    '$store.state.musicId' (current, last) {
      // 判断是否是双击，如果是双击则不用调用handleView
      if (!this.isDbc) {
        // id,listId
        this.handleViewDOM(
          this.$store.state.musicId,
          this.$store.state.musicListId
        )
      }
    },

    // 监听singerAlbum的变化
    // eslint-disable-next-line no-dupe-keys
    singerAlbum () {
      clearTimeout(timer)
      timer = setTimeout(() => {
        if (
          this.$store.state.currentRowInfo.singerId === this.$route.params.id
        ) {
          this.handleViewDOM(
            this.$store.state.musicId,
            this.$store.state.musicListId
          )
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
  .SingerDetail {
    overflow-y: scroll;
  }
  .listInfo {
    display: flex;
    padding: 25px 10px;
  }
  .listAvatar {
    width: 150px;
    height: 150px;
    overflow: hidden;
    border-radius: 10px;
    margin-right: 15px;
  }
  .listAvatar img {
    width: 100%;
  }
  .title {
    display: flex;
    align-items: center;
  }
  .right {
    width: calc(100% - 200px);
    margin-top: 10px;
  }
  .titleContent {
    font-size: 20px;
    font-weight: 600;
    color: #373737;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 90%;
  }
  .buttons {
    display: flex;
    align-items: center;
    font-size: 12px !important;
    margin-top: 20px
  }

  .buttonItem {
    margin-right: 10px;
    border: 1px solid rgb(225, 204, 204);
    border-radius: 20px;
    padding: 5px 10px;
  }
   .buttonItem i {
     font-size: 12px !important;
     margin-right: 4px;
   }
   .otherInfo {
     display: flex;
     align-items: center;
     margin-top: 20px;
   }
   .musicNum {
     font-size: 12px;
     margin-right: 13px;
     transform: scale(0.9);
   }
   .musicList {
    //  display: flex;
     width: 100%;
   }
  .title {
    font-size: 16px;
    font-weight: 600;
    color: black;
    margin-bottom: 10px;
  }
  //  歌曲部分
  .singerDesc {
    font-size: 12px;
    color: #373737;
    line-height: 25px;
    letter-spacing: 0.5px;
    text-indent: 2em;
  }
  .noSimiAritst {
    margin: 50px;
    text-align: center;
    color: #999999;
    font-size: 12px;
  }
</style>
