import { log } from './utils';

export const RMS_ORBIT_VIDEO_MAPPER_ENDPOINT =
  'https://rms-orbit-video-mapper.ws.rms.rocks/';

type VideoLike = {
  jwPlayerId?: string | null;
  brightcoveId?: string | null;
};

// Deduplicate only concurrent requests; rely on HTTP caching for persistence.
const inFlightJwPlayerIdByBrightcoveId = new Map<
  string,
  Promise<string | null>
>();

export const getResolvedJwPlayerId = (
  video?: VideoLike,
  resolvedJwPlayerId?: string | null,
): string => {
  return video?.jwPlayerId || resolvedJwPlayerId || '';
};

export const withResolvedJwPlayerId = <T extends VideoLike | undefined>(
  video: T,
  resolvedJwPlayerId?: string | null,
): T => {
  if (!video || video.jwPlayerId || !resolvedJwPlayerId) {
    return video;
  }

  return {
    ...video,
    jwPlayerId: resolvedJwPlayerId,
  } as T;
};

export const fetchJwPlayerIdByBrightcoveId = async (
  brightcoveId?: string | null,
): Promise<string | null> => {
  if (!brightcoveId || __SERVER__) {
    return null;
  }

  if (!inFlightJwPlayerIdByBrightcoveId.has(brightcoveId)) {
    const requestPromise = fetch(
      `${RMS_ORBIT_VIDEO_MAPPER_ENDPOINT}?video_id=${encodeURIComponent(
        brightcoveId,
      )}`,
      {
        method: 'GET',
        cache: 'default',
      },
    )
      .then(async (response) => {
        if (!response.ok) {
          log(
            'video-player',
            `video mapper request failed for brightcoveId: ${brightcoveId}`,
            'orange',
          );
          return null;
        }

        const body = await response.json();
        const jwVideoId = body?.data?.jwVideoId;

        if (typeof jwVideoId === 'string' && jwVideoId.length > 0) {
          return jwVideoId;
        }

        log(
          'video-player',
          `video mapper returned no jwVideoId for brightcoveId: ${brightcoveId}`,
          'orange',
        );

        return null;
      })
      .catch((error) => {
        log(
          'video-player',
          ['video mapper request failed', brightcoveId, error],
          'red',
        );
        return null;
      })
      .finally(() => {
        inFlightJwPlayerIdByBrightcoveId.delete(brightcoveId);
      });

    inFlightJwPlayerIdByBrightcoveId.set(brightcoveId, requestPromise);
  }

  return inFlightJwPlayerIdByBrightcoveId.get(brightcoveId)!;
};
