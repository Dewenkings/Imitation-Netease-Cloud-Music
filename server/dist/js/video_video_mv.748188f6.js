(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["video_video_mv"],{"0185":function(t,e,a){},"11db":function(t,e,a){},"230f":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"SortBoxContainer"},[a("el-popover",{attrs:{placement:"bottom-start","popper-class":"sortPop",width:"350",trigger:"click","visible-arrow":!1},on:{show:t.showSortPop},model:{value:t.isSortPopShow,callback:function(e){t.isSortPopShow=e},expression:"isSortPopShow"}},[a("div",{staticClass:"SortBox",attrs:{slot:"reference"},slot:"reference"},[t._v(" "+t._s(t.currentTag.name)+" "),a("i",{staticClass:"iconfont icon-arrow-right-bold"})]),0==t.sortList.length?a("div",{staticClass:"tips"},[t._v("正在加载分类数据...")]):a("div",{staticClass:"sortList"},t._l(t.sortList,(function(e,i){return a("div",{key:i,staticClass:"sortItme",class:t.currentTag.name==e.name?"currentItem":"",on:{click:function(a){return t.clickItem(e)}}},[t._v(" "+t._s(e.name)+" ")])})),0)])],1)},r=[],n={name:"SortBox",props:{currentTag:{type:Object,default:function(){return{}}},sortList:{type:Array,default:function(){return[]}}},data:function(){return{isSortPopShow:!1}},methods:{showSortPop:function(){0===this.sortList.length&&this.$emit("getSortList")},clickItem:function(t){this.$emit("clickSortBoxItem",t),this.isSortPopShow=!1}}},s=n,o=(a("71d8"),a("2877")),c=Object(o["a"])(s,i,r,!1,null,"13926e0a",null);e["a"]=c.exports},2909:function(t,e,a){"use strict";function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var a=0,i=new Array(e);a<e;a++)i[a]=t[a];return i}function r(t){if(Array.isArray(t))return i(t)}a.d(e,"a",(function(){return c}));a("a4d3"),a("e01a"),a("d3b7"),a("d28b"),a("3ca3"),a("ddb0"),a("a630");function n(t){if("undefined"!==typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}a("fb6a"),a("b0c0"),a("ac1f"),a("00b4");function s(t,e){if(t){if("string"===typeof t)return i(t,e);var a=Object.prototype.toString.call(t).slice(8,-1);return"Object"===a&&t.constructor&&(a=t.constructor.name),"Map"===a||"Set"===a?Array.from(t):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?i(t,e):void 0}}a("d9e2");function o(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t){return r(t)||n(t)||s(t)||o()}},"2d4d":function(t,e,a){"use strict";a("11db")},"345c":function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navBar"},t._l(t.SecondNavBarData,(function(e,i){return a("div",{key:i,staticClass:"barItem",class:i==t.activeItem?"active":"",style:0==t.itemWidth?"":"width:"+t.itemWidth+"px;",on:{click:function(e){return t.clickSecondBarItem(i)}}},[t._v(" "+t._s(e.name)+" ")])})),0)},r=[],n=(a("a9e3"),a("c740"),a("b0c0"),{data:function(){return{activeItem:0}},props:{SecondNavBarData:{type:Array,default:function(){return[]}},itemWidth:{type:Number,default:function(){return 40}},currentTag:{type:Object,default:function(){return{}}}},methods:{clickSecondBarItem:function(t){this.activeItem!==t&&(this.activeItem=t,this.$emit("clickSecondBarItem",t))}},watch:{currentTag:function(t){this.activeItem=this.SecondNavBarData.findIndex((function(e){return e.name===t.name}))}}}),s=n,o=(a("cb67"),a("2877")),c=Object(o["a"])(s,i,r,!1,null,"3e819152",null);e["a"]=c.exports},"47d5":function(t,e,a){"use strict";a("f0d1")},5899:function(t,e){t.exports="\t\n\v\f\r                　\u2028\u2029\ufeff"},"58a8":function(t,e,a){var i=a("e330"),r=a("1d80"),n=a("577e"),s=a("5899"),o=i("".replace),c="["+s+"]",d=RegExp("^"+c+c+"*"),u=RegExp(c+c+"*$"),l=function(t){return function(e){var a=n(r(e));return 1&t&&(a=o(a,d,"")),2&t&&(a=o(a,u,"")),a}};t.exports={start:l(1),end:l(2),trim:l(3)}},"71d8":function(t,e,a){"use strict";a("9578")},7356:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"mvList"},[a("div",{staticClass:"mvListNavBar"},[a("div",{staticClass:"selectorItem"},[a("div",{staticClass:"title"},[t._v("地区：")]),a("second-nav-bar",{staticClass:"secondNavBar",attrs:{SecondNavBarData:t.areaList,itemWidth:50},on:{clickSecondBarItem:t.areaItem}})],1)]),a("div",{staticClass:"selectorItem"},[a("div",{staticClass:"title"},[t._v("类型：")]),a("second-nav-bar",{staticClass:"secondNavBar",attrs:{SecondNavBarData:t.typeList,itemWidth:50},on:{clickSecondBarItem:t.typeItem}})],1),a("div",{staticClass:"selectorItem"},[a("div",{staticClass:"title"},[t._v("排序：")]),a("second-nav-bar",{staticClass:"secondNavBar",attrs:{SecondNavBarData:t.orderList,itemWidth:50},on:{clickSecondBarItem:t.orderItem}})],1),a("video-list-card",{staticClass:"cardList",attrs:{videoList:t.mvList,videoType:"mv",isLoad:!0},on:{clickListCardItem:t.goToMvDetail,bottomLoad:t.bottomLoad}})],1)},r=[],n=a("c7eb"),s=a("2909"),o=a("1da1"),c=a("345c"),d=a("cf90"),u={components:{SecondNavBar:c["a"],VideoListCard:d["a"]},name:"MvList",data:function(){return{areaList:[{name:"全部",path:""},{name:"内地",path:"内地"},{name:"港台",path:"港台"},{name:"欧美",path:"欧美"},{name:"日本",path:"日本"},{name:"韩国",path:"韩国"}],typeList:[{name:"全部",path:""},{name:"官方版",path:"官方版"},{name:"现场版",path:"现场版"},{name:"网易出品",path:"网易出品"}],orderList:[{name:"上升最快",path:""},{name:"最热",path:"最热"},{name:"最新",path:"最新"}],area:"",type:"",order:"",mvPage:1,hasMore:!1,mvList:[]}},methods:{getMvList:function(){var t=this;return Object(o["a"])(Object(n["a"])().mark((function e(){var a,i;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$request("/mv/all",{area:t.area,type:t.type,order:t.order,offset:30*(t.mvPage-1)});case 2:i=e.sent,t.hasMore=i.data.hasMore,(a=t.mvList).push.apply(a,Object(s["a"])(i.data.data));case 5:case"end":return e.stop()}}),e)})))()},areaItem:function(t){this.area=this.areaList[t].path,this.mvList=[],this.mvPage=1,this.getMvList()},typeItem:function(t){this.type=this.typeList[t].path,this.mvList=[],this.mvPage=1,this.getMvList()},orderItem:function(t){this.order=this.orderList[t].path,this.mvList=[],this.mvPage=1,this.getMvList()},goToMvDetail:function(t){var e=t.id;this.$router.push({name:"videoDetail",params:{id:e,type:"mv"}})},bottomLoad:function(){this.hasMore&&(this.mvPage+=1,this.getMvList())}},created:function(){this.getMvList()}},l=u,v=(a("d08b"),a("2877")),f=Object(v["a"])(l,i,r,!1,null,"21114f98",null);e["default"]=f.exports},"8f75":function(t,e,a){"use strict";a("0185")},9578:function(t,e,a){},a630:function(t,e,a){var i=a("23e7"),r=a("4df4"),n=a("1c7e"),s=!n((function(t){Array.from(t)}));i({target:"Array",stat:!0,forced:s},{from:r})},a687:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"navBarContainer"},[a("div",{staticClass:"navBar"},t._l(t.navBarItem,(function(e,i){return a("div",{key:i,staticClass:"barItem",class:i==t.activeNum?"active":"",on:{click:function(a){return t.clickBarItem(e.path,i)}}},[t._v(" "+t._s(e.name)+" ")])})),0)])},r=[],n=(a("d3b7"),a("159b"),a("ac1f"),a("841c"),{name:"NavBar",data:function(){return{activeNum:0}},props:{navBarItem:{type:Array,default:function(){return[]}}},created:function(){var t=this;this.navBarItem.forEach((function(e,a){-1!==decodeURI(t.$route.path).search(e.path)&&(t.activeNum=a)}))},methods:{clickBarItem:function(t,e){this.activeNum!==e&&(this.activeNum=e,this.$emit("clickBarItem",t))}}}),s=n,o=(a("47d5"),a("2877")),c=Object(o["a"])(s,i,r,!1,null,"5a8c920d",null);e["a"]=c.exports},a9e3:function(t,e,a){"use strict";var i=a("83ab"),r=a("da84"),n=a("e330"),s=a("94ca"),o=a("cb2d"),c=a("1a2d"),d=a("7156"),u=a("3a9b"),l=a("d9b5"),v=a("c04e"),f=a("d039"),m=a("241c").f,h=a("06cf").f,p=a("9bf2").f,b=a("408a"),g=a("58a8").trim,L="Number",y=r[L],C=y.prototype,I=r.TypeError,_=n("".slice),S=n("".charCodeAt),k=function(t){var e=v(t,"number");return"bigint"==typeof e?e:B(e)},B=function(t){var e,a,i,r,n,s,o,c,d=v(t,"number");if(l(d))throw I("Cannot convert a Symbol value to a number");if("string"==typeof d&&d.length>2)if(d=g(d),e=S(d,0),43===e||45===e){if(a=S(d,2),88===a||120===a)return NaN}else if(48===e){switch(S(d,1)){case 66:case 98:i=2,r=49;break;case 79:case 111:i=8,r=55;break;default:return+d}for(n=_(d,2),s=n.length,o=0;o<s;o++)if(c=S(n,o),c<48||c>r)return NaN;return parseInt(n,i)}return+d};if(s(L,!y(" 0o1")||!y("0b1")||y("+0x1"))){for(var N,T=function(t){var e=arguments.length<1?0:y(k(t)),a=this;return u(C,a)&&f((function(){b(a)}))?d(Object(e),a,T):e},w=i?m(y):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,isFinite,isInteger,isNaN,isSafeInteger,parseFloat,parseInt,fromString,range".split(","),x=0;w.length>x;x++)c(y,N=w[x])&&!c(T,N)&&p(T,N,h(y,N));T.prototype=C,C.constructor=T,o(r,L,T,{constructor:!0})}},b9ce:function(t,e,a){},bfaf:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"video"},[a("nav-bar",{attrs:{navBarItem:t.navBarData},on:{clickBarItem:t.clickBarItem}}),a("router-view")],1)},r=[],n=(a("ac1f"),a("5319"),a("a687")),s={name:"Video",components:{NavBar:n["a"]},data:function(){return{navBarData:[{name:"视频",path:"/video/videolist"},{name:"MV",path:"/video/mvlist"}]}},methods:{clickBarItem:function(t){this.$router.push(t)}},created:function(){this.$store.state.isLogin||(this.$message.error("只有登录后才能进入视频页面哦!"),this.$router.replace("/discover"))}},o=s,c=(a("c6ba"),a("2877")),d=Object(c["a"])(o,i,r,!1,null,"3d8760fd",null);e["default"]=d.exports},c57b:function(t,e,a){},c6ba:function(t,e,a){"use strict";a("e1fe")},cb67:function(t,e,a){"use strict";a("c57b")},cf90:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"VideoListCard"},["singerMv"==t.videoType||"mv"==t.videoType?a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":t.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},t._l(t.videoList,(function(e,i){return a("div",{key:i,staticClass:"cardItem",on:{click:function(a){return t.clickListCardItem(e.id,i,e.type)}}},[a("div",{staticClass:"videoCover"},[a("img",{attrs:{src:("singerMv"==t.videoType?e.imgurl:e.cover)+"?param=680y400",alt:""}}),a("div",{staticClass:"playCount"},[a("i",{staticClass:"iconfont icon-shipin"}),t._v(t._s(t._f("handleNum")(e.playCount))+" ")]),"singerMv"==t.videoType?a("div",{staticClass:"videoTime"},[t._v(" "+t._s(t._f("handleMusicTime")(e.duration))+" ")]):t._e()]),a("div",{staticClass:"videoTitle"},[t._v(t._s(e.name))]),"mv"==t.videoType?a("div",{staticClass:"singer"},[t._v(t._s(e.artistName))]):t._e()])})),0):"video"==t.videoType?a("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],staticClass:"videoListCard",attrs:{"infinite-scroll-disabled":t.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},t._l(t.videoList,(function(e,i){return a("div",{key:i,staticClass:"cardItem",on:{click:function(a){return t.clickListCardItem(e.vid||e.data.vid,i,e.type)}}},[a("div",{staticClass:"videoCover"},[a("img",{attrs:{src:(e.coverUrl||e.data.coverUrl)+"?param=1260y800",alt:""}}),a("div",{staticClass:"playCount"},[a("i",{staticClass:"iconfont icon-shipin"}),t._v(t._s(t._f("handleNum")(e.playTime||e.data.playTime))+" ")]),a("div",{staticClass:"videoTime"},[t._v(" "+t._s(t._f("handleMusicTime")(e.durationms||e.data.durationms))+" ")])]),a("div",{staticClass:"videoTitle"},[t._v(t._s(e.title||e.data.title))])])})),0):t._e()])},r=[],n=a("aa2a"),s={name:"VideoListCard",data:function(){return{disabled:!0}},props:{videoList:{type:Array,default:function(){return[]}},isLoad:{type:Boolean,default:function(){return!1}},videoType:{type:String,default:function(){return"singerMv"}}},methods:{clickListCardItem:function(t,e,a){this.$emit("clickListCardItem",{id:t,index:e,type:a})},load:function(){this.$emit("bottomLoad"),this.disabled=!0}},filters:{handleMusicTime:n["b"],handleNum:n["c"]},watch:{videoList:function(){!0===this.isLoad&&(0!==this.videoList.length?this.disabled=!1:this.disabled=!0)}}},o=s,c=(a("8f75"),a("2877")),d=Object(c["a"])(o,i,r,!1,null,"48ea44aa",null);e["a"]=d.exports},d08b:function(t,e,a){"use strict";a("b9ce")},e1fe:function(t,e,a){},ef65:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"videoList"},[0!=t.videoCategory.length?a("div",{staticClass:"musicListNavBar"},[a("div",{staticClass:"left"},[a("sort-box",{attrs:{currentTag:t.currentTag,sortList:t.sortList},on:{getSortList:t.getSortList,clickSortBoxItem:t.clickSortBoxItem}})],1),a("div",{staticClass:"right"},[a("second-nav-bar",{attrs:{SecondNavBarData:t.videoCategory,itemWidth:0,currentTag:t.currentTag},on:{clickSecondBarItem:t.clickSecondBarItem}})],1)]):t._e(),a("video-list-card",{staticClass:"cardList",attrs:{videoList:t.videoList,isLoad:!0,videoType:"video"},on:{clickListCardItem:t.goToVideoDetail,bottomLoad:t.bottomLoad}}),a("go-top",{attrs:{scrollObj:".cardList"}})],1)},r=[],n=a("2909"),s=a("c7eb"),o=a("1da1"),c=a("345c"),d=a("cf90"),u=a("7cff"),l=a("230f"),v={components:{SecondNavBar:c["a"],VideoListCard:d["a"],SortBox:l["a"],GoTop:u["a"]},name:"VideoList",data:function(){return{videoCategory:[],currentTag:{},videoPage:1,hasMore:!0,videoList:[],sortList:[]}},methods:{getVideoCategory:function(){var t=this;return Object(o["a"])(Object(s["a"])().mark((function e(){var a;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$request("/video/category/list");case 2:a=e.sent,t.videoCategory=a.data.data,t.currentTag=a.data.data[0];case 5:case"end":return e.stop()}}),e)})))()},getVideoList:function(t){var e=this;return Object(o["a"])(Object(s["a"])().mark((function a(){var i,r,o;return Object(s["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:i=2;case 1:if(!i){a.next=15;break}if(!e.hasMore){a.next=12;break}return a.next=5,e.$request("/video/group",{id:t,offset:8*(e.videoPage-1)});case 5:o=a.sent,e.hasMore=o.data.hasmore,(r=e.videoList).push.apply(r,Object(n["a"])(o.data.datas)),e.videoPage+=1,i--,a.next=13;break;case 12:return a.abrupt("return");case 13:a.next=1;break;case 15:case"end":return a.stop()}}),a)})))()},getSortList:function(){var t=this;return Object(o["a"])(Object(s["a"])().mark((function e(){var a;return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$request("/video/group/list");case 2:a=e.sent,t.sortList=a.data.data;case 4:case"end":return e.stop()}}),e)})))()},clickSecondBarItem:function(t){this.videoPage=1,this.videoList=[],this.currentTag=this.videoCategory[t],this.getVideoList(this.currentTag.id)},goToVideoDetail:function(t){var e=t.id;this.$router.push({name:"videoDetail",params:{id:e,type:"video"}})},bottomLoad:function(){this.hasMore&&this.getVideoList(this.currentTag.id)},clickSortBoxItem:function(t){this.currentTag=t,this.videoPage=1,this.videoList=[],this.getVideoList(t.id)}},created:function(){var t=this;return Object(o["a"])(Object(s["a"])().mark((function e(){return Object(s["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getVideoCategory();case 2:return e.next=4,t.getVideoList(t.currentTag.id);case 4:case"end":return e.stop()}}),e)})))()}},f=v,m=(a("2d4d"),a("2877")),h=Object(m["a"])(f,i,r,!1,null,"3ce3a283",null);e["default"]=h.exports},f0d1:function(t,e,a){}}]);
//# sourceMappingURL=video_video_mv.748188f6.js.map