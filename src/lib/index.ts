// @ts-ignore
import $ from 'https://unpkg.com/jquery@3.6.3/dist/jquery.slim.min.js';
import iconCheck from '../assets/icon-check.svg';
import iconDark from '../assets/icon-check.svg';
import css from './main.css?raw';
import {Platforms, initConfig, smmConfig} from "./data";
import {copyToClipboard, getBottomCSS, httpBuildQuery} from "../utils";

/* global ga */

function updateSmmLinks(type: string): void {
  $(`.btm-${type}`).attr('href', buildLink(type));
}
function updateAllSocialItemLinks(): void {
  for (const key in Platforms) {
    updateSmmLinks(key);
  }
}
function removeByIndex(str: string, index: number): string {
  return str.slice(0,index) + str.slice(index+1);
}
function buildLink(type: string): string {
  const {
    og_result_url: ogResultUrl = '',
    og_result_img: ogResultImg = '',
    _rsbtxt = [],
    prestige,
  } = window;
  const quizHashtag = _rsbtxt[4];
  const shareText = prestige || document.title;
  const shareTextWb = prestige ? `#${quizHashtag}# ${prestige}` : document.title;
  const quizDesc = $('meta[name="description"]').attr('content');
  switch(type) {
    case 'fb':
      return 'https://www.facebook.com/sharer.php?u='+ogResultUrl;
    case 'tw':
      return '//twitter.com/share?' + httpBuildQuery({
        text:shareText,
        hashtags:quizHashtag,
        url:ogResultUrl
      });
    case 'vk':
      return '//vk.com/share.php?' + httpBuildQuery({
        url:ogResultUrl,
        image:ogResultImg
      });
    case 'ok':
      return '//connect.ok.ru/offer?' + httpBuildQuery({
        url:ogResultUrl,
        title:shareText,
        imageUrl:ogResultImg
      })
    case 'wb':
      return '//service.weibo.com/share/share.php?' + httpBuildQuery({
        appkey:"",
        title: shareTextWb,
        url:ogResultUrl,
        pic:ogResultImg
      });
    case 'naver':
      return '//share.naver.com/web/shareView.nhn?' + httpBuildQuery({
        url:ogResultUrl,
        title:shareText
      });
    case 'kakao':
      return '//story.kakao.com/s/share?' + httpBuildQuery({
        url:ogResultUrl
      });
    case 'messenger':
      return 'fb-messenger://share?' + httpBuildQuery({
        link:ogResultUrl,
        app_id:"998115753539479"
      });
    case 'qzone':
      return '//sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + httpBuildQuery({
        url:ogResultUrl,
        title:shareTextWb,
        desc:quizDesc,
        summary:quizHashtag,
        pics:ogResultImg
      });
    case 'reddit':
      return '//www.reddit.com/submit?' + httpBuildQuery({
        url:ogResultUrl,
        title:shareText
      });
    case 'pin':
      return '//www.pinterest.com/pin/create/button/?' + httpBuildQuery({
        url:ogResultUrl,
        media:ogResultImg,
        description:shareText
      });
    case 'plurk':
      // TODO to see whether we need to add text and hashtag in this.
      return '//www.plurk.com/?' + httpBuildQuery({
        qualifier:"shares",
        status:ogResultUrl
      });
    case 'line':
      return '//line.me/R/share?' + httpBuildQuery({
        text: shareTextWb + ' ' + ogResultUrl
      });
    case 'tumblr':
      return '//www.tumblr.com/widgets/share/tool/preview?' + httpBuildQuery({
        shareSource:"legacy",
        canonicalUrl:"",
        url:ogResultUrl,
        title:shareText
      });
    case 'whatsapp':
      return '//api.whatsapp.com/send?' + httpBuildQuery({
        phone:"",
        url:ogResultUrl,
        text:shareText
      });
    default:
      return '';
  }
}

