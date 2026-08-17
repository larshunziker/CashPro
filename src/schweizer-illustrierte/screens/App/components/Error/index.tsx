import React, { ReactElement } from 'react';
import { ErrorProps } from './typings';

const Error = ({ msg }: ErrorProps): ReactElement => (
  <div>
    <span role="img" aria-label="Warning">
      ❗
    </span>
    {msg}
  </div>
);

export default Error;
