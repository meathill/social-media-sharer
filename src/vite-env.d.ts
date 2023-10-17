/// <reference types="vite/client" />

declare global {
  const __VERSION__: string;
}

declare interface TestData {
  name: string;
  lang: string;
  url: string;
}

declare interface Window {
  _rsbtxt: string[];
  test: TestData;
  prestige: string;
  og_result_url: string;
  og_result_img: string;
}

declare function ga(cmd: string, type: string, p?: unknown): void;
