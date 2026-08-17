import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import footerFactory from '../factory';
import mockData from './mockData.json';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

let factoryOptions;
/* @ts-ignore TODO: TS7034 ->  Variable 'initialProps' implicitly has type 'any' in some locations where its type cannot be determined. */
let initialProps;

beforeAll(() => {
  factoryOptions = {
    /* @ts-ignore TODO: TS7006 ->  Parameter 'link' implicitly has an 'any' type. */
    Logo: (link) => <a href={link}>Logo Mock</a>,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'type' implicitly has an 'any' type. */
    Icon: (type) => <div className={type}>Icon</div>,
    SocialMediaBar: () => <div>SocialMediaBar Mock</div>,
    FooterInner: () => <div>Footer Inner Mock</div>,
    styles: {
      Wrapper: 'WrapperClassName',
      FooterHeader: 'FooterHeaderClassName',
      LogoWrapper: 'LogoWrapperClassName',
      SocialMediaBarWrapper: 'SocialMediaBarWrapperClassName',
      PublicationSection: 'PublicationSectionClassName',
      PublicationCollapseHeader: 'PublicationCollapseHeaderClassName',
      PublicationCollapseHeaderCol: 'PublicationCollapseHeaderColClassName',
      Disclaimer: 'DisclaimerClassName',
      CollapseToggleWrapper: 'CollapseToggleWrapperClassName',
      PublicationToggle: 'PublicationToggleClassName',
      PublicationToggleIsOpen: 'PublicationToggleIsOpenClassName',
      PublicationCollapseBody: 'PublicationCollapseBodyClassName',
      PublicationCollapseBodyIsOpen: 'PublicationCollapseBodyIsOpenClassName',
      PublicationList: 'PublicationListClassName',
      Open: 'openClassName',
      /* @ts-ignore TODO: TS2345 ->  Argument of type '{ Logo */
      PlusIcon: 'PlusIconClassName',
      ListItem: 'ListItemClassName',
      Link: 'LinkClassName',
    },
  };

  Component = footerFactory(factoryOptions);
});

beforeEach(() => {
  initialProps = {
    footerPrimaryMenu: {},
    publicationsMenu: JSON.parse(JSON.stringify(mockData)),
  };
});

describe('[Common] Footer Factory', () => {
  it('Should return Component from Factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should render correctly', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('footer-wrapper')).not.toBeNull();
    expect(queryByTestId('footer-publications-menu')).not.toBeNull();
    expect(queryByTestId('footer-more-publications')).not.toBeNull();
  });

  it('Should not render publicationmenu', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    initialProps.publicationsMenu.links.edges = [];
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    expect(queryByTestId('footer-wrapper')).not.toBeNull();
    expect(queryByTestId('footer-publications-menu')).toBeNull();
  });

  it('Should not close publications button', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    /* @ts-ignore TODO: TS7005 ->  Variable 'initialProps' implicitly has an 'any' type. */
    const { queryByTestId } = render(<Component {...initialProps} />);

    const toggleButton = queryByTestId('footer-toggle-publications');
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'HTMLElement | null' is not assignable to parameter of type 'Window | Document | Node | Element'. */
    fireEvent.click(toggleButton);

    expect(queryByTestId('footer-wrapper')).not.toBeNull();
    expect(queryByTestId('footer-more-publications')).not.toBeNull();
  });
});
