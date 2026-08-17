import getItemWrapper from '../getItemWrapper';

describe('[Component] Paragraphs - AdvantagesParagraph', () => {
  it('Should return styles for 3 items in one row', () => {
    const styles = getItemWrapper(3, 0);
    expect(styles).toMatchSnapshot();
  });

  it('Should return styles for 5 items 3 in first row and 2 in second', () => {
    const styles = getItemWrapper(5, 3);
    expect(styles).toMatchSnapshot();
  });

  it('Should return styles for 4 items 2 in each row', () => {
    const styles = getItemWrapper(4, 2);
    expect(styles).toMatchSnapshot();
  });
});
