import {
  VIEWPORT_LG,
  VIEWPORT_MD,
  VIEWPORT_SM,
  VIEWPORT_XL,
  VIEWPORT_XS,
  VIEWPORT_XXL,
} from '../../../../../shared/actions/window';
import { getStylesByProps, mapViewportToAdViewport } from '../index';
import {
  ADMEIRA_PLATFORM_DESKTOP,
  ADMEIRA_PLATFORM_MOBILE,
} from '../../../../../../shared/constants/ads';

describe('[Component] AppNexus', () => {
  test.each`
    viewportLabel   | result
    ${VIEWPORT_XS}  | ${ADMEIRA_PLATFORM_MOBILE}
    ${VIEWPORT_SM}  | ${ADMEIRA_PLATFORM_DESKTOP}
    ${VIEWPORT_MD}  | ${ADMEIRA_PLATFORM_DESKTOP}
    ${VIEWPORT_LG}  | ${ADMEIRA_PLATFORM_DESKTOP}
    ${VIEWPORT_XL}  | ${ADMEIRA_PLATFORM_DESKTOP}
    ${VIEWPORT_XXL} | ${ADMEIRA_PLATFORM_DESKTOP}
  `(
    'Should return correct Admeira platform viewport $viewportLabel',
    ({ viewportLabel, result }) => {
      expect(mapViewportToAdViewport(viewportLabel)).toBe(result);
    },
  );

  test.each`
    slot
    ${'IAV1'}
    ${'WB1'}
    ${'SBA1'}
    ${'MMR1'}
    ${''}
  `('Should return correct styles for adslot $slot', ({ slot }) => {
    expect(getStylesByProps({ slot })).toMatchSnapshot();
  });
});
