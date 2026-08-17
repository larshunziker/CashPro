export type VideoType = Video &
  VideoParagraph & {
    jwPlayerId?: string | null;
  };

const createVideoObjectJsonLd = (
  video: VideoType,
  imageUrl = '',
  thumbnailUrl = '',
  embedUrl = '',
): Record<string, any> => {
  const duration: string =
    (video?.duration &&
      !isNaN(video.duration as any) &&
      `PT${Math.round(parseInt(video?.duration) / 1000)}S`) ||
    '';

  return {
    '@context': 'http://schema.org/',
    '@type': 'VideoObject',
    '@id': video?.id || '',
    caption: video?.caption || '',
    contentUrl: video?.preferredUri
      ? `${global.locationOrigin}${video.preferredUri}`
      : '',
    dateCreated:
      video?.publicationDate ||
      video?.changeDate ||
      video?.createdAt ||
      video?.updatedAt ||
      '',
    dateModified: video?.changeDate || video?.updatedAt || '',
    description:
      video?.caption ||
      video?.metaDescription ||
      video?.title ||
      video?.shortTitle ||
      '',
    duration: duration || '',
    name: video?.title || video?.shortTitle || '',
    image: imageUrl || '',
    uploadDate:
      video?.publicationDate ||
      video?.changeDate ||
      video?.createdAt ||
      video?.updatedAt ||
      '',
    thumbnailUrl,
    ...(embedUrl ? { embedUrl } : {}),
  };
};

export default createVideoObjectJsonLd;
