import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { initialState as windowInitialState } from '../../../../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../../../../shared/tests/components/ReduxProvider';
import MenuTeaser from '../index';
import MockedProvider from '../../../../../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_SORT_BY_MODIFICATION_DATE,
} from '../../../../../../../../../../shared/constants/globalSearch';
import {
  ARTICLE_TYPE_BLOG_B,
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
} from '../../../../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/Ap */
import { MENU_TEASER_QUERY } from '../queries';

// Added this to avoid the "Missing Translation" error being logged
beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});
afterAll(() => {
  // @ts-ignore
  console.error.mockRestore(); // eslint-disable-line
});

/* @ts-ignore TODO: TS7034 ->  Variable 'initialState' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialState;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeEach(() => {
  initialState = {
    settings: { language: 'de' },
    window: windowInitialState,
  };
  initialProps = {
    language: 'de',
  };
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'customMockData' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const mockedComponent = (customMockData, props) => (
  <MockedProvider
    mocks={[
      {
        request: {
          query: MENU_TEASER_QUERY,
          variables: {
            query: '',
            filter: GLOBAL_SEARCH_FILTER_ARTICLE,
            articleType: ARTICLE_TYPE_BLOG_B,
            sort: GLOBAL_SEARCH_SORT_BY_MODIFICATION_DATE,
            publication:
              props.language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
          },
        },
        result: customMockData,
      },
    ]}
  >
    {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
    <ReduxProvider state={initialState}>
      <IntlProvider locale="de-CH">
        <MenuTeaser {...props} />
      </IntlProvider>
    </ReduxProvider>
  </MockedProvider>
);

describe('[Component] MenuTeaser', () => {
  it('Should render MenuTeaser correctly', async () => {
    const { container, findByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      mockedComponent(JSON.parse(JSON.stringify(mockData)), initialProps),
    );
    await findByTestId('teaser-factory-link-wrapper');

    expect(container).toMatchSnapshot();
  });
});
