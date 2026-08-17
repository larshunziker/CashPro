import React from 'react';
import { render } from '@testing-library/react';
import teaserMagazineIssueFactory from '../factory';
import { routeInitialState } from '../../../../../../beobachter/shared/reducers/route';
import { windowInitialState } from '../../../../../../shared/reducers/window';
import ReduxProvider from '../../../../../../beobachter/shared/tests/components/ReduxProvider';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
/* @ts-ignore TODO: TS7034 ->  Variable 'componentFactoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
let componentFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;
const initialState = {
  window: windowInitialState,
  route: {
    ...routeInitialState,
    clientUrl: 'https://develop.publication.ch',
  },
};

jest.mock('Link');
jest.mock('../../../../Picture');

beforeEach(() => {
  componentFactoryOptions = {
    /* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7031 ->  Binding element 'link' implicitly has an 'any' type. */
    CTAButton: ({ children, link }) => <a href={link.path}>{children}</a>,
    articleBoxFallbackText: 'This is the articleBoxFallbackText',
    /* @ts-ignore TODO: TS2345 ->  Argument of type '{ CTAButton */
    badgeTopPosition: (height: number) => height + 70,
    styles: {
      Wrapper: 'WrapperClassName',
      ImageContentWrapper: 'ImageContentWrapperClassName',
      ImageWrapper: 'ImageWrapperClassName',
      Image: 'ImageClassName',
      SpecialOfferWrapper: 'SpecialOfferWrapperClassName',
      SpecialOfferText: 'SpecialOfferTextClassName',
      ContentWrapper: 'ContentWrapperClassName',
      IssuePublishedText: 'IssuePublishedTextClassName',
      IssueLink: 'IssueLinkClassName',
      MagazineText: 'MagazineTextClassName',
      CTAWrapper: 'CTAWrapperClassName',
      CTAWrapperDesktop: 'CTAWrapperDesktopClassName',
      SkeletonButton: 'SkeletonButtonClassName',
      SkeletonTitle: 'SkeletonTitleClassName',
      SkeletonIssuePublished: 'SkeletonIssuePublishedClassName',
    },
  };

  Component = teaserMagazineIssueFactory(componentFactoryOptions);
  initialProps = {
    issue: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Component] Teaser Magazine Issue', () => {
  it('Should render nothing when there are no props', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render skeleton when loading', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component isLoading={true} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render skeleton when loading even if there is issue data', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component isLoading={true} {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render skeleton when loading with CTA button in outerWrapper', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    componentFactoryOptions.isOuterCTAWrapperShown = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = teaserMagazineIssueFactory(componentFactoryOptions);

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS2741 ->  Property 'issue' is missing in type '{ isLoading */}
        <Component isLoading={true} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render correctly when there is a complete issue loaded', () => {
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component isLoading={false} {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
    expect(
      queryByTestId('teaser-magazine-issue_issue-title-without-link'),
    ).toBeNull();
  });

  it('Should render correctly with CTA button in outerWrapper', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    componentFactoryOptions.isOuterCTAWrapperShown = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    Component = teaserMagazineIssueFactory(componentFactoryOptions);

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component isLoading={false} {...initialProps} />
      </ReduxProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Should render articleFallbacktext when there is no articleboxtext set in the magazine', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.issue.magazine.articleBoxText;

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
      queryByTestId('teaser-magazine-issue_articleboxtext').innerHTML,
      /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    ).toBe(componentFactoryOptions.articleBoxFallbackText);
  });

  it('Should not render CTA button and special offer badge if there is no link to the shop', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.issue.magazine.link.path;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should not render special offer badge if it is not a special offer', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.issue.magazine.isSpecialOffer = false;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should not render specialOffer badge if there is no specialOffer text', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.issue.magazine.isSpecialOffer = true;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.issue.magazine.specialOfferText = '';

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render issue title as normal text if there is no link path', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.issue.link.path = '';

    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(
      queryByTestId('teaser-magazine-issue_issue-title-without-link'),
    ).toMatchSnapshot();
  });

  it('Should render fallbacks', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.issue.image.file.alt;
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    delete initialProps.issue.magazine.link.label;

    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        {/* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */}
        <Component {...initialProps} />
      </ReduxProvider>,
    );

    expect(container).toMatchSnapshot();
  });
});
