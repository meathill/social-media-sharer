import { Platforms, smmConfig } from '../lib/data';
import { SocialConfig } from '../lib/types';

export function fallbackCopyTextToClipboard(text: string): void {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  document.execCommand('copy');
  document.body.removeChild(textArea);
}

export async function copyToClipboard(text: string): Promise<void> {
  if (navigator.clipboard) {
    await navigator.clipboard.writeText(text);
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

export function httpBuildQuery(obj: Record<string, string>) {
  return Object.keys(obj).map(function(key) {
    return encodeURIComponent(key)+'='+encodeURIComponent(obj[ key ]);
  }).join('&');
}

export function getBottomCSS() {
  let css = '';
  for (const item in smmConfig.socials) {
    const obj: SocialConfig = smmConfig.socials[ item as Platforms ];
    const opacity = .84;
    const opacityHex = (opacity * 255 >> 0).toString(16);

    const bgStyle = obj.c.split('{a}').join(opacityHex);
    const bgHoverStyle = obj.c.split('{a}').join('');
    css += `
      .btm-${item} {
        background:${bgStyle};
        width:100%;
        cursor:pointer;
        backdrop-filter:blur(15px) contrast(5);
        -webkit-backdrop-filter:blur(15px) contrast(5);
      }
      .btm-${item}:hover {
        background:${bgHoverStyle};
        backdrop-filter:none;
        -webkit-backdrop-filter:none;
      }
      .btm-${item}-icon {
        background:url('https://www.arealme.com/ssimgs/s5.svg') 0 -${obj.i*45}px;
      }`;
  }
  return css;
}
