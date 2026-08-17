import React, { Component, ReactElement } from 'react';
import TestFragment from '../../../shared/tests/components/TestFragment';
import type {
  AlphabeticNavigationFactoryOptions,
  AlphabeticNavigationFactoryOptionsStyles,
  AlphabeticNavigationProps,
} from './typings';

type AlphabeticNavigationState = {
  isNavigationOpen: boolean;
};

const defaultStyles: AlphabeticNavigationFactoryOptionsStyles = {
  AlphabetWrapper: '',
  AlphabetInnerWrapper: '',
  AlphabetOuterWrapper: '',
  MobileToggle: '',
  MobileToggleWrapper: '',
  MobileToggleInnerWrapper: '',
};

const AlphabeticNavigationFactory = ({
  Alphabet: appAlphabet,
  AlphabetOverlay,
  MobileToggleContent: appMobileToggleContent,
  styles: appStyles,
}: AlphabeticNavigationFactoryOptions) => {
  class AlphabeticNavigation extends Component<
    AlphabeticNavigationProps,
    AlphabeticNavigationState
  > {
    constructor(props: AlphabeticNavigationProps) {
      super(props);

      this.state = {
        isNavigationOpen: false,
      };
    }

    toggleMobileNavigation = (): void => {
      const { isNavigationOpen }: AlphabeticNavigationState = this.state;

      this.setState({ isNavigationOpen: !isNavigationOpen });
    };

    getStyles(): AlphabeticNavigationFactoryOptionsStyles {
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

    getMobileToggleContent(): ReactElement | string | null {
      return (
        (typeof appMobileToggleContent === 'function' &&
          appMobileToggleContent(
            this.props.activeLetter,
            this.state.isNavigationOpen,
          )) ||
        ((typeof appMobileToggleContent === 'object' ||
          typeof appMobileToggleContent === 'string') &&
          appMobileToggleContent) ||
        null
      );
    }

    render(): ReactElement {
      const { isNavigationOpen }: AlphabeticNavigationState = this.state;
      const { enableOverlay }: AlphabeticNavigationProps = this.props;
      const styles: AlphabeticNavigationFactoryOptionsStyles = this.getStyles();
      const MobileToggleContent: ReactElement | string | null =
        this.getMobileToggleContent();

      return (
        <div className={styles.AlphabetWrapper} data-testid="wrapper">
          <div className={styles.AlphabetOuterWrapper}>
            <div
              className={styles.AlphabetInnerWrapper}
              data-testid="alphabet-wrapper"
            >
              {this.getAlphabet()}
            </div>
          </div>

          {enableOverlay && (
            <>
              <div className={styles.MobileToggleWrapper}>
                <div className={styles.MobileToggleInnerWrapper}>
                  <button
                    onClick={this.toggleMobileNavigation}
                    className={styles.MobileToggle}
                    data-testid="toggle-button"
                    aria-label="Overlay togglen"
                  >
                    {MobileToggleContent ? MobileToggleContent : 'A - Z'}
                  </button>
                </div>
              </div>

              <TestFragment data-testid="overlay-wrapper">
                <AlphabetOverlay
                  isNavigationOpen={isNavigationOpen}
                  toggleMobileNavigation={this.toggleMobileNavigation}
                  {...this.props}
                />
              </TestFragment>
            </>
          )}
        </div>
      );
    }
  }

  return AlphabeticNavigation;
};

export default AlphabeticNavigationFactory;
