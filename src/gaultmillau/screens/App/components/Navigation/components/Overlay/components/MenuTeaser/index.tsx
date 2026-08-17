import React from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import shouldUpdate from 'recompose/shouldUpdate';
import { useQuery } from '@apollo/client';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import Teaser from '../../../../../Teaser';
import {
  GLOBAL_SEARCH_FILTER_ARTICLE,
  GLOBAL_SEARCH_SORT_BY_MODIFICATION_DATE,
} from '../../../../../../../../../shared/constants/globalSearch';
import { TEASER_LAYOUT_ML } from '../../../../../../../../../shared/constants/teaser';
import {
  ARTICLE_TYPE_BLOG_B,
  PUBLICATION_ID_DE,
  PUBLICATION_ID_FR,
} from '../../../../../../constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/App */
import { MENU_TEASER_QUERY } from './queries';

export type MenuTeaserPropsInner = {
  data: ApolloData & {
    menuTeaser: TeasableInterfaceGraphList;
  };
  language: string;
};

/* @ts-ignore TODO: TS7031 ->  Binding element 'language' implicitly has an 'any' type. */
const MenuTeaser = ({ language }) => {
  const { data } = useQuery(MENU_TEASER_QUERY, {
    variables: {
      query: '',
      filter: GLOBAL_SEARCH_FILTER_ARTICLE,
      articleType: ARTICLE_TYPE_BLOG_B,
      sort: GLOBAL_SEARCH_SORT_BY_MODIFICATION_DATE,
      publication: language === 'fr' ? PUBLICATION_ID_FR : PUBLICATION_ID_DE,
    },
  });

  const teaserData = data?.environment?.menuTeaser?.edges?.[0]?.node;

  if (!teaserData) {
    return null;
  }

  return (
    <div className="menu-teaser">
      <Teaser component={TEASER_LAYOUT_ML} {...teaserData} />
    </div>
  );
};

export const mapStateToProps = (state: Map<string, any>) => ({
  language: settingsStateSelector(state).language,
});

export const withUpdatePolicy = shouldUpdate<any>(
  (props: MenuTeaserPropsInner, nextProps: MenuTeaserPropsInner) =>
    props.data.loading !== nextProps.data.loading,
);

export default compose<any, any>(
  connect(mapStateToProps),
  withUpdatePolicy,
)(MenuTeaser);
