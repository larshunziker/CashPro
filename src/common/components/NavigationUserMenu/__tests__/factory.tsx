/**
 * @file   Navigation User Menu factory tests
 */

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { render } from '@testing-library/react';
import componentFactory from '../factory';
import {
  NavigationUserMenuFactoryOptions,
  UserCockpitMenuItem,
} from '../typings';

/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component;
let componentFactoryOptions: NavigationUserMenuFactoryOptions;
const initialState: any = {
  auth: {
    familyName: 'Test',
    givenName: 'Tester',
    email: 'Test@test.ch',
    username: 'Testusername',
  },
  navigation: {
    visible: true,
  },
};

const initialProps: any = {
  authState: {
    familyName: 'Test',
    givenName: 'Tester',
    email: 'Test@test.ch',
    username: 'Testusername',
  },
};

const links: Array<UserCockpitMenuItem> = [
  {
    name: 'Newsletter',
    link: 'link',
    iconType: 'IconEnvelope',
    trackingClass: 'link-usercockpit-newsletter',
  },
];

const renderComponent = (testState = initialState) => {
  const store = createStore((state) => state, testState);

  return render(
    <Provider store={store}>
      {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
      <Component {...initialProps} />
    </Provider>,
  );
};

const menuItemWithLink = ({ link, name }: UserCockpitMenuItem) => (
  <a href={link}>{name}</a>
);

beforeEach(() => {
  componentFactoryOptions = {
    Icon: () => null,
    MenuHeaderLogo: () => <div>Header</div>,
    MenuItem: () => <div>MenuItem</div>,
    closeNavigation: () => () => undefined,
    links: links,
    styles: {
      Wrapper: 'WrapperClass',
      MenuHeader: 'MenuHeaderClass',
      MenuHeaderContent: 'MenuHeaderContentClass',
      MenuBodyWrapper: 'MenuBodyWrapperClass',
      UserInformationWrapper: 'UserInformationWrapperClass',
      UserName: 'UserNameClass',
      UserCredentials: 'UserCredentialsClass',
      MenuWrapper: 'MenuWrapperClass',
      Container: 'ContainerClass',
      MenuListWrapper: 'MenuListWrapperClass',
      MenuItem: 'MenuItemClass',
      CloseButton: 'CloseButtonClass',
      CloseIcon: 'CloseIconClass',
    },
  };
  Component = componentFactory(componentFactoryOptions);
});

describe('[Component] NavigationUserMenu', () => {
  it('Should render correctly', () => {
    const { container } = renderComponent();
    expect(container).toMatchSnapshot();
  });

  it('Should not render if there are no links', () => {
    componentFactoryOptions.links = [];
    Component = componentFactory(componentFactoryOptions);

    const { container } = renderComponent();
    expect(container.innerHTML).toBe('');
  });

  it('Should add hybrid profile query params and preserve existing params', () => {
    componentFactoryOptions.MenuItem = menuItemWithLink;
    componentFactoryOptions.links = [
      {
        name: 'Profil bearbeiten',
        link: 'https://auth.example.ch/profile?lang=de&foo=bar',
        iconType: 'IconGear',
        trackingClass: 'link-usercockpit-profile',
      },
    ];
    Component = componentFactory(componentFactoryOptions);

    const { getByText } = renderComponent({
      ...initialState,
      route: {
        isHybridApp: true,
      },
    });

    const url = new URL(
      getByText('Profil bearbeiten').getAttribute('href') || '',
    );

    expect(url.searchParams.get('lang')).toBe('de');
    expect(url.searchParams.get('foo')).toBe('bar');
    expect(url.searchParams.get('headless')).toBe('false');
    expect(url.searchParams.get('origin')).toBe('app');
  });

  it('Should overwrite existing origin for hybrid profile links', () => {
    componentFactoryOptions.MenuItem = menuItemWithLink;
    componentFactoryOptions.links = [
      {
        name: 'Profil bearbeiten',
        link: 'https://auth.example.ch/profile?lang=de&origin=web',
        iconType: 'IconGear',
        trackingClass: 'link-usercockpit-profile',
      },
    ];
    Component = componentFactory(componentFactoryOptions);

    const { getByText } = renderComponent({
      ...initialState,
      route: {
        isHybridApp: true,
      },
    });

    const url = new URL(
      getByText('Profil bearbeiten').getAttribute('href') || '',
    );

    expect(url.searchParams.get('origin')).toBe('app');
  });

  it('Should keep non-hybrid profile links unchanged', () => {
    const profileLink = 'https://auth.example.ch/profile?lang=de&foo=bar';

    componentFactoryOptions.MenuItem = menuItemWithLink;
    componentFactoryOptions.links = [
      {
        name: 'Profil bearbeiten',
        link: profileLink,
        iconType: 'IconGear',
        trackingClass: 'link-usercockpit-profile',
      },
    ];
    Component = componentFactory(componentFactoryOptions);

    const { getByText } = renderComponent();

    expect(getByText('Profil bearbeiten').getAttribute('href')).toBe(
      profileLink,
    );
  });
});
