import esiRendererFactory from '../../../../../common/components/EsiRenderer/factory';
import ClientSideESI from './components/ClientSideESI';
import EsiSkeleton from './components/EsiSkeleton';
import { WIDGET_RENDER_ERROR_MESSAGE } from './constants';

const suppressedOnHybridApp = ['integrations/chart_produkt_matching/BAER'];

const EsiRenderer = esiRendererFactory({
  ClientSideESI,
  EsiSkeleton,
  /* @ts-ignore TODO: TS2322 ->  Type 'string[]' is not assignable to type 'never[]'. */
  suppressedOnHybridApp,
  errorMsg: WIDGET_RENDER_ERROR_MESSAGE,
});

export default EsiRenderer;
