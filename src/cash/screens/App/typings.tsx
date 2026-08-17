import { ReactNode } from 'react';

export type AppProps = Pick<RouterProps, 'location'> & {
  children: ReactNode;
  path: string;
};
