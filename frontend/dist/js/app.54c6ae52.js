(function(e){function t(t){for(var r,u,c=t[0],a=t[1],i=t[2],f=0,p=[];f<c.length;f++)u=c[f],Object.prototype.hasOwnProperty.call(s,u)&&s[u]&&p.push(s[u][0]),s[u]=0;for(r in a)Object.prototype.hasOwnProperty.call(a,r)&&(e[r]=a[r]);l&&l(t);while(p.length)p.shift()();return o.push.apply(o,i||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var a=n[c];0!==s[a]&&(r=!1)}r&&(o.splice(t--,1),e=u(u.s=n[0]))}return e}var r={},s={app:0},o=[];function u(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.m=e,u.c=r,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)u.d(n,r,function(t){return e[t]}.bind(null,r));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],a=c.push.bind(c);c.push=t,c=c.slice();for(var i=0;i<c.length;i++)t(c[i]);var l=a;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"chat"},e._l(e.chat,(function(t){return n("cv-tile",{key:t.id,attrs:{kind:"standard"}},[n("h6",[e._v(e._s(t.from))]),n("p",[e._v(e._s(t.msg))])])})),1),n("form",{on:{submit:function(e){e.preventDefault()}}},[n("cv-text-input",{attrs:{label:"Message"},model:{value:e.userMessage,callback:function(t){e.userMessage=t},expression:"userMessage"}}),n("cv-button",{on:{click:e.sendMessage}},[e._v(" Send ")])],1)])},o=[],u={name:"App",data:function(){return{userMessage:"",chat:[],nums:0}},methods:{sendMessage:function(){this.$socket.emit("msg",this.userMessage),this.chat.push({from:"user",msg:this.userMessage,id:this.nums}),this.nums++,this.userMessage=""}},created:function(){var e=this;this.$socket.on("res",(function(t){e.chat.push({from:"bot",msg:t,id:e.nums}),e.nums++}))}},c=u,a=(n("5c0b"),n("2877")),i=Object(a["a"])(c,s,o,!1,null,null,null),l=i.exports,f=n("8e27"),p=n("c8c2"),d=n.n(p);r["default"].use(d.a),r["default"].config.productionTip=!1,r["default"].prototype.$socket=Object(f["io"])(),new r["default"]({render:function(e){return e(l)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.54c6ae52.js.map