import { tealiumTrackEvent } from '../tealium';
import {
  doHandlePWATracking,
  doHandleSearchSuggestionsClickTracking,
  replaceTrackingUrlPlaceholders,
} from '../tracking';

jest.mock('../tealium', () => {
  return {
    tealiumTrackEvent: jest.fn(),
  };
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('[Function] tracking ', () => {
  it('Should replace URL placeholders correctly', () => {
    Date.now = jest.fn().mockReturnValue(Date.now());
    const timestamp = Date.now().toString();
    const testUrls = {
      'https://example.com?param=[timestamp]':
        'https://example.com?param=' + timestamp,
      'https://example.com?param=[TIMESTAMP]':
        'https://example.com?param=' + timestamp,
      'https://example.com?param=[timestamp];param2=[TIMESTAMP]':
        'https://example.com?param=' + timestamp + ';param2=' + timestamp,
    };

    Object.keys(testUrls).forEach(function (testUrl) {
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ 'https */
      const expectedResult = testUrls[testUrl];
      expect(replaceTrackingUrlPlaceholders(testUrl)).toEqual(expectedResult);
    });
  });

  it('Should track PWA correctly', () => {
    doHandlePWATracking('name', 'action', 'url');
    expect(tealiumTrackEvent).toHaveBeenCalledTimes(1);
    expect(tealiumTrackEvent).toHaveBeenCalledWith({
      payload: {
        event_action: 'action',
        event_category: 'pwa',
        event_label: 'url',
        event_name: 'name',
        event_non_interaction: 1,
      },
      type: 'link',
    });
  });

  it('Should track search suggestion click correctly', () => {
    doHandleSearchSuggestionsClickTracking('this is the query');
    expect(tealiumTrackEvent).toHaveBeenCalledTimes(1);
    expect(tealiumTrackEvent).toHaveBeenCalledWith({
      payload: {
        event_name: 'search_suggestions_click',
        site_search_term: 'this is the query',
      },
    });
  });
});
