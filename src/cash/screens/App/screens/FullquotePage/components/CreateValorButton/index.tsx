/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React, { useState } from 'react';
import ButtonWithLoading from '../../../../components/ButtonWithLoading';
import Icon from '../../../../components/Icon';
import styles from './styles.legacy.css';
import { CreateValorButtonProps } from './typings';

const CreateValorButton = ({ fullquoteParam }: CreateValorButtonProps) => {
  const graphqlHost = __CLIENT__
    ? String(window.__GRAPHQL_HOST__)
    : String(process.env.__GRAPHQL_HOST__);

  const [isVisible, setVisible] = useState(true);

  if (!fullquoteParam || !isVisible) {
    return null;
  }

  const cmsHost =
    graphqlHost.indexOf('stage.') > 0
      ? 'https://cms.stage.ringiermedienschweiz.ch'
      : 'https://cms.ringiermedienschweiz.ch';
  const valorCreateFormLink = `${cmsHost}/admin/structure/valor/add?p=${fullquoteParam}`;

  return (
    <div
      key={`create-valor-wrapper-${Math.random()}`}
      className={styles.Wrapper}
    >
      <ButtonWithLoading
        ariaLabel="Erstelle einen Valor im RASCH CMS"
        size="small"
        onClick={() => global.open(valorCreateFormLink, '_blank')}
      >
        Create Valor in CMS
      </ButtonWithLoading>
      <div className={styles.CloseButton} onClick={() => setVisible(false)}>
        <Icon addClass={styles.Icon} type="IconXMark"></Icon>
      </div>
    </div>
  );
};

export default CreateValorButton;
