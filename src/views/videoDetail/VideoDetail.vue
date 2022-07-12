<template>
  <div class="videoDetail" v-if="videoUrl">
    <div class="left">
      <!-- 详情展示 -->
      <div class="title">
        {{$route.params.type=="mv" ?  "MV详情" : "视频详情"}}
      </div>
      <div class="videoShow">
        <video :src="videoUrl"
        controls
        width="496px"
        height="284px"
        @play="playVideo"
        :poster="
          $route.params.type == 'mv' ? videoInfo.cover : videoInfo.coverUrl
        ">
        </video>
      </div>
      <!-- 视频详情信息 -->
      <div
        class="videoInfo"
        v-if="$route.params.type == 'mv' ? videoInfo.cover : videoInfo.coverUrl">
        <div class="user">
          <div class="avatar" @click="goToPersonal()">
            <img :src="$route.params.type == 'mv' ? videoInfo.artists[0].img1v1Url : videoInfo.creator.avatarUrl" alt="">
          </div>
          <div class="userName" @click="goToPersonal()">
            {{ $route.params.type == 'mv' ? videoInfo.artists[0].name : videoInfo.creator.nickname }}
          </div>
        </div>
        <div class="videoTitle">{{$route.params.type == "mv" ? videoInfo.name : videoInfo.title}}</div>
        <div class="otherInfo">
          <div>
            发布：{{$route.params.type == "mv"
                ? videoInfo.publishTime
                : videoInfo.publishTime | showDate}}
          </div>
          <div>
            播放：{{($route.params.type == "mv"
                ? videoInfo.playCount
                : videoInfo.playTime) | handleNum}}
          </div>
        </div>
        <div class="buttons">
          <div class="buttonItem">
            <!-- 三元表达式绑定样式 -->
            <i class="iconfont icon-good" :class="isLike ? 'red' : ''"></i>
            <!-- 需要根据用户的返回信息决定 -->
            <!-- <span>赞</span> -->
            {{isLike ? '已赞' : '赞'}}
          </div>
          <div class="buttonItem">
            <i class="iconfont icon-xihuan" :class="isSub ? 'red' : ''"></i>
            <!-- <span>收藏</span> -->
            {{isSub ? '已收藏' : '收藏'}}
          </div>
          <div class="buttonItem">
            <i class="iconfont icon-zhuanfa"></i>
            <span>分享</span>
          </div>
        </div>
      </div>
      <!-- 评论区 -->
      <div class="comment">
        <div class="title commentTitle">评论</div>
        <div class="commentList" v-loading="isCommentLoading">
          <!-- 精彩评论 -->
          <comment
            :comments="comments.hotComments"
            v-if="comments.hotComments"
            :commentType="$route.params.type == 'mv' ? 'mv' : 'video'"
            :commentId="$route.params.id + ''"
            @getComment="
              $route.params.type == 'mv' ? getMvComment() : getVideoComment()
            "
            @scrollToComment="scrollToComment"
            ref="hotComments"
            ><div slot="title">精彩评论</div></comment
          >
          <!-- 最新评论 -->
          <comment
            :comments="comments.comments"
            :commentType="$route.params.type == 'mv' ? 'mv' : 'video'"
            :commentId="$route.params.id + ''"
            :isHotComment="comments.hotComments ? false : true"
            @getComment="
              $route.params.type == 'mv' ? getMvComment() : getVideoComment()
            "
            @scrollToComment="scrollToComment"
            @transToHotComment="
              (info) =>
                $refs.hotComments.floorComment(info.commentId, info.nickName)
            "
            ><div slot="title">最新评论</div></comment
          >
        </div>
        <!-- 分页 -->
      </div>
    </div>
    <!-- 推荐视频 -->
    <div class="right">
      <div class="title">相关推荐</div>
      <div
      class="relatedVideoItem"
      v-for="(item, index) in relatedVideo"
      :key="index"
      @click="goToRelatedVideo(item.vid)">
        <div class="relatedVideoItemCover">
          <img :src="item.coverUrl + '?param=300y180'" alt="">
          <div class="relatedVideoItemPlayCount">
            <i class="iconfont icon-shipin"></i> {{ item.playTime | handleNum }}
          </div>
          <div class="relatedVideoItemTime">
            {{ item.durationms | handleMusicTime }}
          </div>
        </div>
        <div class="relatedVideoItemInfo">
          <div class="relatedVideoItemTitle">{{ item.title }}</div>
          <div class="creator">by {{ item.creator[0].userName }}</div>
        </div>
      </div>
    </div>
    <!-- 返回顶部 -- to do -->
    <go-top scrollObj=".videoDetail"></go-top>
  </div>
</template>

<script>
import { handleNum, handleMusicTime, formatDate } from 'plugins/util.js'
import Comment from 'components/comment/Comment.vue'
import GoTop from 'components/goTop/GoTop.vue'

