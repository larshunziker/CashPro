import type { PushNotificationsConfig } from '../../common/components/OneSignalProvider/typings';

/**
 * Cash OneSignal Web Push configuration.
 * Category `tag` values must match tags configured in the OneSignal dashboard.
 */
export const pushNotificationConfig: PushNotificationsConfig = {
  categories: [
    { tag: 'cde-preference', label: 'Personalisiert für Sie' },
    { tag: 'top-news-preference', label: 'Top News' },
    { tag: 'boersen-ticker-preference', label: 'Börsen Ticker' },
    { tag: 'news-preference', label: 'Alle News' },
    { tag: 'insider-preference', label: 'Insider' },
    { tag: 'insider-briefing-preference', label: 'Insider Briefing' },
    { tag: 'invest-preference', label: 'Invest' },
  ],
  slidePromptOptions: {
    pageViews: __DOT_ENV__ === 'master' ? 3 : 0,
    timeDelay: __DOT_ENV__ === 'master' ? 120 : 10,
  },
  welcomeNotification: {
    title: 'Schön, dass Sie uns folgen!',
    message:
      'Vielen Dank für Ihr Abonnement — bleiben Sie auf dem Laufenden für Updates.',
  },
  bell: {
    tipStateUnsubscribed: 'Push-Benachrichtigungen abonnieren',
    tipStateSubscribed: 'Push-Benachrichtigungen abbestellen',
    dialogMainTitle: 'Push Benachrichtigungen',
    dialogMainButtonSubscribe: 'Abonnieren',
    dialogMainButtonUnsubscribe: 'Abbestellen',
  },
  prompt: {
    actionMessage:
      'Erhalten Sie Push-Benachrichtigungen für die neusten News und Updates.',
    acceptButton: 'Abonnieren',
    cancelButton: 'Abbrechen',
  },

  notifyBellEnabled: true,
  autoPromptSlidedown: true,
  enablePageTagSync: true,
};
