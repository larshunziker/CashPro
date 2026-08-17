import React, { ReactElement, memo } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/helpers/ensureVideo'. '/Users/bhs/code/work/r */
import { ensureVideoItem } from '../../../../../../../shared/helpers/ensureVideo';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/helpers/mapDataForInfoBox'. '/Users/bhs/code/ */
import { mapDataForInfobox } from '../../../../../../../shared/helpers/mapDataForInfoBox';
import { getScrollOffset } from '../../../../../../shared/helpers/getScrollOffset';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import PianoTemplateParagraph from '../../../../../../../common/components/Paragraphs/components/PianoTemplateParagraph';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import AppNexus from '../../../AppNexus';
import Error from '../../../Error';
import AdvantagesParagraph from '../AdvantagesParagraph';
import BlockquoteParagraph from '../BlockquoteParagraph';
import EmbedParagraph from '../EmbedParagraph';
import EntityQueueParagraph from '../EntityQueueParagraph';
import HeroMediaParagraph from '../HeroMediaParagraph';
import ImageGalleryParagraph from '../ImageGalleryParagraph';
import ImageParagraph from '../ImageParagraph';
import InfoBoxParagraph from '../InfoBoxParagraph';
import ListicleItemParagraph from '../ListicleItemParagraph';
import MinistageParagraph from '../MinistageParagraph';
import MultiColumnParagraph from '../MultiColumnParagraph';
import ParallaxImageParagraph from '../ParallaxImageParagraph';
import SectionParagraph from '../SectionParagraph';
import TeaserParagraph from '../TeaserParagraph';
import TeaserStageParagraph from '../TeaserStageParagraph';
import TextParagraph from '../TextParagraph';
import VideoParagraph from '../VideoParagraph';
import WebformParagraph from '../WebformParagraph';
import { ContentTypeUnion } from '../../../../../../../shared/@types/gql';
import { ParagraphIndexContext } from '../../../../../../../shared/context/paragraphs';
import {
  EMBED_WIDTH_FULL,
  EMBED_WIDTH_GRID,
} from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/constants';
import { INFO_BOX_TYPE } from '../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';
import { RENDER_AD_TYPE_RECOS } from '../../../../../../../shared/constants/ads';
import {
  LANDING_PAGE_TYPE_HOME,
  VIDEO_CONTENT_TYPE,
} from '../../../../../../../shared/constants/content';
import {
  ADVANTAGES_PARAGRAPH,
  BLOCKQUOTE_PARAGRAPH,
  EMBED_PARAGRAPH,
  ENTITY_QUEUE_PARAGRAPH,
  HERO_MEDIA_PARAGRAPH,
  IMAGE_GALLERY_PARAGRAPH,
  IMAGE_PARAGRAPH,
  INFOBOX_PARAGRAPH,
  INPUT_FORM_PARAGRAPH,
  LISTICLE_ITEM_PARAGRAPH,
  MINISTAGE_COMPONENT_ACCORDION,
  MINISTAGE_PARAGRAPH,
  MULTI_COLUMNS_PARAGRAPH,
  PARALLAX_IMAGE_PARAGRAPH,
  PIANO_TEMPLATE_PARAGRAPH,
  SECTION_PARAGRAPH,
  TEASER_PARAGRAPH,
  TEASER_STAGE_PARAGRAPH,
  TEXT_PARAGRAPH,
  TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE,
  VIDEO_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { IAV_1, IAV_2 } from '../../../../components/AppNexus/constants';
import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_STYLE,
} from '../../../../constants';
import {
  ARTICLE_DEFAULT,
  ARTICLE_TYPE_SPECIAL,
  ARTICLE_VIDEO,
} from '../../../../screens/Article/constants';
import { IMAGE_GALLERY_DETAIL_SCREEN } from '../../../../screens/ImageGalleryArticle/constants';
import { LANDING_PAGE_TYPE } from '../../../../screens/LandingPage/constants';
import {
  PAGE_SCREEN_DEFAULT,
  PAGE_SCREEN_HERO_MEDIA_TYPE,
  PAGE_SCREEN_MARKETING_TYPE,
} from '../../../../screens/PageScreen/constants';
import { MMR_1 } from '../../../AppNexus/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';
import { ParagraphsRendererProps } from './typings';

