import ministageNewsletter from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/factory';
import NewsletterPlaceholderForm from './components/NewsletterPlaceholderForm';
import { STYLE_TEASER_1_1 } from '../../../../../../../../../shared/constants/images';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  MinistageNewsletterFactoryOptionsStyles,
  MinistageNewsletterProps,
} from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/typings';

/* eslint-disable @typescript-eslint/no-unused-vars */
const getStyleByProps = ({
  origin,
  addClass,
  ministageNewsletter: ministage,
  isSplittedPageLayout = false,
}: MinistageNewsletterProps): MinistageNewsletterFactoryOptionsStyles => {
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const relativeOriginPath = ministage?.image?.relativeOriginPath || '';

  return {
    Background: styles.Background,
    Wrapper: styles.Wrapper,
    Container: !isSplittedPageLayout ? grid.Container : styles.Container,
    InnerWrapper: styles.InnerWrapper,
    Row: grid.Row,
    ContentWrapper: relativeOriginPath
      ? `${grid.ColMd17} ${grid.ColXl18}`
      : grid.ColXs24,
    HeaderText: styles.HeaderText,
    HeaderWrapper: styles.HeaderWrapper,
    LeadText: styles.LeadText,
    HiddenTeaserImage: styles.HiddenTeaserImage,
    PictureWrapper: styles.TeaserImageWrapper,
    Picture: styles.TeaserImage,
  };
};

const MinistageNewsletter = ministageNewsletter({
  MailchimpSubscribeForm: NewsletterPlaceholderForm,
  imageStyles: {
    style_320: STYLE_TEASER_1_1,
  },
  styles: getStyleByProps,
});

export default MinistageNewsletter;
