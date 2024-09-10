import { Button, Text, useTheme } from "@ui-kitten/components";
import {
  ActivityIndicator,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { Audio } from "expo-av";
import { useEffect, useState } from "react";
import { AntDesign, Entypo, Feather, FontAwesome } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { Image } from "expo-image";
import { toHHMMSS } from "../utils";
let playbackObject = new Audio.Sound();

export default function Player({ audio, navigation }) {
  const [sound, setSound] = useState(null);
  const [played, setPlayed] = useState(null);
  const route = useRoute();
  const theme = useTheme();
  const [posInt, setPosInt] = useState(0);
  const [posNow, setPosNow] = useState(0);
  const [stopit, setstop] = useState(false);

  useState(async () => {
    try {
      if (sound) await sound.unloadAsync();
      await Audio.setAudioModeAsync({
        staysActiveInBackground: true,
      });
      const { sound } = await Audio.Sound.createAsync(audio);

      playbackObject = sound;

      setSound(sound);
      await sound.setPositionAsync(0);
      setInterval(async () => {
        if (playbackObject) {
          const status = await playbackObject.getStatusAsync();
          setPosInt(status.durationMillis / 1000);
          setPosNow(status.positionMillis / 1000);
          if (status.durationMillis == status.positionMillis) setPlayed(false);
        }
      }, 1000);
    } catch (err) {
      ToastAndroid.show("حدث خطأ", 2000);
      setTimeout(() => {
        ToastAndroid.show("ربما تكون السورة غير موجودة", 2000);
      }, 1000);
      setstop(true);
      console.log(`Encountered a fatal error during playback: ${err}`);
    }
  });
  async function play() {
    await sound.playAsync();
    setPlayed(true);
  }
  async function pause() {
    await sound.pauseAsync();
    setPlayed(false);
  }
  async function rotateLeft() {
    await sound.setPositionAsync(
      (await sound.getStatusAsync()).positionMillis - 5000
    );
    if (playbackObject) {
      const status = await playbackObject.getStatusAsync();
      setPosNow(status.positionMillis / 1000);
    }
  }
  async function rotateRight() {
    await sound.setPositionAsync(
      (await sound.getStatusAsync()).positionMillis + 5000
    );
    if (playbackObject) {
      const status = await playbackObject.getStatusAsync();
      setPosNow(status.positionMillis / 1000);
    }
  }
  async function setPosition(num) {
    await sound.setPositionAsync(num * 1000);
    if (playbackObject) {
      const status = await playbackObject.getStatusAsync();
      setPosNow(status.positionMillis / 1000);
    }
  }
  useEffect(() => {
    return async () => {
      await playbackObject.unloadAsync();
    };
  }, []);
  return (
    <View style={styles.contanier}>
      {sound && sound._loaded ? (
        <>
          <View style={styles.slider_view}>
            <Text style={styles.slider_time}> {toHHMMSS(posInt)} </Text>
            <Slider
              style={styles.slider_style}
              minimumValue={0}
              maximumValue={posInt || 10}
              minimumTrackTintColor="#00ff99"
              maximumTrackTintColor="#d3d3d3"
              thumbTintColor="#00ff99"
              onValueChange={setPosition}
              value={posNow || 0}
            />
            <Text style={styles.slider_time}> {toHHMMSS(posNow)} </Text>
          </View>

          <View style={styles.functions_view}>
            <FontAwesome
              onPress={rotateRight}
              size={24}
              color="#00ff99"
              style={{ marginLeft: "12%" }}
              name="forward"
            />
            {!played && (
              <AntDesign
                name="playcircleo"
                onPress={play}
                size={45}
                color="#00ff99"
                style={{ marginLeft: "12%" }}
              />
            )}
            {played && (
              <AntDesign
                name="pausecircle"
                onPress={pause}
                size={45}
                color="#00ff99"
                style={{
                  marginLeft: "12%",
                  textShadowColor: "black",
                  textShadowOffset: { height: 2, width: 2 },
                  textShadowRadius: 6,
                }}
              />
            )}
            <FontAwesome
              onPress={rotateLeft}
              size={24}
              color="#00ff99"
              style={{ marginLeft: "12%" }}
              name="backward"
            />
          </View>
        </>
      ) : stopit ? (
        <View></View>
      ) : (
        <ActivityIndicator color={"#00ff99"} size={30}></ActivityIndicator>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  contanier: {
    height: 100,
    width: "100%",
    alignItems: "center",
  },
  slider_view: {
    height: "50%",
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  slider_style: {
    flex: 1,
  },
  slider_time: {
    fontSize: 15,
    color: "#ffffff",
    textShadowColor: "black",
    textShadowOffset: { height: 2, width: 2 },
    textShadowRadius: 6,
  },
  functions_view: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginRight: "10%",
  },
});
