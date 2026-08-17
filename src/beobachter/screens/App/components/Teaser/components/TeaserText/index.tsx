import React, { memo } from 'react';
import classNames from 'classnames';
import { truncateByWord } from '../../../../../../../shared/helpers/utils';
import { getStyleByType } from '../../shared/helpers';
import Icon from '../../../Icon';
import ShortTitle from '../ShortTitle';
import { VIDEO_CONTENT_TYPE } from '../../../../../../../shared/constants/content';
import { TEASER_TITLE_LENGTH } from '../../constants';
import styles from './styles.legacy.css';
import { TeaserTextProps } from './typings';

type TeaserTextPropsInner = TeaserTextProps & {
  channel?: Channel;
  shortTitle?: string;
  hasVideo?: boolean;
  title?: string;
};
const TeaserText = ({
  truncate = false,
  truncateLimit = TEASER_TITLE_LENGTH,
  smallTag = false,
  withChannel = false,
  addClass = '',
  addIconClass = '',
  channel,
  shortTitle,
  subtypeValue,
  __typename,
  publication,
  hasVideo,
  title,
}: TeaserTextPropsInner) => {
  const titleFallback = (withChannel && channel?.title) || shortTitle || '';

  const renderShortTitle = (shortTitle: string) => (
    <div className={styles.ShortTitleWrapper}>
      <ShortTitle
        shortTitle={shortTitle}
        addClass={classNames(
          { [styles.TeaserSTag]: smallTag },
          /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"" | "IsSwissInsurance" | "IsSponsoredArticle" | "IsBr */
          styles[
            getStyleByType({
              subtypeValue,
              __typename,
              publication,
            })
          ],
        )}
      />
    </div>
  );

  return (
    <>
      {!titleFallback && channel?.title && renderShortTitle(channel.title)}
      {titleFallback && renderShortTitle(titleFallback)}
      <h3>
        <span
          className={classNames(styles.TeaserTitle, { [addClass]: !!addClass })}
        >
          {(hasVideo || __typename === VIDEO_CONTENT_TYPE) && (
            <Icon
              type="IconPlay"
              addClass={classNames(styles.Play, {
                [addIconClass]: !!addIconClass,
              })}
            />
          )}
          {truncate ? truncateByWord(title || '', truncateLimit) : title}
        </span>
      </h3>
    </>
  );
};

export default memo<TeaserTextProps>(TeaserText);
