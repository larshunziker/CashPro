import React from 'react';
import { Helmet } from 'react-helmet-async';
import createVideoObjectJsonLd, {
  VideoType,
} from '../../../shared/helpers/createVideoObjectJsonLd';

type createSSRHelmetType = (
  video: VideoType,
  imageUrl?: string,
  thumbnailUrl?: string,
  embedUrl?: string,
) => JSX.Element;

/* @ts-ignore TODO: TS2322 ->  Type '(video */
export const createSSRHelmet: createSSRHelmetType = (
  video,
  imageUrl,
  thumbnailUrl,
  embedUrl,
) => {
  if (!video) return null;

  const jsonLd = createVideoObjectJsonLd(
    video,
    imageUrl,
    thumbnailUrl,
    embedUrl,
  );
  const script: Array<Record<string, any>> = [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ];
  return <Helmet script={script} />;
};
