import $ from 'https://unpkg.com/jquery@3.6.3/dist/jquery.slim.min.js';

$('.sumome-share-client-wrapper, #btm-share').remove();

// Predefined text
var arr = window._rsbtxt;
var twitter_text = arr[0];
var facebook_text = arr[1];
var copylink_text = arr[2];
var copylink_done_text = arr[3];
var quiz_hashtag = arr[4];
// var more_options_text = arr[5];

function http_build_query(obj) {
  return Object.keys(obj).map(function(key) {
    return encodeURIComponent(key)+'='+encodeURIComponent(obj[key]);
  }).join('&');
}





var socials = {};
// {a} means alpha
socials["fb"] = { name: facebook_text , i: 0, c: "#1877F2{a}"};
socials["html"] = { name: "Code" , i: 1, c: "#000000{a}"};
socials["line"] = { name: "Line" , i: 2, c: "#06C755{a}"};
socials["kakao"] = { name: "Kakao" , i: 3, c: "#FFE812{a}"};
socials["naver"] = { name: "Naver" , i: 4, c: "#03CF5D{a}"};
socials["plurk"] = { name: "Plurk" , i: 5, c: "#FF574D{a}"};
socials["link"] = { name: copylink_text , i: 6, c: "#B1B1B1{a}"};
socials["messenger"] = { name: "Facebook Messenger" , i: 7, c: "#F5F5F5{a}"};
socials["qzone"] = { name: "分享到QQ空间" , i: 8, c: "#E6B845{a}"};
socials["tumblr"] = { name: "Tumblr" , i: 9, c: "#001935{a}"};
socials["tw"] = { name: twitter_text , i: 10, c: "#1D9BF0{a}"};
socials["vk"] = { name: "VK" , i: 11, c: "#0077FF{a}"};
socials["pin"] = { name: "Pinterest" , i: 12, c: "#BD081C{a}"};
socials["wb"] = { name: "微博" , i: 13, c: "linear-gradient(0, #FFDF64{a}, #FFEFBF{a})"};
socials["reddit"] = { name: "Reddit" , i: 14, c: "#FF4500{a}"};
socials["ok"] = {name:"Одноклассники", i:15, c:"#EE8208{a}"};
socials["whatsapp"] = {name:"WhatsApp", i:16, c:"#2FB943{a}"};


var button_arr = [];
//Default
if(!document.domain.includes('.cn')) {
  button_arr.push('tw');
  button_arr.push('fb');
}
button_arr.push('pin');

//Add later
switch(test.lang) {

  case "ru":
  case "uk":
    button_arr.push('vk');
    button_arr.push('ok');
    break;
  case "cn":
    button_arr.push('wb');
    button_arr.push('qzone');
    break;
  case "ja":
    button_arr.push('line');
    button_arr.push('kakao');
    break;
  case "ko":
    button_arr.push('naver');
    button_arr.push('kakao');
    button_arr.push('line');
    break;
  case "zh":
    button_arr.push('plurk');
    button_arr.push('line');
    break;
  case "en":
    button_arr.push('messenger');
    button_arr.push('whatsapp');
    button_arr.push('reddit');
    break;
  case "de":
    button_arr.push('reddit');
    button_arr.push('whatsapp');
    break;
  case "es":
    button_arr.push('whatsapp');
    break;
  case "id":
    button_arr.push('whatsapp');
    break;
  case "it":
    button_arr.push('whatsapp');
    break;
  case "pt":
    button_arr.push('whatsapp');
    break;
  case "th":
    button_arr.push('line');
    break;

}
button_arr.push('link');

// Load code
$('body').append(`
<div id="btm-share">

${getBottomHTMLById(button_arr)}

</div>

`); // End of load

