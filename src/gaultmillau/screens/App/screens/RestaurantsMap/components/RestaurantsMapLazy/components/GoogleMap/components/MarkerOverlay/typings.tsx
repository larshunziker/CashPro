import { RestaurantsCardProps } from '../../../RestaurantsPanel/components/RestaurantsCards/components/RestaurantsCard/typings';

export type MarkerOverlayProps = RestaurantsCardProps & {
  toggleActive: () => void;
};
