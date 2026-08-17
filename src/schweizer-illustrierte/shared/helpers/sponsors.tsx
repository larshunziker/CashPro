// @ts-ignore
import dysonLogo from './sponsors/dyson.jpg';
// @ts-ignore
import toyotaLogo from './sponsors/toyota.jpg';
// @ts-ignore
import volvoLogo from './sponsors/volvo.svg';

export type ChannelSponsor = {
  logoUrl: string;
  name: string;
  link: string;
};

const data: Array<ChannelSponsor> = [
  {
    logoUrl: dysonLogo,
    name: 'Dyson',
    link: 'https://www.dyson.ch/de-ch/ventilatoren-und-heizlufter/luftreiniger/dyson-pure-hot-cool-2018/ueberblick.aspx?utm_campaign=ch_de__environmental__purifiers__see__cross-media-partnership_pure_hot_cool__awareness__bottom-banner__all__native_article_1&utm_source=schweizer-illustrierte.ch/body-health&utm_medium=display&utm_term=na&utm_content=ringier_%ecid!;%m',
  },
  {
    logoUrl: volvoLogo,
    name: 'Volvo',
    link: 'https://www.volvocars.com/de-ch?utm_source=si_style-ch&utm_medium=display&utm_content=xc40-other-rich_media-d_ch&utm_campaign=emea-xc40',
  },
  {
    logoUrl: toyotaLogo,
    name: 'Toyota',
    link: 'https://de.toyota.ch/',
  },
];

export const getSponsor = (name: string) => {
  const sponsor = data.find((sponsor) => sponsor.name === name);
  return sponsor ? { ...sponsor } : null;
};
