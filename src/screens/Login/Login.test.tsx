import { login } from '@/api';
import { storage } from '@/App';
import { ThemeProvider } from '@/theme';
import { fireEvent, render, screen, waitFor } from '@testing-library/react-native';
import React from 'react';
import Login from './Login';

jest.mock('@/api', () => ({
  login: jest.fn(),
}));


jest.mock('@/navigation/paths', () => ({
  Paths: { Home: 'Home' },
}));

jest.mock('@/components/templates', () => ({
  SafeScreen: ({ children }) => <>{children}</>,
}));

jest.mock('redux-persist', () => ({
  createTransform: jest.fn(),
  persistReducer: jest.fn((_, reducer) => reducer),
  persistStore: jest.fn(() => ({
    persist: jest.fn(),
  })),
  REHYDRATE: 'REHYDRATE',
}));


const mockNavigate = jest.fn();
const mockReset = jest.fn(() => mockNavigate);
const loginMock = login as jest.Mock;

afterEach(() => {
  jest.clearAllMocks();
});

describe('Login', () => {
  it('renders correctly', () => {
    render(
      <ThemeProvider storage={storage}>
        <Login navigation={{ reset: mockReset }} />
      </ThemeProvider>
    );
    expect(screen.getByText('Login')).toBeTruthy();
  });
})

describe('When the user clicks `Login`', () => {
  it('Then the user is logged in successfully', async () => {
    loginMock.mockResolvedValue('mock_token');
    render(
      <ThemeProvider storage={storage}>
        <Login navigation={{ reset: mockReset }} />
      </ThemeProvider>
    );
    fireEvent.press(screen.getByText('Login'));
    await waitFor(() => expect(mockReset).toHaveBeenCalledTimes(1));
    expect(login).toHaveBeenCalled();
  });
})

describe('When the token has failed to generate', () => {
  it('Then the user is not navigated to the `Home` screen', async () => {
    loginMock.mockResolvedValue(null);
    render(
      <ThemeProvider storage={storage}>
        <Login navigation={{ reset: mockReset }} />
      </ThemeProvider>
    );
    fireEvent.press(screen.getByText('Login'));
    await waitFor(() => expect(mockReset).not.toHaveBeenCalled());
  });
});
