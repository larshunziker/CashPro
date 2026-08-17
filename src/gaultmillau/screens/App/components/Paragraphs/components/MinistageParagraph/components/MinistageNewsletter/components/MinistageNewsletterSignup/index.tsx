import React from 'react';
import { useSelector } from 'react-redux';
import { useMutation } from '@apollo/client';
import classNames from 'classnames';
import {
  assembleAkamaiImgUrl,
  getWidthAndHeightByImageStyle,
} from '../../../../../../../../../../../common/components/Picture/helpers';
import locationStateSelector from '../../../../../../../../../../../shared/selectors/locationStateSelector';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module '../MailChimpSubscribeForm'. '/Users/bhs/code/work/rasch-stack/src/gaultmi */
import MailChimpSubscribeForm from '../MailChimpSubscribeForm';
/* @ts-ignore TODO: TS7016 ->  Could not find a declaration file for module './mutations'. '/Users/bhs/code/work/rasch-stack/src/gaultmillau/screens/A */
import { MAILCHIMP_LIST_REQUEST } from './mutations';
import { STYLE_MINISTAGE_L } from '../../../../../../../../../../../shared/constants/images';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';

/* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
const MinistageNewsletterSignup = (props) => {
  const [sendContactRequest] = useMutation(MAILCHIMP_LIST_REQUEST);

  const { height: ministageImageHeight, width: ministageImageWidth } =
    getWidthAndHeightByImageStyle(STYLE_MINISTAGE_L);
  const clientUrl = useSelector(
    /* @ts-ignore TODO: TS2345 ->  Argument of type 'unknown' is not assignable to parameter of type 'Record<string, any>'. */
    (state) => locationStateSelector(state).clientUrl,
  );

  const imageUrl = props.ministageNewsletter?.image
    ? assembleAkamaiImgUrl({
        relativeOriginPath: props.ministageNewsletter.image.relativeOriginPath,
        width: ministageImageWidth,
        height: ministageImageHeight,
        focalPointX: props.ministageNewsletter.image.focalPointX,
        focalPointY: props.ministageNewsletter.image.focalPointY,
        clientUrl,
      })
    : null;

  return (
    <div
      className={grid.Container}
      data-testid="ministage-newsletter-signup-wrapper"
    >
      <div className={styles.Wrapper}>
        <div className={grid.Row}>
          <div className={grid.ColSm18}>
            <div className={styles.HeaderWrapper}>
              <div className={styles.HeaderText}>
                {props.ministageNewsletter.headline || ''}
              </div>
              {
                /* eslint-disable react/no-danger */
                props.ministageNewsletter.lead && (
                  <div className={styles.LeadText}>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: props.ministageNewsletter.lead,
                      }}
                    />
                  </div>
                )
              }
            </div>
            <div className={styles.InnerContainer}>
              <div className={styles.FormWrapper}>
                <MailChimpSubscribeForm
                  {...props}
                  mutate={sendContactRequest}
                />
              </div>
            </div>
          </div>
          <div
            className={classNames(grid.ColSm6, grid.ColMd5, grid.HiddenSmDown)}
            data-testid="ministage-newsletter-signup-image"
          >
            {imageUrl && (
              <img
                alt={props.ministageNewsletter.headline || ''}
                src={imageUrl}
                role="presentation"
                className={styles.TeaserImage}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MinistageNewsletterSignup;
