import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { FileWithPath, useDropzone } from 'react-dropzone';
import classNames from 'classnames';
import urlMod from 'url';
import { log, noop } from '../../../../shared/helpers/utils';
import { validateFileType } from '../helpers';
import FileUploaderApi from '../api';
import {
  SVG_ICONS_TYPE_FULL_FILE_SPACE,
  SVG_ICONS_TYPE_UPLOAD,
} from '../../../../shared/constants/svgIcons';
import { FileUploaderFactoryOptions, FileUploaderProps } from '../typings';

const FileUploader: FC<FileUploaderProps & FileUploaderFactoryOptions> = ({
  dropzoneProps = {
    noClick: true,
    noKeyboard: true,
  },
  onFilesUpload = noop,
  onFileDelete = noop,
  hasError,
  errorMessage,
  addClass,
  id = '',
  register,
  webformId,
  fieldName,
  uniqueTimestamp,
  allowedExtensions = '',
  fileLimit,
  maxFileSize,
  required,
  titleText,
  buttonText,
  subtitleText,
  styles,
  PreparedFiles,
  UploadedFiles,
  SVGIcon,
  getErrorMessagesByCodes,
  Button: ButtonWithLoading,
  ...props
}) => {
  // this is what we get from backend (multiple: false | true | number, // false = only 1 file, number = x number of files, true = unlimited)
  let maxFileCount = (fileLimit === false && 1) || 0;
  dropzoneProps.maxFiles = maxFileCount;
  if (typeof fileLimit !== 'boolean' && fileLimit) {
    maxFileCount = fileLimit;
    dropzoneProps.maxFiles = fileLimit;
  }
  if (maxFileSize) {
    dropzoneProps.maxSize = maxFileSize * 1024 * 1024;
  }
  // files which user dragged into dropzone, currently processed
  const [preparedFiles, setPreparedFiles] = useState<FileWithPath[]>([]);
  const valuesRef = useRef({ cms: [], aws: [] });
  const uploadedFilesRef = useRef([]);
  const extensions = useRef([]);
  const idRef = useRef(id);

  /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'string | (() => string)'. */
  const [apiError, setApiError] = useState<string>(null);
  const [customErrorMsg, setCustomErrorMsg] = useState('');
  const maxAmountOfFilesAchieved =
    dropzoneProps.maxFiles !== 0 &&
    uploadedFilesRef.current.length >= dropzoneProps.maxFiles;
  const uploadDisabled = maxAmountOfFilesAchieved;
  const validateRef = useRef(!apiError && !customErrorMsg);

  useEffect(() => {
    // register field functions on form
    if (typeof register === 'function') {
      register({
        validate: () => {
          if (required && valuesRef.current.cms.length === 0) {
            setCustomErrorMsg(getErrorMessagesByCodes({})['required']);
            return false;
          }
          return validateRef.current;
        },
        getValue: () => {
          return (
            (fileLimit === false && valuesRef.current.cms[0]) ||
            valuesRef.current.cms
          );
        },
        getId: () => idRef.current,
        successCallback: async () => {
          await Promise.all(
            valuesRef.current.aws.map(async (item: any) => {
              const formData = new FormData();
              formData.append('file', item.file);

              return await handleRequest(FileUploaderApi.putFile, [
                item.putUrl,
                {
                  method: 'PUT',
                  body: formData.get('file'),
                },
              ]);
            }),
          );

          onFilesUpload(valuesRef.current.cms);
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // helper function for handling API calls and errors
  /* @ts-ignore TODO: TS7006 ->  Parameter 'request' implicitly has an 'any' type. */
  const handleRequest = async (request, params: any[] = []) => {
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'null' is not assignable to parameter of type 'SetStateAction<string>'. */
    setApiError(null);

    try {
      return await request(...params);
    } catch (e) {
      log(e);
      setApiError(e.message);
      return null;
    }
  };

  if (allowedExtensions) {
    // split by comma and/or whitespace and trim (foo,bar baz, qux)
    /* @ts-ignore TODO: TS2322 ->  Type 'string[]' is not assignable to type 'never[]'. */
    extensions.current = allowedExtensions
      .split(/\s*[,\s]+\s*/)
      .map((ext) => '.' + ext.trim().toUpperCase());
    extensions.current = [...new Set(extensions.current)];
    dropzoneProps.accept = extensions.current.join(',');
  }

  // this method requires to be callback according to react-dropzone docs, it's called whenever files are dropped or selected
  const onDrop = useCallback(
    /* @ts-ignore TODO: TS7006 ->  Parameter 'rejected' implicitly has an 'any' type. */
    async (accepted: FileWithPath[], rejected) => {
      setCustomErrorMsg('');
      const leftFilesCount = maxFileCount - uploadedFilesRef.current.length;
      // check if the files limit is or will be reached, if yes, add error message
      if (maxFileCount && accepted.length > leftFilesCount) {
        rejected.push({
          errors: [{ code: 'too-many-files' }],
        });
        setCustomErrorMsg(
          getErrorMessagesByCodes({ maxFileCount })['too-many-files'],
        );
        return;
      }

      const uploadedFileNames = uploadedFilesRef.current.map(
        ({ name }) => name,
      );
      for (const file of accepted) {
        // check for valid types
        const isTypeError = await validateFileType(
          file,
          getErrorMessagesByCodes,
          extensions.current,
        );
        if (isTypeError) {
          setCustomErrorMsg(isTypeError);
          return;
        }

        // check for duplicates
        /* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'never'. */
        if (uploadedFileNames.includes(file.name)) {
          setCustomErrorMsg(
            getErrorMessagesByCodes({ name: file.name })['duplicated-file'],
          );
          return;
        }
      }

      setPreparedFiles(accepted);

      // upload files one by one asynchronously
      for (const file of accepted) {
        const putUrl = await handleRequest(FileUploaderApi.getPutUrl, [
          /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'never'. */
          file.name,
          {
            /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'never'. */
            webformId,
            /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'never'. */
            fieldName,
            /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'never'. */
            uniqueTimestamp,
          },
        ]);

        if (putUrl) {
          const parsedUri = urlMod.parse(putUrl);
          /* @ts-ignore TODO: TS2322 ->  Type 'FileWithPath' is not assignable to type 'never'. */
          /* @ts-ignore TODO: TS2322 ->  Type 'FileWithPath' is not assignable to type 'never'. */
          uploadedFilesRef.current = [...uploadedFilesRef.current, file];
          setPreparedFiles((files) => [
            ...files.filter(({ name }) => name !== file.name),
          ]);
          valuesRef.current = {
            /* @ts-ignore TODO: TS2322 ->  Type '{ putUrl */
            /* @ts-ignore TODO: TS2322 ->  Type 'any' is not assignable to type 'never'. */
            /* @ts-ignore TODO: TS2322 ->  Type 'FileWithPath' is not assignable to type 'never'. */
            aws: [...valuesRef.current.aws, { putUrl: putUrl, file: file }],
            cms: [
              /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'never'. */
              ...valuesRef.current.cms,
              /* @ts-ignore TODO: TS2322 ->  Type 'string' is not assignable to type 'never'. */
              `${parsedUri.protocol}//${parsedUri.host}${parsedUri.pathname}`,
            ],
          };

          onFilesUpload(valuesRef.current.cms);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      valuesRef,
      webformId,
      fieldName,
      uniqueTimestamp,
      maxFileCount,
      onFilesUpload,
    ],
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    open,
    fileRejections,
  } = useDropzone({
    onDrop,
    disabled: uploadDisabled,
    ...dropzoneProps,
  });

  const deletePreparedFile = async (name: string) => {
    setCustomErrorMsg('');
    setPreparedFiles((files) => files.filter((f) => f.name !== name));

    /* @ts-ignore TODO: TS2339 ->  Property 'name' does not exist on type 'never'. */
    const restOfFiles = uploadedFilesRef.current.filter((f) => f.name !== name);
    valuesRef.current.aws = valuesRef.current.aws.filter(
      /* @ts-ignore TODO: TS2339 ->  Property 'file' does not exist on type 'never'. */
      (item) => item.file.name !== name,
    );
    valuesRef.current.cms = valuesRef.current.cms.filter((file) => {
      return (
        /* @ts-ignore TODO: TS2339 ->  Property 'indexOf' does not exist on type 'never'. */
        file.indexOf((name.indexOf('%') > -1 && name) || encodeURI(name)) === -1
      );
    });
    uploadedFilesRef.current = restOfFiles;
    onFileDelete(name);
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
  const handleOpen = (event) => {
    event.preventDefault();
    if (!uploadDisabled) {
      open();
    }
  };

  const button = (
    <ButtonWithLoading clickHandler={handleOpen} text={buttonText} {...props} />
  );

  const preparedFilesNames = preparedFiles.filter(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'string' is not assignable to parameter of type 'never'. */
    (pf) => !uploadedFilesRef.current.map(({ name }) => name).includes(pf.name),
  );
  const hasCustomErrorMsgAndFileRejections =
    customErrorMsg || !!fileRejections.length;

  return (
    <div id={id}>
      <div
        {...getRootProps()}
        className={classNames(styles.Wrapper, addClass, {
          [styles.WrapperActive]: isDragActive,
          [styles.WrapperAccept]: isDragAccept,
          [styles.WrapperReject]:
            isDragReject || fileRejections.length || customErrorMsg || hasError,
        })}
      >
        <input {...getInputProps()} />
        {uploadDisabled ? (
          <>
            <div className={styles.FullSpaceIconWrapper}>
              <SVGIcon type={SVG_ICONS_TYPE_FULL_FILE_SPACE} />
            </div>
            <div className={styles.Info}>
              {maxAmountOfFilesAchieved &&
                getErrorMessagesByCodes({ maxFileCount })[
                  'max-amount-of-files-achieved'
                ]}
            </div>
          </>
        ) : (
          <>
            <div className={styles.UploadIconWrapper}>
              <SVGIcon type={SVG_ICONS_TYPE_UPLOAD} />
            </div>
            <span className={styles.Title}>{titleText}</span>
            <span className={styles.Subtitle}>{subtitleText}</span>
            <div className={styles.UploadButtonWrapper}>{button}</div>
          </>
        )}

        <span className={styles.FileExtensions}>
          {allowedExtensions.replace(/[,\s]+/g, ', ')}
        </span>
        <ul
          className={classNames(styles.FilesListWrapper, {
            [styles.FilesListWrapperError]: !!apiError || fileRejections.length,
          })}
        >
          {uploadedFilesRef.current && (
            <UploadedFiles
              files={uploadedFilesRef.current}
              handleDelete={deletePreparedFile}
            />
          )}
          <PreparedFiles
            files={preparedFilesNames}
            handleDelete={deletePreparedFile}
          />
        </ul>
      </div>
      {hasCustomErrorMsgAndFileRejections && (
        <span className={styles.ErrorMessage}>
          {
            getErrorMessagesByCodes({
              name: fileRejections[0]?.file?.name,
              maxFileCount,
              maxFileSize,
              allowedExtensions: allowedExtensions
                .toUpperCase()
                .replace(/[,\s]+/g, ', '),
            })[fileRejections[0]?.errors[0].code]
          }
        </span>
      )}

      {hasError && errorMessage ? (
        <span className={styles.ErrorMessage}>{errorMessage}</span>
      ) : null}
    </div>
  );
};

export default FileUploader;
