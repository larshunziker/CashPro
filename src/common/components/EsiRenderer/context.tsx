import React from 'react';

type EsiContextType = {
  fullquoteUrl?: string;
  timeout: number;
};

const EsiContext = React.createContext<EsiContextType>({ timeout: 32000 });

export default EsiContext;
