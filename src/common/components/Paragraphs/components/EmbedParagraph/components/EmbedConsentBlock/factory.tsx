import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { noop } from '../../../../../../../shared/helpers/utils';
import Link from '../../../../../Link';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import {
  EmbedConsentBlockFactoryOptions,
  EmbedConsentBlockFactoryOptionsStyles,
  EmbedConsentBlockProps,
} from './typings';

type EmbedConsentBlockPropsInner = EmbedConsentBlockProps;
const defaultStyles = {
  Wrapper: '',
  Title: '',
  Link: '',
  Lead: '',
  Container: '',
  LinkWrapper: '',
};

const EmbedConsentBlockFactory = ({
  styles: appStyles,
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '(props */
  Button: ButtonWithLoading = noop,
  consentBlockContent,
}: EmbedConsentBlockFactoryOptions) => {
  const EmbedConsentBlock = (
    props: EmbedConsentBlockPropsInner,
  ): ReactElement => {
    const styles: EmbedConsentBlockFactoryOptionsStyles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const toggleConsentInfoDisplay = () => {
      if (window.toggleConsentInfoDisplay) {
        window.toggleConsentInfoDisplay();
      }
    };

    const setConsentForAll = () => {
      if (typeof window.setOneTrustConsentForAll === 'function') {
        window.setOneTrustConsentForAll();
      }
    };

    const button = (
      <ButtonWithLoading clickHandler={setConsentForAll} {...props} />
    );

    // Language switch
    const consentBlockData =
      /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'ConsentBlockConte */
      (props.language && consentBlockContent[props.language]) ||
      consentBlockContent;

    return (
      <div
        data-testid="embed-consent-block-wrapper"
        className={classNames(styles.Wrapper, grid.HideForPrint)}
      >
        <div className={styles.Container}>
          <div className={styles.Title}>{consentBlockData.title}</div>
          <p className={styles.Lead}>{consentBlockData.leadContent}</p>
          <div>
            {button}
            <div className={styles.LinkWrapper}>
              <Link
                className={styles.Link}
                label={consentBlockData.linkLabel}
                onClick={toggleConsentInfoDisplay}
              ></Link>
            </div>
          </div>
        </div>
      </div>
    );
  };
  return EmbedConsentBlock;
};

export default EmbedConsentBlockFactory;
