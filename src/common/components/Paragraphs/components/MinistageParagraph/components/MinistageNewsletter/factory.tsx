import React, { ReactElement } from 'react';
import Picture from '../../../../../Picture';
import {
  MinistageNewsletterFactoryOptions,
  MinistageNewsletterFactoryOptionsStyles,
  MinistageNewsletterProps,
} from './typings';

const defaultStyles: MinistageNewsletterFactoryOptionsStyles = {
  Background: '',
  Wrapper: '',
  Container: '',
  InnerWrapper: '',
  Row: '',
  ContentWrapper: '',
  HeaderWrapper: '',
  HeaderText: '',
  LeadText: '',
  HiddenTeaserImage: '',
  PictureWrapper: '',
  Picture: '',
};

const MinistageNewsletterFactory = ({
  MailchimpSubscribeForm,
  imageStyles,
  styles: appStyles,
}: MinistageNewsletterFactoryOptions) => {
  const MinistageNewsletter = (
    props: MinistageNewsletterProps,
  ): ReactElement => {
    const ministage = props.ministageNewsletter;
    const relativeOriginPath = ministage?.image?.relativeOriginPath || '';
    const focalPointX = ministage?.image?.focalPointX;
    const focalPointY = ministage?.image?.focalPointY;
    const imageAlt = ministage?.headline || '';

    const styles =
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    return (
      <div
        className={styles.Background}
        data-testid="ministage-newsletter-wrapper"
      >
        <div className={styles.Wrapper}>
          <div className={styles.Container}>
            <div className={styles.InnerWrapper}>
              <div className={styles.Row}>
                <div className={styles.ContentWrapper}>
                  <div className={styles.HeaderWrapper}>
                    <div className={styles.HeaderText}>
                      {ministage.headline || ''}
                    </div>
                    {ministage.lead && (
                      <div
                        className={styles.LeadText}
                        data-testid="ministage-newsletter-lead-wrapper"
                      >
                        {/* eslint-disable react/no-danger */}
                        <div
                          dangerouslySetInnerHTML={{
                            __html: ministage.lead,
                          }}
                        />
                        {/* eslint-enable react/no-danger */}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              {relativeOriginPath && (
                <div
                  className={styles.HiddenTeaserImage}
                  data-testid="ministage-newsletter-picture-wrapper"
                >
                  <div className={styles.PictureWrapper}>
                    <Picture
                      relativeOrigin={relativeOriginPath}
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                      focalPointX={focalPointX}
                      /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                      focalPointY={focalPointY}
                      alt={imageAlt}
                      className={styles.Picture}
                      {...imageStyles}
                      disableWrapperClassName
                    />
                  </div>
                </div>
              )}
              <MailchimpSubscribeForm
                ministageNewsletter={ministage}
                useFullwidthBackground={props.useFullwidthBackground}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return MinistageNewsletter;
};

export default MinistageNewsletterFactory;
