import React from 'react';
import SVGIcon from '../../../../components/SVGIcon';
import Dropdown from '../Dropdown';
import authorDetailsFactory from '../../../../../../../common/screens/Author/components/AuthorDetails/factory';
import SubscribeButton from '../../../../components/SubscribeButton';
import { getAlertItemTypeByTypename } from '../../../../../../../common/components/SubscribeButton/helper';
import styles from './styles.legacy.css';
import { AuthorDetailsProps } from '../../../../../../../common/screens/Author/components/AuthorDetails/typings';

const SubscribeButtonJSX = ({ author }: AuthorDetailsProps) => {
  return (
    <SubscribeButton
      label={author.name || ''}
      type={getAlertItemTypeByTypename(author.__typename)}
      id={Number(author.aid)}
    />
  );
};

const AuthorDetails = authorDetailsFactory({
  styles: {
    AuthorDetails: styles.AuthorDetails,
    PictureWrapper: styles.PictureWrapper,
    Initials: styles.Initials,
    Picture: styles.Picture,
    DetailsContent: styles.DetailsContent,
    NameAndButtonWrapper: styles.NameAndButtonWrapper,
    Name: styles.Name,
    SubscribeButton: styles.SubscribeButton,
    Headline: styles.Headline,
    ContactsList: styles.ContactsList,
    ContactItem: styles.ContactItem,
    Dropdown: styles.Dropdown,
    IconWrapper: styles.IconWrapper,
    ContactIcon: styles.ContactIcon,
    ContactLink: styles.ContactLink,
  },
  Icon: SVGIcon,
  /* @ts-ignore TODO: TS2322 ->  Type 'MemoExoticComponent<({ label, size, loading, variant, iconTypeLeft, iconTypeRight, iconTypeRightActive, avoidUpda */
  Dropdown,
  shouldShowSubscribeButton: true,
  SubscribeButton: SubscribeButtonJSX,
});

export default AuthorDetails;
