import React, { ReactElement } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../shared/tests/components/TestFragment/index';
import { ANCHOR_HERO } from '../../../../../shared/constants/content';
import { IMAGE_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import {
  HeroMediaParagraphFactoryOptions,
  HeroMediaParagraphProps,
} from './typings';

const HeroMediaParagraphFactory = ({
  ImageParagraph,
  paragraphsRenderer: appParagraphsRenderer,
  styles,
}: HeroMediaParagraphFactoryOptions) => {
  const HeroMediaParagraph = ({
    entry,
    isCentered = true,
  }: HeroMediaParagraphProps): ReactElement => {
    const { id, title, subTitle, shortTitle, lead, body, background } = entry;
    const hasTwoColumns =
      body &&
      Array.isArray(body) &&
      body.length > 0 &&
      body.find(
        (entry: any) => (entry.__typename as string) === IMAGE_PARAGRAPH,
      );

    const paragraphsRenderer =
      (typeof appParagraphsRenderer === 'function' &&
        appParagraphsRenderer({
          entry,
          isCentered,
          hasTwoColumns: !!hasTwoColumns,
        })) ||
      null;

    return (
      <TestFragment data-testid="wrapper">
        <div
          id={ANCHOR_HERO}
          className={classNames(styles.Wrapper, {
            [grid.GridCentered]: isCentered,
          })}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'Background<string | number> | undefined'. */
          style={{ background: background }}
        >
          <div className={classNames(grid.Container)}>
            <div className={classNames(styles.InnerWrapper, grid.Row)}>
              <div
                className={classNames(
                  styles.ContentWrapper,
                  grid.ColXs24,
                  grid.ColSm18,
                  {
                    [grid.ColMd20]: !hasTwoColumns,
                    [grid.ColMd12]: hasTwoColumns,
                    [grid.ColXl12]: hasTwoColumns,
                    /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
                    [styles.CenteredContent]: !hasTwoColumns,
                  },
                )}
              >
                {shortTitle && (
                  <div
                    className={styles.ShortTitle}
                    data-testid="shortTitle-wrapper"
                  >
                    {shortTitle}
                  </div>
                )}
                <h2 className={styles.Title} data-testid="title-wrapper">
                  {title}
                </h2>
                {subTitle && (
                  <div
                    className={styles.SubTitle}
                    data-testid="subTitle-wrapper"
                  >
                    {subTitle}
                  </div>
                )}
                {lead && (
                  <div className={styles.Lead} data-testid="lead-wrapper">
                    {lead}
                  </div>
                )}
                <div className={styles.ParagraphsWrapper}>
                  {paragraphsRenderer || null}
                </div>
              </div>

              {hasTwoColumns
                ? body.map((entry: any) => {
                    if (!entry || !entry?.image) {
                      return null;
                    }
                    if ((entry.__typename as string) === IMAGE_PARAGRAPH) {
                      return (
                        <div
                          id={entry?.anchorId}
                          className={classNames(
                            styles.ImageWrapper,
                            grid.ColXs24,
                            grid.ColSm18,
                            grid.ColMd12,
                            grid.ColXl12,
                          )}
                          key={`hero-media-paragraph-${id}`}
                        >
                          <ImageParagraph
                            key={`hero-media-paragraph-${id}`}
                            imageParagraph={entry}
                            plainImage
                            imageHeroMediaParagraph
                            heroMediaParagraph
                          />
                        </div>
                      );
                    }
                  })
                : null}
            </div>
          </div>
        </div>
      </TestFragment>
    );
  };

  return HeroMediaParagraph;
};

export default HeroMediaParagraphFactory;
