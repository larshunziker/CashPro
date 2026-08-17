import { MINISTAGE_COMPONENT_NEWSLETTER } from '../../../../../../../../../../../shared/constants/paragraphs';
import { NEWSLETTER_TYPE_HANDELSZEITUNG } from '../../constants';

export const getStyleByType = (node: MinistageNewsletter): string => {
  if (node?.__typename === MINISTAGE_COMPONENT_NEWSLETTER) {
    switch (node.type) {
      case NEWSLETTER_TYPE_HANDELSZEITUNG:
        return 'IsHandelszeitungNewsletter';
      default:
        return '';
    }
  }
  return '';
};
