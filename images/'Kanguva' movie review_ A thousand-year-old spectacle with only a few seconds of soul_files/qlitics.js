!function e(r,a,c){function d(i,t){if(!a[i]){if(!r[i]){var n="function"==typeof require&&require;if(!t&&n)return n(i,!0);if(u)return u(i,!0);var o=new Error("Cannot find module '"+i+"'");throw o.code="MODULE_NOT_FOUND",o}var s=a[i]={exports:{}};r[i][0].call(s.exports,function(t){var e=r[i][1][t];return d(e||t)},s,s.exports,e,r,a,c)}return a[i].exports}for(var u="function"==typeof require&&require,t=0;t<c.length;t++)d(c[t]);return d}({1:[function(y){window.makeQliticsFn=function(t,i){"use strict";function o(i,n){return function(){if(i.readyState===i.DONE)if(299<i.status)n({success:!1});else try{var t=JSON.parse(i.responseText);n({success:!0,data:t})}catch(e){n({success:!1})}}}function n(t,i){try{var n=new XMLHttpRequest;n.onreadystatechange=o(n,i),n.withCredentials=!0,n.open("GET",t,!0),n.send()}catch(e){i({success:!1})}}function s(t){var e=typeof t,i=!!t&&("object"===e||"function"===e)?Object.prototype.toString.call(t):"";return"[object Function]"===i||"[object GeneratorFunction]"===i}function r(t,e){return delete(t=Object.assign({},t))[e],t}function a(t){n("//"+(i||l)+"/api/device-tracker-id",t)}function c(e){a(function(t){t.success&&t.data["device-tracker-id"]?h.setItem(v.deviceTracker.name,t.data["device-tracker-id"],v.deviceTracker.expiry,v.deviceTracker.path):e()})}function d(t,e){function i(){n<t?(setTimeout(function(){c(i)},2e3),n++):e()}var n=1;c(i)}function u(){return{"event-type":"ad-blocker-detected-event",event:{id:p.v4(),"session-event-id":b._getSessionId(),"page-view-event-id":b._getPageVisitId(),"publisher-id":b.publisherId}}}if(!window.qlitics||!0!==window.qlitics.__inited){"function"!=typeof Object.assign&&(Object.assign=function(t){if(null==t)throw new TypeError("Cannot convert undefined or null to object");t=Object(t);for(var e=1;e<arguments.length;e++){var i=arguments[e];if(null!=i)for(var n in i)Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n])}return t});var h={getItem:function(t){return t&&decodeURIComponent(document.cookie.replace(new RegExp("(?:(?:^|.*;)\\s*"+encodeURIComponent(t).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=\\s*([^;]*).*$)|^.*$"),"$1"))||null},setItem:function(t,e,i,n,o,s){if(!t||/^(?:expires|max\-age|path|domain|secure)$/i.test(t))return!1;var r="";if(i)switch(i.constructor){case Number:r=i===Infinity?"; expires=Fri, 31 Dec 9999 23:59:59 GMT":"; max-age="+i;break;case String:r="; expires="+i;break;case Date:r="; expires="+i.toUTCString()}return document.cookie=encodeURIComponent(t)+"="+encodeURIComponent(e)+r+(o?"; domain="+o:"")+(n?"; path="+n:"")+(s?"; secure":""),!0}},p=y("node-uuid");y("blockadblock");var l="localhost:5001",v={session:{expiry:5400,name:"qtype-session"},deviceTracker:{expiry:new Date("2035-01-01"),name:"thinmint",path:"/",maxRetries:3}},f=["page-view","story-view","story-element-view","story-element-action","story-share"],_=["member-id"],g=["init","set","track"],b={init:function(){this.hasStoryViewHappened=!1,this._trackSession()},set:function(t){if(-1!==_.indexOf(t)){var e="set-"+t;if(s(this[e])){var i=Array.prototype.slice.call(arguments);i.shift(),this[e].apply(this,i)}}},track:function(t){if(-1!==f.indexOf(t)&&s(this[t])){var e=Array.prototype.slice.call(arguments);e.shift(),this[t].apply(this,e)}},_getPageVisitId:function(){return this.pageVisitId||(this.pageVisitId=p.v4()),this.pageVisitId},_getSessionId:function(){return this.sessionId||(this.sessionId=h.getItem(v.session.name)||p.v4(),h.setItem(v.session.name,this.sessionId,v.session.expiry)),this.sessionId},_getPageRandom:function(){return this.pageRandom||(this.pageRandom=p.v4()),this.pageRandom},_trackSession:function(){h.getItem(v.session.name)||this._track("session",{id:this._getSessionId()}),this.sessionId||this._getSessionId()},_track:function(t,e){return{"event-type":t,event:Object.assign({id:p.v4(),"member-id":this.memberId},e,{"publisher-id":this.publisherId})}.event},_createEvent:function(t,e){return{"event-type":t,event:Object.assign({id:p.v4(),"member-id":this.memberId},e,{"publisher-id":this.publisherId})}},_trackEvents:function(t){return t},"set-member-id":function(t){this.memberId=t},"page-view":function(t){this.pageViewEvent=this._track("page-view",Object.assign({id:this._getPageVisitId(),"session-event-id":this._getSessionId(),url:window.location.href,referrer:document.referrer},t)),d(v.deviceTracker.maxRetries,function(){console.log("Couldn't set device-tracker-id on current domain")})},"story-view":function(t){if(this.hasStoryViewHappened){var e=this._createEvent("story-view",Object.assign({"session-event-id":this._getSessionId(),"page-view-event-id":this._getPageVisitId()},t)),i=r(this.pageViewEvent,"id"),n=this._createEvent("page-view",Object.assign({"parent-page-view-event-id":this._getPageVisitId()},i));this._trackEvents([n,e])}else this._track("story-view",Object.assign({"session-event-id":this._getSessionId(),"page-view-event-id":this._getPageVisitId()},t));this.hasStoryViewHappened=!0},"story-element-view":function(t){this._track("story-element-view",Object.assign({"session-event-id":this._getSessionId(),"page-view-event-id":this._getPageVisitId()},t))},"story-element-action":function(t){this._track("story-element-action",Object.assign({"session-event-id":this._getSessionId(),"page-view-event-id":this._getPageVisitId()},t))},"story-share":function(t){this._track("content-share",Object.assign({"session-event-id":this._getSessionId(),"page-view-event-id":this._getPageVisitId()},t,{"content-type":"story"}))}};b.publisherId=t,b.analyticsHost=i;var m=window.qlitics.q||[];window.qlitics=function(){var t=Array.prototype.slice.call(arguments),e=t.shift();-1!==g.indexOf(e)&&s(b[e])&&b[e].apply(b,t)},m.forEach(function(t){window.qlitics.apply(window.qlitics,t)}),"undefined"==typeof window.blockAdBlock?u():window.blockAdBlock.onDetected(u),window.qlitics.__inited=!0,delete window.makeQliticsFn}}},{blockadblock:2,"node-uuid":3}],2:[function(){var n,t;n=window,(t=function(t){this._options={checkOnLoad:!1,resetOnEnd:!1,loopCheckTime:50,loopMaxNumber:5,baitClass:"pub_300x250 pub_300x250m pub_728x90 text-ad textAd text_ad text_ads text-ads text-ad-links",baitStyle:"width: 1px !important; height: 1px !important; position: absolute !important; left: -10000px !important; top: -1000px !important;",debug:!1},this._var={version:"3.2.1",bait:null,checking:!1,loop:null,loopNumber:0,event:{detected:[],notDetected:[]}},t!==undefined&&this.setOption(t);var e=this,i=function(){setTimeout(function(){!0===e._options.checkOnLoad&&(!0===e._options.debug&&e._log("onload->eventCallback","A check loading is launched"),null===e._var.bait&&e._creatBait(),setTimeout(function(){e.check()},1))},1)};n.addEventListener!==undefined?n.addEventListener("load",i,!1):n.attachEvent("onload",i)}).prototype._options=null,t.prototype._var=null,t.prototype._bait=null,t.prototype._log=function(t,e){console.log("[BlockAdBlock]["+t+"] "+e)},t.prototype.setOption=function(t,e){if(e!==undefined){var i=t;(t={})[i]=e}for(var n in t)this._options[n]=t[n],!0===this._options.debug&&this._log("setOption",'The option "'+n+'" he was assigned to "'+t[n]+'"');return this},t.prototype._creatBait=function(){var t=document.createElement("div");t.setAttribute("class",this._options.baitClass),t.setAttribute("style",this._options.baitStyle),this._var.bait=n.document.body.appendChild(t),this._var.bait.offsetParent,this._var.bait.offsetHeight,this._var.bait.offsetLeft,this._var.bait.offsetTop,this._var.bait.offsetWidth,this._var.bait.clientHeight,this._var.bait.clientWidth,!0===this._options.debug&&this._log("_creatBait","Bait has been created")},t.prototype._destroyBait=function(){n.document.body.removeChild(this._var.bait),!(this._var.bait=null)===this._options.debug&&this._log("_destroyBait","Bait has been removed")},t.prototype.check=function(t){if(t===undefined&&(t=!0),!0===this._options.debug&&this._log("check","An audit was requested "+(!0===t?"with a":"without")+" loop"),!0===this._var.checking)return!0===this._options.debug&&this._log("check","A check was canceled because there is already an ongoing"),!1;this._var.checking=!0,null===this._var.bait&&this._creatBait();var e=this;return!(this._var.loopNumber=0)===t&&(this._var.loop=setInterval(function(){e._checkBait(t)},this._options.loopCheckTime)),setTimeout(function(){e._checkBait(t)},1),!0===this._options.debug&&this._log("check","A check is in progress ..."),!0},t.prototype._checkBait=function(t){var e=!1;if(null===this._var.bait&&this._creatBait(),null===n.document.body.getAttribute("abp")&&null!==this._var.bait.offsetParent&&0!=this._var.bait.offsetHeight&&0!=this._var.bait.offsetLeft&&0!=this._var.bait.offsetTop&&0!=this._var.bait.offsetWidth&&0!=this._var.bait.clientHeight&&0!=this._var.bait.clientWidth||(e=!0),n.getComputedStyle!==undefined){var i=n.getComputedStyle(this._var.bait,null);!i||"none"!=i.getPropertyValue("display")&&"hidden"!=i.getPropertyValue("visibility")||(e=!0)}!0===this._options.debug&&this._log("_checkBait","A check ("+(this._var.loopNumber+1)+"/"+this._options.loopMaxNumber+" ~"+(1+this._var.loopNumber*this._options.loopCheckTime)+"ms) was conducted and detection is "+(!0===e?"positive":"negative")),!0===t&&(this._var.loopNumber++,this._var.loopNumber>=this._options.loopMaxNumber&&this._stopLoop()),!0===e?(this._stopLoop(),this._destroyBait(),this.emitEvent(!0),!0===t&&(this._var.checking=!1)):null!==this._var.loop&&!1!==t||(this._destroyBait(),this.emitEvent(!1),!0===t&&(this._var.checking=!1))},t.prototype._stopLoop=function(){clearInterval(this._var.loop),this._var.loop=null,!(this._var.loopNumber=0)===this._options.debug&&this._log("_stopLoop","A loop has been stopped")},t.prototype.emitEvent=function(t){!0===this._options.debug&&this._log("emitEvent","An event with a "+(!0===t?"positive":"negative")+" detection was called");var e=this._var.event[!0===t?"detected":"notDetected"];for(var i in e)!0===this._options.debug&&this._log("emitEvent","Call function "+(parseInt(i)+1)+"/"+e.length),e.hasOwnProperty(i)&&e[i]();return!0===this._options.resetOnEnd&&this.clearEvent(),this},t.prototype.clearEvent=function(){this._var.event.detected=[],this._var.event.notDetected=[],!0===this._options.debug&&this._log("clearEvent","The event list has been cleared")},t.prototype.on=function(t,e){return this._var.event[!0===t?"detected":"notDetected"].push(e),!0===this._options.debug&&this._log("on",'A type of event "'+(!0===t?"detected":"notDetected")+'" was added'),this},t.prototype.onDetected=function(t){return this.on(!0,t)},t.prototype.onNotDetected=function(t){return this.on(!1,t)},n.BlockAdBlock=t,n.blockAdBlock===undefined&&(n.blockAdBlock=new t({checkOnLoad:!0,resetOnEnd:!0}))},{}],3:[function(t,k){(function(){function t(t,e,i){var n=e&&i||0,o=0;for(e=e||[],t.toLowerCase().replace(/[0-9a-f]{2}/g,function(t){o<16&&(e[n+o++]=h[t])});o<16;)e[n+o++]=0;return e}function l(t,e){var i=e||0,n=u;return n[t[i++]]+n[t[i++]]+n[t[i++]]+n[t[i++]]+"-"+n[t[i++]]+n[t[i++]]+"-"+n[t[i++]]+n[t[i++]]+"-"+n[t[i++]]+n[t[i++]]+"-"+n[t[i++]]+n[t[i++]]+n[t[i++]]+n[t[i++]]+n[t[i++]]+n[t[i++]]}function i(t,e,i){var n=e&&i||0,o=e||[],s=null!=(t=t||{}).clockseq?t.clockseq:_,r=null!=t.msecs?t.msecs:(new Date).getTime(),a=null!=t.nsecs?t.nsecs:b+1,c=r-g+(a-b)/1e4;if(c<0&&null==t.clockseq&&(s=s+1&16383),(c<0||g<r)&&null==t.nsecs&&(a=0),1e4<=a)throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");g=r,_=s;var d=(1e4*(268435455&(r+=122192928e5))+(b=a))%4294967296;o[n++]=d>>>24&255,o[n++]=d>>>16&255,o[n++]=d>>>8&255,o[n++]=255&d;var u=r/4294967296*1e4&268435455;o[n++]=u>>>8&255,o[n++]=255&u,o[n++]=u>>>24&15|16,o[n++]=u>>>16&255,o[n++]=s>>>8|128,o[n++]=255&s;for(var h=t.node||f,p=0;p<6;p++)o[n+p]=h[p];return e||l(o)}function n(t,e,i){var n=e&&i||0;"string"==typeof t&&(e="binary"==t?new d(16):null,t=null);var o=(t=t||{}).random||(t.rng||r)();if(o[6]=15&o[6]|64,o[8]=63&o[8]|128,e)for(var s=0;s<16;s++)e[n+s]=o[s];return e||l(o)}var r,o=this;if("function"==typeof o.require)try{var s=o.require("crypto").randomBytes;r=s&&function(){return s(16)}}catch(e){}if(!r&&o.crypto&&crypto.getRandomValues){var a=new Uint8Array(16);r=function w(){return crypto.getRandomValues(a),a}}if(!r){var c=new Array(16);r=function(){for(var t,e=0;e<16;e++)0==(3&e)&&(t=4294967296*Math.random()),c[e]=t>>>((3&e)<<3)&255;return c}}for(var d="function"==typeof o.Buffer?o.Buffer:Array,u=[],h={},p=0;p<256;p++)u[p]=(p+256).toString(16).substr(1),h[u[p]]=p;var v=r(),f=[1|v[0],v[1],v[2],v[3],v[4],v[5]],_=16383&(v[6]<<8|v[7]),g=0,b=0,m=n;if(m.v1=i,m.v4=n,m.parse=t,m.unparse=l,m.BufferClass=d,void 0!==k&&k.exports)k.exports=m;else if("function"==typeof define&&define.amd)define(function(){return m});else{var y=o.uuid;m.noConflict=function(){return o.uuid=y,m},o.uuid=m}}).call(this)},{}]},{},[1]);; window.makeQliticsFn(5591, 'prod-analytics.qlitics.com');