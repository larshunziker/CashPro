/* istanbul ignore file */

import React from 'react';
import heroMediaParagraphFactory from '../../../../../../../common/components/Paragraphs/components/HeroMediaParagraph/factory';
import ImageParagraph from '../ImageParagraph';
import ParagraphsRenderer from '../ParagraphsRenderer';
import { PAGE_SCREEN_HERO_MEDIA_TYPE } from '../../../../screens/PageScreen/constants';
import styles from './styles.legacy.css';
import { HeroMediaParagraphProps } from '../../../../../../../common/components/Paragraphs/components/HeroMediaParagraph/typings';

const getAppParagraphsRenderer = ({
  entry,
  hasTwoColumns,
}: HeroMediaParagraphProps) => {
  if (!entry?.content) {
    return null;
  }

  return (
    <ParagraphsRenderer
      showCap={false}
      pageBody={entry.content}
      hasContainer={false}
      origin={PAGE_SCREEN_HERO_MEDIA_TYPE}
      hasTwoColumns={hasTwoColumns}
    />
  );
};

const HeroMediaParagraph = heroMediaParagraphFactory({
  ImageParagraph,
  /* @ts-ignore TODO: TS2322 ->  Type '({ entry, hasTwoColumns, } */
  paragraphsRenderer: getAppParagraphsRenderer,
  styles: {
    Wrapper: styles.Wrapper,
    ContentWrapper: styles.ContentWrapper,
    ImageWrapper: styles.ImageWrapper,
    InnerWrapper: styles.InnerWrapper,
    Title: styles.Title,
    SubTitle: styles.SubTitle,
    ShortTitle: styles.ShortTitle,
    Lead: styles.Lead,
    ParagraphsWrapper: styles.ParagraphsWrapper,
    CenteredContent: styles.CenteredContent,
    ImageParagraph: styles.ImageParagraph,
  },
});

export default HeroMediaParagraph;
