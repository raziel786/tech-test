import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react-native';

import { storage } from '@/App';
import { store } from '@/redux/store';
import { ThemeProvider } from '@/theme';
import { Provider } from 'react-redux';

import React from 'react';
import Home from './Home';

jest.mock('redux-persist', () => ({
  createTransform: jest.fn(),
  persistReducer: jest.fn((config, reducer) => reducer),
  persistStore: jest.fn(() => ({
    persist: jest.fn(),
  })),
  REHYDRATE: 'REHYDRATE',
}));

describe('Home screen should render correctly', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
      },
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  });

  const params = {
    route: {
      params: {
        name: "John"
      }
    }
  }

  describe('When the user account hasnt been set yet', () => {
    it('Then the Loader screen is rendered', () => {
      const component = (
        <ThemeProvider storage={storage}>
          <QueryClientProvider client={queryClient}>
            <Home {...params} />
          </QueryClientProvider>
        </ThemeProvider>
      );

      const { getByTestId } = render(component);

      expect(getByTestId('loading-screen')).toBeTruthy();
    });
  });


  describe('When the user account is pending', () => {
    it('Then the Loader screen is rendered with no bleeding information', () => {

      const mockAccount = { name: 'John', status: 'pending' };
      storage.set("account", JSON.stringify(mockAccount));

      const component = (
        <Provider store={store}>
          <NavigationContainer>
            <ThemeProvider storage={storage}>
              <QueryClientProvider client={queryClient}>
                <Home {...params} />
              </QueryClientProvider>
            </ThemeProvider>
          </NavigationContainer>
        </Provider>
      );

      render(component);

      expect(screen.getByTestId('loading-screen')).toBeTruthy();
      expect(screen.queryByText('Hi John,')).toBeNull();
      expect(screen.queryByTestId('account-details-screen')).toBeNull();
    });
  });


  describe('When the user account is completed', () => {
    it('Then the account details screen is rendered', () => {

      const mockAccount = { name: 'John', status: 'completed' };
      storage.set("account", JSON.stringify(mockAccount));

      const component = (
        <Provider store={store}>
          <NavigationContainer>
            <ThemeProvider storage={storage}>
              <QueryClientProvider client={queryClient}>
                <Home {...params} />
              </QueryClientProvider>
            </ThemeProvider>
          </NavigationContainer>
        </Provider>
      );

      render(component);

      expect(screen.queryByTestId('loading-screen')).toBeNull();
      expect(screen.getByTestId('home-screen')).toBeTruthy();
      expect(screen.getByText('Hi John,')).toBeTruthy();
      expect(screen.getByTestId('account-details-screen')).toBeTruthy();
    });
  });
});