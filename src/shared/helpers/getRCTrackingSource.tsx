type RegistrationCase =
  | 'direct'
  | 'piano-overlay'
  | 'comments'
  | 'alert-function'
  | 'webform'
  | 'ernaehrungszentrum'
  | 'bookmark'
  | 'text-to-speech'
  | 'diamond-overlay';

type ExtendedPageMetaData = Partial<PianoPageMetadata> & {
  termId?: string;
  webFormId?: string;
};

export const getRCTrackingSource = (
  /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'RegistrationCase'. */
  registrationCase: RegistrationCase = null,
  pageMetadata: ExtendedPageMetaData = {},
  pianoTrackingData?: Record<string, any>,
) => {
  const sanitizedGCID =
    (pageMetadata?.section !== 'HOME' &&
      pageMetadata?.gcid &&
      `_PID_${pageMetadata?.gcid}`) ||
    '';
  const sanitizedSection = pageMetadata?.section || '';
  const sanitizedContentType =
    (pageMetadata?.contentType && `_PT_${pageMetadata?.contentType}`) || '';

  switch (registrationCase) {
    case 'direct':
      return `DIR_${sanitizedSection}${sanitizedContentType}${sanitizedGCID}`;
    case 'comments':
      return `COM_${sanitizedSection}${sanitizedContentType}${sanitizedGCID}`;
    case 'diamond-overlay':
    case 'piano-overlay':
    case 'ernaehrungszentrum':
      return `PIA_${sanitizedSection}${sanitizedContentType}${sanitizedGCID}_${
        pianoTrackingData?.experienceId || 'No-experience-ID'
      }_${pianoTrackingData?.eventName || ''}`;
    case 'alert-function':
      return `ALE_${sanitizedSection}${sanitizedContentType}${sanitizedGCID}_${
        pageMetadata?.termId || 'No term ID'
      }`;
    case 'webform':
      return `WFO_${sanitizedSection}${sanitizedContentType}${sanitizedGCID}_${pageMetadata?.webFormId}`;
    case 'bookmark':
      return `BOK_${sanitizedSection}${sanitizedContentType}${sanitizedGCID}`;
    case 'text-to-speech':
      return `TTS_${sanitizedSection}${sanitizedContentType}${sanitizedGCID}`;
    default:
      return '';
  }
};
