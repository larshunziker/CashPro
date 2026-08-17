import React from 'react';
import classNames from 'classnames';
import { getTelLink } from '../../../../../../../../../../../../src/shared/helpers/format';
import { getGoogleMapsLink } from '../../../../helpers';
import Link from '../../../../../../../../../../../common/components/Link';
import Icon from '../../../../../../../../components/Icon';
import Img from '../../../../../../../../components/Img';
import { MIN_RATING } from '../../../../constants';
import gaultMillauIcons from '../../../../../../../../assets/styles/gaultMillau.legacy.css';
import styles from './styles.legacy.css';
import { MarkerOverlayProps } from './typings';

const MarkerOverlay = ({
  address,
  city,
  email,
  imgAlt,
  imgUrl,
  name,
  secondaryName,
  path = '',
  rating,
  tel,
  category = 'Restaurant',
  zip,
  toggleActive,
}: MarkerOverlayProps) => (
  <div className={classNames(styles.Overlay, { [styles.NoImageUrl]: !imgUrl })}>
    <button className={styles.Close} onClick={toggleActive}>
      <Icon type="IconCross" iconsOverride={gaultMillauIcons} />
    </button>

    <div className={styles.Content}>
      {imgUrl && (
        <Link className={styles.ImageLink} path={path} routed={true}>
          <Img
            addClass={styles.Image}
            /* @ts-ignore TODO: TS2322 ->  Type 'string | undefined' is not assignable to type 'string'. */
            alt={imgAlt || undefined}
            cropped
            url={imgUrl}
          />
        </Link>
      )}

      <div className={styles.Details}>
        <Icon
          addClass={styles.Hat}
          iconsOverride={gaultMillauIcons}
          type={
            (rating >= MIN_RATING && `IconPoints${rating}`) || 'IconNoPoints'
          }
        />
        <p className={styles.Category}>{category}</p>
        <h3 className={styles.Name}>
          <Link
            className={styles.NameLink}
            path={path}
            routed={true}
            label={name}
          />
        </h3>
        {secondaryName && (
          <p className={classNames(styles.SecondaryName, styles.Text)}>
            {secondaryName}
          </p>
        )}
        <address className={styles.Address}>
          <span className={styles.Text}>{address}</span>
          <span className={styles.Text}>{`${zip} ${city}`}</span>
          <span className={styles.Text}>{tel}</span>
        </address>
        <div className={styles.Meta}>
          <a href={getTelLink(tel)}>
            <Icon
              addClass={styles.Icon}
              iconsOverride={gaultMillauIcons}
              type="IconPhone"
            />
          </a>
          <a href={`mailto:${email}`}>
            <Icon
              addClass={styles.Icon}
              type="IconEnvelope"
              iconsOverride={gaultMillauIcons}
            />
          </a>
          <Link path={getGoogleMapsLink({ name, address, city, zip })}>
            <Icon
              addClass={styles.Icon}
              iconsOverride={gaultMillauIcons}
              type="IconLocation"
            />
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default MarkerOverlay;
