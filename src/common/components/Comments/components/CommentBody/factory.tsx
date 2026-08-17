import React, { ReactElement } from 'react';
import TestFragment from '../../../../../shared/tests/components/TestFragment';
import { DATE_FORMAT_FULL } from '../../../../../shared/helpers/dateTimeElapsed';
import { noop } from '../../../../../shared/helpers/utils';
import type { CommentProps } from '../Comment/typings';
import type {
  CommentBodyFactoryOptions,
  CommentBodyProps,
  CommentBodyComponent,
} from './typings';

type CommentBodyPropsInner = CommentBodyProps & CommentProps;

const CommentBodyFactory = ({
  publicationAccountName,
  /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '(props */
  accountLogo: getAccountLogoByProps = noop,
  logo,
  logoAlt,
  getFormattedElapsedDate,
  elapsedDateFormat,
  styles,
}: CommentBodyFactoryOptions): CommentBodyComponent => {
  const CommentBody = ({
    createDate,
    body,
    name,
  }: CommentBodyPropsInner): ReactElement => {
    const accountLogo = getAccountLogoByProps({
      name,
      logo,
      logoAlt,
    });

    const accountLogoJsx: ReactElement = accountLogo || (
      <img
        src={logo}
        className={styles.Logo}
        alt={logoAlt}
        data-testid="commentbody-logo-wrapper"
      />
    );
    const pattern = new RegExp(`^${publicationAccountName}$`);
    return (
      <div className={styles.Body} data-testid="commentbody-wrapper">
        <div className={styles.Name}>
          {!pattern.test(name) ? (
            <TestFragment data-testid="commentbody-name-wrapper">
              {name}
            </TestFragment>
          ) : (
            <>{accountLogoJsx}</>
          )}
        </div>

        <time className={styles.Date}>
          {createDate &&
            getFormattedElapsedDate &&
            typeof getFormattedElapsedDate === 'function' &&
            getFormattedElapsedDate({
              createDate,
              format: elapsedDateFormat,
              dateFormat: DATE_FORMAT_FULL,
            })}
        </time>
        <div
          className={styles.Text}
          dangerouslySetInnerHTML={{ __html: body }} // eslint-disable-line react/no-danger
        />
      </div>
    );
  };
  return CommentBody;
};

export default CommentBodyFactory;
