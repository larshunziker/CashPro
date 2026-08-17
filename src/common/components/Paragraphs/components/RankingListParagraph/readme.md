# Ranking List Paragraph Factory

The Ranking List Paragraph Component renders a given rankingList Paragraph.

## Usage

RankingListParagraph factory call inside of the **APP**:

```jsx
import windowStateSelector from 'selectors/windowStateSelector';
import { getDynamicGridOptions } from 'TeaserGrid/shared/gridConfig';
import rankingListParagraphFactory, {
  type RankingListParagraphPropsInner,
} from 'Paragraphs/components/RankingListParagraph/factory';
import TeaserGrid from 'TeaserGrid';
import { ensureTeaserInterface } from 'Teaser/shared/helpers';
import { TEASER_LAYOUT_RANKING_LIST } from 'Teaser/constants';
import styles from './styles.legacy.css';

const getGridConfigByProps: Function = ({
  rankingList,
  viewportLabel,
}: RankingListParagraphPropsInner): GridConfig => {
  const rankings: Array<RankingGraphListItem> =
    rankingList.rankings.edges || [];

  return getDynamicGridOptions(
    viewportLabel,
    rankings.length,
    3,
    TEASER_LAYOUT_RANKING_LIST,
    false,
    TEASER_LAYOUT_RANKING_LIST,
  );
};

export default rankingListParagraphFactory({
  gridConfig: getGridConfigByProps,
  ensureTeaserInterface,
  TeaserGrid,
  windowStateSelector,
  styles: {
    Wrapper: styles.Wrapper,
  },
});
```

RankingListParagraph Component usage:

```html
<RankingListParagraph rankingList="{entry}" />;
```
