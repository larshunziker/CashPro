/* istanbul ignore file */

import magazineIssueSectionFactory from '../../../../../common/components/MagazineIssueSection/factory';
import TeaserMagazineIssue from '../Teaser/components/TeaserMagazineIssue';
import { DEFAULT_PUBLICATION } from '../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/schweizer-illustrierte/ */
import { GET_ISSUE } from './queries';
import styles from './styles.legacy.css';

const MagazineIssueSection = magazineIssueSectionFactory({
  TeaserMagazineIssue,
  GET_ISSUE,
  publication: DEFAULT_PUBLICATION,
  styles: {
    Wrapper: styles.Wrapper,
    Row: '',
    Content: '',
  },
});

export default MagazineIssueSection;
