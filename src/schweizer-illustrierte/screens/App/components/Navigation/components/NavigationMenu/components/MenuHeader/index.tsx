import React, { Component, ReactElement } from 'react';
import classNames from 'classnames';
import Link from '../../../../../../../../../common/components/Link';
import Icon from '../../../../../Icon';
import Logo from '../../../../../Logo';
import SearchForm from '../../../../../SearchForm';
import { PUBLICATION_SI } from '../../../../../../../../../shared/constants/publications';
import grid from '../../../../../../../../../common/assets/styles/grid.legacy.css';
import helpers from '../../../../../../assets/styles/helpers.legacy.css';
import styles from './styles.legacy.css';
import { MenuHeaderProps } from './typings';

export type MenuHeaderPropsInner = MenuHeaderProps;

class MenuHeader extends Component<MenuHeaderPropsInner> {
  render(): ReactElement | null {
    const { menuCloseHandler } = this.props;

    if (!menuCloseHandler) {
      return null;
    }
    return (
      <div className={styles.Wrapper}>
        <div className={grid.Container}>
          <div className={helpers.PullOutSm}>
            <div className={styles.Header}>
              <div className={styles.Logo} data-testid="logo-wrapper">
                <Link path="/" onClick={menuCloseHandler}>
                  <div className={styles.LogoWrapper}>
                    <Logo publication={PUBLICATION_SI} />
                  </div>
                </Link>
              </div>
              <div className={styles.Content}>
                <span className={styles.HeaderMenuItems}>Menu</span>
              </div>

              <SearchForm
                menuCloseHandler={menuCloseHandler}
                minQueryLength={2}
                focusOnMount
              />
              <div className={styles.IconWrapper}>
                <button
                  /* @ts-ignore TODO: TS2322 ->  Type '(event */
                  onClick={menuCloseHandler}
                  className={classNames('track-menu', styles.MenuButton)}
                  data-track-action="close"
                  data-track-element="menu"
                  aria-label="Menu schliessen"
                >
                  <Icon type={'IconCloseButtonSimple'} addClass={styles.Icon} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MenuHeader;
