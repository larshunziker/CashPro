import { ReactElement } from 'react';
import { IconComponent } from '../../../../components/Icon/typings';

export type AuthorDetailsFactoryOptions = {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  Dropdown: (props) => JSX.Element;
  Icon: IconComponent;
  shouldShowSubscribeButton?: boolean;
  SubscribeButton?: (props: AuthorDetailsProps) => ReactElement;
  styles: {
    AuthorDetails: string;
    PictureWrapper: string;
    Initials: string;
    Picture: string;
    DetailsContent: string;
    NameAndButtonWrapper?: string;
    Name: string;
    SubscribeButton: string;
    Headline: string;
    ContactsList: string;
    ContactItem: string;
    Dropdown: string;
    IconWrapper: string;
    ContactIcon: string;
    ContactLink: string;
  };
};
export type AuthorDetailsProps = {
  author: Author;
};
