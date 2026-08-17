import React, { ReactElement } from 'react';
import { MutationFunction } from '@apollo/client';

export type WebformProps = {
  webform: string;
  // @ts-ignore
  data?: ApolloData & {
    saveWebform: WebformResponse;
  };
  /* @ts-ignore TODO: TS7008 ->  Member 'values' implicitly has an 'any' type. */
  values?;
  mutate: MutationFunction;
  origin?: string;
  anchorId?: string;
  mapTokensCustom?: Function;
  isHybridApp?: boolean;
  deviceId?: string;
  headerText?: string;
};

export type WebformFactoryOptions = {
  UserProfileData?: React.ComponentType<any>;
  SubmitButton: React.ComponentType<any>;
  GoHomeButton?: React.ComponentType<any>;
  InputField: React.ComponentType<any>;
  BirthdayField?: React.ComponentType<any>;
  MultiField: React.ComponentType<any>;
  SelectField: React.ComponentType<any>;
  FileField?: React.ComponentType<any>;
  AddressFieldsWrapper?: React.ComponentType<any>;
  ErrorMessage: React.ComponentType<any>;
  Icon?: React.ComponentType<any> | null;
  IconTypes: {
    errorIconType: string;
    successIconType?: string;
  };
  /* @ts-ignore TODO: TS7008 ->  Member 'successCallToAction' implicitly has an 'any' type. */
  successCallToAction?;
  /* @ts-ignore TODO: TS7008 ->  Member 'errorCallToAction' implicitly has an 'any' type. */
  errorCallToAction?;
  defaultErrorMessage: ReactElement | string;
  defaultSuccessTitle?: ReactElement | string;
  defaultSuccessMessage: ReactElement | string;
  restrictionFormLoginMessage?: ReactElement | string;
  restrictionFormSetUsernameMessage?: ReactElement | string;
  appCaptchaMessage?: ReactElement | string;
  appErrorPanelHeaderMesssage?: ReactElement | string;
  reCaptchaKey?: string;
  RestrictionForm?: React.ComponentType<any> | null;
  LoadingSpinner?: Function | null;
  /* @ts-ignore TODO: TS7008 ->  Member 'getIsUserLoggedIn' implicitly has an 'any' type. */
  getIsUserLoggedIn?;
  withErrorIcon?: boolean;
  multiFieldDescriptionInside?: boolean;
  styles: {
    SubTitle: string;
    ToggleFormAppear: string;
    ToggleFormAppearActive: string;
    ToggleFormLeave: string;
    ToggleFormLeaveActive: string;
    Description: string;
    Required: string;
    ButtonWrapper: string;
    Loading: string;
    ToggleErrorAppear: string;
    ToggleErrorAppearActive: string;
    ToggleErrorLeave: string;
    ToggleErrorLeaveActive: string;
    ErrorIcon?: string;
    ErrorPanelWrapper: string;
    ErrorPanelHeader: string;
    ErrorPanelContent: string;
    SuccessIcon?: string;
    SuccessWrapper: string;
    SuccessContent: string;
    SuccessTitle: string;
    SuccessMessage: string;
    RestrictionFormWrapper?: string;
    RecaptchaWrapper?: string;
    ClosedContainer: string;
    ClosedMessage: string;
    ClosedIcon: string;
    RichTextWrapper: string;
  };
};
