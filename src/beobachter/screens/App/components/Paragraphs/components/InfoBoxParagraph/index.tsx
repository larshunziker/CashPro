import React, { FC } from 'react';
import classNames from 'classnames';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import CollapsableBox from './components/CollapsableBox';
import RechtsratgeberBox from './components/RechtsratgeberBox';
import { isInLongFormArticleBody } from '../../../../../../shared/helpers/isInLongFormArticleBody';
import {
  INFO_BOX_STYLE_GUIDER,
  INFO_BOX_STYLE_GUIDER_NOTES,
  INFO_BOX_STYLE_GUIDER_PEARLS,
} from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import { SECTION_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import { ARTICLE_TYPE_LONG_READ } from '../../../../../../../shared/constants/content';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { InfoBoxParagraphProps } from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/typings';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const markStyleAsUsed = [styles.Typography];

const InfoBoxParagraph: FC<InfoBoxParagraphProps> = ({
  infoBoxParagraph,
  origin,
  pageLayoutType,
}) => {
  if (
    !infoBoxParagraph?.infoBox?.body ||
    infoBoxParagraph.infoBox.body.length < 1
  ) {
    return null;
  }

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInLongFormArticle = isInLongFormArticleBody(origin);
  const isInLongFormSectionParagraph =
    origin === `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_LONG_READ}`;

  switch (infoBoxParagraph.infoBox.style) {
    case INFO_BOX_STYLE_GUIDER:
    case INFO_BOX_STYLE_GUIDER_PEARLS:
    case INFO_BOX_STYLE_GUIDER_NOTES:
      return (
        <TestFragment data-testid="infobox-paragraph-guider-box-wrapper">
          <RechtsratgeberBox
            origin={origin}
            infoBoxParagraph={infoBoxParagraph}
            pageLayoutType={pageLayoutType}
          />
        </TestFragment>
      );

    default:
      return (
        <TestFragment data-testid="infobox-paragraph-collapsable-box-default-wrapper">
          <CollapsableBox
            origin={origin}
            infoBoxParagraph={infoBoxParagraph}
            articleColStyle={classNames({
              [classNames([
                grid.ColOffsetXs1,
                grid.ColXs22,
                grid.ColOffsetSm2,
                grid.ColSm20,
                grid.ColOffsetMd2,
                grid.ColMd20,
                grid.ColOffsetXl6,
                grid.ColXl12,
              ])]: !isInLongFormArticle && !isInLongFormSectionParagraph,
              [classNames([
                grid.ColOffsetSm3,
                grid.ColSm18,
                grid.ColOffsetMd6,
                grid.ColMd12,
              ])]: isInLongFormArticle,
            })}
            pageLayoutType={pageLayoutType}
          />
        </TestFragment>
      );
  }
};

export default InfoBoxParagraph;
