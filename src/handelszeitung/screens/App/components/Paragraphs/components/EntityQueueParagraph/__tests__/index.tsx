import { render } from '@testing-library/react';
import { getTitleByProps } from '../../EntityQueueParagraph';
import { getGridLayoutByProps } from '../index';
import mockData from './mockData.json';
import { LANDING_PAGE_TYPE_HOME } from '../../../../../../../../shared/constants/content';
import {
  LANDING_PAGE_BILANZ_HOME,
  LANDING_PAGE_TYPE_BILANZ,
  LANDING_PAGE_TYPE_SV,
  LANDING_PAGE_TYPE_SV_HOME,
} from '../../../../../screens/LandingPage/constants';
import {
  GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS,
  GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST,
  GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
  GRID_LAYOUT_ENTITY_QUEUE_HOME,
  GRID_LAYOUT_ENTITY_QUEUE_SV_HOME,
  GRID_LAYOUT_ENTITY_QUEUE_SWISS_INSURANCE,
} from '../../../../TeaserGrid/gridConfigs/constants';

/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
jest.mock('../../../../Logo');

beforeEach(() => {
  initialProps = { entityQueue: JSON.parse(JSON.stringify(mockData)) };
});

describe('[Component] Entity Queue Paragraph', () => {
  it.each([
    [
      {
        props: {
          isFirst: false,
          origin: LANDING_PAGE_TYPE_SV,
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_SWISS_INSURANCE,
      },
    ],
    [
      {
        props: {
          isFirst: true,
          origin: LANDING_PAGE_TYPE_SV_HOME,
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_SV_HOME,
      },
    ],
    [
      {
        props: {
          isFirst: false,
          origin: LANDING_PAGE_TYPE_SV_HOME,
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
      },
    ],
    [
      {
        props: {
          isFirst: true,
          origin: LANDING_PAGE_TYPE_SV,
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST,
      },
    ],
    [
      {
        props: {
          isFirst: true,
          origin: LANDING_PAGE_TYPE_BILANZ,
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS_FIRST,
      },
    ],
    [
      {
        props: {
          isFirst: false,
          origin: LANDING_PAGE_TYPE_BILANZ,
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_ADDITIONAL_PUBLICATIONS,
      },
    ],
    [
      {
        props: {
          isFirst: true,
          origin: LANDING_PAGE_TYPE_HOME,
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_HOME,
      },
    ],
    [
      {
        props: {
          isFirst: false,
          origin: LANDING_PAGE_TYPE_HOME,
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
      },
    ],
    [
      {
        props: {
          isFirst: false,
          origin: '',
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
      },
    ],
    [
      {
        props: {
          isFirst: true,
          origin: '',
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
      },
    ],
    [
      {
        props: {
          entityQueue: {},
          locationState: null,
        },
        expected: GRID_LAYOUT_ENTITY_QUEUE_DEFAULT,
      },
    ],
  ])('Should return the correct grid Layout %#', (testCase) => {
    expect(getGridLayoutByProps(testCase.props)).toEqual(testCase.expected);
  });

  it('Should return correct title of entityQueue', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const title = getTitleByProps(initialProps);
    expect(title).toBe('Digital Switzerland');
  });

  it('Should return entityQueue title if no landingPage exist', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entityQueue.landingPage.title = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const title = getTitleByProps(initialProps);
    expect(title).toBe('This is a great title.');
  });

  it('Should return null if no landingPage title and no entityQueue title exist', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entityQueue.landingPage.title = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entityQueue.title = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const title = getTitleByProps(initialProps);
    expect(title).toBeNull();
  });

  it('Should return bilanz Logo if preferredUri is /bilanz', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entityQueue.landingPage.preferredUri =
      LANDING_PAGE_BILANZ_HOME;
    // @ts-ignore
    const { queryByTestId, container } = render(getTitleByProps(initialProps));
    expect(queryByTestId('entity-queue-paragraph-title')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });

  it('Should return Logo if landingPage title is BILANZ', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.entityQueue.landingPage.title = 'BILANZ';
    // @ts-ignore
    const { queryByTestId, container } = render(getTitleByProps(initialProps));
    expect(queryByTestId('entity-queue-paragraph-title')).not.toBeNull();
    expect(container).toMatchSnapshot();
  });
});