$('#btm-share [data-stat]').click(function(){
  var share_type = $(this).attr('data-stat');
  //gT for Global Tracker
  ga('gT.send', 'event', {
    eventCategory:'btm-share',
    eventAction:share_type,
    eventValue:0,
    eventLabel:`${test.name}/${test.lang}`,
    nonInteraction:true
  });
})
var $btm_link = $(".btm-link");
$btm_link.click(function(){
  // prompt(`${copylink_text}:`, test.url);
  var $tooltip = $('.btm-tooltip');
  $tooltip.addClass('btm-opened');
  $btm_link.addClass('block-backdrop');
  setTimeout(()=>{
    if($tooltip.hasClass('btm-opened')) return;
    $btm_link.removeClass('block-backdrop');
  }, 3999);
  setTimeout(()=>{
    $tooltip.removeClass('btm-opened');
  }, 1999);
  copyToClipboard(test.url);
  // Just helper
  function copyToClipboard(value) {
    var tempInput = document.createElement("input");
    tempInput.value = value;
    tempInput.className  = 'hide';
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }
});
$(".btm-html").click(function(){prompt('HTML Code:', `<a title="${test.title}" href="${og_link}">${prestige}</a>`)});

var all_social_item_arr = ['tw','fb','vk','wb','ok','naver','line','kakao','pin','reddit','messenger','qzone','tumblr','plurk','whatsapp'];
_rsbtxt[6] = updateAllSocialItemLinks;
function updateSMMLinks(type) {
  $(`.btm-${type}`).attr('href', link_builder(type));
}
updateAllSocialItemLinks();
function updateAllSocialItemLinks(){
  all_social_item_arr.forEach((el)=>{
    updateSMMLinks(el);
  })
}

// 0 - Predefined variables
var darkOnClassName = 'dark-on';
var darkToggleThumb = $('#dark-toggle-thumb');
// 1 - Get media query status
var isDarkMedia = false;
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches){
  isDarkMedia = true;
}
// 2 - Assign status to toggle according to media query
if(isDarkMedia) {
  darkToggleThumb.addClass(darkOnClassName);
} else {
  darkToggleThumb.removeClass(darkOnClassName);
}
// 3 - Event handler
$('#dark-switch').click(()=>{

  darkToggleThumb.toggleClass(darkOnClassName);



  var setToDark = darkToggleThumb.hasClass(darkOnClassName);

  ga('gT.send', 'event', {
    eventCategory:'ux-report',
    eventAction:setToDark ? 'light-to-dark' : 'dark-to-light',
    eventValue:0,
    eventLabel:`${test.name}/${test.lang}`,
    nonInteraction:true
  });

  if (setToDark) {
    $('#darkmode')[0].disabled=false;
    var css_html = $('#darkmode').html();
    var dark_selector = '@media (prefers-color-scheme:dark){';
    if(css_html.includes(dark_selector)) {
      var lastBraketIndex = css_html.lastIndexOf('}');
      css_html = removeByIndex(css_html, lastBraketIndex);
      css_html = css_html.split(dark_selector).join('');
    }
    $('#darkmode').html(css_html);
  } else {
    $('#darkmode')[0].disabled = true; // Set to true, so we force the <style>@media .... </style> block to stop working.
  }

})

