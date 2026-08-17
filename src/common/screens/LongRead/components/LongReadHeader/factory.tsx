/**
 * @file   long read header factory
 * @author Serkan Ucmak <serkan.ucmak@ringieraxelspringer.ch>
 * @date   2019-01-15
 */

import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { ANCHOR_SCROLL_ID } from '../../../LongRead/factory';
import { TIME_ELAPSED_FORMAT_FULL } from '../../../../../shared/helpers/dateTimeElapsed';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import Picture from '../../../../components/Picture';
import {
  ANCHOR_TITLE,
  ANCHOR_HERO,
} from '../../../../../shared/constants/content';
import {
  STYLE_16X9_1130,
  STYLE_16X9_890,
  STYLE_2X3_210,
  STYLE_3X2_440,
  STYLE_3X2_770,
} from '../../../../../shared/constants/images';
import {
  LongReadHeaderComponent,
  LongReadHeaderFactoryOptions,
  LongReadHeaderProps,
} from './typings';

export type LongReadHeaderPropsInner = LongReadHeaderProps;

const LongReadHeaderFactory = ({
  renderAuthorsAndDateElement,
  renderLead,
  grid,
  styles,
  renderTitleBadge,
  sourceMessage = 'Quelle',
}: LongReadHeaderFactoryOptions) => {
  /* @ts-ignore TODO: TS2322 ->  Type '({ node, } */
  const LongReadHeader: LongReadHeaderComponent = ({
    node,
  }: LongReadHeaderProps) => {
    const clientUrl = useSelector(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
      (state) => locationStateSelector(state).clientUrl,
    );
    if (!node) {
      return null;
    }

    // @ts-ignore
    const longReadArticle: (Article | NativeAdvertising) & {
      heroImageBody: ImageParagraph[];
    } = node;
    const shouldDisplayImageCredit =
      !Array.isArray(longReadArticle?.heroImageBody) ||
      !longReadArticle?.heroImageBody[0].suppressSource;

    return (
      <>
        <div
          className={classNames(
            `long-read-header-${longReadArticle.__typename}`,
            styles.Wrapper,
          )}
          data-testid="longread-wrapper"
        >
          {renderAuthorsAndDateElement &&
            typeof renderAuthorsAndDateElement === 'function' &&
            Array.isArray(longReadArticle?.heroImageBody) &&
            longReadArticle?.heroImageBody[0].image?.file
              ?.relativeOriginPath && (
              <figure
                className={styles.Figure}
                data-testid="longreadheader-authordate-wrapper"
              >
                <div id={ANCHOR_HERO} className={styles.TeaserWrapper}>
                  <Picture
                    downloadPriority="high"
                    relativeOrigin={
                      longReadArticle.heroImageBody[0].image.file
                        .relativeOriginPath
                    }
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                    focalPointX={
                      longReadArticle.heroImageBody[0].image.file.focalPointX
                    }
                    /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                    focalPointY={
                      longReadArticle.heroImageBody[0].image.file.focalPointY
                    }
                    className={styles.ArticleImage}
                    alt={
                      longReadArticle?.heroImageBody[0].image?.file?.alt || ''
                    }
                    title={longReadArticle?.heroImageBody[0].title || ''}
                    style_320={STYLE_2X3_210}
                    style_540={STYLE_3X2_440}
                    style_760={STYLE_3X2_770}
                    style_960={STYLE_16X9_890}
                    style_1680={STYLE_16X9_1130}
                  />
                  <div className={grid.Container}>
                    <div className={styles.OverlappingTextWrapper}>
                      <div className={styles.OverlappingText}>
                        <h1 id={ANCHOR_TITLE} className={styles.Title}>
                          {(longReadArticle && longReadArticle.title) || ''}
                        </h1>
                        {renderAuthorsAndDateElement(
                          longReadArticle,
                          TIME_ELAPSED_FORMAT_FULL,
                          clientUrl,
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {renderTitleBadge && renderTitleBadge(longReadArticle)}
                <div className={grid.Container}>
                  <div className={styles.CaptionWrapper}>
                    <figcaption className={styles.Caption}>
                      {(longReadArticle?.heroImageBody[0].caption && (
                        <span
                          data-testid="longreadheader-imagecaption-wrapper"
                          dangerouslySetInnerHTML={{
                            __html: `${longReadArticle.heroImageBody[0].caption} `,
                          }}
                        />
                      )) ||
                        ''}
                      {longReadArticle?.heroImageBody[0].image?.credit &&
                        shouldDisplayImageCredit && (
                          <span
                            className={styles.ArticleImageCredit}
                            data-testid="longreadheader-imagecredit-wrapper"
                          >
                            {sourceMessage}:{' '}
                            {longReadArticle.heroImageBody[0].image.credit}
                          </span>
                        )}
                    </figcaption>
                  </div>
                </div>
              </figure>
            )}
        </div>
        <div className={grid.Container} id={ANCHOR_SCROLL_ID}>
          {renderLead &&
            typeof renderLead === 'function' &&
            renderLead(longReadArticle)}
        </div>
      </>
    );
  };

  return LongReadHeader;
};

export default LongReadHeaderFactory;
