# Magazine Issue Section Factory

The Magazine Issue Section lazy-loads the Magazine Issue of a given issue nid and renders a TeaserMagazineIssue.

## Usage

Magazine Issue Section factory call inside of the **APP**:

```jsx
import classNames from 'classnames';
import magazineIssueSectionFactory from '../../../../../common/components/MagazineIssueSection/factory';
import TeaserMagazineIssue from '../Teaser/components/TeaserMagazineIssue';
import { DEFAULT_PUBLICATION } from '../../constants';
import { GET_ISSUE } from './queries';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

const MagazineIssueSection = magazineIssueSectionFactory({
  TeaserMagazineIssue,
  GET_ISSUE,
  publication: DEFAULT_PUBLICATION,
  styles: {
    Wrapper: classNames(styles.Wrapper, grid.Container),
    Row: grid.Row,
    Content: classNames(grid.ColMd18, grid.ColXl17),
  },
});

export default MagazineIssueSection;
```

MagazineIssueSection Component usage:

```html
<MagazineIssueSection issueId="{article.issue.nid}" />
```
