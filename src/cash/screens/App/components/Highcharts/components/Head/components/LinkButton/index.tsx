import React from 'react';
import ButtonWithLoading from '../../../../../ButtonWithLoading';
import { useStableNavigate } from '../../../../../../../../../shared/hooks/useStableNavigateContext';
import { LinkButtonProps } from './typings';

const LinkButton = ({
  label,
  size,
  variant,
  highAttention,
  children,
  url,
  internal,
}: LinkButtonProps) => {
  const navigate = useStableNavigate();

  const button = (
    <ButtonWithLoading
      aria-label={label}
      variant={variant}
      size={size}
      highAttention={highAttention}
      onClick={() => (internal ? navigate(url) : null)}
      fullWidth
    >
      {children}
    </ButtonWithLoading>
  );

  return internal ? (
    button
  ) : (
    <a target="_blank" href={url}>
      {button}
    </a>
  );
};

export default LinkButton;
