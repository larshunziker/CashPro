import React from 'react';
import classNames from 'classnames';
import { showPianoOfferTemplate } from '../../../helpers';
import Link from '../../../../../../../../../../../common/components/Link';
import Badge from '../../../../../../../Badge';
import ButtonWithLoading from '../../../../../../../ButtonWithLoading';
import { Auth0 } from '../../../../../../../../../../../common/components/Auth0Provider';
import styles from './styles.legacy.css';
import { TitleRowProps } from '../../typings';

const TitleRow = ({
  title,
  subtitle1,
  subtitle2,
  buttonText,
  buttonIcon,
  buttonStyle,
  buttonPath,
  bankPath,
  className,
  hideButton = false,
  hasBadge = false,
}: TitleRowProps & { className: string }) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'callback' implicitly has an 'any' type. */
  const button = (callback) => (
    <ButtonWithLoading
      size="small"
      variant="primary"
      highAttention={(buttonStyle === 'secondary' && true) || false}
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      iconTypeLeft={buttonIcon || null}
      onClick={callback}
    >
      {buttonText}
    </ButtonWithLoading>
  );

  return (
    <div className={classNames(styles.Wrapper, className)}>
      {hasBadge && (
        <div className={styles.BadgeWrapper}>
          <Badge text="Beliebt" />
        </div>
      )}
      <p className={styles.Title}>{title}</p>
      <p className={styles.SubTitle}>{subtitle1}</p>
      <p className={styles.SubTitle}>{subtitle2 || <>&zwnj;</>}</p>
      {!hideButton && (
        <div className={styles.Button}>
          {(buttonPath && button(() => Auth0.login('general'))) ||
            button(() => showPianoOfferTemplate(title))}
        </div>
      )}
      {(bankPath && (
        <p className={styles.Info}>
          Gratis für
          <Link path={bankPath} className={styles.Link}>
            {' Bankkunden'}
          </Link>
          *
        </p>
      )) || <p>&zwnj;</p>}
    </div>
  );
};

export default TitleRow;
