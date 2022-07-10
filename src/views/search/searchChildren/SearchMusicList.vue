<template>
  <div class="SearchMusicList">
    <div v-if="musicListCount!=0">
      <div class="tip">找到 {{ musicListCount}} 个歌单</div>
      <list-card
        :listCardData="searchMusicList"
        @clickListCardItem="clickListCardItem"
      ></list-card>
    </div>

    <!-- 分页 -->
    <div class="page" v-if="searchMusicList.length != 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="musicListCount"
        small
        :page-size="30"
        :current-page="currentPage"
        @current-change="pageChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ListCard from 'components/listCard/ListCard.vue'
export default {
  components: { ListCard },
  name: 'SearchMusicList',
  data () {
    return {
      musicListCount: 0,
      searchMusicList: [],
      currentPage: 1
    }
  },
  methods: {
    // 获取歌手名字
    async getSearchMusicList () {
      const res = await this.$request('/cloudsearch', {
        keywords: this.$route.params.id,
        offset: 30 * (this.currentPage - 1),
        type: 1000
      })
      console.log(res)
      this.musicListCount = res.data.result.playlistCount
      this.searchMusicList = res.data.result.playlists
    },
    // 评论点击翻页的回调
    pageChange (page) {
      this.currentPage = page
      this.searchMusicList = []
      // 再次调用，重新获取数据展示
      this.getSearchMusicList()
    },
    // 点击卡片的回调
    // 跳转至musiclistDetail页面 --- 另一个页面 -- to do
    clickListCardItem (id) {
      this.$router.push({ name: 'musicListDetail', params: { id } })
    }
  },

  created () {
    this.getSearchMusicList()
  }
}
</script>

<style lang="less" scoped>
  .tip {
    font-weight: bold;
    color: rgb(34, 34, 34);
    margin: 0 0 10px 20px;
  }
  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
    margin: 20px 0;
  }
</style>
