import { ReactElement } from 'react';
import { IconComponent } from '../../../Icon/typings';
import { DraftFile } from '../../typings';

export type PreparedFilesProps = {
  files: DraftFile[];
  handleDelete: (name: string) => void;
};

export type PreparedFilesFactoryOptions = {
  LoadingSpinner: any;
  Icon: IconComponent;
  fileText?: string;
  styles: {
    FilesListItem: string;
    SpaceFiller: string;
    FileName: string;
  };
};

export type PreparedFilesComponent = (
  props: PreparedFilesProps,
) => ReactElement;
