import { render } from '@testing-library/react';
import { getLinkButtonByProps, getStyleByProps } from '../index';
import mockData from './mockData.json';

const initialProps = JSON.parse(JSON.stringify(mockData));

describe('[Component] TeaserMagazineIssue', () => {
  it('Should generate special offer stylesByProps correctly', () => {
    const styles = getStyleByProps({ ...initialProps });
    expect(styles).toMatchSnapshot();
  });

  it('Should generate stylesByProps correctly', () => {
    initialProps.issue.magazine.isSpecialOffer = false;
    const styles = getStyleByProps({ ...initialProps });
    expect(styles).toMatchSnapshot();
  });

  it('Should render LinkButton', () => {
    const { queryByTestId } = render(getLinkButtonByProps({ ...initialProps }));
    expect(
      queryByTestId('TeaserMagazineIssue-LinkButton-Wrapper'),
    ).not.toBeNull();
  });
});
