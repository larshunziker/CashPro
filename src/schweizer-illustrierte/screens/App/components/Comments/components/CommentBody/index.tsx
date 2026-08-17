/* istanbul ignore file */

import React, { ReactElement } from 'react';
import commentBodyFactory from '../../../../../../../common/components/Comments/components/CommentBody/factory';
import {
  TIME_ELAPSED_FORMAT_LONG,
  getFormattedElapsedDate,
} from '../../../../../../../shared/helpers/dateTimeElapsed';
import Picture from '../../../../../../../common/components/Picture';
import Logo from '../../../Logo';
import {
  COMMENT_REDAKTION_SI,
  COMMENT_REDAKTION_STYLE,
} from '../../../../../../../shared/constants/comments';
import { PUBLICATION_SI } from '../../../../../../../shared/constants/publications';
import styles from './styles.legacy.css';
import logoSY from 'graphics/styleLogo.svg';

/* @ts-ignore TODO: TS7031 ->  Binding element 'name' implicitly has an 'any' type. */
const getAccountLogoByProps = ({ name }): ReactElement => {
  if (name === COMMENT_REDAKTION_STYLE) {
    return (
      <div className={styles.AccountNameWrapper}>
        <div className={styles.LogoWrapperSY}>
          <Picture url={logoSY} className={styles.LogoSY} alt="Style Logo" />
        </div>
        <span className={styles.AccountNameSY}>Redaktion</span>
      </div>
    );
  }
  return (
    <div className={styles.AccountNameWrapper}>
      <div className={styles.LogoWrapper}>
        <Logo publication={PUBLICATION_SI} />
      </div>
      <span className={styles.AccountName}>Redaktion</span>
    </div>
  );
};

export default commentBodyFactory({
  publicationAccountName: `${COMMENT_REDAKTION_SI}|${COMMENT_REDAKTION_STYLE}`,
  logo: Logo({ publication: PUBLICATION_SI }),
  logoAlt: 'Schweizer Illustrierte logo',
  accountLogo: getAccountLogoByProps,
  getFormattedElapsedDate,
  elapsedDateFormat: TIME_ELAPSED_FORMAT_LONG,
  styles: {
    Body: styles.Body,
    Date: styles.Date,
    Logo: styles.LogoSY,
    Name: styles.Name,
    Text: styles.Text,
  },
});
