(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b8c0bd9c"],{"34bd":function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"listTable"},[e("div",{staticClass:"listCover"},[e("img",{attrs:{src:t.officialListDetailItem.coverImgUrl||t.cover,alt:""},on:{click:function(i){return t.clickCheckAll(t.officialListDetailItem.id)}}})]),e("div",{staticClass:"listContainer"},[t._t("header"),e("table",t._l(t.officialListDetailItem.tracks&&t.officialListDetailItem.tracks.slice(0,5)||t.officialListDetailItem.topSongs&&(t.officialListDetailItem.isOpen?t.officialListDetailItem.topSongs:t.officialListDetailItem.topSongs.slice(0,10))||t.officialListDetailItem.songs.slice(0,10),(function(i,a){return e("tr",{key:a,staticClass:"listRows",on:{click:t.handleRowClick,dblclick:function(e){return t.handleRowDbClick(t.officialListDetailItem.id||i.id,a)}}},[e("td",{staticClass:"index"},[t._v(t._s(a+1))]),e("td",{staticClass:"musicName"},[t._v(t._s(i.name))]),e("td",{staticClass:"musicTime"},[t._v(t._s(i.dt))]),e("td",{staticClass:"singer"},[t._v(t._s(i.ar[0].name))])])})),0),e("div",{directives:[{name:"show",rawName:"v-show",value:t.isCheckAllShow,expression:"isCheckAllShow"}],staticClass:"checkAll",on:{click:function(i){return t.clickCheckAll(t.officialListDetailItem.id)}}},[t._v(" 查看全部 "),e("i",{staticClass:"iconfont icon-arrow-right-bold"})])],2)])},s=[],c={name:"ListTable",props:{officialListDetailItem:{type:Object,default:function(){return{}}},cover:{type:String,default:function(){return""}},listId:{type:String,default:function(){return""}},isCheckAllShow:{type:Boolean,default:function(){return!0}}},data:function(){return{}},methods:{handleRowClick:function(t){var i;i="tr"===t.path[0].localName?t.path[0]:t.path[1],this.$emit("handleRowClick",i)},handleRowDbClick:function(t,i){var e=this.listId;this.$emit("handleRowDbClick",{id:t,index:i,listId:e})},clickCheckAll:function(t){var i=this.listId;this.$emit("clickCheckAll",{id:t,listId:i})}}},l=c,n=(e("6761"),e("2877")),r=Object(n["a"])(l,a,s,!1,null,"5544798f",null);i["a"]=r.exports},"43ba":function(t,i,e){},"5b37":function(t,i,e){"use strict";e("a16d")},6761:function(t,i,e){"use strict";e("93ea")},"93ea":function(t,i,e){},9916:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}],ref:"listCard",staticClass:"listCard",attrs:{"infinite-scroll-disabled":t.disabled,"infinite-scroll-distance":300,"infinite-scroll-immediate":!1}},t._l(t.listCardData,(function(i,a){return e("div",{key:a,staticClass:"listCardItem",on:{click:function(e){return t.clickListCardItem(i.id)}}},[e("div",{staticClass:"image"},[e("img",{attrs:{src:(i.picUrl||i.coverImgUrl)+"?param=400y400",alt:""}})]),e("div",{staticClass:"title"},[t._v(t._s(i.name))])])})),0)},s=[],c={name:"ListCard",props:{listCardData:{type:Array,default:function(){return[]}},isLoad:{type:Boolean,default:function(){return!1}}},data:function(){return{disabled:!0}},methods:{clickListCardItem:function(t){this.$emit("clickListCardItem",t)},load:function(){this.$emit("bottomLoad"),this.disabled=!0}},watch:{listCardData:function(){!0===this.isLoad&&(0!==this.listCardData.length?this.disabled=!1:this.disabled=!0)}}},l=c,n=(e("5b37"),e("2877")),r=Object(n["a"])(l,a,s,!1,null,"556776df",null);i["a"]=r.exports},"9ede":function(t,i,e){"use strict";e.r(i);var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"rankingContainer"},[0!=t.officialListDetail.length?e("div",{staticClass:"ranking"},[e("div",{staticClass:"offical"},[e("div",{staticClass:"title"},[t._v("官方榜")]),t._l(t.officialListDetail,(function(i,a){return e("list-table",{key:a,attrs:{officialListDetailItem:i},on:{handleRowDbClick:t.handleRowDbClick,clickCheckAll:t.clickListCardItem}})}))],2),e("div",{staticClass:"global"},[e("div",{staticClass:"title"},[t._v("全球榜")]),e("list-card",{staticClass:"listCard",attrs:{listCardData:t.globalList},on:{clickListCardItem:t.clickListCardItem}})],1)]):t._e()])},s=[],c=e("c7eb"),l=e("1da1"),n=(e("fb6a"),e("d3b7"),e("159b"),e("c740"),e("aa2a")),r=e("34bd"),o=e("9916"),d={components:{ListTable:r["a"],ListCard:o["a"]},name:"Ranking",data:function(){return{officialList:[],officialListDetail:[],globalList:[]}},methods:{getAllRankings:function(){var t=this;return Object(l["a"])(Object(c["a"])().mark((function i(){var e;return Object(c["a"])().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,t.$request("/toplist");case 2:e=i.sent,t.officialList=e.data.list.slice(0,4),t.globalList=e.data.list.slice(4);case 5:case"end":return i.stop()}}),i)})))()},getMusicListDetail:function(t){var i=this;return Object(l["a"])(Object(c["a"])().mark((function e(){var a;return Object(c["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.$request("/playlist/detail",{id:t});case 2:a=e.sent,a=a.data.playlist,a.tracks.forEach((function(t,i){a.tracks[i].dt=Object(n["b"])(t.dt)})),i.officialListDetail.push(a);case 6:case"end":return e.stop()}}),e)})))()},handleRowClick:function(t){document.querySelector(".selectRow")&&document.querySelector(".selectRow").classList.remove("selectRow"),t.classList.add("selectRow")},handleRowDbClick:function(t){var i=t.id,e=t.index,a=this.officialListDetail.findIndex((function(t){return t.id===i}));this.$store.commit("updateMusicId",this.officialListDetail[a].tracks[e].id),i!==this.$store.state.musicListId&&this.$store.commit("updateMusicList",{musicList:this.officialListDetail[a].tracks,musicListId:i})},clickListCardItem:function(t){this.$store.state.isLogin?(t.id&&(t=t.id),this.$router.push({name:"musicListDetail",params:{id:t}})):this.$message.error("登录后才能查看全部歌曲哦!")}},created:function(){var t=this;return Object(l["a"])(Object(c["a"])().mark((function i(){return Object(c["a"])().wrap((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,t.getAllRankings();case 2:t.officialList.forEach((function(i){t.getMusicListDetail(i.id)}));case 3:case"end":return i.stop()}}),i)})))()}},u=d,f=(e("a671"),e("2877")),h=Object(f["a"])(u,a,s,!1,null,"4a74f586",null);i["default"]=h.exports},a16d:function(t,i,e){},a671:function(t,i,e){"use strict";e("43ba")}}]);
//# sourceMappingURL=chunk-b8c0bd9c.9a2f2e5d.js.map