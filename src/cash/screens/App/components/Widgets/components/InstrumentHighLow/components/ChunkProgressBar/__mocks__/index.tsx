import React from 'react';

const MockedChunkProgressBar = ({
  min,
  max,
  current,
}: {
  min: number;
  max: number;
  current: number;
}) => (
  <div
    data-testid="mocked-progress-bar"
    data-min={min}
    data-max={max}
    data-current={current}
  />
);

export default MockedChunkProgressBar;
