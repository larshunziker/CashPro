import React from 'react';
import { useQuery } from '@apollo/client';
import InView from '../../../../../../../../../common/components/InView';
import Error from '../../../../../Error';
import Paragraphs from '../../../../../Paragraphs';
import FallbackIntegration from './components/FallbackIntegration';
import { MENU_OVERLAY } from '../../../NavigationMenu/constants';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './queries'. '/Users/bhs/code/work/rasch-stack/src/cash/screens/App/compon */
import { NAVIGATION_MENU_ROUTE } from './queries';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7031 ->  Binding element 'menu' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7031 ->  Binding element 'activeLabel' implicitly has an 'any' type. */
const IntegrationComponent = ({ menu, activeLabel }) => {
  const { data, loading, error } = useQuery<
    Query & {
      loading: boolean;
      environment: { routeByPath: { object: LandingPage } };
    }
  >(NAVIGATION_MENU_ROUTE, {
    variables: {
      path: `cash-menu-${activeLabel}`,
      publication: 'CASH',
    },
    ssr: false,
  });

  if (loading) {
    return null;
  }

  if (
    !data?.environment?.routeByPath?.object ||
    !data?.environment?.routeByPath?.object.body
  ) {
    return <FallbackIntegration menu={menu} />;
  }
  if (error) {
    return __DEVELOPMENT__ ? (
      <Error msg={`Apollo <Query> component error: ${error}`} />
    ) : null;
  }

  return (
    <div className={styles.AdIntergration}>
      <div className={grid.Row}>
        <div className={grid.ColXs24}>
          <Paragraphs
            pageBody={data?.environment?.routeByPath?.object.body}
            origin={MENU_OVERLAY}
            hasContainer={false}
          />
        </div>
      </div>
    </div>
  );
};

const NavigationAdIntegration = ({
  menu,
  activeLabel,
}: {
  menu: MenuTreeItem;
  activeLabel: string;
}) => {
  return (
    /* @ts-ignore TODO: TS2532 ->  Object is possibly 'undefined'. */
    (menu?.subtree?.edges?.length < 3 && (
      <>
        {(menu?.subtree?.edges?.length === 1 && (
          <ul className={grid.ColMd6}></ul>
        )) ||
          null}
        <ul className={grid.ColMd12}>
          <InView
            config={{ rootMargin: '0px', threshold: 0, triggerOnce: false }}
          >
            {({ isInView }) =>
              isInView &&
              !__TESTING__ && (
                <IntegrationComponent menu={menu} activeLabel={activeLabel} />
              )
            }
          </InView>
        </ul>
      </>
    )) || <FallbackIntegration menu={menu} />
  );
};

export default NavigationAdIntegration;
