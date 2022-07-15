  <template>
  <div class="album"  v-if="albumInfo.album">
    <!-- 专辑信息 -->
    <div class="listInfo">
      <!-- 专辑封面 -->
      <div class="listAvatar">
        <img :src="albumInfo.album.picUrl + '?param=300y300'" alt="">
      </div>
      <div class="right">
        <!-- 标题 -->
        <div class="title">
          <div class="titleTag">专辑</div>
          <div class="titleContent">{{ albumInfo.album.name }}</div>
        </div>
        <!-- 操作按钮 -->
        <div class="buttons">
          <div class="buttonItem playAll" @click="playAll">
            <i class="iconfont icon-bofang playAll"></i>
            <span>播放全部</span>
          </div>
          <div class="buttonItem" @click="subAlbum">
            <i class="iconfont icon-xihuan" :class="isSub ? 'red' : ''"></i>
            <span>{{ isSub ? "已收藏" : "收藏" }}</span>
          </div>
          <div class="buttonItem">
            <i class="iconfont icon-zhuanfa"></i>
            <span>分享</span>
          </div>
        </div>
        <div class="otherInfo">
          <div class="playCount">
            歌手：
            <span
            @click="$router.push({
                name: 'singerDetail',
                params: { id: albumInfo.album.artist.id },
                })"
            >{{albumInfo.album.artist.name}}</span>
          </div>
        </div>
        <div class="otherInfo detail">
          <span>时间：{{albumInfo.album.publishTime | showDate}}</span>
        </div>
      </div>
    </div>
    <!-- 专辑中的歌曲列表 -->
    <div class="musicList">
      <el-tabs value="first">
        <el-tab-pane label="歌曲列表" name="first">
          <el-table :data="albumInfo.songs" style="width: 90%"
          stripe size="mini" highlight-current-row
          @row-dblclick="clickRow"
          @cell-click="clickCell">
            <el-table-column type="index" width="30" label="" :index="handleIndex"></el-table-column>
            <el-table-column label="" width="30">
              <!-- 下载按钮 -->
              <i class="iconfont icon-download"></i>
            </el-table-column>
            <el-table-column prop="name" label="音乐标题" width="350"></el-table-column>
            <el-table-column prop="ar[0].name" label="歌手"  width="200"></el-table-column>
            <el-table-column prop="al.name" label="专辑" width="240"></el-table-column>
            <el-table-column prop="dt" label="时长" width="100"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评论" name="second">
          <div class="commentList" v-loading="isCommentLoading">
            <!-- 精彩评论 -->
            <comment
              :comments="comments.hotComments"
              :commentType="'album'"
              :commentId="albumInfo.album.id + ''"
              @getComment="getAlbumComment"
              v-if="comments.hotComments"
              ><div slot="title">精彩评论</div></comment
            >
            <!-- 最新评论 -->
            <comment
              :comments="comments.comments"
              :commentType="'album'"
              :commentId="albumInfo.album.id + ''"
              :isHotComment="comments.hotComments ? false : true"
              @getComment="getAlbumComment"
              ><div slot="title">热门评论</div></comment
            >
          </div>
          <!-- 分页 -->
          <div class="page" v-if="comments && comments.comments">
            <el-pagination
              background
              layout="prev, pager, next"
              :total="comments.total"
              small
              :page-size="50"
              :current-page="currentCommentPage"
              @current-change="commentPageChange"
            >
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专辑详情" name="third">
          <div class="albumDesc">{{albumInfo.album.description}}</div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <go-top scrollObj=".album"></go-top>
  </div>
</template>

