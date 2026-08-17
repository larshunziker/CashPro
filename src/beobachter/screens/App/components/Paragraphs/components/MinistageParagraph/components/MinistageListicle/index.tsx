import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { assembleAkamaiImgUrl } from '../../../../../../../../../common/components/Picture/helpers';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import Link from '../../../../../../../../../common/components/Link';
import TestFragment from '../../../../../../../../../shared/tests/components/TestFragment';
import Icon from '../../../../../Icon';
import MinistageLink from './components/MinistageLink';
import Img from '../../../../../Img';
import {
  TRACKING_CLASS_MINISTAGE_LISTICLE_PARAGRAPH,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../../../shared/constants/tracking';
import styles from './styles.legacy.css';
import LockIcon from 'graphics/lock_icon.svg';
import { MinistageListicleProps } from './typings';

export type MinistageListiclePropsInner = MinistageListicleProps;

const MinistageListicle = ({
  ministageListicle,
}: MinistageListiclePropsInner) => {
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );

  const links =
    (ministageListicle.links && ministageListicle.links.edges) || null;

  if (!links) {
    return null;
  }

  const headerImgUrl = assembleAkamaiImgUrl({
    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
    relativeOriginPath: ministageListicle.image?.relativeOriginPath,
    width: 480, // large
    height: 0,
    clientUrl,
  });

  const name = ministageListicle?.name || 'Artikel';

  const filteredLinks = links.filter(
    (item) => !(!item || !item.node || !item.node.path || !item.node.label),
  );

  const isHeadlineBadge = ministageListicle.headline?.includes(':mitlogin:');
  const headline = ministageListicle.headline?.replace(':mitlogin:', '');

  return (
    <div
      className={classNames(
        TRACKING_CLASS_PARAGRAPH,
        TRACKING_CLASS_MINISTAGE_LISTICLE_PARAGRAPH,
        styles.Wrapper,
      )}
    >
      <div className={styles.TitleWrapper}>
        {ministageListicle.headline && (
          <div className={styles.TitleText}>{headline}</div>
        )}
        {isHeadlineBadge && (
          <div className={styles.TitleBadge}>
            <Img
              addClass={styles.TitleBadgeIcon}
              alt="Mit Login"
              url={LockIcon}
              width={14}
              height={14}
              ignoreLandscapeClass
            />
            <span>Mit Login</span>
          </div>
        )}
      </div>

      <div className={styles.Title}>
        <TestFragment data-testid="ministage-name">{name}</TestFragment>
      </div>

      {headerImgUrl && (
        <img
          className={styles.Image}
          src={headerImgUrl}
          alt={ministageListicle.image?.alt || ''}
        />
      )}

      {filteredLinks.map((item, index) => (
        <MinistageLink
          key={`ministage-link-${index}`}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<LinkEdge>' is not assignable to type 'LinkEdge'. */
          item={item}
          index={index}
        />
      ))}

      {ministageListicle.callToActionLink && (
        <div className={styles.Actions}>
          {/* @ts-ignore TODO: TS2322 ->  Type '{ children */}
          <Link {...ministageListicle.callToActionLink}>
            <button className={styles.CallToActionButton}>
              <span>{ministageListicle.callToActionLink.label}</span>
              <Icon addClass={styles.ArrowRight} type="IconArrowRight" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default MinistageListicle;
