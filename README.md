# Imitation-Netease-Cloud-Music

该项目主要实现了网易云页面基本功能，比如个性推荐，视频展示，歌手界面显示，搜索歌曲，播放音乐和下载音乐等等。后端接口文档由公开项目[网易云音乐 NodeJS 版 API (neteasecloudmusicapi.vercel.app)](https://neteasecloudmusicapi.vercel.app/#/)提供，十分感谢!

项目在线体验地址：http://test.dewenking.top/

#### 技术栈

----

##### 前端

* Vue + Vuex + Vue-Router (核心框架)
* ElementUI (用于页面搭建)
* Axios (请求)
* babel-plugin-syntax-dynamic-import (用于路由分组按需懒加载)
* nprogress (用于加载过渡)

##### 服务器端

* Node.js (JavaScript运行环境)
* Express (Web框架)
* Nginx (反向代理服务器)
* pm2 (用于后台脚本常驻)
* nrm (快速切换npm镜像)

#### 功能分析与设计

---

1.  **实现功能：**个性推荐，排行榜展示，视频\MV展示，收藏详情，每日推荐，搜索歌曲\歌手\专辑\歌单，歌手详情，专辑详情，歌单详情，用户详情，播放音乐和下载音乐等等。
2.  **组件复用：**  音乐播放器的目的就是播放音乐，其中承载音乐的载体无非是由歌单、专辑、歌手这几块组成。基于网易云音乐APP分析，我们发现：
   				* 歌单页面、排行榜中的全球榜、首页中歌手
   				* 
3. 

2、组件复用 ----观察页面

3、数据过多---分页，无限滚动，

4、音乐下载 ---待定

#### 项目启动

---

1. 克隆项目于本地

   ```
   git clone git@github.com:Dewenkings/Imitation-Netease-Cloud-Music.git
   ```

2. 安装依赖包

   ```
   npm i
   ```

3.  项目运行

   ```
   npm run serve
   ```

发现音乐

<img src=".\src\assets\img\MusicPageShow\discover-recommend.PNG" alt="discover-recommend" style="zoom:33%;" />

视频展示

<img src=".\src\assets\img\MusicPageShow\video-video.PNG" alt="video-video" style="zoom:33%;" />

歌手展示

<img src=".\src\assets\img\MusicPageShow\singer.PNG" alt="singer" style="zoom:33%;" />

搜索页面

<img src=".\src\assets\img\MusicPageShow\search.PNG" alt="search" style="zoom:33%;" />
