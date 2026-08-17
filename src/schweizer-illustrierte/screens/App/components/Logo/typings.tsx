import {
  PUBLICATION_SI,
  PUBLICATION_SY,
} from '../../../../../shared/constants/publications';
export type PublicationType = typeof PUBLICATION_SI | typeof PUBLICATION_SY;

export type LogoProps = {
  publication?: PublicationType;
  origin?: string;
};
