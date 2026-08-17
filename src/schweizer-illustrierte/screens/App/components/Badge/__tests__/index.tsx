import { getStylesByProps } from '../index';
import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_PEOPLE,
  MAIN_CHANNEL_STYLE,
} from '../../../constants';

describe('[Component] Badge', () => {
  test.each`
    activeMainChannel           | isSmall  | color
    ${MAIN_CHANNEL_PEOPLE}      | ${false} | ${'petrol'}
    ${MAIN_CHANNEL_PEOPLE}      | ${false} | ${'default'}
    ${MAIN_CHANNEL_PEOPLE}      | ${false} | ${''}
    ${MAIN_CHANNEL_BODY_HEALTH} | ${false} | ${''}
    ${MAIN_CHANNEL_STYLE}       | ${true}  | ${'default'}
    ${MAIN_CHANNEL_STYLE}       | ${true}  | ${'blue'}
    ${MAIN_CHANNEL_STYLE}       | ${null}  | ${'blue'}
    ${null}                     | ${null}  | ${''}
  `(
    'Should generate badge styles of activeMainChannel $activeMainChannel with in color $color correctly and isSmall $isSmall',
    ({ activeMainChannel, isSmall, color }) => {
      const styles = getStylesByProps({ activeMainChannel, isSmall, color });
      expect(styles).toMatchSnapshot();
    },
  );
});
