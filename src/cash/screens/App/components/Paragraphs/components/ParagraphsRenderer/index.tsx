import React, { ReactElement, memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { VideoType } from '../../../../../../../shared/helpers/createVideoObjectJsonLd';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/helpers/ensureVideo'. '/Users/bhs/code/work/r */
import { ensureVideoItem } from '../../../../../../../shared/helpers/ensureVideo';
import { ensureWidgetItem } from '../../../../../../../shared/helpers/ensureWidget';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/helpers/mapDataForInfoBox'. '/Users/bhs/code/ */
import { mapDataForInfobox } from '../../../../../../../shared/helpers/mapDataForInfoBox';
import { findFirstParagraphIdByType } from '../../../../../../../shared/helpers/utils';
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import MusterportfolioTable from '../../../../screens/MyCash/components/Musterportfolio/MusterportfolioTable';
import PortfolioSummary from '../../../../screens/MyCash/components/Musterportfolio/PortfolioSummary';
import AppNexus from '../../../AppNexus';
import Error from '../../../Error';
import AdvantagesParagraph from '../AdvantagesParagraph';
import BlockquoteParagraph from '../BlockquoteParagraph';
import ContentParagraph from '../ContentParagraph';
import EmbedParagraph from '../EmbedParagraph';
import EntityQueueParagraph from '../EntityQueueParagraph';
import HeroMediaParagraph from '../HeroMediaParagraph';
import ImageParagraph from '../ImageParagraph';
import InfoBoxParagraph from '../InfoBoxParagraph';
import LinkBoxParagraph from '../LinkBoxParagraph';
import ListicleItemParagraph from '../ListicleItemParagraph';
import MinistageParagraph from '../MinistageParagraph';
import MultiColumnParagraph from '../MultiColumnParagraph';
import ParallaxImageParagraph from '../ParallaxImageParagraph';
import PianoTemplateParagraph from '../PianoTemplateParagraph';
import SectionParagraph from '../SectionParagraph';
import TeaserParagraph from '../TeaserParagraph';
import TeaserStageParagraph from '../TeaserStageParagraph';
import TextParagraph from '../TextParagraph';
import VideoParagraph from '../VideoParagraph';
import WebformParagraph from '../WebformParagraph';
import WidgetParagraph from '../WidgetParagraph';
import { ParagraphIndexContext } from '../../../../../../../shared/context/paragraphs';
import { PAGE_SCREEN_MARKETING_TYPE } from '../../../../../../../beobachter/screens/App/screens/PageScreen/constants';
import {
  EMBED_WIDTH_FULL,
  EMBED_WIDTH_GRID,
} from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/constants';
import { RENDER_AD_TYPE_RECOS } from '../../../../../../../shared/constants/ads';
import {
  ARTICLE_CONTENT_TYPE,
  ARTICLE_TYPE_NEWS,
  ARTICLE_TYPE_TICKER,
  NATIVE_ADVERTISING_CONTENT_TYPE,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  ADVANTAGES_PARAGRAPH,
  AD_PARAGRAPH,
  BLOCKQUOTE_PARAGRAPH,
  CONTENT_PARAGRAPH,
  EMBED_PARAGRAPH,
  ENTITY_QUEUE_PARAGRAPH,
  HERO_MEDIA_PARAGRAPH,
  IMAGE_PARAGRAPH,
  INFOBOX_PARAGRAPH,
  INPUT_FORM_PARAGRAPH,
  LINK_BOX_PARAGRAPH,
  LISTICLE_ITEM_PARAGRAPH,
  MINISTAGE_PARAGRAPH,
  MULTI_COLUMNS_PARAGRAPH,
  PARALLAX_IMAGE_PARAGRAPH,
  PIANO_TEMPLATE_PARAGRAPH,
  PORTFOLIO_PARAGRAPH,
  PORTFOLIO_SUMMARY_PARAGRAPH,
  PORTFOLIO_TRANSACTIONS_BUY_PARAGRAPH,
  PORTFOLIO_TRANSACTIONS_SELL_PARAGRAPH,
  SECTION_PARAGRAPH,
  TEASER_PARAGRAPH,
  TEASER_STAGE_PARAGRAPH,
  TEXT_PARAGRAPH,
  TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE,
  TEXT_PARAGRAPH_TABLE_STRIPED_STYLE_VALUE,
  TEXT_PARAGRAPH_TABLE_STYLE_VALUE,
  TEXT_PARAGRAPH_TABLE_WITHOUT_BORDERS_STYLE_VALUE,
  VIDEO_PARAGRAPH,
  WIDGET_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { FULLQUOTE_PAGE_TYPE } from '../../../../screens/FullquotePage/constants';
import { LANDING_PAGE_TYPE } from '../../../../screens/LandingPage/constants';
import {
  PAGESCREEN_DEFAULT_TYPE,
  PAGESCREEN_MARKETING_TYPE,
  PAGE_SCREEN_HERO_MEDIA_TYPE,
} from '../../../../screens/PageScreen/constants';
import { QUOTE_LIST_PAGE_TYPE } from '../../../../screens/QuoteListPage/constants';
import { SPONSOR_DEFAULT_TYPE } from '../../../../screens/Sponsor/constants';
import { VIDEO_PAGE } from '../../../../screens/Video/constants';
import { isContentAd, isIAVSlot } from '../../../AppNexus/constants';
import {
  TEXT_PARAGRAPH_DEFAULT,
  TEXT_PARAGRAPH_TABLE,
} from '../TextParagraph/constants';
import { PARAGRAPHS_RENDERER_ORIGIN } from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { RecommendationsNode } from '../../../../../../../shared/hooks/useRecommendations/typings';
import { ParagraphsRendererProps } from './typings';

/**
 * The ParagraphsRenderer component is called recursively to render all paragraphs. The index  will only be increased if the origin of the ParagraphsRenderer is included in the array of allowed origins. We only count/increase the paragraph indexes on the first level of the recursion.
 */
/* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'index' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const ConditionalParagraphIndexContext = ({ origin, index, children }) => {
  return [
    LANDING_PAGE_TYPE,
    PAGESCREEN_DEFAULT_TYPE,
    FULLQUOTE_PAGE_TYPE,
    ARTICLE_CONTENT_TYPE,
    NATIVE_ADVERTISING_CONTENT_TYPE,
    ARTICLE_TYPE_NEWS, // Article subtype
    ARTICLE_TYPE_TICKER, // Article subtype
  ].includes(origin) ? (
    <ParagraphIndexContext.Provider value={index}>
      {children}
    </ParagraphIndexContext.Provider>
  ) : (
    children
  );
};

type ParagraphsRendererPropsInner = ParagraphsRendererProps & {
  viewportLabel?: string;
};

type AdZoneProps = {
  adSlots?: Array<{
    slotName: string;
    deviceType: 'mobile' | 'tabletDesktop';
  }>;
  origin: string;
  isLastParagraph: boolean;
};

/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Generator<RecommendationsNode, any, unknown>'. */
const latestNAGenerator: Generator<RecommendationsNode> = null;
let listicleIndex: number;

const ParagraphsRenderer = (
  props: ParagraphsRendererPropsInner,
): ReactElement => {
  const {
    pageBody,
    hasContainer = true,
    paragraphsForFree = null,
    landingPagePullOut,
    origin,
    viewportLabel,
    isMarketingPageReducedHeader,
  } = props;

  // reset listicle index on every render
  listicleIndex = -1;

  if (!pageBody || !Array.isArray(pageBody) || pageBody.length < 1) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const isInsideLandingPage =
    origin?.includes(LANDING_PAGE_TYPE) ||
    origin?.includes(PAGE_SCREEN_MARKETING_TYPE);
  const scrollOffset = getScrollOffset(isInsideLandingPage, viewportLabel);

  const isMarketingPage = origin?.includes(PAGE_SCREEN_MARKETING_TYPE);

  return (
    <>
      {pageBody.map((entry, index): ReactElement => {
        if (!entry) {
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
          return null;
        }

        if (entry.__typename === INPUT_FORM_PARAGRAPH && !entry.webform) {
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
          return;
        }

        const isFirstParagraph = index === 0;
        const isLastParagraph = index === pageBody.length - 1;
        const hasAdSlots = entry.adSlots?.length > 0;

        const hasContainerClass =
          hasContainer &&
          entry.__typename !== MINISTAGE_PARAGRAPH &&
          entry.__typename !== ADVANTAGES_PARAGRAPH &&
          entry.__typename !== LISTICLE_ITEM_PARAGRAPH &&
          entry.__typename !== PARALLAX_IMAGE_PARAGRAPH &&
          entry.__typename !== HERO_MEDIA_PARAGRAPH &&
          !(
            entry.__typename === TEXT_PARAGRAPH &&
            entry?.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE
          ) &&
          props.origin !== SPONSOR_DEFAULT_TYPE &&
          !(
            props.origin === PAGESCREEN_MARKETING_TYPE &&
            entry.__typename === SECTION_PARAGRAPH
          ) &&
          !(
            entry.__typename === EMBED_PARAGRAPH &&
            entry.embedWidth === EMBED_WIDTH_FULL
          );

        const withContainerClass = {
          [grid.Container]: hasContainerClass && !landingPagePullOut,
          [styles.ContainerPullOut]: hasContainerClass && landingPagePullOut,
          [styles.NoBottomMargin]:
            (hasContainerClass && landingPagePullOut && hasAdSlots) ||
            (hasContainerClass && landingPagePullOut && isLastParagraph),
        };

        const hasToRenderRecosForDeviceTypes =
          (entry.adSlots?.length > 0 &&
            /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
            /* @ts-ignore TODO: TS7006 ->  Parameter 'adSlot' implicitly has an 'any' type. */
            entry.adSlots?.reduce((acc, adSlot) => {
              if (adSlot.slotName === RENDER_AD_TYPE_RECOS) {
                acc.push(adSlot.deviceType);
              }
              return acc;
            }, [])) ||
          [];

        const paragraphsJsx = (
          <div key={`paragraphs-${entry.id}-${index}`} id={entry.id}>
            <ConditionalParagraphIndexContext
              index={index}
              origin={props.origin}
            >
              <SmoothScroll
                offset={scrollOffset}
                anchorId={getAnchorIdByNode(entry)}
              >
                <>
                  <div
                    className={getSectionForNode(entry, props, isLastParagraph)}
                  >
                    <div
                      className={classNames(
                        'paragraph-wrapper',
                        styles.Paragraphs,
                        withContainerClass, // grid.Container
                      )}
                    >
                      {wrapGridForElement(
                        entry,
                        isFirstParagraph,
                        hasContainerClass,
                        props,
                        /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */
                        isInsideLandingPage,
                        isMarketingPageReducedHeader,
                        isMarketingPage,
                      )}
                    </div>
                    {!props.isAdSuppressed && (
                      <AdZoneFinal
                        adSlots={entry.adSlots || []}
                        /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                        origin={props.origin}
                        isLastParagraph={isLastParagraph}
                      />
                    )}
                  </div>
                  {props.contentGcid &&
                    hasToRenderRecosForDeviceTypes.length > 0 && (
                      <div
                        className={classNames(
                          'recommendation-slot',
                          getSectionForNode(entry, props, isLastParagraph),
                          styles.SectionDefaultMargin,
                          {
                            [styles.SectionDefaultMarginTop]:
                              entry.__typename === TEXT_PARAGRAPH &&
                              !entry.isLastOfGroup,
                            'recommendation-slot-mobile':
                              hasToRenderRecosForDeviceTypes.includes('mobile'),
                            'recommendation-slot-tabletDesktop':
                              hasToRenderRecosForDeviceTypes.includes(
                                'tabletDesktop',
                              ),
                          },
                        )}
                      ></div>
                    )}
                </>
              </SmoothScroll>
            </ConditionalParagraphIndexContext>
          </div>
        );

        if (paragraphsForFree !== null && index >= paragraphsForFree) {
          return (
            <div
              key={`paragraph-paywall-${entry.id || index}`}
              className={`restricted-section-${index + 1}`}
            >
              {paragraphsJsx}
            </div>
          );
        }

        return paragraphsJsx;
      })}
    </>
  );
};

// TODO: as the "parentRenderer" logic is broken on the stack -
// we simply don't know which cases shall NOT have a margin
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasSectionDefaultMarginByOrigin = (origin: string) => {
  return ![
    VIDEO_PAGE,
    `${SECTION_PARAGRAPH}_${MULTI_COLUMNS_PARAGRAPH}`,
  ].includes(origin);
};

const getSectionForNode = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  entry,
  {
    addSectionClass = '',
    origin,
    isAdSuppressed,
    hasTwoColumns,
  }: ParagraphsRendererPropsInner,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'isLastParagraph' implicitly has an 'any' type. */
  isLastParagraph,
): string => {
  const hasAds = entry.adSlots?.length > 0;
  switch (entry.__typename) {
    case AD_PARAGRAPH:
      return (!isAdSuppressed && 'ad-wrapper') || '';
    // case EMBED_PARAGRAPH:
    //   return sections.Section;
    case LISTICLE_ITEM_PARAGRAPH:
      if (entry.isLastOfGroup) {
        return classNames(sections.Section, styles.SectionDefaultMargin);
      } else {
        return sections.Section;
      }
    case INPUT_FORM_PARAGRAPH:
      return classNames({
        [styles.SectionDefaultMargin]:
          entry.isLastOfGroup &&
          !isLastParagraph &&
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
          hasSectionDefaultMarginByOrigin(origin) &&
          !hasAds,
        [styles.InputFormOnHeroMedia]:
          origin === PAGE_SCREEN_HERO_MEDIA_TYPE && !hasTwoColumns,
      });
    case TEXT_PARAGRAPH:
      return classNames(sections.Section, {
        [addSectionClass]: !!addSectionClass,
        [styles.SectionDefaultMargin]:
          entry.isLastOfGroup &&
          !isLastParagraph &&
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
          hasSectionDefaultMarginByOrigin(origin) &&
          !hasAds,
        [styles.MarketingPage]: origin === PAGESCREEN_MARKETING_TYPE,
      });
    default:
      return classNames(sections.Section, {
        [addSectionClass]: !!addSectionClass,
        [styles.SectionDefaultMargin]:
          !entry.isLastOfGroup &&
          !isLastParagraph &&
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
          hasSectionDefaultMarginByOrigin(origin) &&
          (!hasAds || isAdSuppressed),
        [styles.SectionFirstMargin]: [
          `${SECTION_PARAGRAPH}_${MULTI_COLUMNS_PARAGRAPH}`,
          MULTI_COLUMNS_PARAGRAPH,
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        ].includes(origin),
        [styles.MarketingPage]: origin === PAGESCREEN_MARKETING_TYPE,
      });
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
const getAnchorIdByNode = (entry) => {
  const anchorId: string = entry?.anchorId || '';

  // if (!anchorId && entry?.__typename === INPUT_FORM_PARAGRAPH) {
  //   anchorId = entry.id;
  // }

  return anchorId;
};

const wrapGridForElement = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  entry,
  isFirstParagraph: boolean,
  hasContainerClass: boolean,
  props: ParagraphsRendererPropsInner,
  isInsideLandingPage: boolean,
  isMarketingPageReducedHeader: boolean,
  isMarketingPage: boolean,
): ReactElement => {
  const paragraphType: string = entry.__typename || '';
  const jsx = getComponentForEntry(
    entry,
    isFirstParagraph,
    props,
    isInsideLandingPage,
    isMarketingPageReducedHeader,
    isMarketingPage,
  );
  if (
    hasContainerClass === false ||
    paragraphType === MINISTAGE_PARAGRAPH ||
    paragraphType === INFOBOX_PARAGRAPH ||
    (paragraphType === EMBED_PARAGRAPH &&
      [EMBED_WIDTH_FULL, EMBED_WIDTH_GRID].includes(entry.embedWidth))
  ) {
    return <TestFragment data-testid="paragraph-item">{jsx}</TestFragment>;
  }

  return (
    <div className={grid.Row} data-testid="paragraph-item">
      <div className={props.colStyle}>
        <div>{jsx}</div>
      </div>
    </div>
  );
};

const getComponentForEntry = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  entry,
  isFirstParagraph = false,
  props: ParagraphsRendererPropsInner,
  isInsideLandingPage: boolean,
  isMarketingPageReducedHeader: boolean,
  isMarketingPage: boolean,
): ReactElement | null => {
  switch (entry.__typename) {
    case TEXT_PARAGRAPH:
      if (entry.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE) {
        return (
          <TestFragment data-testid="paragraphsrenderer-info-box-paragraph-wrapper">
            <InfoBoxParagraph
              infoBoxParagraph={mapDataForInfobox(entry)}
              articleColStyle={props.colStyle}
              origin={props.origin}
            />
          </TestFragment>
        );
      }
      const textParagraphComponent = [
        TEXT_PARAGRAPH_TABLE_STYLE_VALUE,
        TEXT_PARAGRAPH_TABLE_WITHOUT_BORDERS_STYLE_VALUE,
        TEXT_PARAGRAPH_TABLE_STRIPED_STYLE_VALUE,
      ].includes(entry.styleValue)
        ? TEXT_PARAGRAPH_TABLE
        : TEXT_PARAGRAPH_DEFAULT;

      return (
        <TestFragment data-testid="paragraphsrenderer-text-paragraph-wrapper">
          <TextParagraph
            isFirst={isFirstParagraph && props.showCap}
            addClass={props.addClass}
            addHeaderClass={props.addHeaderClass}
            origin={props.origin}
            textParagraph={entry}
            component={textParagraphComponent}
          />
        </TestFragment>
      );
    case BLOCKQUOTE_PARAGRAPH:
      return <BlockquoteParagraph blockquoteParagraph={entry} />;
    case ENTITY_QUEUE_PARAGRAPH:
      return (
        <EntityQueueParagraph
          entityQueue={entry}
          origin={props.origin}
          iconTypeRight="IconChevronRight"
          isFirst={
            findFirstParagraphIdByType(
              props.pageBody,
              ENTITY_QUEUE_PARAGRAPH,
            ) === entry.id
          }
          latestNAGenerator={latestNAGenerator}
        />
      );
    case MINISTAGE_PARAGRAPH:
      return (
        <MinistageParagraph
          ministageParagraph={entry}
          origin={props.origin}
          colStyle={props.colStyle}
        />
      );
    case INFOBOX_PARAGRAPH:
      return (
        <InfoBoxParagraph
          infoBoxParagraph={entry}
          articleColStyle={props.colStyle}
        />
      );
    case VIDEO_PARAGRAPH:
    case VIDEO_CONTENT_TYPE:
      const ensuredVideo: { video: VideoType } = ensureVideoItem(entry);
      return (
        ensuredVideo.video && (
          <VideoParagraph
            video={ensuredVideo.video}
            origin={props.origin}
            suppressSource={entry.suppressSource}
          />
        )
      );
    case MULTI_COLUMNS_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-multicolumsparagraph-wrapper">
          <MultiColumnParagraph
            multiColumnParagraph={entry}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            origin={props.origin}
          />
        </TestFragment>
      );
    case PARALLAX_IMAGE_PARAGRAPH:
      return (
        <ParallaxImageParagraph
          parallaxImageParagraph={entry}
          isSplittedPageLayout
        />
      );
    case WIDGET_PARAGRAPH:
      const markup = (
        <WidgetParagraph
          widgetParagraph={ensureWidgetItem(entry)}
          origin={props.origin}
        />
      );
      return (
        <TestFragment data-testid="paragraphsrenderer-widget-paragraph-wrapper">
          {/* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */}
          {(props.origin.endsWith(QUOTE_LIST_PAGE_TYPE) && isFirstParagraph && (
            <div className={styles.FullHeightPlaceholder}>{markup}</div>
          )) ||
            markup}
        </TestFragment>
      );
    case CONTENT_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-content-paragraph-wrapper">
          <ContentParagraph contentParagraph={entry} origin={props.origin} />
        </TestFragment>
      );
    case PORTFOLIO_SUMMARY_PARAGRAPH:
      return <PortfolioSummary title={'Musterportfolio'} portfolio={entry} />;
    case PORTFOLIO_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-portfolio-main-paragraph-wrapper">
          <MusterportfolioTable
            portfolio={entry}
            origin={PARAGRAPHS_RENDERER_ORIGIN}
            type="main"
          />
        </TestFragment>
      );
    case PORTFOLIO_TRANSACTIONS_BUY_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-portfolio-buy-paragraph-wrapper">
          <MusterportfolioTable
            portfolio={entry}
            origin={PARAGRAPHS_RENDERER_ORIGIN}
            type="buy"
          />
        </TestFragment>
      );
    case PORTFOLIO_TRANSACTIONS_SELL_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-portfolio-sell-paragraph-wrapper">
          <MusterportfolioTable
            portfolio={entry}
            origin={PARAGRAPHS_RENDERER_ORIGIN}
            type="sell"
          />
        </TestFragment>
      );
    case EMBED_PARAGRAPH:
      return <EmbedParagraph embedParagraph={entry} origin={props.origin} />;
    case IMAGE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-image-paragraph-wrapper">
          <ImageParagraph imageParagraph={entry} origin={props.origin} />
        </TestFragment>
      );
    case SECTION_PARAGRAPH:
      /* @ts-ignore TODO: TS7006 ->  Parameter 'item' implicitly has an 'any' type. */
      const hasWidgetParagraph = entry?.body?.some((item) => {
        return item.__typename === WIDGET_PARAGRAPH;
      });
      const colStyles =
        (isMarketingPage && hasWidgetParagraph && grid.Col24) || props.colStyle;
      return (
        <TestFragment data-testid="paragraphsrenderer-sectionparagraph-wrapper">
          <SectionParagraph
            sectionParagraph={entry}
            origin={`${SECTION_PARAGRAPH}_${props.origin}`}
            colStyle={colStyles}
          />
        </TestFragment>
      );
    case INPUT_FORM_PARAGRAPH:
      if (entry && typeof entry === 'object' && entry.webform) {
        return (
          <WebformParagraph
            webform={entry.webform}
            anchorId={getAnchorIdByNode(entry)}
          />
        );
      }
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    case HERO_MEDIA_PARAGRAPH:
      return (
        <HeroMediaParagraph
          entry={entry}
          isCentered={isMarketingPageReducedHeader}
        />
      );
    case TEASER_STAGE_PARAGRAPH:
      return <TeaserStageParagraph teaserStage={entry} origin={props.origin} />;
    case LISTICLE_ITEM_PARAGRAPH:
      const scrollOffset = getScrollOffset(
        isInsideLandingPage,
        props.viewportLabel,
      );

      listicleIndex += 1;

      return (
        <TestFragment data-testid="paragraphsrenderer-listicleitem-paragraph-wrapper">
          <ListicleItemParagraph
            listicleItem={entry}
            listicleIndex={listicleIndex}
            origin={props.origin}
            isNested={!isInsideLandingPage}
            scrollOffset={scrollOffset}
          />
        </TestFragment>
      );
    case ADVANTAGES_PARAGRAPH:
      return <AdvantagesParagraph entry={entry} />;
    case TEASER_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-teaser-paragraph-wrapper">
          <TeaserParagraph teaserParagraph={entry} origin={props.origin} />
        </TestFragment>
      );
    // let all other cases fall through to default case
    case PIANO_TEMPLATE_PARAGRAPH:
      return <PianoTemplateParagraph pianoTemplateParagraph={entry} />;
    case LINK_BOX_PARAGRAPH:
      return <LinkBoxParagraph linkBox={entry} />;
    default:
      // eslint-disable-next-line no-underscore-dangle
      /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return __DEVELOPMENT__ ? (
        <Error msg={`Paragraphs: No Component for: ${entry.__typename}`} />
      ) : null;
  }
};

