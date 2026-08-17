/* istanbul ignore file */
import React from 'react';
import classNames from 'classnames';
import ministageTeaserFactory, {
  MinistageTeaserFactoryOptionsStyles,
  MinistageTeaserProps,
} from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageTeaser/factory';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import { STYLE_SCALEW_280 } from '../../../../../../../../../shared/constants/images';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../../../common/components/ButtonWithLoading/typings';

const Button: ButtonWithLoadingType = ({ clickHandler, text, isLoading }) => (
  <ButtonWithLoading onClick={clickHandler} loading={isLoading}>
    {text}
  </ButtonWithLoading>
);

const getStyleByProps = ({
  isSplittedPageLayout,
  ministageTeaser,
}: MinistageTeaserProps): MinistageTeaserFactoryOptionsStyles => {
  const hasImage = ministageTeaser.image?.relativeOriginPath ? true : false;
  return {
    ShortTitle: styles.ShortTitle,
    Wrapper: classNames(styles.Wrapper, {
      [styles.IsSplittedPageLayout]: isSplittedPageLayout,
    }),
    Container: classNames(styles.Container, {
      [grid.Container]: !isSplittedPageLayout,
    }),
    ContentWrapper: classNames(styles.ContentWrapper, {
      [styles.MarginRight]: hasImage,
    }),
    Lead: styles.Lead,
    Headline: styles.Headline,
    LinkButton: styles.LinkButton,
    ImageWrapper: styles.ImageWrapper,
    TeaserImage: styles.TeaserImage,
  };
};

const MinistageTeaser = ministageTeaserFactory({
  styles: getStyleByProps,
  imageStyles: {
    style_320: STYLE_SCALEW_280,
  },
  Button,
});

export default MinistageTeaser;
