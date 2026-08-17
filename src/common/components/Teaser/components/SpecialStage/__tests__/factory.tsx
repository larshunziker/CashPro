import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'mockGraphQLData' implicitly has type 'any' in some locations where its type cannot be determined. */
let mockGraphQLData;
/* @ts-ignore TODO: TS7034 ->  Variable 'componentFactoryOptions' implicitly has type 'any' in some locations where its type cannot be determined. */
let componentFactoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;

beforeEach(() => {
  mockGraphQLData = JSON.parse(JSON.stringify(mockData));
  componentFactoryOptions = {
    teaserStage: { ...mockGraphQLData },
    publicationLogo: <div data-testid="specialstage-factory-publicationLogo" />,
    backgroundImage: <div data-testid="specialstage-factory-backgroundImage" />,
    mainSponsorImage: (
      <div data-testid="specialstage-factory-mainSponsorImage" />
    ),
    Img: () => <div data-testid="specialstage-factory-img" />,
    button: <div data-testid="specialstage-factory-button">Alle Stories</div>,
    styles: {
      SpecialLWrapper: 'SpecialLWrapperClassName',
      Container: 'ContainerClassName',
      ImageWrapper: 'ImageWrapperClassName',
      InnerWrapper: 'InnerWrapperClassName',
      ColumnLeft: 'ColumnLeftClassName',
      ColumnRight: 'ColumnRightClassName',
      PublicationLogo: 'PublicationLogoClassName',
      LandingPageLink: 'LandingPageLinkClassName',
      SpecialImage: 'SpecialImageClassName',
      ShortTitle: 'ShortTitleClassName',
      Title: 'TitleClassName',
      ReferenceArticleWrapper: 'ReferenceArticleWrapperClassName',
      ReferenceArticleLink: 'ReferenceArticleLinkClassName',
      ReferenceArticleShortTitle: 'ReferenceArticleShortTitleClassName',
      ReferenceArticleTitle: 'ReferenceArticleTitleClassName',
      MainSponsorLink: 'MainSponsorLinkClassName',
      MainSponsorImage: 'MainSponsorImageClassName',
      PartnersWrapper: 'PartnersWrapperClassName',
      PartnersRow: 'PartnersRowClassName',
      PartnersColumn: 'PartnersColumnClassName',
      PartnerItem: 'PartnerItemClassName',
    },
  };
  /* @ts-ignore TODO: TS2345 ->  Argument of type '{ teaserStage */
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] SpecialStage factory', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    const { container } = render(
      /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
      <MemoryRouter>{componentFactory(componentFactoryOptions)}</MemoryRouter>,
    );

    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if there is no shortTitle', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockGraphQLData' implicitly has an 'any' type. */
    mockGraphQLData.termReference.landingPage.shortTitle = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    const { container } = render(componentFactory(componentFactoryOptions));

    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if there is no title', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockGraphQLData' implicitly has an 'any' type. */
    mockGraphQLData.termReference.landingPage.title = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    const { container } = render(componentFactory(componentFactoryOptions));

    expect(container).toMatchSnapshot();
  });

  it('Should render nothing if there is no preferredUri', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'mockGraphQLData' implicitly has an 'any' type. */
    mockGraphQLData.termReference.landingPage.preferredUri = '';
    /* @ts-ignore TODO: TS7005 ->  Variable 'componentFactoryOptions' implicitly has an 'any' type. */
    const { container } = render(componentFactory(componentFactoryOptions));

    expect(container).toMatchSnapshot();
  });
});
