import React from 'react';

const MockedCard = ({ ...props }) => (
  <div data-testid="mocked-card" {...props}></div>
);

export default MockedCard;
