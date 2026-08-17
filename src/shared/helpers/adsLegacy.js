import { VIEWPORT_XS } from '../actions/window';
import {
  IAV_1,
  MHPA_2,
  MMR_1,
  MPA_3,
  WIDEBOARD_2,
  WIDEBOARD_3,
} from '../constants/adZone';
import {
  ADMEIRA_PLATFORM_DESKTOP,
  ADMEIRA_PLATFORM_MOBILE,
  CHARACTER_COUNTS,
  FALLBACK_PARAGRAPH_COUNT,
  PARAGRAPH_CHARACTER_COUNTS,
  RENDER_AD_TYPE_AD,
  RENDER_AD_TYPE_RECOS,
} from '../constants/ads';
import {
  BLOCKQUOTE_PARAGRAPH,
  ENTITY_QUEUE_PARAGRAPH,
  MINISTAGE_PARAGRAPH,
  MINISTAGE_SINGLE_ALERT_TOPIC,
  MINISTAGE_TRENDING_TOPICS,
  TEXT_PARAGRAPH,
} from '../constants/paragraphs';

export const AD_PLACEMENT_SLOTS_ARTICLE = {
  mobile: {
    sequence: [IAV_1],
    repeater: MHPA_2,
    last: MPA_3,
  },
  tabletDesktop: {
    sequence: [IAV_1],
    repeater: WIDEBOARD_2,
    last: WIDEBOARD_3,
  },
};

const AD_PLACEMENT_SLOTS_OVERVIEW = {
  mobile: {
    sequence: [],
    repeater: MHPA_2,
    last: MPA_3,
  },
  tabletDesktop: {
    sequence: [],
    repeater: WIDEBOARD_2,
    last: WIDEBOARD_3,
  },
};

export const isMobileWeb = (viewportOrViewportLabel) =>
  viewportOrViewportLabel &&
  mapViewportToAdViewport(viewportOrViewportLabel) === ADMEIRA_PLATFORM_MOBILE;

export const mapViewportToAdViewport = (viewportOrViewportLabel) => {
  const viewportLabel =
    (viewportOrViewportLabel.hasOwnProperty('label') &&
      viewportOrViewportLabel.label) ||
    viewportOrViewportLabel;

  switch (viewportLabel) {
    case VIEWPORT_XS:
      return ADMEIRA_PLATFORM_MOBILE;
    default:
      return ADMEIRA_PLATFORM_DESKTOP;
  }
};

export function* adPlacementSlotGenerator(isMobileWeb, adPlacementSlots) {
  let i = 0;
  while (true) {
    if (isMobileWeb) {
      if (adPlacementSlots.mobile.sequence[i]) {
        yield adPlacementSlots.mobile.sequence[i];
      } else {
        yield adPlacementSlots.mobile.repeater;
      }
    } else {
      if (adPlacementSlots.tabletDesktop.sequence[i]) {
        yield adPlacementSlots.tabletDesktop.sequence[i];
      } else {
        yield adPlacementSlots.tabletDesktop.repeater;
      }
    }
    i++;
  }
}

export function enrichOverviewBodyWithADs({
  pageBody,
  viewportLabel,
  hasEQsWithMMR = false,
  withoutFirstMMR = false,
}) {
  if (!pageBody || !viewportLabel) {
    return pageBody;
  }

  const isMobileWeb =
    mapViewportToAdViewport(viewportLabel) === ADMEIRA_PLATFORM_MOBILE;

  const slotGenerator = adPlacementSlotGenerator(
    isMobileWeb,
    AD_PLACEMENT_SLOTS_OVERVIEW,
  );

  const pageBodyWithAdSlots = pageBody.map((entry, index) => {
    const isFirstParagraph = index === 0;

    // no AD slot to render on first position if we are on a LandingPage with an EQ first
    if (
      isFirstParagraph &&
      hasEQsWithMMR &&
      entry.__typename === ENTITY_QUEUE_PARAGRAPH
    ) {
      return entry;
    }

    const overviewAdConfig = shouldRenderOverviewAd(index);
    let adSlotName =
      overviewAdConfig &&
      overviewAdConfig[isMobileWeb ? 'mobileWeb' : 'desktop'].adType;
    let hasToRenderAd = !!adSlotName;

    // always render MMR_1 after first paragraph on mobile
    if (isFirstParagraph && isMobileWeb && !withoutFirstMMR) {
      adSlotName = MMR_1;
      hasToRenderAd = true;
    }

    // use the next AD slot in the sequence
    if (hasToRenderAd && !adSlotName) {
      adSlotName = slotGenerator.next().value;
    }

    // use the specified slot for AD recycling
    if (hasToRenderAd && !adSlotName) {
      adSlotName =
        AD_PLACEMENT_SLOTS_OVERVIEW[
          (isMobileWeb && 'mobile') || 'tabletDesktop'
        ].repeater;
    }

    return { ...entry, adSlotName, hasToRenderAd };
  });

  return overrideLastAdSlot(
    pageBodyWithAdSlots,
    isMobileWeb,
    AD_PLACEMENT_SLOTS_OVERVIEW,
  );
}

let characterCount = 0;
let characterCounts = [];

