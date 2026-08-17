import { ComponentType } from 'react';

export type BloggerProfileBoxProps = {
  bloggerProfile: Author;
  blogUri: string;
  format: string;
};

export type BloggerProfileBoxComponent = ComponentType<BloggerProfileBoxProps>;