type ParagraphsRendererPropsInner = ParagraphsRendererProps & {
  activeMainChannel: ActiveMainChannel;
  viewportLabel: string;
};

type AdSlot = {
  slotName: string;
  deviceType: 'mobile' | 'tabletDesktop';
};

type AdZoneProps = {
  adSlots?: Array<AdSlot>;
  origin?: string;
  channel: ActiveMainChannel;
};

let listicleIndex: number;

/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
const getAnchorIdByNode = (entry): string =>
  entry?.anchorId ||
  (entry?.__typename === INPUT_FORM_PARAGRAPH && entry.id) ||
  '';

const AdZone = ({
  adSlots,
  origin = '',
  channel,
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

    const isIAVSlot = [IAV_1, IAV_2].includes(adSlot.slotName);

    if (
      isIAVSlot &&
      [MAIN_CHANNEL_STYLE, MAIN_CHANNEL_BODY_HEALTH].includes(channel)
    ) {
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
            (adSlot.deviceType && `ad-wrapper-${adSlot.deviceType}`) || '',
            {
              [styles.AdWrapperPullOut]: ![
                LANDING_PAGE_TYPE_HOME,
                LANDING_PAGE_TYPE,
                IMAGE_GALLERY_DETAIL_SCREEN,
              ].includes(origin),
            },
          )}
        >
          <div
            className={classNames(
              { [grid.Container]: origin !== IMAGE_GALLERY_DETAIL_SCREEN },
              styles.AdCenter,
            )}
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
      </span>
    );
  });

  return <>{jsx}</>;
};

// WORKAROUND: till we can get rid of the `forceUpdate` solution which causes our
// ad zones to re-render as well :(
// see comments on ArticlePage
const AdZoneFinal = memo(
  AdZone,
  (props, nextProps) => JSON.stringify(props) === JSON.stringify(nextProps),
);

