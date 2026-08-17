/* istanbul ignore file */

import teaserAuthorFactory from '../../../../../../../common/components/Teaser/components/Author/factory';
import SubscribeButton from '../../../SubscribeButton';
import styles from './styles.legacy.css';

const TeaserAuthor = teaserAuthorFactory({
  SubscribeButton,
  styles: {
    AuthorAvatar: styles.AuthorAvatar,
    Wrapper: styles.AuthorGridWrapper,
    Name: styles.Name,
    ShortDescriptionWrapper: styles.ShortDescriptionWrapper,
    ShortDescription: styles.ShortDescription,
    Headline: styles.Headline,
    Grid: styles.Grid,
    Initials: styles.Initials,
    Link: styles.Link,
    SubscribeButtonWrapper: styles.SubscribeButtonWrapper,
  },
});

export default TeaserAuthor;
