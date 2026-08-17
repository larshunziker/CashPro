// TODO: improve typings

import { isIOS } from './deviceDetector';
import {
  IAV_1,
  MHPA_2,
  MMR_1,
  MPA_3,
  WIDEBOARD_2,
  WIDEBOARD_3,
} from '../../shared/constants/adZone';
import {
  ADMEIRA_PLATFORM_MOBILE,
  CHARACTER_COUNTS,
  FALLBACK_PARAGRAPH_COUNT,
  PARAGRAPH_CHARACTER_COUNTS,
  RENDER_AD_TYPE_RECOS,
} from '../../shared/constants/ads';
import {
  ENTITY_QUEUE_PARAGRAPH,
  TEXT_PARAGRAPH,
  WIDGET_PARAGRAPH,
} from '../../shared/constants/paragraphs';

// TODO: we should enforce everywhere this namings by defining all configs
//       using constants and not just with strings `mobile` and `tabletDesktop`
const DEVICE_TYPES = ['mobile', 'tabletDesktop'];

export const AD_PLACEMENT_SLOTS_ARTICLE = {
  mobile: {
    sequence: [RENDER_AD_TYPE_RECOS, IAV_1, MHPA_2],
    repeater: MHPA_2,
    last: MPA_3,
  },
  tabletDesktop: {
    sequence: [RENDER_AD_TYPE_RECOS, IAV_1, WIDEBOARD_2],
    repeater: WIDEBOARD_2,
    last: WIDEBOARD_3,
  },
};

const AD_PLACEMENT_SLOTS_OVERVIEW = {
  mobile: {
    /* sequence and repeater not needed - using the switch case */
    last: MPA_3,
  },
  tabletDesktop: {
    /* sequence and repeater not needed - using the switch case */
    last: WIDEBOARD_3,
  },
};

/**
 * enrich overview with ads
 * --------------------------------------------------------------------------
 * takes an array of entries and adds ad slots after fix defined positions
 * using the index of each entry to determine if an ad slot should be added.
 */
export function enrichOverviewBodyWithADs({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'pageBody' implicitly has an 'any' type. */
  pageBody,
  hasEQsWithMMR = false,
  ignoreFirstIndexLogic = false,
  enhanceAdslotByEntryIndex = getAdSlotNameByEntryIndex,
  noLastSlotOverride = false,
}) {
  if (!pageBody) {
    return [];
  }

  let hasPageBodyAtLeastOneAdSlot = false;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const pageBodyWithAdSlots = pageBody.map((entry, index) => {
    const isFirstParagraph = index === 0;

    // no ad slot to render on first position if we are on a LandingPage with an EQ first
    if (
      !ignoreFirstIndexLogic &&
      isFirstParagraph &&
      hasEQsWithMMR &&
      entry.__typename === ENTITY_QUEUE_PARAGRAPH
    ) {
      return { ...entry, adSlots: [] };
    }

    // try to get an ad for current index
    const deviceTypeConfigs = enhanceAdslotByEntryIndex(index, hasEQsWithMMR);

    if (!deviceTypeConfigs) {
      return { ...entry, adSlots: [] };
    }

    // get ad configs by device type
    const adSlots = DEVICE_TYPES.map((deviceType) => {
      hasPageBodyAtLeastOneAdSlot = true;
      return getSlotConfigBySlotNameAndDeviceType(
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ mobile */
        deviceTypeConfigs[deviceType],
        deviceType,
      );
    });

    // return enriched entry
    return { ...entry, adSlots };
  });

  if (!hasPageBodyAtLeastOneAdSlot) {
    return pageBodyWithAdSlots;
  }

  return noLastSlotOverride
    ? pageBodyWithAdSlots
    : overrideLastAdSlot(pageBodyWithAdSlots, AD_PLACEMENT_SLOTS_OVERVIEW);
}

/**
 * enrich article body with ads
 * --------------------------------------------------------------------------
 * takes an array of entries and adds ad slots after a defined amount
 * of characters for mobile and tabletDesktop devices. it uses a generator
 * with pre-defined sequences, repeaters and a last ad slot definition.
 */
