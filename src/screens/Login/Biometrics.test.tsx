import { Paths } from '@/navigation/paths';
import { fireEvent, render, screen } from '@testing-library/react-native';
import React from 'react';
import Biometrics from './Biometrics';

const mockNavigate = jest.fn();
const mockReset = jest.fn(() => mockNavigate);
const mockRoute = { params: { name: 'Johnny Bravo' } };

jest.mock('@/components/templates', () => ({
  SafeScreen: ({ children }) => <>{children}</>,
}));

jest.mock('@/navigation/paths', () => ({
  Paths: { Home: 'Home' },
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe('When the user clicks the finger print image', () => {
  it('Then the user is navigated back to his account screen', () => {
    render(<Biometrics navigation={{ reset: mockReset }} route={mockRoute} />);
    fireEvent.press(screen.getByTestId('biometrics-button'));
    expect(mockReset).toHaveBeenCalledWith({
      index: 0,
      routes: [{ name: Paths.Home }],
    });
  });
  it('displays correct welcome message based on route params', () => {
    render(<Biometrics navigation={{ reset: mockReset }} route={mockRoute} />);
    expect(screen.getByText('Welcome back, Johnny Bravo')).toBeTruthy();
  });

});
