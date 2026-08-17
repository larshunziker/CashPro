import React, {
  createRef,
  PureComponent,
  ReactElement,
  RefObject,
} from 'react';
import classNames from 'classnames';
import grid from '../../../../../common/assets/styles/grid.legacy.css';
import type {
  AlphabetOverlayFactoryOptions,
  AlphabetOverlayFactoryOptionsStyles,
  AlphabetOverlayProps,
} from './typings';

const defaultStyles: AlphabetOverlayFactoryOptionsStyles = {
  GridRow: '',
  GridColumns: '',
  MobileMenu: '',
  MobileMenuOpen: '',
  MobileCloseIconWrapper: '',
  MobileMenuInner: '',
  Wrapper: '',
};

const AlphabetOverlayFactory = ({
  Alphabet: appAlphabet,
  CloseIcon,
  styles: appStyles,
}: AlphabetOverlayFactoryOptions) => {
  class AlphabetOverlay extends PureComponent<AlphabetOverlayProps> {
    mobileMenuRef: RefObject<HTMLDivElement>;

    constructor(props: AlphabetOverlayProps) {
      super(props);

      this.mobileMenuRef = createRef();
      this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    static shouldUpdate(
      props: AlphabetOverlayProps,
      nextProps: AlphabetOverlayProps,
    ): boolean {
      return props.isNavigationOpen !== nextProps.isNavigationOpen;
    }

    getStyles(): AlphabetOverlayFactoryOptionsStyles {
      return (
        (typeof appStyles === 'function' && appStyles(this.props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles
      );
    }

    getAlphabet(): ReactElement | null {
      return (
        (typeof appAlphabet === 'function' && appAlphabet(this.props)) ||
        (typeof appAlphabet === 'object' && appAlphabet) ||
        null
      );
    }

    componentDidMount() {
      if (this.props?.closeOnOutsideClick) {
        document.addEventListener('mousedown', this.handleClickOutside);
      }
    }

    componentWillUnmount() {
      if (this.props?.closeOnOutsideClick) {
        document.removeEventListener('mousedown', this.handleClickOutside);
      }
    }

    /* @ts-ignore TODO: TS7006 ->  Parameter 'event' implicitly has an 'any' type. */
    handleClickOutside(event) {
      if (
        this.props.isNavigationOpen &&
        this.mobileMenuRef &&
        /* @ts-ignore TODO: TS2531 ->  Object is possibly 'null'. */
        !this.mobileMenuRef.current.contains(event.target)
      ) {
        /* @ts-ignore TODO: TS2722 ->  Cannot invoke an object which is possibly 'undefined'. */
        this.props.toggleMobileNavigation(event);
      }
    }

    render(): ReactElement | null {
      const { isNavigationOpen, toggleMobileNavigation }: AlphabetOverlayProps =
        this.props;

      const styles: AlphabetOverlayFactoryOptionsStyles = this.getStyles();

      return (
        <nav
          className={classNames(styles.Wrapper, grid.HiddenSmUp)}
          data-testid="wrapper"
        >
          <div
            className={classNames(styles.MobileMenu, {
              [styles.MobileMenuOpen]: isNavigationOpen,
            })}
            ref={this.mobileMenuRef}
            onClick={toggleMobileNavigation}
            role="presentation"
            data-testid="mobile-menu"
          >
            <div className={styles.MobileCloseIconWrapper}>{CloseIcon}</div>
            <div className={styles.MobileMenuInner}>
              <div className={styles.GridRow}>
                <div
                  className={styles.GridColumns}
                  data-testid="alphabet-wrapper"
                >
                  {this.getAlphabet()}
                </div>
              </div>
            </div>
          </div>
        </nav>
      );
    }
  }

  return AlphabetOverlay;
};

export default AlphabetOverlayFactory;
