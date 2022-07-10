<template>
  <div class="SearchSong">
    <div v-if="songCount!==0">
        <!-- 找到歌曲 -->
      <div class="tip" >找到 {{songCount}} 首单曲</div>
      <!-- 是否有歌手信息，有就进行展示 -->
      <div class="multiMatch" v-if=" multiMatch.artist && currentPage == 1">
        <!-- <div class="tip" >找到 {{songCount}} 首单曲</div> -->
        <div class="matchTitle">最佳匹配</div>
        <div class="matchResult" @click="goToPersonal">
          <div class="matchCover">
            <img :src="multiMatch.artist[0].img1v1Url  + '?param==200y200'" alt="">
          </div>
          <div class="matchName">歌手: {{multiMatch.artist[0].name}}</div>
          <i class="iconfont icon-arrow-right-bold"></i>
        </div>
      </div>
    </div>
    <!-- 音乐表格展示 -->
    <el-table
    :data="searchSongList"
    highlight-current-row
    size="mini"
    stripe
    @row-dblclick="clickRow"
    @cell-click="clickCell"
    style="width: 100%">
      <el-table-column label="" width="30" type="index" :index="handleIndex">
      </el-table-column>
      <el-table-column label="" width="23">
        <i class="iconfont icon-download"></i>
      </el-table-column>
      <el-table-column property="name" label="音乐标题" min-width="200">
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" min-width="100">
      </el-table-column>
      <el-table-column property="al.name" label="专辑" min-width="170">
      </el-table-column>
      <el-table-column property="dt" label="时长" min-width="60">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div  class="page" v-if="searchSongList.length != 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size=30
        small
        :current-page = currentPage
        :total="songCount"
        @current-change = "pageChange">
      </el-pagination>
    </div>

  </div>
</template>

<script>
// 地址写的太烦了
// import { handleMusicTime } from '../../../plugins/util'
import { handleMusicTime } from 'plugins/util'
export default {
  name: 'SearchSong',
  data () {
    return {
      multiMatch: {},
      searchSongList: [],
      songCount: 0,
      currentPage: 1
    }
  },
  methods: {
    // 跳转至个人主页
    goToPersonal () {
      this.$router.push({
        name: 'singerDetail', params: { id: this.multiMatch.artist[0].id }
      })
    },
    // 处理索引
    handleIndex (index) {
      // console.log(index);
      index = index + 1 + 30 * (this.currentPage - 1)
      if (index < 10) {
        return '0' + index
      } else {
        return index
      }
    },
    // 获取最佳匹配
    async getMultMath () {
      const res = await this.$request('/search/multimatch', {
        keywords: this.$route.params.id
      })
      this.multiMatch = res.data.result
      console.log('multiMatch', this.multiMatch)
    },
    // 请求搜索歌曲
    async getSearchSong () {
      const res = await this.$request('/cloudsearch', {
        keywords: this.$route.params.id,
        // 这个参数是为了分页时，显示正确的内容
        offset: 30 * (this.currentPage - 1)
      })
      console.log(res)
      this.songCount = res.data.result.songCount
      this.searchSongList = res.data.result.songs
      // 对数据的音乐时长进行处理
      this.searchSongList.forEach((item, index) => {
        this.searchSongList[index].dt = handleMusicTime(item.dt)
      })
    },
    // 单曲点击翻页的回调
    pageChange (page) {
      this.currentPage = page
      this.searchSongList = []
      this.getSearchSong()
    },
    // 双击table的row的回调
    // 双击播放 -- to do
    async clickRow (row) {
      // 这里双击应该是要把当前双击的歌曲插入到当前的歌单中
      // 首先获取当前的歌单列表和歌曲索引
      const musicList = this.$store.state.musicList
      const currentIndex = this.$store.state.currentIndex
      // 先判断该歌曲是否已经在歌单中存在，避免重复点击导致歌单出现相同歌曲
      const isExist = musicList.find((item) => item.id === row.id)
      if (isExist) {
        // 如果已经存在 则只提交歌曲id并return出去
        this.$store.commit('updateMusicId', row.id)
        return false
      }
      this.$store.commit('changePlayState', false)
      // 将请求到的歌曲详情插入到歌单对应位置并提交至vuex
      musicList.splice(currentIndex + 1, 0, row)
      this.$store.commit('updateMusicId', row.id)
      this.$store.commit('updateMusicList', {
        musicList,
        musicListId: this.$store.state.musicListId
      })
    },
    // 点击下载按钮进行下载
    async clickCell (row, column, cell) {
      // 判断点击的是下载按钮
      if (cell.querySelector('.icon-download')) {
        // 请求该歌曲的url
        console.log(row)
        const res = await this.$request('/song/url', { id: row.id })
        console.log(res.data.data[0].url)
        console.log(res)
        if (res.data.data[0].url == null) {
          this.$message.warning('暂时无法获取该资源哦!')
          return
        }

        // 匹配资源的域名
        const url = res.data.data[0].url.match(/http.*?\.net/)
        // console.log('url', url)
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
    }
  },

  created () {
    this.getMultMath()
    this.getSearchSong()
    // console.log(this.$route.params.id);
  }
}
</script>

<style lang="less" scoped>
.SearchSong {
  padding: 0 15px;
}
  .tip {
    font-weight: bold;
    color: rgb(34, 34, 34);
    margin: 0 0 10px 0;
  }

  // .multiMatch {
  //   // height: 65px;
  // }
  .matchTitle {
    font-size: 12px;
    color: rgb(34, 34, 34);
    margin: 5px 0;
  }
  .matchResult {
    display: flex;
    justify-items: center;
    position: relative;
    line-height: 65px;
    // height: 65px;
    width: 270px;
    border-radius: 5px;
    background-color: #f4f4f4;
    margin-bottom: 20px;
    cursor: pointer;
  }
  .matchCover {
    width: 65px;
    height: 65px;
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  .matchName {
    font-size: 13px;
    color: rgb(31, 31, 31);
    margin-left: 10px;
  }
  .multiMatch i {
    position: absolute;
    // transform: translateY(-50%);
    right: 15px;
    // top: 50%;
  }
  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    margin: 20px 0;
  }
</style>
