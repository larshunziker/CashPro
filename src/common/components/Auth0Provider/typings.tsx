import { ComponentType } from 'react';

export type LoginCase =
  | 'general'
  | 'commenting'
  | 'custom-scrollto-anchor'
  | 'email_only'
  | 'lean_registration'
  | 'shop'
  | 'webform_gp_mandatory'
  | 'webform_gp_optional'
  | 'google_login';

export type AuthorizeOptions = {
  login_case?: LoginCase;
  source?: string;
  appState?: string;
  redirect_uri?: string;
  ext_tracking_consent?: boolean;
};

// only used of the Auth0Provder switch atm
export type Auth0ProviderInterface = ComponentType & {
  _hasUsername: boolean;
  _isAuthenticated: boolean;
  tokenRenewalTimeout: NodeJS.Timeout;
  hasUsername: () => boolean;
  isAuthenticated: () => boolean;
  login: (loginCase: LoginCase, source?: string) => void;
  logout: () => void;
};