export default {
  components: { Comment, GoTop },
  name: 'videoDetail',
  data () {
    return {
      videoInfo: {},
      videoUrl: '',
      // 相关视频数据
      relatedVideo: [],
      // 评论
      comments: {},
      // 评论页数
      commentsPage: 1,
      // 用户是否收藏该视频
      isSub: false,
      // 是否正在加载评论
      isCommentLoading: false,
      // 用户是否喜欢该视频
      isLike: false
    }
  },
  methods: {
    // 请求推荐视频
    async getRelatedVideo () {
      const res = await this.$request('/related/allvideo', {
        id: this.$route.params.id
      })
      console.log('推荐的视频:', res)
      this.relatedVideo = res.data.data
    },
    // 获取视频详情
    async getVideoDetail () {
      const res = await this.$request('/video/detail', {
        id: this.$route.params.id
      })
      console.log('视频详情：', res)
      this.videoInfo = res.data.data
    },
    // 获取视频播放地址
    async getVideoUrl () {
      const res = await this.$request('/video/url', {
        id: this.$route.params.id
      })
      console.log('视频播放地址：', res)
      this.videoUrl = res.data.urls[0].url
    },
    // 获取MV详情
    async getMvDetail () {
      const res = await this.$request('/mv/detail', {
        mvid: this.$route.params.id
      })
      console.log('MV详情：', res)
      this.videoInfo = res.data.data
    },
    // 获取MV播放地址
    async getMvUrl () {
      const res = await this.$request('/mv/url', {
        id: this.$route.params.id
      })
      console.log('MV播放地址：', res)
      this.videoUrl = res.data.data.url
    },
    // 获取mv评论数据
    async getMvComment () {
      // 获取时间戳
      var timestamp = Date.parse(new Date())
      this.isCommentLoading = true
      const res = await this.$request('/comment/mv', {
        id: this.$route.params.id,
        offset: 20 * (this.commentsPage - 1),
        timestamp
      })
      if (res.data.code !== 200) {
        this.$message.error('获取评论失败,请稍后重试!')
        return
      }
      console.log('mv评论：', res)
    },
    // 滚动到输入框
    scrollToComment () {
      const videoDetail = document.querySelector('.videoDetail')
      const commentTitle = document.querySelector('.commentTitle')
      // console.log([commentTitle]);
      videoDetail.scrollTo({
        behavior: 'smooth',
        top: commentTitle.offsetTop - 70
      })
    },
    // 获取视频评论
    async getVideoComment (type) {
      // 获取时间戳
      var timestamp = Date.parse(new Date())
      this.isCommentLoading = true

      // 清空最新评论数据
      // this.comments.comments = [];

      if (type === 'changePage') {
        const videoDetail = document.querySelector('.videoDetail')
        const commentTitle = document.querySelector('.commentTitle')
        // console.log([commentTitle]);
        videoDetail.scrollTo({
          behavior: 'smooth',
          top: commentTitle.offsetTop - 70
        })
      }

      const res = await this.$request('/comment/video', {
        id: this.$route.params.id,
        offset: 20 * (this.commentsPage - 1),
        timestamp
      })

      this.isCommentLoading = false
      //   console.log(res);
      if (res.data.code !== 200) {
        this.$message.error('获取评论失败,请稍后重试!')
        return
      }
      this.comments = res.data
    },
    // 监听video播放的事件
    playVideo () {
      this.$store.commit('changePlayState', false)
    },
    // 点击跳转至personal页面的回调
    goToPersonal () {
      const uid =
        this.$route.params.type === 'mv'
          ? this.videoInfo.artists[0].id
          : this.videoInfo.creator.userId
      if (this.$route.params.type === 'mv') {
        this.$router.push({ name: 'singerDetail', params: { id: uid } })
      } else {
        this.$router.push({ name: 'personal', params: { uid } })
      }
    },
    goToRelatedVideo (id) {
      this.$router.push({
        name: 'videoDetail', params: { id: id, type: 'video' }
      })
    },
    // 判断用户是否收藏了该视频
    getIsSub () {
      console.log(this.isSub)
      this.isSub = this.$store.state.subVideoList.find(
        (item) => item.vid === this.$route.params.id
      )
    },
    // 判断用户是否喜欢了该视频
    getIsLike () {
      if (this.$route.params.type === 'mv') {
        this.isLike = this.$store.state.likeVideoList.find(
          (item) => item.mlogBaseData.id === this.$route.params.id
        )
      } else {
        // 因为请求的喜欢列表中的视频id是mlogid 要获取vid还需要另外单独请求  这里我直接对比标题和时长 若都对的上则认定为是同一个视频
        this.isLike = this.$store.state.likeVideoList.find(
          (item) =>
            item.mlogBaseData.desc === this.videoInfo.description &&
            item.mlogBaseData.dration === this.videoInfo.durationms
        )
      }
    },
    // 用户点击了点赞按钮的回调
    async likeVideo () {
      this.isLike = !this.isLike
      var timestamp = Date.parse(new Date())
      const type = this.$route.params.type === 'mv' ? 1 : 5
      // 请求
      const res = await this.$request('/resource/like', {
        type,
        id: this.$route.params.id,
        t: this.isLike ? 1 : 0,
        timestamp
      })
      console.log(res)
      this.getLikeVideoList()
    },
    // 请求用户喜欢的视频列表
    async getLikeVideoList () {
      const timestamp = Date.parse(new Date())
      const res = await this.$request('/playlist/mylike', {
        limit: 1000,
        timestamp
      })
      console.log(res)
      if (res.data.code !== 200) {
        this.$message.error('获取用户点赞视频失败,请稍后重试!')
        return
      }
      this.$store.commit('updateLikeVideoList', res.data.data.feeds)
      console.log('请求了用户喜欢的视频列表')
    },
    // 请求用户收藏的视频列表
    async getSubVideoList () {
      const timestamp = Date.parse(new Date())
      const res = await this.$request('/mv/sublist', { limit: 1000, timestamp })
      if (res.data.code !== 200) {
        this.$message.error('获取用户收藏视频失败,请稍后重试!')
        return
      }
      this.$store.commit('updateSubVideoList', res.data.data)
      console.log('请求了用户收藏的视频列表')
    }

  },
  async created () {
    // 获取相关推荐
    this.getRelatedVideo()
    // 判断请求参数是哪种类型，从而请求数据
    if (this.$route.params.type === 'mv') {
      await this.getMvDetail()
      this.getMvUrl()
      this.getMvComment()
    } else if (this.$route.params.type === 'video') {
      await this.getVideoDetail()
      this.getVideoUrl()
      this.getVideoComment()
    }
    if (this.$store.state.subVideoList == null) {
      await this.getSubVideoList()
    }
    this.getIsSub()
    if (this.$store.state.likeVideoList == null) {
      await this.getLikeVideoList()
    }
    this.getIsLike()
  },
  filters: {
    handleNum,
    handleMusicTime,
    showDate (value) {
      // 1、先将时间戳转成Date对象
      const date = new Date(value)

      // 2、将date进行格式化
      return formatDate(date, 'yyyy-MM-dd')
    }
  },
  watch: {

  }

}
</script>

