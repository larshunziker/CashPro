import React from 'react';
import { FormattedMessage } from 'react-intl';
import { getTelLink } from '../../../../../../../../../../../../../../src/shared/helpers/format';
import { getGoogleMapsLink } from '../../../../../../../RestaurantsMapLazy/helpers';
import Link from '../../../../../../../../../../../../../common/components/Link';
import Icon from '../../../../../../../../../../components/Icon';
import { MIN_RATING } from '../../../../../../../RestaurantsMapLazy/constants';
import gaultMillauIcons from '../../../../../../../../../../assets/styles/gaultMillau.legacy.css';
import styles from './styles.legacy.css';
import { RestaurantsCardProps } from './typings';

const RestaurantsCard = ({
  address,
  category = 'Restaurant',
  city,
  name,
  secondaryName,
  path,
  distance,
  rating,
  tel,
  zip,
  setActive,
}: RestaurantsCardProps) => (
  <div className={styles.Card}>
    <div className={styles.Inner}>
      <div className={styles.Rating}>
        <Icon
          addClass={styles.RatingIcon}
          type={
            (rating >= MIN_RATING && `IconPoints${rating}`) || 'IconNoPoints'
          }
          iconsOverride={gaultMillauIcons}
        />
      </div>

      <div className={styles.Details}>
        <Link className={styles.NameLink} path={path} routed={true}>
          <p className={styles.Category}>{category}</p>
          <h3 className={styles.Name}>{name}</h3>
          {secondaryName && <p className={styles.Text}>{secondaryName}</p>}
          <address>
            <span className={styles.Text}>{address}</span>
            <span className={styles.Text}>{`${zip} ${city}`}</span>
            {distance && (
              <span className={styles.Text}>{`${distance.toFixed(2)} km`}</span>
            )}
          </address>
        </Link>
      </div>

      <div className={styles.Meta}>
        <a href={getTelLink(tel)} className={styles.IconLinkPhone}>
          <Icon
            addClass={styles.Icon}
            iconsOverride={gaultMillauIcons}
            type="IconPhone"
          />
        </a>

        <button className={styles.IconLink} onClick={setActive}>
          <Icon
            addClass={styles.Icon}
            iconsOverride={gaultMillauIcons}
            type="IconLocator"
          />
          <span className={styles.IconLinkText}>
            <FormattedMessage
              id="app.map.card.map"
              description="Map icon text"
              defaultMessage="Karte"
            />
          </span>
        </button>
        <Link
          path={getGoogleMapsLink({ name, address, city, zip })}
          className={styles.IconLinkLocation}
        >
          <Icon
            addClass={styles.Icon}
            type="IconLocation"
            iconsOverride={gaultMillauIcons}
          />
        </Link>
      </div>
    </div>
  </div>
);

export default RestaurantsCard;
