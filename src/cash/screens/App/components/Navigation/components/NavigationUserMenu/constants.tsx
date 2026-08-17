import { tealiumTrackEvent } from '../../../../../../../shared/helpers/tealium';
import { getServiceUrl } from '../../../../../../../shared/helpers/serviceUrl';
import {
  ROUTE_ABO_SERVICES,
  ROUTE_ALERTS,
  ROUTE_BOOKMARKS,
  ROUTE_EMAIL_ALERTS,
  ROUTE_PORTFOLIO,
  ROUTE_WATCHLIST,
} from '../../../../constants';
import { UserCockpitMenuItem } from '../../../../../../../common/components/NavigationUserMenu/typings';

export const TYPE_NAVIGATION_USER_MENU_DEFAULT = 'navigation-user-menu/default';
export const TYPE_NAVIGATION_USER_MENU_MODAL = 'navigation-user-menu/modal';

export const links: Array<UserCockpitMenuItem> = [
  {
    name: 'Portfolio',
    link: `/${ROUTE_PORTFOLIO}`,
    iconType: 'IconPieChart',
    trackingClass: 'link-usercockpit-portfolio',
    onClick: () => {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'portfolio_open',
          event_category: 'portfolio',
          from: 'usercockpit/link',
        },
      });
    },
    isHiddenOnHybridApp: true,
  },
  {
    name: 'Watchlist',
    link: `/${ROUTE_WATCHLIST}`,
    iconType: 'IconEye',
    trackingClass: 'link-usercockpit-watchlist',
    onClick: () => {
      tealiumTrackEvent({
        type: 'link',
        payload: {
          event_name: 'watchlist_open',
          event_category: 'watchlist',
          from: 'usercockpit/link',
        },
      });
    },
    isHiddenOnHybridApp: true,
  },
  {
    name: 'Kurs-Alerts',
    link: `/${ROUTE_ALERTS}`,
    iconType: 'IconBell',
    trackingClass: 'link-usercockpit-alerts',
    isHiddenOnHybridApp: true,
  },
  {
    name: 'Später lesen',
    link: `/${ROUTE_BOOKMARKS}`,
    iconType: 'IconBookmark',
    trackingClass: 'link-usercockpit-mein-cash',
    isHiddenOnHybridApp: true,
  },
  {
    name: 'Abos und Services',
    link: `/${ROUTE_ABO_SERVICES}`,
    iconType: 'IconArrowsRotateCheck',
    trackingClass: 'link-usercockpit-abos-services',
  },
  {
    name: 'Profil bearbeiten',
    link: `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile?lang=de`,
    iconType: 'IconGear',
    trackingClass: 'link-usercockpit-profile',
  },
  {
    name: 'E-Mail-Alerts',
    link: `/${ROUTE_EMAIL_ALERTS}`,
    iconType: 'IconBell',
    trackingClass: 'link-usercockpit-alerts',
    isHiddenOnHybridApp: true,
  },
  {
    name: 'Newsletter',
    link: `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile/brand-profile?lang=de`,
    iconType: 'InboxFull',
    trackingClass: 'link-usercockpit-newsletter',
  },
];
