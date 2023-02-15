import { Platforms } from './data';

export type SocialConfig = {
  name: string;
  url?: string;
  i: number;
  c: string;
}

export type SmmConfig = {
  socials: Record<Platforms, SocialConfig>;
  test: TestData;
  copyLinkDoneText: string;
  quizHashtag: string;
  prestige: string;
  ogResultUrl: string;
  ogResultImg: string;
} & SmmOptions;

export type SmmOptions = {
  darkSwitch?: boolean;
}