<script>
import { formatDate, handleNum, handleMusicTime } from 'plugins/util'
import Comment from 'components/comment/Comment.vue'
import GoTop from 'components/goTop/GoTop.vue'
export default {
  components: { Comment, GoTop },
  name: 'album',
  data () {
    return {
      albumInfo: {},
      isSub: false,
      comments: {},
      // 当前评论页数
      currentCommentPage: 1,
      // 评论是否在加载中
      isCommentLoading: false
    }
  },
  methods: {
    // 请求专辑详情
    async getAlbumDetail () {
      let res = await this.$request('/album', {
        id: this.$route.params.id
      })
      console.log('album:', res)
      res = res.data
      // 处理歌曲时间
      res.songs.forEach((item, index) => {
        res.songs[index].dt = handleMusicTime(item.dt)
      })
      this.albumInfo = res
    },
    // 获取歌单评论
    async getAlbumComment (type) {
      // 获取时间戳
      var timestamp = Date.parse(new Date())
      this.isCommentLoading = true

      // 每次请求前先清空comment
      // this.comments.comments = [];

      if (type === 'changePage') {
        const album = document.querySelector('.album')
        const listInfo = document.querySelector('.listInfo')
        console.log([listInfo])
        album.scrollTo({
          behavior: 'smooth',
          top: listInfo.clientHeight - 25
        })
      }

      const res = await this.$request('/comment/album', {
        id: this.$route.params.id,
        offset: (this.currentCommentPage - 1) * 50,
        limit: 50,
        timestamp
      })
      this.isCommentLoading = false
      if (res.data.code !== 200) {
        this.$message.error('获取评论失败,请稍后重试!')
        return
      }

      // console.log(res);
      this.comments = res.data
    },
    // 事件函数
    handleIndex (index) {
      index += 1
      // console.log(index)
      if (index < 10) {
        return '0' + index
      } else {
        return index
      }
    },
    // 点击全部播放按钮的回调-----
    playAll () {
      this.$store.commit('updateMusicId', this.albumInfo.songs[0].id)
      this.$store.commit('updateMusicList', {
        musicList: this.albumInfo.songs,
        musicListId: this.albumInfo.album.id
      })
    },
    // 双击播放音乐
    clickRow (row) {
      // 将musicId提交到vuex中 供bottomControl查询歌曲url和其它操作
      this.$store.commit('updateMusicId', row.id)
      // 如果歌单发生变化,则提交歌单到vuex
      if (this.albumInfo.album.id !== this.$store.state.musicListId) {
        // 将歌单传到vuex
        this.$store.commit('updateMusicList', {
          musicList: this.albumInfo.songs,
          musicListId: this.albumInfo.album.id
        })
      }
    },
    // 评论点击翻页的回调
    commentPageChange (page) {
      this.currentCommentPage = page
      this.getAlbumComment('changePage')
    },
    // 点击收藏专辑的回调
    async subAlbum () {
      this.isSub = !this.isSub
      await this.$request('/album/sub', {
        id: this.$route.params.id,
        t: this.isSub ? 1 : 0
      })
      this.getAlbumSublist()
    },
    // 获取已收藏专辑列表并判断用户是否收藏当前专辑  因为喜欢和收藏具有较高实时性，所以每次请求都添加时间戳，避免缓存304
    async getAlbumSublist () {
      const timestamp = Date.parse(new Date())
      const res = await this.$request('/album/sublist', {
        limit: 1000,
        timestamp
      })
      console.log(res)
      this.$store.commit('updateSubAlbumList', res.data.data)
    },
    // 点击单元格的回调
    async clickCell (row, column, cell) {
      // 判断点击的是下载按钮
      if (cell.querySelector('.icon-download')) {
        // 请求该歌曲的url
        console.log(row)
        const res = await this.$request('/song/url', { id: row.id })
        console.log(res)
        if (res.data.data[0].url == null) {
          this.$message.warning('暂时无法获取该资源哦!')
          return
        }

        // 匹配资源的域名
        const url = res.data.data[0].url.match(/http.*?\.net/)
        // 匹配域名名称，并匹配对应的代理
        const serve = url[0].match(/http:\/(\S*).music/)[1]
        if (
          serve !== '/m7' &&
          serve !== '/m701' &&
          serve !== '/m8' &&
          serve !== '/m801'
        ) {
          // 没有对应的代理
          this.$message.error('匹配不到对应的代理,下载失败!')
          return
        }
        // 截取后面的参数
        const params = res.data.data[0].url.slice(url[0].length)
        // console.log(url[0], serve, params);

        const downloadMusicInfo = {
          url: serve + params,
          name:
            row.name +
            ' - ' +
            row.ar[0].name +
            '.' +
            res.data.data[0].type.toLowerCase()
        }
        console.log(downloadMusicInfo)
        this.$store.commit('updateDownloadMusicInfo', downloadMusicInfo)
      }
    },
    // 判断用户是否收藏了该专辑
    getIsSub () {
      this.isSub = this.$store.state.subAlbumList.find(
        (item) => item.id === this.$route.params.id
      )
    }
  },
  created () {
    // 获取专辑评价
    this.getAlbumComment()
  },
  async mounted () {
    await this.getAlbumDetail()
    this.$nextTick(() => {
      // 判断是否和上一次打开的歌单相同
      if (this.$route.params.id === this.$store.state.musicListId) {
        this.handleDOM(this.$store.state.musicId)
      }
    })
    if (this.$store.state.subAlbumList == null) {
      await this.getAlbumSublist()
    }
    this.getIsSub()
  },
  filters: {
    showDate (value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value)

      // 2、将date进行格式化
      return formatDate(date, 'yyyy-MM-dd')
    },
    handleNum
  }
}
</script>

<style lang="less" scoped>
  .album {
    height: calc(81vh);
    overflow-y: scroll;
  }
  .listInfo {
    display: flex;
    justify-items: center;
    padding: 25px 15px;
  }
  .right {
    width: calc(100% - 200px);
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .listAvatar {
    width: 150px;
    height: 150px;
    margin-right: 15px
  }
  .listAvatar img {
    width: 100%;
    border-radius: 10px;
  }
  .title {
    display: flex;
    align-items: center;
  }
  .titleTag {
    width:32px;
    font-size: 12px;
    color: #ec4141;
    border: 1px solid #ec4141;
    padding: 1px 2px;
    border-radius: 2px;
    margin-right: 5px;
    transform: scale(0.8);
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
    margin: 8px 0 0 -5px;
    display: flex;
  }
  .buttonItem {
    padding: 8px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 12px;
    transform: scale(0.9);
  }
  .buttonItem i {
    font-size: 12px;
    transform: scale(0.9);
    margin-right: 3px;
  }
  .playAll {
    background-color: #ec4141;
    color: white;
  }
  .otherInfo {
    margin: 10px 0 0 -30px;
    display: flex;
    font-size: 12px;
    transform: scale(0.9);
  }
  .detail {
    margin-top: 6px;
  }
  .playCount span {
    cursor: pointer;
    color: #6191c2;
  }
  .albumDesc {
    font-size: 12px;
    text-indent: 2em;
    line-height: 25px;
    color: #373737;
    letter-spacing: 0.5px;
  }
  .musicList {
    width: calc(100%);
    margin-left: 15px;
  }
  .page {
    display: flex;
    justify-content: center;
  }
</style>