<style lang="less" scoped>
  .left {
    width: 500px;
  }
  .videoDetail {
    display: flex;
    justify-content: center;
    // 关于超出页面
    // height: calc(80vh - 105px);
    overflow-y: scroll;
  }
  .title {
    margin: 10px 0;
    color: black;
    font-weight: 600;
  }
  // .videoShow {
  //   width: 500px;
  //   height: 500px;
  // }
  // video {
  //   width: 100%;
  // }
  .user {
    display: flex;
    align-items: center;
    margin: 10px 0;
  }
  .avatar {
    width: 40px;
    height: 40px;
    cursor: pointer;
  }
  .avatar img {
    border-radius: 50%;
    width: 100%;
  }
  .userName {
    font-size: 12px;
    margin-left: 10px;
    color: rgb(36, 36, 36);
    cursor: pointer;
  }
  .videoTitle {
    font-size: 20px;
    font-weight: bold;
    color: #1b1b1b;
    margin: 20px 0 10px;
  }
  .otherInfo {
    display: flex;
    justify-items: center;
    font-size: 12px;
    color: #aaa;
  }
  .otherInfo div {
    margin-right: 20px;
    transform: scale(0.9) translateX(-5%);
  }
  .buttons {
    display: flex;
    justify-items: center;
    margin: 20px 0;
  }
  .buttonItem {
    padding: 5px 20px;
    border: 1px solid rgb(228, 215, 219);
    border-radius: 50px;
    margin-right: 10px;
    font-size: 12px;
  }
  .buttonItem i {
    font-size: 12px;
    margin-right: 3px;
  }

  // 右边相关推荐
  .right {
    margin-left: 20px;
  }
  // .relatedVideoItemCover {
  //   display: flex;
  // }
  .relatedVideoItem {
  display: flex;
  margin-bottom: 5px;
  cursor: pointer;
}

.relatedVideoItemCover {
  position: relative;
  margin-right: 10px;
}

.relatedVideoItemCover img {
  width: 150px;
  height: 90px;
  border-radius: 10px;
}
.relatedVideoItemPlayCount {
  position: absolute;
  top: 0;
  right: 5px;
  font-size: 12px;
  color: white;
  transform: scale(0.9);
}
.relatedVideoItemTime {
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  color: white;
  transform: scale(0.9);
}
.relatedVideoItemInfo {
  font-size: 12px;
  color: rgb(31, 30, 30);
  margin: 12px 0;
  width: 140px;
}
.relatedVideoItemTitle {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

</style>
