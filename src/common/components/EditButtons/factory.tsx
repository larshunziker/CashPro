import React, { ReactElement, useEffect, useState } from 'react';
import {
  EditButtonsFactoryOptions,
  EditButtonsFactoryOptionsStyles,
  EditButtonsProps,
} from './typings';

const defaultStyles: EditButtonsFactoryOptionsStyles = {
  Wrapper: '',
  WrapperInner: '',
  ListWrapper: '',
  ListItem: '',
  Link: '',
  CloseButtonWrapper: '',
  CloseButton: '',
};

const EditButtonsFactory = ({
  Link,
  closeIcon,
  styles: appStyles,
}: EditButtonsFactoryOptions) => {
  const EditButtons = (props: EditButtonsProps): ReactElement | null => {
    const { editContentUri, editRelationUri, cloneContentUri } = props;
    const [isVisible, setVisible] = useState(true);

    useEffect(() => {
      if (
        (window.location?.search || '').includes('rasch_disable_edit_buttons')
      ) {
        setVisible(false);
      }
    }, []);

    if (
      !isVisible ||
      (!editContentUri && !editRelationUri && !cloneContentUri)
    ) {
      return null;
    }

    const graphqlHost = __CLIENT__
      ? String(window.__GRAPHQL_HOST__)
      : String(process.env.__GRAPHQL_HOST__);

    const cmsBaseUrl = graphqlHost?.includes('stage')
      ? 'https://cms.stage.ringiermedienschweiz.ch'
      : 'https://cms.ringiermedienschweiz.ch';

    const getStyles = (): EditButtonsFactoryOptionsStyles => {
      const styles: EditButtonsFactoryOptionsStyles =
        (typeof appStyles === 'function' && appStyles(props)) ||
        (typeof appStyles === 'object' && appStyles) ||
        defaultStyles;
      return styles;
    };

    const styles = getStyles();

    return (
      <div className={styles.Wrapper} data-testid="edit-buttons-wrapper">
        <div className={styles.WrapperInner}>
          <ul className={styles.ListWrapper}>
            {editContentUri && (
              <li className={styles.ListItem} data-testid="content-edit-link">
                <Link
                  className={styles.Link}
                  path={`${cmsBaseUrl}${editContentUri}`}
                  label="Edit Content"
                />
              </li>
            )}
            {editRelationUri && (
              <li className={styles.ListItem} data-testid="relation-edit-link">
                <Link
                  className={styles.Link}
                  path={`${cmsBaseUrl}${editRelationUri}`}
                  label="Edit Relation"
                />
              </li>
            )}
            {cloneContentUri && (
              <li className={styles.ListItem} data-testid="content-clone-link">
                <Link
                  className={styles.Link}
                  path={`${cmsBaseUrl}${cloneContentUri}`}
                  label="Clone Content"
                />
              </li>
            )}
            <li className={styles.CloseButtonWrapper}>
              <button
                data-testid="close-button"
                type="button"
                className={styles.CloseButton}
                onClick={setVisible.bind(this, false)}
              >
                {closeIcon}
              </button>
            </li>
          </ul>
        </div>
      </div>
    );
  };

  return EditButtons;
};

export default EditButtonsFactory;
