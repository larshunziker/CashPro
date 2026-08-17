/* istanbul ignore file */
import React from 'react';
import googlePreferredSourceFactory from '../../../../../common/components/GooglePreferredSource/factory';
import { tealiumTrackEvent } from '../../../../../shared/helpers/tealium';
import Button from '../ButtonWithLoading';
import SVGIcon from '../SVGIcon';
import { SVG_ICONS_TYPE_GOOGLE_PREFERRED_SOURCE } from '../../../../../shared/constants/svgIcons';
import styles from './styles.legacy.css';
import { ButtonComponent } from '../../../../../common/components/GooglePreferredSource/typings';

const GooglePreferredSourceButton: ButtonComponent = () => {
  return (
    <Button
      variant="secondary"
      onClick={() => {
        tealiumTrackEvent({
          type: 'link',
          payload: {
            method: 'google news',
            event_name: 'preferred_source',
          },
        });
        const newWindow = window.open(
          'https://www.google.com/preferences/source?q=beobachter.ch',
          '_blank',
          'noopener,noreferrer',
        );
        if (newWindow) {
          newWindow.opener = null;
        }
      }}
      type="submit"
      size="small"
      mobileFullWidth
    >
      <SVGIcon
        className={styles.Icon}
        type={SVG_ICONS_TYPE_GOOGLE_PREFERRED_SOURCE}
      />
      <span className={styles.Content}>Bevorzugte Quelle</span>
    </Button>
  );
};

const ExplanationButton: ButtonComponent = () => {
  return (
    <Button
      variant="tertiary"
      onClick={() => {
        tealiumTrackEvent({
          type: 'link',
          payload: {
            method: 'google news',
            event_name: 'preferred_source_explanation',
          },
        });
        window.location.href =
          'https://www.beobachter.ch/service/schluss-mit-ki-bevormundung-so-kontrollieren-sie-ihre-google-suche-928192';
      }}
      size="small"
      mobileFullWidth
    >
      <span className={styles.Content}>So funktioniert&apos;s</span>
    </Button>
  );
};

const GooglePreferredSource = googlePreferredSourceFactory({
  styles: { GooglePreferredSource: styles.GooglePreferredSource },
  Button: GooglePreferredSourceButton,
  ExplanationButton,
});

export default GooglePreferredSource;
