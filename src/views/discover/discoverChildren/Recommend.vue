<template>
  <div class="recommendContainer">
    <!-- 轮播图 -->
    <div class="recommend">
      <div class="carousel">
        <el-carousel :interval="4000" type="card" height="180px">
          <el-carousel-item v-for="(item, index ) in bannerData" :key="index" @click.native="TurnToPage(item)">
            <img :src="item.imageUrl" alt="">
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 推荐歌单 -->
      <div class="recommendMusicList">
        <h3>推荐歌单<i class="iconfont icon-arrow-right-bold"></i></h3>
        <list-card
        :listCardData="musicList"
        @clickListCardItem="clickToMusicListDetail"
        ></list-card>
      </div>
    </div>
  </div>
</template>

<script>
import ListCard from 'components/listCard/ListCard.vue'
export default {
  components: { ListCard },
  name: 'recommend',
  data () {
    return {
      bannerData: '',
      musicList: []
    }
  },
  methods: {
    async getBannerDate () {
      const res = await this.$request('/banner', {
        type: 0
      })
      console.log('banner:', res)
      this.bannerData = res.data.banners
    },
    // 请求推荐歌单数据的前十个
    getMusicList () {
      this.$request('/personalized', { limit: 10 }).then((res) => {
        console.log('personalized:', res)
        this.musicList = res.data.result
      })
    },
    // 点击轮播图跳转具体页面--- to do
    TurnToPage (item) {
      // 专辑
      console.log('item--', item)
      const type = item.targetType
      const id = item.targetId
      console.log('type', typeof id)
      console.log(type, id)
      if (type === 10) {
        console.log('album')
        this.$router.push({ name: 'album', params: { id: id } })
      } else if (type === 1000) { // 歌单
        console.log('musicList')
        this.$router.push({ name: 'musicListDetail', params: { id: id } })
      } else if (type === 100) {
        console.log('singer') // 歌手
        this.$router.push({ name: 'singerDetail', params: { id: id } })
      } else if (type === 1) {
        console.log('song') // 单曲
        // 可以播放，当时存在底部播放按钮左侧没有变化
        // this.$store.commit('updateMusicId', id.toString())
        const musicList = this.$store.state.musicList
        const currentIndex = this.$store.state.currentIndex
        // 先判断该歌曲是否已经在歌单中存在，避免重复点击导致歌单出现相同歌曲
        console.log(id.toString())
        const isExist = musicList.find((item) => {
          return item.id === id.toString()
        })
        console.log('isExist', isExist)
        if (isExist) {
        // 如果已经存在 则只提交歌曲id并return出去
          this.$store.commit('updateMusicId', id.toString())
          return false
        }
        this.$store.commit('changePlayState', false)
        // 将请求到的歌曲详情插入到歌单对应位置并提交至vuex
        musicList.splice(currentIndex + 1, 0, item)

        this.$store.commit('updateMusicId', id.toString())
        this.$store.commit('updateMusicList', {
          musicList,
          musicListId: this.$store.state.musicListId
        })
      }
    },
    // 点击跳转歌单详情页面
    clickToMusicListDetail (id) {
      this.$router.push({
        name: 'musicListDetail', params: { id }
      })
    }
  },
  async created () {
    this.getBannerDate()
    this.getMusicList()
  }
}
</script>

<style lang="less" scoped>
  .recommendContainer {
    display: flex;
    justify-content: center;
  }
  .recommend {
    max-width: 1000px;
  }
  .carousel {
    width: 100%;
  }
  .el-carousel {
    margin: auto;
    width: 800px;
  }
  .el-carousel__item {
    border-radius: 10px;
  }

  .el-carousel__item img {
    height: 100%;
  }
  .recommendMusicList {
    color: #373737;
    cursor: pointer;
  }
  .recommendMusicList h3 {
    margin-left: 20px;
  }

</style>
