/* istanbul ignore file */
import React from 'react';
import classNames from 'classnames';
import ministageTeaserFactory, {
  MinistageTeaserFactoryOptionsStyles,
  MinistageTeaserProps,
} from '../../../../../../../../../common/components/Paragraphs/components/MinistageParagraph/components/MinistageTeaser/factory';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import {
  STYLE_16X9_440,
  STYLE_SCALEW_280,
} from '../../../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../../../../../common/components/ButtonWithLoading/typings';

const Button: ButtonWithLoadingType = ({ clickHandler, text, isLoading }) => (
  <ButtonWithLoading onClick={clickHandler} loading={isLoading} mobileFullWidth>
    {text}
  </ButtonWithLoading>
);

const getStylesByProps = ({
  useFullwidthBackground = false,
  ministageTeaser,
}: MinistageTeaserProps): MinistageTeaserFactoryOptionsStyles => {
  const hasImage = ministageTeaser.image?.relativeOriginPath ? true : false;

  return {
    ShortTitle: styles.ShortTitle,
    Wrapper: classNames(styles.Wrapper, {
      [styles.FullWidthBackgroundWrapper]: useFullwidthBackground,
    }),
    Container: styles.Container,
    ContentWrapper: classNames(styles.ContentWrapper, {
      [styles.MarginRight]: hasImage,
    }),
    Lead: styles.Lead,
    Headline: styles.Headline,
    ImageWrapper: styles.ImageWrapper,
    TeaserImage: styles.TeaserImage,
  };
};

const getImageStylesByProps = ({
  useFullwidthBackground,
}: MinistageTeaserProps) => {
  return {
    style_320: useFullwidthBackground ? STYLE_16X9_440 : STYLE_SCALEW_280,
  };
};

const MinistageTeaser = ministageTeaserFactory({
  styles: getStylesByProps,
  imageStyles: getImageStylesByProps,
  Button,
});

export default MinistageTeaser;
