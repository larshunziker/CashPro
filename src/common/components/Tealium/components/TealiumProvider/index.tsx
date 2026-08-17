import { tealiumGetScriptUrl } from '../../../../../shared/helpers/tealium';
import { log } from '../../../../../shared/helpers/utils';

const UTAG_ID = 'utag-lib';

const TealiumProvider = () => {
  if (__SERVER__ || document.getElementById(UTAG_ID)) {
    log('tealium-provider', 'utag script already appended on DOM', 'orange');
    return null;
  }

  // this suppress the first impression - we needed to disable this because the page is too fast now :D
  window.utag_cfg_ovrd = window.utag_cfg_ovrd || {};
  window.utag_cfg_ovrd.noview = true;

  // init global scope vars
  window.Tealium = {
    isLoaded: false,
    queue: [],
  };

  // load utag
  log('tealium-provider', 'utag loading...', 'green');
  const script: HTMLScriptElement = window.document.createElement('script');
  script.src = tealiumGetScriptUrl();
  script.id = UTAG_ID;
  script.onload = function () {
    log('tealium-provider', 'utag loaded', 'green');
    window.Tealium.isLoaded = true;
    const event: Event = new Event('tealiumReady');
    window.dispatchEvent(event);
  };
  window.document.head.appendChild(script);

  return null;
};

export default TealiumProvider;
