/* istanbul ignore file */

import React, { FC } from 'react';
import classNames from 'classnames';
import teaserGridFactory from '../../../../../common/components/TeaserGrid/factory';
import AppNexus from '../AppNexus';
import ContentBox from '../ContentBox';
import Error from '../Error';
import Teaser from '../Teaser';
import { TeaserLayout, gridConfig } from './gridConfigs';
import PianoTemplateParagraph from '../../../../../common/components/Paragraphs/components/PianoTemplateParagraph';
import EmbedParagraph from '../Paragraphs/components/EmbedParagraph';
import WebformParagraph from '../Paragraphs/components/WebformParagraph';
import TeaserStageParagraph from '../Paragraphs/components/TeaserStageParagraph';
import {
  TYPE_AD,
  TYPE_RIGHT_WIDGET,
} from '../../../../../common/components/TeaserGrid/gridConfigs/constants';
import {
  CONTENT_PARAGRAPH,
  EMBED_PARAGRAPH,
  INPUT_FORM_PARAGRAPH,
  PIANO_TEMPLATE_PARAGRAPH,
  TEASER_STAGE_PARAGRAPH,
} from '../../../../../shared/constants/paragraphs';
import styles from './styles.legacy.css';
import { EnrichedGridConfig } from '../../../../../common/components/TeaserGrid/typings';

const getRightWidgetGridItem = (item: EnrichedGridConfig) => {
  switch (item.data?.__typename) {
    /* @ts-ignore TODO: TS2678 ->  Type '"PianoTemplateParagraph"' is not comparable to type 'undefined'. */
    case PIANO_TEMPLATE_PARAGRAPH:
      return <PianoTemplateParagraph pianoTemplateParagraph={item.data} />;
    /* @ts-ignore TODO: TS2678 ->  Type '"EmbedParagraph"' is not comparable to type 'undefined'. */
    case EMBED_PARAGRAPH:
      return (
        <EmbedParagraph embedParagraph={item.data} origin={TYPE_RIGHT_WIDGET} />
      );
    /* @ts-ignore TODO: TS2678 ->  Type '"InputFormParagraph"' is not comparable to type 'undefined'. */
    case INPUT_FORM_PARAGRAPH:
      return (
        <div>
          <WebformParagraph
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
            webform={item.data.webform}
            /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
            anchorId={item.data.anchorId || item.data.id}
          />
        </div>
      );
    /* @ts-ignore TODO: TS2678 ->  Type '"ContentParagraph"' is not comparable to type 'undefined'. */
    case CONTENT_PARAGRAPH:
      return (
        <ContentBox
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
          component={item.data.contentReference?.contentSourceValue}
          node={item.data.contentReference}
        />
      );
    /* @ts-ignore TODO: TS2678 ->  Type '"TeaserStageParagraph"' is not comparable to type 'undefined'. */
    case TEASER_STAGE_PARAGRAPH:
      return (
        <TeaserStageParagraph
          teaserStage={item.data}
          origin={TYPE_RIGHT_WIDGET}
        />
      );
    default:
      if (item.data?.__typename) {
        return (
          <Error
            msg={`Unknown right sidebar widget type: ${item.data?.__typename}`}
          />
        );
      }
  }
  return <></>;
};
const getGridItem = (item: EnrichedGridConfig) => {
  switch (item.type) {
    case TYPE_AD:
      return (
        <>
          {item.adConfig &&
            item.adConfig.map(
              ({ slot, isMultiPlacement = true, deviceType }, index) => (
                <div
                  key={`teaser-list-ad-${index}`}
                  className={classNames(
                    'ad-wrapper',
                    `ad-wrapper-${deviceType}`,
                    styles.AdContainer,
                  )}
                >
                  <AppNexus
                    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
                    slot={slot}
                    isMultiPlacement={isMultiPlacement}
                    deviceType={deviceType}
                  />
                </div>
              ),
            )}
        </>
      );

    case TYPE_RIGHT_WIDGET:
      return getRightWidgetGridItem(item);

    default:
      return null;
  }
};

const TeaserGrid = teaserGridFactory<Record<TeaserLayout, any>>({
  ContentBox,
  ErrorMessage: Error,
  Teaser: Teaser as FC,
  cssGridConfig: gridConfig,
  /* @ts-ignore TODO: TS2322 ->  Type '(item */
  getGridItem,
});

export default TeaserGrid;
