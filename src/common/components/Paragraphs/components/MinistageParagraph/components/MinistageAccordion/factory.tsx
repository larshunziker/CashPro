/**
 * @file   ministage accordion
 */

import React from 'react';
import { connect } from 'react-redux';
import headerStateSelector from '../../../../../../../shared/selectors/headerStateSelector';
import {
  MinistageAccordionFactoryOptions,
  MinistageAccordionProps,
} from './typings';

export type MinistageAccordionPropsInner = MinistageAccordionProps & {
  headerContentType: string;
};

const MinistageAccordionFactory = ({
  ExpansionPanel,
  paragraphsRenderer,
  fallbackTitle,
  origin = '',
  styles: appStyles,
}: MinistageAccordionFactoryOptions<any>) => {
  const MinistageAccordion = (props: MinistageAccordionPropsInner) => {
    const ministage =
      (props.ministageParagraph?.ministage as MinistageAccordion) || null;
    if (
      !ministage ||
      !ministage.sections ||
      !Array.isArray(ministage.sections) ||
      ministage.sections.length === 0
    ) {
      return null;
    }

    const defaultStyles = {
      Wrapper: '',
      FAQInner: '',
      Row: '',
      Container: '',
      InnerWrapper: '',
      Title: '',
      Paragraphs: '',
    };

    const getStyles = () =>
      (typeof appStyles === 'function' && appStyles(props)) ||
      (typeof appStyles === 'object' && appStyles) ||
      defaultStyles;

    const styles = getStyles();

    //intermediate step to avoid circular dependency
    const Paragraphs = paragraphsRenderer();

    const paragraphTitle = ministage.title || fallbackTitle;

    return (
      <article className={styles.Wrapper}>
        <div className={styles.FAQInner}>
          <div className={styles.Container}>
            <div className={styles.Row}>
              <div className={styles.InnerWrapper}>
                <div className={styles.Title}>{paragraphTitle}</div>
                {ministage.sections.map((section: SectionParagraph) => {
                  if (
                    !Array.isArray(section.body) ||
                    section.body.length === 0
                  ) {
                    return null;
                  }
                  return (
                    <ExpansionPanel
                      key={section.title}
                      title={section.title}
                      origin={props.origin}
                    >
                      <Paragraphs
                        pageBody={section.body}
                        hasContainer={false}
                        origin={origin}
                        addClass={styles.Paragraphs || ''}
                      />
                    </ExpansionPanel>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  };

  /* @ts-ignore TODO: TS7006 ->  Parameter 'state' implicitly has an 'any' type. */
  const mapStateToProps = (state) => ({
    headerContentType: headerStateSelector(state).contentType,
  });

  return connect(mapStateToProps)(MinistageAccordion);
};

export default MinistageAccordionFactory;
