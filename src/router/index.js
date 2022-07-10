import Vue from 'vue'
import VueRouter from 'vue-router'

// 跳转到首页
import Index from '../components/Index.vue'
const Discover = () => import('views/discover/Discover.vue')
// 对于原始路径重复点击出现的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

// 首页-发现音乐
const Recommend = () => import('../views/discover/discoverChildren/Recommend.vue')
const MusicList = () => import('views/discover/discoverChildren/MusicList.vue')
const MusicListIndex = () => import('views/discover/discoverChildren/musicListChildren/MusicListIndex.vue')
const MusicListHighquality = () => import('views/discover/discoverChildren/musicListChildren/MusicListHighquality.vue')
const Singer = () => import('../views/discover/discoverChildren/Singer.vue')
const Ranking = () => import('../views/discover/discoverChildren/Ranking.vue')
// 首页-视频
const Video = () => import('views/video/Video.vue')
const VideoList = () => import('views/video/videoChildren/VideoList.vue')
const MvList = () => import('views/video/videoChildren/MvList.vue')
// 首页-收藏
const Favorites = () => import('views/favorites/favorites.vue')
const FavoriteAlbum = () => import('views/favorites/favoritesChildren/FavoriteAlbum.vue')
const FavoriteVideo = () => import('views/favorites/favoritesChildren/FavoriteVideo.vue')
const FavoriteSinger = () => import('views/favorites/favoritesChildren/FavoriteSinger.vue')
// 首页-每日推荐
const RecommendMusic = () => import('views/recommendMusic/RecommendMusic.vue')
// 个人用户主页
const Personal = () => import('../views/personal/Personal.vue')
const Follows = () => import('../views/personal/personalChildren/Follows.vue')
const Followeds = () => import('../views/personal/personalChildren/Followeds.vue')
// 搜索框
const Search = () => import('../views/search/Search.vue')
const SearchSong = () => import('../views/search/searchChildren/SearchSong.vue')
const SearchSinger = () => import('../views/search/searchChildren/SearchSinger.vue')
const SearchAlbum = () => import('../views/search/searchChildren/SearchAlbum.vue')
const SearchVideo = () => import('../views/search/searchChildren/SearchVideo.vue')
const SearchMusicList = () => import('../views/search/searchChildren/SearchMusicList.vue')

// 歌手详情
const SingerDetail = () => import('../views/singerDetail/SingerDetail.vue')
// 专辑详情
const Album = () => import('../views/album/Album.vue')
// 音乐歌单详情
const MusicListDetail = () => import('../views/musicListDetail/MusicListDetail.vue')
// 视频详情页面
const VideoDetail = () => import('../views/videoDetail/VideoDetail.vue')

Vue.use(VueRouter)

const routes = [
  // 重定向
  { path: '/', redirect: '/index' },
  {
    path: '/index',
    component: Index,
    redirect: '/discover',
    children: [
      // 首页-发现音乐
      {
        path: '/discover',
        component: Discover,
        redirect: '/discover/recommend',
        children: [
          { path: '/discover/recommend', name: 'recommend', component: Recommend },
          {
            path: '/discover/musiclist',
            component: MusicList,
            redirect: '/discover/musiclist/musiclistindex',
            children: [
              { path: '/discover/musiclist/musiclistindex', component: MusicListIndex },
              { path: '/discover/musiclist/musiclisthighquality', component: MusicListHighquality }
            ]
          },
          { path: '/discover/singer', name: 'singer', component: Singer },
          { path: '/discover/ranking', name: 'ranking', component: Ranking }
        ]
      },
      // 首页-视频
      {
        path: '/video',
        component: Video,
        redirect: '/video/videolist',
        children: [
          { path: '/video/videolist', component: VideoList },
          { path: '/video/mvlist', component: MvList }
        ]
      },
      // 首页-收藏
      {
        path: '/favorites',
        component: Favorites,
        redirect: '/favorites/favoritealbum',
        children: [
          { path: '/favorites/favoritealbum', name: 'favoriteAlbum', component: FavoriteAlbum },
          { path: '/favorites/favoritesinger', name: 'favoriteSinger', component: FavoriteSinger },
          { path: '/favorites/favoritevideo', name: 'favoriteVideo', component: FavoriteVideo }
        ]
      },
      // 首页-推荐
      { path: '/recommendmusic', name: 'recommendMusic', component: RecommendMusic },
      // 个人主页跳转,name属性不要就出错
      { path: '/personal/:uid', name: 'personal', component: Personal },
      { path: '/personal/follows/:uid', name: 'follows', component: Follows },
      { path: '/personal/followeds/:uid', name: 'followeds', component: Followeds },
      // 搜索框的跳转
      {
        path: '/search/: id',
        name: 'search',
        component: Search,
        redirect: '/search/searchsong/:id',
        children: [
          { path: '/search/searchsong/:id', name: 'searchSong', component: SearchSong },
          { path: '/search/searchsinger/:id', name: 'searchSinger', component: SearchSinger },
          { path: '/search/searchalbum/:id', name: 'searchAlbum', component: SearchAlbum },
          { path: '/search/searchvideo/:id', name: 'searchVideo', component: SearchVideo },
          { path: '/search/searchmusiclist/:id', name: 'searchMusicList', component: SearchMusicList }
        ]
      },
      // 歌手详情页面
      { path: '/singerdetail/:id', name: 'singerDetail', component: SingerDetail },
      // 专辑详情页面
      { path: '/album/:id', name: 'album', component: Album },
      // 歌单详情页面
      { path: '/musiclistdetail/:id', name: 'musicListDetail', component: MusicListDetail },
      // 视频详情页面
      { path: '/videodetail/:id/:type', name: 'videoDetail', component: VideoDetail }
    ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router
