import './style.css'
import check from './assets/icon-check.svg'
import { setupCounter } from './counter'
import startSmm from './lib/index';

const _rsbtxt = window._rsbtxt = [
  'Tweet',
  'Post on Facebook',
  'Copy Link',
  'Link copied!',
  'StockCalculator'
];

const test = window.test = {
  'name': 'home',
  'lang': 'en',
  url: 'https://stockcalculator.io',
}

window.ga = function(...args) {
  console.log('ga', args);
}

startSmm(_rsbtxt, test);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${check}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${check}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