function getBottomHtmlById(arr: Platforms[]): string {
  const {copyLinkDoneText, socials} = smmConfig;
  const html = arr.map((el)=>{
    let tag = 'a';
    let target = ' target="_blank"';
    let tooltip = '';
    if (['html', 'link'].includes(el)) {
      tag = 'b';
    }
    if(el === Platforms.link) {
      tooltip = `<div class="btm-tooltip"><img src="${iconCheck}" width="24" height="24" /><span>${copyLinkDoneText}</span></div>`;
    }
    return `
      <${tag}${target} title="${socials[el].name}" data-stat="${el}" class="btm-${el}">
        <div class="btm-${el}-icon"></div>
        ${tooltip}
      </${tag}>`
  }).join('');
  return html + `
      <div id="btm-darkmode">
        <div id="btm-dark-switch">
          <section id="btm-dark-toggle-back"></section>
          <section id="btm-dark-toggle-thumb">
            <img src="${iconDark}" width="24" height="24" />
          </section>
        </div>
      </div>`;
}
function createBTMShare(buttons: Platforms[]): HTMLDivElement {
  const wrapper = document.createElement('div');
  wrapper.id = 'btm-share';
  wrapper.innerHTML = getBottomHtmlById(buttons);
  document.body.appendChild(wrapper);

  const bottomCss = getBottomCSS();
  const style = document.createElement('style');
  style.innerHTML = css + bottomCss;
  document.head.appendChild(style);
  return wrapper;
}
function initButtons(): Platforms[] {
  // Predefined text

  const buttons = [];
  //Default
  if(!location.hostname.includes('.cn')) {
    buttons.push(Platforms.tw);
    buttons.push(Platforms.fb);
  }
  buttons.push(Platforms.pin);

  //Add later
  // TODO rename `test`
  const { test } = window;
  switch(test.lang) {
    case "ru":
    case "uk":
      buttons.push(Platforms.vk);
      buttons.push(Platforms.ok);
      break;
    case "cn":
      buttons.push(Platforms.wb);
      buttons.push(Platforms.qzone);
      break;
    case "ja":
      buttons.push(Platforms.line);
      buttons.push(Platforms.kakao);
      break;
    case "ko":
      buttons.push(Platforms.naver);
      buttons.push(Platforms.kakao);
      buttons.push(Platforms.line);
      break;
    case "zh":
      buttons.push(Platforms.plurk);
      buttons.push(Platforms.line);
      break;
    case "en":
      buttons.push(Platforms.messenger);
      buttons.push(Platforms.whatsapp);
      buttons.push(Platforms.reddit);
      break;
    case "de":
      buttons.push(Platforms.reddit);
      buttons.push(Platforms.whatsapp);
      break;
    case "es":
      buttons.push(Platforms.whatsapp);
      break;
    case "id":
      buttons.push(Platforms.whatsapp);
      break;
    case "it":
      buttons.push(Platforms.whatsapp);
      break;
    case "pt":
      buttons.push(Platforms.whatsapp);
      break;
    case "th":
      buttons.push(Platforms.line);
      break;

  }
  buttons.push(Platforms.link);

  return buttons;
}
function attachEvents(wrapper: HTMLDivElement): void {
  const { test } = window;
  $(wrapper)
    .on('click', '[data-stat]', function (event: MouseEvent) {
    const shareType = (event.target as HTMLElement).dataset.stat;
    //gT for Global Tracker
    ga('gT.send', 'event', {
      eventCategory:'btm-share',
      eventAction: shareType,
      eventValue:0,
      eventLabel:`${test.name}/${test.lang}`,
      nonInteraction:true
    });
  })

  const darkToggleThumb = wrapper.lastElementChild as HTMLDivElement;
  const linkItem = darkToggleThumb.previousElementSibling as HTMLDivElement;
  $(linkItem).click(function (event: MouseEvent): void {
    const $tooltip = (event.target as HTMLElement).getElementsByClassName('btm-tooltip')[0];
    $tooltip.classList.add('btm-opened');
    linkItem.classList.add('block-backdrop');
    setTimeout(()=>{
      if ($tooltip.classList.contains('btm-opened')) return;
      linkItem.classList.remove('block-backdrop');
    }, 3999);
    setTimeout(()=>{
      $tooltip.classList.remove('btm-opened');
    }, 1999);
    copyToClipboard(test.url);
  });

  // 0 - Predefined variables
  const darkOnClassName = 'dark-on';
  // 1 - Get media query status
  let isDarkMedia = false;
  if (matchMedia && matchMedia('(prefers-color-scheme: dark)').matches){
    isDarkMedia = true;
  }
  // 2 - Assign status to toggle according to media query
  if (isDarkMedia) {
    darkToggleThumb.classList.add(darkOnClassName);
  } else {
    darkToggleThumb.classList.remove(darkOnClassName);
  }
  // 3 - Event handler
  $('#dark-switch').click(function () {
    darkToggleThumb.classList.toggle(darkOnClassName);
    const setToDark = darkToggleThumb.classList.contains(darkOnClassName);

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
        var lastBracketIndex = css_html.lastIndexOf('}');
        css_html = removeByIndex(css_html, lastBracketIndex);
        css_html = css_html.split(dark_selector).join('');
      }
      $('#darkmode').html(css_html);
    } else {
      $('#darkmode')[0].disabled = true; // Set to true, so we force the <style>@media .... </style> block to stop working.
    }

  })
}
function start(rsbtxt: string[]): void {
  if ($('#btm-share').length) return;

  initConfig(rsbtxt);
  const buttons = initButtons();
  const wrapper = createBTMShare(buttons);
  updateAllSocialItemLinks();
  attachEvents(wrapper);
}

if (window._rsbtxt && window.test) {
  start(window._rsbtxt);
}
