<template>
  <div class="FavoriteVideoContainer">
    <div class="FavoriteVideo">
      <div v-if="favoriteMvList.length != 0">
        <div class="title">收藏的视频和MV</div>
        <video-list-card
        :videoList="favoriteMvList"
        :videoType="'video'"
        :isLoad="true"
        @clickListCardItem="clickMvItem"
        @bottomLoad="bottomLoad"
      ></video-list-card>
      </div>
      <div v-else class="tip"><div>暂无收藏视频</div></div>
    </div>

  </div>
</template>
<script>
import VideoListCard from 'components/videoListCard/VideoListCard.vue'
export default {
  components: { VideoListCard },
  name: 'favoriteVideo',
  data () {
    return {
      favoriteMvList: [],
      hasMore: false,
      currentPage: 1
    }
  },
  methods: {
    async getFavoriteMvList () {
      var timestamp = Date.parse(new Date())
      const res = await this.$request('/mv/sublist', {
        limit: 50,
        offset: 50 * (this.currentPage - 1),
        timestamp
      })
      console.log(res)
      // this.favoriteMvList = res.data.data
      // 需要的是数组形式
      this.favoriteMvList.push(...res.data.data)
    },
    clickMvItem ({ id, index }) {
      if (this.favoriteMvList[index].type === 0) {
        this.$router.push({ name: 'videoDetail', params: { id, type: 'mv' } })
      } else {
        this.$router.push({
          name: 'videoDetail',
          params: { id, type: 'video' }
        })
      }
    },
    // 上拉触底的回调
    bottomLoad () {
      if (this.hasMore) {
        console.log('触底加载')
        this.currentPage += 1
        this.getFavoriteMvList()
      }
    }
  },
  created () {
    this.getFavoriteMvList()
  }
}
</script>

<style lang="less" scoped>
  .FavoriteVideoContainer {
  display: flex;
  justify-content: center;
  // padding: 0 85px;
  /* height: calc(100vh - 162px); */
  /* height: calc(80vh - 162px); */
}

.FavoriteVideo {
  max-width: 1000px;
}

.title {
  font-size: 12px;
  color: rgb(34, 34, 34);
  margin: 0px 0 10px;
  padding: 0 85px;
}

.tip {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: rgb(34, 34, 34);
}
</style>
