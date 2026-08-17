import { connect } from 'react-redux';
import classNames from 'classnames';
import { ActiveMainChannel } from 'src/schweizer-illustrierte/shared/types';
import teaserStageParagraphFactory from '../../../../../../../../../common/components/Paragraphs/components/TeaserStageParagraph/factory';
import cssClassByChannel from '../../../../../../../../shared/helpers/cssClassByChannel';
import { ensureTeaserInterface } from '../../../../../Teaser/shared/helpers';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import TeaserGrid from '../../../../../TeaserGrid';
import { TeaserLayout } from '../../../../../TeaserGrid/gridConfigs';
import { TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST } from '../../../../../../../../../shared/constants/paragraphs';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  TeaserStageParagraphFactoryOptionsStyles,
  TeaserStageParagraphProps,
} from '../../../../../../../../../common/components/Paragraphs/components/TeaserStageParagraph/typings';

export type DefaultTeaserStageParagraphPropsInner =
  TeaserStageParagraphProps & {
    activeMainChannel: ActiveMainChannel;
  };

export const getGridLayoutByProps = ({
  teaserStage,
}: TeaserStageParagraphProps): TeaserLayout => {
  const itemsCount = teaserStage?.entities?.edges?.length || 0;
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'TeaserLayout'. */
  let layout: TeaserLayout = null;

  switch (itemsCount) {
    case 1:
      layout = 'teaserStage1Item';
      break;
    case 2:
      layout = 'teaserStage2Items';
      break;
    case 3:
      layout = 'teaserStage3Items';
      break;
    case 4:
      layout = 'teaserStageDefault';
      break;
    default:
      layout = 'teaserStageUnlimited';
      break;
  }

  if (teaserStage.style === TEASER_STAGE_PARAGRAPH_STYLE_RANDOMIZED_LIST) {
    layout = 'teaserStageRandomizedList';
  }

  return layout;
};

const getStylesByProps = ({
  activeMainChannel,
  teaserStage,
}: DefaultTeaserStageParagraphPropsInner): TeaserStageParagraphFactoryOptionsStyles => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel || '');
  return {
    Container: grid.Container,
    SectionTitle: classNames(getThemedClass('SectionTitle'), {
      [styles.HasImage]: !!teaserStage?.image?.source,
    }),
    /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
    TitleLink: getThemedClass('TitleLink'),
    SVGImage: styles.SVGImage,
    TitleWrapper: styles.TitleWrapper,
    SponsorWrapper: styles.SponsorWrapper,
    SponsorImage: styles.SponsorImage,
    SponsorPrefix: styles.SponsorPrefix,
    SponsorLink: styles.SponsorLink,
  };
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state)
    .activeMainChannel as ActiveMainChannel,
});

const DefaultTeaserStageParagraph = teaserStageParagraphFactory({
  ensureTeaserInterface,
  gridLayout: getGridLayoutByProps,
  /* @ts-ignore TODO: TS2322 ->  Type 'FunctionComponent<TeaserGridProps<TeaserLayout>>' is not assignable to type '(props */
  TeaserGridRenderer: () => TeaserGrid,
  styles: getStylesByProps,
});

export default connect(mapStateToProps)(DefaultTeaserStageParagraph);
