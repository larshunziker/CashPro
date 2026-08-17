/* istanbul ignore file */
// sonar-disable

import rasHelmetFactory from '../../../../../common/components/Helmet/factory';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import { MetaTag } from '../../../../../common/components/Helmet/typings';

const additionalMetaData: Array<MetaTag> = [
  {
    property: 'og:url',
    content: '[url]',
  },
];

if (__WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID__) {
  additionalMetaData.push({
    name: 'apple-itunes-app',
    content: `app-id=${__WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID__}, app-argument=${__HYBRID_APP_URL__}[path]`,
  });
}

const socialMetaTags: Array<MetaTag> = [
  {
    property: 'og:description',
    content: '[field_short_description]',
  },
  {
    property: 'og:image',
    content: '[field_heroimage]',
  },
  {
    property: 'og:image:secure_url',
    content: '[field_heroimage]',
  },
  {
    property: 'og:title',
    content: '[field_short_title]',
  },
  {
    name: 'twitter:title',
    content: '[field_short_title]',
  },
  {
    name: 'twitter:image:src',
    content: '[field_heroimage]',
  },
  {
    name: 'twitter:description',
    content: '[field_short_description]',
  },
];

const RasHelmet = rasHelmetFactory({
  additionalMetaData,
  socialMetaTags,
  locationStateSelector,
});

export default RasHelmet;
