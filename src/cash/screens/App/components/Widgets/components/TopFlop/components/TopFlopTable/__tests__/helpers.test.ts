import { getProductLink, getTrackingPath } from '../helpers';

const mockInstrumentWithIsin: Instrument = {
  instrumentKey: '123',
  isin: 'CH0012221716',
  mName: 'Test Instrument',
} as Instrument;

const mockInstrumentWithoutIsin: Instrument = {
  instrumentKey: '456',
  mName: 'Test Instrument 2',
} as Instrument;

const mockInstrumentWithUnknownIsin: Instrument = {
  instrumentKey: '789',
  isin: 'XX0000000000',
  mName: 'Test Instrument 3',
} as Instrument;

describe('getTrackingPath', () => {
  test.each`
    type       | isHybridApp | expected
    ${'puts'}  | ${false}    | ${'/ddm/clk/546729222;355594415;p;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}'}
    ${'calls'} | ${false}    | ${'/ddm/clk/546684338;355594415;x;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}'}
    ${'puts'}  | ${true}     | ${'/ddm/clk/629716406;436644178;t;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}'}
    ${'calls'} | ${true}     | ${'/ddm/clk/630015466;436644178;j;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}'}
  `(
    'returns $expected for type=$type and isHybridApp=$isHybridApp',
    ({ type, isHybridApp, expected }) => {
      expect(getTrackingPath(type, isHybridApp)).toBe(expected);
    },
  );
});

describe('getProductLink', () => {
  describe('puts link', () => {
    it('should generate correct URL for puts with known ISIN', () => {
      const result = getProductLink('puts', mockInstrumentWithIsin, false);

      expect(result).toContain('https://ad.doubleclick.net/ddm/clk/');
      expect(result).toContain('https://www.bnpparibasmarkets.ch/produkte/');
      expect(result).toContain('cat=Mini+Future+Short');
      expect(result).toContain('u=5501');
      expect(result).toContain('utm_content=Short');
      expect(result).toContain('utm_campaign=Jahreskooperationen_AON');
      expect(result).toContain('utm_source=cash.ch');
      expect(result).toContain('utm_medium=SMI_Top_Flop');
    });

    it('should generate correct URL for puts without ISIN', () => {
      const result = getProductLink('puts', mockInstrumentWithoutIsin, false);

      expect(result).toContain('cat=Mini+Future+Short');
      expect(result).not.toContain('u=');
      expect(result).toContain('utm_content=Short');
    });

    it('should generate correct URL for puts with unknown ISIN', () => {
      const result = getProductLink(
        'puts',
        mockInstrumentWithUnknownIsin,
        false,
      );

      expect(result).toContain('cat=Mini+Future+Short');
      expect(result).not.toMatch(/u=\d+/);
      expect(result).toContain('utm_content=Short');
    });

    it('should use app tracking path when isHybridApp is true', () => {
      const result = getProductLink('puts', mockInstrumentWithIsin, true);

      expect(result).toContain(
        '/ddm/clk/629716406;436644178;t;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}',
      );
    });

    it('should use default tracking path when isHybridApp is false', () => {
      const result = getProductLink('puts', mockInstrumentWithIsin, false);

      expect(result).toContain(
        '/ddm/clk/546729222;355594415;p;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}',
      );
    });
  });

  describe('calls link', () => {
    it('should generate correct URL for calls with known ISIN', () => {
      const result = getProductLink('calls', mockInstrumentWithIsin, false);

      expect(result).toContain('https://ad.doubleclick.net/ddm/clk/');
      expect(result).toContain('https://www.bnpparibasmarkets.ch/produkte/');
      expect(result).toContain('cat=Mini+Future+Long');
      expect(result).toContain('u=5501');
      expect(result).toContain('utm_content=Long');
      expect(result).toContain('utm_campaign=Jahreskooperationen_AON');
      expect(result).toContain('utm_source=cash.ch');
      expect(result).toContain('utm_medium=SMI_Top_Flop');
    });

    it('should generate correct URL for calls without ISIN', () => {
      const result = getProductLink('calls', mockInstrumentWithoutIsin, false);

      expect(result).toContain('cat=Mini+Future+Long');
      expect(result).not.toContain('u=');
      expect(result).toContain('utm_content=Long');
    });

    it('should use app tracking path when isHybridApp is true', () => {
      const result = getProductLink('calls', mockInstrumentWithIsin, true);

      expect(result).toContain(
        '/ddm/clk/630015466;436644178;j;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}',
      );
    });

    it('should use default tracking path when isHybridApp is false', () => {
      const result = getProductLink('calls', mockInstrumentWithIsin, false);

      expect(result).toContain(
        '/ddm/clk/546684338;355594415;x;gdpr=${GDPR};gdpr_consent=${GDPR_CONSENT_755}',
      );
    });
  });

  describe('common UTM parameters', () => {
    it.each(['puts', 'calls'] as const)(
      'should include all required UTM parameters for %s',
      (type) => {
        const result = getProductLink(type, mockInstrumentWithIsin, false);

        expect(result).toContain('utm_campaign=Jahreskooperationen_AON');
        expect(result).toContain('utm_source=cash.ch');
        expect(result).toContain('utm_medium=SMI_Top_Flop');
        expect(result).toContain('utm_creative_format=Linkintegration');
        expect(result).toContain('utm_marketing_tactic=Performance');
        expect(result).toContain('utm_term=TestInstrument');
      },
    );
  });
});
