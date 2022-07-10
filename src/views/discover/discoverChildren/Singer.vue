<template>

  <div class="singerContainer">
    <div class="singer">
      <!-- 歌手分类选择 -->
      <div class="seletors">
        <div class="selectItem">
          <div class="title">语种：</div>
          <second-nav-bar
          :SecondNavBarData="languageSort"
          @clickSecondBarItem="areaItem"
          class="secondNavBar"></second-nav-bar>
        </div>
        <div class="selectItem">
          <div class="title">分类：</div>
            <second-nav-bar
            :SecondNavBarData="typeSort"
            @clickSecondBarItem="typeItem"
            class="secondNavBar"></second-nav-bar>
        </div>
        <div class="selectItem">
          <div class="title">筛选：</div>
            <second-nav-bar
            :SecondNavBarData="initialSort"
            @clickSecondBarItem="initialItem"
            class="secondNavBar"></second-nav-bar>
        </div>
      </div>

      <!-- 歌手列表 -->
      <div class="listCardContainer">
        <list-card
        :listCardData="singerList"
        @clickListCardItem="clickListCardItem"
        isLoad
        @bottomLoad="bottomLoad"
        ></list-card>
      </div>

    </div>
    <!-- 回到顶部组件---to do -->
  </div>
</template>

<script>
import ListCard from 'components/listCard/ListCard.vue'
import SecondNavBar from 'components/secondNavBar/SecondNavBar.vue'

export default {
  components: { ListCard, SecondNavBar },
  name: 'singer',
  data () {
    return {
      typeSort: [
        { type: -1, name: '全部' },
        { type: 1, name: '男歌手' },
        { type: 2, name: '女歌手' },
        { type: 3, name: '乐队' }
      ],
      languageSort: [
        { area: -1, name: '全部' },
        { area: 7, name: '华语' },
        { area: 96, name: '欧美' },
        { area: 8, name: '日本' },
        { area: 16, name: '韩国' },
        { area: 0, name: '其它' }
      ],
      initialSort: [
        { initial: -1, name: '热门' },
        { initial: 'a', name: 'A' },
        { initial: 'b', name: 'B' },
        { initial: 'c', name: 'C' },
        { initial: 'd', name: 'D' },
        { initial: 'e', name: 'E' },
        { initial: 'f', name: 'F' },
        { initial: 'g', name: 'G' },
        { initial: 'h', name: 'H' },
        { initial: 'i', name: 'I' },
        { initial: 'j', name: 'J' },
        { initial: 'k', name: 'K' },
        { initial: 'l', name: 'L' },
        { initial: 'm', name: 'M' },
        { initial: 'n', name: 'N' },
        { initial: 'o', name: 'O' },
        { initial: 'p', name: 'P' },
        { initial: 'q', name: 'Q' },
        { initial: 'r', name: 'R' },
        { initial: 's', name: 'S' },
        { initial: 't', name: 'T' },
        { initial: 'u', name: 'U' },
        { initial: 'v', name: 'V' },
        { initial: 'w', name: 'W' },
        { initial: 'x', name: 'X' },
        { initial: 'y', name: 'Y' },
        { initial: 'z', name: 'Z' },
        { initial: 0, name: '#' }
      ],
      area: -1,
      type: -1,
      initial: -1,
      // 当前所在页数
      currentPage: 1,
      singerList: [],
      // 是否还有更多数据
      isMore: false
    }
  },
  methods: {
    // 请求歌手列表
    async getSingerList () {
      const res = await this.$request('/artist/list', {
        type: this.type,
        area: this.area,
        initial: this.initial,
        offset: (this.currentPage - 1) * 30
      })
      console.log('请求歌手列表', res)
      this.singerList.push(...res.data.artists)
      this.isMore = res.data.more
    },
    // 语种事件回调
    areaItem (id) {
      this.area = this.languageSort[id].area
      // 先清空list 再请求数据
      this.singerList = []
      this.currentPage = 1
      this.getSingerList()
    },
    // 歌手类型事件回调
    typeItem (id) {
      this.type = this.typeSort[id].type
      // 先清空list 再请求数据
      this.singerList = []
      this.currentPage = 1
      this.getSingerList()
    },
    // 筛选事件回调
    initialItem (id) {
      this.initial = this.initialSort[id].initial
      // 先清空list 再请求数据
      this.singerList = []
      this.currentPage = 1
      this.getSingerList()
    },
    // 跳转到歌手详情页面
    clickListCardItem (id) {
      this.$router.push({
        name: 'singerDetail', params: { id }
      })
    },
    // 卡片上拉触底触发
    bottomLoad () {
      // console.log("bottomLoad");
      // 如果还有更多数据 则发送请求 将数据 push到数组
      if (this.isMore === true) {
        this.currentPage += 1
        this.getSingerList()
      }
    }
  },
  created () {
    this.getSingerList()
  }
}
</script>

<style lang="less" scoped>
  .singerContainer {
    display: flex;
    justify-content: center;
  }
  .singer {
    max-width: 1000px;
    padding: 0 10px;
  }
  .selectItem{
    display: flex;
    // align-items: center;
  }
  .title {
    font-size: 12px;
    width: 40px;
    line-height: 33px;
  }
  // 这一步解决了筛选对齐的问题
  .secondNavBar {
    width: calc(100% - 60px);
  }
  .listCardContainer {
    margin-left: -20px;
  }
</style>
