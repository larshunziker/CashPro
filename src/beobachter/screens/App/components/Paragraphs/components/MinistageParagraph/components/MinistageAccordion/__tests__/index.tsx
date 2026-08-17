import { getStylesByProps } from '../index';

describe('[Paragraphs] MinistageParagraph - MinistageAccordion', () => {
  it('Should render default styles', () => {
    // @ts-ignore
    const styles = getStylesByProps({
      origin: 'article',
    });
    expect(styles).toMatchSnapshot();
  });

  it('Should render headerContent styles', () => {
    // @ts-ignore
    const styles = getStylesByProps({
      headerContentType: 'headerContent',
      origin: 'article',
    });
    expect(styles).toMatchSnapshot();
  });

  it('Should render guide styles', () => {
    // @ts-ignore
    const styles = getStylesByProps({
      headerContentType: 'headerContent',
      origin: 'guide',
    });
    expect(styles).toMatchSnapshot();
  });

  it('Should render marketing page with reduced header styles', () => {
    // @ts-ignore
    const styles = getStylesByProps({
      headerContentType: 'headerContent',
      origin: 'marketing_page',
      colStyle: 'colStyleForMarketingPage',
    });
    expect(styles).toMatchSnapshot();
  });

  it('Should render marketing page with default header styles', () => {
    // @ts-ignore
    const styles = getStylesByProps({
      headerContentType: 'headerContent',
      origin: 'marketing_page_default_header',
      colStyle: 'colStyleForMarketingPage',
    });
    expect(styles).toMatchSnapshot();
  });
});
