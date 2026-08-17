import React, { ReactElement } from 'react';
import classNames from 'classnames';
import {
  TRACKING_CLASS_MINISTAGE_NEWSLETTER_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../../../shared/constants/tracking';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { MailchimpSubscribeFormProps } from '../../../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/components/MailchimpSubscribeForm/typings';

/**
 * Placeholder form for Cash newsletter ministage.
 * Shows email input only; no Mailchimp (or Sailthru) integration.
 * Used until a real signup backend is implemented.
 */
/* eslint-disable @typescript-eslint/no-unused-vars */
const NewsletterPlaceholderForm = ({
  ministageNewsletter,
  useFullwidthBackground,
}: MailchimpSubscribeFormProps): ReactElement => {
  /* eslint-enable @typescript-eslint/no-unused-vars */
  return (
    <div
      data-testid="newsletter-placeholder-form"
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_MINISTAGE_NEWSLETTER_PARAGRAPH,
        styles.Wrapper,
      )}
    >
      <div className={grid.Row}>
        <div className={styles.InputWrapper}>
          <input
            type="email"
            placeholder="E-Mail-Adresse"
            aria-label="E-Mail für Newsletter"
            className={styles.Input}
            disabled
            readOnly
          />
          <p className={styles.Hint}>
            Newsletter-Anmeldung demnächst verfügbar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPlaceholderForm;
