import React from 'react';
import classNames from 'classnames';
import { VideoType } from '../../../../../../../shared/helpers/createVideoObjectJsonLd';
import VideoParagraph from '../../../Paragraphs/components/VideoParagraph';
import styles from './styles.legacy.css';
import type { VideoProps } from './typings';

const HeroVideo = ({ video, children }: VideoProps) => (
  <div className={classNames('hero-video', styles.Wrapper)}>
    <VideoParagraph video={video as VideoType} addClass={styles.Video} />
    {children}
  </div>
);

export default HeroVideo;
