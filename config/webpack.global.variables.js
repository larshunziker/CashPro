/**
 * @file   global webpack variables
 * @author Roman Zanettin <roman.zanettin@ringieraxelspringer.ch>
 * @date   2019-09-25
 */

module.exports = {
  __APP__: JSON.stringify(process.env.APP),
  __DOT_ENV__: JSON.stringify(process.env.DOT_ENV),
  __AD_PUBLISHER__: JSON.stringify(process.env.AD_PUBLISHER),
  __USE_RASCH_AUTH_SERVICE__: process.env.USE_RASCH_AUTH_SERVICE,
  __AUTH0_CLIENT_ID__: JSON.stringify(process.env.AUTH0_CLIENT_ID),
  __AUTH_SERVICE_URL__: JSON.stringify(process.env.AUTH_SERVICE_URL),

  __AUTH0_SERVICES_URI__: JSON.stringify(process.env.AUTH0_SERVICES_URI),
  __AUTH_LOGIN_OFFLINE_ENABLED__: process.env.AUTH_LOGIN_OFFLINE_ENABLED,

  __ALERTS_SERVICE_ENDPOINT__: JSON.stringify(
    process.env.ALERTS_SERVICE_ENDPOINT,
  ),
  __BOOKMARKS_SERVICE_ENDPOINT__: JSON.stringify(
    process.env.BOOKMARKS_SERVICE_ENDPOINT,
  ),
  __RECOS_ENDPOINT__: JSON.stringify(process.env.RECOS_ENDPOINT),
  __COMMERCE_SERVICE_ENDPOINT__: JSON.stringify(
    process.env.COMMERCE_SERVICE_ENDPOINT,
  ),
  __LEGAL_ADVICE_SEARCH_ENDPOINT__: JSON.stringify(
    process.env.LEGAL_ADVICE_SEARCH_ENDPOINT,
  ),
  __ATTACHMENTS_ENDPOINT__: JSON.stringify(process.env.ATTACHMENTS_ENDPOINT),
  __WEBFORM_FILES_SERVICE_ENDPOINT__: JSON.stringify(
    process.env.WEBFORM_FILES_SERVICE_ENDPOINT,
  ),
  __SAP_SERVICE_ENDPOINT__: JSON.stringify(process.env.SAP_SERVICE_ENDPOINT),
  __FI_BOX_SERVICE_ENDPOINT__: JSON.stringify(
    process.env.FI_BOX_SERVICE_ENDPOINT,
  ),
  __DATATRANS_ENDPOINT__: JSON.stringify(process.env.DATATRANS_ENDPOINT),
  __MEDIA_ASSETS_HOST__: JSON.stringify(process.env.MEDIA_ASSETS_HOST),
  __PIANO_ALERT_ID__: JSON.stringify(process.env.PIANO_ALERT_ID),
  __PIANO_AID__: JSON.stringify(process.env.PIANO_AID),
  __PIANO_LOGIN_CASE__: JSON.stringify(process.env.PIANO_LOGIN_CASE),
  __PIANO_LOGIN_CASE_FULLNAME_REQUIRED__: JSON.stringify(
    process.env.PIANO_LOGIN_CASE_FULLNAME_REQUIRED,
  ),
  __PIANO_ENDPOINT__: JSON.stringify(process.env.PIANO_ENDPOINT),
  __PIANO_ENV__: JSON.stringify(process.env.DOT_ENV),
  __PIANO_FORCE_DISABLE__: JSON.stringify(process.env.PIANO_FORCE_DISABLE),
  __FORCE_PREVIEW_REQUESTS__: process.env.FORCE_PREVIEW_REQUESTS || false,
  __SOVENDUS_API_URL__: JSON.stringify(process.env.SOVENDUS_API_URL),
  __PIANO_API_TOKEN__: JSON.stringify(process.env.PIANO_API_TOKEN),
  __PIANO_CXENSE_ID__: JSON.stringify(process.env.PIANO_CXENSE_ID),
  __PIANO_AD_FREE_RESOURCES__: JSON.stringify(
    process.env.PIANO_AD_FREE_RESOURCES,
  ),
  __PIANO_SERVICE_ENDPOINT__: JSON.stringify(
    process.env.PIANO_SERVICE_ENDPOINT,
  ),
  __SOVENDUS_API_KEY__: JSON.stringify(process.env.SOVENDUS_API_KEY),
  __SOVENDUS_EXTERNAL_ID__: JSON.stringify(process.env.SOVENDUS_EXTERNAL_ID),
  __TEALIUM_ACCOUNT__: JSON.stringify(process.env.TEALIUM_ACCOUNT),
  __TEALIUM_PROFILE__: JSON.stringify(process.env.TEALIUM_PROFILE),
  __TEALIUM_ENV__: JSON.stringify(process.env.TEALIUM_ENV),
  __GA_SID__: JSON.stringify(process.env.GA_SID),
  __USE_STRICT_MODE__: process.env.USE_STRICT_MODE || false,
  __USE_DEBUG_TRACING__:
    (process.env.USE_DEBUG_TRACING === 'true' &&
      (process.env.DOT_ENV === 'develop' ||
        process.env.DOT_ENV === 'local' ||
        process.env.DOT_ENV === 'stage')) ||
    false,
  __ONESIGNAL_APP_ID__: JSON.stringify(process.env.ONESIGNAL_APP_ID) || false,
  __DEV_ONESIGNAL_APP_ID__:
    JSON.stringify(process.env.DEV_ONESIGNAL_APP_ID) || false,
  // OneSignal Web Push killswitch. Coerced to a boolean so DefinePlugin emits
  // the literal `true`/`false` keyword. Anything other than the string
  // `"true"` (including unset) disables Web Push initialization.
  __WEB_PUSH_ENABLED__: process.env.WEB_PUSH_ENABLED === 'true',
  __RINGIER_CONNECT_ENABLED__: process.env.RINGIER_CONNECT_ENABLED || true,
  __USE_LOCAL_ESI_PROCESSING__: process.env.USE_LOCAL_ESI_PROCESSING || false,
  __DATADOG_CLIENT_TOKEN__: JSON.stringify(process.env.DATADOG_CLIENT_TOKEN),
  __DATADOG_APP_ID__: JSON.stringify(process.env.DATADOG_APP_ID),
  __DATADOG_SERVICE_NAME__: JSON.stringify(process.env.DATADOG_SERVICE_NAME),
  __DATADOG_ENV__: JSON.stringify(process.env.DATADOG_ENV),
  __DATADOG_SAMPLE_RATE__: JSON.stringify(process.env.DATADOG_SAMPLE_RATE),
  __DATADOG_APP_VERSION__: JSON.stringify(process.env.__DATADOG_APP_VERSION__),
  __WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_ID__: JSON.stringify(
    process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_ID,
  ),
  __WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_URL__: JSON.stringify(
    process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_PLAY_URL,
  ),
  __WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID__: JSON.stringify(
    process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_ID,
  ),
  __WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_URL__: JSON.stringify(
    process.env.WEB_APP_MANIFEST_RELATED_APPLICATION_ITUNES_URL,
  ),
  __HYBRID_APP_URL__: JSON.stringify(process.env.HYBRID_APP_URL),
  __ONE_TRUST_ID__: JSON.stringify(process.env.ONE_TRUST_ID),
  __BUILD_DATE_TIME__: JSON.stringify(new Date().toUTCString()),
  __GRAPHQL_HOST_LOADER__: JSON.stringify(process.env.GRAPHQL_HOST_LOADER),
  __FEATURES__: JSON.stringify(process.env.FEATURES),
  __VIAFOURA_DATE__: JSON.stringify(process.env.VIAFOURA_DATE),
  __GTM_AUTH__: JSON.stringify(process.env.GTM_AUTH),
  __GTM_PREVIEW__: JSON.stringify(process.env.GTM_PREVIEW),
  __ENABLE_GOOGLE_NEWS_SHOWCASE__: process.env.ENABLE_GOOGLE_NEWS_SHOWCASE,
  __ENABLE_GROWTHBOOK__: process.env.ENABLE_GROWTHBOOK,
  __GROWTHBOOK_API_HOST__: JSON.stringify(process.env.GROWTHBOOK_API_HOST),
  __GROWTHBOOK_CLIENT_KEY__: JSON.stringify(process.env.GROWTHBOOK_CLIENT_KEY),
  __FR_HOME_NODE_ID__: JSON.stringify(process.env.FR_HOME_NODE_ID),
  __CENTINEL_ANALYTICA_SITE_KEY__: JSON.stringify(
    process.env.CENTINEL_ANALYTICA_SITE_KEY,
  ),
};
