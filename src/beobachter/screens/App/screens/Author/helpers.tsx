import { getSanitizedPhoneNumber } from '../../../../../shared/helpers/utils';
import {
  SVG_ICONS_TYPE_FACEBOOK,
  SVG_ICONS_TYPE_INSTAGRAM,
  SVG_ICONS_TYPE_LINKEDIN,
  SVG_ICONS_TYPE_MAIL,
  SVG_ICONS_TYPE_PHONE,
  SVG_ICONS_TYPE_SIGNAL,
  SVG_ICONS_TYPE_THREEMA,
  SVG_ICONS_TYPE_TWITTER,
  SVG_ICONS_TYPE_WEBSITE,
  SVG_ICONS_TYPE_WHATSAPP,
  SVG_ICONS_TYPE_XING,
} from '../../../../../shared/constants/svgIcons';

type AuthorContactItem = {
  icon: string;
  path: string;
  label: string;
};

/* Contact List order:
  - E-Mail
  - Phone
  - WhatApp
  - Threema
  - Signal
  - X (Twitter)
  - Facebook
  - Instagram
  - LinkedIn
  - Xing
  - Website/Blog
 */

export const getContactsList = (author: Author): AuthorContactItem[] => {
  const list: Array<AuthorContactItem> = [];

  if (author?.email) {
    list.push({
      icon: SVG_ICONS_TYPE_MAIL,
      path: `mailto:${author.email}`,
      label: author.email,
    });
  }

  if (author?.phone) {
    list.push({
      icon: SVG_ICONS_TYPE_PHONE,
      path: `tel:${getSanitizedPhoneNumber(author.phone, ['+'])}`,
      label: author.phone,
    });
  }

  if (author?.whatsapp) {
    list.push({
      icon: SVG_ICONS_TYPE_WHATSAPP,
      path: `https://wa.me/${getSanitizedPhoneNumber(author.whatsapp)}`,
      label: 'WhatsApp',
    });
  }

  if (author?.threema) {
    list.push({
      icon: SVG_ICONS_TYPE_THREEMA,
      path: `https://threema.id/${author.threema}`,
      label: 'Threema',
    });
  }

  if (author?.signal) {
    list.push({
      icon: SVG_ICONS_TYPE_SIGNAL,
      path: `https://signal.me/#p/${getSanitizedPhoneNumber(author.signal, [
        '+',
      ])}`,
      label: 'Signal',
    });
  }

  if (author?.twitter?.path) {
    list.push({
      icon: SVG_ICONS_TYPE_TWITTER,
      path: author.twitter.path,
      label: 'X.com',
    });
  }

  if (author?.facebook?.path) {
    list.push({
      icon: SVG_ICONS_TYPE_FACEBOOK,
      path: author.facebook.path,
      label: 'Facebook',
    });
  }

  if (author?.instagram?.path) {
    list.push({
      icon: SVG_ICONS_TYPE_INSTAGRAM,
      path: author.instagram.path,
      label: 'Instagram',
    });
  }

  if (author?.linkedin?.path) {
    list.push({
      icon: SVG_ICONS_TYPE_LINKEDIN,
      path: author.linkedin.path,
      label: 'Linkedin',
    });
  }

  if (author?.xing?.path) {
    list.push({
      icon: SVG_ICONS_TYPE_XING,
      path: author.xing.path,
      label: 'Xing',
    });
  }

  if (author?.website?.path) {
    list.push({
      icon: SVG_ICONS_TYPE_WEBSITE,
      path: author.website.path,
      label: 'Website / Blog',
    });
  }

  return list;
};
