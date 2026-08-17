export type UserProfileDataFactoryProps = {
  authStateSelector: AuthStateSelector;
  styles: {
    Paragraph: string;
    Title: string;
    Text: string;
    Button: string;
    Row: string;
  };
};

export type UserProfileDataProps = {
  authState: AuthState;
};
