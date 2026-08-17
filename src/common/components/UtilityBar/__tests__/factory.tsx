import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import utilityBarFactory from '../factory';
import { authInitialState } from '../../../../shared/reducers/auth';
import ReduxProvider from '../../../../beobachter/shared/tests/components/ReduxProvider';
import {
  SVG_ICONS_TYPE_FACEBOOK,
  SVG_ICONS_TYPE_MAIL,
  SVG_ICONS_TYPE_PRINT,
  SVG_ICONS_TYPE_TWITTER,
  SVG_ICONS_TYPE_WHATSAPP,
} from '../../../../shared/constants/svgIcons';
import grid from '../../../../common/assets/styles/grid.legacy.css';
import { UtilityBarFactoryOptions, UtilityItemProps } from '../typings';

const UTILITY_ITEMS: Array<UtilityItemProps> = [
  {
    id: 'utility-bar/whatsapp',
    iconLabel: 'Whatsapp',
    iconType: SVG_ICONS_TYPE_WHATSAPP,
    url: 'whatsapp://send?text=[field_short_title]:[field_title] | Beobachter | [url]',
    referrer: 'wtmc%3Dsocialmedia.whatsapp.shared.web',
    addClass: grid.HiddenSmUp,
  },
  {
    id: 'utility-bar/facebook',
    iconLabel: 'Facebook',
    iconType: SVG_ICONS_TYPE_FACEBOOK,
    url: 'https://www.facebook.com/sharer/sharer.php?u=[url]',
    referrer: 'wtmc%3Dsocialmedia.facebook.shared.web',
  },
  {
    id: 'utility-bar/twitter',
    iconLabel: 'X',
    iconType: SVG_ICONS_TYPE_TWITTER,
    url:
      'https://twitter.com/share?url=[url]' +
      '&text=[field_social_media_title]&via=BeobachterRat',
    referrer: 'wtmc%3Dsocialmedia.twitter.shared.web',
    addClass: grid.HiddenSmDown,
  },
  {
    id: 'utility-bar/mail',
    iconLabel: 'E-Mail',
    iconType: SVG_ICONS_TYPE_MAIL,
    url:
      'mailto:?subject=Empfohlener%20Artikel%20von%20beobachter.ch&body=Guten%20Tag%2C%0A%0AIhnen%20' +
      'wurde%20dieser%20Artikel%20von%20beobachter.ch%20empfohlen%3A%0A%0A[url] - [field_short_title]',
  },
  {
    id: 'utility-bar/print',
    iconLabel: 'Print',
    iconType: SVG_ICONS_TYPE_PRINT,
    url: '#',
    onClick: () => print(),
    addClass: grid.HiddenSmDown,
  },
];

const initialState = {
  auth: authInitialState,
  piano: {
    pageMetadata: {
      publication: 'publication',
      isNativeContent: false,
      pathname: 'pathname',
      publicationDate: 'publicationDate',
      restrictionStatus: 'restrictionStatus',
      section: 'section',
      tags: ['string'],
      contentType: 'contentType',
      isPrintArticle: false,
      gcid: 'gcid',
    },
  },
};
/* @ts-ignore TODO: TS7034 ->  Variable 'Component' implicitly has type 'any' in some locations where its type cannot be determined. */
let Component = null;

// TODO: mock Utilitylink correct or import it from utilitytests when tests are done!
const UtilityLink = (): ReactElement => (
  <svg
    className="classWrapper"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 13 16"
  >
    <defs />
    <path d="M1.655928 1.655928v11.2428l4.47192-3.71088c.02232-.01584.05184-.01512.07344.00072l4.16376 3.66336v-11.196h-8.70912zm9.42048 13.79952l-4.59-3.98232c-.2052-.15408-.48744-.15696-.69696-.0072l-4.85568 3.98448c-.39096.27864-.93384 0-.93384-.48024V.590328c0-.32616.26424-.5904.5904-.5904h10.84032c.32616 0 .5904.26424.5904.5904v14.3928c0 .48672-.55512.76392-.94464.47232z" />
  </svg>
);

const commentInitialState: CommentState = {
  count: 0,
};

const headerInitialState: HeaderState = {
  articleData: {
    gcid: '1',
    title: 'Title',
    shortTitle: 'Short Title',
    lead: 'This is the lead text',
    subtypeValue: 'headless',
    channel: {
      title: 'Politic',
    },
    commentStatus: 'open',
    preferredUri: 'preferred/Uri',
    socialMediaTitle: 'tis is the social media Title',
  },
  contentType: 'Article',
  title: '',
  isSinglePage: false,
  noHeader: false,
  link: '',
  id: null,
};

const routeInitialState: LocationState = {
  locationBeforeTransitions: {
    pathname: '/home',
    search: '',
    hash: '',
    action: 'PUSH',
    key: 'b86ozif',
    query: {},
  },
  screenReady: true,
  // @ts-ignore
  isReferrerFullscreen: false,
};

const componentFactoryOptions: UtilityBarFactoryOptions = {
  UtilityLink,
  availableUtilities: UTILITY_ITEMS,
  headerStateSelector: () => headerInitialState,
  locationStateSelector: () => routeInitialState,
  commentStateSelector: () => commentInitialState,
  styles: {
    Wrapper: 'WrapperClassName',
  },
};

beforeEach(() => {
  Component = utilityBarFactory(componentFactoryOptions);
});

describe('[Component] UtilityBar', () => {
  it('Should return component from factory', () => {
    /* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */
    expect(Component).not.toBeNull();
  });

  it('Should not render UtilityBar because enabled utility is not available', () => {
    const { queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component enabledUtilities={['Xyz']} />
      </ReduxProvider>,
    );
    expect(queryByTestId('utility-bar-no-enabled-items')).not.toBeNull();
  });

  it('Should not render UtilityBar if there are no enabled utilities', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should not render UtilityBar if there is no array of utilities', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component enabledUtilities={'Facebook'} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should not render UtilityBar if array of enabled utilities is empty', () => {
    const { container } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component enabledUtilities={[]} />
      </ReduxProvider>,
    );
    expect(container.innerHTML).toBe('');
  });

  it('Should render UtilityBar correctly', () => {
    const { container, queryByTestId } = render(
      <ReduxProvider initialState={initialState}>
        {/* @ts-ignore TODO: TS7005 ->  Variable 'Component' implicitly has an 'any' type. */}
        <Component
          enabledUtilities={[
            'utility-bar/facebook',
            'utility-bar/twitter',
            'utility-bar/print',
          ]}
        />
      </ReduxProvider>,
    );

    expect(queryByTestId('utility-bar-no-enabled-items')).toBeNull();
    expect(container).toMatchSnapshot();
  });
});
