// TODO remove jquery
import 'https://code.jquery.com/jquery-3.6.3.slim.min.js';
import iconCheck from '../assets/icon-check.svg';
import iconDark from '../assets/icon-dark.svg';
import css from './main.css?inline';
import { initConfig, Platforms, smmConfig } from './data';
import { copyToClipboard, getBottomCSS, httpBuildQuery, sleep } from '../utils';
import pkg from '../../package.json';
import { SmmOptions } from './types';

/* global ga */

function removeByIndex(str: string, index: number): string {
  return str.slice(0,index) + str.slice(index+1);
}
function buildLink(type: Platforms): string {
  const {
    ogResultImg,
    quizHashtag,
    prestige,
  } = smmConfig;
  const url = location.href;
  const shareText = prestige || document.title;
  const shareTextWb = prestige ? `#${quizHashtag}# ${prestige}` : document.title;
  const quizDesc = (document.querySelector('meta[name="description"]') as HTMLMetaElement).content || '';
  switch (type) {
    case Platforms.fb:
      return 'https://www.facebook.com/sharer.php?u='+url;
    case Platforms.tw:
      return 'https://twitter.com/share?' + httpBuildQuery({
        text:shareText,
        hashtags:quizHashtag,
        url,
      });
    case Platforms.vk:
      return 'https://vk.com/share.php?' + httpBuildQuery({
        url,
        image:ogResultImg
      });
    case Platforms.ok:
      return 'https://connect.ok.ru/offer?' + httpBuildQuery({
        url,
        title:shareText,
        imageUrl:ogResultImg
      })
    case Platforms.wb:
      return 'https://service.weibo.com/share/share.php?' + httpBuildQuery({
        appkey:'',
        title: shareTextWb,
        url,
        pic:ogResultImg
      });
    case Platforms.naver:
      return 'https://share.naver.com/web/shareView.nhn?' + httpBuildQuery({
        url,
        title:shareText
      });
    case Platforms.kakao:
      return 'https://story.kakao.com/s/share?' + httpBuildQuery({
        url,
      });
    case Platforms.messenger:
      return 'fb-messenger://share?' + httpBuildQuery({
        link: url,
        app_id:'998115753539479'
      });
    case Platforms.qzone:
      return 'https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?' + httpBuildQuery({
        url,
        title:shareTextWb,
        desc:quizDesc,
        summary:quizHashtag,
        pics:ogResultImg
      });
    case Platforms.reddit:
      return 'https://www.reddit.com/submit?' + httpBuildQuery({
        url,
        title:shareText
      });
    case Platforms.pin:
      return 'https://www.pinterest.com/pin/create/button/?' + httpBuildQuery({
        url,
        media:ogResultImg,
        description:shareText
      });
    case Platforms.plurk:
      // TODO to see whether we need to add text and hashtag in this.
      return 'https://www.plurk.com/?' + httpBuildQuery({
        qualifier:'shares',
        status: url,
      });
    case Platforms.line:
      return 'https://line.me/R/share?' + httpBuildQuery({
        text: shareTextWb + ' ' + url
      });
    case Platforms.tumblr:
      return 'https://www.tumblr.com/widgets/share/tool/preview?' + httpBuildQuery({
        shareSource:'legacy',
        canonicalUrl:'',
        url,
        title:shareText
      });
    case Platforms.whatsapp:
      return 'https://api.whatsapp.com/send?' + httpBuildQuery({
        phone:'',
        url,
        text:shareText
      });
    case Platforms.linkedin:
      return 'https://www.linkedin.com/sharing/share-offsite/?url=' + url;
    default:
      return '';
  }
}

