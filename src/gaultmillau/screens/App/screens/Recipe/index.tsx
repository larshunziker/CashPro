import React, { useEffect, useState } from 'react';
import { FormattedMessage, IntlShape, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import lifecycle from 'recompose/lifecycle';
import classNames from 'classnames';
import { getAllAuthors } from '../Article/shared/helpers';
import {
  createTabsContent,
  recipeColLeadStyle,
  recipeColStyle,
  recipeParagraphColStyle,
} from './shared/helpers';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import withHeaderProps, {
  WithHeaderProps,
} from '../../../../shared/decorators/withHeaderProps';
import withHelmet from '../../../../shared/decorators/withHelmet';
import {
  resetHeaderData,
  setHeaderData,
  setVerticalTitle,
} from '../../../../shared/actions/header';
import useInView, {
  UseInViewResponse,
} from '../../../../../shared/hooks/useInView';
import useRecommendations from '../../../../../shared/hooks/useRecommendations';
import EditButtons from '../../components/EditButtons';
import Hero from '../../components/Hero';
import Paragraphs from '../../components/Paragraphs';
import Recommendations from '../../components/Recommendations';
import TabsTwoCols from '../../components/TabsTwoCols';
import UtilityBar from '../../components/UtilityBar';
import UtilityOverlay from '../../components/UtilityBar/components/UtilityOverlay';
import ArticleKeywords from '../Article/components/ArticleKeywords';
import RecipeAuthor from './components/RecipeAuthor';
import RecipeLead from './components/RecipeLead';
import { DEFAULT_LANGUAGE } from '../../components/Navigation/components/LanguageSwitch';
import { RECIPE_CONTENT_TYPE } from '../../../../../shared/constants/content';
import { INPUT_FORM_PARAGRAPH } from '../../../../../shared/constants/paragraphs';
import {
  PUBLICATION_GROUP_GM,
  PUBLICATION_GROUP_GM_FR,
} from '../../../../../shared/constants/publications';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../shared/constants/recommendations';
import { ROOT_SCHEMA_TYPE_RECIPE } from '../../../../../shared/constants/structuredData';
import { TEASER_LAYOUT_ML } from '../../../../../shared/constants/teaser';
import { TRACKING_CLASS_CONTENT_RECOMMENDATIONS } from '../../../../../shared/constants/tracking';
import {
  UTILITY_BAR_SHARE_LABEL,
  UTILITY_BAR_SHARE_LABEL_FR,
} from '../../../../../shared/constants/utilitybar';
import {
  UTILITYBAR_CONFIG,
  UTILITYBAR_OVERLAY_CONFIG,
} from '../../components/UtilityBar/constants';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { useRecommendationsResponse } from '../../../../../shared/hooks/useRecommendations/typings';
import { RecipeProps } from './typings';

export type RecipePropsInner = RecipeProps &
  WithHeaderProps & {
    setHeaderData: Function;
    resetHeaderData: Function;
  } & {
    recipe: Recipe;
    setVerticalTitle: Function;
    language: string;
    intl: IntlShape;
  };

const FETCH_RECOS_LIMIT = 3;

const getEmptyTeaserPlaceholder = (
  gcid = Math.random().toString(), // Math.random as fallback if gcid is not set (should actually never happen)
  itemsCount = FETCH_RECOS_LIMIT,
) => {
  return Array(itemsCount)
    .fill({})
    .map((_, index) => {
      return {
        node: { id: `${gcid}-${index}` },
        skeleton: true,
      };
    });
};

const RecipeDetail = ({
  recipe,
  intl,
  language,
  setHeaderData,
  resetHeaderData,
}: RecipePropsInner) => {
  const {
    gcid,
    subtypeValue = '',
    preferredUri,
    title,
    shortTitle,
    __typename,
    lead,
    channel,
    socialMediaTitle,
    restrictionStatus,
    keywords,
  } = recipe;
  useEffect(() => {
    setHeaderData({
      articleData: {
        gcid,
        title,
        shortTitle,
        subtypeValue,
        preferredUri,
      },
      contentType: __typename,
    });
    return () => {
      resetHeaderData();
    };
  }, [
    __typename,
    gcid,
    preferredUri,
    resetHeaderData,
    setHeaderData,
    subtypeValue,
    title,
    shortTitle,
  ]);

  // @ts-ignore
  const [recos, setRecos] = useState<typeof Recommendations>(
    // @ts-ignore
    gcid && getEmptyTeaserPlaceholder(gcid),
  );

  const [hasFetchedRecos, setHasFetchedRecos] = useState(false);

  const { fetchRecommendations }: useRecommendationsResponse =
    useRecommendations();

  const {
    setRef: bottomRecosRef,
    isInView: isBottomRecosInView,
  }: UseInViewResponse = useInView({
    rootMargin: '50px',
    triggerOnce: true,
  });

  useEffect(() => {
    setHeaderData({
      articleData: {
        gcid,
        title,
        shortTitle,
        lead,
        subtypeValue,
        channel,
        preferredUri,
        socialMediaTitle,
        restrictionStatus,
      },
      contentType: __typename,
    });
    return () => {
      resetHeaderData();
    };
  }, [
    __typename,
    gcid,
    channel,
    preferredUri,
    resetHeaderData,
    setHeaderData,
    socialMediaTitle,
    subtypeValue,
    title,
    shortTitle,
    lead,
    restrictionStatus,
  ]);

  // useEffect to reset the state if the recos have already been fetched
  useEffect(() => {
    return () => {
      if (gcid) {
        setHasFetchedRecos(false);
        // @ts-ignore
        setRecos(getEmptyTeaserPlaceholder(gcid));
      }
    };
  }, [gcid]);

  // useEffect to fetch recos
  useEffect(() => {
    if (!gcid) {
      return;
    }

    if (!hasFetchedRecos && isBottomRecosInView) {
      const fetchOperation = RECOMMENDATION_OPERATION.WITH_RELATED_CONTENT;

      fetchRecommendations({
        contentId: gcid,
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<KeywordConnection> | undefined' is not assignable to type 'KeywordConnection'. */
        articleKeywords: keywords,
        publication:
          language === DEFAULT_LANGUAGE
            ? PUBLICATION_GROUP_GM
            : PUBLICATION_GROUP_GM_FR,
        limit: FETCH_RECOS_LIMIT,
        operation: fetchOperation,
        type: RECOMMENDATION_TYPE.CBRECO,
        hasRelatedContentField: true,
      }).then((res) => {
        // @ts-ignore
        setRecos(res);
      });

      setHasFetchedRecos(true);
    }
  }, [
    isBottomRecosInView,
    hasFetchedRecos,
    fetchRecommendations,
    gcid,
    keywords,
    language,
  ]);

  return (
    <div className={`recipe-detail ${styles.Wrapper}`}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={recipe?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={recipe?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={recipe?.cloneContentUri}
      />

      {/* hero */}
      {(recipe &&
        recipe.heroImageBody &&
        Array.isArray(recipe.heroImageBody) &&
        recipe.heroImageBody.length > 0 && (
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ParagraphInterface>[]' is not assignable to type 'heroImageBody[]'. */
          <Hero heroImageBody={recipe.heroImageBody} />
        )) || <div className={styles.HeadlessPlaceholder} />}

      <div className={sections.Section}>
        <div className={grid.Container}>
          <div className={grid.Row}>
            {
              <RecipeLead
                recipe={recipe}
                articleColStyle={recipeColLeadStyle}
              />
            }
          </div>
          <div className={styles.UtilityBarWrapper}>
            <UtilityBar enabledUtilities={UTILITYBAR_CONFIG}>
              {/* @ts-ignore TODO: TS7031 ->  Binding element 'isOverlayVisible' implicitly has an 'any' type. */}
              {/* @ts-ignore TODO: TS7031 ->  Binding element 'toggleOverlayVisible' implicitly has an 'any' type. */}
              {({ isOverlayVisible, toggleOverlayVisible }) => (
                <UtilityOverlay
                  overlayTitle={
                    language === DEFAULT_LANGUAGE
                      ? UTILITY_BAR_SHARE_LABEL
                      : UTILITY_BAR_SHARE_LABEL_FR
                  }
                  isOverlayVisible={isOverlayVisible}
                  toggleOverlayVisible={toggleOverlayVisible}
                  enabledUtilities={UTILITYBAR_OVERLAY_CONFIG}
                />
              )}
            </UtilityBar>
          </div>

          {recipe.chiefCook &&
            recipe.chiefCook.edges &&
            recipe.chiefCook.edges.length > 0 && (
              <div className={grid.Row}>
                <div className={recipeColStyle}>
                  <RecipeAuthor
                    recipe={recipe}
                    intl={intl}
                    language={language}
                  />
                </div>
              </div>
            )}
        </div>
      </div>

      <div className={sections.Section}>
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={recipeColStyle}>
              <TabsTwoCols
                addClass={styles.ContentWrapper}
                tabs={createTabsContent(recipe)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={sections.Section}>
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={recipeColStyle}>
              <div className={styles.Divider} />
              <Paragraphs
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                pageBody={recipe.instructions.filter(
                  // @ts-ignore
                  ({ __typename }) => __typename === INPUT_FORM_PARAGRAPH,
                )}
                hasContainer={false}
                colStyle={recipeParagraphColStyle}
                origin={RECIPE_CONTENT_TYPE}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={classNames(sections.Section, styles.Copyright)}>
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={grid.ColXs24}>
              <span>
                {recipe.chiefCook &&
                  recipe.chiefCook.edges &&
                  recipe.chiefCook.edges.length > 0 &&
                  /* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<PersonEdge>[]' is not assignable to parameter of type '(AuthorEdge | PersonEdge)[]'. */
                  getAllAuthors(recipe, recipe.chiefCook.edges, intl, false)}
                {recipe.organization &&
                  recipe.organization.organizationData && (
                    <span>
                      {recipe.organization.organizationData.restaurantName &&
                        `, ${recipe.organization.organizationData.restaurantName}`}
                      {recipe.organization.organizationData.secondaryName &&
                        `, ${recipe.organization.organizationData.secondaryName}`}
                      {recipe.organization.city &&
                        `, ${recipe.organization.city}`}
                    </span>
                  )}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={sections.Section}>
        <div className={grid.Container}>
          <div className={grid.Row}>
            <div className={recipeColStyle}>
              {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
              {keywords?.edges?.length > 0 && (
                <ArticleKeywords
                  keywords={keywords}
                  colStyle={recipeParagraphColStyle}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
        ref={bottomRecosRef}
        className={classNames(
          TRACKING_CLASS_CONTENT_RECOMMENDATIONS,
          sections.Section,
        )}
      >
        <div className={grid.Container}>
          <Recommendations
            items={recos}
            teaserLayout={TEASER_LAYOUT_ML}
            title={
              <FormattedMessage
                id="app.article.relatedStories"
                description="Heading above related stories teasers"
                defaultMessage="Related Stories"
              />
            }
          />
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setVerticalTitle,
  setHeaderData,
  resetHeaderData,
};

const mapStateToProps = (state: Object): Object => ({
  language: settingsStateSelector(state).language,
});

const withLifecycle = lifecycle<any, any>({
  // set and remove vertical header title based on current recipe channel
  componentDidMount(): void {
    this.props.setVerticalTitle(
      (this.props &&
        this.props.recipe &&
        this.props.recipe.channel &&
        this.props.recipe.channel.title) ||
        '',
    );
  },
  componentWillUnmount(): void {
    this.props.setVerticalTitle('');
  },
});

export default compose<any, any>(
  withHeaderProps,
  connect(mapStateToProps, mapDispatchToProps),
  injectIntl,
  withLifecycle,
  withHelmet({
    getNode: (mapProps: RecipePropsInner): Recipe | null =>
      mapProps.recipe || null,
    rootSchemaType: ROOT_SCHEMA_TYPE_RECIPE,
    hasBreadcrumbs: () => false,
  }),
)(RecipeDetail);
