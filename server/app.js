const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')
const history = require('connect-history-api-fallback')
const NeteaseApi = require('NeteaseCloudMusicApi')

const app = express()
app.use(cors())
app.use(bodyParser.json())

// 配置静态文件服务和 History API fallback
const staticFileMiddleware = express.static(path.join(__dirname, 'dist'))
app.use(staticFileMiddleware)
app.use(history({
  disableDotRule: true,
  verbose: true
}))
app.use(staticFileMiddleware)

// ==================== 用户认证相关接口 ====================

// 手机号登录
app.get('/api/login/cellphone', async (req, res) => {
  try {
    console.log('登录请求参数:', req.query)
    const result = await NeteaseApi.login_cellphone(req.query)
    console.log('登录响应:', result.body)
    res.json(result.body)
  } catch (err) {
    console.error('登录接口错误:', err)
    res.status(500).json({
      error: err.message,
      details: err.stack,
      params: req.query
    })
  }
})

// 发送验证码
app.get('/api/captcha/sent', async (req, res) => {
  try {
    const result = await NeteaseApi.captcha_sent(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 验证验证码
app.get('/api/captcha/verify', async (req, res) => {
  try {
    const result = await NeteaseApi.captcha_verify(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 手机号注册
app.get('/api/register/cellphone', async (req, res) => {
  try {
    const result = await NeteaseApi.register_cellphone(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 首页推荐相关接口 ====================

// 轮播图
app.get('/api/banner', async (req, res) => {
  try {
    const result = await NeteaseApi.banner({ type: req.query.type || 0 })
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 推荐歌单
app.get('/api/personalized', async (req, res) => {
  try {
    const result = await NeteaseApi.personalized({ limit: req.query.limit || 10 })
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 每日推荐歌曲
app.get('/api/recommend/songs', async (req, res) => {
  try {
    const result = await NeteaseApi.recommend_songs({})
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 歌曲相关接口 ====================

// 获取歌曲URL
app.get('/api/song/url', async (req, res) => {
  try {
    const result = await NeteaseApi.song_url(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌曲详情
app.get('/api/song/detail', async (req, res) => {
  try {
    const result = await NeteaseApi.song_detail(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌词
app.get('/api/lyric', async (req, res) => {
  try {
    const result = await NeteaseApi.lyric(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 喜欢/取消喜欢歌曲
app.get('/api/like', async (req, res) => {
  try {
    const result = await NeteaseApi.like(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取喜欢音乐列表
app.get('/api/likelist', async (req, res) => {
  try {
    const result = await NeteaseApi.likelist(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 歌单相关接口 ====================

// 获取歌单详情
app.get('/api/playlist/detail', async (req, res) => {
  try {
    const result = await NeteaseApi.playlist_detail(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌单分类
app.get('/api/playlist/catlist', async (req, res) => {
  try {
    const result = await NeteaseApi.playlist_catlist({})
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取热门歌单
app.get('/api/playlist/hot', async (req, res) => {
  try {
    const result = await NeteaseApi.playlist_hot({})
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌单排行榜
app.get('/api/top/playlist', async (req, res) => {
  try {
    const result = await NeteaseApi.top_playlist(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取高质量歌单
app.get('/api/top/playlist/highquality', async (req, res) => {
  try {
    const result = await NeteaseApi.top_playlist_highquality(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 专辑相关接口 ====================

// 获取专辑详情
app.get('/api/album', async (req, res) => {
  try {
    const result = await NeteaseApi.album(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 收藏/取消收藏专辑
app.get('/api/album/sub', async (req, res) => {
  try {
    const result = await NeteaseApi.album_sub(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取已收藏专辑列表
app.get('/api/album/sublist', async (req, res) => {
  try {
    const result = await NeteaseApi.album_sublist(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 歌手相关接口 ====================

// 获取歌手详情
app.get('/api/artist/detail', async (req, res) => {
  try {
    const result = await NeteaseApi.artist_detail(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌手热门歌曲
app.get('/api/artist/top/song', async (req, res) => {
  try {
    const result = await NeteaseApi.artist_top_song(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌手MV
app.get('/api/artist/mv', async (req, res) => {
  try {
    const result = await NeteaseApi.artist_mv(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌手专辑
app.get('/api/artist/album', async (req, res) => {
  try {
    const result = await NeteaseApi.artist_album(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 排行榜相关接口 ====================

// 获取所有榜单
app.get('/api/toplist', async (req, res) => {
  try {
    const result = await NeteaseApi.toplist({})
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取榜单详情
app.get('/api/top/list', async (req, res) => {
  try {
    const result = await NeteaseApi.top_list(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 搜索相关接口 ====================

// 搜索建议
app.get('/api/search/suggest', async (req, res) => {
  try {
    const result = await NeteaseApi.search_suggest(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 搜索
app.get('/api/search', async (req, res) => {
  try {
    const result = await NeteaseApi.search(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 热搜详情
app.get('/api/search/hot/detail', async (req, res) => {
  try {
    const result = await NeteaseApi.search_hot_detail({})
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 评论相关接口 ====================

// 获取歌单评论
app.get('/api/comment/playlist', async (req, res) => {
  try {
    const result = await NeteaseApi.comment_playlist(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取专辑评论
app.get('/api/comment/album', async (req, res) => {
  try {
    const result = await NeteaseApi.comment_album(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取热门评论
app.get('/api/comment/hot', async (req, res) => {
  try {
    const result = await NeteaseApi.comment_hot(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 发表评论
app.get('/api/comment', async (req, res) => {
  try {
    const result = await NeteaseApi.comment(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 点赞评论
app.get('/api/comment/like', async (req, res) => {
  try {
    const result = await NeteaseApi.comment_like(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 视频相关接口 ====================

// 获取视频分类
app.get('/api/video/category/list', async (req, res) => {
  try {
    const result = await NeteaseApi.video_category_list(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取视频分组
app.get('/api/video/group', async (req, res) => {
  try {
    const result = await NeteaseApi.video_group(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取视频分组列表
app.get('/api/video/group/list', async (req, res) => {
  try {
    const result = await NeteaseApi.video_group_list({})
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 其他遗漏的接口 ====================

// 云搜索
app.get('/api/cloudsearch', async (req, res) => {
  try {
    const result = await NeteaseApi.cloudsearch(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 搜索多重匹配
app.get('/api/search/multimatch', async (req, res) => {
  try {
    const result = await NeteaseApi.search_multimatch(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌曲评论
app.get('/api/comment/music', async (req, res) => {
  try {
    const result = await NeteaseApi.comment_music(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取MV评论
app.get('/api/comment/mv', async (req, res) => {
  try {
    const result = await NeteaseApi.comment_mv(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取视频评论
app.get('/api/comment/video', async (req, res) => {
  try {
    const result = await NeteaseApi.comment_video(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取用户详情
app.get('/api/user/detail', async (req, res) => {
  try {
    const result = await NeteaseApi.user_detail(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取用户歌单
app.get('/api/user/playlist', async (req, res) => {
  try {
    const result = await NeteaseApi.user_playlist(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取用户关注列表
app.get('/api/user/follows', async (req, res) => {
  try {
    const result = await NeteaseApi.user_follows(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取用户粉丝列表
app.get('/api/user/followeds', async (req, res) => {
  try {
    const result = await NeteaseApi.user_followeds(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取用户账户信息
app.get('/api/user/account', async (req, res) => {
  try {
    const result = await NeteaseApi.user_account({})
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 退出登录
app.get('/api/logout', async (req, res) => {
  try {
    const result = await NeteaseApi.logout({})
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 检查手机号是否存在
app.get('/api/cellphone/existence/check', async (req, res) => {
  try {
    const result = await NeteaseApi.cellphone_existence_check(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌手列表
app.get('/api/artist/list', async (req, res) => {
  try {
    const result = await NeteaseApi.artist_list(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取MV列表
app.get('/api/mv/all', async (req, res) => {
  try {
    const result = await NeteaseApi.mv_all(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取MV详情
app.get('/api/mv/detail', async (req, res) => {
  try {
    const result = await NeteaseApi.mv_detail(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取MV URL
app.get('/api/mv/url', async (req, res) => {
  try {
    const result = await NeteaseApi.mv_url(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取视频详情
app.get('/api/video/detail', async (req, res) => {
  try {
    const result = await NeteaseApi.video_detail(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取视频URL
app.get('/api/video/url', async (req, res) => {
  try {
    const result = await NeteaseApi.video_url(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取相关视频
app.get('/api/related/allvideo', async (req, res) => {
  try {
    const result = await NeteaseApi.related_allvideo(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 资源点赞
app.get('/api/resource/like', async (req, res) => {
  try {
    const result = await NeteaseApi.resource_like(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取我喜欢的歌单
app.get('/api/playlist/mylike', async (req, res) => {
  try {
    const result = await NeteaseApi.playlist_mylike(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取MV收藏列表
app.get('/api/mv/sublist', async (req, res) => {
  try {
    const result = await NeteaseApi.mv_sublist(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 收藏/取消收藏歌手
app.get('/api/artist/sub', async (req, res) => {
  try {
    const result = await NeteaseApi.artist_sub(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌手收藏列表
app.get('/api/artist/sublist', async (req, res) => {
  try {
    const result = await NeteaseApi.artist_sublist(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取相似歌手
app.get('/api/simi/artist', async (req, res) => {
  try {
    const result = await NeteaseApi.simi_artist(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 收藏/取消收藏歌单
app.get('/api/playlist/subscribe', async (req, res) => {
  try {
    const result = await NeteaseApi.playlist_subscribe(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// 获取歌单收藏者
app.get('/api/playlist/subscribers', async (req, res) => {
  try {
    const result = await NeteaseApi.playlist_subscribers(req.query)
    res.json(result.body)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ==================== 错误处理中间件 ====================

app.use((err, req, res, next) => {
  console.error('服务器错误:', err)
  res.status(500).json({
    error: '服务器内部错误',
    message: err.message
  })
})

// ==================== 启动服务器 ====================

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log('🎵 网易云音乐API代理服务器已启动')
  console.log(`📍 服务地址: http://localhost:${PORT}`)
  console.log('📡 API前缀: /api')
  console.log(`⏰ 启动时间: ${new Date().toLocaleString()}`)
  console.log('='.repeat(50))
})
