import { storage } from '@/App';
import { ThemeProvider } from '@/theme';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import AccountDetails from './AccountDetails';

const props = {
  account: {
    balance: 500
  },
  invalidateAccountQuery: jest.fn(),
}
jest.mock('redux-persist', () => ({
  createTransform: jest.fn(),
  persistReducer: jest.fn((_, reducer) => reducer),
  persistStore: jest.fn(() => ({
    persist: jest.fn(),
  })),
  REHYDRATE: 'REHYDRATE',
}));


jest.mock('@/components/LogoutButton', () => 'LogoutButton');

describe('AccountDetails', () => {
  it('renders account details correctly', () => {
    render(<ThemeProvider storage={storage}>
      <AccountDetails {...props} />
    </ThemeProvider>);

    expect(screen.getByText('Available Balance')).toBeTruthy();
    expect(screen.getByText('Account Balance')).toBeTruthy();
    expect(screen.getByText('£500.00')).toBeTruthy();
    expect(screen.getByText('Accrued Interest')).toBeTruthy();
    expect(screen.getByText('+ £25.00')).toBeTruthy();
    expect(screen.getByText('Fees')).toBeTruthy();
    expect(screen.getByText('- £5.25')).toBeTruthy();
    expect(screen.getByText('Taxes')).toBeTruthy();
    expect(screen.getByText('- £77.96')).toBeTruthy();
    expect(screen.getByText('Remaining Balance:')).toBeTruthy();
    /**
     * as available balance and remaining balance show the same figure
     */
    expect(screen.queryAllByText('£441.79').length).toBe(2);

  });

  it('calls invalidateAccountQuery when "Refresh your account" button is pressed', () => {
    render(
      <ThemeProvider storage={storage}>
        <AccountDetails {...props} />
      </ThemeProvider>);
    fireEvent.press(screen.getByText('Refresh your account'));
    expect(props.invalidateAccountQuery).toHaveBeenCalled();
  });
});
