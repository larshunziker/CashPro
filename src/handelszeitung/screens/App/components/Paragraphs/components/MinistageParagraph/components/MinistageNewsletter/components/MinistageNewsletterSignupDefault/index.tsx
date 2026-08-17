/* istanbul ignore file */

import classNames from 'classnames';
import ministageNewsletter from '../../../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/factory';
import MailchimpSubscribeForm from '../MailChimpSubscribeForm';
import { STYLE_TEASER_1_1 } from '../../../../../../../../../../../shared/constants/images';
import {
  PUBLICATION_HZB,
  PUBLICATION_SWISS_INSURANCE,
} from '../../../../../../../../../../../shared/constants/publications';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import {
  MinistageNewsletterFactoryOptionsStyles,
  MinistageNewsletterProps,
} from '../../../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageNewsletter/typings';

const getStyleByProps = ({
  origin,
  addClass,
  ministageNewsletter,
  isSplittedPageLayout = false,
}: MinistageNewsletterProps): MinistageNewsletterFactoryOptionsStyles => {
  const relativeOriginPath =
    ministageNewsletter?.image?.relativeOriginPath || '';

  return {
    Background: classNames(styles.Background, {
      [styles.BackgroundSV]: [
        PUBLICATION_SWISS_INSURANCE,
        PUBLICATION_HZB,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      ].includes(origin),
    }),
    Wrapper: classNames({
      [styles.Wrapper]: !addClass,
      /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
      [addClass]: !!addClass,
      [styles.IsSplittedPageLayout]: isSplittedPageLayout,
      [styles.WrapperSV]: [
        PUBLICATION_SWISS_INSURANCE,
        PUBLICATION_HZB,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      ].includes(origin),
    }),
    Container: classNames({
      [grid.Container]: !isSplittedPageLayout,
      [styles.Container]: isSplittedPageLayout,
    }),
    InnerWrapper: styles.InnerWrapper,
    Row: grid.Row,
    ContentWrapper: relativeOriginPath
      ? classNames(grid.ColMd17, grid.ColXl18)
      : grid.ColXs24,
    HeaderText: styles.HeaderText,
    HeaderWrapper: styles.HeaderWrapper,
    LeadText: classNames(styles.LeadText, {
      [styles.LeadTextSV]: [
        PUBLICATION_SWISS_INSURANCE,
        PUBLICATION_HZB,
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      ].includes(origin),
    }),
    HiddenTeaserImage: styles.HiddenTeaserImage,
    PictureWrapper: styles.TeaserImageWrapper,
    Picture: styles.TeaserImage,
  };
};

const MinistageNewsletter = ministageNewsletter({
  MailchimpSubscribeForm,
  imageStyles: {
    style_320: STYLE_TEASER_1_1,
  },
  styles: getStyleByProps,
});

export default MinistageNewsletter;
