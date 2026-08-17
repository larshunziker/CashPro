import { ComponentType, ReactElement } from 'react';
import { DropzoneProps } from 'react-dropzone';
import { SVGIconComponent } from '../SVGIcon/typings';
import { PreparedFilesComponent } from './components/PreparedFiles/typings';
import { UploadedFilesComponent } from './components/UploadedFiles/typings';

export type FileUploaderFactoryOptions = {
  titleText?: ReactElement | string;
  subtitleText?: ReactElement | string;
  buttonText?: ReactElement | string;
  styles: {
    Wrapper: string;
    WrapperReject: string;
    WrapperActive: string;
    Title: string;
    Subtitle: string;
    FullSpaceIconWrapper: string;
    UploadIconWrapper: string;
    Info: string;
    FilesListWrapper: string;
    FilesListWrapperError: string;
    ErrorMessage: string;
    UploadButtonWrapper: string;
    FileExtensions: string;
    WrapperAccept: string;
  };
  PreparedFiles: PreparedFilesComponent;
  UploadedFiles: UploadedFilesComponent;
  SVGIcon: SVGIconComponent;
  /* @ts-ignore TODO: TS7008 ->  Member 'getErrorMessagesByCodes' implicitly has an 'any' type. */
  getErrorMessagesByCodes;
  Button: any;
};

export type FileUploaderProps = {
  dropzoneProps?: DropzoneProps;
  onFilesUpload?: (files: string[]) => void;
  onFileDelete?: (name: string) => void;
  propagateUploadedFilesStateChange?: Function;
  hasError?: boolean;
  errorMessage?: string;
  addClass?: string;
  id?: string;
  uploadedFiles?: any;
  setUploadedFiles?: any;
  register: Function;
  webformId: string;
  fieldName: string;
  uniqueTimestamp: string;
  allowedExtensions: string;
  fileLimit: number | boolean;
  maxFileSize: number | null;
  required: boolean;
  disabled: boolean;
};

export type ErrorCodes =
  | 'file-too-large'
  | 'max-amount-of-files-achieved'
  | 'too-many-files'
  | 'file-invalid-type'
  | 'duplicated-file'
  | 'required';

export type ErrorCodesMap = {
  [k in ErrorCodes]: ReactElement | string;
};

export type PutRequestBody = {
  method: string;
  body: FormData;
  signal: AbortSignal;
};

export type DraftFile = {
  name: string;
  size: number;
};

export type FileUploaderComponent = ComponentType<FileUploaderProps>;
