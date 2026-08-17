/* istanbul ignore file */

import teaserAuthorFactory from '../../../../../../../common/components/Teaser/components/Author/factory';
import styles from './styles.legacy.css';

const TeaserAuthor = teaserAuthorFactory({
  styles: {
    AuthorAvatar: styles.AuthorAvatar,
    Name: styles.Name,
    ShortDescriptionWrapper: styles.ShortDescriptionWrapper,
    ShortDescription: styles.ShortDescription,
    Headline: styles.Headline,
    Grid: styles.Grid,
    Box: styles.Box,
    Initials: styles.Initials,
    OutsideArticleName: styles.OutsideArticleName,
    InsideArticleName: styles.InsideArticleName,
    Link: styles.Link,
  },
});

export default TeaserAuthor;