export function enrichArticleBodyWithADs({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'pageBody' implicitly has an 'any' type. */
  pageBody,
  adPlacementSlots = AD_PLACEMENT_SLOTS_ARTICLE,
  characterCount = CHARACTER_COUNTS,
}) {
  if (
    !pageBody ||
    !adPlacementSlots.tabletDesktop ||
    !adPlacementSlots.mobile
  ) {
    return null;
  }

  // set initial character counts
  const characterCounts = {
    mobile: 0,
    tabletDesktop: 0,
  };

  const usedRepeaterCounts = {
    mobile: 0,
    tabletDesktop: 0,
  };

  // set default character values
  const defaultCharacterCounts = JSON.parse(JSON.stringify(characterCount));

  // init slot generators by device type
  const slotGenerators = {
    mobile: adPlacementSlotGenerator(adPlacementSlots.mobile),
    tabletDesktop: adPlacementSlotGenerator(adPlacementSlots.tabletDesktop),
  };

  let hasPageBodyAtLeastOneAd = false;
  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  const pageBodyWithAdSlots = pageBody.map((entry, index) => {
    if (!entry) {
      return null;
    }
    // add character counts of current paragraph (mobile and tabletDesktop values)
    const consumedCharacters = getCharacterCountsByEntry(entry);
    characterCounts.mobile += consumedCharacters.mobile;
    characterCounts.tabletDesktop += consumedCharacters.tabletDesktop;

    // check if ad is needed for any device type after this entry
    const adSlots = DEVICE_TYPES.reduce((acc, deviceType) => {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ mobile */
      if (characterCounts[deviceType] < defaultCharacterCounts[deviceType][0]) {
        // no ad needed
        return acc;
      }

      // define which ad we have to render
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ mobile */
      const generatorResponse = slotGenerators[deviceType].next().value;
      const slotName = generatorResponse.slotName;
      if (generatorResponse.type === 'repeater') {
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ mobile */
        usedRepeaterCounts[deviceType]++;
      }
      hasPageBodyAtLeastOneAd = true;
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ slotName */
      acc.push(getSlotConfigBySlotNameAndDeviceType(slotName, deviceType));

      // cleanup
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ mobile */
      characterCounts[deviceType] = 0;
      if (defaultCharacterCounts[deviceType].length > 1) {
        // remove item from render sequence if we have more then one left
        defaultCharacterCounts[deviceType].splice(0, 1);
      }

      return acc;
    }, []);

    // make sure that we render at least one ad at the end of all entries
    if (index + 1 === pageBody.length && !hasPageBodyAtLeastOneAd) {
      DEVICE_TYPES.forEach((deviceType) => {
        // add one repeater ad for all device types
        adSlots.push(
          /* @ts-ignore TODO: TS2345 ->  Argument of type '{ slotName */
          getSlotConfigBySlotNameAndDeviceType(
            /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ mobile */
            adPlacementSlots[deviceType].repeater,
            deviceType,
          ),
        );
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ mobile */
        usedRepeaterCounts[deviceType]++;
      });
    }

    return { ...entry, adSlots };
  });

  if (!hasPageBodyAtLeastOneAd) {
    return pageBodyWithAdSlots;
  }

  return overrideLastAdSlot(
    pageBodyWithAdSlots,
    adPlacementSlots,
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ mobile */
    usedRepeaterCounts,
  );
}