const getComponentByParagraphType = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  entry,
  origin: string,
  index: number,
  props: ParagraphsRendererPropsInner,
  isMarketingPageReducedHeader: boolean,
): ReactElement | null => {
  const isWithoutContainer =
    props.origin?.includes(LANDING_PAGE_TYPE) ||
    props.origin?.includes(PAGE_SCREEN_MARKETING_TYPE);
  const scrollOffset = getScrollOffset(isWithoutContainer, props.viewportLabel);

  switch (entry.__typename) {
    case BLOCKQUOTE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-blockquote-paragraph-wrapper">
          <BlockquoteParagraph blockquoteParagraph={entry} />
        </TestFragment>
      );
    case EMBED_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-embed-paragraph-wrapper">
          <EmbedParagraph embedParagraph={entry} />
        </TestFragment>
      );
    case ENTITY_QUEUE_PARAGRAPH:
      return (
        <EntityQueueParagraph
          entityQueue={entry}
          isFirst={index === 0}
          origin={origin}
          paragraphIndex={index}
          /* @ts-ignore TODO: TS2322 ->  Type 'Generator<RecommendationsNode, any, unknown> | null | undefined' is not assignable to type 'Generator<Recommendat */
          latestNAGenerator={props.latestNAGenerator}
        />
      );
    case TEXT_PARAGRAPH:
      if (entry?.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE) {
        return (
          <TestFragment data-testid="paragraphsrenderer-infoboxparagraph-wrapper">
            <InfoBoxParagraph
              infoBoxParagraph={mapDataForInfobox(entry)}
              origin={origin}
            />
          </TestFragment>
        );
      } else {
        return (
          <TestFragment data-testid="paragraphsrenderer-textparagraph-wrapper">
            <TextParagraph
              textParagraph={entry}
              origin={origin}
              isFirst={index === 0}
            />
          </TestFragment>
        );
      }
    case IMAGE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-imageparagraph-wrapper">
          <ImageParagraph imageParagraph={entry} origin={origin} />
        </TestFragment>
      );
    case MULTI_COLUMNS_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-multicolumsparagraph-wrapper">
          <MultiColumnParagraph multiColumnParagraph={entry} origin={origin} />
        </TestFragment>
      );
    case INFOBOX_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-infobox-paragraph-wrapper">
          <InfoBoxParagraph infoBoxParagraph={entry} origin={origin} />
        </TestFragment>
      );
    case VIDEO_PARAGRAPH:
    case VIDEO_CONTENT_TYPE:
      const ensuredVideo: VideoParagraph = ensureVideoItem(entry);
      return (
        <TestFragment data-testid="paragraphsrenderer-video-paragraph-wrapper">
          <VideoParagraph
            /*@ts-ignore*/
            video={ensuredVideo.video}
            origin={origin}
            suppressSource={entry.suppressSource}
          />
        </TestFragment>
      );
    case IMAGE_GALLERY_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-imagegalleryparagraph-wrapper">
          <ImageGalleryParagraph gallery={entry} origin={origin} />
        </TestFragment>
      );
    case TEASER_STAGE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-teaserstageparagraph-wrapper">
          <TeaserStageParagraph teaserStage={entry} paragraphIndex={index} />
        </TestFragment>
      );
    case TEASER_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-teaserparagraph-wrapper">
          <TeaserParagraph
            teaserParagraph={entry}
            origin={origin}
            paragraphIndex={index}
          />
        </TestFragment>
      );
    case PIANO_TEMPLATE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-pianoparagraph-wrapper">
          <PianoTemplateParagraph pianoTemplateParagraph={entry} />
        </TestFragment>
      );
    case MINISTAGE_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-ministageparagraph-wrapper">
          <MinistageParagraph
            ministageParagraph={entry}
            scrollOffset={scrollOffset}
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
    case INPUT_FORM_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-webformparagraph-wrapper">
          <div className={styles.SectionDefaultMargin}>
            <WebformParagraph
              webform={entry.webform}
              origin={origin}
              anchorId={getAnchorIdByNode(entry)}
            />
          </div>{' '}
        </TestFragment>
      );
    case HERO_MEDIA_PARAGRAPH:
      return (
        <HeroMediaParagraph
          entry={entry}
          isCentered={isMarketingPageReducedHeader}
        />
      );
    case SECTION_PARAGRAPH:
      return (
        <TestFragment data-testid="paragraphsrenderer-sectionparagraph-wrapper">
          <SectionParagraph
            paragraph={entry}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            colStyle={props.colStyle}
            origin={`SECTION_PARAGRAPH_${props.origin}`}
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
            isNested={!isWithoutContainer}
            scrollOffset={scrollOffset}
          />
        </TestFragment>
      );
    case ADVANTAGES_PARAGRAPH:
      return <AdvantagesParagraph entry={entry} />;
    default:
      // eslint-disable-next-line no-underscore-dangle
      /* @ts-ignore TODO: TS2322 ->  Type 'Element | null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return __DEVELOPMENT__ ? (
        <Error msg={`Paragraphs: No Component for: ${entry.__typename}`} />
      ) : null;
  }
};

//TODO: Find the right typing for "entry", for all publications. "paragraphInterface" was wrong...
const wrapWithGrid = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  entry,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  props,
  index: number,
  isMarketingPageReducedHeader: boolean,
): ReactElement | null => {
  const { origin = '' } = props;

  const isArticleOrigin = [
    ARTICLE_TYPE_SPECIAL,
    ARTICLE_DEFAULT,
    ARTICLE_VIDEO,
  ].includes(origin);

  if (
    // Teaser Stages on Article Screens need a pull out.
    entry.__typename === TEASER_STAGE_PARAGRAPH &&
    isArticleOrigin
  ) {
    return (
      <div className={styles.TeaserStagePullout}>
        {getComponentByParagraphType(
          entry,
          origin,
          index,
          props,
          isMarketingPageReducedHeader,
        )}
      </div>
    );
  }
  if (
    origin === LANDING_PAGE_TYPE &&
    (entry.__typename === TEXT_PARAGRAPH ||
      entry.__typename === INFOBOX_PARAGRAPH ||
      entry.__typename === PIANO_TEMPLATE_PARAGRAPH)
  ) {
    return (
      <div className={grid.Container}>
        {getComponentByParagraphType(
          entry,
          origin,
          index,
          props,
          isMarketingPageReducedHeader,
        )}
      </div>
    );
  }

  if (entry.__typename === EMBED_PARAGRAPH) {
    return (
      <div
        className={classNames({
          [styles.EmbedParagraphPullout]:
            isArticleOrigin &&
            [EMBED_WIDTH_FULL, EMBED_WIDTH_GRID].includes(entry.embedWidth),
        })}
      >
        <div
          className={classNames({
            [grid.Container]:
              origin !== INFO_BOX_TYPE &&
              ((!isArticleOrigin && !entry.embedWidth) ||
                entry.embedWidth === EMBED_WIDTH_GRID),
          })}
        >
          {getComponentByParagraphType(
            entry,
            origin,
            index,
            props,
            isMarketingPageReducedHeader,
          )}
        </div>
      </div>
    );
  }

  if (
    (entry.__typename === MINISTAGE_PARAGRAPH &&
      entry?.ministage?.__typename === MINISTAGE_COMPONENT_ACCORDION) ||
    entry.__typename === VIDEO_PARAGRAPH ||
    entry.__typename === ADVANTAGES_PARAGRAPH ||
    entry.__typename === PARALLAX_IMAGE_PARAGRAPH ||
    entry.__typename === LISTICLE_ITEM_PARAGRAPH ||
    entry.__typename === HERO_MEDIA_PARAGRAPH ||
    entry.__typename === SECTION_PARAGRAPH ||
    props.hasContainer === false ||
    ((props.origin === PAGE_SCREEN_DEFAULT ||
      props.origin === PAGE_SCREEN_MARKETING_TYPE) &&
      entry.__typename === TEASER_STAGE_PARAGRAPH)
  ) {
    return getComponentByParagraphType(
      entry,
      origin,
      index,
      props,
      isMarketingPageReducedHeader,
    );
  }

  return (
    <div className={grid.Row}>
      <div className={props.colStyle}>
        {getComponentByParagraphType(
          entry,
          origin,
          index,
          props,
          isMarketingPageReducedHeader,
        )}
      </div>
    </div>
  );
};

type ParagraphCommponentProps = ParagraphsRendererPropsInner & {
  entry: Partial<
    ContentTypeUnion & {
      subtypeValue: string;
      adSlots?: Array<AdSlot>;
      isLastOfGroup?: boolean;
      webform?: string;
    }
  >;
  index: number;
  hasContainer?: boolean;
  hasTwoColumns?: boolean;
  isMarketingPageReducedHeader?: boolean;
};

const ParagraphComponent = (props: ParagraphCommponentProps) => {
  const {
    entry,
    index,
    hasContainer,
    origin = '',
    viewportLabel,
    isMarketingPageReducedHeader,
  } = props;

  if (!entry) {
    return null;
  }

  if (entry.__typename === INPUT_FORM_PARAGRAPH && !entry.webform) {
    return;
  }

  const hasToRenderRecosForDeviceTypes =
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    (entry.adSlots?.length > 0 &&
      entry.adSlots?.reduce((acc, adSlot) => {
        if (adSlot.slotName === RENDER_AD_TYPE_RECOS) {
          /* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'never'. */
          acc.push(adSlot.deviceType);
        }
        return acc;
      }, [])) ||
    [];

  const hasContainerClass =
    hasContainer &&
    entry.__typename !== ADVANTAGES_PARAGRAPH &&
    entry.__typename !== LISTICLE_ITEM_PARAGRAPH &&
    !(
      props.origin === PAGE_SCREEN_MARKETING_TYPE &&
      entry.__typename === TEASER_STAGE_PARAGRAPH
    ) &&
    entry.__typename !== HERO_MEDIA_PARAGRAPH &&
    !(
      origin === PAGE_SCREEN_MARKETING_TYPE &&
      entry.__typename === SECTION_PARAGRAPH
    ) &&
    entry.__typename !== PARALLAX_IMAGE_PARAGRAPH;

  const withContainerClass = {
    [grid.Container]: hasContainerClass,
  };

  const isInsideLandingPage =
    props.origin?.includes(LANDING_PAGE_TYPE) ||
    props.origin?.includes(PAGE_SCREEN_MARKETING_TYPE);
  const scrollOffset = getScrollOffset(isInsideLandingPage, viewportLabel);

  return (
    <ParagraphIndexContext.Provider value={index}>
      <SmoothScroll offset={scrollOffset} anchorId={getAnchorIdByNode(entry)}>
        <div
          data-key={`paragraph-item-${entry.id || index}`}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          id={entry.id}
          data-testid="paragraph-item"
          className={classNames(styles.Wrapper, withContainerClass, {
            [styles.MarketingPage]:
              props.origin === PAGE_SCREEN_MARKETING_TYPE &&
              ((entry.__typename !== VIDEO_PARAGRAPH &&
                entry.__typename !== LISTICLE_ITEM_PARAGRAPH) ||
                (entry.__typename === LISTICLE_ITEM_PARAGRAPH &&
                  !!entry.isLastOfGroup)),
            [styles.InputFormOnHeroMedia]:
              entry.__typename === INPUT_FORM_PARAGRAPH &&
              origin === PAGE_SCREEN_HERO_MEDIA_TYPE &&
              !props.hasTwoColumns,
          })}
        >
          {/* @ts-ignore TODO: TS2345 ->  Argument of type 'boolean | undefined' is not assignable to parameter of type 'boolean'. */}
          {wrapWithGrid(entry, props, index, isMarketingPageReducedHeader)}
          {!props.isAdSuppressed && origin !== INFO_BOX_TYPE && (
            <span className={styles.AdZone}>
              <AdZoneFinal
                origin={origin}
                adSlots={entry.adSlots || []}
                channel={props.activeMainChannel}
              />
            </span>
          )}

          {/* render recommendations */}
          {hasToRenderRecosForDeviceTypes.length > 0 && (
            <div
              className={classNames(
                {
                  'recommendation-slot-mobile':
                    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'never'. */
                    hasToRenderRecosForDeviceTypes.includes('mobile'),
                  'recommendation-slot-tabletDesktop':
                    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'never'. */
                    hasToRenderRecosForDeviceTypes.includes('tabletDesktop'),
                },
                grid.HideForPrint,
              )}
            >
              {props.recommendationsEl}
            </div>
          )}
        </div>
      </SmoothScroll>
    </ParagraphIndexContext.Provider>
  );
};

class ParagraphsRenderer extends React.Component<ParagraphsRendererPropsInner> {
  renderParagraph() {
    return (entry: ParagraphInterface, index: number): ReactElement => (
      /* @ts-ignore TODO: TS2786 ->  'ParagraphComponent' cannot be used as a JSX component. */
      <ParagraphComponent
        key={`paragraphs-component-${entry.id}-${index}`}
        {...this.props}
        entry={entry}
        index={index}
      />
    );
  }

  render(): ReactElement {
    const { pageBody }: ParagraphsRendererPropsInner = this.props;

    if (!pageBody || !Array.isArray(pageBody) || pageBody.length < 1) {
      /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
      return null;
    }
    // reset listicle index on every render
    listicleIndex = -1;

    return (
      <TestFragment data-testid="paragraphsrenderer-container">
        {pageBody.map(this.renderParagraph())}
      </TestFragment>
    );
  }
}

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
  viewportLabel: windowStateSelector(state).viewport.label,
});

export default compose<any, any>(connect(mapStateToProps))(ParagraphsRenderer);
