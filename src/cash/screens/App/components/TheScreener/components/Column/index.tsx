import React from 'react';
import classNames from 'classnames';
import Icon from '../../../Icon';
import RestrictedContent from '../../../RestrictedContent';
import { pianoOfferConfig } from '../../../Paragraphs/components/PianoTemplateParagraph/config';
import styles from './styles.legacy.css';
import { ColumnProps } from './typings';
const Column = ({
  type,
  points,
  hasValidSubscription,
  isCrawler,
}: ColumnProps) => {
  const isRestricted = (index: number) =>
    index > 0 && !isCrawler && !hasValidSubscription;

  const openPianoOverlay = (index: number) => {
    if (!isRestricted(index)) {
      return;
    }

    const isProd = __DOT_ENV__ === 'master' || __DOT_ENV__ === 'production';
    const pianoConfig = {
      sandbox: {
        ...pianoOfferConfig.sandbox.anleger,
      },
      production: {
        ...pianoOfferConfig.production.anleger,
      },
    };
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    if (global?.tp?.offer) {
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global.tp.offer.show({
        templateId:
          pianoConfig[(isProd && 'production') || 'sandbox'].templateId,
        offerId: pianoConfig[(isProd && 'production') || 'sandbox'].offerId,
        templateVariantId:
          pianoConfig[(isProd && 'production') || 'sandbox'].templateId,
        displayMode: 'modal',
        showCloseButton: true,
      });
    }
  };

  return (
    <div className={styles.Wrapper}>
      <p
        className={classNames(styles.Title, {
          [styles.TitlePro]: type === 'pro',
          [styles.TitleContra]: type === 'contra',
        })}
      >
        {type === 'pro' ? 'pro' : 'kontra'}
      </p>
      <div className={styles.Rows}>
        {points.map((point, index) => {
          return (
            (point && (
              <div className={styles.Row} key={index}>
                <Icon
                  type={type === 'pro' ? 'IconCirclePlus' : 'IconCircleMinus'}
                  addClass={classNames(styles.Icon, {
                    [styles.IconPro]: type === 'pro',
                    [styles.IconContra]: type === 'contra',
                  })}
                />
                <div
                  onClick={() => openPianoOverlay(index)}
                  onKeyUp={() => openPianoOverlay(index)}
                  role="button"
                  tabIndex={0}
                >
                  <RestrictedContent isActive={isRestricted(index)}>
                    <p>{point}</p>
                  </RestrictedContent>
                </div>
              </div>
            )) ||
            null
          );
        })}
      </div>
    </div>
  );
};
export default Column;
