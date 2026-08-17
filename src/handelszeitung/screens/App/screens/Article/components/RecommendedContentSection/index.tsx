/* istanbul ignore file */
import recommendedContentSectionFactory from '../../../../../../../common/components/Recommendations/components/RecommendedContentSection/factory';
import { ensureTeaserInterface } from '../../../../components/Teaser/shared/helpers';
import RelatedContent from '../../../../../App/components/RelatedContent';
import { PUBLICATION_GROUP_HZ } from '../../../../../../../shared/constants/publications';
import {
  GRID_LAYOUT_TEASER_3X4_NO_ADS,
  GRID_LAYOUT_TEASER_4X4,
} from '../../../../components/TeaserGrid/gridConfigs/constants';
import { RecommendedContentSectionProps } from '../../../../../../../common/components/Recommendations/components/RecommendedContentSection/typings';

const getGridLayoutByProps = ({
  isSplittedPageLayout,
}: RecommendedContentSectionProps) => {
  if (isSplittedPageLayout) {
    return GRID_LAYOUT_TEASER_3X4_NO_ADS;
  } else {
    return GRID_LAYOUT_TEASER_4X4;
  }
};

const RecommendedContentSection = recommendedContentSectionFactory({
  RelatedContent,
  ensureTeaserInterface,
  publication: PUBLICATION_GROUP_HZ,
  gridLayout: getGridLayoutByProps,
  hasTitleContainer: true,
});

export default RecommendedContentSection;
