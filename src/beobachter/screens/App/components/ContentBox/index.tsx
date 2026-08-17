import React, { ReactElement } from 'react';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../../shared/decorators/componentSwitch'. '/Users/bhs/code/work/ */
import createComponentSwitch from '../../../../../shared/decorators/componentSwitch';
import contentBoxFactory from '../../../../../common/components/ContentBox/factory';
import TeaserRenderer from './components/TeaserRenderer';
import { noop } from '../../../../../shared/helpers/utils';
import Skeleton from '../Teaser/components/TeaserTextContentBox/components/Skeleton';
import {
  CONTENT_SOURCE_MANUAL,
  CONTENT_SOURCE_MANUAL_RANDOM,
  CONTENT_SOURCE_MOST_COMMENTED,
  CONTENT_SOURCE_MOST_READ,
  CONTENT_SOURCE_MOST_SHARED,
} from '../../../../../shared/constants/content';
import { DEFAULT_PUBLICATION } from '../../constants';
import styles from './styles.legacy.css';
import { ContentBoxProps } from '../../../../../common/components/ContentBox/typings';

const generateContentBox = (contentBoxType: string) =>
  contentBoxFactory({
    styles: {
      Wrapper: styles.Wrapper,
      Title: styles.Title,
    },
    /* istanbul ignore next */
    TeaserGridRenderer: () => TeaserRenderer,
    /* @ts-ignore TODO: TS2322 ->  Type '() => null' is not assignable to type '(pageSize */
    getContentBoxRowGridOptions: noop,
    /* @ts-ignore TODO: TS2322 ->  Type 'null' is not assignable to type 'string'. */
    teaserLayout: null,
    Skeleton,
    publication: DEFAULT_PUBLICATION,
    contentBoxType,
    /* @ts-ignore TODO: TS2322 ->  Type '({ node } */
    title: ({ node }) => node.title,
  });

const Switch = createComponentSwitch({
  [CONTENT_SOURCE_MANUAL]: generateContentBox(CONTENT_SOURCE_MANUAL),
  [CONTENT_SOURCE_MANUAL_RANDOM]: generateContentBox(
    CONTENT_SOURCE_MANUAL_RANDOM,
  ),
  [CONTENT_SOURCE_MOST_READ]: generateContentBox(CONTENT_SOURCE_MOST_READ),
  [CONTENT_SOURCE_MOST_COMMENTED]: generateContentBox(
    CONTENT_SOURCE_MOST_COMMENTED,
  ),
  [CONTENT_SOURCE_MOST_SHARED]: generateContentBox(CONTENT_SOURCE_MOST_SHARED),
});

const ContentBox = ({ component, node }: ContentBoxProps): ReactElement => {
  return <Switch component={component} node={node} />;
};

export default ContentBox;
