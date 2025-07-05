# 网易云音乐API代理服务器

## 快速开始

1. **启动服务**
```bash
cd server
node app.js
```

2. **服务信息**
- 地址: http://localhost:3001
- API前缀: /api
- 状态: ✅ 已包含所有前端调用的接口

## 主要接口

### 用户认证
- `GET /api/login/cellphone` - 手机号登录
- `GET /api/captcha/verify` - 验证验证码
- `GET /api/register/cellphone` - 手机号注册

### 首页推荐
- `GET /api/banner` - 轮播图
- `GET /api/personalized` - 推荐歌单
- `GET /api/recommend/songs` - 每日推荐歌曲

### 歌曲相关
- `GET /api/song/url` - 获取歌曲URL
- `GET /api/song/detail` - 获取歌曲详情
- `GET /api/lyric` - 获取歌词
- `GET /api/like` - 喜欢/取消喜欢歌曲
- `GET /api/likelist` - 获取喜欢音乐列表

### 歌单相关
- `GET /api/playlist/detail` - 获取歌单详情
- `GET /api/playlist/catlist` - 获取歌单分类
- `GET /api/playlist/hot` - 获取热门歌单
- `GET /api/top/playlist` - 获取歌单排行榜
- `GET /api/top/playlist/highquality` - 获取高质量歌单

### 专辑相关
- `GET /api/album` - 获取专辑详情
- `GET /api/album/sub` - 收藏/取消收藏专辑
- `GET /api/album/sublist` - 获取已收藏专辑列表

### 歌手相关
- `GET /api/artist/detail` - 获取歌手详情
- `GET /api/artist/top/song` - 获取歌手热门歌曲
- `GET /api/artist/mv` - 获取歌手MV
- `GET /api/artist/album` - 获取歌手专辑

### 排行榜
- `GET /api/toplist` - 获取所有榜单
- `GET /api/top/list` - 获取榜单详情

### 搜索
- `GET /api/search/suggest` - 搜索建议
- `GET /api/search` - 搜索
- `GET /api/search/hot/detail` - 热搜详情

### 评论
- `GET /api/comment/playlist` - 获取歌单评论
- `GET /api/comment/album` - 获取专辑评论
- `GET /api/comment` - 发表评论
- `GET /api/comment/like` - 点赞评论

### 视频
- `GET /api/video/category/list` - 获取视频分类
- `GET /api/video/group` - 获取视频分组
- `GET /api/video/group/list` - 获取视频分组列表
- `GET /api/video/detail` - 获取视频详情
- `GET /api/video/url` - 获取视频URL
- `GET /api/related/allvideo` - 获取相关视频

### MV
- `GET /api/mv/all` - 获取MV列表
- `GET /api/mv/detail` - 获取MV详情
- `GET /api/mv/url` - 获取MV URL
- `GET /api/mv/sublist` - 获取MV收藏列表

### 用户相关
- `GET /api/user/detail` - 获取用户详情
- `GET /api/user/playlist` - 获取用户歌单
- `GET /api/user/follows` - 获取用户关注列表
- `GET /api/user/followeds` - 获取用户粉丝列表
- `GET /api/user/account` - 获取用户账户信息
- `GET /api/logout` - 退出登录

### 搜索
- `GET /api/cloudsearch` - 云搜索
- `GET /api/search/multimatch` - 搜索多重匹配

### 评论
- `GET /api/comment/music` - 获取歌曲评论
- `GET /api/comment/mv` - 获取MV评论
- `GET /api/comment/video` - 获取视频评论

### 收藏相关
- `GET /api/artist/sub` - 收藏/取消收藏歌手
- `GET /api/artist/sublist` - 获取歌手收藏列表
- `GET /api/playlist/subscribe` - 收藏/取消收藏歌单
- `GET /api/playlist/subscribers` - 获取歌单收藏者
- `GET /api/playlist/mylike` - 获取我喜欢的歌单

### 其他
- `GET /api/cellphone/existence/check` - 检查手机号是否存在
- `GET /api/artist/list` - 获取歌手列表
- `GET /api/simi/artist` - 获取相似歌手
- `GET /api/resource/like` - 资源点赞

## 测试

```bash
# 测试轮播图
curl "http://localhost:3001/api/banner?type=0"

# 测试推荐歌单
curl "http://localhost:3001/api/personalized?limit=5"
```

## 注意事项

- 所有接口都使用 GET 方法
- 参数通过 URL 查询字符串传递
- 响应格式为 `result.body`
- 确保前端 baseURL 设置为 `http://localhost:3001/api` 