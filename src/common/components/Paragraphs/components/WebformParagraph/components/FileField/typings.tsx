import { FileUploaderComponent } from '../../../../../FileUploader/typings';

export type FileFieldFactoryOptions = {
  FileUploader: FileUploaderComponent;
  styles: {
    Wrapper: string;
    Title: string;
    Description: string;
  };
};

export type FileFieldProps = {
  onFilesUpload?: (files: string[]) => void;
  onFileDelete?: (name: string) => void;
  propagateUploadedFilesStateChange?: Function;
  hasError?: boolean;
  errorMessage?: string;
  addClass?: string;
  id?: string;
  register: Function;
  webformId: string;
  fieldName: string;
  uniqueTimestamp: string;
  allowedExtensions: string;
  fileLimit: number | boolean;
  maxFileSize: number | null;
  required: boolean;
  title?: string;
  description: string;
  disabled?: boolean;
};
