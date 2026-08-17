import React, { ComponentType } from 'react';
import Link from '../../../../../../../../../common/components/Link';
import { BookingConfirmation, ConfirmationFactoryOptions } from './typings';

const ConfirmationFactory = ({ styles }: ConfirmationFactoryOptions) => {
  const Confirmation: ComponentType<BookingConfirmation> = ({
    phoneNumber,
    time,
    weekdayFormat,
    texts,
    placeholders,
    description,
  }) => (
    <div>
      <div className={styles.Title}>{texts.title || placeholders.title}</div>
      <div
        className={styles.Info}
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string | TrustedHTML'. */
        dangerouslySetInnerHTML={{ __html: texts.description }}
      />

      <div className={styles.FieldWrapper}>
        <span className={styles.Label}>Datum</span>
        <p className={styles.Value}>{weekdayFormat}</p>
      </div>

      <div className={styles.FieldWrapper}>
        <span className={styles.Label}>Uhrzeit</span>
        <p className={styles.Value}>{time} Uhr</p>
      </div>

      <div className={styles.FieldWrapper}>
        <span className={styles.Label}>
          Anmerkungen zu Ihrem Beratungsanliegen
        </span>
        <p className={styles.Value}>{description || 'Nicht gefunden'}</p>
      </div>

      <div className={styles.FieldWrapper}>
        <span className={styles.Label}>Telefonnummer</span>
        <p className={styles.Value}>{phoneNumber}</p>
      </div>

      {texts.buttonLink && (
        <div>
          <Link
            className={styles.Button}
            path={texts.buttonLink}
            label={texts.buttonLabel || placeholders.buttonLabel}
          />
        </div>
      )}
    </div>
  );

  return Confirmation;
};

export default ConfirmationFactory;
