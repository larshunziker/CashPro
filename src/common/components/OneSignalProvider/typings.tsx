export type PushNotificationCategory = {
  tag: string;
  label: string;
};

export type PushNotificationsConfig = {
  categories?: PushNotificationCategory[];
  slidePromptOptions: {
    pageViews: number;
    timeDelay: number;
  };
  welcomeNotification: {
    title: string;
    message: string;
  };
  bell?: {
    tipStateUnsubscribed: string;
    tipStateSubscribed: string;
    dialogMainTitle: string;
    dialogMainButtonSubscribe: string;
    dialogMainButtonUnsubscribe: string;
  };
  prompt: {
    actionMessage: string;
    acceptButton: string;
    cancelButton: string;
  };
  notifyBellEnabled?: boolean;
  autoPromptSlidedown?: boolean;
  enablePageTagSync?: boolean;
  subscribeTags?: Record<string, string>;
};

export type OneSignalProviderProps = {
  config?: PushNotificationsConfig | null;
};

export type PushState = {
  isPushNotificationsSupported: boolean;
  isPushNotificationsEnabled: boolean;
  notificationsPermission: 'default' | 'granted' | 'denied';
};
