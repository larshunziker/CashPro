import React from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../common/components/Link';
import Picture from '../../../../../../../common/components/Picture';
import Icon from '../../../Icon';
import { STYLE_1X1_160_PERSON } from '../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';
import { TeaserTeamMembersProps } from './typings';

const TeaserTeamMembers = ({
  person,
  shortTitle,
  title,
  addClass,
  position,
}: TeaserTeamMembersProps) => {
  const TeamMember = (
    <>
      {person?.teaserImage?.image?.file?.relativeOriginPath && (
        <Picture
          className={styles.Image}
          relativeOrigin={person?.teaserImage?.image?.file?.relativeOriginPath}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointX={person?.teaserImage?.image?.file?.focalPointX}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
          focalPointY={person?.teaserImage?.image?.file?.focalPointY}
          style_320={STYLE_1X1_160_PERSON}
          alt={shortTitle || ''}
          title={title || ''}
        />
      )}
      <div className={styles.TextWrapper}>
        <p className={styles.Title}>{title || ''}</p>
        <p className={styles.Link}>
          <span>
            {shortTitle || ''}
            &nbsp;
            <Icon type="IconArrowRight" addClass={styles.Icon} />
          </span>
        </p>
        <p className={styles.Position}>{position || ''}</p>
      </div>
    </>
  );

  return person?.hasArticles && person?.preferredUri ? (
    <Link
      path={person.preferredUri}
      className={classNames('teaser-team-members', { addClass: !!addClass })}
    >
      {TeamMember}
    </Link>
  ) : (
    TeamMember
  );
};

export default TeaserTeamMembers;
