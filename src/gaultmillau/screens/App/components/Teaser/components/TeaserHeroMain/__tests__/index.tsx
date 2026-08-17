import { render } from '@testing-library/react';
import { getInnerContentByProps } from '../index';

describe('[Component] Teaser - TeaserHeroMain', () => {
  test.each`
    description
    ${null}
    ${''}
    ${'<div>Fish is great</div>'}
    ${'Fish is great'}
  `(
    'Should render InnerContent correctly when description $description is set',
    ({ description }) => {
      //@ts-ignore
      const { container } = render(getInnerContentByProps({ description }));
      expect(container).toMatchSnapshot();
    },
  );
});
