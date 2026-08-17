import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/helpers/ensureVideo'. '/Users/bhs/code/work/r */
import { ensureVideoItem } from '../../../../../../../shared/helpers/ensureVideo';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../../../shared/helpers/mapDataForInfoBox'. '/Users/bhs/code/ */
import { mapDataForInfobox } from '../../../../../../../shared/helpers/mapDataForInfoBox';
import { getScrollOffset } from '../../../../../../shared/helpers/scrollOffset';
import windowStateSelector from '../../../../../../../shared/selectors/windowStateSelector';
import SmoothScroll from '../../../../../../../common/components/SmoothScroll';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import Error from '../../../../components/Error';
import BlockquoteParagraph from '../BlockquoteParagraph';
import EmbedParagraph from '../EmbedParagraph';
import EntityQueueParagraph from '../EntityQueueParagraph';
import ImageGalleryParagraph from '../ImageGalleryParagraph';
import ImageParagraph from '../ImageParagraph';
import InfoBoxParagraph from '../InfoBoxParagraph';
import LinkBoxParagraph from '../LinkBoxParagraph';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../ListicleItemParagraph'. '/Users/bhs/code/work/rasch-stack/src/gaultmil */
import ListicleItemParagraph from '../ListicleItemParagraph';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../MinistageParagraph'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau */
import MinistageParagraph from '../MinistageParagraph';
import MultiColumnParagraph from '../MultiColumnParagraph';
import TeaserParagraph from '../TeaserParagraph';
import TeaserStageParagraph from '../TeaserStageParagraph';
import TextParagraph from '../TextParagraph';
import VideoLoopParagraph from '../VideoLoopParagraph';
import VideoParagraph from '../VideoParagraph';
import WebformParagraph from '../WebformParagraph';
import { ParagraphIndexContext } from '../../../../../../../shared/context/paragraphs';
import {
  EMBED_WIDTH_FULL,
  EMBED_WIDTH_GRID,
} from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/constants';
import { RECIPE_CONTENT_TYPE } from '../../../../../../../shared/constants/content';
import {
  BLOCKQUOTE_PARAGRAPH,
  CHANNEL_BOX_PARAGRAPH,
  EMBED_PARAGRAPH,
  ENTITY_QUEUE_PARAGRAPH,
  FOCUS_BOX_PARAGRAPH,
  IMAGE_GALLERY_PARAGRAPH,
  IMAGE_PARAGRAPH,
  INFOBOX_PARAGRAPH,
  INPUT_FORM_PARAGRAPH,
  LINK_BOX_PARAGRAPH,
  LISTICLE_ITEM_PARAGRAPH,
  MINISTAGE_PARAGRAPH,
  MULTI_COLUMNS_PARAGRAPH,
  TEASER_PARAGRAPH,
  TEASER_STAGE_PARAGRAPH,
  TEXT_PARAGRAPH,
  TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE,
  VIDEO_LOOP_PARAGRAPH,
  VIDEO_PARAGRAPH,
} from '../../../../../../../shared/constants/paragraphs';
import { LANDING_PAGE_TYPE_HOME } from '../../../../screens/LandingPage/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../../../../common/assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { ParagraphsRendererProps } from './typings';

/* @ts-ignore TODO: TS7034 ->  Variable 'listicleIndex' implicitly has type 'any' in some locations where its type cannot be determined. */
let listicleIndex;

const getAnchorIdByNode = (entry: ParagraphInterface) =>
  entry?.anchorId || entry.id;

