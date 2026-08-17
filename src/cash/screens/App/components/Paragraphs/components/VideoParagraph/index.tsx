import React from 'react';
import VideoParagraphFactory from '../../../../../../../common/components/Paragraphs/components/VideoParagraph/factory';
import VideoPlayer from '../../../VideoPlayer';
import ImageCaption from '../ImageCaption';
import { VIDEO_PAGE } from '../../../../screens/Video/constants';
import styles from './styles.legacy.css';

const getImageCaptionByProps = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'caption' implicitly has an 'any' type. */
  caption,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'credit' implicitly has an 'any' type. */
  credit,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'origin' implicitly has an 'any' type. */
  origin,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'suppressSource' implicitly has an 'any' type. */
  suppressSource,
}) => (
  <div>
    <ImageCaption
      caption={origin !== VIDEO_PAGE ? caption : null}
      credit={credit}
      origin={origin}
      suppressSource={suppressSource}
    />
  </div>
);

export default VideoParagraphFactory({
  styles: {
    Wrapper: styles.Wrapper,
    VideoCredit: styles.VideoCredit,
  },
  Video: VideoPlayer,
  ImageCaption: getImageCaptionByProps,
});
