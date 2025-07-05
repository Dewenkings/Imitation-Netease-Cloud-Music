# 网易云音乐API代理服务器接口文档

## 服务器信息
- **服务地址**: http://localhost:3001
- **API前缀**: /api
- **启动命令**: `node app.js`

## 接口分类

### 🔐 用户认证相关接口

#### 1. 手机号登录
- **路径**: `GET /api/login/cellphone`
- **参数**: 
  - `phone`: 手机号
  - `password`: 密码
  - `countrycode`: 国家代码（可选）
- **示例**: `/api/login/cellphone?phone=13800138000&password=123456`

#### 2. 发送验证码
- **路径**: `GET /api/captcha/sent`
- **参数**:
  - `phone`: 手机号
  - `ctcode`: 国家代码（可选）
- **示例**: `/api/captcha/sent?phone=13800138000`

#### 3. 验证验证码
- **路径**: `GET /api/captcha/verify`
- **参数**:
  - `phone`: 手机号
  - `captcha`: 验证码
  - `ctcode`: 国家代码（可选）
- **示例**: `/api/captcha/verify?phone=13800138000&captcha=1234`

#### 4. 手机号注册
- **路径**: `GET /api/register/cellphone`
- **参数**:
  - `phone`: 手机号
  - `password`: 密码
  - `nickname`: 昵称
  - `captcha`: 验证码
- **示例**: `/api/register/cellphone?phone=13800138000&password=123456&nickname=测试用户&captcha=1234`

### 🏠 首页推荐相关接口

#### 5. 轮播图
- **路径**: `GET /api/banner`
- **参数**:
  - `type`: 轮播图类型（0: PC, 1: Android, 2: iPhone, 3: iPad）
- **示例**: `/api/banner?type=0`

#### 6. 推荐歌单
- **路径**: `GET /api/personalized`
- **参数**:
  - `limit`: 返回数量（默认10）
- **示例**: `/api/personalized?limit=10`

#### 7. 每日推荐歌曲
- **路径**: `GET /api/recommend/songs`
- **参数**: 无
- **示例**: `/api/recommend/songs`

### 🎵 歌曲相关接口

#### 8. 获取歌曲URL
- **路径**: `GET /api/song/url`
- **参数**:
  - `id`: 歌曲ID
  - `br`: 比特率（可选）
- **示例**: `/api/song/url?id=123456`

#### 9. 获取歌曲详情
- **路径**: `GET /api/song/detail`
- **参数**:
  - `ids`: 歌曲ID，多个用逗号分隔
- **示例**: `/api/song/detail?ids=123456,789012`

#### 10. 获取歌词
- **路径**: `GET /api/lyric`
- **参数**:
  - `id`: 歌曲ID
- **示例**: `/api/lyric?id=123456`

#### 11. 喜欢/取消喜欢歌曲
- **路径**: `GET /api/like`
- **参数**:
  - `id`: 歌曲ID
  - `like`: 是否喜欢（true/false）
- **示例**: `/api/like?id=123456&like=true`

#### 12. 获取喜欢音乐列表
- **路径**: `GET /api/likelist`
- **参数**:
  - `uid`: 用户ID
- **示例**: `/api/likelist?uid=123456`

### 📋 歌单相关接口

#### 13. 获取歌单详情
- **路径**: `GET /api/playlist/detail`
- **参数**:
  - `id`: 歌单ID
  - `s`: 歌单最近的 s 个收藏者（可选）
- **示例**: `/api/playlist/detail?id=123456`

#### 14. 获取歌单分类
- **路径**: `GET /api/playlist/catlist`
- **参数**: 无
- **示例**: `/api/playlist/catlist`

#### 15. 获取热门歌单
- **路径**: `GET /api/playlist/hot`
- **参数**: 无
- **示例**: `/api/playlist/hot`

#### 16. 获取歌单排行榜
- **路径**: `GET /api/top/playlist`
- **参数**:
  - `cat`: 分类
  - `order`: 排序方式（hot/new）
  - `limit`: 返回数量
  - `offset`: 偏移量
- **示例**: `/api/top/playlist?cat=华语&order=hot&limit=20&offset=0`

#### 17. 获取高质量歌单
- **路径**: `GET /api/top/playlist/highquality`
- **参数**:
  - `cat`: 分类
  - `limit`: 返回数量
  - `before`: 分页参数
- **示例**: `/api/top/playlist/highquality?cat=华语&limit=1`

### 💿 专辑相关接口

#### 18. 获取专辑详情
- **路径**: `GET /api/album`
- **参数**:
  - `id`: 专辑ID
- **示例**: `/api/album?id=123456`

#### 19. 收藏/取消收藏专辑
- **路径**: `GET /api/album/sub`
- **参数**:
  - `id`: 专辑ID
  - `t`: 操作类型（1: 收藏, 0: 取消收藏）
- **示例**: `/api/album/sub?id=123456&t=1`

#### 20. 获取已收藏专辑列表
- **路径**: `GET /api/album/sublist`
- **参数**:
  - `limit`: 返回数量
  - `offset`: 偏移量
