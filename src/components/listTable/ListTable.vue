<template>
  <div class="listTable">
    <!-- 先是左边的图像 -->
    <div class="listCover">
      <!-- 三元表达式进行查看传入的是否存在封面
        点击专辑页面跳转专辑详情页面中 -->
      <img :src="officialListDetailItem.coverImgUrl || cover"
        alt=""
        @click="clickCheckAll(officialListDetailItem.id)"
        >
    </div>
    <!-- 专辑歌曲列表的展示 -->
    <div class="listContainer">
      <slot name="header"></slot>
      <table>
        <tr
          class="listRows"
          v-for="(item, index) in (officialListDetailItem.tracks &&
              officialListDetailItem.tracks.slice(0, 5)) || (officialListDetailItem.topSongs &&
              (officialListDetailItem.isOpen
                ? officialListDetailItem.topSongs
                : officialListDetailItem.topSongs.slice(0, 10))) || officialListDetailItem.songs.slice(0, 10)" :key="index"
              @dblclick="handleRowDbClick(officialListDetailItem.id || item.id, index)"
            >
          <td class="index">{{ index + 1 }}</td>
          <td class="musicName">{{item.name}}</td>
          <td class="musicTime">{{item.dt}}</td>
          <td class="singer">{{ item.ar[0].name }}</td>
        </tr>
      </table>

      <!-- 对于专辑小于10首的,就无需进行跳转 -->
      <div
        class="checkAll"
        @click="clickCheckAll(officialListDetailItem.id)"
        v-show="isCheckAllShow"
      >
        查看全部 <i class="iconfont icon-arrow-right-bold"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListTable',
  props: {
    officialListDetailItem: {
      type: Object,
      default () {
        return {}
      }
    },
    // 传过来的封面
    cover: {
      type: String,
      default () {
        return ''
      }
    },
    // 传过来的listId
    listId: {
      type: String,
      default () {
        return ''
      }
    },
    // 是否显示查看全部按钮
    isCheckAllShow: {
      type: Boolean,
      default () {
        return true
      }
    }
  },
  data () {
    return {}
  },
  methods: {
    // 双击播放歌曲
    handleRowDbClick (id, index) {
      const listId = this.listId
      this.$emit('handleRowDbClick', { id, index, listId })
    },
    // 点击查看全部的回调
    // 这里传来的id是用于Ranking的
    clickCheckAll (id) {
      const listId = this.listId
      this.$emit('clickCheckAll', { id, listId })
    }
  }
}
</script>

<style lang="less" scoped>
  .listTable {
    display: flex;
    // width: 470px;
    margin: 20px 0 50px 0;
  }
  .listCover {
    width: 150px;
    height: 150px;
    margin-left: 20px;
    cursor: pointer;
  }
  .listCover img {
    width: 100%;
    border-radius: 10px;
  }
  .listContainer {
    width: 100%;
    // width: calc(100% -200px);
    margin-left: 30px;
  }
  table {
    width: 95%;
    border-collapse: collapse;
    border-radius: 5px;
    // 新加的
    overflow: hidden;
  }

  .listRows {
    height: 30px;
    font-size: 12px;
    color: rgb(153, 153, 153);
    width: 100%;
    display: flex;
    align-items: center;
    position: relative;
  }
  .listRows:nth-child(odd) {
    background-color: #f9f9f9;
  }
  .listRows:hover {
    background-color: #f4f4f4;
  }

  .index {
    text-align: center;
    line-height: 28px;
    width: 30px;
  }
  .listRows .musicName {
    color: rgb(31, 31, 31);
    transform: translate(-5%, -5%) scale(0.9);
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 80%;
  }
  .singer {
    text-align: right;
    position: absolute;
    right: 60px;
  }
  .musicTime {
    transform: scale(0.9);
    text-align: right;
    position: absolute;
    right: 10px;
  }

  .checkAll {
    color: rgb(134,134,134);
    font-size: 12px;
    transform: scale(0.9) translateX(-5%);
    width: 100px;
    height: 30px;
    line-height: 30px;
    cursor: pointer;
    // 加了这个就出错了，出现两条滚动条
    // position: absolute;
    right: 0px;
  }
</style>