function removeByIndex(str,index) {
  return str.slice(0,index) + str.slice(index+1);
}
function link_builder(type){
  // var encoded_title=encodeURIComponent(document.title);
  var share_text = prestige ? prestige : document.title;
  var share_text_wb = prestige ? `#${quiz_hashtag}# ${prestige}` : document.title;
  var quiz_desc = $('meta[name="description"]').attr('content');
  switch(type) {
    case 'fb':
      return '//www.facebook.com/sharer.php?u='+og_result_url;
    case 'tw':
      return '//twitter.com/share?' + http_build_query({
        text:share_text,
        hashtags:quiz_hashtag,
        url:og_result_url
      });
    case 'vk':
      return '//vk.com/share.php?' + http_build_query({
        url:og_result_url,
        image:og_result_img
      });
    case 'ok':
      return '//connect.ok.ru/offer?' + http_build_query({
        url:og_result_url,
        title:share_text,
        imageUrl:og_result_img
      })
    case 'wb':
      return '//service.weibo.com/share/share.php?' + http_build_query({
        appkey:"",
        title: share_text_wb,
        url:og_result_url,
        pic:og_result_img
      });

    case 'naver':
      return '//share.naver.com/web/shareView.nhn?' + http_build_query({
        url:og_result_url,
        title:share_text
      })

      break;
    case 'kakao':
      return '//story.kakao.com/s/share?' + http_build_query({
        url:og_result_url
      })

      break;
    case 'messenger':
      return 'fb-messenger://share?' + http_build_query({
        link:og_result_url,
        app_id:"998115753539479"
      })

      break;
    case 'qzone':
      return '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + http_build_query({
        url:og_result_url,
        title:share_text_wb,
        desc:quiz_desc,
        summary:quiz_hashtag,
        pics:og_result_img
      })

      break;
    case 'reddit':
      return '//www.reddit.com/submit?' + http_build_query({
        url:og_result_url,
        title:share_text
      })

      break;
    case 'pin':
      return '//www.pinterest.com/pin/create/button/?' + http_build_query({
        url:og_result_url,
        media:og_result_img,
        description:share_text
      });

      break;

    case 'plurk':
      // TODO to see whether we need to add text and hashtag in this.
      return '//www.plurk.com/?' + http_build_query({
        qualifier:"shares",
        status:og_result_url
      })

      break;
    case 'line':
      return '//line.me/R/share?' + http_build_query({
        text: share_text_wb + ' ' + og_result_url
      });

      break;
    case 'tumblr':
      return '//www.tumblr.com/widgets/share/tool/preview?' + http_build_query({
        shareSource:"legacy",
        canonicalUrl:"",
        url:og_result_url,
        title:share_text
      })

      break;
    case 'whatsapp':
      return '//api.whatsapp.com/send?' + http_build_query({
        phone:"",
        url:og_result_url,
        text:share_text
      })

      break;
  }
}
function getBottomCSS(){
  var css = '';
  for (var item in socials) {
    var obj = socials[item];
    var btm_style = '';
    var btm_hover_style = '';
    var opacity = .84;
    var opacity_hex = parseInt(opacity * 255).toString(16);

    // parseInt(hexString, 16);
    var bg_style = obj.c.split('{a}').join(opacity_hex);
    var bg_hover_style = obj.c.split('{a}').join('');
    css += `
      .btm-${item} {
        background:${bg_style};
        width:100%;
        cursor:pointer;
        backdrop-filter:blur(15px) contrast(5);
        -webkit-backdrop-filter:blur(15px) contrast(5);
      }
      .btm-${item}:hover {
        background:${bg_hover_style};
        backdrop-filter:none;
        -webkit-backdrop-filter:none;
      }
      .btm-${item}-icon {
        background:url('https://www.arealme.com/ssimgs/s5.svg') 0 -${obj.i*45}px;
      }`;
  }
  return css;
}
function getBottomHTMLById(arr){
  var html = '';
  var tag = 'a';
  var target_blank = ' target="_blank"';
  var tooltip_html = ``;
  arr.forEach((el)=>{
    if (['html', 'link'].includes(el)) {
      tag = 'b';
      target_blank = '';
    }
    if(el == 'link') {
      tooltip_html = `<div class="btm-tooltip"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38"><path d="M19 0C8.5 0 0 8.5 0 19s8.5 19 19 19 19-8.5 19-19S29.5 0 19 0zm0 24.8c-1.6 1.6-4.2 1.6-5.8 0l-5.4-5.4 2.9-2.9 5.4 5.4 11-11 2.9 2.9-11 11z"></path></svg><span>${copylink_done_text}</span></div>`;
    }
    html+=`
      <${tag}${target_blank} title="${socials[el].name}" data-stat="${el}" class="btm-${el}">
        <div class="btm-${el}-icon"></div>
        ${tooltip_html}
      </${tag}>`
  })
  html += `
      <div id="btm-darkmode">
        <div id="dark-switch">
          <section id="dark-toggle-back"></section>
          <section id="dark-toggle-thumb">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a7 7 0 0 0 7 9h2a9 9 0 1 1-9-9Z"/></svg>
          </section>
        </div>
      </div>
    `
  return html;
}
