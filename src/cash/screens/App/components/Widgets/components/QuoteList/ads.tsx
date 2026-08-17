import { BOTTOM_AD_1, INDEX_AD_1 } from '../../../AppNexus/constants';
import { AdZoneProps } from '../AdZone/typings';

const DEVICE_TYPES = ['mobile', 'tabletDesktop'];

const getSlotConfigBySlotNameAndDeviceType = (
  slotName: string,
  deviceType: string,
) => {
  return {
    slotName,
    deviceType,
  };
};

export const AD_PLACEMENT_SLOTS_QUOTELIST = {
  mobile: {
    sequence: [INDEX_AD_1],
    repeater: INDEX_AD_1,
    last: BOTTOM_AD_1,
  },
  tabletDesktop: {
    sequence: [INDEX_AD_1],
    repeater: INDEX_AD_1,
    last: BOTTOM_AD_1,
  },
};

export const QUOTELIST_CHARACTER_COUNTS = {
  mobile: [32, 50],
  tabletDesktop: [32, 50],
};

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

export const enrichItemsWithADs = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'items' implicitly has an 'any' type. */
  items,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'adPlacementSlots' implicitly has an 'any' type. */
  adPlacementSlots,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'characterCount' implicitly has an 'any' type. */
  characterCount,
}) => {
  if (!items || !adPlacementSlots.tabletDesktop || !adPlacementSlots.mobile) {
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

  const defaultCharacterCounts = JSON.parse(JSON.stringify(characterCount));

  // init slot generators by device type
  const slotGenerators = {
    mobile: adPlacementSlotGenerator(adPlacementSlots.mobile),
    tabletDesktop: adPlacementSlotGenerator(adPlacementSlots.tabletDesktop),
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'entry' implicitly has an 'any' type. */
  const pageBodyWithAdSlots = items?.map((entry) => {
    characterCounts.mobile++;
    characterCounts.tabletDesktop++;

    // // check if ad is needed for any device type after this entry
    const adSlots: AdZoneProps[] = DEVICE_TYPES.reduce((acc, deviceType) => {
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
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ slotName */
      acc.push(getSlotConfigBySlotNameAndDeviceType(slotName, deviceType));

      // // cleanup
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ mobile */
      characterCounts[deviceType] = 0;
      if (defaultCharacterCounts[deviceType].length > 1) {
        // remove item from render sequence if we have more then one left
        defaultCharacterCounts[deviceType].splice(0, 1);
      }

      return acc;
    }, []);

    if (adSlots.length > 0) {
      entry.adSlots = adSlots;
    }

    return { ...entry };
  });

  return pageBodyWithAdSlots;
};
