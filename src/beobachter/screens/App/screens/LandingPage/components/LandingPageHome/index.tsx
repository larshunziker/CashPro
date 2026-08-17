import React, { ReactElement } from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import { getRestrictedClassName } from '../../../../../../../shared/helpers/withHelmet';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import withScrollToAnchor from '../../../../../../shared/decorators/withScrollToAnchor';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import { LANDING_PAGE_TYPE_HOME } from '../../../../../../../shared/constants/content';
import { ROOT_SCHEMA_TYPE_ORGANIZATION } from '../../../../../../../shared/constants/structuredData';
import { ENTITY_QUEUE_PARAGRAPH } from '../../../../../../../shared/constants/paragraphs';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../../assets/styles/variables.legacy.css'. '/Users/bhs/code/work/ra */
import variables from '../../../../assets/styles/variables.legacy.css';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { AppNexusFactoryProps } from '../../../../../../../common/components/AppNexus/typings';
import { LandingPageProps } from '../../typings';

type LandingPagePropsInner = LandingPageProps &
  Pick<AppNexusFactoryProps, 'isAdSuppressed'> & {};

const LandingPageHome = ({
  landingPage,
  isAdSuppressed,
}: LandingPagePropsInner): ReactElement | null => {
  if (!landingPage) {
    return null;
  }

  /* @ts-ignore TODO: TS7053 ->  Element implicitly has an 'any' type because expression of type '"__typename"' can't be used to index type 'ParagraphIn */
  const firstParagraphElement = landingPage.body?.[0]?.['__typename'];
  const showMarginTop = firstParagraphElement !== ENTITY_QUEUE_PARAGRAPH;

  return (
    <div
      className={classNames(`landing-page-home`, {
        [styles.Wrapper]: showMarginTop,
      })}
    >
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={landingPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={landingPage?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={landingPage?.cloneContentUri}
      />

      <div className={getRestrictedClassName(landingPage.__typename)}>
        <Paragraphs
          pageBody={landingPage.body}
          colStyle={grid.ColXs24}
          origin={LANDING_PAGE_TYPE_HOME}
          /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<boolean> | undefined' is not assignable to type 'boolean | undefined'. */
          isAdSuppressed={isAdSuppressed || landingPage?.channel?.suppressAds}
        />
      </div>
    </div>
  );
};

export default compose<any, any>(
  withScrollToAnchor({ offset: variables.pageScrollOffset }),
  withHelmet({
    getNode: (mapProps: LandingPagePropsInner) => mapProps.landingPage,
    rootSchemaType: ROOT_SCHEMA_TYPE_ORGANIZATION,
  }),
)(LandingPageHome);
