import { ReactElement } from 'react';
import { StatusPageComponent } from '../../../StatusPage/typings';

export type ColorsStyleguideProps = Partial<RouterProps> & {
  viewportLabel: ViewportLabel;
};

export type ColorsStyleguideFactoryOptions = {
  StatusPage?: StatusPageComponent;
  colors: Record<string, any>[];
  breadcrumbs?: ReactElement;
  styles: {
    ColorPreviewWrapper?: string;
    ColorItem?: string;
    Title?: string;
    DescriptionWrapper?: string;
  };
  /* @ts-ignore TODO: TS7008 ->  Member 'setLoading' implicitly has an 'any' type. */
  setLoading?;
  /* @ts-ignore TODO: TS7008 ->  Member 'setScreenReady' implicitly has an 'any' type. */
  setScreenReady?;
};
