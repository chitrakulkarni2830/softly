import { Caprasimo_400Regular, useFonts } from "@expo-google-fonts/caprasimo";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
import notes from "../data/notes";
import IntroScreen from "./intro";
import MessageScreen from "./message";

const NOTE_CYCLE_STORAGE_KEY = "softly.note-cycle.v1";

function shuffleNotes() {
  const shuffled = [...notes];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

function hasSameOrder(first, second) {
  return (
    first.length === second.length &&
    first.every((note, index) => note === second[index])
  );
}

async function getNextStoredNote() {
  const storedValue = await AsyncStorage.getItem(NOTE_CYCLE_STORAGE_KEY);
  let cycle;
  let nextIndex = 0;

  try {
    const stored = JSON.parse(storedValue);
    if (
      Array.isArray(stored?.cycle) &&
      stored.cycle.length === notes.length &&
      stored.cycle.every((note) => notes.includes(note)) &&
      Number.isInteger(stored.nextIndex) &&
      stored.nextIndex >= 0 &&
      stored.nextIndex <= notes.length
    ) {
      cycle = stored.cycle;
      nextIndex = stored.nextIndex;
    }
  } catch {}

  if (!cycle || nextIndex === cycle.length) {
    const previousCycle = cycle;
    cycle = shuffleNotes();
    if (previousCycle && hasSameOrder(cycle, previousCycle)) {
      cycle.push(cycle.shift());
    }
    nextIndex = 0;
  }

  const message = cycle[nextIndex];
  await AsyncStorage.setItem(
    NOTE_CYCLE_STORAGE_KEY,
    JSON.stringify({ cycle, nextIndex: nextIndex + 1 }),
  );
  return message;
}

export default function SplashScreen() {
  const [fontsLoaded] = useFonts({
    Caprasimo_400Regular,
  });

  const scale = useRef(new Animated.Value(1)).current;
  const [showIntro, setShowIntro] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState(null);
  const isSelectingMessage = useRef(false);
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

  const handleHeartPress = async () => {
    if (isSelectingMessage.current) return;
    isSelectingMessage.current = true;

    try {
      const nextMessage = await getNextStoredNote();
      setMessage(nextMessage);
      setShowMessage(true);
    } catch (error) {
      console.error("Unable to load the next saved note", error);
    } finally {
      isSelectingMessage.current = false;
    }
  };

  const targetRef = useRef(null);

  if (!fontsLoaded) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FF9C9C" />
      </View>
    );
  }

  if (showMessage) {
    return (
      <MessageScreen message={message} onHome={() => setShowMessage(false)} />
    );
  }

  if (showIntro) {
    return <IntroScreen onHeartPress={handleHeartPress} />;
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
