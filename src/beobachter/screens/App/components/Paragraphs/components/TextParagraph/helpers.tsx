import React from 'react';
import classNames from 'classnames';
import { isInLongFormArticleBody } from '../../../../../../shared/helpers/isInLongFormArticleBody';
import { CROSSWORD } from '../../../../../../shared/actions/route';
import { mergeClasses } from '../../../../../../../shared/helpers/mergeClasses';
import { TextParagraphPropsInner } from './index';
import { SECTION_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import {
  ARTICLE_TYPE_GUIDE,
  ARTICLE_TYPE_RATGEBER,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  FINANCE_DICTIONARY_TYPE,
  NATIVE_ADVERTISING_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  PAGE_SCREEN_MARKETING_TYPE,
  PAGESCREEN_MARKETING_TYPE_LONGFORM,
} from '../../../../screens/PageScreen/constants';
import {
  INFO_BOX_STYLE_GUIDER,
  INFO_BOX_TYPE,
} from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import { TEXT_PARAGRAPH_TABLE } from './constants';
import styles from './styles.legacy.css';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import {
  TextParagraphFactoryOptionsStyles,
  TextParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/TextParagraph/typings';

const EXPLAINING_ARTICLE_SECTION_PARAGRAPH = `${SECTION_PARAGRAPH}_${EXPLAINING_ARTICLE_CONTENT_TYPE}`;

export const getStylesByProps = ({
  addClass = '',
  origin,
  style,
  component,
}: TextParagraphPropsInner): TextParagraphFactoryOptionsStyles => {
  const isMarketingPage = origin === PAGE_SCREEN_MARKETING_TYPE;

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInLongFormArticle = isInLongFormArticleBody(origin);

  return {
    Wrapper: classNames(styles.RichTextWrapper, {
      [addClass]: !!addClass,
      [styles.CrosswordStyle]: origin === CROSSWORD,
      [styles.SponsoredArticleParagraph]:
        origin === NATIVE_ADVERTISING_CONTENT_TYPE,
      [styles.MarketingPage]: isMarketingPage,
      [styles.ExplainingArticle]:
        origin === EXPLAINING_ARTICLE_SECTION_PARAGRAPH,
      [styles.Longform]: origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
      [mergeClasses([grid.ColXl18, grid.ColOffsetXl3])]:
        origin === ARTICLE_TYPE_RATGEBER,
      [mergeClasses([
        grid.ColOffsetSm2,
        grid.ColSm20,
        grid.ColOffsetMd4,
        grid.ColMd16,
      ])]: isInLongFormArticle,
    }),
    Header: classNames(styles.Header, {
      [styles.MarketingPage]: isMarketingPage,
      [styles.Longform]: origin === PAGESCREEN_MARKETING_TYPE_LONGFORM,
      [styles.Infobox]:
        origin === INFO_BOX_TYPE && style !== INFO_BOX_STYLE_GUIDER,
      [styles.InfoboxGuider]:
        origin === INFO_BOX_TYPE && style === INFO_BOX_STYLE_GUIDER,
    }),
    ...(component === TEXT_PARAGRAPH_TABLE && {
      Overflow: styles.Overflow,
      HideLeftShadow: styles.HideLeftShadow,
      HideRightShadow: styles.HideRightShadow,
    }),
  };
};

export const getHeaderByProps = (
  { origin, style, textParagraph }: TextParagraphProps,
  appStyles: TextParagraphFactoryOptionsStyles,
) => {
  if (!textParagraph.header) {
    return null;
  }

  if (
    [
      FINANCE_DICTIONARY_TYPE,
      `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_GUIDE}`,
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    ].includes(origin)
  ) {
    return (
      <h3
        data-testid="textparagraph-header-finance-dictionary"
        className={appStyles.Header}
      >
        {textParagraph.header}
      </h3>
    );
  }

  if (origin === INFO_BOX_TYPE && style === INFO_BOX_STYLE_GUIDER) {
    return (
      <div
        data-testid="textparagraph-header-infobox-style-guider"
        className={appStyles.Header}
      >
        {textParagraph.header}
      </div>
    );
  }

  return (
    <div data-testid="textparagraph-header" className={appStyles.Header}>
      {textParagraph.header}
    </div>
  );
};
