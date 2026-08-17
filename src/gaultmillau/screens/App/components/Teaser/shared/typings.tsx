import { TeaserFactoryProps } from '../../../../../../common/components/Teaser/typings';

/* We add the restaurant & organization props here, so  we don't have to add all of this 
to the factory */
export type TeaserProps = TeaserFactoryProps & {
  origin?: string;
  description?: string;
  organizationType?: OrganizationTypeEnum;
  organizationData?: Restaurant;
  restaurantType?: string;
  cityList?: string;
  teaserType?: string;
  secondaryName?: string;
  position?: string; // Used for TeaserHeroA to determine position of the image
};
