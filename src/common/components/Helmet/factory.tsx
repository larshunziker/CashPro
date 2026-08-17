/**
 * @file   Helmet factory
 * @author Naume Keculovski <naume.keculovski@ringieraxelspringer.ch>
 * @date   2019-09-26
 */

import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { connect } from 'react-redux';
import { replaceAll } from '../../../shared/helpers/replaceAll';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../../../shared/tests/helpers/index'. '/Users/bhs/code/work/rasch-stack/s */
import { testLog } from '../../../shared/tests/helpers/index';
import { RasHelmetFactoryOptions, RasHelmetProps } from './typings';

type RasHelmetPropsInner = RasHelmetProps & {
  locationState?: LocationState;
  locationPath?: string;
};

/*
 * replace the provided placeholder in a string with the provided value ( [url] => 'http://www.beobachter.ch' )
 */
const doReplace = (string: string, property: string, value: string): string =>
  replaceAll(replaceAll(string, '[' + property + ']', value), '  ', ' ');

/*
 * replace placeholders in a metatag with the values from props provided to helmet-component
 */
const replaceValues = (
  metaTag: any,
  values: Record<string, any>,
): Record<string, any> => {
  let metaValue: string = metaTag.content;

  for (const [key, value] of Object.entries(values)) {
    metaValue = doReplace(metaValue, key, value);
  }

  return {
    ...metaTag,
    content: metaValue,
  };
};

/*
 * iterate over metatags and fill them with provided values
 */
const populateMeta = (
  metaTags: Array<Record<string, any>>,
  values: Record<string, any>,
): Array<Record<string, any>> =>
  metaTags.map(
    (metaTag: Record<string, any>): Record<string, any> =>
      replaceValues(metaTag, values),
  );

/* @ts-ignore TODO: TS7006 ->  Parameter 'object' implicitly has an 'any' type. */
const hasValues = (object) => Object.values(object).some((value) => !!value);

const RasHelmetFactory = ({
  locationStateSelector,
  additionalMetaData,
  socialMetaTags,
}: RasHelmetFactoryOptions) => {
  const RasHelmet = (props: RasHelmetPropsInner) => {
    const {
      socialMetaValues: nodeSocialMetaValues = {},
      meta: nodeMeta = [],
      script: nodeScript = [],
      link: nodeLink = [],
      title: nodeTitle = '',
    } = props.node || {};

    const {
      socialMetaValues = {},
      meta = [],
      script = [],
      link = [],
      title = '',
      children,
    } = props;

    const finalMeta: Array<Record<string, any>> = [...nodeMeta, ...meta];
    /* @ts-ignore TODO: TS2488 ->  Type 'Maybe<Record<string, any>[]>' must have a '[Symbol.iterator]()' method that returns an iterator. */
    const finalScript: Array<Record<string, any>> = [...nodeScript, ...script];
    const finalLink: Array<Record<string, any>> = [...nodeLink, ...link];
    const finalTitle =
      title || nodeTitle ? { title: title || nodeTitle } : null;

    const populatedAdditionalMetaData = populateMeta(additionalMetaData, {
      /* @ts-ignore TODO: TS7017 ->  Element implicitly has an 'any' type because type 'typeof globalThis' has no index signature. */
      url: `${global.locationOrigin}${props.locationPath || ''}`,
      path: props.locationPath || '',
    });

    const finalSocialMetaValues = {
      ...nodeSocialMetaValues,
      ...socialMetaValues,
    };
    const socialMetaData =
      hasValues(nodeSocialMetaValues) || hasValues(socialMetaValues)
        ? populateMeta(socialMetaTags, finalSocialMetaValues)
        : [];

    const finalMetaData = [
      ...socialMetaData,
      ...populatedAdditionalMetaData,
      ...finalMeta,
    ];

    testLog('helmet has been called');
    return (
      /* @ts-ignore TODO: TS2769 ->  No overload matches this call. */
      <Helmet
        {...props}
        {...finalTitle}
        meta={finalMetaData}
        script={finalScript}
        link={finalLink}
      >
        {children}
      </Helmet>
    );
  };

  const mapStateToProps = (
    state: Record<string, any>,
  ): Record<string, any> => ({
    locationPath:
      locationStateSelector(state).locationBeforeTransitions.pathname,
  });

  return connect(mapStateToProps)(memo(RasHelmet));
};

export default RasHelmetFactory;