const AdZone = ({
  adSlots,
  origin,
  isLastParagraph,
}: AdZoneProps): ReactElement => {
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  if (adSlots.length === 0) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const jsx = adSlots.map((adSlot) => {
    if (adSlot.slotName === RENDER_AD_TYPE_RECOS) {
      return null;
    }

    return (
      <span
        className={styles.AdZone}
        key={`${adSlot.slotName}-${Math.floor(Math.random() * 10000)}`}
      >
        <div
          className={classNames(
            'ad-wrapper',
            styles.AdPadding,
            (adSlot.deviceType && `ad-wrapper-${adSlot.deviceType}`) || '',
            {
              ['ad-overview']:
                origin === LANDING_PAGE_TYPE ||
                origin === PAGESCREEN_DEFAULT_TYPE ||
                origin.indexOf(`${FULLQUOTE_PAGE_TYPE}-`) > -1,
            },
          )}
        >
          <div
            className={classNames(styles.AdWrapper, {
              [styles.IAVWrapper]: isIAVSlot(adSlot),
              [styles.RemoveAdPadding]:
                isLastParagraph &&
                (origin === LANDING_PAGE_TYPE ||
                  origin === PAGESCREEN_DEFAULT_TYPE ||
                  origin.indexOf(`${FULLQUOTE_PAGE_TYPE}-`) > -1),
            })}
          >
            <TestFragment
              data-testid="paragraphsrenderer-ad-wrapper"
              data-slot={adSlot.slotName}
            >
              <AppNexus
                slot={adSlot.slotName}
                isMultiPlacement={isContentAd(adSlot.slotName)}
                deviceType={adSlot.deviceType}
              />
            </TestFragment>
          </div>
        </div>
      </span>
    );
  });

  if (
    origin === LANDING_PAGE_TYPE ||
    origin === PAGESCREEN_DEFAULT_TYPE ||
    origin.indexOf(`${FULLQUOTE_PAGE_TYPE}-`) > -1
  ) {
    return <div className={styles.AdContainer}>{jsx}</div>;
  }
  return <>{jsx}</>;
};
const AdZoneFinal = memo(AdZone);

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  viewportLabel: windowStateSelector(state).viewport.label,
});

export default connect(mapStateToProps)(memo(ParagraphsRenderer));
