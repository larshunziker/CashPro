import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import fileUploaderFactory from '../../../../../common/components/FileUploader/factory';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import ButtonWithLoading from '../../components/ButtonWithLoading';
import SVGIcon from '../SVGIcon';
import PreparedFiles from './components/PreparedFiles';
import UploadedFiles from './components/UploadedFiles';
import { MAIN_CHANNEL_BODY_HEALTH, MAIN_CHANNEL_STYLE } from '../../constants';
import styles from './styles.legacy.css';
import { ButtonWithLoadingProps } from '../../../../../common/components/ButtonWithLoading/typings';
import { ErrorCodesMap } from '../../../../../common/components/FileUploader/typings';
import { ActiveMainChannel } from '../../../../shared/types';

type ExtendedButtonWithLoadingProps = ButtonWithLoadingProps & {
  activeMainChannel: ActiveMainChannel;
};

type ExtendedButtonWithLoading = (
  props: ExtendedButtonWithLoadingProps,
) => ReactElement;

export const getErrorMessagesByCodes = ({
  name = '',
  maxFileSize = 0,
  maxFileCount = 1,
  allowedExtensions = '',
}): ErrorCodesMap => ({
  'file-too-large': `Die Datei "${name}" überschreitet die Grösse von ${maxFileSize} MB.`,
  'max-amount-of-files-achieved': 'Maximale Anzahl an Dateien ist erreicht',
  'too-many-files': `Es können nicht mehr als ${maxFileCount} Dateien hochgeladen werden.`,
  'file-invalid-type': `Das Format der Datei "${name}" wird nicht unterstützt. Bitte verwenden Sie eines der folgenden Formate ${allowedExtensions}`,
  'duplicated-file': `Die Datei "${name}" wurde bereits hochgeladen.`,
  required: `Es muss mindestens eine Datei hochgeladen werden.`,
});

const Button: ExtendedButtonWithLoading = ({
  clickHandler,
  text,
  activeMainChannel,
}) => {
  let highAttention = false;
  if (
    activeMainChannel === MAIN_CHANNEL_STYLE ||
    activeMainChannel === MAIN_CHANNEL_BODY_HEALTH
  ) {
    highAttention = true;
  }

  return (
    <ButtonWithLoading
      size="big"
      aria-label="upload"
      variant="tertiary"
      onClick={clickHandler}
      highAttention={highAttention}
    >
      {text}
    </ButtonWithLoading>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state)
    .activeMainChannel as ActiveMainChannel,
});

const FileUploader = connect(mapStateToProps)(
  fileUploaderFactory({
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
  }),
);

export default FileUploader;
