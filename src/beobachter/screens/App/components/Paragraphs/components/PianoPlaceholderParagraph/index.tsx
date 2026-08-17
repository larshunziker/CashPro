import React, {
  ComponentType,
  ReactElement,
  useCallback,
  useEffect,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { RASCH_CUSTOM_EVENT_PREFIX } from '../../../../../../../common/components/PianoProvider';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import useInView, {
  UseInViewResponse,
} from '../../../../../../../shared/hooks/useInView';
import { EMBED_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
import EmbedParagraphRenderer from '../EmbedParagraph';
import type { EmbedParagraphProps } from '../../../../../../../common/components/Paragraphs/components/EmbedParagraph/typings';
import {
  PIANO_PLACEHOLDER_EMBED_ID,
  resolveEmbedContainerAnchorId,
  type PianoPlaceholderParagraph as PianoPlaceholderParagraphData,
} from '../../../../../../shared/helpers/replaceEmbedWithPianoPlaceholder';

const EXECUTE_CUSTOM_RASCH_EXPERIENCE = 'executeCustomRaschExperience';
const PIANO_CUSTOM_VAR_EXECUTE_EXPERIENCE = 'execute_custom_experience';
/** Match EmbedParagraph factory lazy-load prefetch distance. */
const EMBED_LAZY_LOAD_ROOT_MARGIN = '200px';

type PianoShowTemplateConversion = {
  containerSelector?: string;
  eventName?: string;
};

export type PianoPlaceholderParagraphProps = {
  pianoPlaceholderParagraph: PianoPlaceholderParagraphData & {
    pianoContainer?: string;
  };
  origin: string;
};

function isPianoPlaceholderShowTemplate(
  conversion: PianoShowTemplateConversion,
  pianoContainer?: string,
): boolean {
  const containerSelector = conversion.containerSelector ?? '';
  return (
    containerSelector.includes(`#${PIANO_PLACEHOLDER_EMBED_ID}`) ||
    (!!pianoContainer && containerSelector.includes(`#${pianoContainer}`))
  );
}

const PianoPlaceholderParagraph: ComponentType<
  PianoPlaceholderParagraphProps
> = ({
  pianoPlaceholderParagraph,
  origin,
}: PianoPlaceholderParagraphProps): ReactElement | null => {
  const navigate = useNavigate();
  const location = useLocation();
  const initialAuthRequest = useSelector(
    (state: ReduxState) =>
      pianoStateSelector(state).userMetadata.initialAuthRequest,
  );

  const { pianoContainer, pianoPlaceholderId, ...pianoPlaceholderRest } =
    pianoPlaceholderParagraph;
  const containerAnchorId = resolveEmbedContainerAnchorId(
    pianoPlaceholderParagraph,
  );

  const { setRef, isInView }: UseInViewResponse = useInView({
    rootMargin: EMBED_LAZY_LOAD_ROOT_MARGIN,
    triggerOnce: true,
  });

  const setPlaceholderHashInUrl = useCallback((): void => {
    if (!containerAnchorId) {
      return;
    }

    navigate(`${location.pathname}${location.search}#${containerAnchorId}`, {
      replace: true,
    });
  }, [containerAnchorId, location.pathname, location.search, navigate]);

  const executeCustomRaschExperience = useCallback((): void => {
    global.tp = global.tp || [];
    global.tp.push([
      'setCustomVariable',
      PIANO_CUSTOM_VAR_EXECUTE_EXPERIENCE,
      'true',
    ]);
    if (typeof global.tp?.experience?.execute === 'function') {
      global.tp.experience.execute();
    }
  }, []);

  useEffect(() => {
    const onCheckoutCustomEvent = (
      event: CustomEvent<{ eventName?: string }>,
    ): void => {
      if (event.detail.eventName !== EXECUTE_CUSTOM_RASCH_EXPERIENCE) {
        return;
      }

      setPlaceholderHashInUrl();
      executeCustomRaschExperience();
    };

    document.addEventListener(
      `${RASCH_CUSTOM_EVENT_PREFIX}checkoutCustomEvent`,
      onCheckoutCustomEvent as EventListener,
    );

    return () => {
      document.removeEventListener(
        `${RASCH_CUSTOM_EVENT_PREFIX}checkoutCustomEvent`,
        onCheckoutCustomEvent as EventListener,
      );
    };
  }, [executeCustomRaschExperience, setPlaceholderHashInUrl]);

  useEffect(() => {
    const onShowTemplate = (
      event: CustomEvent<PianoShowTemplateConversion>,
    ): void => {
      if (!isPianoPlaceholderShowTemplate(event.detail, pianoContainer)) {
        return;
      }

      executeCustomRaschExperience();
    };

    document.addEventListener(
      `${RASCH_CUSTOM_EVENT_PREFIX}showTemplate`,
      onShowTemplate as EventListener,
    );

    return () => {
      document.removeEventListener(
        `${RASCH_CUSTOM_EVENT_PREFIX}showTemplate`,
        onShowTemplate as EventListener,
      );
    };
  }, [executeCustomRaschExperience, pianoContainer]);

  useEffect(() => {
    if (!global?.tp || !initialAuthRequest || !isInView) {
      return undefined;
    }

    let cancelled = false;

    global.tp.push([
      'init',
      function () {
        if (cancelled) {
          return;
        }
        window.setTimeout(() => {
          if (cancelled) {
            return;
          }
          window.tp.push([
            'setCustomVariable',
            PIANO_CUSTOM_VAR_EXECUTE_EXPERIENCE,
            null,
          ]);
          window.tp.push([
            'setCustomVariable',
            'pianoPlaceholderId',
            pianoPlaceholderId,
          ]);
          if (typeof window.tp?.experience?.execute === 'function') {
            window.tp.experience.execute();
          }
        }, 0);
      },
    ]);

    return () => {
      cancelled = true;
      global.tp.push([
        'init',
        function () {
          window.tp.push([
            'setCustomVariable',
            PIANO_CUSTOM_VAR_EXECUTE_EXPERIENCE,
            null,
          ]);
          window.tp.push(['setCustomVariable', 'pianoPlaceholderId', null]);
        },
      ]);
    };
  }, [initialAuthRequest, isInView, pianoPlaceholderId]);

  return (
    <div className="piano-container" id={pianoContainer} ref={setRef}>
      <EmbedParagraphRenderer
        embedParagraph={
          {
            ...pianoPlaceholderRest,
            pianoPlaceholderId,
            __typename: EMBED_PARAGRAPH,
          } as EmbedParagraphProps['embedParagraph']
        }
        origin={origin}
      />
    </div>
  );
};

export default PianoPlaceholderParagraph;
