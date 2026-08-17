/**
 * @file    tealium helper function collection
 * @author  Roman Zanettin
 * @see     https://community.tealiumiq.com/t5/utag/utag-link-and-utag-view/ta-p/11888 (login required)
 * @date    2016-08-23
 *
 */

/**
 * @TODO
 *
 * 1. Use 'global' instead of 'window'.
 */

import { trackGtm } from '../googleTagManager';
import { log } from '../utils';

const TEALIUM_BASE_URL = '//tags.tiqcdn.com/utag';
const TEALIUM_SCRIPT_NAME = 'utag.js';
const TEALIUM_EVENT_TYPES = ['view', 'link'];

/**
 * tealium track event
 *
 * @desc    track tealium events like 'view' or 'link'
 * @param   {TealiumTrackEventProps}  - options
 * @param   {string}                  - options.type      - 'link' or 'view'
 * @param   {object}                  - options.payload   - payload object
 * @returns {void}
 */
export const tealiumTrackEvent = ({
  type = 'view',
  payload = {},
}: TealiumTrackEventProps) => {
  // perform trackings just on client (SSR excluded)
  if (!__CLIENT__) return;

  // verify params
  if (!type || !TEALIUM_EVENT_TYPES.includes(type)) {
    log('tealium', `tracking aborted - unknown type: ${type}`, 'red');
    return;
  }

  trackGtm(type, payload);

  // verify utag_data is instantiated
  if (!window.utag_data) {
    // if utag_data is not set we set the utag_data within our payload
    // so tealium can work with
    window.utag_data = payload;
  }

  // verify utag is instantiated
  if (!window.utag || !window.utag[type]) {
    log('tealium', 'tracking aborted - utag not ready yet', 'red');
    if (window?.Tealium?.isLoaded) {
      return;
    }
    log('tealium', 'creating custom tealium queue', 'orange');

    // create/extend custom tealium queue (window.Tealium object is created by the provider)
    if (window?.Tealium?.queue?.length < 1) {
      window.addEventListener('tealiumReady', handleTealiumReady);
    }

    if (
      window.Tealium &&
      window.Tealium.queue &&
      Array.isArray(window.Tealium.queue)
    ) {
      // check if type and payload are set in the queue
      const isAlreadyInQueue =
        (type === 'view' &&
          window.Tealium.queue.some(
            (item) =>
              JSON.stringify(item) === JSON.stringify({ type, payload }),
          )) ||
        false;

      if (!isAlreadyInQueue) {
        window.Tealium.queue.push({ type, payload });
      }
    }

    return;
  }

  // track (and give helmet some extra time to get updated)
  setTimeout(() => {
    window.utag[type](payload);
    log('tealium', [`send tracking for type: ${type}`, payload], 'green');
  }, 0);
};

/**
 * tealium get script url
 *
 * @desc    returns url of tealium tracking lib based on current env
 * @returns {string}
 */
export const tealiumGetScriptUrl = () => {
  return `${TEALIUM_BASE_URL}/${__TEALIUM_ACCOUNT__}/${__TEALIUM_PROFILE__}/${__TEALIUM_ENV__}/${TEALIUM_SCRIPT_NAME}`;
};

const handleTealiumReady = () => {
  log('tealium', 'start executing custom queue', 'green');

  // execute queue
  window.Tealium.queue.forEach((item) => tealiumTrackEvent(item));

  // reset queue
  window.Tealium.queue = [];
};
