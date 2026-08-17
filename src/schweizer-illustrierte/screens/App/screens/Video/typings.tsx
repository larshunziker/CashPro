import { ReactNode } from 'react';

export type VideoProps = Pick<RouterProps, 'location'> & {
  video: Video;
};

export type LinkButtonProps = {
  link: Object;
  children: ReactNode;
};
