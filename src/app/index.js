import { Caprasimo_400Regular, useFonts } from "@expo-google-fonts/caprasimo";
import { BlurTargetView, BlurView } from "expo-blur";
import { useRef } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from "react-native";


// flash screen
export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Caprasimo_400Regular,
  });

  const targetRef = useRef(null);

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF9C9C" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <BlurTargetView ref={targetRef} style={styles.background}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.background}
        />
      </BlurTargetView>

      <View style={styles.glassFrame}>
        <BlurView
          blurTarget={targetRef}
          blurMethod="dimezisBlurView"
          intensity={20}
          style={StyleSheet.absoluteFill}
        />

        <View style={styles.glassColor} />

        <Text style={styles.title}>SOFTLY</Text>
      </View>
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
