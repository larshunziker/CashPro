import React, { ReactElement } from 'react';
import TestFragment from '../../../../../../../shared/tests/components/TestFragment';
import DefaultTeaserStageParagraph from './components/DefaultTeaserStageParagraph';
import SpecialL from './components/SpecialL';
import { TEASER_STAGE_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import { CHANNEL_TYPE_SPECIAL } from '../../../../screens/Channel/constants';
import { MAX_NUMBER_OF_TEASERS_PER_TEASERSTAGE_ON_SPECIALS } from './constants';
import { TeaserStageParagraphProps } from '../../../../../../../common/components/Paragraphs/components/TeaserStageParagraph/typings';

export type TeaserStageParagraphPropsInner = TeaserStageParagraphProps & {
  settingsState?: SettingsState;
};

// ---------------------------------------------------------------------------------- //
// COMPONENT
// ---------------------------------------------------------------------------------- //

const TeaserStageParagraph = (
  props: TeaserStageParagraphPropsInner,
): ReactElement | null => {
  if (
    Object.keys(props).length === 0 ||
    !props.teaserStage ||
    !props.teaserStage.entities ||
    !Array.isArray(props.teaserStage.entities.edges) ||
    (props.teaserStage.entities.edges?.length || 0) <= 0
  ) {
    return null;
  }

  const teaserStage: TeaserStageParagraph = props.teaserStage;

  const isSpecial: boolean =
    (teaserStage?.termReference &&
      'channelType' in teaserStage.termReference &&
      teaserStage.termReference.channelType === CHANNEL_TYPE_SPECIAL) ||
    (teaserStage?.termReference &&
      'settings' in teaserStage.termReference &&
      teaserStage.termReference.settings?.channel?.channelType ===
        CHANNEL_TYPE_SPECIAL) ||
    false;

  const teaserStageCopy =
    (isSpecial &&
      MAX_NUMBER_OF_TEASERS_PER_TEASERSTAGE_ON_SPECIALS &&
      /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
      /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
      teaserStage.entities.edges?.length >
        MAX_NUMBER_OF_TEASERS_PER_TEASERSTAGE_ON_SPECIALS && {
        ...teaserStage,
        entities: {
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
          edges: teaserStage.entities.edges.slice(
            0,
            MAX_NUMBER_OF_TEASERS_PER_TEASERSTAGE_ON_SPECIALS,
          ),
        },
      }) ||
    teaserStage;

  if (isSpecial) {
    return (
      <TestFragment data-testid="teaser-stage-paragraph-special-l-wrapper">
        <SpecialL
          {...props}
          teaserStage={teaserStageCopy}
          paragraphType={TEASER_STAGE_PARAGRAPH}
        />
      </TestFragment>
    );
  } else {
    return (
      <TestFragment data-testid="teaser-stage-paragraph-default-teaser-stage-wrapper">
        <DefaultTeaserStageParagraph {...props} />
      </TestFragment>
    );
  }
};

export default TeaserStageParagraph;
