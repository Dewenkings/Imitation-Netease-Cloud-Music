<template>
  <div class="FavoriteSingerContainer">
    <div class="FavoriteSinger" v-if="count != 0">
      <div v-if="count != 0">
        <div class="title">收藏的歌手({{ count }})</div>
        <list-card
          :listCardData="favoriteSingerList"
          @clickListCardItem="clickListCardItem"
        ></list-card>
      </div>
      <div v-else class="tip"><div>暂无收藏歌手</div></div>
    </div>

  </div>
</template>
<script>
import ListCard from 'components/listCard/ListCard.vue'
export default {
  components: { ListCard },
  name: 'favoriteSinger',
  data () {
    return {
      // 数目
      count: 0,
      // 专辑列表
      favoriteSingerList: {}
    }
  },
  methods: {
    async getFavoriteSingerList () {
      var timestamp = Date.parse(new Date())
      const res = await this.$request('/artist/sublist', {
        limit: 1000,
        timestamp
      })
      console.log(res)
      this.count = res.data.count
      this.favoriteSingerList = res.data.data
    },
    clickListCardItem (id) {
      this.$router.push({
        name: 'singerDetail', params: { id }
      })
    }
  },
  created () {
    this.getFavoriteSingerList()
  }
}
</script>

<style lang="less" scoped>
  .FavoriteSingerContainer {
  display: flex;
  justify-content: center;
  // padding: 0 25px;
  /* height: calc(100vh - 162px); */
  /* height: calc(80vh - 162px); */
}

.FavoriteSinger {
  max-width: 1000px;
}

.title {
  font-size: 12px;
  color: rgb(34, 34, 34);
  margin: 0px 0 10px;
  padding: 0 20px;
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
