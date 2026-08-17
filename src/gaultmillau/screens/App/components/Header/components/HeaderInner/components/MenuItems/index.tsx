import React, { memo } from 'react';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../Icon';
import {
  MAP_URL_DE,
  MAP_URL_FR,
  NEWSLETTER_URL_DE,
  NEWSLETTER_URL_FR,
  SHOP_URL_DE,
  SHOP_URL_FR,
} from '../../constants';
import styles from './styles.legacy.css';

const NewsletterLinkComponent = ({
  language = 'de',
  isActive = false,
  isRight = true,
  addClass = '',
}) => (
  <Link
    path={`${language === 'fr' ? NEWSLETTER_URL_FR : NEWSLETTER_URL_DE}`}
    label="Newsletter"
    className={classNames(styles.ActionLink, {
      [styles.ActiveLink]: isActive,
      [styles.ActionLinkRight]: isRight,
      [addClass]: !!addClass,
    })}
  />
);

const ShopLinkComponent = ({ language = 'de', isRight = true }) => (
  <Link
    path={`${language === 'fr' ? SHOP_URL_FR : SHOP_URL_DE}`}
    className={classNames(styles.ActionLink, {
      [styles.ActionLinkRight]: isRight,
    })}
    label="Shop"
  />
);

const MapLinkComponent = ({
  language = 'de',
  isActive = false,
  isRight = true,
  addClass = '',
}) => (
  <Link
    path={`${language === 'fr' ? MAP_URL_FR : MAP_URL_DE}?aroundme=true`}
    className={classNames(styles.ActionLink, {
      [styles.ActiveLink]: isActive,
      [styles.ActionLinkRight]: isRight,
      [addClass]: !!addClass,
    })}
  >
    <FormattedMessage
      id="app.header.map"
      description="The link to the map of restaurants"
      defaultMessage="Map"
    />
  </Link>
);

const SearchLinkComponent = ({
  visibleSearch = false,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'handleSearchToggle' implicitly has an 'any' type. */
  handleSearchToggle,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'intl' implicitly has an 'any' type. */
  intl,
  /* @ts-ignore TODO: TS7031 ->  Binding element 'headerInnerMsgs' implicitly has an 'any' type. */
  headerInnerMsgs,
  isRight = false,
  addClass = '',
}) => (
  <a
    href="#toggleSearchAction"
    className={classNames(styles.ActionLink, {
      [styles.ActiveLink]: visibleSearch,
      [styles.ActionLinkRight]: isRight,
      [addClass]: !!addClass,
    })}
    onClick={(event) => handleSearchToggle(event)}
  >
    {intl.formatMessage(headerInnerMsgs?.searchPlaceholder)}
  </a>
);

/* @ts-ignore TODO: TS7031 ->  Binding element 'handleNavigationToggle' implicitly has an 'any' type. */
const CloseLinkComponent = ({ handleNavigationToggle }) => (
  <button
    className={classNames('menu-action-link-close', styles.CloseButton)}
    onClick={(event) => handleNavigationToggle(event)}
    aria-label="Menu schliessen"
  >
    <Icon type="IconXMark" />
  </button>
);

/* @ts-ignore TODO: TS7031 ->  Binding element 'handleNavigationToggle' implicitly has an 'any' type. */
const MenuLinkComponent = ({ handleNavigationToggle }) => (
  <a
    href="#toggleMenuAction"
    className={classNames('menu-action-link-open', styles.ActionLink)}
    onClick={(event) => handleNavigationToggle(event)}
    aria-label="Menu togglen"
  >
    <FormattedMessage
      id="app.header.menu"
      description="The default title of the header menu"
      defaultMessage="Menu"
    />
  </a>
);

export const MenuLink = memo(MenuLinkComponent);
export const CloseLink = memo(CloseLinkComponent);
export const NewsletterLink = memo(NewsletterLinkComponent);
export const ShopLink = memo(ShopLinkComponent);
export const MapLink = memo(MapLinkComponent);
export const SearchLink = memo(SearchLinkComponent);
