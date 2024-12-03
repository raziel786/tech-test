
/**
 * Helper function to format numbers as currency
 */

export const formatCurrency = (value: number) =>
  new Intl.NumberFormat('en-GB', {
    currency: 'GBP',
    style: 'currency',
  }).format(value);


export const calculateBreakdown = (balance: number) => {
  const taxRate = 0.15; // 15% tax rate
  const feeRate = 0.01; // 1% fee rate
  const annualInterestRate = 0.05; // 5% annual interest rate

  /**
   *   Step 1: Calculate interest
   */

  const interest = Number.parseFloat((balance * annualInterestRate).toFixed(2));
  const updatedBalance = balance + interest;

  /**
   *   Step 2: Calculate fees (1% of updated balance)
   */

  const fees = Number.parseFloat((updatedBalance * feeRate).toFixed(2));

  /**
   * Step 3: Calculate taxes (15% of net balance after fees)
   */

  const netBalanceAfterFees = updatedBalance - fees;
  const taxes = Number.parseFloat((netBalanceAfterFees * taxRate).toFixed(2));

  /**
   * Step 4: Calculate available balance
   */
  const availableBalance = Number.parseFloat(
    (netBalanceAfterFees - taxes).toFixed(2)
  );

  return {
    availableBalance: formatCurrency(availableBalance),
    fees: formatCurrency(fees),
    interest: formatCurrency(interest),
    taxes: formatCurrency(taxes),
  };
};
