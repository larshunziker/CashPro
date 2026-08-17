import React from 'react';
import { IntlProvider } from 'react-intl';
import { render } from '@testing-library/react';
import { initialState as windowInitialState } from '../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import PopStage, { Cities } from '../index';
import MockedProvider from '../../../../../../shared/tests/components/MockedProvider';
import mockData from './mockData.json';
import { ORGANIZATION_CONTENT_TYPE } from '../../../../../../shared/constants/content';
import {
  GLOBAL_SEARCH_SORT_BY_RANDOM,
  GLOBAL_SEARCH_SORT_DESC,
} from '../../../../../shared/constants/globalSearch';
import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
  URL_DE_POP_RESTAURANTS,
  URL_FR_POP_RESTAURANTS,
} from '../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/Ap */
import { GET_POP_STAGE_RESTAURANTS } from '../queries';

jest.mock('Link');
jest.mock('Icon');
jest.mock('TeaserGrid');
jest.mock('ExpansionPanel');

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
          query: GET_POP_STAGE_RESTAURANTS,
          variables: {
            query: '',
            pageSize: 12, //overfetch teasers due to random AC -> since we only show 3 teasers, this will lead to an "random-effect"
            offset: 0,
            sort: GLOBAL_SEARCH_SORT_BY_RANDOM,
            sortOrder: GLOBAL_SEARCH_SORT_DESC,
            path:
              props.language === 'fr'
                ? URL_FR_POP_RESTAURANTS
                : URL_DE_POP_RESTAURANTS,
            publication:
              props.language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
            language: props.language || '',
            popCity: 'All',
            organizationType: 'Pop',
            filter: ORGANIZATION_CONTENT_TYPE,
          },
        },
        result: customMockData,
      },
    ]}
  >
    {/* @ts-ignore TODO: TS7005 ->  Variable 'initialState' implicitly has an 'any' type. */}
    <ReduxProvider state={initialState}>
      <IntlProvider locale="de-CH">
        <PopStage {...props} />
      </IntlProvider>
    </ReduxProvider>
  </MockedProvider>
);

describe('[Component] PopStage', () => {
  it('Should render City correctly', () => {
    const { container } = render(
      <Cities popCity={{ label: 'Bern', url: '/bern' }} />,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render PopStage correctly', () => {
    const { queryByTestId } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
      mockedComponent(JSON.parse(JSON.stringify(mockData)), initialProps),
    );
    expect(queryByTestId('pop-stage-wrapper')).not.toBeNull();
  });
});
