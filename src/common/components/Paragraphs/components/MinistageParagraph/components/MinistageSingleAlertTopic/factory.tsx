/**
 * @file   Single Alert Topic Ministage
 */

import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { EMAIL_ALERT_ANCHOR_ID } from '../../../../../AlertList/factory';
import { getRCTrackingSource } from '../../../../../../../shared/helpers/getRCTrackingSource';
import pianoStateSelector from '../../../../../../../shared/selectors/pianoStateSelector';
import { getAlertItemTypeByTypename } from '../../../../../SubscribeButton/helper';
import {
  TRACKING_CLASS_MINISTAGE_SINGLE_ALERT_TOPIC,
  TRACKING_CLASS_PARAGRAPH,
} from '../../../../../../../shared/constants/tracking';
import grid from '../../../../../../assets/styles/grid.legacy.css';
import {
  MinistageSingleAlertTopicComponent,
  MinistageSingleAlertTopicFactoryOptions,
  MinistageSingleAlertTopicFactoryOptionsStyles,
  MinistageSingleAlertTopicProps,
} from './typings';

type MinistageSingleAlertTopicPropsInner = MinistageSingleAlertTopicProps & {
  pageMetadata: PianoPageMetadata & { termId: string };
};

export default ({
  AlertItem,
  SubscribeButton,
  imageStyles,
  styles: appStyles,
}: MinistageSingleAlertTopicFactoryOptions): MinistageSingleAlertTopicComponent => {
  const MinistageSingleAlertTopic: MinistageSingleAlertTopicComponent = (
    props: MinistageSingleAlertTopicPropsInner,
  ): ReactElement | null => {
    const { ministageParagraph, pageMetadata } = props;
    const ministageSingleAlertTopic: MinistageSingleAlertTopic | null =
      (ministageParagraph?.ministage &&
        (ministageParagraph.ministage as MinistageSingleAlertTopic)) ||
      null;

    if (
      !ministageSingleAlertTopic ||
      (!ministageSingleAlertTopic.keyword?.id &&
        !ministageSingleAlertTopic.person?.id &&
        !ministageSingleAlertTopic.organization?.id)
    ) {
      return null;
    }

    const defaultStyles = {
      Wrapper: '',
      ContentWrapper: '',
      Title: '',
      AlertItemWrapper: '',
    };

    const getStyles = () => {
      const styles: MinistageSingleAlertTopicFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;
      return styles;
    };

    const styles = getStyles();

    const relativeOriginPath =
      ministageSingleAlertTopic?.media?.file?.relativeOriginPath || '';
    const focalPointX = ministageSingleAlertTopic?.media?.file?.focalPointX;
    const focalPointY = ministageSingleAlertTopic?.media?.file?.focalPointY;

    const anchorId = `${EMAIL_ALERT_ANCHOR_ID}-${ministageParagraph.id}`;

    const node =
      (ministageSingleAlertTopic.keyword?.id &&
        ministageSingleAlertTopic.keyword) ||
      (ministageSingleAlertTopic.person?.id &&
        ministageSingleAlertTopic.person) ||
      (ministageSingleAlertTopic.organization?.id &&
        ministageSingleAlertTopic.organization);

    /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
    /* @ts-ignore TODO: TS2339 ->  Property 'id' does not exist on type '"" | Keyword | Organization | Person'. */
    pageMetadata.termId = node.id;

    const source = getRCTrackingSource('alert-function', pageMetadata);

    return (
      <div
        className={classNames(
          TRACKING_CLASS_PARAGRAPH,
          TRACKING_CLASS_MINISTAGE_SINGLE_ALERT_TOPIC,
          styles.Wrapper,
          grid.HideForPrint,
        )}
        id={anchorId}
      >
        <div className={styles.ContentWrapper}>
          <p className={styles.Title}>
            {ministageSingleAlertTopic.headline || 'Thema per E-Mail folgen'}
          </p>
          <div className={styles.AlertItemWrapper}>
            <AlertItem
              // @ts-ignore TODO: label was aliased in the fragment, we should avoid and change this
              label={node.label}
              /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
              /* @ts-ignore TODO: TS2339 ->  Property 'preferredUri' does not exist on type '"" | Keyword | Organization | Person'. */
              url={node.preferredUri}
              relativeOriginPath={relativeOriginPath}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointX={focalPointX}
              /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
              focalPointY={focalPointY}
              imageStyles={imageStyles}
            >
              <SubscribeButton
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                /* @ts-ignore TODO: TS2339 ->  Property 'id' does not exist on type '"" | Keyword | Organization | Person'. */
                id={Number(node.id)}
                // @ts-ignore TODO: label was aliased in the fragment, we should avoid and change this
                label={node.label}
                /* @ts-ignore TODO: TS2533 ->  Object is possibly 'null' or 'undefined'. */
                /* @ts-ignore TODO: TS2339 ->  Property '__typename' does not exist on type '"" | Keyword | Organization | Person'. */
                type={getAlertItemTypeByTypename(node.__typename)}
                anchorId={anchorId}
                source={source}
              />
            </AlertItem>
          </div>
        </div>
      </div>
    );
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    pageMetadata: pianoStateSelector(state).pageMetadata,
  });
  return connect(mapStateToProps)(MinistageSingleAlertTopic);
};
