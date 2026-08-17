import React, { ReactElement } from 'react';
import classNames from 'classnames';
import { isInsideColumn } from '../../../../../../../../../../shared/helpers/isInsideColumn';
import Picture from '../../../../../../../../../../../common/components/Picture';
import MailChimpSubscribeForm from '../../components/MailChimpSubscribeForm';
import {
  STYLE_MINISTAGE_L,
  STYLE_MINISTAGE_M,
} from '../../../../../../../../../../../shared/constants/images';
import { ARTICLE_TYPE_LONG_READ } from '../../../../../../../../../../../shared/constants/content';
import { SECTION_PARAGRAPH } from '../../../../../../../../../../../shared/constants/paragraphs';
import grid from '../../../../../../../../../../../common/assets/styles/grid.legacy.css';
import styles from './styles.legacy.css';
import { MinistageNewsletterSignupProps } from './typings';

type MinistageNewsletterSignupPropsInner = MinistageNewsletterSignupProps;

const MailchimpNewsletterSignup = (
  props: MinistageNewsletterSignupPropsInner,
): ReactElement => {
  /* @ts-ignore TODO: TS2345 ->  Argument of type 'string | undefined' is not assignable to parameter of type 'string'. */
  const isGuideArticle = isInsideColumn(props.origin);
  const isInLongFormSectionParagraph =
    props.origin === `${SECTION_PARAGRAPH}_${ARTICLE_TYPE_LONG_READ}`;

  let containerClass = styles.WrapperLarge;

  if (isGuideArticle || isInLongFormSectionParagraph) {
    containerClass = grid.ContainerInner;
  }

  const isInLongFormArticle = props.origin === ARTICLE_TYPE_LONG_READ;

  return (
    <div className={containerClass}>
      <div
        className={classNames(grid.Row, grid.NoGutters, {
          [styles.JustifyContentCenter]: isInLongFormArticle,
        })}
      >
        <div
          className={classNames(styles.Wrapper, {
            [styles.WrapperInGuideArticle]: isGuideArticle,
            [styles.LongFormWrapper]: isInLongFormArticle,
          })}
        >
          <div className={styles.ImageWrapper}>
            {props.ministageNewsletter?.image?.relativeOriginPath && (
              <Picture
                relativeOrigin={
                  props.ministageNewsletter.image.relativeOriginPath
                }
                style_320={STYLE_MINISTAGE_M}
                style_760={STYLE_MINISTAGE_L}
                alt={props.ministageNewsletter.headline || ''}
                className={styles.TeaserImage}
                disableWrapperClassName
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointX={props.ministageNewsletter.image.focalPointX}
                /* @ts-ignore TODO: TS2322 ->  Type 'Maybe<number> | undefined' is not assignable to type 'number | undefined'. */
                focalPointY={props.ministageNewsletter.image.focalPointY}
              />
            )}
          </div>
          <div>
            <div className={styles.HeaderWrapper}>
              <div className={styles.HeaderText}>
                &laquo;
                {props.ministageNewsletter.headline || ''}
                &raquo;
              </div>
              <div className={styles.LeadText}>
                {props.ministageNewsletter.lead || ''}
              </div>
            </div>
            <div className={grid.ContainerInner}>
              <div className={styles.FormWrapper}>
                <div className={styles.FormHeaderText}>
                  {props.ministageNewsletter.subhead}
                </div>
                <MailChimpSubscribeForm
                  ministageNewsletter={props.ministageNewsletter}
                  mutate={props.mutate}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MailchimpNewsletterSignup;
