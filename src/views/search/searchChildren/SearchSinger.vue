<template>
  <div class="SearchSinger">
    <div v-if="singerCount!= 0">
      <div class="tip" >找到 {{singerCount}} 位歌手</div>
      <list-card
        :listCardData="searchSingerList"
        @clickListCardItem="clickListCardItem"
      ></list-card>
    </div>

    <!-- 分页 -->
    <div class="page" v-if="singerCount!== 0 && searchSingerList.length != 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="singerCount"
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
  name: 'SearchSinger',
  data () {
    return {
      singerCount: 0,
      searchSingerList: [],
      currentPage: 1
    }
  },
  methods: {
    // 获取歌手名字
    async getSearchSinger () {
      const res = await this.$request('/cloudsearch', {
        keywords: this.$route.params.id,
        offset: 30 * (this.currentPage - 1),
        type: 100
      })
      console.log(res)
      this.singerCount = res.data.result.artistCount
      this.searchSingerList = res.data.result.artists
    },
    // 评论点击翻页的回调
    pageChange (page) {
      this.currentPage = page
      this.searchSingerList = []
      // 再次调用，重新获取数据展示
      this.getSearchSinger()
    },
    // 点击卡片的回调
    // 跳转至singerDetail页面
    clickListCardItem (id) {
      this.$router.push({ name: 'singerDetail', params: { id } })
    }
  },

  created () {
    this.getSearchSinger()
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