const ParagraphsRenderer = (props: ParagraphsRendererProps) => {
  const viewportLabel = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => windowStateSelector(state)?.viewport.label,
  );

  if (!props.pageBody || props.pageBody.length < 1) {
    return null;
  }
  const scrollOffset = getScrollOffset(viewportLabel);

  // reset listicle index on every render
  listicleIndex = 0;

  const { pageBody, hasContainer = true } = props;

  return (
    <div data-testid="paragraphsrenderer-container">
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */}
      {/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */}
      {pageBody.map((entry, index) => {
        if (entry.__typename === INPUT_FORM_PARAGRAPH && !entry.webform) {
          return;
        }

        const hasNext = index < pageBody.length - 1;
        const isFirst = index === 0;
        const withContainerClass = {
          [grid.Container]:
            (hasContainer &&
              entry.__typename !== LINK_BOX_PARAGRAPH &&
              entry.__typename !== INFOBOX_PARAGRAPH &&
              entry.__typename !== CHANNEL_BOX_PARAGRAPH &&
              entry.__typename !== MINISTAGE_PARAGRAPH &&
              entry.__typename !== TEASER_STAGE_PARAGRAPH &&
              entry.__typename !== MULTI_COLUMNS_PARAGRAPH &&
              !(
                entry.__typename === TEXT_PARAGRAPH &&
                entry.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE
              ) &&
              !(
                entry.__typename === EMBED_PARAGRAPH &&
                entry.embedWidth === EMBED_WIDTH_FULL
              )) ||
            (entry.__typename === INPUT_FORM_PARAGRAPH &&
              props.origin === LANDING_PAGE_TYPE_HOME),
        };
        return (
          <div key={`paragraphs-${entry.id}-${index}`} id={entry.id}>
            <ParagraphIndexContext.Provider value={index}>
              <SmoothScroll offset={scrollOffset} anchorId={entry.anchorId}>
                <div className={getSectionForNode(entry, props.origin)}>
                  <div
                    className={classNames(
                      styles.Paragraphs,
                      withContainerClass,
                    )}
                  >
                    {wrapGridForElement(entry, isFirst, hasNext, index, props)}
                  </div>
                </div>
              </SmoothScroll>
            </ParagraphIndexContext.Provider>
          </div>
        );
      })}
    </div>
  );
};

