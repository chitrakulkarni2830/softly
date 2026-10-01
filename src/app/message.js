import { Tinos_400Regular, useFonts } from "@expo-google-fonts/tinos";
import { BlurTargetView, BlurView } from "expo-blur";
import { useRef, useState } from "react";
import {
    ImageBackground,
    Linking,
    Platform,
    StyleSheet,
    Text,
    View,
} from "react-native";
import notes from "../data/notes";

let remainingNotes = [];
const serifFontFamily = Platform.select({
  ios: "Times New Roman",
  default: "Tinos_400Regular",
});

function getRandomMessage() {
  if (remainingNotes.length === 0) {
    remainingNotes = [...notes];

    for (let i = remainingNotes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));

      [remainingNotes[i], remainingNotes[j]] = [
        remainingNotes[j],
        remainingNotes[i],
      ];
    }
  }

  return remainingNotes.pop();
}

export default function MessageScreen() {
  useFonts({ Tinos_400Regular });
  const [message] = useState(getRandomMessage);
  const targetRef = useRef(null);

  return (
    <View style={styles.container}>
      <BlurTargetView ref={targetRef} style={StyleSheet.absoluteFill}>
        <ImageBackground
          source={require("../../assets/images/background.png")}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />
      </BlurTargetView>

      <View style={styles.outerNote}>
        <View style={styles.innerNote}>
          <View style={styles.hugPill}>
            <Text style={styles.hugText}>a warm hug 🥰</Text>
          </View>

          <Text style={styles.messageText}>{message}</Text>
        </View>
      </View>

      <View style={styles.bottomGlass}>
        <BlurView
          blurTarget={targetRef}
          blurMethod="dimezisBlurView"
          intensity={20}
          style={StyleSheet.absoluteFill}
        />
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
    alignItems: "center",
    justifyContent: "center",
  },
  outerNote: {
    width: 350,
    height: 250,
    backgroundColor: "#ff9baa",
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
  },

  innerNote: {
    width: 330,
    height: 230,
    backgroundColor: "#fff5f6",
    borderWidth: 4,
    borderStyle: "dashed",
    borderColor: "#a34859",
    borderRadius: 20,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  hugPill: {
    width: 125,
    height: 30,
    backgroundColor: "#ff9baa",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },

  hugText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "600",
    fontFamily: serifFontFamily,
  },

  messageText: {
    flex: 1,
    fontFamily: serifFontFamily,
    fontSize: 20,
    lineHeight: 27,
    color: "#a34859",
    textAlign: "justify",
    textAlignVertical: "center",
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
