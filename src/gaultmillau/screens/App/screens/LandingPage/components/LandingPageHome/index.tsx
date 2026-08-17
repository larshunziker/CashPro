import React from 'react';
import compose from 'recompose/compose';
import classNames from 'classnames';
import withHelmet from '../../../../../../shared/decorators/withHelmet';
import EditButtons from '../../../../components/EditButtons';
import Paragraphs from '../../../../components/Paragraphs';
import SponsorsBanner from '../../../../components/SponsorsBanner';
import { ENTITY_QUEUE_PARAGRAPH } from '../../../../../../../../src/shared/constants/paragraphs';
import { ROOT_SCHEMA_TYPE_ORGANIZATION } from '../../../../../../../../src/shared/constants/structuredData';
import {
  ENTITY_QUEUE_STYLE_SPLIT_BOTTOM,
  ENTITY_QUEUE_STYLE_SPLIT_TOP,
} from '../../../../components/Paragraphs/components/EntityQueueParagraph/constants';
import { LANDING_PAGE_TYPE_HOME } from '../../constants';
import grid from '../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { LandingPageProps } from '../../typings';

const SPLIT_ENTITY_QUEUE_BY_ITEMS = 12;

/* @ts-ignore TODO: TS7006 ->  Parameter 'object' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'value' implicitly has an 'any' type. */
const getKeyByType = (object, value) => {
  return Object.keys(object).find((key) => object[key]?.__typename === value);
};

/* @ts-ignore TODO: TS7006 ->  Parameter 'body' implicitly has an 'any' type. */
const prepareBody = (body, paragraphsSubsetSize = 0, itemsAmount = 0) => {
  const bodyIndexKey = getKeyByType(body, ENTITY_QUEUE_PARAGRAPH);
  if (
    !body ||
    !Array.isArray(body) ||
    body.length === 0 ||
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    body[bodyIndexKey]?.__typename !== ENTITY_QUEUE_PARAGRAPH
  ) {
    return body;
  }

  // do deep copy of items to avoid mutations
  const bodyCopy = JSON.parse(JSON.stringify(body));

  // we need this override here for the gridOptions
  /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
  bodyCopy[bodyIndexKey].style = ENTITY_QUEUE_STYLE_SPLIT_TOP;
  /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
  const splitParagraphId = bodyCopy[bodyIndexKey].id;
  /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
  bodyCopy[bodyIndexKey].id = splitParagraphId + ENTITY_QUEUE_STYLE_SPLIT_TOP;
  // do deep copy of items to get rid of mutations
  /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
  const entityQueueCopy = JSON.parse(JSON.stringify(bodyCopy[bodyIndexKey]));
  entityQueueCopy.style = ENTITY_QUEUE_STYLE_SPLIT_BOTTOM;
  entityQueueCopy.id = splitParagraphId + ENTITY_QUEUE_STYLE_SPLIT_BOTTOM;

  // split and remove array items by given number of items
  /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
  bodyCopy[bodyIndexKey]?.entityQueue?.items &&
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    Array.isArray(bodyCopy[bodyIndexKey].entityQueue?.items.edges) &&
    /* @ts-ignore TODO: TS2538 ->  Type 'undefined' cannot be used as an index type. */
    bodyCopy[bodyIndexKey].entityQueue.items.edges.splice(itemsAmount);

  entityQueueCopy?.entityQueue?.items &&
    Array.isArray(entityQueueCopy.entityQueue.items.edges) &&
    entityQueueCopy.entityQueue.items.edges.splice(0, itemsAmount);

  // if we don't have to split the body we do it anyway because of no duplications of grid config
  // as we don't have to merge paragraphs into the body, we have to push the split on last position
  if (body.length <= 3) {
    bodyCopy.push(entityQueueCopy);
  } else {
    bodyCopy.splice(paragraphsSubsetSize + 1, 0, entityQueueCopy);
  }

  return bodyCopy;
};

const LandingPageHome = ({ landingPage }: LandingPageProps) => {
  const hasBody =
    landingPage.body &&
    Array.isArray(landingPage.body) &&
    landingPage.body.length > 0;

  const bodyIndexKey =
    (hasBody &&
      /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
      parseInt(getKeyByType(landingPage.body, ENTITY_QUEUE_PARAGRAPH))) ||
    0;

  const preparedBody =
    (hasBody &&
      prepareBody(
        landingPage.body,
        /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
        landingPage.body.length - bodyIndexKey,
        SPLIT_ENTITY_QUEUE_BY_ITEMS,
      )) ||
    null;

  return (
    <div className={classNames('landing-page', styles.Wrapper)}>
      <EditButtons
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string'. */
        editContentUri={landingPage?.editContentUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        editRelationUri={landingPage?.editRelationUri}
        /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<string> | undefined' is not assignable to type 'string | undefined'. */
        cloneContentUri={landingPage?.cloneContentUri}
      />

      {preparedBody && (
        <Paragraphs
          hasContainer={false}
          pageBody={preparedBody}
          origin={LANDING_PAGE_TYPE_HOME}
          colStyle={grid.ColXs24}
        />
      )}

      <div className={grid.Container}>
        <SponsorsBanner />
      </div>
    </div>
  );
};

const LandingPageHomeComponent = compose<any, any>(
  withHelmet({
    /* @ts-ignore TODO: TS7006 ->  Parameter 'mapProps' implicitly has an 'any' type. */
    getNode: (mapProps) => mapProps.landingPage,
    rootSchemaType: ROOT_SCHEMA_TYPE_ORGANIZATION,
    hasBreadcrumbs: () => false,
  }),
)(LandingPageHome);

export default LandingPageHomeComponent;
