export const ACCEPTED_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'application/pdf',
  'image/avif',
  'video/x-msvideo',
  'audio/mpeg',
  'video/mp4',
  'video/mpeg',
  'application/rtf',
  'image/tiff',
  'text/plain',
  'audio/wav',
];

export const validateFileType = async (
  file: any,
  /* @ts-ignore TODO: TS7006 ->  Parameter 'getErrorCodesMap' implicitly has an 'any' type. */
  getErrorCodesMap,
  allowedExtensions = [],
): Promise<string | null> => {
  const allowedExtensionsString = allowedExtensions.join(', ');

  try {
    const currentFileExtension = file.path.split('.').pop().toUpperCase();

    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'never'. */
    if (!allowedExtensions.includes('.' + currentFileExtension)) {
      return getErrorCodesMap({
        name: file.name,
        allowedExtensions: allowedExtensionsString,
      })['file-invalid-type'];
    }

    const fileType = await import(
      /* webpackChunkName: "file-type" */ 'file-type/browser'
    );
    /* @ts-ignore TODO: TS2339 ->  Property 'mime' does not exist on type 'FileTypeResult | undefined'. */
    const { mime } = await fileType.fromBlob(file);

    if (
      mime === 'application/x-cfb' && // file is MS-CFB: Microsoft Compound File Binary File Format
      ['application/msword', 'application/vnd.ms-excel'].includes(file.type) // extension is .doc or .xls
    ) {
      return null;
    }

    if (ACCEPTED_TYPES.includes(mime)) {
      return null; // return null if no error
    }

    return getErrorCodesMap({
      name: file.name,
      allowedExtensions: allowedExtensionsString,
    })['file-invalid-type'];
  } catch (err) {
    return getErrorCodesMap({
      name: file.name,
      allowedExtensions: allowedExtensionsString,
    })['file-invalid-type'];
  }
};
