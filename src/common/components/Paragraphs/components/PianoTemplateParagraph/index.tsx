import React, { ReactElement, useEffect } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import pianoStateSelector from '../../../../../shared/selectors/pianoStateSelector';
import useInView, {
  UseInViewResponse,
} from '../../../../../shared/hooks/useInView';
import styles from './styles.legacy.css';
import {
  PianoTemplateParagraphComponent,
  PianoTemplateParagraphProps,
} from './typings';

const PianoTemplateParagraph: PianoTemplateParagraphComponent = ({
  pianoTemplateParagraph,
  colStyle,
}: PianoTemplateParagraphProps): ReactElement | null => {
  const initialAuthRequest = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => pianoStateSelector(state).userMetadata.initialAuthRequest,
  );

  const { id, offerId, templateId, templateVariantId } = pianoTemplateParagraph;
  const pianoContainer = `piano-template-paragraph-${
    (id && id.replace(/[^a-zA-Z0-9-]/g, '')) || ''
  }`;

  const { setRef, isInView }: UseInViewResponse = useInView({
    rootMargin: '400px',
    triggerOnce: true,
  });

  useEffect(() => {
    /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
    if (global?.tp && isInView && initialAuthRequest) {
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      global.tp.push([
        'init',
        function () {
          /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
          global.tp.offer.show({
            templateId,
            offerId,
            templateVariantId,
            displayMode: 'inline',
            containerSelector: `#${pianoContainer}`,
          });
        },
      ]);
    }
  }, [
    initialAuthRequest,
    isInView,
    templateId,
    offerId,
    templateVariantId,
    pianoContainer,
  ]);

  if (!id || !offerId) {
    return null;
  }

  return (
    <div
      className={classNames(
        'piano-container',
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '`undefined_${string}` | `null_${string}` | `${string}_ */
        styles[`${templateId}_${templateVariantId}`],
        /* @ts-ignore TODO: TS2464 ->  A computed property name must be of type 'string', 'number', 'symbol', or 'any'. */
        { [colStyle]: !!colStyle },
      )}
      /* @ts-ignore TODO: TS2322 ->  Type 'Dispatch<HTMLElement>' is not assignable to type 'LegacyRef<HTMLDivElement> | undefined'. */
      ref={setRef}
      id={pianoContainer}
    ></div>
  );
};

export default PianoTemplateParagraph;
