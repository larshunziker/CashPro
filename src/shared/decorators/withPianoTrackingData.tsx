import React from 'react';
import { ComponentEnhancer } from 'recompose';
import usePianoTrackingData from '../hooks/usePianoTrackingData';

/* @ts-ignore TODO: TS7006 ->  Parameter 'Component' implicitly has an 'any' type. */
const withPianoTrackingData: ComponentEnhancer<any, any> = (Component) => {
  /* @ts-ignore TODO: TS7006 ->  Parameter 'props' implicitly has an 'any' type. */
  const WithPianoTrackingDataHOC = (props) => {
    usePianoTrackingData(props);

    return <Component {...props} />;
  };
  return WithPianoTrackingDataHOC;
};

export default withPianoTrackingData;
