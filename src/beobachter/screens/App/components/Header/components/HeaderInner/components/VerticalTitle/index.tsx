import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import headerStateSelector from '../../../../../../../../../shared/selectors/headerStateSelector';
import { VERTICAL_TITLES } from '../../../../../../../../shared/actions/route';
import Link from '../../../../../../../../../common/components/Link';
import styles from './styles.legacy.css';
import { VerticalTitleProps } from './typings';

type VerticalTitlePropsInner = VerticalTitleProps & {
  headerLink: string;
  headerTitle: string;
};

const VerticalTitle = (props: VerticalTitlePropsInner): ReactElement => {
  const verticalTitle: string | null =
    /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "vertical/consu */
    props.headerTitle || VERTICAL_TITLES[props.vertical] || null;

  if (!verticalTitle) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <Link
      path={
        props.headerLink ||
        /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type '{ "vertical/consu */
        '/' + changeVerticalToUri(VERTICAL_TITLES[props.vertical])
      }
      className={classNames(styles.VerticalLink, {
        [styles.Collapsed]: props.isCollapsed,
      })}
    >
      <span
        className={classNames(styles.Vertical, {
          [styles.VerticalCollapsed]: props.isCollapsed,
        })}
      >
        {verticalTitle}
      </span>
    </Link>
  );
};

const changeVerticalToUri = (verticalTitle = ''): string =>
  encodeURIComponent(verticalTitle.toLowerCase().trim().replace(/ /g, '-')) ||
  '';

const mapStateToProps = (state: Record<string, any>) => ({
  headerTitle: headerStateSelector(state).title,
  headerLink: headerStateSelector(state).link,
});

export default connect(mapStateToProps)(VerticalTitle);
