import React from 'react';
import classNames from 'classnames';
import defaultStyles from './styles.legacy.css';
import { GooglePreferredSourceFactoryOptions } from './typings';

const googlePreferredSourceFactory = ({
  Button,
  ExplanationButton,
  styles,
}: GooglePreferredSourceFactoryOptions) => {
  const GooglePreferredSource = () => {
    return (
      <section
        className={classNames(
          defaultStyles.Wrapper,
          styles.GooglePreferredSource,
        )}
      >
        <Button />
        <ExplanationButton />
      </section>
    );
  };

  return GooglePreferredSource;
};

export default googlePreferredSourceFactory;
