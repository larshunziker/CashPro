export type RestaurantsCardProps = {
  address: string;
  city: string;
  email: string;
  id: string;
  imgUrl: string;
  imgAlt?: string;
  name: string;
  secondaryName: string;
  distance: number;
  path: string;
  rating: number;
  tel: string;
  zip: string;
  category?: string;
  setActive: () => void;
};
