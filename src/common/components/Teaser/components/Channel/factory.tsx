import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../LinkLegacy';
import Picture from '../../../Picture';
import { TRACKING_CLASS_TEASER } from '../../../../../shared/constants/tracking';
import { TeaserChannelFactoryOptions, TeaserChannelProps } from './typings';

const TeaserChannelFactory = ({
  teaserImageStyles,
  imageIdentifier,
  styles,
  disableWrapperClassName = false,
  downloadPriority,
}: TeaserChannelFactoryOptions) => {
  const TeaserChannel = ({
    authors,
    landingPage,
    settings,
    title,
    preferredUri,
  }: TeaserChannelProps): ReactElement => {
    const author = authors?.edges?.[0]?.node || null;
    const authorImagePath =
      author?.imageParagraph?.image?.file?.relativeOriginPath || null;
    const focalPointX =
      author?.imageParagraph?.image?.file?.focalPointX || null;
    const focalPointY =
      author?.imageParagraph?.image?.file?.focalPointY || null;
    const isChannelAuthor = !!authorImagePath;

    const channelTitle = landingPage?.title || title || '';
    const channelDescription = settings?.lead || '';
    const channelPreferredUri = landingPage?.preferredUri || preferredUri || '';

    if (!channelPreferredUri) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }

    return (
      <Link
        className={classNames(styles.Wrapper, TRACKING_CLASS_TEASER)}
        link={{ path: channelPreferredUri }}
        data-testid="teaser-channel-wrapper"
      >
        <>
          {(teaserImageStyles && isChannelAuthor && authorImagePath && (
            <Picture
              relativeOrigin={authorImagePath}
              /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
              focalPointX={focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'number | null' is not assignable to type 'number | undefined'. */
              focalPointY={focalPointY}
              {...teaserImageStyles}
              alt={author?.name || ''}
              disableWrapperClassName={disableWrapperClassName}
              className={classNames(imageIdentifier, styles.Image)}
              downloadPriority={downloadPriority}
            />
          )) ||
            null}
          <div
            className={styles.ShortTitle}
            data-testid="teaser-channel-short-title"
          >
            {channelTitle}
          </div>
          {channelDescription && (
            <div className={styles.Title} data-testid="teaser-channel-title">
              {channelDescription}
            </div>
          )}
        </>
      </Link>
    );
  };

  return TeaserChannel;
};

export default TeaserChannelFactory;