function overrideLastAdSlot(
  pageBodyWithAdSlots = [],
  /* @ts-ignore TODO: TS7006 ->  Parameter 'adPlacementSlots' implicitly has an 'any' type. */
  adPlacementSlots,
  usedRepeaterCounts = null,
) {
  /* @ts-ignore TODO: TS7034 ->  Variable 'replaceLastAdCompleted' implicitly has type 'any[]' in some locations where its type cannot be determined. */
  const replaceLastAdCompleted = [];
  // if we received some repeater counts, we handle them upfront
  // otherwise we start with the replacements right aways
  if (usedRepeaterCounts) {
    // iterate over all device types
    DEVICE_TYPES.forEach((deviceType) => {
      // mark device type as completed if we just have 1 repeater in the page body
      if (usedRepeaterCounts[deviceType] < 2) {
        replaceLastAdCompleted.push(deviceType);
      }
    });

    // check if we already marked all device types as completed
    if (replaceLastAdCompleted.length === DEVICE_TYPES.length) {
      return pageBodyWithAdSlots;
    }
  }

  // create copy to avoid side affects and make it pure
  const pageBodyWithAdSlotsCopy = JSON.parse(
    JSON.stringify(pageBodyWithAdSlots),
  );

  // reverse iterate over all entries
  for (let i = pageBodyWithAdSlotsCopy.length - 1; i >= 0; i--) {
    // do nothing if we don't rendered any ad on this entry
    if (pageBodyWithAdSlotsCopy[i].adSlots.length < 1) {
      continue;
    }

    // iterate over all ad slots of this entry
    /* @ts-ignore TODO: TS7006 ->  Parameter 'adSlot' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
    pageBodyWithAdSlotsCopy[i].adSlots.forEach((adSlot, index) => {
      DEVICE_TYPES.forEach((deviceType) => {
        if (
          adSlot.deviceType === deviceType &&
          /* @ts-ignore TODO: TS7005 ->  Variable 'replaceLastAdCompleted' implicitly has an 'any[]' type. */
          !replaceLastAdCompleted.includes(deviceType) &&
          adPlacementSlots[deviceType].last
        ) {
          // replace ad slot with last ad slot
          pageBodyWithAdSlotsCopy[i].adSlots[index].slotName =
            adPlacementSlots[deviceType].last;
          replaceLastAdCompleted.push(deviceType);
        }
      });
    });

    // stop loop as soon as we've replaced one ad for all device types
    if (replaceLastAdCompleted.length === DEVICE_TYPES.length) {
      break;
    }
  }

  return pageBodyWithAdSlotsCopy;
}

/* @ts-ignore TODO: TS7006 ->  Parameter 'adPlacementSlotsByDeviceType' implicitly has an 'any' type. */
function* adPlacementSlotGenerator(adPlacementSlotsByDeviceType) {
  let i = 0;

  while (true) {
    if (adPlacementSlotsByDeviceType.sequence[i]) {
      // use defined sequence of given device type
      yield {
        type: 'sequence',
        slotName: adPlacementSlotsByDeviceType.sequence[i],
      };
    } else {
      // use repeater
      yield {
        type: 'repeater',
        slotName: adPlacementSlotsByDeviceType.repeater,
      };
    }

    i++;
  }
}

const getAdSlotNameByEntryIndex = (index: number, hasEQsWithMMR = false) => {
  switch (index) {
    case 0:
      return {
        // use MMR ad slot if we don't have an EQ first
        mobile: hasEQsWithMMR ? MHPA_2 : MMR_1,
        tabletDesktop: WIDEBOARD_2,
      };
    default:
      return index % 5 === 0
        ? {
            mobile: MHPA_2,
            tabletDesktop: WIDEBOARD_2,
          }
        : null;
  }
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
function getCharacterCountsByEntry(entry): {
  mobile: number;
  tabletDesktop: number;
} {
  switch (entry.__typename) {
    case TEXT_PARAGRAPH:
      const count = entry.characterCount || 0;
      return {
        mobile: count,
        tabletDesktop: count,
      };

    case WIDGET_PARAGRAPH:
      return {
        mobile: PARAGRAPH_CHARACTER_COUNTS.mobile[WIDGET_PARAGRAPH],
        tabletDesktop:
          PARAGRAPH_CHARACTER_COUNTS.tabletDesktop[WIDGET_PARAGRAPH],
      };

    default:
      return {
        mobile: PARAGRAPH_CHARACTER_COUNTS.mobile[FALLBACK_PARAGRAPH_COUNT],
        tabletDesktop:
          PARAGRAPH_CHARACTER_COUNTS.tabletDesktop[FALLBACK_PARAGRAPH_COUNT],
      };
  }
}

function getSlotConfigBySlotNameAndDeviceType(
  slotName: string,
  deviceType: string,
) {
  return {
    slotName,
    deviceType,
  };
}

export type AdmeiraNativeWebapp = 'ios' | 'android' | 'mobileweb';

export const getAdmeiraNativeWebapp = (
  platform: string,
  isHybridApp: boolean,
): AdmeiraNativeWebapp | undefined => {
  if (platform !== ADMEIRA_PLATFORM_MOBILE) {
    return undefined;
  }

  if (!isHybridApp) {
    return 'mobileweb';
  }

  return isIOS() ? 'ios' : 'android';
};

export function adsSetIsAdSuppressed(isAdSuppressed: boolean) {
  /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
  global.Ads = {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    ...global.Ads,
    config: {
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      ...global.Ads?.config,
      isAdSuppressed,
    },
  };
}
