!function(e,n){function t(e,n){return Object.prototype.hasOwnProperty.call(e,n)}function r(e){return void 0===e}if(e){var i={},c=e.TraceKit,l=[].slice,u="?";i.noConflict=function(){return e.TraceKit=c,i},i.wrap=function(e){function n(){try{return e.apply(this,arguments)}catch(e){throw i.report(e),e}}return n},i.report=function(){function n(e){o(),m.push(e)}function r(e){for(var n=m.length-1;n>=0;--n)m[n]===e&&m.splice(n,1)}function c(e,n){var r=null;if(!n||i.collectWindowErrors){for(var c in m)if(t(m,c))try{m[c].apply(null,[e].concat(l.call(arguments,2)))}catch(e){r=e}if(r)throw r}}function u(e,n,t,r,l){var u=null;if(h)i.computeStackTrace.augmentStackTraceWithInitialElement(h,n,t,e),a();else if(l)u=i.computeStackTrace(l),c(u,!0);else{var o={url:n,line:t,column:r};o.func=i.computeStackTrace.guessFunctionName(o.url,o.line),o.context=i.computeStackTrace.gatherContext(o.url,o.line),u={mode:"onerror",message:e,stack:[o]},c(u,!0)}return!!f&&f.apply(this,arguments)}function o(){p!==!0&&(f=e.onerror,e.onerror=u,p=!0)}function a(){var e=h,n=d;d=null,h=null,g=null,c.apply(null,[e,!1].concat(n))}function s(n){if(h){if(g===n)return;a()}var t=i.computeStackTrace(n);throw h=t,g=n,d=l.call(arguments,1),e.setTimeout(function(){g===n&&a()},t.incomplete?2e3:0),n}var f,p,m=[],d=null,g=null,h=null;return s.subscribe=n,s.unsubscribe=r,s}(),i.computeStackTrace=function(){function n(n){if(!i.remoteFetching)return"";try{var t=function(){try{return new e.XMLHttpRequest}catch(n){return new e.ActiveXObject("Microsoft.XMLHTTP")}}();return t.open("GET",n,!1),t.send(""),t.responseText}catch(e){return""}}function c(r){if("string"!=typeof r)return[];if(!t(y,r)){var i="",c="";try{c=e.document.domain}catch(e){}var l=/(.*)\:\/\/([^:\/]+)([:\d]*)\/{0,1}([\s\S]*)/.exec(r);l&&l[2]===c&&(i=n(r)),y[r]=i?i.split("\n"):[]}return y[r]}function l(e,n){var t,i=/function ([^(]*)\(([^)]*)\)/,l=/['"]?([0-9A-Za-z$_]+)['"]?\s*[:=]\s*(function|eval|new Function)/,o="",a=c(e);if(!a.length)return u;for(var s=0;s<10;++s)if(o=a[n-s]+o,!r(o)){if(t=l.exec(o))return t[1];if(t=i.exec(o))return t[1]}return u}function o(e,n){var t=c(e);if(!t.length)return null;var l=[],u=Math.floor(i.linesOfContext/2),o=u+i.linesOfContext%2,a=Math.max(0,n-u-1),s=Math.min(t.length,n+o-1);n-=1;for(var f=a;f<s;++f)r(t[f])||l.push(t[f]);return l.length>0?l:null}function a(e){return e.replace(/[\-\[\]{}()*+?.,\\\^$|#]/g,"\\$&")}function s(e){return a(e).replace("<","(?:<|&lt;)").replace(">","(?:>|&gt;)").replace("&","(?:&|&amp;)").replace('"','(?:"|&quot;)').replace(/\s+/g,"\\s+")}function f(e,n){for(var t,r,i=0,l=n.length;i<l;++i)if((t=c(n[i])).length&&(t=t.join("\n"),r=e.exec(t)))return{url:n[i],line:t.substring(0,r.index).split("\n").length,column:r.index-t.lastIndexOf("\n",r.index)-1};return null}function p(e,n,t){var r,i=c(n),l=new RegExp("\\b"+a(e)+"\\b");return t-=1,i&&i.length>t&&(r=l.exec(i[t]))?r.index:null}function m(n){if(!r(e&&e.document)){for(var t,i,c,l,u=[e.location.href],o=e.document.getElementsByTagName("script"),p=""+n,m=/^function(?:\s+([\w$]+))?\s*\(([\w\s,]*)\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,d=/^function on([\w$]+)\s*\(event\)\s*\{\s*(\S[\s\S]*\S)\s*\}\s*$/,g=0;g<o.length;++g){var h=o[g];h.src&&u.push(h.src)}if(c=m.exec(p)){var v=c[1]?"\\s+"+c[1]:"",x=c[2].split(",").join("\\s*,\\s*");t=a(c[3]).replace(/;$/,";?"),i=new RegExp("function"+v+"\\s*\\(\\s*"+x+"\\s*\\)\\s*{\\s*"+t+"\\s*}")}else i=new RegExp(a(p).replace(/\s+/g,"\\s+"));if(l=f(i,u))return l;if(c=d.exec(p)){var w=c[1];if(t=s(c[2]),i=new RegExp("on"+w+"=[\\'\"]\\s*"+t+"\\s*[\\'\"]","i"),l=f(i,u[0]))return l;if(i=new RegExp(t),l=f(i,u))return l}return null}}function d(e){if(!e.stack)return null;for(var n,t,i=/^\s*at (.*?) ?\(((?:file|https?|blob|chrome-extension|native|webpack|eval).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i,c=/^\s*(.*?)(?:\((.*?)\))?(?:^|@)((?:file|https?|blob|chrome|webpack|\[native).*?)(?::(\d+))?(?::(\d+))?\s*$/i,a=/^\s*at (?:((?:\[object object\])?.+) )?\(?((?:ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i,s=e.stack.split("\n"),f=[],m=/^(.*) is undefined$/.exec(e.message),d=0,g=s.length;d<g;++d){if(n=i.exec(s[d])){var h=n[2]&&n[2].indexOf("native")!==-1;t={url:h?null:n[2],func:n[1]||u,args:h?[n[2]]:[],line:n[3]?+n[3]:null,column:n[4]?+n[4]:null}}else if(n=a.exec(s[d]))t={url:n[2],func:n[1]||u,args:[],line:+n[3],column:n[4]?+n[4]:null};else{if(!(n=c.exec(s[d])))continue;t={url:n[3],func:n[1]||u,args:n[2]?n[2].split(","):[],line:n[4]?+n[4]:null,column:n[5]?+n[5]:null}}!t.func&&t.line&&(t.func=l(t.url,t.line)),t.line&&(t.context=o(t.url,t.line)),f.push(t)}return f.length?(f[0]&&f[0].line&&!f[0].column&&m?f[0].column=p(m[1],f[0].url,f[0].line):f[0].column||r(e.columnNumber)||(f[0].column=e.columnNumber+1),{mode:"stack",name:e.name,message:e.message,stack:f}):null}function g(e){var n=e.stacktrace;if(n){for(var t,r=/ line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i,i=/ line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i,c=n.split("\n"),u=[],a=0;a<c.length;a+=2){var s=null;if((t=r.exec(c[a]))?s={url:t[2],line:+t[1],column:null,func:t[3],args:[]}:(t=i.exec(c[a]))&&(s={url:t[6],line:+t[1],column:+t[2],func:t[3]||t[4],args:t[5]?t[5].split(","):[]}),s){if(!s.func&&s.line&&(s.func=l(s.url,s.line)),s.line)try{s.context=o(s.url,s.line)}catch(e){}s.context||(s.context=[c[a+1]]),u.push(s)}}return u.length?{mode:"stacktrace",name:e.name,message:e.message,stack:u}:null}}function h(n){var r=n.message.split("\n");if(r.length<4)return null;var i,u=/^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,a=/^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,p=/^\s*Line (\d+) of function script\s*$/i,m=[],d=e&&e.document&&e.document.getElementsByTagName("script"),g=[];for(var h in d)t(d,h)&&!d[h].src&&g.push(d[h]);for(var v=2;v<r.length;v+=2){var x=null;if(i=u.exec(r[v]))x={url:i[2],func:i[3],args:[],line:+i[1],column:null};else if(i=a.exec(r[v])){x={url:i[3],func:i[4],args:[],line:+i[1],column:null};var w=+i[1],b=g[i[2]-1];if(b){var k=c(x.url);if(k){k=k.join("\n");var y=k.indexOf(b.innerText);y>=0&&(x.line=w+k.substring(0,y).split("\n").length)}}}else if(i=p.exec(r[v])){var T=e.location.href.replace(/#.*$/,""),S=new RegExp(s(r[v+1])),E=f(S,[T]);x={url:T,func:"",args:[],line:E?E.line:i[1],column:null}}if(x){x.func||(x.func=l(x.url,x.line));var $=o(x.url,x.line),O=$?$[Math.floor($.length/2)]:null;$&&O.replace(/^\s*/,"")===r[v+1].replace(/^\s*/,"")?x.context=$:x.context=[r[v+1]],m.push(x)}}return m.length?{mode:"multiline",name:n.name,message:r[0],stack:m}:null}function v(e,n,t,r){var i={url:n,line:t};if(i.url&&i.line){e.incomplete=!1,i.func||(i.func=l(i.url,i.line)),i.context||(i.context=o(i.url,i.line));var c=/ '([^']+)' /.exec(r);if(c&&(i.column=p(c[1],i.url,i.line)),e.stack.length>0&&e.stack[0].url===i.url){if(e.stack[0].line===i.line)return!1;if(!e.stack[0].line&&e.stack[0].func===i.func)return e.stack[0].line=i.line,e.stack[0].context=i.context,!1}return e.stack.unshift(i),e.partial=!0,!0}return e.incomplete=!0,!1}function x(e,n){for(var t,r,c,o=/function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i,a=[],s={},f=!1,d=x.caller;d&&!f;d=d.caller)if(d!==w&&d!==i.report){if(r={url:null,func:u,args:[],line:null,column:null},d.name?r.func=d.name:(t=o.exec(d.toString()))&&(r.func=t[1]),void 0===r.func)try{r.func=t.input.substring(0,t.input.indexOf("{"))}catch(e){}if(c=m(d)){r.url=c.url,r.line=c.line,r.func===u&&(r.func=l(r.url,r.line));var g=/ '([^']+)' /.exec(e.message||e.description);g&&(r.column=p(g[1],c.url,c.line))}s[""+d]?f=!0:s[""+d]=!0,a.push(r)}n&&a.splice(0,n);var h={mode:"callers",name:e.name,message:e.message,stack:a};return v(h,e.sourceURL||e.fileName,e.line||e.lineNumber,e.message||e.description),h}function w(e,n){var t=null;n=null==n?0:+n;try{if(t=g(e))return t}catch(e){if(k)throw e}try{if(t=d(e))return t}catch(e){if(k)throw e}try{if(t=h(e))return t}catch(e){if(k)throw e}try{if(t=x(e,n+1))return t}catch(e){if(k)throw e}return{mode:"failed"}}function b(e){e=1+(null==e?0:+e);try{throw new Error}catch(n){return w(n,e+1)}}var k=!1,y={};return w.augmentStackTraceWithInitialElement=v,w.guessFunctionName=l,w.gatherContext=o,w.ofCaller=b,w.getSource=c,w}(),i.extendToAsynchronousCallbacks=function(){var n=function(n){var t=e[n];e[n]=function(){var e=l.call(arguments),n=e[0];return"function"==typeof n&&(e[0]=i.wrap(n)),t.apply?t.apply(this,e):t(e[0],e[1])}};n("setTimeout"),n("setInterval")},i.remoteFetching||(i.remoteFetching=!0),i.collectWindowErrors||(i.collectWindowErrors=!0),(!i.linesOfContext||i.linesOfContext<1)&&(i.linesOfContext=11),"undefined"!=typeof module&&module.exports&&e.module!==module?module.exports=i:"function"==typeof define&&define.amd?define("TraceKit",[],i):e.TraceKit=i}}("undefined"!=typeof window?window:global),function(e){function n(){for(var e=document.querySelectorAll("script"),n=0;n<e.length;n++){var t=e[n];if(t.src.indexOf("ion-monitor")>=0)return t}}function t(){var e=n();return e&&"true"===e.getAttribute("data-dev")}function r(e){(e=c(e))&&(f.push(e),a||(a=setTimeout(function(){l()},2e3)))}function i(n){e.TraceKit.report(n)}function c(n){var t=e.TraceKit.computeStackTrace(n);n.stack=t,(n.url||n.headers)&&(n.isHttp=!0),n.timestamp=new Date;for(var r=n.stack,i=0,c=r;i<c.length;i++){var l=c[i];l.context=null,delete l.context}return n}function l(){clearTimeout(a),a=null;var n=e.angular?"angular1":"angular2";e.fetch(g+"/tracking/exceptions",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({app_id:m,framework:n,device:p,errors:f.slice()})}),f.length=0}function u(){var n=e.navigator;return{browserProduct:n.product,browserAppVersion:n.appVersion,browserUserAgent:n.userAgent,browserPlatform:n.platform,browserLanguage:n.language,browserAppName:n.appName,browserAppCodeName:n.appCodeName,viewportWidth:Math.max(document.documentElement.clientWidth,e.innerWidth||0),viewportHeight:Math.max(document.documentElement.clientHeight,e.innerHeight||0),utcOffset:-((new Date).getTimezoneOffset()/60)}}function o(){return new Promise(function(n,t){var r={},i=e.device;if(i&&(r={model:i.model,platform:i.platform,uuid:i.uuid,osVersion:i.version,serial:i.serial,manufacturer:i.manufacturer,isNative:!0}),Object.assign(r,u()),!e.IonicCordovaCommon)return n(r);e.IonicCordovaCommon.getAppInfo(function(e){var t=Object.assign(r,e);n(t)},function(e){t(e)})})}var a,s=e.Ionic=e.Ionic||{},f=[],p=u(),m=function(){var e=n();return e&&e.getAttribute("data-app-id")}(),d=t(),g=function(){return t()?"http://localhost:7000":"https://api.ionic.io"}();console.log("Ionic Error Logging - App: ",m," Dev mode?",d),e.cordova?document.addEventListener("deviceready",function(){o().then(function(e){p=e})}):e.addEventListener("load",function(){o().then(function(e){p=e})}),e.TraceKit.remoteFetching=!1,e.TraceKit.report.subscribe(function(e){r(e)}),s.handleError=r,s.handleNewError=i,e.angular&&e.angular.module("ionic").config(["$provide",function(n){n.decorator("$exceptionHandler",["$delegate",function(n){return function(t,r){n(t,r),t.message=t.stack,e.Ionic.handleNewError(t)}}])}])}(window);