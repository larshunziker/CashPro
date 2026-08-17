import React from 'react';
import { FormattedMessage } from 'react-intl';
import compose from 'recompose/compose';
import classname from 'classnames';
import { EXTRACT_DATA_FROM_PATH } from '../../../../../../../../src/shared/helpers/extractDataFromPropsByConfigMap';
import parseTrackingData from '../../../../../../../../src/shared/helpers/parseTrackingData';
import withParams from '../../../../../../../../src/shared/decorators/withParams';
import withAppNexus from '../../../../../../shared/decorators/withAppNexus';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import Link from '../../../../../../../common/components/Link';
import CharList from '../../../../components/CharList';
import StarchefsHeader from '../../components/Header';
import PersonListItems from '../../components/PersonListItems';
import { ROOT_SCHEMA_TYPE_WEB_PAGE } from '../../../../../../../shared/constants/structuredData';
import {
  DEFAULT_PERSON_HOME_DE,
  DEFAULT_PERSON_HOME_FR,
} from '../../../../../App/constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import sections from '../../../../assets/styles/sections.legacy.css';
import styles from './styles.legacy.css';
import { PersonListProps } from './typings';

const PersonList = ({
  data,
  language,
  char = 'A',
  loading,
}: PersonListProps) => {
  if (!data || loading) {
    return null;
  }

  return (
    <div className="person-detail">
      <div className={styles.Header}>
        <StarchefsHeader />
      </div>
      <div className={sections.Container}>
        <div className={grid.Row}>
          <div className={grid.ColXs24}>
            <div className={styles.CharlistWrapper}>
              <Link
                className={classname(
                  styles.OverviewLink,
                  styles.HiddenOnTablet,
                )}
                path={`/${
                  language === 'fr'
                    ? DEFAULT_PERSON_HOME_FR
                    : DEFAULT_PERSON_HOME_DE
                }`}
              >
                <FormattedMessage
                  id="app.person.home"
                  description="Link to the home of starchefs"
                  defaultMessage="Übersicht"
                />
              </Link>
              <CharList
                activeItem={char}
                link={{
                  de: `/${DEFAULT_PERSON_HOME_DE}/list/`,
                  fr: `/${DEFAULT_PERSON_HOME_FR}/list/`,
                }}
              />
            </div>
            <div
              className={classname(styles.Divider, styles.HiddenOnTabletOnly)}
            />
            <h1 className={styles.TitleChar}>{char.toUpperCase()}</h1>
            {(data?.environment?.personByChar &&
              data?.environment?.personByChar.edges &&
              data?.environment?.personByChar.edges.length > 0 && (
                <PersonListItems
                  list={data?.environment?.personByChar}
                  language={language}
                />
              )) || (
              <div className={styles.NoKeywordsTextWrapper}>
                <FormattedMessage
                  id="app.keyword.noPersonToChar"
                  description="Text, if there is no keyword found to a char"
                  defaultMessage="Keine Starchefs mit diesem Buchstaben vorhanden"
                />
              </div>
            )}

            <div className={styles.FooterLinkWrapper}>
              <Link
                className={styles.OverviewLink}
                path={`/${
                  language === 'fr'
                    ? DEFAULT_PERSON_HOME_FR
                    : DEFAULT_PERSON_HOME_DE
                }`}
              >
                <FormattedMessage
                  id="app.person.backhome"
                  description="Backlink to the home of starchefs"
                  defaultMessage="Zurück zur Übersicht"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
const getFallbackUri = (language: string, node: any) =>
  `${language === 'fr' ? '/fr/search/' : '/suche/'}${encodeURIComponent(
    node.lastName || '',
  )}`.toLowerCase();

export default compose<any, any>(
  withParams,
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => ({
      title: `${mapProps.language === 'fr' ? 'Les Chefs' : 'Starchefs'} ${
        mapProps.char || 'A'
      }`,
      metaDescription: `${
        mapProps.language === 'fr' ? 'Les Chefs Enquête' : 'Starchefs Übersicht'
      }`,
    }),
    rootSchemaType: ROOT_SCHEMA_TYPE_WEB_PAGE,
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNodes: (mapProps) =>
      mapProps.data?.environment?.personByChar?.edges?.map(({ node }: any) => ({
        node: {
          ...node,
          preferredUri: getFallbackUri(mapProps.language, node),
        },
      })),
    hasBreadcrumbs: () => false,
  }),
  withAppNexus({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
    parseTrackingData: (props) =>
      parseTrackingData({
        ...props,
        articleType: 'LandingPage',
        subsection: {
          type: EXTRACT_DATA_FROM_PATH,
          value: ['props.char'],
        },
      }),
  }),
)(PersonList);
