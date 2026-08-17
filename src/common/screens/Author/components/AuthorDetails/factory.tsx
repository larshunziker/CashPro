import React from 'react';
import classNames from 'classnames';
import { getUserInitials } from '../../../../../shared/helpers/utils';
import { getContactsList } from '../../helpers';
import Link from '../../../../components/Link';
import Picture from '../../../../components/Picture';
import { STYLE_1X1_140 } from '../../../../../shared/constants/images';
import grid from '../../../../assets/styles/grid.legacy.css';
import { AuthorDetailsFactoryOptions, AuthorDetailsProps } from './typings';

const AuthorDetailsFactory = ({
  styles,
  Icon,
  Dropdown,
  shouldShowSubscribeButton = false,
  SubscribeButton,
}: AuthorDetailsFactoryOptions) => {
  const AuthorDetails = ({ author }: AuthorDetailsProps) => {
    const authorImage = author.imageParagraph?.image?.file || null;
    const userContactsList = getContactsList(author);

    // show dropdown only when author has more than three contact links
    const shouldShowDropdown = userContactsList.length > 3;

    // if author has less or equal three contact links show all of them, else show two and all other links inside dropdown
    const contactListDivider = shouldShowDropdown ? 2 : userContactsList.length;
    return (
      <div className={styles.AuthorDetails}>
        <div className={styles.PictureWrapper}>
          {authorImage ? (
            <Picture
              key={`author-image-${author.id}`}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
              relativeOrigin={authorImage.relativeOriginPath}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
              alt={authorImage.alt}
              className={styles.Picture}
              style_320={STYLE_1X1_140}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={authorImage.focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={authorImage.focalPointY}
            />
          ) : (
            <div className={styles.Initials}>
              {/* @ts-ignore TODO: TS2345 ->  Argument of type 'Maybe<string> | undefined' is not assignable to parameter of type 'string'. */}
              {getUserInitials(author.name)}
            </div>
          )}
          {shouldShowSubscribeButton && !!SubscribeButton && (
            <div className={grid.HiddenSmUp}>
              <SubscribeButton author={author} />
            </div>
          )}
        </div>

        <div className={styles.DetailsContent}>
          <div className={styles.NameAndButtonWrapper}>
            <h1 className={styles.Name}>{author.name}</h1>
            {shouldShowSubscribeButton && !!SubscribeButton && (
              <div
                className={classNames(
                  grid.HiddenSmDown,
                  styles.SubscribeButton,
                )}
              >
                <SubscribeButton author={author} />
              </div>
            )}
          </div>
          <h2 className={styles.Headline}>{author.headline}</h2>

          <div className={styles.ContactsList}>
            {userContactsList.map((listItem, index) => (
              <div
                className={classNames(styles.ContactItem, {
                  [grid.HiddenSmDown]: index >= contactListDivider,
                })}
                key={listItem.label}
              >
                <Link className={styles.ContactLink} path={listItem.path}>
                  <div className={styles.IconWrapper}>
                    <div className={styles.ContactIcon}>
                      <Icon type={listItem.icon} />
                    </div>
                  </div>

                  {listItem.label}
                </Link>
              </div>
            ))}
          </div>

          {shouldShowDropdown && (
            <div className={grid.HiddenSmUp}>
              <Dropdown>
                {userContactsList.map((listItem, index) => (
                  <div
                    className={classNames(styles.ContactItem, styles.Dropdown, {
                      [grid.HiddenSmDown]: index < contactListDivider,
                    })}
                    key={listItem.path}
                  >
                    <Link className={styles.ContactLink} path={listItem.path}>
                      <div className={styles.IconWrapper}>
                        <div className={styles.ContactIcon}>
                          <Icon type={listItem.icon} />
                        </div>
                      </div>
                      {listItem.label}
                    </Link>
                  </div>
                ))}
              </Dropdown>
            </div>
          )}
        </div>
      </div>
    );
  };
  return AuthorDetails;
};

export default AuthorDetailsFactory;
