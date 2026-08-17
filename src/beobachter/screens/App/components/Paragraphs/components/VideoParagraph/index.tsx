import classNames from 'classnames';
import VideoParagraphFactory from '../../../../../../../common/components/Paragraphs/components/VideoParagraph/factory';
import { mergeClasses } from '../../../../../../../shared/helpers/mergeClasses';
import VideoPlayer from '../../../VideoPlayer';
import ImageCaption from '../../../../components/Paragraphs/components/ImageCaption';
import { isInLongFormArticleBody } from '../../../../../../shared/helpers/isInLongFormArticleBody';
import { VIDEO_PAGE } from '../../../../screens/Video/constants';
import { ARTICLE_TYPE_RATGEBER } from '../../../../../../../shared/constants/content';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { VideoParagraphProps } from './typings';

const hasTitleByProps = ({ origin }: VideoParagraphProps) =>
  origin !== VIDEO_PAGE;

const getStylesByProps = ({ origin, suppressSource }: VideoParagraphProps) => {
  const isInLongFormArticle = isInLongFormArticleBody(origin);

  return {
    OuterWrapper: classNames({
      [mergeClasses([grid.ColXl18, grid.ColOffsetXl3])]:
        origin === ARTICLE_TYPE_RATGEBER,
      [mergeClasses([grid.ColSm20, grid.ColOffsetSm2])]: isInLongFormArticle,
    }),
    Wrapper: styles.Wrapper,
    VideoTitle: styles.VideoTitle,
    CaptionWrapper: styles.CaptionWrapper,
    VideoCaption:
      origin === VIDEO_PAGE
        ? styles.VideoCaptionForDetail
        : styles.VideoCaption,
    VideoCredit: classNames(styles.VideoCredit, {
      [styles.Hidden]: suppressSource,
    }),
  };
};

export default VideoParagraphFactory({
  styles: getStylesByProps,
  hasTitle: hasTitleByProps,
  hasShortTitle: false,
  Video: VideoPlayer,
  /* @ts-ignore TODO: TS2322 ->  Type 'MemoExoticComponent<({ caption, credit, addClass, origin, suppressSource, sourceDescription, } */
  ImageCaption,
});
