# Imitation-Netease-Cloud-Music

该项目主要实现了网易云页面基本功能，比如个性推荐，视频展示，歌手界面显示，搜索歌曲，播放音乐和下载音乐等等。后端接口文档由公开项目[[NeteaseCloudMusicApi](https://neteasecloudmusicapi.js.org/#/?id=neteasecloudmusicapi)](https://neteasecloudmusicapi.vercel.app/#/) 提供，十分感谢!

项目在线体验地址：http://lucky.dewenking.top/

**tip：**  当时写的时候没有考虑pc尺寸问题，若是大屏，可能需要调节下页面比例缩放。

### 技术栈

----

#### 前端

* Vue + Vuex + Vue-Router (核心框架)
* ElementUI (用于页面搭建)
* Axios (请求)
* babel-plugin-syntax-dynamic-import (用于路由分组按需懒加载)
* nprogress (用于加载过渡)

#### 服务器端

* Node.js (JavaScript运行环境)
* Express (Web框架)
* Nginx (反向代理服务器)
* pm2 (用于后台脚本常驻)
* nrm (快速切换npm镜像)

### 功能分析与设计

---

1.  **实现功能：** 个性推荐，排行榜展示，视频\MV展示，收藏详情，每日推荐，搜索歌曲\歌手\专辑\歌单，歌手详情，专辑详情，歌单详情，用户详情，播放音乐和下载音乐等等。
2.  **组件复用：**  音乐播放器的目的就是播放音乐，其中承载音乐的载体无非是由歌单、专辑、歌手这几块组成。基于网易云音乐APP分析，我们发现：
      * 歌单页面、排行榜中的全球榜、首页中的歌手页面等等采用上下结构：上面为封面图，下面为图的描述；构建ListCard组件，减少同样结构的代码重复编写。
      * 歌单详情页面、专辑详情页面等采用左右结构：左边为歌单或专辑封面，右边为在该专辑\歌单下的歌曲信息；创建了ListTable组件，后续相应页面直接进行调用。
      * 视频、MV等页面与歌单页面等类似，都是上下结构，区别在于封面图还展示了播放量与时长；单独创建VideoListCard组件，采用解耦设计，满足不同功能不同组件展示，方便后续维护修改。
      * 网易云音乐没有回到顶部功能，由于首页歌单、歌手等多个页面内容较多，往下加载较多内容时再回到顶部比较麻烦；创建了GoTop组件，加载内容较多的页面直接复用该组件，实现一键回到顶部功能。
3.  **数据加载：** 数据量大的由后端设计分页接口，数据加载采用如下两种方式：一种是直接使用Pagination组件进行分页获取数据，可见首页歌单页面；另外一种是通过Infinite Scroll组件进行滚动加载，可见首页歌手页面。
4.  **搜索功能：** 搜索主要由热搜榜与手动输入查找信息组成：点击热搜榜内容，会跳转到单曲子页面下，歌手\专辑\视频\歌单等导航栏供用户选择；手动输入进行搜索时，会进行搜索推荐，即单曲\歌手\专辑\歌单等内容展示，其中点击单曲将直接进行播放。通过防抖优化搜索，减轻服务器压力。
5.  **首屏优化：** 
    * **路由懒加载：** 通过syntax-dynamic-import插件对路由分组按需懒加载，减少请求次数。
    * **CDN引入：** 通过UI面板查看打包文件体积大小，将ElementUI、Vue与Vuex等依赖项通过CDN方式引入，减轻打包体积。
    * **图片压缩：** 将静态资源registered (860KB)、topSongsLogo (268KB)这两张图压缩成仅10几KB大小，节省流量，提升加载速度。
    * **开启gzip：**  前端开启gzip，将大于10KB的js、css文件进行压缩；nginx也进行gzip配置，明显地提高了首屏加载速度。
    
    总的来说，首屏加载速度由之前的十几秒左右变成4秒左右有很大的提升，不过4秒还是蛮久的，后续看看如何继续进行优化。

### 项目启动

---

1. 克隆项目于本地

   ```
   git clone git@github.com:Dewenkings/Imitation-Netease-Cloud-Music.git
   ```

2. 安装依赖包

   ```
   npm i
   ```

3. 项目运行 

   ```
   npm run serve
   ```

### 项目效果图

---

#### 首页

<img src=".\src\assets\img\MusicPageShow\discover-recommend.PNG" alt="discover-recommend" style="zoom:50%;" />

#### 视频展示

<img src=".\src\assets\img\MusicPageShow\video-video.PNG" alt="video-video" style="zoom:50%;" />

#### 歌手展示

<img src=".\src\assets\img\MusicPageShow\singer.PNG" alt="singer" style="zoom:50%;" />

#### 搜索页面

<img src=".\src\assets\img\MusicPageShow\search.PNG" alt="search" style="zoom:50%;" />
