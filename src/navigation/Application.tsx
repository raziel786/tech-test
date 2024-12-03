import type { RootStackParamList } from '@/navigation/types';
import React, { useEffect, useState } from 'react';

import { TOKEN_KEY } from "@env";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ActivityIndicator, Text, View } from 'react-native';
import { decode } from "react-native-pure-jwt";
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';

import { Biometrics, Home, Login } from '@/screens';
import { storage } from '../App';

const Stack = createStackNavigator<RootStackParamList>();


const checkAuthentication = async () => {
  const token = storage.getString('token');
  if (token) {
    try {
      const { payload: { exp, name } } = await decode(token, TOKEN_KEY);
      const currentTime = Math.floor(Date.now() / 1000);
      return { isAuthenticated: exp > currentTime, name };
    } catch (error) {
      console.error("Token decoding error:", error);
    }
  }
  return { isAuthenticated: false, name: '' };
};

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();
  const [initialRoute, setInitialRoute] = useState<null | Paths>(null);
  const [name, setName] = useState('')

  useEffect(() => {
    const authenticate = async () => {
      const { isAuthenticated, name } = await checkAuthentication();
      setInitialRoute(isAuthenticated ? Paths.Biometrics : Paths.Login);
      setName(isAuthenticated ? name : "");
    };
    authenticate();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ alignItems: 'center', flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator color="blue" size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          initialRouteName={initialRoute}
          key={variant}
          screenOptions={{ gestureEnabled: true, headerShown: false }}
        >
          <Stack.Screen component={Login} name={Paths.Login} />
          <Stack.Screen component={Biometrics} initialParams={{ name }}
            name={Paths.Biometrics}
          />
          <Stack.Screen component={Home} initialParams={{ name }}
            name={Paths.Home}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
