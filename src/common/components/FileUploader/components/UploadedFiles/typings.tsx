import { ReactElement } from 'react';
import { IconComponent } from '../../../Icon/typings';
import { DraftFile } from '../../typings';

export type UploadedFilesProps = {
  files: DraftFile[];
  handleDelete: (name: string) => void;
};

export type UploadedFilesFactoryOptions = {
  Icon: IconComponent;
  fileText?: string;
  styles: {
    FilesListItem: string;
    SpaceFiller: string;
    FileName: string;
  };
};

export type UploadedFilesComponent = (
  props: UploadedFilesProps,
) => ReactElement;
