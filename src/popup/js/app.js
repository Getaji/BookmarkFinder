(function(e){function t(t){for(var n,a,i=t[0],u=t[1],s=t[2],d=0,f=[];d<i.length;d++)a=i[d],Object.prototype.hasOwnProperty.call(c,a)&&c[a]&&f.push(c[a][0]),c[a]=0;for(n in u)Object.prototype.hasOwnProperty.call(u,n)&&(e[n]=u[n]);l&&l(t);while(f.length)f.shift()();return o.push.apply(o,s||[]),r()}function r(){for(var e,t=0;t<o.length;t++){for(var r=o[t],n=!0,i=1;i<r.length;i++){var u=r[i];0!==c[u]&&(n=!1)}n&&(o.splice(t--,1),e=a(a.s=r[0]))}return e}var n={},c={app:0},o=[];function a(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,a),r.l=!0,r.exports}a.m=e,a.c=n,a.d=function(e,t,r){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(a.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(r,n,function(t){return e[t]}.bind(null,n));return r},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=t,i=i.slice();for(var s=0;s<i.length;s++)t(i[s]);var l=u;o.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("64a9"),c=r.n(n);c.a},1736:function(e,t,r){"use strict";var n=r("746f"),c=r.n(n);c.a},"56d7":function(e,t,r){"use strict";r.r(t);r("cadf"),r("551c"),r("f751"),r("097d");var n=r("2b0e"),c=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{attrs:{id:"app"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.searchQuery,expression:"searchQuery"}],ref:"inputSearchQuery",attrs:{id:"inputSearchQuery",placeholder:"入力してEnterで検索"},domProps:{value:e.searchQuery},on:{keyup:[e.onKeyupInputSearchQuery,function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.enterInputSearchQuery(t)}],keydown:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"up",38,t.key,["Up","ArrowUp"])?null:e.shiftSelectedItem(-1,t)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"down",40,t.key,["Down","ArrowDown"])?null:e.shiftSelectedItem(1,t)}],change:function(t){e.selectedBookmarkIndex=-1},input:function(t){t.target.composing||(e.searchQuery=t.target.value)}}}),r("div",{attrs:{id:"searchOptions"}},[r("div",{attrs:{id:"selectSearchOrAnd"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.selectSearchOrAnd,expression:"selectSearchOrAnd"}],attrs:{type:"radio",id:"selectSearchOrAnd-AND",value:"AND"},domProps:{checked:e._q(e.selectSearchOrAnd,"AND")},on:{change:function(t){e.selectSearchOrAnd="AND"}}}),r("label",{attrs:{for:"selectSearchOrAnd-AND"}},[e._v("AND")]),r("input",{directives:[{name:"model",rawName:"v-model",value:e.selectSearchOrAnd,expression:"selectSearchOrAnd"}],attrs:{type:"radio",id:"selectSearchOrAnd-OR",value:"OR"},domProps:{checked:e._q(e.selectSearchOrAnd,"OR")},on:{change:function(t){e.selectSearchOrAnd="OR"}}}),r("label",{attrs:{for:"selectSearchOrAnd-OR"}},[e._v("OR")])]),r("div",[r("input",{directives:[{name:"model",rawName:"v-model",value:e.useRegExp,expression:"useRegExp"}],attrs:{type:"checkbox",id:"checkboxUseRegExpSearch"},domProps:{checked:Array.isArray(e.useRegExp)?e._i(e.useRegExp,null)>-1:e.useRegExp},on:{change:function(t){var r=e.useRegExp,n=t.target,c=!!n.checked;if(Array.isArray(r)){var o=null,a=e._i(r,o);n.checked?a<0&&(e.useRegExp=r.concat([o])):a>-1&&(e.useRegExp=r.slice(0,a).concat(r.slice(a+1)))}else e.useRegExp=c}}}),r("label",{attrs:{for:"checkboxUseRegExpSearch"}},[e._v("正規表現を使用")])])]),r("div",{attrs:{id:"bookmarkList"}},[e._l(e.bookmarks,(function(t,n){return r("BookmarkItem",{key:t.id,class:{selected:n===e.selectedBookmarkIndex},attrs:{item:t},on:{openurl:e.onOpenUrlByBkm}})})),0===e.bookmarks.length&&"ready"!==e.state?r("div",{attrs:{id:"bookmarkListNotice"}},[e._v("一致するブックマークはありません")]):e._e()],2)])},o=[],a=(r("7514"),r("bd86")),i=(r("28a5"),r("ac6a"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("a",{staticClass:"outer",attrs:{href:e.item.url},on:{click:function(t){return e.onClickLink(t)}}},[r("div",{staticClass:"bookmarkItem",attrs:{id:"bkm-"+e.item.id}},[r("span",{staticClass:"icon"},[r("img",{attrs:{src:e.favicon}})]),r("span",{staticClass:"title"},[e._v(e._s(e.item.title))])])])}),u=[],s={name:"BookmarkItem",props:{item:null,required:!0},computed:{favicon:function(){return"chrome://favicon/"+this.item.url}},methods:{onClickLink:function(e){this.$emit("openurl",{url:this.item.url,newTab:e.ctrlKey,active:!e.shiftKey})}}},l=s,d=(r("1736"),r("2877")),f=Object(d["a"])(l,i,u,!1,null,"5ae90a00",null),h=f.exports,p=(r("f559"),r("768b")),m=(r("2fdb"),r("4917"),r("3b2b"),r("6762"),{}),k=["title","url"];function v(e,t,r,n){if(k.includes(e)){if(n){var c=new RegExp(t,"i");return function(t){return r^t[e].match(c)}}return function(n){return r^n[e].includes(t)}}return null}function y(e,t,r){var n=e.split(":",2);if(2===n.length){var c=Object(p["a"])(n,2),o=c[0],a=c[1],i=v(o,a,t,r);if(i)return i;var u=m[o];if(u)return u}if(r){var s=new RegExp(e,"i");return t?function(e){return!e.title.match(s)&&!e.url.match(s)}:function(e){return e.title.match(s)||e.url.match(s)}}return t?function(t){return!t.title.includes(e)&&!t.url.includes(e)}:function(t){return t.title.includes(e)||t.url.includes(e)}}function g(e,t){var r=e.startsWith("-")&&e.length>1;return r&&(e=e.substr(1)),y(e,r,t)}function b(e){return{id:e.id,title:e.title,url:e.url,children:e.children?e.children.map(b):null}}function O(e,t){var r=[];function n(e){e.forEach((function(e){e.children?n(e.children):r.push(e)}))}return n(e),r}function x(e,t,r){if(!e||0===e.length)return[];var n=e.split(/[　 ㅤ]+/g).filter((function(e){return e.length>0})).map((function(e){return g(e,r)}));if(0===n.length)return[];var c="OR"===t?n.some.bind(n):n.every.bind(n);return A.filter((function(e){return c((function(t){return t(e)}))}))}function S(e,t,r){t?chrome.tabs.create({url:e,active:r},(function(e){return null})):chrome.tabs.update(null,{url:e},(function(e){return null}))}var A=[],R={name:"app",components:{BookmarkItem:h},data:function(){return{bookmarks:[],searchQuery:"",selectSearchOrAnd:"AND",useRegExp:!1,selectedBookmarkIndex:-1,state:"ready"}},watch:{useRegExp:function(e){this.saveSyncStorage("searchUseRegExp",e)},selectSearchOrAnd:function(e){this.saveSyncStorage("searchOrAnd",e)}},mounted:function(){var e=this;chrome.storage.sync.get(["searchUseRegExp","searchOrAnd"],(function(t){void 0===t.searchUseRegExp?(e.useRegExp=!1,e.saveSyncStorage("searchUseRegExp",!1)):e.useRegExp=t.searchUseRegExp,void 0===t.searchOrAnd?(e.selectSearchOrAnd="AND",e.saveSyncStorage("searchOrAnd","AND")):e.selectSearchOrAnd=t.searchOrAnd})),this.loadBookmarks(),this.$refs.inputSearchQuery.focus()},methods:{openURL:S,saveSyncStorage:function(e,t,r){chrome.storage.sync.set(Object(a["a"])({},e,t),(function(){r&&r()}))},onKeyupInputSearchQuery:function(){},find:function(e){e||(e=this.searchQuery),this.selectedBookmarkIndex=-1,this.bookmarks=x(e,this.selectSearchOrAnd,this.useRegExp),this.state=this.bookmarks.length>0?"result":"empty"},enterInputSearchQuery:function(e){this.selectedBookmarkIndex>-1?S(this.bookmarks[this.selectedBookmarkIndex].url,e.ctrlKey,!e.shiftKey):this.find()},loadBookmarks:function(){chrome.bookmarks.getTree((function(e){var t=e.map(b);A=O(t)}))},shiftSelectedItem:function(e,t){if(!t.ctrlKey)return!0;var r=this.selectedBookmarkIndex+e;return r>-1&&this.bookmarks.length>r&&(this.selectedBookmarkIndex=r),t.preventDefault(),!1},onOpenUrlByBkm:function(e){S(e.url,e.newTab,e.active)},onKeydown:function(e){if(e.ctrlKey&&("ArrowUp"===e.key||"ArrowDown"===e.key))return e.preventDefault(),!1}}},w=R,E=(r("034f"),Object(d["a"])(w,c,o,!1,null,null,null)),_=E.exports;n["a"].config.productionTip=!1,new n["a"]({render:function(e){return e(_)}}).$mount("#app")},"64a9":function(e,t,r){},"746f":function(e,t,r){}});
//# sourceMappingURL=app.js.map