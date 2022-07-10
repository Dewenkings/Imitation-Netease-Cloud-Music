<template>
  <div class="mvList">
    <!-- 视频navbar -->
    <div class="mvListNavBar">
      <div class="selectorItem">
        <div class="title">地区：</div>
        <second-nav-bar
          :SecondNavBarData="areaList"
          @clickSecondBarItem="areaItem"
          class="secondNavBar"
          :itemWidth="50"
        ></second-nav-bar>
      </div>
    </div>
    <div class="selectorItem">
      <div class="title">类型：</div>
      <second-nav-bar
        :SecondNavBarData="typeList"
        @clickSecondBarItem="typeItem"
        class="secondNavBar"
        :itemWidth="50"
      ></second-nav-bar>
    </div>
    <div class="selectorItem">
      <div class="title">排序：</div>
      <second-nav-bar
        :SecondNavBarData="orderList"
        @clickSecondBarItem="orderItem"
        class="secondNavBar"
        :itemWidth="50"
      ></second-nav-bar>
    </div>
    <!-- 视频卡片 -->
    <video-list-card
    class="cardList"
    :videoList="mvList"
    :videoType="'mv'"
    :isLoad="true"
    @clickListCardItem="goToMvDetail"
    @bottomLoad="bottomLoad"
    >

    </video-list-card>
  </div>
</template>

<script>
import SecondNavBar from 'components/secondNavBar/SecondNavBar.vue'
import VideoListCard from 'components/videoListCard/VideoListCard.vue'
export default {
  components: { SecondNavBar, VideoListCard },
  name: 'MvList',
  data () {
    return {
      // mv 地区
      areaList: [
        { name: '全部', path: '' },
        { name: '内地', path: '内地' },
        { name: '港台', path: '港台' },
        { name: '欧美', path: '欧美' },
        { name: '日本', path: '日本' },
        { name: '韩国', path: '韩国' }
      ],
      // mv 类型
      typeList: [
        { name: '全部', path: '' },
        { name: '官方版', path: '官方版' },
        { name: '现场版', path: '现场版' },
        { name: '网易出品', path: '网易出品' }
      ],
      // 排序
      orderList: [
        { name: '上升最快', path: '' },
        { name: '最热', path: '最热' },
        { name: '最新', path: '最新' }
      ],
      // 当前地区
      area: '',
      // 当前类型
      type: '',
      // 当前排序
      order: '',
      // 当前视频页数
      mvPage: 1,
      // 是否还有更多视频数据
      hasMore: false,
      // 视频列表数据
      mvList: []
    }
  },
  methods: {
    // 请求
    // 请求视频分类
    // 获取全部mv
    async getMvList () {
      const res = await this.$request('/mv/all', {
        area: this.area,
        type: this.type,
        order: this.order,
        offset: 30 * (this.mvPage - 1)
      })
      console.log('全部mv:', res)
      this.hasMore = res.data.hasMore
      this.mvList.push(...res.data.data)
    },
    // 点击事件
    areaItem (index) {
      this.area = this.areaList[index].path
      this.mvList = []
      this.mvPage = 1
      this.getMvList()
    },
    typeItem (index) {
      this.type = this.typeList[index].path
      this.mvList = []
      this.mvPage = 1
      this.getMvList()
    },
    orderItem (index) {
      this.order = this.orderList[index].path
      this.mvList = []
      this.mvPage = 1
      this.getMvList()
    },
    // 进入视频详情页面
    goToMvDetail ({ id }) {
      console.log(id)
      this.$router.push({
        name: 'videoDetail',
        params: { id, type: 'mv' }
      })
    },
    // 上拉触底的回调-----增加页数，就是offset更新
    bottomLoad () {
      // console.log("goToVideoDetail");
      if (this.hasMore) {
        this.mvPage += 1
        this.getMvList()
      }
    }
  },
  created () {
    this.getMvList()
  }
}
</script>

<style lang="less" scoped>
  .mvList {
    margin: -10px 0;
  }
  .selectorItem {
    display: flex;
    margin: 0 0 0 25px;
  }
  .title {
    font-size: 12px;
    width: 40px;
    line-height: 33px;
  }
  .secondNavBar {
    width: calc(100% - 60px);
  }
  .musicListNavBar {
    padding: 0px 25px;
    transform: translateY(-10px);
  }
  .page {
    width: 100%;
    text-align: center;
    padding-bottom: 20px;
  }
  // 使页面y轴可以上下滚动
  .cardList {
    overflow-y: scroll;
    /* height: calc(100vh - 265px); */
    height: calc(80vh + 265px);
  }
</style>
