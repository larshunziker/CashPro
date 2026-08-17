import { tealiumTrackEvent } from '../../../shared/helpers/tealium';
import { replaceTrackingUrlPlaceholders } from '../../../shared/helpers/tracking';

export type TeaserTealiumTrackingDataOptions = {
  __typename: string;
  preferredUri: string;
  gcid: string;
  title: string;
  subtypeValue?: string;
  sponsor?: Sponsor;
  channel?: Channel;
};

export const createTeaserTealiumTrackEventProps = (
  tealium_event: string,
  options: TeaserTealiumTrackingDataOptions,
) => {
  const channelHierarchy =
    (options?.channel?.settings?.hierarchy?.count &&
      options?.channel?.settings?.hierarchy?.edges) ||
    [];

  return {
    tealium_event,
    event_name: tealium_event,
    cms_target_preferredUri: options.preferredUri,
    cms_target_page_id: options.gcid,
    cms_target_page_title: options.title,
    cms_target_page_type: options.__typename,
    cms_target_page_sponsor: options.sponsor?.title || '',
    cms_target_channel_level_1:
      channelHierarchy[0]?.node?.title || options?.channel?.title || '',
    cms_target_channel_level_2: channelHierarchy[1]?.node?.title || '',
    cms_target_channel_level_3: channelHierarchy[2]?.node?.title || '',
    cms_target_channel_level_4: channelHierarchy[3]?.node?.title || '',
  };
};

export const withTeaserTrackingHandler = (
  trackingTeaserEventPayload: string,
): void => {
  if (__CLIENT__ && trackingTeaserEventPayload) {
    fetch(replaceTrackingUrlPlaceholders(trackingTeaserEventPayload), {
      mode: 'no-cors',
    }).catch((error) => {
      if (__DEVELOPMENT__) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    });
  }
};

export const doHandleTealium = (tealiumData: Record<string, any>) =>
  tealiumTrackEvent({
    type: 'link',
    payload: tealiumData,
  });
