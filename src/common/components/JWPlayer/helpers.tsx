import React from 'react';
import { Helmet } from 'react-helmet-async';
import createVideoObjectJsonLd, {
  VideoType,
} from '../../../shared/helpers/createVideoObjectJsonLd';

export const buildJwPlayerEmbedUrl = (
  seoPlayerId: string,
  videoId: string,
): string => {
  return `https://cdn.jwplayer.com/players/${videoId}-${seoPlayerId}.html`;
};

type CreateSSRHelmetType = (
  video: VideoType,
  imageUrl?: string,
  thumbnailUrl?: string,
) => JSX.Element;

// Keep helper API aligned with Brightcove to simplify adoption in apps.
// @ts-ignore
export const createSSRHelmet: CreateSSRHelmetType = (
  video,
  imageUrl,
  thumbnailUrl,
) => {
  if (!video) return null;

  const jsonLd = createVideoObjectJsonLd(video, imageUrl, thumbnailUrl);
  const script: Array<Record<string, any>> = [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify(jsonLd),
    },
  ];

  return <Helmet script={script} />;
};
