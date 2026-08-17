import React, { useEffect, useState } from 'react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import { useQuery } from '@apollo/client';
import { ensureTeaserInterface } from '../Teaser/shared/helpers';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../common/components/Link';
import ExpansionPanel from '../ExpansionPanel';
import Icon from '../Icon';
import TeaserGrid from '../TeaserGrid';
import { ORGANIZATION_CONTENT_TYPE } from '../../../../../shared/constants/content';
import {
  GLOBAL_SEARCH_SORT_BY_RANDOM,
  GLOBAL_SEARCH_SORT_DESC,
} from '../../../../shared/constants/globalSearch';
import {
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
  URL_DE_POP_RESTAURANTS,
  URL_FR_POP_RESTAURANTS,
} from '../../constants';
import {
  DE_CITY_FILTER_LIST,
  FR_CITY_FILTER_LIST,
} from '../../screens/PopRestaurants/constants';
import { GRID_LAYOUT_TEASER_3X3 } from '../TeaserGrid/gridConfigs/constants';
import { ORIGIN_POPSTAGE } from './constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { GET_POP_STAGE_RESTAURANTS } from './queries';
import gaultMillauIcons from '../../assets/styles/gaultMillau.legacy.css';
import sections from '../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import PopIcon from 'graphics/gm_pop_ico_60.svg';

const DE_CITY_FILTER_LIST_POP_STAGE = [...DE_CITY_FILTER_LIST];
DE_CITY_FILTER_LIST_POP_STAGE.shift();

const FR_CITY_FILTER_LIST_POP_STAGE = [...FR_CITY_FILTER_LIST];
FR_CITY_FILTER_LIST_POP_STAGE.shift();

const SEARCH_FILTER = ORGANIZATION_CONTENT_TYPE;
const SEARCH_ORGANIZATION_TYPE = 'Pop';

export const popStageMsgs = defineMessages({
  popLead: {
    id: 'app.popStage.lead',
    description: 'Pop Stage lead visible on top of component',
    defaultMessage:
      'Der neue Trend-Guide: Restaurants und Bars, die nicht zwingend im GaultMillau punkten. Aber ein lifestyliges Publikum begeistern.',
  },
  dropdown: {
    id: 'app.popStage.dropdown',
    description: 'Pop Stage lead visible on top of component',
    defaultMessage: 'Stadt wählen',
  },
  more: {
    id: 'app.popStage.more',
    description: 'Pop Stage lead visible on top of component',
    defaultMessage: 'Alle anzeigen',
  },
});

/* @ts-ignore TODO: TS7031 ->  Binding element 'popCity' implicitly has an 'any' type. */
export const Cities = ({ popCity }) => {
  return (
    <li key={`city-index-${popCity.label}`} className={styles.CityLink}>
      <Link path={popCity.url} label={popCity.label} />
    </li>
  );
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'language' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'intl' implicitly has an 'any' type. */
const PopStage = ({ language, intl }) => {
  const { data } = useQuery(GET_POP_STAGE_RESTAURANTS, {
    variables: {
      query: '',
      pageSize: 12, //overfetch teasers due to random AC -> since we only show 3 teasers, this will lead to an "random-effect"
      offset: 0,
      sort: GLOBAL_SEARCH_SORT_BY_RANDOM,
      sortOrder: GLOBAL_SEARCH_SORT_DESC,
      path: language === 'fr' ? URL_FR_POP_RESTAURANTS : URL_DE_POP_RESTAURANTS,
      publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
      language: language || '',
      popCity: 'All',
      organizationType: SEARCH_ORGANIZATION_TYPE,
      filter: SEARCH_FILTER,
    },
  });
  const searchResult = data?.environment?.globalSearch?.edges || [];

  const [teasers, setTeasers] = useState([]);

  useEffect(() => {
    if (teasers.length === 0 && data?.environment?.globalSearch?.edges) {
      const searchResult = data?.environment?.globalSearch?.edges || [];
      const shuffledTeasers = searchResult.sort(
        () => Math.random() - 0.5, // random re-sort of the 12 fetched teasers
      );

      setTeasers(shuffledTeasers);
    }
  }, [data, teasers]);

  return (
    <div className={styles.Wrapper} data-testid="pop-stage-wrapper">
      <Link
        path={
          language === 'fr' ? URL_FR_POP_RESTAURANTS : URL_DE_POP_RESTAURANTS
        }
      >
        <img src={PopIcon} className={styles.PopIcon} alt="Gault Millau POP!" />
      </Link>
      <Link
        path={
          language === 'fr' ? URL_FR_POP_RESTAURANTS : URL_DE_POP_RESTAURANTS
        }
      >
        <p className={styles.PopStageTitle}>Gault Millau POP!</p>
      </Link>
      <p className={styles.PopStageLead}>
        {intl.formatMessage(popStageMsgs.popLead)}
      </p>
      <div className={styles.DropdownWrapper}>
        <ExpansionPanel
          title={intl.formatMessage(popStageMsgs.dropdown)}
          origin={ORIGIN_POPSTAGE}
          boldTitle={true}
        >
          <ul className={styles.CityLinkWrapper}>
            {(language === 'fr'
              ? FR_CITY_FILTER_LIST_POP_STAGE
              : DE_CITY_FILTER_LIST_POP_STAGE
            ).map((item, index) => (
              <Cities key={`cities-key-${index}`} popCity={item} />
            ))}
          </ul>
        </ExpansionPanel>
      </div>
      {(Array.isArray(data?.environment?.globalSearch?.edges) &&
        (data?.environment?.globalSearch?.edges?.length || 0) > 0 &&
        searchResult && (
          <div>
            {/* This TeaseGrid is a Placeholder. Should the PopStage be used again, update it with the correct data. */}
            <span>say whaaaat</span>
            <TeaserGrid
              items={ensureTeaserInterface(searchResult)}
              layout={GRID_LAYOUT_TEASER_3X3}
            />
          </div>
        )) || (
        <div className={sections.Container}>
          <FormattedMessage
            id="app.poprestaurants.nothingfound"
            description="The text displayed if there are no restaurant found"
            defaultMessage="Keine Restaurants gefunden"
          />
        </div>
      )}
      <div className={styles.PopOverviewWrapper}>
        <Link
          path={
            language === 'fr' ? URL_FR_POP_RESTAURANTS : URL_DE_POP_RESTAURANTS
          }
          className={styles.ActionLink}
        >
          <Icon
            type="IconSlash"
            addClass={styles.Icon}
            iconsOverride={gaultMillauIcons}
          />
          <div className={styles.LinkText}>
            {intl.formatMessage(popStageMsgs.more)}
          </div>
        </Link>
      </div>
    </div>
  );
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

export default compose<any, any>(
  connect(mapStateToProps),
  injectIntl,
)(PopStage);
