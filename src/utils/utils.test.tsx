import { calculateBreakdown, formatCurrency } from './';

describe('formatCurrency', () => {
  it('formats a positive number correctly', () => {
    const result = formatCurrency(1234.56);
    expect(result).toBe('£1,234.56');
  });

  it('formats zero correctly', () => {
    const result = formatCurrency(0);
    expect(result).toBe('£0.00');
  });

  it('formats a negative number correctly', () => {
    const result = formatCurrency(-100.5);
    expect(result).toBe('-£100.50');
  });

  it('rounds numbers correctly', () => {
    const result = formatCurrency(1.234);
    expect(result).toBe('£1.23');
  });
});

describe('calculateBreakdown', () => {
  it('calculates breakdown for a balance of 1000 correctly', () => {
    const result = calculateBreakdown(1000);

    const expectedAvailableBalance = '£883.58';
    const expectedFees = '£10.50';
    const expectedInterest = '£50.00';
    const expectedTaxes = '£155.92';

    expect(result.availableBalance).toBe(expectedAvailableBalance);
    expect(result.fees).toBe(expectedFees);
    expect(result.interest).toBe(expectedInterest);
    expect(result.taxes).toBe(expectedTaxes);
  });

});
