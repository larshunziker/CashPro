import React, { useState } from 'react';
import classNames from 'classnames';
import { showPianoOfferTemplate } from '../../../helpers';
import Link from '../../../../../../../../../../../common/components/Link';
import Badge from '../../../../../../../Badge';
import ButtonWithLoading from '../../../../../../../ButtonWithLoading';
import Icon from '../../../../../../../Icon';
import Tooltip from '../Tooltip';
import { Auth0 } from '../../../../../../../../../../../common/components/Auth0Provider';
import styles from './styles.legacy.css';
import { CardProps } from '../../typings';

const Card = ({
  title,
  text,
  price,
  buttonIcon,
  buttonText,
  buttonStyle,
  buttonPath,
  advantages,
  linkText,
  linkPath,
  profi,
  toggleCard,
  active,
  hideButton = false,
  hasBadge = false,
}: CardProps & { toggleCard: () => void; active: boolean }) => {
  const [tooltips, setTooltips] = useState(
    new Array(advantages.length).fill(false),
  );

  const toggleCardState = () => {
    setTooltips(new Array(advantages.length).fill(false));
    toggleCard();
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const toggleTooltip = (index) =>
    setTooltips(tooltips.map((active, i) => (index === i && !active) || false));

  /* @ts-ignore TODO: TS7006 ->  Parameter 'callback' implicitly has an 'any' type. */
  const button = (callback) => (
    <ButtonWithLoading
      size="big"
      variant={(profi && 'secondary') || 'primary'}
      highAttention={(buttonStyle === 'secondary' && true) || false}
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string | undefined'. */
      iconTypeLeft={buttonIcon || null}
      onClick={callback}
    >
      {buttonText}
    </ButtonWithLoading>
  );

  return (
    <div className={styles.Wrapper}>
      {hasBadge && (
        <div className={styles.BadgeWrapper}>
          <Badge text="Beliebt" />
        </div>
      )}
      <div
        className={styles.TitleRow}
        onClick={toggleCardState}
        onKeyDown={toggleCardState}
        role="button"
        tabIndex={0}
      >
        <span className={styles.Title}>{title}</span>
        {(active && <Icon type="IconChevronUp" />) || (
          <Icon type="IconChevronDown" />
        )}
      </div>
      <div
        className={classNames(
          (active && styles.ContentOpen) || styles.ContentClosed,
          styles.Content,
        )}
      >
        <p className={styles.Text}>{text}</p>
        <p className={styles.Price}>{price}</p>
        {!hideButton && (
          <div className={styles.Button}>
            {(profi && (
              <div>
                {(buttonPath && button(() => Auth0.login('general'))) ||
                  button(() =>
                    showPianoOfferTemplate(title.replace('Abo', '').trim()),
                  )}
                <p className={styles.ProfiText}>oder</p>
                <p className={styles.ProfiTitle}>Gratis für Bankkunden</p>
                <Link path="/boersenabo/realtime_kurse">
                  <ButtonWithLoading
                    size="big"
                    variant="primary"
                    highAttention={
                      (buttonStyle === 'secondary' && true) || false
                    }
                  >
                    Depot eröffnen
                  </ButtonWithLoading>
                </Link>
              </div>
            )) ||
              (buttonPath && button(() => Auth0.login('general'))) ||
              button(() =>
                showPianoOfferTemplate(title.replace('Abo', '').trim()),
              )}
          </div>
        )}
        {advantages.map(
          (advantage, key) =>
            advantage.text && (
              <div className={styles.Advantage} key={key}>
                <Icon type="IconCheck" />
                {advantage.text}
                {(advantage.info && (
                  <Tooltip
                    text={advantage.info}
                    active={tooltips[key]}
                    toggle={() => toggleTooltip(key)}
                  />
                )) ||
                  null}
              </div>
            ),
        )}
        <Link className={styles.Link} path={linkPath}>
          {linkText}
        </Link>
      </div>
    </div>
  );
};

export default Card;
