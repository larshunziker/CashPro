import { render } from '@testing-library/react';
import { renderAddress } from '../helpers';
import organizationData from './mockData.json';

jest.mock('Link');
jest.mock('Paragraphs');

describe('[Helpers] Recipe', () => {
  it('Should render address with all content correctly', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'Element | null' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstruc */
      renderAddress({ organization: organizationData }),
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render address nothing when the recipe is not associated with an organization', () => {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'Element | null' is not assignable to parameter of type 'ReactElement<any, string | JSXElementConstruc */
    const { container } = render(renderAddress({ organization: null }));
    expect(container).toMatchSnapshot();
  });
});
