(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/myAttention/myAttention"],{"42a2":function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return a}),n.d(e,"b",function(){return o})},"784c":function(t,e,n){"use strict";n.r(e);var a=n("42a2"),o=n("c3bb");for(var i in o)"default"!==i&&function(t){n.d(e,t,function(){return o[t]})}(i);n("bf4d");var c=n("2877"),r=Object(c["a"])(o["default"],a["a"],a["b"],!1,null,null,null);e["default"]=r.exports},abbd:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={data:function(){return{Height:"",stateBarHeight:"",attentionList:[[],[],[],[]],ctype:[],navIndex:0}},onLoad:function(){this.Height=this.$store.state.windowHeight,this.stateBarHeight=this.$store.state.statusBarHeight;var e=this,n=t.getStorageSync("openid");t.request({url:e.$store.state.baseurl+"/careerType/getType",data:{openId:n},method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){console.log(t),e.ctype=t.data.data,e.attention(1)}})},methods:{toOrder:function(e){t.navigateTo({url:"/components/bosspages/order?id="+e})},goback:function(){this.$store.commit("change_page",2),t.navigateTo({url:"/pages/index/index"})},swiperChange:function(t){console.log(t.detail.current);var e=t.detail.current;this.navClick(e)},attention:function(e){var n=t.getStorageSync("openid"),a=this;console.log(e),t.request({url:a.$store.state.baseurl+"/attention/list",data:{openId:n,cid:e},method:"POST",header:{"content-type":"application/x-www-form-urlencoded"},success:function(t){console.log(t);var n=a.attentionList;n.splice(e-1,1,t.data.data),a.attentionList=n,console.log(n)}})},navClick:function(t){this.navIndex=t,this.attention(t+1)}}};e.default=n}).call(this,n("543d")["default"])},b0c1:function(t,e,n){},bf4d:function(t,e,n){"use strict";var a=n("b0c1"),o=n.n(a);o.a},c3bb:function(t,e,n){"use strict";n.r(e);var a=n("abbd"),o=n.n(a);for(var i in a)"default"!==i&&function(t){n.d(e,t,function(){return a[t]})}(i);e["default"]=o.a}},[["e5c2","common/runtime","common/vendor"]]]);