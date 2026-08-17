import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import collapsableBoxParagraphFactory from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/CollapsableBox/factory';
import { isInLongFormArticleBody } from '../../../../../../../../shared/helpers/isInLongFormArticleBody';
import { isInsideColumn } from '../../../../../../../../shared/helpers/isInsideColumn';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import Icon from '../../../../../Icon';
import ParagraphsRenderer from '../../../ParagraphsRenderer';
import { INFO_BOX_TYPE } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../../../common/screens/PageTemplate/constants';
import {
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_RATGEBER,
  ARTICLE_TYPE_SPONSORED,
} from '../../../../../../../../../shared/constants/content';
import { SECTION_PARAGRAPH } from '../../../../../../../../../shared/constants/paragraphs';
import { LANDING_PAGE_TYPE } from '../../../../../../screens/LandingPage/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { CollapsableBoxFactoryOptionsStyles } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/CollapsableBox/typings';
import { InfoBoxParagraphProps } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/typings';

type InfoBoxParagraphPropsInner = InfoBoxParagraphProps & {
  routeVertical: string;
};

const getAppParagraphsRenderer = ({
  infoBoxParagraph,
}: InfoBoxParagraphPropsInner) => {
  if (!infoBoxParagraph?.infoBox?.body) {
    return null;
  }

  return (
    <ParagraphsRenderer
      pageBody={infoBoxParagraph.infoBox.body}
      hasContainer={false}
      addClass={styles.Typography}
      addSectionClass={styles.SectionMargin}
      origin={INFO_BOX_TYPE}
    />
  );
};

const getStylesByProps = ({
  origin,
  pageLayoutType,
  infoBoxParagraph,
}: InfoBoxParagraphPropsInner): CollapsableBoxFactoryOptionsStyles => {
  const isSplittedPageLayout = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    pageLayoutType,
  );
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInColumn = isInsideColumn(origin);
  const isInLandingPage = origin === LANDING_PAGE_TYPE;
  const isInInfobox = origin === INFO_BOX_TYPE;
  const isInSponsored = origin === ARTICLE_TYPE_SPONSORED;
  const isInOpinion = origin === ARTICLE_TYPE_OPINION;
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isInLongFormArticle = isInLongFormArticleBody(origin);
  const isInLongFormSectionParagraph =
    origin === `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_LONG_READ}`;

  return {
    Wrapper: classNames({
      [grid.Container]:
        !isInColumn &&
        !isInInfobox &&
        !isSplittedPageLayout &&
        !isInLongFormArticle &&
        !isInLongFormSectionParagraph,
      [grid.ContainerInner]: isInColumn && !isSplittedPageLayout,
    }),
    InnerWrapper: classNames(styles.InnerWrapper, {
      [grid.Row]: !isInLongFormArticle,
    }),
    Container: classNames(styles.Container, {
      [styles.InfoBoxTip]: infoBoxParagraph?.infoBox?.style === 'tip',
      [styles.InfoBoxWarning]: infoBoxParagraph?.infoBox?.style === 'warning',
      [styles.InfoBoxInfo]: infoBoxParagraph?.infoBox?.style === 'info',
    }),
    Title: styles.Title,
    Content: styles.Content,
    ToggleWrapper: styles.ToggleWrapper,
    ColStyle: classNames({
      [classNames([
        grid.ColOffsetSm3,
        grid.ColSm18,
        grid.ColOffsetMd2,
        grid.ColMd20,
      ])]: isInColumn && !isInLongFormArticle,
      [classNames([
        grid.ColOffsetSm3,
        grid.ColSm18,
        grid.ColOffsetMd1,
        grid.ColMd17,
        grid.ColOffsetXl5,
        grid.ColXl14,
      ])]: isInSponsored || isInOpinion,
      [classNames([grid.ColOffsetXl2, grid.ColXl16])]:
        isInColumn && origin !== ARTICLE_TYPE_RATGEBER && !isInLongFormArticle,
      [classNames([grid.ColOffsetXl5, grid.ColXl14])]:
        origin === ARTICLE_TYPE_RATGEBER,
      [classNames([
        grid.ColOffsetSm3,
        grid.ColSm18,
        grid.ColOffsetMd6,
        grid.ColMd12,
      ])]: isInLongFormArticle,
      [classNames([grid.ColOffset1, grid.Col22])]: isInLandingPage,
      [grid.Col24]: isInInfobox,
    }),
  };
};

const mapStateToProps = (state: ReduxState) => ({
  routeVertical: locationStateSelector(state).vertical,
});

export default connect(mapStateToProps)(
  collapsableBoxParagraphFactory({
    /* @ts-ignore TODO: TS2322 ->  Type '({ infoBoxParagraph, } */
    paragraphsRenderer: getAppParagraphsRenderer,
    Icon,
    IconTypes: {
      arrowUpIconType: 'IconChevronUp',
      arrowDownIconType: 'IconChevronDown',
    },
    styles: getStylesByProps,
  }),
);
