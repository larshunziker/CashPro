export const auth0Config = {
  client_id: __AUTH0_CLIENT_ID__,
  audience: 'https://api.onelog.ch/profile/v1',
  response_type: 'code',
  scope: 'fields openid email offline_access',
  redirect_uri: `${__AUTH_SERVICE_URL__}/login/`,
};
