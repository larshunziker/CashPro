import { ReactNode } from 'react';
import { ArticleImageProps } from '../ArticleImage/typings';

export type ArticleDefaultRatgeberProps = ArticleImageProps & {
  article: Article;
  children: ReactNode;
};
