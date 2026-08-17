/* istanbul ignore file */

import recommendedContentSectionFactory, {
  RecommendedContentSectionPropsInner,
} from '../../../../../../../common/components/Recommendations/components/RecommendedContentSection/factory';
import RelatedContent from '../../../../components/RelatedContent';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import { RIGHT_COLUMN_PAGE_LAYOUT_TYPE } from '../../../../../../../common/screens/PageTemplate/constants';
import { PUBLICATION_BEO } from '../../../../../../../shared/constants/publications';
import {
  GRID_LAYOUT_TEASER_1X18_NO_ADS,
  GRID_LAYOUT_TEASER_NEW_RECOMMENDATIONS,
} from '../../../../components/TeaserGrid/gridConfigs/constants';

type RecommendedContentSectionProps = RecommendedContentSectionPropsInner & {
  pageLayoutType: string;
};

const getGridLayoutByProps = (
  props: RecommendedContentSectionProps,
): string => {
  const isSplittedPageLayoutVisible = global.innerWidth >= 1024;
  const isInColumn = [RIGHT_COLUMN_PAGE_LAYOUT_TYPE].includes(
    props.pageLayoutType,
  );

  return isInColumn || !isSplittedPageLayoutVisible
    ? GRID_LAYOUT_TEASER_1X18_NO_ADS
    : GRID_LAYOUT_TEASER_NEW_RECOMMENDATIONS;
};

const RecommendedContentSection = recommendedContentSectionFactory({
  RelatedContent,
  ensureTeaserInterface,
  publication: PUBLICATION_BEO,
  gridLayout: getGridLayoutByProps,
  hasTitleContainer: false,
});

export default RecommendedContentSection;
