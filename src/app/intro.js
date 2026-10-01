import { BlurTargetView, BlurView } from "expo-blur";
import { Image } from "expo-image";
import { useRef } from "react";
import {
    Animated,
    ImageBackground,
    Linking,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

export default function IntroScreen({ onHeartPress }) {
  const targetRef = useRef(null);
  const heartScale = useRef(new Animated.Value(1)).current;

  return (
    <View style={styles.container}>
      <BlurTargetView ref={targetRef} style={styles.background}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={styles.backgroundImage}
        />
      </BlurTargetView>

      <Pressable
        onPress={() => {
          Animated.sequence([
            Animated.timing(heartScale, {
              toValue: 1.08,
              duration: 120,
              useNativeDriver: true,
            }),
            Animated.spring(heartScale, {
              toValue: 1,
              useNativeDriver: true,
            }),
          ]).start(({ finished }) => {
            if (finished) {
              onHeartPress?.();
            }
          });
        }}
        style={styles.heartButton}
      >
        <Animated.View style={{ transform: [{ scale: heartScale }] }}>
          <Image
            source={require("../../assets/images/heart.svg")}
            style={styles.heart}
            contentFit="contain"
          />
        </Animated.View>
      </Pressable>

      <View style={styles.topGlass}>
        <BlurView
          blurTarget={targetRef}
          blurMethod="dimezisBlurView"
          intensity={20}
          style={StyleSheet.absoluteFill}
        ></BlurView>
        <View style={styles.glassColor} />
        <Text style={styles.topText}>press for a warm hug 🫶🏻</Text>
      </View>

      <View style={styles.bottomGlass}>
        <BlurView
          blurTarget={targetRef}
          blurMethod="dimezisBlurView"
          intensity={20}
          style={StyleSheet.absoluteFill}
        ></BlurView>
        <View style={styles.glassColor} />
        <Text style={styles.bottomText}>
          if this made you smile,{" "}
          <Text
            onPress={() =>
              Linking.openURL(
                "https://chitrakulkarni2830.github.io/support-page/",
              )
            }
            style={styles.supportLink}
          >
            consider supporting me
          </Text>{" "}
          🫶🏻
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  background: {
    flex: 1,
    width: "100%",
  },
  backgroundImage: {
    flex: 1,
  },
  heartButton: {
    position: "absolute",
    width: 300,
    height: 261,
    left: "50%",
    top: "50%",
    marginLeft: -150,
    marginTop: -130.5,
  },
  heart: {
    width: "100%",
    height: "100%",
  },
  topText: {
    width: "100%",
    fontFamily: "Caprasimo_400Regular",
    fontSize: 21,
    color: "#cf0505",
    textAlign: "center",
  },
  topGlass: {
    position: "absolute",
    width: 345,
    height: 60,
    top: 100,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  glassColor: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 241, 241, 0.2)",
  },
  bottomText: {
    width: "100%",
    fontFamily: "Caprasimo_400Regular",
    fontSize: 21,
    color: "#cf0505",
    textAlign: "center",
  },
  bottomGlass: {
    position: "absolute",
    width: 345,
    height: 100,
    bottom: 70,
    borderRadius: 15,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  supportLink: {
    textDecorationLine: "underline",
    fontFamily: "Caprasimo_400Regular",
    fontSize: 21,
    color: "#cf0505",
    alignItems: "center",
  },
});
