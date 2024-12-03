import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';

const texts = [
  "Setting up your account...",
  "Not long now...",
  "Almost there..."
];

export default function Loader() {
  const [index, setIndex] = useState(0);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loopTexts = setInterval(() => {
      Animated.timing(fadeAnim, {
        duration: 2000,
        toValue: 0,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setTimeout(() => {
          Animated.timing(fadeAnim, {
            duration: 2000,
            toValue: 1,
            useNativeDriver: true,
          }).start();
        });
      });
    }, 3000);

    return () => clearInterval(loopTexts);
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <ActivityIndicator color="blue" size="large" />
      <Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
        <Text style={styles.text}>{texts[index]}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
  },
  text: {
    fontSize: 18,
    paddingTop: 8,
  },
  textContainer: {
    marginTop: 8,
  },
});
