import React from 'react';
import { render } from '@testing-library/react';
import { routeInitialState } from '../../../../../shared/reducers/route';
import { settingsInitialState } from '../../../../../shared/reducers/settings';
import ReduxProvider from '../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import mockRecommendations from './mockData.json';
import { TEASER_LAYOUT_ML } from '../../../../../../shared/constants/teaser';

jest.mock('../../Teaser');
jest.mock('Link');

/* @ts-ignore TODO: TS7034 ->  Variable 'items' implicitly has type 'any' in some locations where its type cannot be determined. */
let items;

beforeAll(() => {
  jest.spyOn(console, 'error').mockImplementation(() => undefined);
});

beforeEach(() => {
  items = JSON.parse(JSON.stringify(mockRecommendations.recommendations.edges));
});

describe('[Components] Recommendations', () => {
  test('Should render no recommendations block', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <Component />
      </ReduxProvider>,
    );

    expect(queryByTestId('article-recommendations-container')).toBeNull();
  });

  test('Should render recommendations block', () => {
    const { queryByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <Component
          teaserLayout={TEASER_LAYOUT_ML}
          /* @ts-ignore TODO: TS7005 ->  Variable 'items' implicitly has an 'any' type. */
          items={items}
          settingsState={settingsInitialState}
        />
      </ReduxProvider>,
    );

    expect(queryByTestId('article-recommendations-container')).not.toBeNull();
  });

  test('Should render recommendations block with 2 items', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'items' implicitly has an 'any' type. */
    const modifiedItems = items.splice(0, 2);

    const { getAllByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <Component
          teaserLayout={TEASER_LAYOUT_ML}
          items={modifiedItems}
          settingsState={settingsInitialState}
        />
      </ReduxProvider>,
    );

    expect(getAllByTestId('article-recommendations-item')).toHaveLength(2);
  });

  test('Should render recommendations block with 4 items', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'items' implicitly has an 'any' type. */
    const modifiedItems = items.splice(0, 4);

    const { getAllByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <Component
          teaserLayout={TEASER_LAYOUT_ML}
          items={modifiedItems}
          settingsState={settingsInitialState}
        />
      </ReduxProvider>,
    );

    expect(getAllByTestId('article-recommendations-item')).toHaveLength(4);
  });

  test('Should render recommendations block with fallback header text', () => {
    const { getByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <Component
          /* @ts-ignore TODO: TS7005 ->  Variable 'items' implicitly has an 'any' type. */
          items={items}
          settingsState={settingsInitialState}
          title="Mehr für dich"
        />
      </ReduxProvider>,
    );

    // @ts-ignore
    expect(getByTestId('article-recommendations-header')).toHaveTextContent(
      'Mehr für dich',
    );
  });

  test('Should render recommendations block with custom header text', () => {
    const title = 'test header text to render';

    const { getByTestId } = render(
      <ReduxProvider state={routeInitialState}>
        <Component
          /* @ts-ignore TODO: TS7005 ->  Variable 'items' implicitly has an 'any' type. */
          items={items}
          title={title}
          settingsState={settingsInitialState}
        />
      </ReduxProvider>,
    );

    // @ts-ignore
    expect(getByTestId('article-recommendations-header')).toHaveTextContent(
      title,
    );
  });

  test('Should render with a custom link for the reco heading', () => {
    const customLink = '/home';
    const title = 'my custom title';

    const { getByTestId, findAllByText } = render(
      <ReduxProvider state={routeInitialState}>
        <Component
          /* @ts-ignore TODO: TS7005 ->  Variable 'items' implicitly has an 'any' type. */
          items={items}
          title={title}
          titleLinkPath={customLink}
          settingsState={settingsInitialState}
        />
      </ReduxProvider>,
    );

    expect(getByTestId('article-recommendations-container')).not.toBeNull();
    expect(findAllByText('empty-link')).not.toBeNull();
    expect(getByTestId('article-recommendations-header').innerHTML).toContain(
      title,
    );
  });

  test('Should not render with a custom link for the reco heading', () => {
    const title = 'my custom title';

    const { container } = render(
      <ReduxProvider state={routeInitialState}>
        <Component
          /* @ts-ignore TODO: TS7005 ->  Variable 'items' implicitly has an 'any' type. */
          items={items}
          title={title}
          settingsState={settingsInitialState}
        />
      </ReduxProvider>,
    );

    expect(container.innerHTML).not.toContain('TitleHover');
  });
});
