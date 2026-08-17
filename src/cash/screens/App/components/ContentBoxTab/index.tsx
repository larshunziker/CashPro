/* istanbul ignore file */

import React from 'react';
import ContentBoxTabFactory from '../../../../../common/components/ContentBoxTab/factory';
import Teaser from '../Teaser';
import ContentBoxBody from './components/ContentBoxBody';
import { FULLQUOTE_PAGE_TYPE } from '../../screens/FullquotePage/constants';
import { CONTENT_SOURCE_LATEST_NEWS_BY_VALORS } from './components/ContentBoxBody/constants';
import styles from './styles.legacy.css';

const getTitleByProps = ({ hideTitle, termReference, title }: ContentBox) =>
  !hideTitle ? title || (termReference as Channel)?.title : '';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const ContentBoxBodyRender = (props) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'element' implicitly has an 'any' type. */
  const hasChannel = props?.body.some((element) => element.termReference);
  let componentCopy = props.component;
  if (
    !hasChannel &&
    props.origin &&
    props.origin.indexOf(`${FULLQUOTE_PAGE_TYPE}-`) > -1
  ) {
    componentCopy = CONTENT_SOURCE_LATEST_NEWS_BY_VALORS;
  }
  return (
    <div>
      <ContentBoxBody {...props} component={componentCopy} />
    </div>
  );
};

const ContentBoxTab = ContentBoxTabFactory({
  styles: {
    Wrapper: styles.Wrapper,
    Title: styles.Title,
    Link: styles.ChannelLink,
    TabWrapper: styles.TabWrapper,
    TabTitleWrapper: styles.TabTitleWrapper,
    ActiveTab: styles.ActiveTab,
    TabTitle: styles.TabTitle,
  },
  ContentBoxBodyRenderer: () => ContentBoxBodyRender,
  SingleTeaser: Teaser,
  /* @ts-ignore TODO: TS2322 ->  Type '({ hideTitle, termReference, title } */
  title: getTitleByProps,
});

export default ContentBoxTab;
