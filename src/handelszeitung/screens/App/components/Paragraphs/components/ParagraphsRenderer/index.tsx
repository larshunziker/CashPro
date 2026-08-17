import React, { ReactElement, memo, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { VideoType } from '../../../../../../../shared/helpers/createVideoObjectJsonLd';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/helpers/ensureVideo'. '/Users/bhs/code/work/r */
import { ensureVideoItem } from '../../../../../../../shared/helpers/ensureVideo';
import { latestNativeAdvertisingsGenerator } from '../../../../../../../shared/helpers/latestNativeAdvertisings';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/helpers/mapDataForInfoBox'. '/Users/bhs/code/ */
import { mapDataForInfobox } from '../../../../../../../shared/helpers/mapDataForInfoBox';
import { latestNACounter } from '../../../../../../../shared/helpers/useLatestNativeAdvertisings';
import { findFirstParagraphIdByType } from '../../../../../../../shared/helpers/utils';
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import useRecommendations from '../../../../../../../shared/hooks/useRecommendations';
import PianoTemplateParagraph from '../../../../../../../common/components/Paragraphs/components/PianoTemplateParagraph/index';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../../AppNexus';
import Error from '../../../Error';
import ArticleRecommendations from '../../../Recommendations/components/ArticleRecommendations';
import AdvantagesParagraph from '../AdvantagesParagraph';
import BlockquoteParagraph from '../BlockquoteParagraph';
import ContentStageParagraph from '../ContentStageParagraph';
import EmbedParagraph from '../EmbedParagraph';
import EntityQueueParagraph from '../EntityQueueParagraph';
import HeroMediaParagraph from '../HeroMediaParagraph';
import ImageGalleryParagraph from '../ImageGalleryParagraph';
import ImageParagraph from '../ImageParagraph';
import InfoBoxParagraph from '../InfoBoxParagraph';
import LinkBoxParagraph from '../LinkBoxParagraph';
import ListicleItemParagraph from '../ListicleItemParagraph';
import MinistageParagraph from '../MinistageParagraph';
import MultiColumnParagraph from '../MultiColumnParagraph';
import NativeAdvertisingCarouselParagraph from '../NativeAdvertisingCarouselParagraph';
import ParallaxImageParagraph from '../ParallaxImageParagraph';
import RankingListParagraph from '../RankingListParagraph';
import SectionParagraph from '../SectionParagraph';
import TeaserStageParagraph from '../TeaserStageParagraph';
import TextParagraph from '../TextParagraph';
import VideoParagraph from '../VideoParagraph';
import WebformParagraph from '../WebformParagraph';
import { ParagraphIndexContext } from '../../../../../../../shared/context/paragraphs';
import WidgetParagraph from '../WidgetParagraph';
import {
  EMBED_WIDTH_FULL,
  EMBED_WIDTH_GRID,
} from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/constants';
import { INFO_BOX_TYPE } from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import {
  FULL_PAGE_LAYOUT_TYPE,
  RIGHT_COLUMN_PAGE_LAYOUT_TYPE,
} from '../../../../../../../common/screens/PageTemplate/constants';
import { RENDER_AD_TYPE_RECOS } from '../../../../../../../shared/constants/ads';
import { VIDEO_CONTENT_TYPE } from '../../../../../../../shared/constants/content';
import {
  ADVANTAGES_PARAGRAPH,
  AD_PARAGRAPH,
  BLOCKQUOTE_PARAGRAPH,
  CONTENT_STAGE_PARAGRAPH,
  EMBED_PARAGRAPH,
  ENTITY_QUEUE_PARAGRAPH,
  HERO_MEDIA_PARAGRAPH,
  IMAGE_GALLERY_PARAGRAPH,
  IMAGE_PARAGRAPH,
  INFOBOX_PARAGRAPH,
  INPUT_FORM_PARAGRAPH,
  LINK_BOX_PARAGRAPH,
  LISTICLE_ITEM_PARAGRAPH,
  MINISTAGE_PARAGRAPH,
  MULTI_COLUMNS_PARAGRAPH,
  NATIVE_ADVERTISING_CAROUSEL_PARAGRAPH,
  PARALLAX_IMAGE_PARAGRAPH,
  PIANO_TEMPLATE_PARAGRAPH,
  RANKING_LIST_PARAGRAPH,
  SECTION_PARAGRAPH,
  TEASER_STAGE_PARAGRAPH,
  TEXT_PARAGRAPH,
  TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE,
  VIDEO_PARAGRAPH,
  WIDGET_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { PUBLICATION_GROUP_HZ } from '../../../../../../../shared/constants/publications';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../../../shared/constants/recommendations';
import {
  PAGESCREEN_MARKETING_TYPE,
  PAGE_SCREEN_HERO_MEDIA_TYPE,
} from '../../../../screens/PageScreen/constants';
import { VIDEO_PAGE } from '../../../../screens/Video/constants';
import { IAV_1, IAV_2, MMR_1 } from '../../../AppNexus/constants';
import { PARTNER_CONTENT_TITLE } from './constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { RecommendationsNode } from '../../../../../../../shared/hooks/useRecommendations/typings';
import { ParagraphsRendererProps } from './typings';

type ParagraphsRendererPropsInner = ParagraphsRendererProps & {
  viewportLabel?: string;
};

type AdZoneProps = {
  adSlots?: Array<{
    slotName: string;
    deviceType: 'mobile' | 'tabletDesktop';
  }>;
  disableContainer: boolean;
};

/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Generator<RecommendationsNode, any, unknown>'. */
let latestNAGenerator: Generator<RecommendationsNode> = null;
let listicleIndex: number;

const ParagraphsRenderer = (
  props: ParagraphsRendererPropsInner,
): ReactElement => {
  const {
    pageBody,
    origin,
    viewportLabel,
    hasContainer = true,
    paragraphsForFree = null,
    pageLayoutType = FULL_PAGE_LAYOUT_TYPE,
    isMarketingPageReducedHeader,
  } = props;

  const isSplittedPageLayout = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    pageLayoutType,
  );

  const { recommendations, fetchRecommendations } = useRecommendations();

  const fetchRecommendationsRef = useRef(fetchRecommendations);
  const recommendationsLimit = latestNACounter(pageBody);

  // reset listicle index on every render
  listicleIndex = -1;

  useEffect(() => {
    if (recommendationsLimit <= 0) {
      return;
    }

    fetchRecommendationsRef.current({
      publication: PUBLICATION_GROUP_HZ,
      articleKeywords: {},
      contentId: '1', // random number as it gets igonred by mostread anyway
      operation: RECOMMENDATION_OPERATION.LATEST_NATIVE_ADVERTISINGS,
      limit: recommendationsLimit,
    });
  }, [recommendationsLimit]);

  if (!pageBody || !Array.isArray(pageBody) || pageBody.length < 1) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  latestNAGenerator = latestNativeAdvertisingsGenerator(recommendations);

  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  const isEmptyCarousel = (entry) =>
    entry.__typename === NATIVE_ADVERTISING_CAROUSEL_PARAGRAPH &&
    (entry.nativeAdvertising?.edges === null ||
      (Array.isArray(entry.nativeAdvertising?.edges) &&
        entry.nativeAdvertising?.edges.length === 0));

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const scrollOffset = getScrollOffset(viewportLabel);

  return (
    <>
      {pageBody.map((entry, index): ReactElement => {
        if (!entry || isEmptyCarousel(entry)) {
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
          return null;
        }

        if (entry.__typename === INPUT_FORM_PARAGRAPH && !entry.webform) {
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
          return;
        }

        const isFirstParagraph = index === 0;

        const hasContainerClass =
          hasContainer &&
          !isSplittedPageLayout &&
          entry.__typename !== CONTENT_STAGE_PARAGRAPH &&
          entry.__typename !== ENTITY_QUEUE_PARAGRAPH &&
          entry.__typename !== LINK_BOX_PARAGRAPH &&
          entry.__typename !== INFOBOX_PARAGRAPH &&
          entry.__typename !== MINISTAGE_PARAGRAPH &&
          entry.__typename !== ADVANTAGES_PARAGRAPH &&
          entry.__typename !== PARALLAX_IMAGE_PARAGRAPH &&
          entry.__typename !== LISTICLE_ITEM_PARAGRAPH &&
          entry.__typename !== HERO_MEDIA_PARAGRAPH &&
          entry.__typename !== WIDGET_PARAGRAPH &&
          !(
            entry.__typename === TEXT_PARAGRAPH &&
            entry?.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE
          ) &&
          !(
            origin === PAGESCREEN_MARKETING_TYPE &&
            entry.__typename === SECTION_PARAGRAPH
          ) &&
          !(
            entry.__typename === EMBED_PARAGRAPH &&
            entry.embedWidth === EMBED_WIDTH_FULL
          );

        const withContainerClass = {
          [grid.Container]: hasContainerClass,
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
            <ParagraphIndexContext.Provider value={index}>
              <SmoothScroll
                offset={scrollOffset}
                anchorId={getAnchorIdByNode(entry)}
              >
                <>
                  <div className={getSectionForNode(entry, props)}>
                    <div
                      className={classNames(
                        'paragraph-wrapper',
                        styles.Paragraphs,
                        withContainerClass,
                      )}
                    >
                      {wrapGridForElement(
                        entry,
                        isFirstParagraph,
                        hasContainerClass,
                        props,
                        isSplittedPageLayout,
                        /* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */
                        isMarketingPageReducedHeader,
                      )}
                    </div>
                  </div>

                  {!props.isAdSuppressed && origin !== INFO_BOX_TYPE && (
                    <AdZoneFinal
                      adSlots={entry.adSlots || []}
                      disableContainer={isSplittedPageLayout}
                    />
                  )}

                  {/* render recommendations */}
                  {/* DON'T RENDER RECOS ON PUBLIREPORTAGE ARTICLES (origin === "advertorial") HZ-901 */}
                  {props.contentGcid &&
                    hasToRenderRecosForDeviceTypes.length > 0 && (
                      <div
                        className={classNames(
                          'recommendation-slot',
                          styles.InArticleRecommendations,
                          getSectionForNode(entry, props),
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
                          {
                            [styles.isSplittedPageLayout]: isSplittedPageLayout,
                          },
                        )}
                      >
                        <ArticleRecommendations
                          contentGcid={props.contentGcid}
                          /* @ts-ignore TODO: TS2322 ->  Type 'KeywordConnection | undefined' is not assignable to type 'KeywordConnection'. */
                          articleKeywords={props.articleKeywords}
                          publication={props.publication || 'HZ'}
                          articleColStyle={props.colStyle || grid.ColXs24}
                          title={PARTNER_CONTENT_TITLE}
                          /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                          origin={origin}
                          type={RECOMMENDATION_TYPE.NATONLY}
                          pageLayoutType={pageLayoutType}
                        />
                      </div>
                    )}
                </>
              </SmoothScroll>
            </ParagraphIndexContext.Provider>
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

        return (
          <div
            key={`paragraph-section-${entry.id || index}`}
            className={classNames({
              [`section-${index + 1}`]: paragraphsForFree !== null,
            })}
          >
            {paragraphsJsx}
          </div>
        );
      })}
    </>
  );
};

// TODO: as the "parentRenderer" logic is broken on the stack -
// we simply don't know which cases shall NOT have a margin
const hasSectionDefaultMarginByOrigin = (origin: string) =>
  origin !== VIDEO_PAGE;

const getSectionForNode = (
  /* @ts-ignore TODO: TS7031 ->  Binding element '__typename' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'text' implicitly has an 'any' type. */
  { __typename, isLastOfGroup = false, text },
  {
    addSectionClass = '',
    origin,
    isAdSuppressed,
    hasTwoColumns,
  }: ParagraphsRendererPropsInner,
): string => {
  switch (__typename) {
    case AD_PARAGRAPH:
      return (!isAdSuppressed && 'ad-wrapper') || '';
    case EMBED_PARAGRAPH:
      return sections.Section;
    case LISTICLE_ITEM_PARAGRAPH:
      if (isLastOfGroup) {
        return classNames(sections.Section, styles.SectionDefaultMargin);
      } else {
        return sections.Section;
      }
    case INPUT_FORM_PARAGRAPH:
      return classNames({
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        [styles.SectionDefaultMargin]: hasSectionDefaultMarginByOrigin(origin),
        [styles.InputFormOnHeroMedia]:
          origin === PAGE_SCREEN_HERO_MEDIA_TYPE && !hasTwoColumns,
      });
    case TEXT_PARAGRAPH:
      return classNames(sections.Section, {
        [addSectionClass]: !!addSectionClass,
        [styles.SectionDefaultMargin]:
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
          isLastOfGroup && hasSectionDefaultMarginByOrigin(origin),
      });
    case BLOCKQUOTE_PARAGRAPH:
      if (!text) {
        return '';
      }
    default:
      return classNames(sections.Section, {
        [addSectionClass]: !!addSectionClass,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
        [styles.SectionDefaultMargin]: hasSectionDefaultMarginByOrigin(origin),
      });
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
const getAnchorIdByNode = (entry) => {
  let anchorId: string = entry?.anchorId || '';

  if (!anchorId && entry?.__typename === INPUT_FORM_PARAGRAPH) {
    anchorId = entry.id;
  }

  return anchorId;
};

const wrapGridForElement = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  entry,
  isFirstParagraph: boolean,
  hasContainerClass: boolean,
  props: ParagraphsRendererPropsInner,
  isSplittedPageLayout: boolean,
  isMarketingPageReducedHeader: boolean,
): ReactElement => {
  const paragraphType: string = props.origin || entry.__typename;
  const jsx = getComponentForEntry(
    entry,
    isFirstParagraph,
    props,
    isSplittedPageLayout,
    isMarketingPageReducedHeader,
  );

  if (
    hasContainerClass === false ||
    paragraphType === MINISTAGE_PARAGRAPH ||
    paragraphType === INFOBOX_PARAGRAPH ||
    paragraphType === PARALLAX_IMAGE_PARAGRAPH ||
    entry.__typename === TEASER_STAGE_PARAGRAPH ||
    (entry.__typename === EMBED_PARAGRAPH &&
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
  isSplittedPageLayout: boolean,
  isMarketingPageReducedHeader: boolean,
): ReactElement => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const scrollOffset = getScrollOffset(props.viewportLabel);

  switch (entry.__typename) {
    case TEXT_PARAGRAPH:
      if (entry.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE) {
        return (
          <TestFragment data-testid="paragraphsrenderer-info-box-paragraph-wrapper">
            <InfoBoxParagraph
              infoBoxParagraph={mapDataForInfobox(entry)}
              articleColStyle={props.colStyle}
              origin={props.origin}
              isSplittedPageLayout={isSplittedPageLayout}
            />
          </TestFragment>
        );
      } else {
        return (
          <TestFragment data-testid="paragraphsrenderer-text-paragraph-wrapper">
            <TextParagraph
              isFirst={isFirstParagraph && props.showCap}
              addClass={props.addClass}
              origin={props.origin}
              textParagraph={entry}
            />
          </TestFragment>
        );
      }
    case IMAGE_PARAGRAPH:
      return <ImageParagraph imageParagraph={entry} origin={props.origin} />;
    case IMAGE_GALLERY_PARAGRAPH:
      return (
        <>
          <ImageGalleryParagraph gallery={entry} />
        </>
      );
    case BLOCKQUOTE_PARAGRAPH:
      return <BlockquoteParagraph blockquoteParagraph={entry} />;
    case EMBED_PARAGRAPH:
      return <EmbedParagraph embedParagraph={entry} />;
    case PIANO_TEMPLATE_PARAGRAPH:
      return <PianoTemplateParagraph pianoTemplateParagraph={entry} />;
    case ENTITY_QUEUE_PARAGRAPH:
      return (
        <EntityQueueParagraph
          entityQueue={entry}
          origin={props.origin}
          isFirst={
            findFirstParagraphIdByType(
              props.pageBody,
              ENTITY_QUEUE_PARAGRAPH,
            ) === entry.id
          }
          latestNAGenerator={latestNAGenerator}
        />
      );
    case CONTENT_STAGE_PARAGRAPH:
      return <ContentStageParagraph stage={entry} isFirst={isFirstParagraph} />;
    case LINK_BOX_PARAGRAPH:
      return <LinkBoxParagraph linkBox={entry} />;
    case MINISTAGE_PARAGRAPH:
      return (
        <MinistageParagraph
          ministageParagraph={entry}
          origin={props.origin}
          colStyle={props.colStyle}
          scrollOffset={scrollOffset}
          isSplittedPageLayout={isSplittedPageLayout}
        />
      );
    case TEASER_STAGE_PARAGRAPH:
      return <TeaserStageParagraph teaserStage={entry} origin={props.origin} />;
    case INFOBOX_PARAGRAPH:
      return (
        <InfoBoxParagraph
          infoBoxParagraph={entry}
          articleColStyle={props.colStyle}
          origin={props.origin}
          isSplittedPageLayout={isSplittedPageLayout}
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
    case NATIVE_ADVERTISING_CAROUSEL_PARAGRAPH:
      return (
        <NativeAdvertisingCarouselParagraph
          // @ts-ignore
          nativeAdvertisingCarouselParagraph={entry}
        />
      );
    case PARALLAX_IMAGE_PARAGRAPH:
      return (
        <ParallaxImageParagraph
          parallaxImageParagraph={entry}
          isSplittedPageLayout={isSplittedPageLayout}
          hasWiderGrid
        />
      );
    case RANKING_LIST_PARAGRAPH:
      return <RankingListParagraph rankingList={entry} />;
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
    case SECTION_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-sectionparagraph-wrapper">
          <SectionParagraph
            paragraph={entry}
            activeChannelTitle={props.activeChannel}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            colStyle={props.colStyle}
            origin={`SECTION_PARAGRAPH_${props.origin}`}
            isSplittedPageLayout={isSplittedPageLayout}
          />
        </TestFragment>
      );
    case LISTICLE_ITEM_PARAGRAPH:
      listicleIndex += 1;

      return (
        <TestFragment data-testid="paragraphsrenderer-listicleitem-paragraph-wrapper">
          <ListicleItemParagraph
            listicleItem={entry}
            listicleIndex={listicleIndex}
            isNested={props.hasContainer}
            scrollOffset={scrollOffset}
            origin={props.origin}
            pageLayoutType={props.pageLayoutType}
          />
        </TestFragment>
      );
    case ADVANTAGES_PARAGRAPH:
      return <AdvantagesParagraph entry={entry} />;
    case HERO_MEDIA_PARAGRAPH:
      return (
        <HeroMediaParagraph
          entry={entry}
          isCentered={isMarketingPageReducedHeader}
          hasTwoColumns={props.hasTwoColumns}
        />
      );
    case WIDGET_PARAGRAPH:
      return <WidgetParagraph widgetParagraph={entry} origin={props.origin} />;
    // let all other cases fall through to default case
    default:
      // eslint-disable-next-line no-underscore-dangle
      /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return __DEVELOPMENT__ ? (
        <Error msg={`Paragraphs: No Component for: ${entry.__typename}`} />
      ) : (
        <></>
      );
  }
};

const AdZone = ({ adSlots, disableContainer }: AdZoneProps): ReactElement => {
  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  if (adSlots.length === 0) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const isMobile = global.innerWidth < 760;

  /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
  const jsx = adSlots.map((adSlot) => {
    if (adSlot.slotName === RENDER_AD_TYPE_RECOS) {
      return null;
    }

    const isIAVSlot = [IAV_1, IAV_2].includes(adSlot.slotName);

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
          )}
        >
          <div
            className={classNames({
              [grid.Container]: !disableContainer || isMobile,
            })}
          >
            <div
              className={classNames(styles.AdWrapper, {
                [styles.IAVWrapper]: isIAVSlot,
              })}
            >
              <TestFragment
                data-testid="paragraphsrenderer-ad-wrapper"
                data-slot={adSlot.slotName}
              >
                <AppNexus
                  slot={adSlot.slotName}
                  isMultiPlacement={adSlot.slotName !== MMR_1}
                  deviceType={adSlot.deviceType}
                />
              </TestFragment>
            </div>
          </div>
        </div>
      </span>
    );
  });

  return <>{jsx}</>;
};
const AdZoneFinal = memo(AdZone);

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  viewportLabel: windowStateSelector(state).viewport.label,
});

export default connect(mapStateToProps)(ParagraphsRenderer);
