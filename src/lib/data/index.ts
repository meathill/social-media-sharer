// `{a}` will be replaced by alpha
import {SmmConfig, SocialConfig} from "../types";

export enum Platforms {
  fb = 'fb',
  html = 'html',
  line = 'line',
  kakao = 'kakao',
  naver = 'naver',
  plurk = 'plurk',
  link = 'link',
  messenger = 'messenger',
  qzone = 'qzone',
  tumblr = 'tumblr',
  tw = 'tw',
  vk = 'vk',
  pin = 'pin',
  wb = 'wb',
  reddit = 'reddit',
  ok = 'ok',
  whatsapp = 'whatsapp',
}

export function getSocials(
  facebookText: string,
  twitterText: string,
  copyLinkText: string
): Record<Platforms, SocialConfig> {
  return {
    [Platforms.fb]: {
      name: facebookText,
      i: 0,
      c: "#1877F2{a}",
    },
    [Platforms.html]: {
      name: "Code",
      i: 1,
      c: "#000000{a}"
    },
    [Platforms.line]: { name: "Line" , i: 2, c: "#06C755{a}"},
    [Platforms.kakao]: { name: "Kakao" , i: 3, c: "#FFE812{a}"},
    [Platforms.naver]: { name: "Naver" , i: 4, c: "#03CF5D{a}"},
    [Platforms.plurk]: { name: "Plurk" , i: 5, c: "#FF574D{a}"},
    [Platforms.link]: { name: copyLinkText , i: 6, c: "#B1B1B1{a}"},
    [Platforms.messenger]: { name: "Facebook Messenger" , i: 7, c: "#F5F5F5{a}"},
    [Platforms.qzone]: { name: "分享到QQ空间" , i: 8, c: "#E6B845{a}"},
    [Platforms.tumblr]: { name: "Tumblr" , i: 9, c: "#001935{a}"},
    [Platforms.tw]: { name: twitterText , i: 10, c: "#1D9BF0{a}"},
    [Platforms.vk]: { name: "VK" , i: 11, c: "#0077FF{a}"},
    [Platforms.pin]: { name: "Pinterest" , i: 12, c: "#BD081C{a}"},
    [Platforms.wb]: { name: "微博" , i: 13, c: "linear-gradient(0, #FFDF64{a}, #FFEFBF{a})"},
    [Platforms.reddit]: { name: "Reddit" , i: 14, c: "#FF4500{a}"},
    [Platforms.ok]: {name:"Одноклассники", i:15, c:"#EE8208{a}"},
    [Platforms.whatsapp]: {name:"WhatsApp", i:16, c:"#2FB943{a}"},
  };
}

export let smmConfig: SmmConfig;
export function initConfig(rsbtxt: string[]) {
  const [
    facebookText,
    twitterText,
    copyLinkText,
    copyLinkDoneText,
  ] = rsbtxt;
  const socials = getSocials(facebookText, twitterText, copyLinkText);

  Object.assign(smmConfig, {
    socials,
    copyLinkDoneText,
  });
}
