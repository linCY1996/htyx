(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/footer_nav"],{"0a97":function(t,e,n){"use strict";var r=n("daaf"),o=n.n(r);o.a},2049:function(t,e,n){"use strict";n.r(e);var r=n("b305"),o=n("557d");for(var a in o)"default"!==a&&function(t){n.d(e,t,function(){return o[t]})}(a);n("0a97");var u=n("2877"),s=Object(u["a"])(o["default"],r["a"],r["b"],!1,null,null,null);e["default"]=s.exports},"557d":function(t,e,n){"use strict";n.r(e);var r=n("cda0"),o=n.n(r);for(var a in r)"default"!==a&&function(t){n.d(e,t,function(){return r[t]})}(a);e["default"]=o.a},b305:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"a",function(){return r}),n.d(e,"b",function(){return o})},cda0:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r={data:function(){return{}},methods:{change_nav:function(t){this.$store.commit("change_page",t)}},computed:{item_width:function(){var t=this.$store.state.footer_store.footer_nav.length;switch(t){case 1:return"100%";case 2:return"50%";case 3:return"33.3%";case 4:return"25%";case 5:return"20%";default:break}},footer_nav:function(){return console.log(this.$store.state.footer_store.footer_nav),this.$store.state.footer_store.footer_nav},now_index:function(){return this.$store.state.footer_store.now_page_index}}};e.default=r},daaf:function(t,e,n){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/footer_nav-create-component',
    {
        'components/footer_nav-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("2049"))
        })
    },
    [['components/footer_nav-create-component']]
]);                
