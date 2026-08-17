import { getStyleByProps } from '../index';
import {
  MAIN_CHANNEL_PEOPLE,
  MAIN_CHANNEL_STYLE,
} from '../../../../../constants';

describe('[Component] VideoStage - ImageCaption', () => {
  test.each`
    activeMainChannel
    ${MAIN_CHANNEL_PEOPLE}
    ${MAIN_CHANNEL_STYLE}
  `(
    'Should generate ImageCaption styles correctly for activeMainChannel $activeMainChannel',
    ({ activeMainChannel }) => {
      //@ts-ignore
      const styles = getStyleByProps({ activeMainChannel });
      expect(styles).toMatchSnapshot();
    },
  );
});
