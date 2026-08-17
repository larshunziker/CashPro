import { ComponentType, useCallback, useEffect } from 'react';
import { RASCH_CUSTOM_EVENT_PREFIX } from '../../../../../common/components/PianoProvider';

export const PianoHideElementProvider: ComponentType = () => {
  const handleHideElement = useCallback(
    (
      event: CustomEvent<{
        eventName?: string;
        params?: { toggle?: string };
      }>,
    ) => {
      if (
        event.detail.eventName === 'showToggle' &&
        event.detail.params?.toggle
      ) {
        const toggle =
          'pianohide' +
          event.detail.params.toggle?.replaceAll(' ', '').toLowerCase();
        const elements = document.querySelectorAll('[id^="pianohide"]');
        elements.forEach((element) => {
          (element as HTMLElement).hidden = element.id === toggle;
        });
      }
    },
    [],
  );
  useEffect(() => {
    document.addEventListener(
      `${RASCH_CUSTOM_EVENT_PREFIX}checkoutCustomEvent`,
      handleHideElement,
    );

    return () => {
      document.removeEventListener(
        `${RASCH_CUSTOM_EVENT_PREFIX}checkoutCustomEvent`,
        handleHideElement,
      );
    };
  }, [handleHideElement]);
  return null;
};
