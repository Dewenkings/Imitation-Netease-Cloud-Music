(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-127b9ec2"],{"08c6":function(e,t,c){"use strict";c.r(t);var n=function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"recommendMusic"},[c("div",{staticClass:"recommendInfo"},[e._m(0),c("div",{staticClass:"buttons"},[c("div",{staticClass:"buttonItem playAll",on:{click:e.playAll}},[c("i",{staticClass:"iconfont icon-bofang playAll"}),c("span",[e._v("播放全部")])]),e._m(1)])]),0!=e.recommendMusic.length?c("div",[c("el-table",{staticStyle:{width:"100%"},attrs:{data:e.recommendMusic,size:"mini","highlight-current-row":"",stripe:"",lazy:""},on:{"row-dblclick":e.clickRow,"cell-click":e.clickCell}},[c("el-table-column",{attrs:{label:"",width:"30",type:"index",index:e.handleIndex}}),c("el-table-column",{attrs:{label:"",width:"23"}},[c("i",{staticClass:"iconfont icon-download"})]),c("el-table-column",{attrs:{prop:"name",label:"音乐标题","min-width":"350"}}),c("el-table-column",{attrs:{prop:"ar[0].name",label:"歌手","min-width":"120"}}),c("el-table-column",{attrs:{prop:"al.name",label:"专辑","min-width":"170"}}),c("el-table-column",{attrs:{prop:"dt",label:"时长","min-width":"100"}})],1),c("div",{staticClass:"placeholder"})],1):e._e()])},i=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"title"},[n("div",{staticClass:"cover"},[n("img",{attrs:{src:c("1394"),alt:""}})]),n("div",{staticClass:"titleInfo"},[n("div",{staticClass:"infoTop"},[e._v("每日歌曲推荐")]),n("div",{staticClass:"infoBottom"},[e._v("根据你的音乐口味生成，每天6:00更新")])])])},function(){var e=this,t=e.$createElement,c=e._self._c||t;return c("div",{staticClass:"buttonItem"},[c("i",{staticClass:"iconfont icon-xihuan"}),c("span",[e._v("收藏全部")])])}],s=c("c7eb"),a=c("1da1"),r=(c("d3b7"),c("159b"),c("c740"),c("ac1f"),c("466d"),c("fb6a"),c("b0c0"),c("5319"),c("aa2a")),o={name:"RecommendMusic",data:function(){return{recommendMusic:[],recommendMusicListId:"recommendMusic"}},methods:{getRecommendMusic:function(){var e=this;return Object(a["a"])(Object(s["a"])().mark((function t(){var c;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$request("/recommend/songs",{changeOrigin:!0});case 2:c=t.sent,e.recommendMusic=c.data.data.dailySongs,e.recommendMusic.forEach((function(t,c){e.recommendMusic[c].dt=Object(r["b"])(t.dt)}));case 5:case"end":return t.stop()}}),t)})))()},playAll:function(){this.$store.commit("updateMusicId",this.recommendMusic[0].id),this.$store.commit("updateMusicList",{musicList:this.recommendMusic,musicListId:this.recommendMusicListId})},handleIndex:function(e){return e+=1,e<10?"0"+e:e},clickRow:function(e){var t=this;return Object(a["a"])(Object(s["a"])().mark((function c(){return Object(s["a"])().wrap((function(c){while(1)switch(c.prev=c.next){case 0:t.$store.commit("updateMusicId",e.id),t.recommendMusicListId!==t.$store.state.musicListId&&t.$store.commit("updateMusicList",{musicList:t.recommendMusic,musicListId:t.recommendMusicListId});case 2:case"end":return c.stop()}}),c)})))()},handleDOM:function(e,t){if(document.querySelector(".recommendMusic")){var c=document.querySelector(".recommendMusic").querySelectorAll(".el-table__row"),n=this.recommendMusic.findIndex((function(t){return t.id===e}));if(-1!==n&&(c[n].children[0].querySelector(".cell").innerHTML='<div><i class="iconfont icon-yinliang"></i></div>',c[n].children[0].querySelector(".iconfont").classList.add("currentRow"),c[n].children[2].querySelector(".cell").classList.add("currentRow")),-1!==t){var i=this.recommendMusic.findIndex((function(e){return e.id===t}));-1!==i&&(c[i].children[0].querySelector(".cell").innerHTML="<div>".concat(i+1<10?"0"+(i+1):i+1,"</div>"),c[i].children[2].querySelector(".cell").classList.remove("currentRow"))}}},clickCell:function(e,t,c){var n=this;return Object(a["a"])(Object(s["a"])().mark((function t(){var i,a,r,o,l;return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!c.querySelector(".icon-download")){t.next=15;break}return t.next=3,n.$request("/song/url",{id:e.id});case 3:if(i=t.sent,null!=i.data.data[0].url){t.next=7;break}return n.$message.warning("暂时无法获取该资源哦!"),t.abrupt("return");case 7:if(a=i.data.data[0].url.match(/http.*?\.net/),r=a[0].match(/http:\/(\S*).music/)[1],"/m7"===r||"/m701"===r||"/m8"===r||"/m801"===r){t.next=12;break}return n.$message.error("匹配不到对应的代理,下载失败!"),t.abrupt("return");case 12:o=i.data.data[0].url.slice(a[0].length),l={url:r+o,name:e.name+" - "+e.ar[0].name+"."+i.data.data[0].type.toLowerCase()},n.$store.commit("updateDownloadMusicInfo",l);case 15:case"end":return t.stop()}}),t)})))()}},created:function(){this.$store.state.isLogin||(this.$message.error("只有登录后才能进入每日推荐页面哦!"),this.$router.replace("/discover"))},mounted:function(){var e=this;return Object(a["a"])(Object(s["a"])().mark((function t(){return Object(s["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.$store.state.isLogin){t.next=4;break}return t.next=3,e.getRecommendMusic();case 3:e.recommendMusicListId===e.$store.state.musicListId&&e.handleDOM(e.$store.state.musicId);case 4:case"end":return t.stop()}}),t)})))()},watch:{"$store.state.musicId":function(e,t){this.handleDOM(e,t)}}},l=o,u=(c("0e55"),c("2877")),d=Object(u["a"])(l,n,i,!1,null,"646eb792",null);t["default"]=d.exports},"0e55":function(e,t,c){"use strict";c("f101")},1394:function(e,t,c){e.exports=c.p+"img/recommendMusic.dadb06d2.png"},f101:function(e,t,c){}}]);
//# sourceMappingURL=chunk-127b9ec2.0c02266e.js.map