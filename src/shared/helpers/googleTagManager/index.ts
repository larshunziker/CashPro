/**
 * Tracks events to Google Tag Manager
 * @param type The type of event to track.
 * @param payload The payload of the tracking event.
 */
export const trackGtm = (
  type: string,
  payload: Record<string, any> | null,
): void => {
  const isAlreadyInQueue =
    type === 'view'
      ? window.eventQueueDataLayer?.some((item) => {
          return item.cms_page_id === payload?.cms_page_id;
        })
      : false;

  if (isAlreadyInQueue) {
    return;
  }

  window.eventQueueDataLayer?.push({ ...payload, event: type });
};
