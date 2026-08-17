import React from 'react';
import { Link } from 'react-router-dom';
import styles from './styles.legacy.css';

const Overview = () => {
  return (
    <ul className={styles.List}>
      <li>
        <Link to="/styleguide/paragraphs">Paragraphs</Link>
      </li>
      <li>
        <Link to="/styleguide/typography">Typography</Link>
      </li>
      <li>
        <Link to="/styleguide/buttons">Buttons</Link>
      </li>
      <li>
        <Link to="/styleguide/teasers">Teasers</Link>
      </li>
    </ul>
  );
};

export default Overview;
