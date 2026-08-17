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
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import { isInLongFormArticleBody } from '../../../../../../shared/helpers/isInLongFormArticleBody';
import { isInsideColumn } from '../../../../../../shared/helpers/isInsideColumn';
import { resolveEmbedContainerAnchorId } from '../../../../../../shared/helpers/replaceEmbedWithPianoPlaceholder';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import useRecommendations from '../../../../../../../shared/hooks/useRecommendations';
import { RecommendationsNode } from '../../../../../../../shared/hooks/useRecommendations/typings';
import PianoTemplateParagraph from '../../../../../../../common/components/Paragraphs/components/PianoTemplateParagraph';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../../AppNexus';
import Error from '../../../Error';
import CustomRecommendations from '../../../Recommendations/components/CustomRecommendations';
import AdvantagesParagraph from '../AdvantagesParagraph';
import BlockquoteParagraph from '../BlockquoteParagraph';
import BookingFormParagraph from '../BookingFormParagraph';
import DocumentCheckFormParagraph from '../DocumentCheckFormParagraph';
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
import PianoPlaceholderParagraph from '../PianoPlaceholderParagraph';
import SectionParagraph from '../SectionParagraph';
import TeaserStageParagraph from '../TeaserStageParagraph';
import TextParagraph from '../TextParagraph';
import VideoParagraph from '../VideoParagraph';
import WebformParagraph from '../WebformParagraph';
import TeaserParagraph, { BOOK_TEASER_PARAGRAPH } from '../TeaserParagraph';
import { ParagraphIndexContext } from '../../../../../../../shared/context/paragraphs';
import {
  EMBED_WIDTH_FULL,
  EMBED_WIDTH_GRID,
} from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/constants';
import {
  INFO_BOX_STYLE_GUIDER,
  INFO_BOX_TYPE,
} from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../common/screens/PageTemplate/constants';
import {
  IAV_1,
  IAV_2,
  MMR_1,
} from '../../../../../../../shared/constants/adZone';
import { RENDER_AD_TYPE_RECOS } from '../../../../../../../shared/constants/ads';
import {
  ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
  ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
  ARTICLE_TYPE_LONG_READ,
  ARTICLE_TYPE_OPINION,
  ARTICLE_TYPE_SPONSORED,
  EXPLAINING_ARTICLE_CONTENT_TYPE,
  LANDING_PAGE_TYPE_HOME,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  ADVANTAGES_PARAGRAPH,
  AD_PARAGRAPH,
  BLOCKQUOTE_PARAGRAPH,
  BOOKING_FORM_PARAGRAPH,
  CHANNEL_BOX_PARAGRAPH,
  EMBED_PARAGRAPH,
  ENTITY_QUEUE_PARAGRAPH,
  HERO_MEDIA_PARAGRAPH,
  IMAGE_GALLERY_PARAGRAPH,
  IMAGE_PARAGRAPH,
  INFOBOX_PARAGRAPH,
  INPUT_FORM_PARAGRAPH,
  LINK_BOX_PARAGRAPH,
  LISTICLE_ITEM_PARAGRAPH,
  MINISTAGE_COMPONENT_ACCORDION,
  MINISTAGE_COMPONENT_LISTICLE,
  MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC,
  MINISTAGE_PARAGRAPH,
  MULTI_COLUMNS_PARAGRAPH,
  NATIVE_ADVERTISING_CAROUSEL_PARAGRAPH,
  PARALLAX_IMAGE_PARAGRAPH,
  PIANO_TEMPLATE_PARAGRAPH,
  SECTION_PARAGRAPH,
  TEASER_PARAGRAPH,
  TEASER_STAGE_PARAGRAPH,
  TEXT_PARAGRAPH,
  TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE,
  TEXT_PARAGRAPH_TABLE_STRIPED_STYLE_VALUE,
  TEXT_PARAGRAPH_TABLE_STYLE_VALUE,
  TEXT_PARAGRAPH_TABLE_WITHOUT_BORDERS_STYLE_VALUE,
  VIDEO_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { PUBLICATION_BEO } from '../../../../../../../shared/constants/publications';
import {
  RECOMMENDATION_OPERATION,
  RECOMMENDATION_TYPE,
} from '../../../../../../../shared/constants/recommendations';
import { LANDING_PAGE_TYPE } from '../../../../screens/LandingPage/constants';
import {
  PAGE_SCREEN_DEFAULT,
  PAGE_SCREEN_HERO_MEDIA_TYPE,
  PAGE_SCREEN_MARKETING_TYPE,
} from '../../../../screens/PageScreen/constants';
import { VIDEO_PAGE } from '../../../../screens/Video/constants';
import { PIANO_PLACEHOLDER_PARAGRAPH } from '../../constants';
import { ACCORDION_PAGE } from '../MinistageParagraph/components/MinistageAccordion/constants';
import {
  TEXT_PARAGRAPH_DEFAULT,
  TEXT_PARAGRAPH_TABLE,
} from '../TextParagraph/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { ParagraphsRendererProps } from './typings';

type ParagraphsRendererPropsInner = ParagraphsRendererProps & {
  viewportLabel?: string;
  noHeader?: boolean;
};

type AdZoneProps = {
  adSlots?: Array<{
    slotName: string;
    deviceType: 'mobile' | 'tabletDesktop';
  }>;
  pageLayoutType: string;
};

/* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'Generator<RecommendationsNode, any, unknown>'. */
let latestNAGenerator: Generator<RecommendationsNode> = null;
let listicleIndex: number;

const ParagraphsRenderer = (
  props: ParagraphsRendererPropsInner,
): ReactElement => {
  const {
    pageBody,
    hasContainer = true,
    paragraphsForFree = null,
    origin,
    viewportLabel,
    noHeader,
    isMarketingPageReducedHeader,
    pageLayoutType,
  } = props;
  const isSplittedPageLayout = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
    pageLayoutType,
  );

  const { recommendations, fetchRecommendations } = useRecommendations();

  const fetchRecommendationsRef = useRef(fetchRecommendations);
  const recommendationsLimit = latestNACounter(pageBody);

  const isInsideLandingPage =
    origin?.includes(LANDING_PAGE_TYPE) ||
    origin?.includes(PAGE_SCREEN_MARKETING_TYPE);

  const scrollOffset = getScrollOffset(
    isInsideLandingPage,
    viewportLabel,
    noHeader,
  );

  // reset listicle index on every render
  listicleIndex = -1;

  useEffect(() => {
    if (recommendationsLimit <= 0) {
      return;
    }

    fetchRecommendationsRef.current({
      publication: PUBLICATION_BEO,
      articleKeywords: {},
      contentId: '1', // random number as it gets ignored by mostread anyway
      operation: RECOMMENDATION_OPERATION.LATEST_NATIVE_ADVERTISINGS,
      limit: recommendationsLimit,
    });
  }, [recommendationsLimit]);

  if (!pageBody || pageBody.length < 1) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  latestNAGenerator = latestNativeAdvertisingsGenerator(recommendations);

  const indexFirstParagraphByType = pageBody.reduce(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'acc' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
    (acc, entry, index: number) => {
      if (typeof acc[entry.__typename] === 'undefined') {
        acc[entry.__typename] = index;
      }

      return acc;
    },
    {},
  );

  return (
    <div
      data-testid="paragraphsrenderer-container"
      className={styles.ParagraphsRendererContainer}
    >
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */}
      {pageBody.map((entry, index: number): ReactElement => {
        if (!entry) {
          /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
          return null;
        }

        if (
          entry.__typename === INPUT_FORM_PARAGRAPH &&
          !entry.webform &&
          entry.form !== BOOKING_FORM_PARAGRAPH
        ) {
          /* @ts-ignore TODO: TS2322 ->  Type 'undefined' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
          return;
        }

        const hasNext = index < pageBody.length - 1;
        const isFirstParagraphOnPage = index === 0;
        const isFirstParagraphOfType =
          index === indexFirstParagraphByType[entry.__typename];

        const hasContainerClass =
          (hasContainer &&
            entry.__typename !== HERO_MEDIA_PARAGRAPH &&
            entry.__typename !== ENTITY_QUEUE_PARAGRAPH &&
            entry.__typename !== LINK_BOX_PARAGRAPH &&
            entry.__typename !== LISTICLE_ITEM_PARAGRAPH &&
            entry.__typename !== INFOBOX_PARAGRAPH &&
            entry.__typename !== CHANNEL_BOX_PARAGRAPH &&
            entry.__typename !== ADVANTAGES_PARAGRAPH &&
            entry.__typename !== TEASER_PARAGRAPH &&
            entry?.teasers?.edges?.[0]?.node?.__typename !==
              BOOK_TEASER_PARAGRAPH &&
            (entry.__typename !== MINISTAGE_PARAGRAPH ||
              entry?.ministage?.__typename ===
                MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC ||
              entry?.ministage?.__typename === MINISTAGE_COMPONENT_ACCORDION ||
              entry?.ministage?.__typename === MINISTAGE_COMPONENT_LISTICLE) &&
            !(
              entry.__typename === TEXT_PARAGRAPH &&
              entry?.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE
            ) &&
            !(
              origin === PAGE_SCREEN_MARKETING_TYPE &&
              entry.__typename === SECTION_PARAGRAPH
            ) &&
            !(
              (entry.__typename === EMBED_PARAGRAPH ||
                entry.__typename === PIANO_PLACEHOLDER_PARAGRAPH) &&
              entry.embedWidth === EMBED_WIDTH_FULL
            )) ||
          (isInLongFormArticleBody(origin) &&
            (entry.__typename === INFOBOX_PARAGRAPH ||
              (entry.__typename === TEXT_PARAGRAPH &&
                entry?.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE)));

        const isInColumn = isInsideColumn(origin);

        const withContainerClass = {
          [grid.Container]:
            hasContainerClass && !isInColumn && !isSplittedPageLayout,
          [grid.ContainerInner]: isInColumn,
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
                  {/* render paragraph */}
                  <div className={getSectionForNode(entry, props)}>
                    <div
                      className={classNames(
                        styles.Paragraphs,
                        withContainerClass,
                      )}
                    >
                      {wrapGridForElement(
                        entry,
                        isFirstParagraphOnPage,
                        isFirstParagraphOfType,
                        hasNext,
                        hasContainerClass,
                        props,
                        index,
                        isInsideLandingPage,
                        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
                        pageLayoutType,
                        isMarketingPageReducedHeader,
                      )}
                    </div>
                  </div>

                  {!props.isAdSuppressed && origin !== INFO_BOX_TYPE && (
                    <AdZoneFinal
                      adSlots={entry.adSlots || []}
                      /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                      pageLayoutType={pageLayoutType}
                    />
                  )}

                  {/* render recommendations */}
                  {/* DON'T RENDER RECOS ON PUBLIREPORTAGE ARTICLES (origin === "advertorial") HZ-901 */}
                  {props.contentGcid &&
                    hasToRenderRecosForDeviceTypes.length > 0 &&
                    ![
                      ARTICLE_TYPE_LONG_READ,
                      ARTICLE_TYPE_LEGAL_ADVICE_GRUNDLAGE,
                      ARTICLE_TYPE_LEGAL_ADVICE_HILFSMITTEL,
                    ].includes(origin) && (
                      <div
                        className={classNames(
                          'recommendation-slot',
                          styles.InArticleRecommendations,
                          styles.HideForPrint,
                          {
                            [styles.SectionDefaultMargin]:
                              origin !== ARTICLE_TYPE_OPINION,
                            [getSectionForNode(entry, props)]: ![
                              ARTICLE_TYPE_OPINION,
                              ARTICLE_TYPE_SPONSORED,
                            ].includes(origin),
                            [styles.SectionDefaultMarginTop]:
                              entry.__typename === TEXT_PARAGRAPH &&
                              !entry.isLastOfGroup &&
                              origin !== ARTICLE_TYPE_OPINION,
                            'recommendation-slot-mobile':
                              hasToRenderRecosForDeviceTypes.includes('mobile'),
                            'recommendation-slot-tabletDesktop':
                              hasToRenderRecosForDeviceTypes.includes(
                                'tabletDesktop',
                              ),
                            [grid.Container]: [
                              ARTICLE_TYPE_OPINION,
                              ARTICLE_TYPE_SPONSORED,
                            ].includes(origin),
                          },
                          {
                            [styles.isSplittedPageLayout]: isSplittedPageLayout,
                          },
                        )}
                      >
                        <CustomRecommendations
                          title="Partnerinhalte"
                          /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
                          contentGcid={props.contentGcid || null}
                          /* @ts-ignore TODO: TS2322 ->  Type 'KeywordConnection | undefined' is not assignable to type 'KeywordConnection'. */
                          articleKeywords={props.articleKeywords}
                          publication={PUBLICATION_BEO}
                          articleColStyle={props.colStyle || grid.ColXs24}
                          origin={props.origin}
                          ignoreTeaserImpressions
                          type={RECOMMENDATION_TYPE.NATONLY}
                          isInRightColumn={false}
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
    </div>
  );
};

const ratgeberFullWidthParagraphTypes = [
  TEASER_STAGE_PARAGRAPH,
  MINISTAGE_PARAGRAPH,
  LISTICLE_ITEM_PARAGRAPH,
];

/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
const getAnchorIdByNode = (entry) => {
  if (
    entry?.__typename === PIANO_PLACEHOLDER_PARAGRAPH ||
    entry?.__typename === EMBED_PARAGRAPH
  ) {
    return resolveEmbedContainerAnchorId(entry);
  }

  if (entry?.__typename === INPUT_FORM_PARAGRAPH && entry.id) {
    return entry.id;
  }

  return entry?.anchorId || '';
};

const hasSectionDefaultMarginByOrigin = (origin: string) =>
  ![VIDEO_PAGE, ACCORDION_PAGE, EXPLAINING_ARTICLE_CONTENT_TYPE].includes(
    origin,
  );

const getComponentForEntry = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  entry,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  isFirstParagraphOnPage = false,
  isFirstParagraphOfType = false,
  hasNext: boolean,
  props: ParagraphsRendererPropsInner,
  index: number,
  isInsideLandingPage: boolean,
  pageLayoutType: string,
  isMarketingPageReducedHeader: boolean,
) => {
  const scrollOffset = getScrollOffset(
    isInsideLandingPage,
    props.viewportLabel,
    props.noHeader,
  );

  switch (entry.__typename) {
    case TEXT_PARAGRAPH:
      if (entry.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE) {
        return (
          <TestFragment data-testid="paragraphsrenderer-info-box-paragraph-wrapper">
            <InfoBoxParagraph
              infoBoxParagraph={mapDataForInfobox(entry)}
              articleColStyle={props.colStyle}
              origin={props.origin}
              pageLayoutType={pageLayoutType}
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
        <div
          data-testid="paragraphsrenderer-text-paragraph-wrapper"
          id={entry.header?.replace(/\s/g, '') || ''}
        >
          <TextParagraph
            addClass={props.addClass}
            origin={props.origin}
            style={props.style}
            textParagraph={entry}
            component={textParagraphComponent}
          />
        </div>
      );

    case IMAGE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-image-paragraph-wrapper">
          <ImageParagraph imageParagraph={entry} origin={props.origin} />
        </TestFragment>
      );
    case IMAGE_GALLERY_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-image-gallery-paragraph-wrapper">
          <ImageGalleryParagraph gallery={entry} origin={props.origin} />
        </TestFragment>
      );
    case BLOCKQUOTE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-blockquote-paragraph-wrapper">
          <BlockquoteParagraph
            origin={props.origin}
            blockquoteParagraph={entry}
          />
        </TestFragment>
      );
    case PARALLAX_IMAGE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-parallax-image-paragraph-wrapper">
          <ParallaxImageParagraph
            origin={props.origin}
            parallaxImageParagraph={entry}
          />
        </TestFragment>
      );
    case PIANO_TEMPLATE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-piano-paragraph-wrapper">
          <PianoTemplateParagraph
            pianoTemplateParagraph={entry}
            colStyle={classNames({
              [classNames(grid.ColSm20, grid.ColOffsetSm2)]:
                props.origin === ARTICLE_TYPE_LONG_READ,
            })}
          />
        </TestFragment>
      );
    case PIANO_PLACEHOLDER_PARAGRAPH:
      return (
        <PianoPlaceholderParagraph
          pianoPlaceholderParagraph={entry}
          origin={props.origin}
        />
      );
    case EMBED_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-embed-paragraph-wrapper">
          <EmbedParagraph embedParagraph={entry} origin={props.origin} />
        </TestFragment>
      );
    case ENTITY_QUEUE_PARAGRAPH:
      return (
        <EntityQueueParagraph
          entityQueue={entry}
          origin={props.origin}
          iconTypeRight="IconChevronRight"
          isFirst={isFirstParagraphOfType}
          latestNAGenerator={latestNAGenerator}
        />
      );
    case LINK_BOX_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-link-box-paragraph-wrapper">
          <LinkBoxParagraph
            component="default"
            linkBox={entry}
            articleColStyle={props.colStyle}
          />
        </TestFragment>
      );
    case TEASER_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-teaser-paragraph-wrapper">
          <TeaserParagraph
            hasNext={hasNext}
            teaserParagraph={entry}
            origin={props.origin}
          />
        </TestFragment>
      );
    case MINISTAGE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-ministage-paragraph-wrapper">
          <MinistageParagraph
            ministageParagraph={entry}
            origin={props.origin}
            colStyle={props.colStyle}
            scrollOffset={scrollOffset}
            pageLayoutType={pageLayoutType}
          />
        </TestFragment>
      );
    case INFOBOX_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-info-box-paragraph-wrapper">
          <InfoBoxParagraph
            infoBoxParagraph={entry}
            articleColStyle={props.colStyle}
            origin={props.origin}
            pageLayoutType={pageLayoutType}
          />
        </TestFragment>
      );
    case VIDEO_PARAGRAPH:
    case VIDEO_CONTENT_TYPE: {
      const ensuredVideo: VideoParagraph = ensureVideoItem(entry);
      return (
        ensuredVideo.video && (
          <TestFragment data-testid="paragraphsrenderer-video-paragraph-wrapper">
            <VideoParagraph
              video={ensuredVideo.video as VideoType}
              origin={props.origin}
              suppressSource={entry.suppressSource}
            />
          </TestFragment>
        )
      );
    }
    case MULTI_COLUMNS_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-multicolumsparagraph-wrapper">
          <MultiColumnParagraph
            multiColumnParagraph={entry}
            origin={props.origin}
          />
        </TestFragment>
      );
    case NATIVE_ADVERTISING_CAROUSEL_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-native-advertising-carousel-paragraph-wrapper">
          <NativeAdvertisingCarouselParagraph
            // @ts-ignore
            nativeAdvertisingCarouselParagraph={entry}
          />
        </TestFragment>
      );
    case INPUT_FORM_PARAGRAPH:
      if (entry && typeof entry === 'object' && entry.webform) {
        return (
          <TestFragment data-testid="paragraphsrenderer-webform-paragraph-wrapper">
            <WebformParagraph
              headerText={entry.headerText}
              origin={props.origin}
              webform={entry.webform}
              anchorId={getAnchorIdByNode(entry)}
            />
          </TestFragment>
        );
      }

      if (
        entry &&
        typeof entry === 'object' &&
        ['Testament1', 'Arbeitszeugnis2'].includes(entry.bookingForm)
      ) {
        let texts = {
          descriptionSubtitle: 'Ergänzungen',
          description:
            'Bitte teilen Sie uns in wenigen Sätzen Ihre aktuelle Situation mit.',
        };
        let isDescriptionMandatory = false;
        if (entry.bookingForm === 'Testament1') {
          texts = {
            descriptionSubtitle: 'Ihre Familiensituation',
            description:
              'Bitte beantworten Sie in wenigen Sätzen folgende Fragen: Sind\n' +
              'Sie verheiratet oder leben Sie in eingetragener Partnerschaft?\n' +
              'Haben Sie eigene Nachkommen (Kinder/Enkel)? Was möchten Sie\n' +
              'mit dem Testament erreichen?',
          };
          isDescriptionMandatory = true;
        }
        return (
          <DocumentCheckFormParagraph
            entry={entry}
            texts={texts}
            isDescriptionMandatory={isDescriptionMandatory}
          />
        );
      }

      return (
        <div className={grid.Row}>
          <BookingFormParagraph entry={entry} />
        </div>
      );

    case TEASER_STAGE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-teaserstageparagraph-wrapper">
          <TeaserStageParagraph
            teaserStage={entry}
            origin={props.origin}
            pageLayoutType={pageLayoutType}
          />
        </TestFragment>
      );
    case SECTION_PARAGRAPH:
      return (
        <div
          data-testid="paragraphsrenderer-sectionparagraph-wrapper"
          id={entry.title?.replace(/\s/g, '') || ''}
        >
          <SectionParagraph
            colStyle={classNames({
              [grid.ColXs24]: ratgeberFullWidthParagraphTypes.includes(
                entry.__typename,
              ),
              /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
              [props.colStyle]: !ratgeberFullWidthParagraphTypes.includes(
                entry.__typename,
              ),
            })}
            paragraph={entry}
            index={index}
            articleTitle={props.articleTitle}
            origin={`${SECTION_PARAGRAPH}_${props.origin}`}
            /* @ts-ignore TODO: TS2322 ->  Type 'boolean | undefined' is not assignable to type 'boolean'. */
            hasExtendedTitles={props.hasExtendedTitles}
          />
        </div>
      );
    case LISTICLE_ITEM_PARAGRAPH:
      listicleIndex += 1;

      return (
        <TestFragment data-testid="paragraphsrenderer-listicleitem-paragraph-wrapper">
          <ListicleItemParagraph
            listicleItem={entry}
            listicleIndex={listicleIndex}
            origin={props.origin}
            isNested={props.hasContainer && !isInsideLandingPage}
            scrollOffset={scrollOffset}
          />
        </TestFragment>
      );

    case HERO_MEDIA_PARAGRAPH:
      return (
        <HeroMediaParagraph
          entry={entry}
          isCentered={isMarketingPageReducedHeader}
        />
      );

    case ADVANTAGES_PARAGRAPH:
      return <AdvantagesParagraph entry={entry} />;

    // let all other cases fall through to default case
    default:
      return __DEVELOPMENT__ ? (
        <Error msg={`Paragraphs: No Component for: ${entry.__typename}`} />
      ) : null;
  }
};

