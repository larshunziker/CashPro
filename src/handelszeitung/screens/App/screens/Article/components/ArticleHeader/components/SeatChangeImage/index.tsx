import React from 'react';
import withHandlers from 'recompose/withHandlers';
import classNames from 'classnames';
import Picture from '../../../../../../../../../common/components/Picture';
import {
  STYLE_1X1_160_PERSON,
  STYLE_1X1_290_PERSON,
} from '../../../../../../../../../shared/constants/images';
import styles from './styles.legacy.css';

const withRenderHandlers = withHandlers({
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'relatedPerson' implicitly has an 'any' type. */
  /* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
  doRenderImageWrapper: (props: any) => (relatedPerson, index) =>
    doRenderImage(relatedPerson, index, props.addPictureClass, props.title),
});

/* @ts-ignore TODO: TS7006 ->  Parameter 'relatedPerson' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'index' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'addPictureClass' implicitly has an 'any' type. */
/* @ts-ignore TODO: TS7006 ->  Parameter 'title' implicitly has an 'any' type. */
const doRenderImage = (relatedPerson, index, addPictureClass, title) => {
  if (!relatedPerson?.node?.teaserImage?.image?.file.relativeOriginPath) {
    return null;
  }
  return (
    <Picture
      downloadPriority="high"
      relativeOrigin={
        relatedPerson?.node?.teaserImage?.image?.file?.relativeOriginPath
      }
      focalPointX={relatedPerson?.node?.teaserImage?.image?.file?.focalPointX}
      focalPointY={relatedPerson?.node?.teaserImage?.image?.file?.focalPointY}
      style_320={STYLE_1X1_160_PERSON}
      style_760={STYLE_1X1_290_PERSON}
      className={classNames({
        [addPictureClass]: !!addPictureClass,
        [styles.Image]: !addPictureClass,
      })}
      alt={relatedPerson?.node?.teaserImage?.image?.file?.alt || ''}
      title={title || ''}
    />
  );
};

const SeatChangeImage = ({
  /* @ts-ignore TODO: TS7031 ->  Binding element 'relatedPersons' implicitly has an 'any' type. */
  relatedPersons,
  addClass = '',
  /* @ts-ignore TODO: TS7031 ->  Binding element 'doRenderImageWrapper' implicitly has an 'any' type. */
  doRenderImageWrapper,
}) => {
  if (
    !relatedPersons ||
    !relatedPersons.edges ||
    relatedPersons.edges.length === 0
  ) {
    return null;
  }
  return (
    <div
      className={classNames({
        [addClass]: !!addClass,
        [styles.Wrapper]: !addClass,
      })}
    >
      {relatedPersons.edges.slice(0, 2).map(doRenderImageWrapper)}
    </div>
  );
};

export default withRenderHandlers(SeatChangeImage);
