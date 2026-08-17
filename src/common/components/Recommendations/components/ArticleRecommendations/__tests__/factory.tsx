import componentFactory from '../factory';

const TeaserGrid = () => null;
const gridConfig = () => null;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
const initialProps = {
  origin: 'landingpage',
  contentGcid: '123',
};

const componentFactoryOptions = {
  ensureTeaserInterface: () => null,
  TeaserGrid,
  gridConfig,
  gridConfigLayout: 'test-layout',
  styles: {
    Container: 'Container',
    Row: 'Row',
    TeaserList: 'TeaserList',
    Title: 'Title',
    TitleWrapper: 'TitleWrapper',
    Wrapper: 'Wrapper',
    SkeletonWrapper: 'SkeletonWrapper',
    SkeletonContentWrapper: 'SkeletonContentWrapper',
    SkeletonShortTitle: 'SkeletonShortTitle',
    SkeletonTitle: 'SkeletonTitle',
  },
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const appStyles = (props) => ({
  Container: 'Container Appstyles' + props.origin,
  Row: 'Row',
  TeaserList: 'TeaserList',
  Title: 'Title',
  TitleWrapper: 'TitleWrapper',
  Wrapper: 'Wrapper',
  SkeletonWrapper: 'SkeletonWrapper',
  SkeletonContentWrapper: 'SkeletonContentWrapper',
  SkeletonShortTitle: 'SkeletonShortTitle',
  SkeletonTitle: 'SkeletonTitle',
});

beforeEach(() => {
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] ArticleRecommendations Factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should return component from factory with appStyles', () => {
    componentFactoryOptions.styles = appStyles(initialProps);
    Component = componentFactory(componentFactoryOptions);
    expect(Component).not.toBeNull();
  });
});
