import { SafeScreen } from '@/components/templates';
import FingerPrintImage from '@/images/fingerprint.png';
import PadlockImage from '@/images/padlock.png';
import { Paths } from '@/navigation/paths';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Biometrics({ navigation, route }) {
  const { name } = route.params;

  const navigatePostAppLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Home }],
    });
  };

  return (
    <SafeScreen style={styles.container}>
      <Text style={styles.welcomeText}>Welcome back, {name}</Text>
      <TouchableOpacity onPress={navigatePostAppLogin} testID="biometrics-button">
        <Image source={FingerPrintImage} style={styles.fingerPrintImage} />
      </TouchableOpacity>
      <View style={styles.lockContainer}>
        <Image source={PadlockImage} style={styles.padlockImage} />
        <Text style={styles.scanText}>Scan finger to unlock</Text>
      </View>
    </SafeScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-evenly',
  },
  fingerPrintImage: {
    height: 130,
    width: 130,
  },
  lockContainer: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  padlockImage: {
    height: 40,
    padding: 8,
    width: 40,
  },
  scanText: {
    textAlign: 'center',
  },
  welcomeText: {
    fontSize: 20,
  },
});