export function enrichArticleBodyWithADs({
  pageBody,
  viewportLabel,
  adPlacementSlots = AD_PLACEMENT_SLOTS_ARTICLE,
}) {
  if (
    !pageBody ||
    !adPlacementSlots.tabletDesktop ||
    !adPlacementSlots.mobile
  ) {
    return null;
  }

  const isMobileWeb =
    mapViewportToAdViewport(viewportLabel) === ADMEIRA_PLATFORM_MOBILE;
  characterCounts = JSON.parse(
    JSON.stringify(
      (isMobileWeb && CHARACTER_COUNTS.mobile) ||
        CHARACTER_COUNTS.tabletDesktop,
    ),
  );

  const slotGenerator = adPlacementSlotGenerator(isMobileWeb, adPlacementSlots);

  const pageBodyWithAdSlots = pageBody.map((entry) => {
    const renderAdOrReco = shouldRenderArticleAd(entry, isMobileWeb);
    let adSlotName = renderAdOrReco === RENDER_AD_TYPE_AD ? '' : renderAdOrReco;
    let hasToRenderAd = renderAdOrReco === RENDER_AD_TYPE_AD;

    // always render if only one paragraph exists
    if (characterCount < characterCounts[0] && pageBody.length < 2) {
      adSlotName =
        adPlacementSlots[(isMobileWeb && 'mobile') || 'tabletDesktop'].repeater;
      hasToRenderAd = true;
    }

    // use the next AD slot in the sequence
    if (hasToRenderAd && !adSlotName) {
      adSlotName = slotGenerator.next().value;
    }

    // use the specified slot for AD *recycling*
    if (hasToRenderAd && !adSlotName) {
      adSlotName =
        adPlacementSlots[(isMobileWeb && 'mobile') || 'tabletDesktop'].repeater;
    }

    return { ...entry, adSlotName, hasToRenderAd };
  });

  return overrideLastAdSlot(pageBodyWithAdSlots, isMobileWeb, adPlacementSlots);
}

function overrideLastAdSlot(pageBody, isMobileWeb, adPlacementSlots) {
  // no overrides on content with only 1 paragraph
  if (pageBody.length < 2) {
    return pageBody;
  }

  // no overrides on content with only 1 repeating ad-slot
  const repeaterSlotName =
    adPlacementSlots[(isMobileWeb && 'mobile') || 'tabletDesktop'].repeater;

  const repeaterSlotCount = pageBody.filter(
    ({ adSlotName }) => adSlotName === repeaterSlotName,
  ).length;

  if (repeaterSlotCount < 2) {
    return pageBody;
  }

  const pageBodyOverride = pageBody;
  let index = pageBodyOverride.length - 1;
  while (index >= 0) {
    if (pageBodyOverride[index].hasToRenderAd) {
      pageBodyOverride[index].adSlotName =
        adPlacementSlots[(isMobileWeb && 'mobile') || 'tabletDesktop'].last;
      break;
    }
    index = index - 1;
  }

  return pageBodyOverride;
}

const shouldRenderArticleAd = (entry, isMobileWeb) => {
  characterCount = getCharacterCount(entry, isMobileWeb);

  if (characterCount >= characterCounts[0]) {
    characterCount = 0;
    if (characterCounts.length > 1) {
      characterCounts.splice(0, 1);
    }
    return characterCounts.length !== 3
      ? RENDER_AD_TYPE_AD
      : RENDER_AD_TYPE_RECOS;
  }
  return '';
};

const shouldRenderOverviewAd = (index) => {
  switch (index) {
    case 0:
      return {
        desktop: {
          adType: WIDEBOARD_2,
        },
        mobileWeb: {
          adType: MHPA_2,
        },
      };
    case 1:
    case 2:
    case 3:
    case 4:
      return null;
    case 5:
      return {
        desktop: {
          adType: WIDEBOARD_2,
        },
        mobileWeb: {
          adType: MHPA_2,
        },
      };
    default:
      return index % 5 === 0
        ? {
            desktop: {
              adType: WIDEBOARD_2,
            },
            mobileWeb: {
              adType: MHPA_2,
            },
          }
        : null;
  }
};

const getCharacterCount = (entry, isMobileWeb) => {
  const defaultCharacterCount =
    (isMobileWeb && PARAGRAPH_CHARACTER_COUNTS.mobile) ||
    PARAGRAPH_CHARACTER_COUNTS.tabletDesktop;
  switch (entry.__typename) {
    case TEXT_PARAGRAPH:
      return characterCount + (entry.characterCount || 0);
    case BLOCKQUOTE_PARAGRAPH:
      return characterCount + defaultCharacterCount[BLOCKQUOTE_PARAGRAPH];
    case MINISTAGE_PARAGRAPH:
      if (
        entry.ministage.__typename === MINISTAGE_TRENDING_TOPICS ||
        entry.ministage.__typename === MINISTAGE_SINGLE_ALERT_TOPIC
      ) {
        return (
          characterCount + defaultCharacterCount[MINISTAGE_TRENDING_TOPICS]
        );
      }

    default:
      return characterCount + defaultCharacterCount[FALLBACK_PARAGRAPH_COUNT];
  }
};
