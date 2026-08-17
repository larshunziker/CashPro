import React from 'react';
import { render } from '@testing-library/react';
import ReduxProvider from '../../../../../../../shared/tests/components/ReduxProvider';
import Component from '../index';
import {
  INFO_BOX_STYLE_GUIDER,
  INFO_BOX_STYLE_GUIDER_NOTES,
  INFO_BOX_STYLE_GUIDER_PEARLS,
} from '../../../../../../../../common/components/Paragraphs/components/InfoBoxParagraph/constants';

jest.mock('../components/RechtsratgeberBox', () => {
  return () => {
    return null;
  };
});
jest.mock('../components/LeftLineBox', () => {
  return () => {
    return null;
  };
});

const testIds = [
  'infobox-paragraph-leftline-box-wrapper',
  'infobox-paragraph-leftline-box-wrapper',
  'infobox-paragraph-guider-box-wrapper',
  'infobox-paragraph-guider-box-wrapper',
  'infobox-paragraph-guider-box-wrapper',
  'infobox-paragraph-leftline-box-default-wrapper',
];

const initialProps = {
  infoboxParagraph: {
    infoBox: {
      body: null,
      style: '',
    },
  },
};

describe('[Paragraphs] InfoboxParagraph', () => {
  it('Should render nothing if there are no passed props', () => {
    const { queryByTestId } = render(<Component infoBoxParagraph={{}} />);

    testIds.forEach((id) => {
      expect(queryByTestId(id)).toBeNull();
    });
  });

  test.each([
    {
      style: INFO_BOX_STYLE_GUIDER,
      id: 'infobox-paragraph-guider-box-wrapper',
    },
    {
      style: INFO_BOX_STYLE_GUIDER_PEARLS,
      id: 'infobox-paragraph-guider-box-wrapper',
    },
    {
      style: INFO_BOX_STYLE_GUIDER_NOTES,
      id: 'infobox-paragraph-guider-box-wrapper',
    },
    {
      style: null,
      id: 'infobox-paragraph-collapsable-box-default-wrapper',
    },
  ])(
    'Should render properly component with correct style of infobox',
    (item) => {
      /* @ts-ignore TODO: TS2322 ->  Type 'string | null' is not assignable to type 'string'. */
      initialProps.infoboxParagraph.infoBox.style = item.style;
      /* @ts-ignore TODO: TS2322 ->  Type 'number[]' is not assignable to type 'null'. */
      initialProps.infoboxParagraph.infoBox.body = [1, 2, 3];

      // @ts-ignore
      const { queryByTestId } = render(
        <ReduxProvider initialState={{}}>
          <Component infoBoxParagraph={initialProps.infoboxParagraph} />
        </ReduxProvider>,
      );

      testIds.forEach((id) => {
        if (id === item.id) {
          expect(queryByTestId(id)).not.toBeNull();
        } else {
          expect(queryByTestId(id)).toBeNull();
        }
      });
    },
  );
});
