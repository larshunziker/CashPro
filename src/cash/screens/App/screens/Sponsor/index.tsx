import React from 'react';
import { useSelector } from 'react-redux';
import { getRestrictedClassName } from '../../../../../shared/helpers/withHelmet';
import locationStateSelector from '../../../../shared/selectors/locationStateSelector';
import withHelmet from '../../../../shared/decorators/withHelmet';
import Breadcrumbs from '../../components/Breadcrumbs';
import Paragraphs from '../../components/Paragraphs';
import StatusPage from '../StatusPage';
import sponsorImageFactory, {
  SPONSOR_IMAGE_POSITION_CENTER,
} from '../../components/SponsorImage';
import { ROOT_SCHEMA_TYPE_NEWS_ARTICLE } from '../../../../../shared/constants/structuredData';
import { SPONSOR_DEFAULT_TYPE } from './constants';
import styles from './styles.legacy.css';
import { SponsorProps } from './typings';

type SponsorPropsInner = SponsorProps;

const SponsorImage = sponsorImageFactory({
  position: SPONSOR_IMAGE_POSITION_CENTER,
});

const Sponsor = ({ sponsor }: SponsorPropsInner) => {
  const isHybridApp = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).isHybridApp,
  );
  if (!sponsor?.title) {
    return <StatusPage statusCode={404} />;
  }

  return (
    <div className={styles.Wrapper}>
      {(!isHybridApp && (
        <Breadcrumbs
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
          pageUrl={sponsor.preferredUri}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<ActiveMenuTrailItemConnection> | undefined' is not assignable to type 'BreadcrumbsItems | undefined'. */
          items={sponsor.activeMenuTrail}
        />
      )) ||
        null}

      <div className={styles.TeaserImageWrapper}>
        {sponsor && Object.keys(sponsor).length > 0 && (
          <SponsorImage sponsor={sponsor} />
        )}
      </div>

      <div className={getRestrictedClassName(sponsor.__typename)}>
        <Paragraphs pageBody={sponsor.body} origin={SPONSOR_DEFAULT_TYPE} />
      </div>
    </div>
  );
};

export default withHelmet({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
  getNode: (mapProps): Sponsor => mapProps.sponsor || null,
  rootSchemaType: ROOT_SCHEMA_TYPE_NEWS_ARTICLE,
})(Sponsor);