// @TODO: as the "parentRenderer" logic is broken on the stack -
// we simply don't know which cases shall NOT have a margin
/* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
const hasSectionDefaultMarginByOrigin = (origin) => origin !== 'TODO';

// @TODO: as the "parentRenderer" logic is broken on the stack -
// we simply don't know which cases shall NOT have an isFirst on TextParagraphs
/* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
const suppressIsFirstByOrigin = (origin) => origin !== 'TODO';

/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'origin' implicitly has an 'any' type. */
const getSectionForNode = (entry, origin) => {
  switch (entry.__typename) {
    case EMBED_PARAGRAPH:
    case TEASER_PARAGRAPH:
      return sections.Section;
    case BLOCKQUOTE_PARAGRAPH:
      if (!entry.text) {
        return '';
      }
    default:
      return classNames(sections.Section, {
        [styles.SectionDefaultMargin]: hasSectionDefaultMarginByOrigin(origin),
      });
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'isFirst' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'hasNext' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const wrapGridForElement = (entry, isFirst, hasNext, index, props) => {
  const renderedComponent = getComponentForEntry(
    entry,
    isFirst,
    hasNext,
    index,
    props,
  );

  if (
    (entry.__typename === ENTITY_QUEUE_PARAGRAPH &&
      props.origin === LANDING_PAGE_TYPE_HOME) ||
    (entry.__typename === INPUT_FORM_PARAGRAPH &&
      props.origin === RECIPE_CONTENT_TYPE) ||
    (entry.__typename === EMBED_PARAGRAPH &&
      [EMBED_WIDTH_FULL, EMBED_WIDTH_GRID].includes(entry.embedWidth))
  ) {
    return renderedComponent;
  }

  if (props.disableGrid === true) {
    return renderedComponent;
  }

  switch (props.origin || entry.__typename) {
    case MULTI_COLUMNS_PARAGRAPH:
    case CHANNEL_BOX_PARAGRAPH:
    case TEASER_PARAGRAPH:
    case TEASER_STAGE_PARAGRAPH:
    case MINISTAGE_PARAGRAPH:
    case INFOBOX_PARAGRAPH:
      return renderedComponent;
    default:
      switch (entry.__typename) {
        case MULTI_COLUMNS_PARAGRAPH:
        case CHANNEL_BOX_PARAGRAPH:
        case TEASER_PARAGRAPH:
        case TEASER_STAGE_PARAGRAPH:
        case MINISTAGE_PARAGRAPH:
        case INFOBOX_PARAGRAPH:
          return renderedComponent;
        default:
          return (
            <div className={grid.Row}>
              <div className={props.colStyle}>{renderedComponent}</div>
            </div>
          );
      }
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'scrollOffset' implicitly has an 'any' type. */
const getListicleItem = (entry, scrollOffset) => {
  const listicleJsx = (
    <ListicleItemParagraph
      listicleItem={entry}
      /* @ts-ignore TODO: TS7005 ->  Variable 'listicleIndex' implicitly has an 'any' type. */
      listicleIndex={listicleIndex}
      scrollOffset={scrollOffset}
    />
  );
  /* @ts-ignore TODO: TS7005 ->  Variable 'listicleIndex' implicitly has an 'any' type. */
  listicleIndex += 1;

  return listicleJsx;
};

const getComponentForEntry = (
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  entry,
  isFirst = false,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'hasNext' implicitly has an 'any' type. */
  hasNext,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  index,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  props,
) => {
  switch (entry.__typename) {
    case CHANNEL_BOX_PARAGRAPH:
      return null;
    case TEXT_PARAGRAPH:
      if (entry.styleValue === TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE) {
        return (
          <TestFragment data-testid="paragraphsrenderer-info-box-paragraph-wrapper">
            <InfoBoxParagraph
              infoBoxParagraph={mapDataForInfobox(entry)}
              origin={`${props.origin}_${TEXT_PARAGRAPH_INFOBOX_STYLE_VALUE}`}
            />
          </TestFragment>
        );
      } else {
        return (
          <TestFragment data-testid="paragraphsrenderer-text-paragraph-wrapper">
            <TextParagraph
              isFirst={
                isFirst &&
                suppressIsFirstByOrigin(props.origin) &&
                props.showCap
              }
              addClass={props.addClass}
              textParagraph={entry}
            />
          </TestFragment>
        );
      }
    case MULTI_COLUMNS_PARAGRAPH:
      return (
        <MultiColumnParagraph
          addClass={props.addClass}
          multiColumn={entry}
          origin={props.origin}
        />
      );
    case INPUT_FORM_PARAGRAPH:
      if (entry && typeof entry === 'object' && entry.webform) {
        return (
          <WebformParagraph
            webform={entry.webform}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            anchorId={getAnchorIdByNode(entry)}
          />
        );
      }
    case IMAGE_PARAGRAPH:
      return <ImageParagraph imageParagraph={entry} origin={props.origin} />;
    case IMAGE_GALLERY_PARAGRAPH:
      return <ImageGalleryParagraph gallery={entry} />;
    case EMBED_PARAGRAPH:
      return <EmbedParagraph embedParagraph={entry} />;
    case FOCUS_BOX_PARAGRAPH:
      return null;
    case LINK_BOX_PARAGRAPH:
      return <LinkBoxParagraph linkBox={entry} />;
    case TEASER_PARAGRAPH:
      return (
        <TeaserParagraph
          colStyle={props.colStyle}
          hasNext={hasNext}
          teaserParagraph={entry}
          origin={props.origin}
        />
      );
    case MINISTAGE_PARAGRAPH:
      return <MinistageParagraph ministageParagraph={entry} />;
    case INFOBOX_PARAGRAPH:
      return (
        <InfoBoxParagraph infoBoxParagraph={entry} origin={props.origin} />
      );
    case VIDEO_PARAGRAPH:
      const ensuredVideo = ensureVideoItem(entry);
      return (
        <VideoParagraph
          video={ensuredVideo.video}
          suppressSource={entry.suppressSource}
        />
      );
    case VIDEO_LOOP_PARAGRAPH:
      return <VideoLoopParagraph videoLoopParagraph={entry} />;
    case BLOCKQUOTE_PARAGRAPH:
      return <BlockquoteParagraph blockquoteParagraph={entry} />;
    case ENTITY_QUEUE_PARAGRAPH:
      return (
        <EntityQueueParagraph
          entityQueue={entry}
          origin={props.origin}
          paragraphIndex={index}
          page={props.page}
        />
      );
    case TEASER_STAGE_PARAGRAPH:
      return <TeaserStageParagraph teaserStage={entry} origin={props.origin} />;
    case LISTICLE_ITEM_PARAGRAPH:
      const scrollOffset = getScrollOffset(props.viewportLabel);

      return getListicleItem(entry, scrollOffset);
    default:
      // eslint-disable-next-line no-underscore-dangle
      return __DEVELOPMENT__ ? (
        <Error msg={`Paragraphs: No Component for: ${entry.__typename}`} />
      ) : null;
  }
};

export default ParagraphsRenderer;
