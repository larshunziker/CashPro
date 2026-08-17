import { ReactNode } from 'react';

export type AppProps = Pick<RouterProps, 'location'> & {
  children: ReactNode;
  root: Record<string, any>;
};
