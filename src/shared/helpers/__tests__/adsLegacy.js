/**
 * @file   ads helper test
 * @author Nino Zumstein <nino.zumstein@ringieraxelspringer.ch>
 * @date   2019-09-10 16:55:08
 */

import { adPlacementSlotGenerator } from '../adsLegacy';

const slotNames = {
  mobile: {
    sequence: ['mobile-slot-1', 'mobile-slot-2', 'mobile-slot-3'],
    repeater: 'mobile-slot-2',
  },
  tabletDesktop: {
    sequence: [
      'tablet-desktop-slot-1',
      'tablet-desktop-slot-2',
      'tablet-desktop-slot-3',
    ],
    repeater: 'tablet-desktop-slot-2',
  },
};

describe('[helper] ads', () => {
  it.each([
    [{ callAmount: 0, expected: '' }],
    [{ callAmount: 1, expected: 'mobile-slot-1' }],
    [{ callAmount: 2, expected: 'mobile-slot-2' }],
    [{ callAmount: 10, expected: 'mobile-slot-2' }],
    [{ callAmount: 3, expected: 'mobile-slot-3' }],
  ])(
    'Should return the correct mobile slot after calling next() x times %#',
    (testCase) => {
      const slotGeneratorMobile = adPlacementSlotGenerator(true, slotNames);
      let slotName = '';

      for (let index = 0; index < testCase.callAmount; index++) {
        slotName = slotGeneratorMobile.next().value;
      }

      expect(slotName).toBe(testCase.expected);
    },
  );

  it.each([
    [{ callAmount: 0, expected: '' }],
    [{ callAmount: 1, expected: 'tablet-desktop-slot-1' }],
    [{ callAmount: 2, expected: 'tablet-desktop-slot-2' }],
    [{ callAmount: 22, expected: 'tablet-desktop-slot-2' }],
    [{ callAmount: 3, expected: 'tablet-desktop-slot-3' }],
  ])(
    'Should return the correct tabletDesktop slot after calling next() x times %#',
    (testCase) => {
      const slotGeneratorDesktop = adPlacementSlotGenerator(false, slotNames);

      let slotName = '';

      for (let index = 0; index < testCase.callAmount; index++) {
        slotName = slotGeneratorDesktop.next().value;
      }

      expect(slotName).toBe(testCase.expected);
    },
  );
});
