//! Likely 2.0.8 by Ilya Birman, ilyabirman.net
//! Rewritten sans jQuery by Evgeny Steblinsky, volter9.github.io
//! Inspired by Social Likes by Artem Sapegin, http://sapegin.me
//! Fork for tjournal.ru by Valery Sittsov, valerypatorius.github.io
!function t(e,i,n){function o(c,s){if(!i[c]){if(!e[c]){var u="function"==typeof require&&require;if(!s&&u)return u(c,!0);if(r)return r(c,!0);throw new Error("Cannot find module '"+c+"'")}var a=i[c]={exports:{}};e[c][0].call(a.exports,function(t){var i=e[c][1][t];return o(i?i:t)},a,a.exports,t,e,i,n)}return i[c].exports}for(var r="function"==typeof require&&require,c=0;c<n.length;c++)o(n[c]);return o}({1:[function(t,e){function i(t,e,i){this.widget=t,this.likely=e,this.options=c.merge(i),this.init()}var n=t("./services"),o=t("./config"),r=t("./fetch"),c=t("./utils"),s=t("./dom"),u='<span class="{className}">{content}</span>';i.prototype={init:function(){this.detectService(),this.detectParams(),this.service&&(this.initHtml(),setTimeout(this.initCounter.bind(this),0))},update:function(t){var e="."+o.prefix+"counter";counters=s.findAll(e,this.widget),c.extend(this.options,c.merge({forceUpdate:!1},t)),c.toArray(counters).forEach(function(t){t.parentNode.removeChild(t)}),this.initCounter()},detectService:function(){var t=this.widget,e=c.getDataset(t).service;if(!e){for(var i=t.className.split(" "),o=0;o<i.length&&!(i[o]in n);o++);e=i[o]}e&&(this.service=e,c.extend(this.options,n[e]))},detectParams:function(){var t=this.options,e=c.getDataset(this.widget);if(e.counter){var i=parseInt(e.counter,10);isNaN(i)?t.counterUrl=e.counter:t.counterNumber=i}t.title=e.title||t.title,t.url=e.url||t.url},initHtml:function(){var t=this.options,e=this.widget,i=e.innerHTML;e.addEventListener("click",this.click.bind(this)),e.classList.remove(this.service),e.className+=" "+this.className("widget");var n=c.template(u,{className:this.className("button"),content:i}),o=c.template(u,{className:this.className("icon"),content:s.wrapSVG(t.svgi)});e.innerHTML=o+n},initCounter:function(){var t=this.options;t.counters&&t.counterNumber?this.updateCounter(t.counterNumber):t.counterUrl&&r(this.service,t.url,t)(this.updateCounter.bind(this))},className:function(t){var e=o.prefix+t;return e+" "+e+"--"+this.service},updateCounter:function(t){t=parseInt(t,10)||0;var e=s.find("."+o.name+"__counter",this.widget);e&&e.parentNode.removeChild(e);var i={className:this.className("counter"),content:t};t||this.options.zeroes||(i.className+=" "+o.prefix+"counter--empty",i.content=""),this.widget.appendChild(s.createNode(c.template(u,i))),this.likely.updateCounter(this.service,t)},click:function(){var t=this.options;if("more"==this.service)this.widget.classList.toggle("active"),this.widget.parentElement.classList.toggle(this.options.className);else if("email"==this.service){var e=c.makeUrl(t.popupUrl,{url:t.url,title:t.title});window.location=e}else if(t.click.call(this)){var i=this.likely.container.dataset.twitter,n=this.likely.container.dataset.twitterUrl,e=c.makeUrl(t.popupUrl,{url:"twitter"==this.service&&""!=n&&void 0!=n?n:t.url,title:"twitter"==this.service&&""!=i&&void 0!=i?i:t.title});s.openPopup(this.addAdditionalParamsToUrl(e),o.prefix+this.service,t.popupWidth,t.popupHeight)}return!1},addAdditionalParamsToUrl:function(t){var e=c.query(c.merge(this.widget.dataset,this.options.data)),i=-1===t.indexOf("?")?"?":"&";return""===e?t:t+i+e}},e.exports=i},{"./config":2,"./dom":3,"./fetch":6,"./services":12,"./utils":22}],2:[function(t,e){var i="https:"===window.location.protocol;e.exports={name:"likely",prefix:"likely__",secure:i,protocol:i?"https:":"http:"}},{}],3:[function(t,e){var i=document.createElement("div"),n=0,o=e.exports={wrapSVG:function(t){return'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M'+t+'z"/></svg>'},createNode:function(t){return i.innerHTML=t,i.children[0]},getScript:function(t){var e=document.createElement("script"),i=document.head;e.type="text/javascript",e.src=t,i.appendChild(e),i.removeChild(e)},getJSON:function(t,e){var i=encodeURIComponent("random_fun_"+ ++n);t=t.replace(/callback=(\?)/,"callback="+i),window[i]=e,o.getScript(t)},find:function(t,e){return(e||document).querySelector(t)},findAll:function(t,e){return(e||document).querySelectorAll(t)},openPopup:function(t,e,i,n){var o=Math.round(screen.width/2-i/2),r=0;screen.height>n&&(r=Math.round(screen.height/3-n/2));var c="left="+o+",top="+r+",width="+i+",height="+n+",personalbar=0,toolbar=0,scrollbars=1,resizable=1",s=window.open(t,e,c);return s?(s.focus(),s):location.href=t}}},{}],4:[function(t,e){e.exports=function(t){var e=[];return function(i){var n=typeof i;return"undefined"==n?t:void("function"==n?e.push(i):(t=i,e.forEach(function(t){t(i)})))}}},{}],5:[function(t){var e=t("./index.js");window.likely=e,document.addEventListener("DOMContentLoaded",e.initiate)},{"./index.js":7}],6:[function(t,e){var i=t("./services"),n=t("./factory"),o=t("./utils"),r=(t("./dom"),{});e.exports=function(t,e,c){r[t]||(r[t]={});var s=r[t],u=s[e];if(!c.forceUpdate&&u)return u;u=n();var a=o.makeUrl(c.counterUrl,{url:e});return i[t].counter(a,u,e),s[e]=u}},{"./dom":3,"./factory":4,"./services":12,"./utils":22}],7:[function(t,e){"use strict";var i=t("./widget"),n=t("./config"),o=t("./utils"),r=t("./dom"),c=function(t,e){e=e||{};var r=t[n.name];return r?r.update(e):t[n.name]=new i(t,o.merge({},c.defaults,e,o.bools(t))),r};c.initiate=c.initate=function(){var t=r.findAll("."+n.name);o.toArray(t).forEach(c)},c.defaults={counters:!0,timeout:1e3,zeroes:!1,title:document.title,wait:500,url:window.location.href.replace(window.location.hash,"")},e.exports=c},{"./config":2,"./dom":3,"./utils":22,"./widget":23}],8:[function(t,e){var i=t("./dom"),n=function(t,e){var n=this;i.getJSON(t,function(t){try{"function"==typeof n.convertNumber&&(t=n.convertNumber(t)),e(t)}catch(i){}})};e.exports=function(t){t.counter=t.counter||n,t.click=t.click||function(){return!0}}},{"./dom":3}],9:[function(t,e){var i=(t("../config"),{popupUrl:"mailto:?subject={title}&body={url}",popupWidth:0,popupHeight:0});e.exports=i},{"../config":2}],10:[function(t,e){e.exports={counterUrl:"https://graph.facebook.com/?fields=share,og_object{likes.limit(0).summary(true),comments.limit(0).summary(true)}&id={url}&callback=?",convertNumber:function(t){return t.share.share_count},popupUrl:"https://www.facebook.com/sharer/sharer.php?u={url}",popupWidth:600,popupHeight:500}},{}],11:[function(t,e){var i=(t("../config"),t("../utils"),t("../dom"),{counterUrl:"https://share.yandex.net/counter/gpp/?url={url}&callback=?",gid:0,promises:{},popupUrl:"https://plus.google.com/share?url={url}",popupWidth:700,popupHeight:500});e.exports=i},{"../config":2,"../dom":3,"../utils":22}],12:[function(t,e){var i=t("../service"),n=t("../utils"),o=t("../svg.json"),r={odnoklassniki:t("./odnoklassniki"),vkontakte:t("./vk"),facebook:t("./facebook"),twitter:t("./twitter"),gplus:t("./gplus"),pocket:t("./pocket"),telegram:t("./telegram"),whatsapp:t("./whatsapp"),viber:t("./viber"),email:t("./email"),more:t("./more")};n.each(r,function(t,e){i(t),t.svgi=o[e],t.name=e}),e.exports=r},{"../service":8,"../svg.json":21,"../utils":22,"./email":9,"./facebook":10,"./gplus":11,"./more":13,"./odnoklassniki":14,"./pocket":15,"./telegram":16,"./twitter":17,"./viber":18,"./vk":19,"./whatsapp":20}],13:[function(t,e){var i=t("../config");e.exports={parent:i.name,className:i.name+"--expanded"}},{"../config":2}],14:[function(t,e){var i=t("../config"),n=t("../utils"),o=t("../dom"),r={counterUrl:i.secure?void 0:"http://connect.ok.ru/dk?st.cmd=extLike&ref={url}&uid={index}",counter:function(t,e){this.promises.push(e),o.getScript(n.makeUrl(t,{index:this.promises.length-1}))},promises:[],popupUrl:"http://connect.ok.ru/dk?st.cmd=WidgetSharePreview&service=odnoklassniki&st.shareUrl={url}",popupWidth:640,popupHeight:400};n.set(window,"ODKL.updateCount",function(t,e){r.promises[t](e)}),e.exports=r},{"../config":2,"../dom":3,"../utils":22}],15:[function(t,e){var i=t("../config"),n={popupUrl:i.protocol+"//getpocket.com/save?url={url}&format=json&callback=?",popupWidth:600,popupHeight:300};e.exports=n},{"../config":2}],16:[function(t,e){e.exports={popupUrl:"tg://msg?text={title}%0A{url}",popupWidth:600,popupHeight:450}},{}],17:[function(t,e){var i=t("../config"),n={counterUrl:"https://openshare.the.tj/count.json?url={url}",counter:function(t,e){var i=new XMLHttpRequest;i.open("GET",t,!0),i.onload=function(){if(this.status>=200&&this.status<400){var t=JSON.parse(this.response);count=t.count,e(count)}},i.send()},popupUrl:i.protocol+"//twitter.com/intent/tweet?url={url}&text={title}",popupWidth:600,popupHeight:450,click:function(){return/[\.\?:\-–—]\s*$/.test(this.options.title)||(this.options.title+=":"),!0}};e.exports=n},{"../config":2}],18:[function(t,e){e.exports={popupUrl:"viber://forward?text={title}%0A{url}",popupWidth:600,popupHeight:450}},{}],19:[function(t,e){var i=t("../config"),n=t("../utils"),o=t("../dom"),r={counterUrl:"https://vk.com/share.php?act=count&url={url}&index={index}",counter:function(t,e){this.promises.push(e),o.getScript(n.makeUrl(t,{index:this.promises.length-1}))},promises:[],popupUrl:i.protocol+"//vk.com/share.php?url={url}&title={title}",popupWidth:550,popupHeight:330};n.set(window,"VK.Share.count",function(t,e){r.promises[t](e)}),e.exports=r},{"../config":2,"../dom":3,"../utils":22}],20:[function(t,e){e.exports={popupUrl:"whatsapp://send?text={title}%0A{url}",popupWidth:600,popupHeight:450}},{}],21:[function(t,e){e.exports={facebook:"5.9 16h3.3V8h2.2l.3-2.8H9.2V3.8c0-.7.1-1.1 1.1-1.1h1.4V0H9.5C6.9 0 5.9 1.3 5.9 3.6v1.7H4.3V8H6v8",twitter:"15.96 3.42c-.04.153-.144.31-.237.414l-.118.058v.118l-.59.532-.237.295c-.05.036-.398.21-.413.237V6.49h-.06v.473h-.058v.294h-.058v.296h-.06v.235h-.06v.237h-.058c-.1.355-.197.71-.295 1.064h-.06v.116h-.06c-.02.1-.04.197-.058.296h-.06c-.04.118-.08.237-.118.355h-.06c-.038.118-.078.236-.117.353l-.118.06-.06.235-.117.06v.116l-.118.06v.12h-.06c-.02.057-.038.117-.058.175l-.118.06v.117c-.06.04-.118.08-.177.118v.118l-.237.177v.118l-.59.53-.532.592h-.117c-.06.078-.118.156-.177.236l-.177.06-.06.117h-.118l-.06.118-.176.06v.058h-.118l-.06.118-.353.12-.06.117c-.078.02-.156.04-.235.058v.06c-.118.038-.236.078-.354.118v.058H8.76v.06h-.12v.06h-.176v.058h-.118v.06H8.17v.058H7.99v.06l-.413.058v.06h-.237c-.667.22-1.455.293-2.36.293h-.886v-.058h-.53v-.06H3.27v-.06h-.295v-.06H2.68v-.057h-.177v-.06h-.236v-.058H2.09v-.06h-.177v-.058h-.177v-.06H1.56v-.058h-.12v-.06l-.294-.06v-.057c-.118-.04-.236-.08-.355-.118v-.06H.674v-.058H.555v-.06H.437v-.058H.32l-.06-.12H.142v-.058c-.13-.08-.083.026-.177-.118H1.56v-.06c.294-.04.59-.077.884-.117v-.06h.177v-.058h.237v-.06h.118v-.06h.177v-.057h.118v-.06h.177v-.058l.236-.06v-.058l.236-.06c.02-.038.04-.078.058-.117l.237-.06c.02-.04.04-.077.058-.117h.118l.06-.118h.118c.036-.025.047-.078.118-.118V12.1c-1.02-.08-1.84-.54-2.303-1.183-.08-.058-.157-.118-.236-.176v-.117l-.118-.06v-.117c-.115-.202-.268-.355-.296-.65.453.004.987.008 1.354-.06v-.06c-.254-.008-.47-.08-.65-.175v-.058H2.32v-.06c-.08-.02-.157-.04-.236-.058l-.06-.118h-.117l-.118-.178h-.12c-.077-.098-.156-.196-.235-.294l-.118-.06v-.117l-.177-.12c-.35-.502-.6-1.15-.59-2.006h.06c.204.234.948.377 1.357.415v-.06c-.257-.118-.676-.54-.827-.768V5.9l-.118-.06c-.04-.117-.08-.236-.118-.354h-.06v-.118H.787c-.04-.196-.08-.394-.118-.59-.06-.19-.206-.697-.118-1.005h.06V3.36h.058v-.177h.06v-.177h.057V2.83h.06c.04-.118.078-.236.117-.355h.118v.06c.12.097.237.196.355.295v.118l.118.058c.08.098.157.197.236.295l.176.06.354.413h.118l.177.236h.118l.06.117h.117c.04.06.08.118.118.177h.118l.06.118.235.06.06.117.356.12.06.117.53.176v.06h.118v.058l.236.06v.06c.118.02.236.04.355.058v.06h.177v.058h.177v.06h.176v.058h.236v.06l.472.057v.06l1.417.18v-.237c-.1-.112-.058-.442-.057-.65 0-.573.15-.99.354-1.358v-.117l.118-.06.06-.235.176-.118v-.118c.14-.118.276-.236.414-.355l.06-.117h.117l.12-.177.235-.06.06-.117h.117v-.058H9.7v-.058h.177v-.06h.177v-.058h.177v-.06h.296v-.058h1.063v.058h.294v.06h.177v.058h.178v.06h.177v.058h.118v.06h.118l.06.117c.08.018.158.038.236.058.04.06.08.118.118.177h.118l.06.117c.142.133.193.163.472.178.136-.12.283-.05.472-.118v-.06h.177v-.058h.177v-.06l.236-.058v-.06h.177l.59-.352v.176h-.058l-.06.295h-.058v.117h-.06v.118l-.117.06v.118l-.177.118v.117l-.118.06-.354.412h-.117l-.177.236h.06c.13-.112.402-.053.59-.117l1.063-.353",vkontakte:"7.8 12.4h.9s.3 0 .4-.2c.1-.1.1-.4.1-.4s0-1.3.6-1.4c.6-.2 1.3 1.2 2.1 1.7.6.4 1 .3 1 .3H15s1.1-.1.6-.9c0-.1-.3-.6-1.6-1.8-1.3-1.2-1.1-1 .4-3.1 1-1.3 1.3-2.1 1.2-2.4.1-.3-.6-.3-.6-.3h-2.4s-.2 0-.3.1c-.1.1-.2.3-.2.3s-.4 1-.9 1.8c-1 1.8-1.5 1.9-1.6 1.8-.4-.3-.3-1-.3-1.6 0-1.7.3-2.4-.5-2.6-.3-.1-.4-.2-1.1-.2-.8 0-1.5 0-2 .2-.2.2-.4.5-.3.5.2 0 .5.1.7.3.2.3.2 1.1.2 1.1s.1 2-.3 2.3c-.3.1-.7-.2-1.7-1.8-.5-.8-.8-1.8-.8-1.8l-.2-.2-.4-.2H.7s-.3 0-.5.2c-.1.1 0 .4 0 .4S2 8.6 4 10.7c1.8 1.8 3.8 1.7 3.8 1.7",gplus:"8,6.5v3h4.291c-0.526,2.01-2.093,3.476-4.315,3.476C5.228,12.976,3,10.748,3,8c0-2.748,2.228-4.976,4.976-4.976c1.442,0,2.606,0.623,3.397,1.603L13.52,2.48C12.192,0.955,10.276,0,8,0C3.582,0,0,3.582,0,8s3.582,8,8,8s7.5-3.582,7.5-8V6.5H8",odnoklassniki:"8 2.6c.9 0 1.7.7 1.7 1.7C9.7 5.2 9 6 8 6c-.9 0-1.7-.7-1.7-1.7S7.1 2.6 8 2.6zm0 5.7c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4zm1.6 3.2c.8-.2 1.6-.5 2.3-1 .5-.3.7-1.1.4-1.6-.3-.6-1.1-.7-1.6-.4-1.6 1-3.8 1-5.4 0-.6-.3-1.3-.1-1.6.4-.4.6-.2 1.3.3 1.7.7.5 1.5.8 2.3 1l-2.2 2.2c-.5.5-.5 1.2 0 1.7.2.2.5.3.8.3.3 0 .6-.1.8-.3L8 13.2l2.2 2.2c.5.5 1.2.5 1.7 0s.5-1.2 0-1.7l-2.3-2.2",pocket:"12.533 6.864L8.77 10.4c-.213.2-.486.3-.76.3-.273 0-.547-.1-.76-.3L3.488 6.865c-.437-.41-.45-1.09-.032-1.52.42-.428 1.114-.443 1.55-.032l3.006 2.823 3.004-2.823c.438-.41 1.132-.396 1.55.032.42.43.406 1.11-.03 1.52zm3.388-4.928c-.207-.56-.755-.936-1.363-.936H1.45C.854 1 .31 1.368.096 1.917.032 2.08 0 2.25 0 2.422v4.73l.055.94c.232 2.14 1.366 4.01 3.12 5.314.03.024.063.047.094.07l.02.013c.94.673 1.992 1.13 3.128 1.353.524.104 1.06.157 1.592.157.492 0 .986-.045 1.472-.133.058-.01.116-.022.175-.034.016-.003.033-.01.05-.018 1.088-.233 2.098-.677 3.003-1.326l.02-.015c.032-.022.064-.045.096-.07 1.753-1.303 2.887-3.173 3.12-5.312l.054-.94v-4.73c0-.165-.02-.327-.08-.487",telegram:"12.4 4.2L6.6 9.6c-.2.2-.3.4-.4.7L6 11.8c0 .2-.3.2-.3 0l-.8-2.6c-.1-.4.1-.7.3-.8l7-4.3c.2-.2.4 0 .2.1zm2.9-3L.5 6.9c-.4.1-.4.7 0 .8L4.1 9l1.4 4.5c.1.3.4.4.7.2l2-1.6c.2-.2.5-.2.7 0l3.6 2.6c.3.2.6 0 .7-.3l2.6-12.8c.1-.2-.2-.5-.5-.4",whatsapp:"15.8 7.8c0 4.2-3.4 7.6-7.6 7.6-1.3 0-2.6-.3-3.7-.9L.3 15.8l1.4-4.1C1 10.6.6 9.2.6 7.8.6 3.6 4 .2 8.2.2c4.2 0 7.6 3.4 7.6 7.6M8.1 1.4c-3.5 0-6.4 2.9-6.4 6.4 0 1.4.5 2.7 1.2 3.7l-.8 2.4 2.5-.8c1 .7 2.2 1.1 3.5 1.1 3.5 0 6.4-2.9 6.4-6.4.1-3.5-2.8-6.4-6.4-6.4M12 9.5c0-.1-.2-.1-.4-.2s-1.1-.5-1.3-.6c-.2-.1-.3-.1-.4.1-.1.2-.4.6-.6.7-.1.1-.2.1-.4 0-.1 0-.8-.2-1.5-.8-.6-.5-.9-1.1-1-1.3-.1-.2 0-.3.1-.4l.3-.3c.1-.1.1-.2.2-.3 0-.2 0-.3-.1-.4 0-.1-.4-1-.6-1.4-.1-.3-.3-.2-.4-.2h-.4c-.1 0-.3 0-.5.2-.1.2-.6.6-.6 1.5s.7 1.8.8 1.9c.1.1 1.3 2.1 3.2 2.8 1.9.7 1.9.5 2.2.5.3 0 1.1-.4 1.3-.9.1-.4.1-.8.1-.9",viber:"13.7 6.7c0 .3.1.7-.3.8-.6.1-.5-.4-.5-.8-.4-2.3-1.2-3.2-3.5-3.7-.4-.1-.9 0-.8-.5.1-.5.5-.4.9-.3 2.3.3 4.2 2.3 4.2 4.5zM8.8 1.2c3.7.6 5.5 2.4 5.9 6.1 0 .3-.1.9.4.9s.4-.5.4-.9c0-3.6-3.1-6.8-6.7-7-.2.1-.8-.1-.8.5 0 .4.4.3.8.4zm5.7 10.2c-.5-.4-1-.7-1.5-1.1-1-.7-1.9-.7-2.6.4-.4.6-1 .6-1.6.4-1.7-.8-2.9-1.9-3.7-3.6-.3-.7-.3-1.4.5-1.9.4-.3.8-.6.8-1.2 0-.8-2-3.5-2.7-3.7-.3-.1-.6-.1-1 0C.9 1.2.2 2.7.9 4.4c2.1 5.2 5.8 8.8 11 11 .3.1.6.2.8.2 1.2 0 2.5-1.1 2.9-2.2.3-1-.5-1.5-1.1-2zM9.7 4c-.2 0-.5 0-.6.3-.1.4.2.5.5.5.9.2 1.4.7 1.5 1.7 0 .3.2.5.4.4.3 0 .4-.3.4-.6 0-1.1-1.2-2.3-2.2-2.3",email:"12.7 1c1 .5 1.8 1.2 2.3 2.2.5.9.8 1.9.8 3.1 0 .9-.1 1.8-.5 2.7-.3.9-.8 1.6-1.4 2.2-.6.6-1.4.9-2.3.9-.6 0-1.1-.2-1.5-.5-.4-.3-.6-.7-.7-1.2-.6 1.1-1.5 1.6-2.5 1.6-.8 0-1.5-.3-1.9-.8-.5-.6-.7-1.3-.7-2.2 0-.8.1-1.6.4-2.5S5.5 5 6.1 4.4c.7-.6 1.5-.8 2.6-.8.5 0 1 .1 1.4.2.5.1.9.3 1.3.6l-.7 4.9v.3c0 .2 0 .4.1.5.1.1.3.2.5.2.4 0 .8-.2 1.1-.7.3-.4.5-1 .7-1.6.1-.7.2-1.3.2-1.9 0-1.3-.4-2.3-1.1-3-.8-.7-1.9-1-3.4-1s-2.7.4-3.7 1.1c-.9.7-1.6 1.6-2 2.6S2.6 7.9 2.6 9c0 .9.2 1.8.6 2.5.4.7 1 1.3 1.7 1.7.7.4 1.7.6 2.7.6.5 0 1-.1 1.6-.2.6-.1 1.1-.3 1.5-.4l.4 1.9c-.6.2-1.2.4-1.8.5-.7.1-1.3.2-1.9.2-1.4 0-2.7-.3-3.8-.9s-1.9-1.4-2.5-2.4S.2 10.3.2 9c0-1.3.3-2.7 1-4 .6-1.4 1.6-2.5 3-3.4C5.5.7 7.2.2 9.2.2c1.3 0 2.5.3 3.5.8zm-4 8.4l.6-3.9c-.3-.1-.5-.2-.7-.2-.7 0-1.2.4-1.5 1.2-.3.8-.5 1.7-.5 2.6 0 .8.3 1.2.8 1.2s.9-.3 1.3-.9",more:"14.725 6.667H9.333V1.275C9.333.57 8.738 0 8 0S6.667.57 6.667 1.275v5.392H1.275C.57 6.667 0 7.262 0 8s.57 1.334 1.275 1.334h5.392v5.393C6.667 15.43 7.262 16 8 16s1.333-.57 1.333-1.273V9.334h5.392C15.43 9.334 16 8.738 16 8s-.57-1.333-1.275-1.333"}},{}],22:[function(t,e){var i={yes:!0,no:!1},n={each:function(t,e){for(var i in t)t.hasOwnProperty(i)&&e(t[i],i)},toArray:function(t){return Array.prototype.slice.call(t)},merge:function(){for(var t={},e=0;e<arguments.length;e++){var i=arguments[e];if(i)for(var n in i)t[n]=i[n]}return t},extend:function(t,e){for(var i in e)t[i]=e[i]},flexboxSupport:function(t,e){var i,n=document,o="flex",r="-webkit-"+o,c=n.createElement("b");try{c.style.display=r,c.style.display=o,i=c.style.display==o||c.style.display==r?o:"no-"+o}catch(c){i="no-"+o}t.className+=" "+e+"--"+i},getDataset:function(t){if("object"==typeof t.dataset)return t.dataset;var e,i,n,o={},r=t.attributes,c=function(t){return t.charAt(1).toUpperCase()};for(e=r.length-1;e>=0;e--)i=r[e],i&&i.name&&/^data-\w[\w\-]*$/.test(i.name)&&(n=i.name.substr(5).replace(/-./g,c),o[n]=i.value);return o},bools:function(t){var e={},o=n.getDataset(t);for(var r in o){var c=o[r];e[r]=i[c]||c}return e},template:function(t,e){return t?t.replace(/\{([^\}]+)\}/g,function(t,i){return i in e?e[i]:t}):""},makeUrl:function(t,e){for(var i in e)e[i]=encodeURIComponent(e[i]);return n.template(t,e)},query:function(t){var e=encodeURIComponent,i=[];for(var n in t)"object"!=typeof t[n]&&i.push(e(n)+"="+e(t[n]));return i.join("&")},set:function(t,e,i){var n=e.split("."),o=null;n.forEach(function(e,i){"undefined"==typeof t[e]&&(t[e]={}),i!==n.length-1&&(t=t[e]),o=e}),t[o]=i}};e.exports=n},{}],23:[function(t,e){function i(t,e){this.container=t,this.options=e,this.countersLeft=0,this.buttons=[],this.number=0,this.init()}var n=t("./button"),o=(t("./services"),t("./config")),r=t("./utils");i.prototype={init:function(){r.toArray(this.container.children).forEach(this.addButton.bind(this)),this.options.counters?(this.timer=setTimeout(this.appear.bind(this),this.options.wait),this.timeout=setTimeout(this.ready.bind(this),this.options.timeout)):this.appear(),r.flexboxSupport(this.container,o.name)},addButton:function(t){var e=new n(t,this,this.options);this.buttons.push(e),e.options.counterUrl&&this.countersLeft++},update:function(t){(t.forceUpdate||t.url!==this.options.url)&&(this.countersLeft=this.buttons.length,this.number=0,this.buttons.forEach(function(e){e.update(t)}))},updateCounter:function(t,e){e&&(this.number+=e),this.countersLeft--,0===this.countersLeft&&(this.appear(),this.ready())},appear:function(){this.container.classList.add(o.name+"--visible")},ready:function(){this.timeout&&(clearTimeout(this.timeout),this.container.classList.add(o.name+"--ready"))}},e.exports=i},{"./button":1,"./config":2,"./services":12,"./utils":22}]},{},[5]);