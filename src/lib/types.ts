import { Platforms } from './data';

export type SocialConfig = {
  name: string;
  url?: string;
  i: number;
  c: string;
}

export type SmmConfig = {
  socials: Record<Platforms, SocialConfig>;
  copyLinkDoneText: string;
}
