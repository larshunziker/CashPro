import authorDetailsFactory from '../../../../../../../common/screens/Author/components/AuthorDetails/factory';
import SVGIcon from '../../../../components/SVGIcon';
import Dropdown from '../DropDown';
import styles from './styles.legacy.css';

const AuthorDetails = authorDetailsFactory({
  styles: {
    AuthorDetails: styles.AuthorDetails,
    PictureWrapper: styles.PictureWrapper,
    Initials: styles.Initials,
    Picture: styles.Picture,
    DetailsContent: styles.DetailsContent,
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
});

export default AuthorDetails;
