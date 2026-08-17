import { ZodiacSign } from '../../../../../../shared/helpers/zodiacSigns';

export type ZodiacSignsOverlayProps = {
  current?: ZodiacSign;
  toggleHandler: () => void;
  isYearly: boolean;
  subtitle: string;
  title: string;
};
