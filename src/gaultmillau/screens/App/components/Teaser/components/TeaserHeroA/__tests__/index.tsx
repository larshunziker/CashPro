import { getStylesByProps } from '../index';

describe('[Component] Teaser - TeaserHeroA', () => {
  it('Should return the correct styles for TeaserHeroA', () => {
    //@ts-ignore
    const styles = getStylesByProps({ position: 'left' });
    expect(styles).toMatchSnapshot();
  });

  it('Should return the correct styles for TeaserHeroB', () => {
    //@ts-ignore
    const styles = getStylesByProps({ position: 'right' });
    expect(styles).toMatchSnapshot();
  });
});
