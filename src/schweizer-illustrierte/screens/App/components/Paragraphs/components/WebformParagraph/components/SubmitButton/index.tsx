import React, { ComponentType } from 'react';
import { connect } from 'react-redux';
import settingsStateSelector from '../../../../../../../../shared/selectors/settingsStateSelector';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import {
  MAIN_CHANNEL_BODY_HEALTH,
  MAIN_CHANNEL_STYLE,
} from '../../../../../../constants';
import styles from './styles.legacy.css';
import { SubmitButtonProps } from './typings';

type SubmitButtonPropsInner = SubmitButtonProps & {
  activeMainChannel: string;
};

const SubmitButton: ComponentType<SubmitButtonProps> = ({
  activeMainChannel,
  children,
  loading,
}: SubmitButtonPropsInner) => {
  let highAttention = false;
  if (
    activeMainChannel === MAIN_CHANNEL_STYLE ||
    activeMainChannel === MAIN_CHANNEL_BODY_HEALTH
  ) {
    highAttention = true;
  }
  return (
    <div className={styles.Wrapper}>
      <ButtonWithLoading
        type="submit"
        ariaLabel="Senden"
        highAttention={highAttention}
        loading={loading}
      >
        {children}
      </ButtonWithLoading>
    </div>
  );
};

const mapStateToProps = (state: Record<string, any>): Record<string, any> => ({
  activeMainChannel: settingsStateSelector(state).activeMainChannel,
});

export default connect(mapStateToProps)(SubmitButton);
