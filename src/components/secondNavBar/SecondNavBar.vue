<template>
  <div class="navBar">
    <div class="barItem"
      v-for="(item, index) in SecondNavBarData"
      :class="index == activeItem ? 'active' : '' "
      :key="index"
      :style="itemWidth == 0 ? '' : 'width:' + itemWidth + 'px;'"
      @click="clickSecondBarItem(index)">
      {{item.name}}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeItem: 0
    }
  },
  props: {
    SecondNavBarData: {
      type: Array,
      default () {
        return []
      }
    },
    itemWidth: {
      type: Number,
      default () {
        return 40
      }
    },
    currentTag: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  methods: {
    // 点击数据就进行响应
    clickSecondBarItem (index) {
      // 如果跟点击的是一样的就不响应
      if (this.activeItem === index) {
        return
      }
      // 点击后就要进行索引更新
      this.activeItem = index
      // 将点击事件发射出去 供使用改组件接收事件使用
      this.$emit('clickSecondBarItem', index)
    }
  },
  watch: {
    currentTag (current) {
      this.activeItem = this.SecondNavBarData.findIndex(
        (item) => item.name === current.name
      )
    }
  }
}
</script>

<style lang="less" scoped>
  .navBar {
    display: flex;
    // align-items: center;
    flex-wrap: wrap;
  }
  .barItem {
    margin: 4px -2px;
    padding: 6px 10px;
    font-size: 12px;
    /* width: 40px; */
    text-align: center;
    box-sizing: content-box;
    transform: scale(0.9, 0.9);
    cursor: pointer;
  }
  .active {
    background-color: #fdf5f5;
    color: #ec4747;
    border-radius: 11px;
  }
</style>
