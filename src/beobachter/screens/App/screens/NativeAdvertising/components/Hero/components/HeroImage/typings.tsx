import { ReactNode } from 'react';
import { HeroProps } from '../../typings';

export type HeroImageProps = Partial<HeroProps> & {
  image: Image;
  addClass?: string;
  children?: ReactNode;
};
