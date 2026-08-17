/* istanbul ignore file */

import classNames from 'classnames';
import videoParagraphFactory from '../../../../../../../common/components/Paragraphs/components/VideoParagraph/factory';
import Video from '../../../Video';
import { HERO_IMAGE_GALLERY_ORIGIN } from '../../../Hero/constants';
import styles from './styles.legacy.css';
import {
  VideoParagraphFactoryOptionsStyles,
  VideoParagraphProps,
} from '../../../../../../../common/components/Paragraphs/components/VideoParagraph/typings';

const getStylesByProps = ({
  origin,
  suppressSource,
}: VideoParagraphProps): VideoParagraphFactoryOptionsStyles => ({
  Wrapper: classNames(styles.Wrapper, {
    [styles.HeroImageGalleryWrapper]: origin === HERO_IMAGE_GALLERY_ORIGIN,
  }),
  VideoCredit: classNames({ [styles.Hidden]: suppressSource }),
});

const getShouldHideCaptionByProps = ({
  origin,
}: VideoParagraphProps): boolean => origin === HERO_IMAGE_GALLERY_ORIGIN;

const VideoParagraph = videoParagraphFactory({
  styles: getStylesByProps,
  shouldHideCaption: getShouldHideCaptionByProps,
  Video,
});

export default VideoParagraph;
