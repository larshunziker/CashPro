import React from 'react';
import classNames from 'classnames';
import shareLinkFactory from '../../../../../common/components/ShareLink/factory';
import Link from '../../../../../common/components/Link';
import Icon from '../Icon';
import {
  ICON_TYPE_MAIL,
  ICON_TYPE_PRINT,
  ICON_TYPE_WHATSAPP,
} from './constants';
// @ts-ignore
import icons from '../../assets/styles/gaultMillau.legacy.css';
import {
  ShareLinkFactoryOptionsStyles,
  ShareLinkProps,
} from '../../../../../common/components/ShareLink/typings';

type ShareLinkPropsInner = ShareLinkProps;

const getStylesByProps = ({
  addClass = '',
}: ShareLinkPropsInner): ShareLinkFactoryOptionsStyles => ({
  SharePanelItem: classNames({
    [addClass]: !!addClass,
  }),
});

const getTargetTypeByProps = ({
  iconType = '',
}: ShareLinkPropsInner): '_self' | '_blank' => {
  if (
    [ICON_TYPE_PRINT, ICON_TYPE_WHATSAPP, ICON_TYPE_MAIL].indexOf(iconType) !==
    -1
  ) {
    return '_self';
  } else {
    return '_blank';
  }
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'iconType' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'iconAddClass' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'children' implicitly has an 'any' type. */
const generateIconByProps = ({ iconType, iconAddClass, children }) => {
  if (!iconType || !iconAddClass) return null;
  return (
    <Icon iconsOverride={icons} type={iconType} addClass={iconAddClass}>
      {children}
    </Icon>
  );
};

const ShareLink = shareLinkFactory({
  getTargetTypeByProps,
  generateIconByProps,
  Link,
  styles: getStylesByProps,
});

export default ShareLink;
