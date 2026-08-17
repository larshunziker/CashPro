import React, { ComponentType } from 'react';
import Link from '../../../../../../../../../common/components/Link';
import { BookingConfirmation, ConfirmationFactoryOptions } from './typings';

const ConfirmationFactory = ({ styles }: ConfirmationFactoryOptions) => {
  const Confirmation: ComponentType<BookingConfirmation> = ({
    phoneNumber,
    description,
    attachment,
    texts,
    placeholders,
  }) => (
    <div>
      <div className={styles.Title}>{texts.title || placeholders.title}</div>
      <div
        className={styles.Info}
        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string | TrustedHTML'. */
        dangerouslySetInnerHTML={{ __html: texts.description }}
      />

      <div className={styles.FieldWrapper}>
        <span className={styles.Label}>Telefonnummer</span>
        <p className={styles.Value}>{phoneNumber}</p>
      </div>

      <div className={styles.FieldWrapper}>
        <span className={styles.Label}>Ergänzungen</span>
        <p className={styles.Value}>{description}</p>
      </div>

      {(attachment && (
        <div className={styles.FieldWrapper}>
          <span className={styles.Label}>Dokument</span>
          <p className={styles.Value}>{attachment}</p>
        </div>
      )) || (
        <div className={styles.FieldWrapper}>
          <span className={styles.Label}>
            Sie haben die Option gewählt, das Dokument per Post an folgende
            Adresse zu schicken:
          </span>
          <p className={styles.Value}>
            Ringier Medien Schweiz AG
            <br />
            Beobachter Beratungszentrum
            <br />
            Postfach
            <br />
            Flurstrasse 55
            <br />
            8021 Zürich
          </p>
        </div>
      )}

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
