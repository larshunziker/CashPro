import React, { ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../Link';
import {
  TRACKING_CLASS_TEASER,
  TRACKING_TEASER_PARAGRAPH_INDEX,
  TRACKING_TEASER_PARAGRAPH_TYPE,
  TRACKING_TEASER_POSITION,
} from '../../../../../shared/constants/tracking';
import { SpecialStageFactoryOptions } from './typings';

export default ({
  teaserStage,
  Img,
  button,
  publicationLogo,
  backgroundImage,
  mainSponsorImage,
  styles,
  paragraphType,
  paragraphIndex,
}: SpecialStageFactoryOptions): ReactElement => {
  const renderArticles = ({ node }: any, index: number): ReactElement => {
    return (
      <Link
        className={classNames(
          styles.ReferenceArticleLink,
          TRACKING_CLASS_TEASER,
        )}
        key={`special-reference-article-${index}`}
        path={node?.preferredUri || ''}
        trackingData={[
          {
            type: TRACKING_TEASER_PARAGRAPH_TYPE,
            value: paragraphType,
          },
          {
            type: TRACKING_TEASER_PARAGRAPH_INDEX,
            value: `${paragraphIndex + 1}`,
          },
          {
            type: TRACKING_TEASER_POSITION,
            value: `${index + 1}`,
          },
        ]}
      >
        <>
          <div className={styles.ReferenceArticleShortTitle}>
            {node?.shortTitle || node?.channel?.title || ''}
          </div>
          <div className={styles.ReferenceArticleTitle}>
            {node?.title || ''}
          </div>
        </>
      </Link>
    );
  };

  const renderPartners = (
    { node }: any,
    index: number,
    edges: Array<any>,
  ): ReactElement => {
    return (
      <div className={styles.PartnerItem} key={`sponsor-partner-${index}`}>
        {node?.title || ''}
        {index !== edges.length - 1 && ', '}
      </div>
    );
  };

  const { termReference, entities } = teaserStage;
  const { logoChoice, sponsor, partners, landingPage, special } =
    termReference as Channel;

  if (
    !landingPage?.title ||
    !landingPage?.shortTitle ||
    !landingPage?.preferredUri
  ) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <div className={styles.SpecialLWrapper}>
      {backgroundImage || null}
      <div className={styles.InnerWrapper}>
        <div className={styles.ColumnLeft}>
          {publicationLogo || null}
          <Link
            className={classNames(
              styles.LandingPageLink,
              TRACKING_CLASS_TEASER,
              {
                [styles.Spacing]: !logoChoice,
              },
            )}
            path={landingPage?.preferredUri}
            trackingData={[
              {
                type: TRACKING_TEASER_PARAGRAPH_TYPE,
                value: paragraphType,
              },
              {
                type: TRACKING_TEASER_PARAGRAPH_INDEX,
                value: `${paragraphIndex + 1}`,
              },
              {
                type: TRACKING_TEASER_POSITION,
                value: '0',
              },
            ]}
          >
            <>
              <Img
                addClass={styles.SpecialImage}
                url={special?.logo?.source}
                alt={special?.title}
              />
              <div className={styles.ShortTitle}>{landingPage?.shortTitle}</div>
              <div className={styles.Title}>{landingPage?.title}</div>
              {button || null}
            </>
          </Link>
        </div>
        <div
          className={classNames(
            styles.ColumnRight,
            styles.ReferenceArticleWrapper,
          )}
        >
          {entities?.edges &&
            Array.isArray(entities?.edges) &&
            entities &&
            entities.edges.map(renderArticles)}
          {mainSponsorImage || null}
        </div>
      </div>
      <div
        className={styles.PartnersWrapper}
        style={{
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'BackgroundColor | undefined'. */
          backgroundColor: sponsor?.colorCode
            ? sponsor?.colorCode
            : special?.colorCode,
        }}
      >
        <div className={styles.PartnersRow}>
          <div className={styles.PartnersColumn}>
            {partners?.edges &&
              Array.isArray(partners?.edges) &&
              partners &&
              partners.edges.map(renderPartners)}
          </div>
        </div>
      </div>
    </div>
  );
};
