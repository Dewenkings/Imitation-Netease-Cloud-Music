<template>
  <div class="SearchAlbum">
    <div v-if="albumCount!=0">
      <div class="tip">找到 {{albumCount}} 张专辑</div>
      <list-card
        :listCardData="searchAlbumList"
        @clickListCardItem="clickListCardItem"
      ></list-card>

      <!-- 分页 -->
      <el-pagination
        v-if="searchAlbumList.length != 0"
        background
        layout="prev, pager, next"
        small
        :current-page = currentPage
        :page-size = 30
        @current-change = "pageChange"
        :total="albumCount">
      </el-pagination>
    </div>
  </div>

</template>

<script>
import ListCard from 'components/listCard/ListCard.vue'
export default {
  components: { ListCard },
  name: 'SearchAlbum',
  data () {
    return {
      albumCount: 0,
      searchAlbumList: [],
      currentPage: 1
    }
  },
  methods: {
    async getSearchAlbum () {
      const res = await this.$request('/cloudsearch', {
        type: 10,
        keywords: this.$route.params.id,
        offset: 30 * (this.currentPage - 1)
      })
      console.log(res)
      this.albumCount = res.data.result.albumCount
      this.searchAlbumList = res.data.result.albums
    },
    // 点击页面进行跳转
    pageChange (page) {
      this.currentPage = page
      this.searchAlbumList = []
      // 再次调用请求
      this.getSearchAlbum()
    },
    // 点击卡片的回调
    // 跳转至albumDetail页面
    clickListCardItem (id) {
      this.$router.push({ name: 'album', params: { id } })
    }
  },

  created () {
    this.getSearchAlbum()
  }
}
</script>

<style lang="less" scoped>
  .tip {
    font-weight: bold;
    color: rgb(34, 34, 34);
    margin: 0 0 10px 20px;
  }
  .el-pagination {
    text-align: center;
  }
</style>
