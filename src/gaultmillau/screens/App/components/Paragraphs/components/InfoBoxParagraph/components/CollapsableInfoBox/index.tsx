import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import classNames from 'classnames';
import collapsableBoxParagraphFactory from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/CollapsableBox/factory';
import { mergeClasses } from '../../../../../../../../../shared/helpers/mergeClasses';
import locationStateSelector from '../../../../../../../../../shared/selectors/locationStateSelector';
import Icon from '../../../../../Icon';
import ParagraphsRenderer from '../../../ParagraphsRenderer';
import { RECIPE_CONTENT_TYPE } from '../../../../../../../../../shared/constants/content';
import {
  INFOBOX_PARAGRAPH,
  TEASER_PARAGRAPH,
  TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE,
} from '../../../../../../../../../shared/constants/paragraphs';
import { LANDING_PAGE_TYPE } from '../../../../../../screens/LandingPage/constants';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { CollapsableBoxFactoryOptionsStyles } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/components/CollapsableBox/typings';
import { InfoBoxParagraphProps } from '../../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/typings';

type InfoBoxParagraphPropsInner = InfoBoxParagraphProps & {
  routeVertical: string;
};

const getTitle = (
  infoBoxBody: Array<ParagraphInterface & { title?: string }>,
) =>
  (isRecipeTeaser(infoBoxBody) && (
    <h3 className={styles.RecipeTitle}>
      <FormattedMessage
        id="app.infoboxparagraph.titlesingular"
        description="The singular title of the infobox paragraph"
        defaultMessage="Rezept"
      />
    </h3>
  )) ||
  (isTeaserParagraph(infoBoxBody) && infoBoxBody?.[0]?.title && (
    <h3 className={styles.ParagraphTitle}>{infoBoxBody?.[0]?.title}</h3>
  )) ||
  null;

const getAppParagraphsRenderer = ({
  infoBoxParagraph,
}: InfoBoxParagraphProps) => {
  return (
    <ParagraphsRenderer
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      pageBody={infoBoxParagraph.infoBox.body}
      hasContainer={false}
      origin={INFOBOX_PARAGRAPH}
    />
  );
};

const isRecipeTeaser = (
  paragraphs: Array<
    ParagraphInterface & {
      __typename?: string;
      teasers?: TeaserableInterfaceConnection & {
        edges: [{ node: { __typename: string } }];
      };
    }
  >,
) =>
  paragraphs.length === 1 &&
  paragraphs[0].__typename === TEASER_PARAGRAPH &&
  paragraphs[0].teasers?.edges?.[0]?.node?.__typename === RECIPE_CONTENT_TYPE;

const isTeaserParagraph = (
  paragraphs: Array<
    ParagraphInterface & {
      __typename?: string;
      titlle?: string;
    }
  >,
) => paragraphs[0].__typename === TEASER_PARAGRAPH;

const mapStateToProps = (state: ReduxState) => ({
  routeVertical: locationStateSelector(state).vertical,
});

const getStylesByProps = ({
  origin,
}: InfoBoxParagraphPropsInner): CollapsableBoxFactoryOptionsStyles => {
  const isInLandingPage = origin === LANDING_PAGE_TYPE;
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const isInInfobox = origin.includes(INFOBOX_PARAGRAPH);
  const isStyledParagraph =
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    origin.includes(TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE) && !isInInfobox;

  return {
    Wrapper: classNames({
      [grid.Container]: !isInInfobox && !isStyledParagraph,
    }),
    InnerWrapper: classNames(grid.Row, styles.InnerWrapper),
    Container: classNames(styles.Container, {
      [styles.StyledParagraphContainer]: isStyledParagraph,
    }),
    Title: styles.Title,
    Content: styles.Content,
    ToggleWrapper: styles.ToggleWrapper,
    ColStyle: classNames({
      [mergeClasses([grid.ColOffset1, grid.Col22])]:
        isStyledParagraph || isInLandingPage,
      [grid.Col24]: isInInfobox,
    }),
  };
};

export default connect(mapStateToProps)(
  collapsableBoxParagraphFactory({
    paragraphsRenderer: getAppParagraphsRenderer,
    getTitle,
    Icon,
    IconTypes: {
      arrowUpIconType: 'IconChevronUp',
      arrowDownIconType: 'IconChevronDown',
    },
    styles: getStylesByProps,
  }),
);
