import { Button, Text, View } from 'react-native';

import { Paths } from '@/navigation/paths';
import { useTheme } from '@/theme';
import type { StackNavigationProp } from '@react-navigation/stack';

import { SafeScreen } from '@/components/templates';

import { login } from '@/api';
import React from 'react';

type RootStackParamList = {
  Home: { name: string };
  Login: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

function Login({ navigation }: Props) {
  const { fonts, layout } = useTheme();


  const navigatePostAppLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Home }],
    });
  };

  const doLogin = async () => {
    try {
      const userToken = await login();
      if (userToken) {
        navigatePostAppLogin();
      }
    } catch (error) {
      console.error((error as Error).message);
    }
  };

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Text style={[fonts.size_16, fonts.gray800]}>Hello,</Text>
        <Button
          onPress={doLogin}
          title={'Login'}
        />
      </View>
    </SafeScreen>
  );
}

export default Login;
