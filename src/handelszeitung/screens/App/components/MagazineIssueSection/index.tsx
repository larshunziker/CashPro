/* istanbul ignore file */

import classNames from 'classnames';
import magazineIssueSectionFactory from '../../../../../common/components/MagazineIssueSection/factory';
import TeaserMagazineIssue from '../Teaser/components/TeaserMagazineIssue';
import { DEFAULT_PUBLICATION } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/handelszeitung/screens/ */
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
