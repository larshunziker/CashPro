import { RestaurantsCardProps } from '../../../RestaurantsPanel/components/RestaurantsCards/components/RestaurantsCard/typings';

export type MarkerProps = {
  overlayData: RestaurantsCardProps;
  isActive: boolean;
  toggleActive: () => void;
  lat?: number;
  lng?: number;
};
