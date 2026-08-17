import { EventConfig } from './typings';

export const EVENTS: EventConfig = {
  AGM: { label: 'Generalversammlungen', eventCollection: ['AGM'] },
  DIV: { label: 'Ausschüttungen', eventCollection: ['DIV', 'RCAP'] },
  RCAP: { label: 'Ausschüttungen', eventCollection: ['DIV', 'RCAP'] },
};
export const ANCHOR_ID = 'corporate_actions_anchor';
export const INITIAL_ITEMS_SHOWN = 2;
