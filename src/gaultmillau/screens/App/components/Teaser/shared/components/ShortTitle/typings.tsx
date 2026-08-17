export type ShortTitleProps = {
  __typename: string;
  subtypeValue: string;
  title: string;
  preferredUri: string;
  shortTitle: string;
  authors?: AuthorConnection;
  organizationType?: OrganizationTypeEnum;
  organizationData?: Restaurant;
  restaurantType?: string;
  cityList?: string;
  sponsor?: Sponsor;
  channel?: Channel;
  teaserType?: string;
  wrapperStyle?: string;
  styles: any;
  origin?: string;
};
