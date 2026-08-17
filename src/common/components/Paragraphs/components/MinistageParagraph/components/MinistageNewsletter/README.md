# Ministage Newsletter

Displays a MailchimpForm where the user can sign up to a Mailchimp newsletter.
(This Ministage Newsletter factory was/is based on the MinistageNewsletterSignupDefault from HZ).

## Usage

MinistageNewsletter factory call inside of the **APP**:

```jsx
import classNames from 'classnames';
import ministageNewsletterFactory from '../../../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/factory';
import MailChimpSubscribeForm from '../MailChimpSubscribeForm';
import { STYLE_TEASER_1_1 } from '../../../../../../../../../../../shared/constants/images';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  MinistageNewsletterFactoryOptionsStyles,
  MinistageNewsletterProps,
} from '../../../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/typings';

const MinistageNewsletter = ministageNewsletterFactory({
  MailChimpSubscribeForm,
  imageStyles: {
    style_320: STYLE_TEASER_1_1,
  },
  styles:  {
    Background: styles.Background,
    Wrapper: styles.Wrapper,
    Container: grid.Container,
    InnerWrapper: styles.InnerWrapper,
    Row: grid.Row,
    ContentWrapper: classNames(grid.ColMd17, grid.ColXl18)
    HeaderText: styles.HeaderText,
    HeaderWrapper: styles.HeaderWrapper,
    LeadText: classNames(styles.LeadText),
    HiddenTeaserImage: styles.HiddenTeaserImage,
    PictureWrapper: styles.TeaserImageWrapper,
    Picture: styles.TeaserImage,
  };,
});

export default MinistageNewsletter;
```

MinistageNewsletter Component usage:

```html
<MinistageNewsletter
  ministageNewsletter="{props.ministageParagraph.ministage}"
/>
```
