import { getServiceUrl } from '../../../../../../../shared/helpers/serviceUrl';
import { UserCockpitMenuItem } from '../../../../../../../common/components/NavigationUserMenu/typings';

export const TYPE_NAVIGATION_USER_MENU_DEFAULT = 'navigation-user-menu/default';
export const TYPE_NAVIGATION_USER_MENU_MODAL = 'navigation-user-menu/modal';

export const links: UserCockpitMenuItem[] = [
  {
    name: 'Merkliste',
    link: '/profile/merkliste',
    iconType: 'IconBookmark',
    trackingClass: 'link-usercockpit-bookmarks',
  },
  {
    name: 'Newsletter',
    link: `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile/brand-profile?lang=de`,
    iconType: 'IconInboxFull',
    trackingClass: 'link-usercockpit-newsletter',
  },
  {
    name: 'E-Mail-Alerts',
    link: '/profile/alerts',
    iconType: 'IconEnvelope',
    trackingClass: 'link-usercockpit-email-alerts',
    isHiddenOnHybridApp: true,
  },
  {
    name: 'E-Paper',
    link: '/service/e-papers',
    iconType: 'IconNewspaper',
    trackingClass: 'link-usercockpit-epaper',
  },
  {
    name: 'Abos und Services',
    link: __AUTH0_SERVICES_URI__,
    iconType: 'IconServices',
    trackingClass: 'link-usercockpit-account',
  },
  {
    name: 'Profil bearbeiten',
    link: `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile?lang=de`,
    iconType: 'IconGear',
    trackingClass: 'link-usercockpit-profile',
  },
  {
    name: 'Profil löschen',
    link: `${getServiceUrl(__AUTH_SERVICE_URL__)}/profile/global.profile?lang=de`,
    iconType: 'IconTrash',
    trackingClass: 'link-usercockpit-profile-delete',
  },
];
