import { FormField } from './typings';

export const defaultFormFields = [
  {
    name: 'productReturn',
    label: 'Jährliche Wertentwicklung',
    value: '7.4',
    unit: '%',
    step: 0.1,
    inputMode: 'decimal',
    roundingDigits: 1,
  },
  {
    name: 'initialInvestment',
    label: 'Einmalige Einzahlung',
    value: '1000',
    unit: 'CHF',
    step: 500,
    explanation: 'Ab 100 CHF pro Monat',
    tooltip: 'Den Betrag, den Sie einmalig einzahlen möchten.',
    inputMode: 'numeric',
    roundingDigits: 2,
  },
  {
    name: 'additionalInvestment',
    label: 'Sparrate',
    value: '100',
    unit: 'CHF',
    step: 100,
    min: 100,
    tooltip:
      'Der regelmässige Betrag, den Sie monatlich oder quartalsweise einzahlen möchten, um Vermögen anzusparen. Die Einzahlung erfolgt zu Beginn der jeweiligen Sparhäufigkeit (siehe «Einzahlungshäufigkeit»).',
    inputMode: 'numeric',
    roundingDigits: 2,
  },
  {
    name: 'intervalInMonths',
    label: 'Einzahlungshäufigkeit',
    value: '1',
    options: [
      { label: 'Monatlich', active: true },
      { label: 'Quartalsweise', active: false },
    ],
  },
  {
    name: 'investmentPeriod',
    label: 'Anlagedauer',
    value: '10',
    unit: 'Jahre',
    step: 1,
    min: 1,
    tooltip:
      'Ein langer Anlagehorizont erlaubt es Ihnen, Börsenschwankungen besser zu verkraften.',
    inputMode: 'numeric',
    roundingDigits: 0,
  },
  {
    name: 'savingsAccountReturn',
    label: 'Jährliche Sparkonto-Verzinsung',
    value: '1.6',
    unit: '%',
    step: 0.1,
    tooltip: `<p>Tragen Sie den jährlichen Zinssatz ein, den Sie für ein Sparkonto während der gewählten Anlagedauer durchschnittlich erwarten.</p><br />
    <p>In den letzten 40 Jahren (1.1.1984 - 31.12.2023) betrug die durchschnittliche Verzinsung eines CHF-Sparkontos ca. 1.6% pro Jahr.</p><br />
    <p><i>Quelle: SNB</i></p>`,
    inputMode: 'decimal',
    roundingDigits: 1,
  },
] as FormField[];
