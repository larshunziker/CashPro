import React from 'react';
import ContentBox from '../ContentBox';
import styles from './styles.legacy.css';

// TODO: temporary component to showcase the content box on the full quote page
const News = () => {
  return (
    <div className={styles.Wrapper}>
      <ContentBox
        component="tabs"
        node={{
          __typename: 'ContentBox',
          id: 'bm9kZTo1MDM0Mg==',
          title: 'News',
          hideTitle: false,
          contentSourceValue: 'tabs',
          linkLabel: null,
          body: [
            {
              // @ts-ignore
              __typename: 'TabParagraph',
              id: 'cGFyYWdyYXBoOnRhYjoyMTYwOTI6Mjk2NjM3',
              title: null,
              style: 'default',
              sortBy: 'newest',
              linkLabel: null,
              mode: 'automatic',
              termReference: null,
              items: {
                __typename: 'NodeInterfaceConnection',
                edges: [],
              },
            },
          ],
          termReference: null,
          useNativeAdvertising: false,
          items: {
            __typename: 'NodeInterfaceConnection',
            edges: [],
          },
        }}
      />
    </div>
  );
};

export default News;
