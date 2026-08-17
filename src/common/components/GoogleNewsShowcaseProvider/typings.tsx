import { HelmetComponent } from '../Helmet/typings';

export type GoogleNewsShowcaseFactoryProps = {
  Helmet: HelmetComponent;
};

export type UserState = {
  id?: string | null;
  registrationTimestamp?: number | null;
  subscriptionTimestamp?: number | null;
  granted?: boolean;
  grantReason?: string;
};