const wrapGridForElement = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  entry,
  isFirstParagraphOnPage: boolean,
  isFirstParagraphOfType: boolean,
  hasNext: boolean,
  hasContainerClass: boolean,
  props: ParagraphsRendererPropsInner,
  index: number,
  isInsideLandingPage: boolean,
  pageLayoutType: string,
  isMarketingPageReducedHeader: boolean,
) => {
  const paragraphType: string = props.origin || entry.__typename;
  const isSplittedPageLayout = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    pageLayoutType,
  );
  const isInLongFormArticleBody = props.origin === ARTICLE_TYPE_LONG_READ;

  if (
    hasContainerClass === false ||
    ((props.origin === PAGE_SCREEN_DEFAULT ||
      props.origin === LANDING_PAGE_TYPE ||
      props.origin === LANDING_PAGE_TYPE_HOME) &&
      entry.__typename === PIANO_TEMPLATE_PARAGRAPH) ||
    paragraphType === CHANNEL_BOX_PARAGRAPH ||
    (paragraphType === TEASER_PARAGRAPH &&
      entry?.teasers?.edges?.[0]?.node?.__typename !== BOOK_TEASER_PARAGRAPH) ||
    (paragraphType === MINISTAGE_PARAGRAPH &&
      entry.ministage.__typename !== MINISTAGE_COMPONENT_SINGLE_ALERT_TOPIC) ||
    paragraphType === INFOBOX_PARAGRAPH ||
    paragraphType === PARALLAX_IMAGE_PARAGRAPH ||
    entry.__typename === TEASER_STAGE_PARAGRAPH ||
    ((entry.__typename === EMBED_PARAGRAPH ||
      entry.__typename === PIANO_PLACEHOLDER_PARAGRAPH) &&
      [EMBED_WIDTH_FULL, EMBED_WIDTH_GRID].includes(entry.embedWidth))
  ) {
    return (
      <TestFragment data-testid="paragraph-item">
        {getComponentForEntry(
          entry,
          isFirstParagraphOnPage,
          isFirstParagraphOfType,
          hasNext,
          props,
          index,
          isInsideLandingPage,
          pageLayoutType,
          isMarketingPageReducedHeader,
        )}
      </TestFragment>
    );
  }

  return (
    <div
      className={classNames({
        // TODO: Missing columns inside EMBED_PARAGRAPH / PIANO_PLACEHOLDER_PARAGRAPH
        [grid.Row]:
          (entry.__typename !== EMBED_PARAGRAPH &&
            entry.__typename !== PIANO_PLACEHOLDER_PARAGRAPH &&
            entry.__typename !== INPUT_FORM_PARAGRAPH &&
            entry.__typename !== SECTION_PARAGRAPH &&
            entry.__typename !== MINISTAGE_PARAGRAPH &&
            entry.__typename !== VIDEO_PARAGRAPH &&
            entry.__typename !== IMAGE_PARAGRAPH &&
            entry.__typename !== PIANO_TEMPLATE_PARAGRAPH) ||
          (isInLongFormArticleBody &&
            entry.__typename === INPUT_FORM_PARAGRAPH) ||
          (entry.__typename === MINISTAGE_PARAGRAPH &&
            entry?.ministage?.__typename === MINISTAGE_COMPONENT_LISTICLE),
      })}
      data-testid="paragraph-item"
    >
      <div // TODO: LongRead & ArticleRatgeber has missing props.colStyle
        className={classNames({
          [grid.Col24]:
            entry.__typename === MINISTAGE_PARAGRAPH &&
            entry?.ministage?.__typename === MINISTAGE_COMPONENT_LISTICLE,
          /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
          [props.colStyle]:
            (entry.__typename === MINISTAGE_PARAGRAPH &&
              entry?.ministage?.__typename !== MINISTAGE_COMPONENT_LISTICLE) ||
            entry.__typename !== MINISTAGE_PARAGRAPH,
          [grid.ContainerInner]:
            (isSplittedPageLayout &&
              entry.__typename === TEXT_PARAGRAPH &&
              entry.styleValue !== TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE) ||
            (isSplittedPageLayout &&
              entry.__typename === BLOCKQUOTE_PARAGRAPH) ||
            (isInLongFormArticleBody &&
              [
                BLOCKQUOTE_PARAGRAPH,
                TEXT_PARAGRAPH,
                INFOBOX_PARAGRAPH,
                INPUT_FORM_PARAGRAPH,
              ].includes(entry.__typename)),
        })}
      >
        {getComponentForEntry(
          entry,
          isFirstParagraphOnPage,
          isFirstParagraphOfType,
          hasNext,
          props,
          index,
          isInsideLandingPage,
          pageLayoutType,
          isMarketingPageReducedHeader,
        )}
      </div>
    </div>
  );
};