- **示例**: `/api/album/sublist?limit=20&offset=0`

### 👨‍🎤 歌手相关接口

#### 21. 获取歌手详情
- **路径**: `GET /api/artist/detail`
- **参数**:
  - `id`: 歌手ID
- **示例**: `/api/artist/detail?id=123456`

#### 22. 获取歌手热门歌曲
- **路径**: `GET /api/artist/top/song`
- **参数**:
  - `id`: 歌手ID
- **示例**: `/api/artist/top/song?id=123456`

#### 23. 获取歌手MV
- **路径**: `GET /api/artist/mv`
- **参数**:
  - `id`: 歌手ID
  - `limit`: 返回数量
  - `offset`: 偏移量
- **示例**: `/api/artist/mv?id=123456&limit=20&offset=0`

#### 24. 获取歌手专辑
- **路径**: `GET /api/artist/album`
- **参数**:
  - `id`: 歌手ID
  - `limit`: 返回数量
  - `offset`: 偏移量
- **示例**: `/api/artist/album?id=123456&limit=20&offset=0`

### 📊 排行榜相关接口

#### 25. 获取所有榜单
- **路径**: `GET /api/toplist`
- **参数**: 无
- **示例**: `/api/toplist`

#### 26. 获取榜单详情
- **路径**: `GET /api/top/list`
- **参数**:
  - `id`: 榜单ID
- **示例**: `/api/top/list?id=123456`

### 🔍 搜索相关接口

#### 27. 搜索建议
- **路径**: `GET /api/search/suggest`
- **参数**:
  - `keywords`: 搜索关键词
  - `type`: 搜索类型（mobile/web）
- **示例**: `/api/search/suggest?keywords=周杰伦`

#### 28. 搜索
- **路径**: `GET /api/search`
- **参数**:
  - `keywords`: 搜索关键词
  - `type`: 搜索类型
  - `limit`: 返回数量
  - `offset`: 偏移量
- **示例**: `/api/search?keywords=周杰伦&type=1&limit=20&offset=0`

#### 29. 热搜详情
- **路径**: `GET /api/search/hot/detail`
- **参数**: 无
- **示例**: `/api/search/hot/detail`

### 💬 评论相关接口

#### 30. 获取歌单评论
- **路径**: `GET /api/comment/playlist`
- **参数**:
  - `id`: 歌单ID
  - `limit`: 返回数量
  - `offset`: 偏移量
- **示例**: `/api/comment/playlist?id=123456&limit=50&offset=0`

#### 31. 获取专辑评论
- **路径**: `GET /api/comment/album`
- **参数**:
  - `id`: 专辑ID
  - `limit`: 返回数量
  - `offset`: 偏移量
- **示例**: `/api/comment/album?id=123456&limit=50&offset=0`

#### 32. 发表评论
- **路径**: `GET /api/comment`
- **参数**:
  - `t`: 操作类型（1: 发表, 0: 删除, 2: 回复）
  - `id`: 资源ID
  - `type`: 资源类型（0: 歌曲, 1: MV, 2: 歌单, 3: 专辑, 5: 视频）
  - `content`: 评论内容
- **示例**: `/api/comment?t=1&id=123456&type=0&content=很好听`

#### 33. 点赞评论
- **路径**: `GET /api/comment/like`
- **参数**:
  - `id`: 资源ID
  - `cid`: 评论ID
  - `t`: 操作类型（1: 点赞, 0: 取消点赞）
  - `type`: 资源类型
- **示例**: `/api/comment/like?id=123456&cid=789012&t=1&type=0`

### 🎬 视频相关接口

#### 34. 获取视频分类
- **路径**: `GET /api/video/category/list`
- **参数**:
  - `limit`: 返回数量
  - `offset`: 偏移量
- **示例**: `/api/video/category/list?limit=20&offset=0`

#### 35. 获取视频分组
- **路径**: `GET /api/video/group`
- **参数**:
  - `id`: 分组ID
  - `offset`: 偏移量
- **示例**: `/api/video/group?id=123456&offset=0`

#### 36. 获取视频分组列表
- **路径**: `GET /api/video/group/list`
- **参数**: 无
- **示例**: `/api/video/group/list`

## 使用说明

1. **启动服务**: 在 `server` 目录下运行 `node app.js`
2. **前端配置**: 确保前端的 `baseURL` 设置为 `http://localhost:3001/api`
3. **参数格式**: 所有参数都通过 URL 查询字符串传递
4. **响应格式**: 所有接口都返回 `result.body` 格式的数据

## 注意事项

- 所有接口都使用 GET 方法
- 参数名和值要与 NeteaseCloudMusicApi 保持一致
- 部分接口需要登录状态，请确保先调用登录接口
- 如果遇到错误，会返回 500 状态码和错误信息

## 测试示例

```bash
# 测试轮播图接口
curl "http://localhost:3001/api/banner?type=0"

# 测试推荐歌单接口
curl "http://localhost:3001/api/personalized?limit=5"

# 测试歌曲URL接口
curl "http://localhost:3001/api/song/url?id=123456"
``` 