import { ButtonComponent } from '../../../../../../../../../common/components/ButtonWithLoading/typings';
import { ToastLink } from '../../../../../../../../../common/components/ToastContent/typings';

export type BookingData = {
  phone: string;
  attachmentUrl: string;
};

export type DocumentCheckFormParagraphFactoryOptions = {
  displayErrorToast: (
    message: string,
    link: ToastLink,
    toastId: string,
  ) => void;
  publication: string;
  styles: DocumentCheckFormParagraphFactoryOptionsStyles;
  InputField: React.ComponentType<any>;
  Button: ButtonComponent;
  FileField?: React.ComponentType<any>;
  loginText?: string;
  LoginForm?: React.ComponentType<any>;
};

export type DocumentCheckFormParagraphFactoryOptionsStyles = {
  SubHeadline: string;
  Info: string;
  ButtonWrapper: string;
  InputWrapper: string;
  Step: string;
  ErrorLabel: string;
  Disabled: string;
};

export type DocumentCheckFormProps = {
  entry: {
    bookingForm: string;
    title: string;
    text: string;
  };
  setBookingConfirmation: (props: BookingState) => void;
  showFileUpload?: boolean;
  isDescriptionMandatory?: boolean;
  texts: {
    descriptionSubtitle: string;
    description: string;
  };
};