const getSectionForNode = (
  /* @ts-ignore TODO: TS7031 ->  Binding element '__typename' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7031 ->  Binding element 'text' implicitly has an 'any' type. */
  { __typename, isLastOfGroup = false, text },
  {
    addSectionClass = '',
    origin,
    style = '',
    hasTwoColumns,
  }: ParagraphsRendererPropsInner,
) => {
  if (origin === INFO_BOX_TYPE && style === INFO_BOX_STYLE_GUIDER) {
    return '';
  }

  switch (__typename) {
    case AD_PARAGRAPH:
      return 'ad-wrapper';
    case INPUT_FORM_PARAGRAPH:
      return classNames({
        [styles.SectionDefaultMargin]:
          hasSectionDefaultMarginByOrigin(origin) &&
          __typename !== SECTION_PARAGRAPH,
        [styles.InputFormOnHeroMedia]:
          origin === PAGE_SCREEN_HERO_MEDIA_TYPE && !hasTwoColumns,
      });
    case TEXT_PARAGRAPH:
      return classNames(sections.Section, styles.SectionTextParagraph, {
        [addSectionClass]: !!addSectionClass,
      });
    case PIANO_PLACEHOLDER_PARAGRAPH:
      return sections.Section;
    case EMBED_PARAGRAPH:
      return sections.Section;
    case LISTICLE_ITEM_PARAGRAPH:
      if (isLastOfGroup) {
        return classNames(sections.Section, styles.SectionDefaultMargin);
      } else {
        return sections.Section;
      }
    case ENTITY_QUEUE_PARAGRAPH:
      return classNames(sections.Section, {
        [addSectionClass]: !!addSectionClass,
      });
    default:
      if (
        (__typename === BLOCKQUOTE_PARAGRAPH && !text) ||
        origin === MULTI_COLUMNS_PARAGRAPH
      ) {
        return '';
      }

      return classNames(sections.Section, {
        [addSectionClass]: !!addSectionClass,
        [styles.SectionDefaultMargin]:
          hasSectionDefaultMarginByOrigin(origin) &&
          __typename !== SECTION_PARAGRAPH,
      });
  }
};

const AdZone = ({ adSlots, pageLayoutType }: AdZoneProps): ReactElement => {
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

    const isIAVSlot = [IAV_1, IAV_2].includes(adSlot.slotName);

    return (
      <span
        className={classNames(styles.AdZone, grid.HideForPrint)}
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
              [grid.Container]:
                pageLayoutType !== RIGHT_COLUMN_PAGE_LAYOUT_TYPE,
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
  noHeader: headerStateSelector(state).noHeader,
});

export default connect(mapStateToProps)(ParagraphsRenderer);
