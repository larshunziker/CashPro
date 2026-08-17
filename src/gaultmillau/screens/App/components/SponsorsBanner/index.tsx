import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../common/components/Link';
import { DEFAULT_LANGUAGE } from '../Navigation/components/LanguageSwitch';
import typography from '../../assets/styles/typography_old.legacy.css';
import styles from './styles.legacy.css';
import amex from '../../assets/graphics/sponsorLogos/amex.svg';
import mercedes from '../../assets/graphics/sponsorLogos/mercedes_logo.svg';
import mondovino from '../../assets/graphics/sponsorLogos/mondovino.svg';
import nespresso from '../../assets/graphics/sponsorLogos/nespresso.svg';
import fleisch_de from '../../assets/graphics/sponsorLogos/sf_logo_de.svg';
import fleisch_fr from '../../assets/graphics/sponsorLogos/sf_logo_fr.svg';
import sdh from '../../assets/graphics/sponsorLogos/swiss-deluxe-hotels.svg';
import swisswine from '../../assets/graphics/sponsorLogos/swisswine_logo.svg';
import ubsLogo from '../../assets/graphics/sponsorLogos/ubs_logo.svg';
import vinvaudois from '../../assets/graphics/sponsorLogos/vinvaudois.svg';
import vzug from '../../assets/graphics/sponsorLogos/vzug.svg';

type PartnerProps = {
  language?: string;
  src: string;
  alt?: string;
  width: number;
  height: number;
  isSmall?: boolean;
  formattedMessage?: {
    id: string;
    description: string;
    defaultMessage: string;
  };
  WrapperStyle?: string;
  ImageStyle?: string;
};

const PARTNERS = [
  {
    language: ['de', 'fr'],
    src: mercedes,
    alt: 'Mercedes Logo',
    width: 64,
    height: 64,
    isSmall: true,
  },
  {
    language: ['de', 'fr'],
    src: vzug,
    alt: 'V-Zug Logo',
    width: 56,
    height: 56,
    isSmall: true,
  },
  {
    language: ['de', 'fr'],
    src: ubsLogo,
    alt: 'UBS Logo',
    width: 184,
    height: 68,
  },
  {
    language: ['de', 'fr'],
    src: mondovino,
    alt: 'Mondovino Logo',
    width: 60,
    height: 100,
  },
  {
    language: ['de', 'fr'],
    src: nespresso,
    alt: 'Nespresso Logo',
    width: 107,
    height: 23,
    ImageStyle: styles.NespressoLogo,
  },
  {
    language: ['de', 'fr'],
    src: swisswine,
    alt: 'SwissWine Logo',
    width: 56,
    height: 69,
    isSmall: true,
  },
  {
    language: ['de'],
    src: fleisch_de,
    alt: 'Schweizer Fleisch Logo',
    width: 107,
    height: 69,
    ImageStyle: styles.SchweizerFleischLogo,
  },
  {
    language: ['fr'],
    src: fleisch_fr,
    alt: 'Viande Suisse Logo',
    width: 107,
    height: 69,
    ImageStyle: styles.SchweizerFleischLogo,
  },
  {
    language: ['de', 'fr'],
    src: sdh,
    alt: 'Swiss Deluxe Hotel Logo',
    width: 100,
    height: 46,
  },
  {
    formattedMessage: {
      id: 'app.sponsorbanner.textAmex',
      description: 'The text of the sponsor banner for GM and «Züri isst»',
      defaultMessage: 'Partner für GaultMillau POP und «Züri isst»',
    },
    language: ['de'],
    src: amex,
    alt: 'American Express Logo',
    width: 56,
    height: 56,
    WrapperStyle: styles.SponsorWrapperbig,
    isSmall: true,
  },
  {
    formattedMessage: {
      id: 'app.sponsorbanner.textfr',
      description: 'The text of the sponsor banner in FR',
      defaultMessage: 'Partner für den Channel Romandie',
    },
    language: ['de', 'fr'],
    src: vinvaudois,
    alt: 'Vin Vaudoise Logo',
    width: 100,
    height: 53,
    WrapperStyle: styles.SponsorWrapperbig,
  },
];

const renderPartner = ({
  language,
  src,
  alt,
  width,
  height,
  isSmall,
  formattedMessage,
  WrapperStyle = styles.SponsorWrapper,
  ImageStyle = '',
}: PartnerProps) => {
  const partnerLink =
    language === DEFAULT_LANGUAGE ? '/partner' : '/fr/partenaires';
  return (
    <div key={alt} className={WrapperStyle}>
      <div className={styles.LogoBoxMobile}>
        <Link
          className={classNames(typography.Link, styles.Item)}
          path={partnerLink}
        >
          <img
            className={classNames(styles.SponsorLogo, {
              [styles.Small]: isSmall,
              [ImageStyle]: !!ImageStyle,
            })}
            src={src}
            alt={alt}
            width={width}
            height={height}
          />
        </Link>
        {formattedMessage && (
          <div className={styles.TextBox}>
            <p className={styles.SponsorText}>
              <FormattedMessage {...formattedMessage} />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const SponsorsBanner = () => {
  const language = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => settingsStateSelector(state).language,
  );

  return (
    <div className={styles.SponsorsBox}>
      <p className={styles.SectionHeader}>
        <FormattedMessage
          id="app.sponsorbanner.header"
          description="The header of the sponsor banner"
          defaultMessage="GaultMillau-Channel - UNSERE PARTNER"
        />
      </p>
      <div className={styles.Subheader}>
        <p className={styles.SubheaderParagraph}>
          <FormattedMessage
            id="app.sponsorbanner.text"
            description="The text of the sponsor banner"
            defaultMessage="Wir sind stolz auf die Zusammenarbeit mit starken Partnern."
          />
        </p>
      </div>
      {/* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */}
      {PARTNERS.filter((partner) => partner.language.includes(language)).map(
        (partner) => renderPartner({ ...partner, language }),
      )}
    </div>
  );
};

export default SponsorsBanner;
