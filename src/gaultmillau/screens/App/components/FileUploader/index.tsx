import React from 'react';
import { FormattedMessage } from 'react-intl';
import fileUploaderFactory from '../../../../../common/components/FileUploader/factory';
import ButtonWithLoading from '../../components/ButtonWithLoading';
import SVGIcon from '../SVGIcon';
import PreparedFiles from './components/PreparedFiles';
import UploadedFiles from './components/UploadedFiles';
import styles from './styles.legacy.css';
import { ButtonWithLoadingType } from '../../../../../common/components/ButtonWithLoading/typings';
import { ErrorCodesMap } from '../../../../../common/components/FileUploader/typings';

export const getErrorMessagesByCodes = ({
  name = '',
  maxFileSize = 0,
  maxFileCount = 1,
  allowedExtensions = '',
}): ErrorCodesMap => ({
  'file-too-large': (
    <FormattedMessage
      id="app.fileUploader.fileTooLarge"
      description="The default fileTooLarge of the FileUploader"
      defaultMessage='Die Datei "{name}" überschreitet die Grösse von {maxFileSize} MB.'
      values={{ name, maxFileSize }}
    />
  ),
  'max-amount-of-files-achieved': (
    <FormattedMessage
      id="app.fileUploader.maxAmountOfFilesAchieved"
      description="The default maxAmountOfFilesAchieved of the FileUploader"
      defaultMessage="Maximale Anzahl an Dateien ist erreicht"
    />
  ),
  'too-many-files': (
    <FormattedMessage
      id="app.fileUploader.tooManyFiles"
      description="The default tooManyFiles of the FileUploader"
      defaultMessage="Es können nicht mehr als {maxFileCount} Dateien hochgeladen werden."
      values={{ maxFileCount }}
    />
  ),
  'file-invalid-type': (
    <FormattedMessage
      id="app.fileUploader.fileInvalidType"
      description="The default fileInvalidType of the FileUploader"
      defaultMessage='Das Format der Datei "{name}" wird nicht unterstützt. Bitte verwenden Sie eines der folgenden Formate {allowedExtensions}.'
      values={{ name, allowedExtensions }}
    />
  ),
  'duplicated-file': (
    <FormattedMessage
      id="app.fileUploader.duplicatedFile"
      description="The default duplicatedFile of the FileUploader"
      defaultMessage='Die Datei "{name}" wurde bereits hochgeladen.'
      values={{ name }}
    />
  ),
  required: (
    <FormattedMessage
      id="app.fileUploader.required"
      description="The default required of the FileUploader"
      defaultMessage="Es muss mindestens eine Datei hochgeladen werden."
    />
  ),
});

const Button: ButtonWithLoadingType = ({ clickHandler }) => (
  <ButtonWithLoading
    size="big"
    aria-label="upload"
    variant="tertiary"
    onClick={clickHandler}
  >
    <FormattedMessage
      id="app.fileUploader.buttonText"
      description="The default buttonText of the FileUploader"
      defaultMessage="Dateien auswählen"
    />
  </ButtonWithLoading>
);

const FileUploader = fileUploaderFactory({
  titleText: (
    <FormattedMessage
      id="app.fileUploader.titleText"
      description="The default titleText of the FileUploader"
      defaultMessage="Zum Hochladen Dateien hier ablegen"
    />
  ),
  subtitleText: (
    <FormattedMessage
      id="app.fileUploader.subtitleText"
      description="The default subtitleText of the FileUploader"
      defaultMessage="oder"
    />
  ),
  /* @ts-ignore TODO: TS2322 ->  Type 'MemoExoticComponent<({ ...props } */
  SVGIcon,
  Button,
  /* @ts-ignore TODO: TS2322 ->  Type 'FC<PreparedFilesProps>' is not assignable to type 'PreparedFilesComponent'. */
  PreparedFiles,
  /* @ts-ignore TODO: TS2322 ->  Type 'FC<UploadedFilesProps>' is not assignable to type 'UploadedFilesComponent'. */
  UploadedFiles,
  getErrorMessagesByCodes,
  styles: {
    Wrapper: styles.Wrapper,
    WrapperReject: styles.WrapperReject,
    WrapperActive: styles.WrapperActive,
    WrapperAccept: styles.WrapperAccept,
    Title: styles.Title,
    Subtitle: styles.Subtitle,
    FullSpaceIconWrapper: styles.FullSpaceIconWrapper,
    UploadIconWrapper: styles.UploadIconWrapper,
    Info: styles.Info,
    FilesListWrapper: styles.FilesListWrapper,
    FilesListWrapperError: styles.FilesListWrapperError,
    FileExtensions: styles.FileExtensions,
    ErrorMessage: styles.ErrorMessage,
    UploadButtonWrapper: styles.UploadButtonWrapper,
  },
});

export default FileUploader;
