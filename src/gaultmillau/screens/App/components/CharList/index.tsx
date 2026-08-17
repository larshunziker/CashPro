import React, { ReactElement, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import settingsStateSelector from '../../../../shared/selectors/settingsStateSelector';
import Link from '../../../../../common/components/Link';
import { DEFAULT_LANGUAGE } from '../Navigation/components/LanguageSwitch';
import styles from './styles.legacy.css';
import { CharListProps } from './typings';

type CharListPropsInner = CharListProps & {
  renderLinks: () => ReactElement;
  clickHandler: (event: SyntheticEvent) => void;
  language: string;
  insideClickHandler: (event: SyntheticEvent) => void;
};

type LinksProps = {
  props: CharListPropsInner;
  char: string;
};

export const LAYOUT_MAIN = 'main';

const links: Array<string> = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  .toLowerCase()
  .split('');

/*
 * Alphabetical Navigation Menu
 */
const CharList = ({ layout, renderLinks }: CharListPropsInner) => (
  <div className="charlist-navigation">
    <nav
      className={classNames({
        [styles.Wrapper]: layout === LAYOUT_MAIN,
        [styles.MobileWrapper]: layout !== LAYOUT_MAIN,
      })}
    >
      {links.map(renderLinks)}
    </nav>
  </div>
);

/* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
export const mapStateToProps = (state) => ({
  language: settingsStateSelector(state).language,
});

const LinkItem = ({ props, char }: LinksProps): ReactElement => {
  if (!props || !props.link) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  const language = props.language || DEFAULT_LANGUAGE;
  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Object'. */
  const prefix: string = (props.link && props.link[language]) || '';

  if (!prefix) {
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'ReactElement<any, string | JSXElementConstructor<any>>'. */
    return null;
  }

  return (
    <Link
      path={`${prefix}${char}`}
      className={classNames(styles.Link, {
        [styles.LinkActive]:
          (props.activeItem && props.activeItem.toLowerCase()) === char,
      })}
      onClick={props.insideClickHandler}
      label={char.toUpperCase()}
    />
  );
};

const extendWithLinksHandlers = withHandlers({
  insideClickHandler:
    (props: CharListPropsInner) => (event: SyntheticEvent) => {
      if (props.clickHandler) {
        props.clickHandler(event);
      }
    },
});

const extendWithHandlers = withHandlers({
  renderLinks: (props: CharListPropsInner) => (char: string) => (
    <LinkItem props={props} char={char} key={`links-char-key-${char}`} />
  ),
});

export default compose<any, any>(
  connect(mapStateToProps),
  extendWithLinksHandlers,
  extendWithHandlers,
)(CharList);
