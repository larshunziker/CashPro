import React, { ComponentType } from 'react';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import { SubmitButtonProps } from './typings';

const SubmitButton: ComponentType<SubmitButtonProps> = ({
  children,
  loading,
}) => <ButtonWithLoading loading={loading}>{children}</ButtonWithLoading>;

export default SubmitButton;
