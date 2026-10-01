import { Caprasimo_400Regular, useFonts } from "@expo-google-fonts/caprasimo";
import { BlurTargetView, BlurView } from "expo-blur";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";
import IntroScreen from "./intro";
import MessageScreen from "./message";

export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    Caprasimo_400Regular,
  });

  const scale = useRef(new Animated.Value(1)).current;
  const [showIntro, setShowIntro] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      Animated.timing(scale, {
        toValue: 0,
        duration: 350,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          setShowIntro(true);
        }
      });
    }, 900);

    return () => clearTimeout(timeoutId);
  }, [scale]);

  const targetRef = useRef(null);

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF9C9C" />
      </View>
    );
  }

  if (showMessage) {
    return <MessageScreen />;
  }

  if (showIntro) {
    return <IntroScreen onHeartPress={() => setShowMessage(true)} />;
  }

  return (
    <View style={styles.container}>
      <BlurTargetView ref={targetRef} style={styles.background}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.background}
        />
      </BlurTargetView>

      <Animated.View style={[styles.glassFrame, { transform: [{ scale }] }]}>
        <BlurView
          blurTarget={targetRef}
          blurMethod="dimezisBlurView"
          intensity={20}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.glassColor} />

        <Text style={styles.title}>SOFTLY</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  background: {
    flex: 1,
  },

  glassFrame: {
    position: "absolute",
    width: 300,
    height: 150,
    left: "50%",
    top: "50%",
    marginLeft: -150,
    marginTop: -75,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  glassColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#FFF1F1",
  },

  title: {
    fontFamily: "Caprasimo_400Regular",
    fontSize: 40,
    color: "#FF9C9C",

    textAlign: "center",

    includeFontPadding: false,
    textAlignVertical: "center",
  },
});
