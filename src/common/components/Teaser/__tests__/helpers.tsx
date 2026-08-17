import { tealiumTrackEvent } from '../../../../shared/helpers/tealium';
import {
  createTeaserTealiumTrackEventProps,
  doHandleTealium,
} from '../helpers';

jest.mock('../../../../shared/helpers/tealium', () => {
  return {
    tealiumTrackEvent: jest.fn(),
  };
});

describe('[Common] Teaser helpers', () => {
  it('Should compose tracking data correctly.', () => {
    const options = {
      __typename: 'Article',
      subtypeValue: 'Opinion',
      gcid: '45343',
      preferredUri: '/unternehmen/test-article',
      title: 'Test Article Title',
      sponsor: null,
    };

    const trackingData = createTeaserTealiumTrackEventProps(
      'teaser_click',
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ __typename */
      options,
    );

    expect(trackingData).toMatchSnapshot();
  });

  it('Should handle tealium tracking correclty', () => {
    const payload = { id: '87687', cms_target_page_id: '24' };
    doHandleTealium(payload);

    expect(tealiumTrackEvent).toHaveBeenCalledTimes(1);
    expect(tealiumTrackEvent).toHaveBeenCalledWith({ type: 'link', payload });
  });
});
