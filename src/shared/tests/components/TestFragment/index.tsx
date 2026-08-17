import React, { ComponentType } from 'react';

const TestFragment: ComponentType<any> = ({ children, ...props }) => {
  if (__TESTING__) {
    return <div {...props}>{children}</div>;
  }
  return <>{children}</>;
};
export default TestFragment;
