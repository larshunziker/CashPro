export type ConfirmationPageTexts = {
  title?: string;
  description?: string;
  buttonLink?: string;
  buttonLabel?: string;
};

export type BookingConfirmation = {
  phoneNumber: string;
  description?: string;
  attachment?: string;
  texts: ConfirmationPageTexts;
  placeholders: {
    title: string;
    buttonLabel: string;
  };
};

export type ConfirmationFactoryOptions = {
  styles: ConfirmationFactoryOptionsStyles;
};

export type ConfirmationFactoryOptionsStyles = {
  Title: string;
  Info: string;
  FieldWrapper: string;
  Label: string;
  Value: string;
  Button: string;
};
