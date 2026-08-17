/* istanbul ignore file */

import rasHelmetFactory from '../../../../../common/components/Helmet/factory';
import locationStateSelector from '../../../../../shared/selectors/locationStateSelector';
import type { MetaTag } from '../../../../../common/components/Helmet/typings';

const additionalMetaData: Array<MetaTag> = [
  {
    property: 'og:url',
    content: '[url]',
  },
];

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
    content: '[field_short_title] [field_lead] | GaultMillau – Channel',
  },
  {
    name: 'twitter:image:src',
    content: '[field_heroimage]',
  },
  {
    name: 'twitter:description',
    content: '[field_short_title] [field_lead]',
  },
];

const RasHelmet = rasHelmetFactory({
  additionalMetaData,
  socialMetaTags,
  locationStateSelector,
});

export default RasHelmet;
