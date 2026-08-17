import React, { FC, ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import cssClassByChannel from '../../../../../../shared/helpers/cssClassByChannel';
import settingsStateSelector from '../../../../../../shared/selectors/settingsStateSelector';
import RefetchGqlDataLink from '../../../RefetchGqlDataLink';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { ActiveMainChannel } from '../../../../../../shared/types';
import {
  MainLinksProps,
  NavigationBarComponent,
  NavigationProps,
} from './typings';

type NavigationPropsInner = NavigationProps & {
  activeMainChannel: ActiveMainChannel;
};

const MainLinks: FC<MainLinksProps> = ({
  menuLinks,
  activeMainChannel,
  hasStickiness,
}) => {
  const getThemedClass = cssClassByChannel(styles, activeMainChannel);

  return (
    <>
      {menuLinks
        .filter(({ node }) => node?.link?.isMainChannel)
        .map(({ node }, index) => {
          return (
            <li
              key={`navigation-menu-item-${index}-${activeMainChannel}`}
              className={classNames(styles.ListItem, {
                [styles.Active]:
                  hasStickiness &&
                  node?.link?.label === activeMainChannel?.replace(/\s/g, ''),
              })}
              data-testid={`navigation-menu-item-${index}`}
            >
              <RefetchGqlDataLink
                path={node?.link?.path || ''}
                className={getThemedClass('Link')}
              >
                <span>{node?.link?.label || ''}</span>
              </RefetchGqlDataLink>
            </li>
          );
        })}
    </>
  );
};

const NavigationBar: NavigationBarComponent = ({
  menuLinks,
  activeMainChannel,
  hasStickiness = true,
}: NavigationPropsInner): ReactElement | null => {
  if (!menuLinks || !Array.isArray(menuLinks) || menuLinks.length === 0) {
    return null;
  }

  return (
    <nav
      className={classNames(styles.Navigation, grid.HideForPrint)}
      data-testid="navigation-container"
    >
      <ul className={styles.List}>
        <MainLinks
          menuLinks={menuLinks}
          activeMainChannel={activeMainChannel}
          hasStickiness={hasStickiness}
        />
      </ul>
    </nav>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state)
    .activeMainChannel as ActiveMainChannel,
});

export default connect(mapStateToProps)(NavigationBar);
