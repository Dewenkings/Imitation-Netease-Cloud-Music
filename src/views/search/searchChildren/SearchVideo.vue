<template>
  <div class="SearchVideo">
    <div class="tip">找到 {{videoCount}} 个视频</div>
    <video-list-card
      :videoList="searchVideoList"
      :videoType="'video'"
      @clickListCardItem="clickListCardItem"
    ></video-list-card>
     <!-- 分页 -->
    <div class="page" v-if="searchVideoList.length != 0">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="videoCount"
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
import VideoListCard from 'components/videoListCard/VideoListCard.vue'

export default {
  components: { VideoListCard },
  name: 'SearchVideo',
  data () {
    return {
      videoCount: 0,
      searchVideoList: [],
      currentPage: 1
    }
  },
  methods: {
    // 请求数据
    async getSearchVideo () {
      const res = await this.$request('/cloudsearch', {
        keywords: this.$route.params.id,
        type: 1014,
        offset: 30 * (this.currentPage - 1)
      })
      console.log(res)
      this.videoCount = res.data.result.videoCount
      this.searchVideoList = res.data.result.videos
    },
    // 点击切换页面
    pageChange (page) {
      this.currentPage = page
      this.searchVideoList = []
      this.getSearchVideo()
    },
    // 点击视频进行跳转
    clickListCardItem (id, type) {
      console.log(id)
      console.log(type)
      if (type === 0) {
        this.$router.push({ name: 'videoDetail', params: { id, type: 'mv' } })
      } else {
        this.$router.push({
          name: 'videoDetail',
          params: { id, type: 'video' }
        })
      }
    }
  },
  created () {
    this.getSearchVideo()
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