function getBottomHtmlById(arr: Platforms[]): string {
  const { copyLinkDoneText, socials } = smmConfig;
  let html = arr.map((el)=>{
    let tag = 'a';
    const target = ' target="_blank"';
    let tooltip = '';
    if (['html', 'link'].includes(el)) {
      tag = 'b';
    }
    if(el === Platforms.link) {
      tooltip = `<div class="btm-tooltip"><img alt="link icon" src="${iconCheck}" width="24" height="24" /><span>${copyLinkDoneText}</span></div>`;
    }
    return `
      <${tag}${target} title="${socials[ el ].name}" data-stat="${el}" class="btm-${el}">
        <div class="btm-${el}-icon"></div>
        ${tooltip}
      </${tag}>`
  }).join('');
  if (smmConfig.darkSwitch) {
    html += `
      <div id="btm-darkmode">
        <div id="btm-dark-switch">
          <section id="btm-dark-toggle-back"></section>
          <section id="btm-dark-toggle-thumb">
            <img alt="moon icon" src="${iconDark}" width="17" height="17" />
          </section>
        </div>
      </div>`;
  }
  return html;
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
  buttons.push(Platforms.linkedin);

  //Add later
  // TODO rename `test`
  switch(smmConfig.test.lang) {
    case 'ru':
    case 'uk':
      buttons.push(Platforms.vk);
      buttons.push(Platforms.ok);
      break;
    case 'cn':
      buttons.push(Platforms.wb);
      buttons.push(Platforms.qzone);
      break;
    case 'ja':
      buttons.push(Platforms.line);
      buttons.push(Platforms.kakao);
      break;
    case 'ko':
      buttons.push(Platforms.naver);
      buttons.push(Platforms.kakao);
      buttons.push(Platforms.line);
      break;
    case 'zh':
      buttons.push(Platforms.plurk);
      buttons.push(Platforms.line);
      break;
    case 'en':
      buttons.push(Platforms.messenger);
      buttons.push(Platforms.whatsapp);
      buttons.push(Platforms.reddit);
      break;
    case 'de':
      buttons.push(Platforms.reddit);
      buttons.push(Platforms.whatsapp);
      break;
    case 'es':
      buttons.push(Platforms.whatsapp);
      break;
    case 'id':
      buttons.push(Platforms.whatsapp);
      break;
    case 'it':
      buttons.push(Platforms.whatsapp);
      break;
    case 'pt':
      buttons.push(Platforms.whatsapp);
      break;
    case 'th':
      buttons.push(Platforms.line);
      break;

  }
  buttons.push(Platforms.link);

  return buttons;
}
function attachEvents(wrapper: HTMLDivElement): void {
  const { test, darkSwitch } = smmConfig;
  // 点击任意分享按钮
  // @ts-ignore
  $(wrapper).on('click', '[data-stat]', function (event: MouseEvent) {
    const link = event.currentTarget as HTMLLinkElement;
    const shareType = link.dataset.stat;
    link.href = buildLink(shareType as Platforms)
    //gT for Global Tracker
    ga('gT.send', 'event', {
      eventCategory:'btm-share',
      eventAction: shareType,
      eventValue:0,
      eventLabel:`${test.name}/${test.lang}`,
      nonInteraction:true
    });
  })

  const lastItem = wrapper.lastElementChild as HTMLDivElement;
  const linkItem = darkSwitch ? lastItem.previousElementSibling as HTMLDivElement : lastItem;
  const $tooltip = linkItem.getElementsByClassName('btm-tooltip')[ 0 ] as HTMLDivElement;
  // 点击复制链接按钮
  // @ts-ignore
  linkItem.addEventListener('click', async function (): void {
    $tooltip.classList.add('btm-tooltip-show');
    await sleep(10);
    $tooltip.classList.add('btm-opened');
    linkItem.classList.add('block-backdrop');
    setTimeout(()=>{
      if ($tooltip.classList.contains('btm-opened')) return;
      linkItem.classList.remove('block-backdrop');
    }, 3999);
    setTimeout(()=>{
      $tooltip.classList.remove('btm-opened');
    }, 1999);
    copyToClipboard(location.href);
  });
  $tooltip.addEventListener('transitionend', function (event: TransitionEvent) {
    const { propertyName } = event;
    if (propertyName !== 'opacity') return;
    if ($tooltip.classList.contains('btm-opened')) return;
    $tooltip.classList.remove('btm-tooltip-show');
  });

  if (darkSwitch) {
    enableDarkSwitch(test);
  }
}
function enableDarkSwitch(test: TestData): void {
  const darkToggleThumb = document.getElementById('btm-dark-toggle-thumb') as HTMLDivElement;

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
  // TODO change dark mode switcher
  const darkSwitch = document.getElementById('btm-dark-switch') as HTMLDivElement;
  darkSwitch.addEventListener('click', function () {
    darkToggleThumb.classList.toggle(darkOnClassName);
    const darkMode: HTMLStyleElement = document.getElementById('darkmode') as HTMLStyleElement;
    if (!darkMode) return;

    const setToDark = darkToggleThumb.classList.contains(darkOnClassName);
    if (setToDark) {
      darkMode.disabled = false;
      let cssHtml = darkMode.innerHTML;
      const darkSelector = '@media (prefers-color-scheme:dark){';
      if (cssHtml.includes(darkSelector)) {
        const lastBracketIndex = cssHtml.lastIndexOf('}');
        cssHtml = removeByIndex(cssHtml, lastBracketIndex);
        cssHtml = cssHtml.split(darkSelector).join('');
      }
      darkMode.innerHTML = cssHtml;
    } else {
      darkMode.disabled = true; // Set to true, so we force the <style>@media .... </style> block to stop working.
    }
    ga('gT.send', 'event', {
      eventCategory:'ux-report',
      eventAction:setToDark ? 'light-to-dark' : 'dark-to-light',
      eventValue:0,
      eventLabel:`${test.name}/${test.lang}`,
      nonInteraction:true
    });
  });
}
function start(rsbtxt: string[], test: TestData, options?: SmmOptions): void {
  if (document.getElementById('btm-share')) return;

  initConfig(rsbtxt, test, options);
  const buttons = initButtons();
  const wrapper = createBTMShare(buttons);
  attachEvents(wrapper);
}

if (window._rsbtxt && window.test) {
  start(window._rsbtxt, window.test);
}

export default start;
export const version = pkg.version;
