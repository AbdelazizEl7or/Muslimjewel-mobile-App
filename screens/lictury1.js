import { AntDesign, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, useTheme } from "@ui-kitten/components";
import { ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import RN, {
  ActivityIndicator,
  BackHandler,
  Dimensions,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import { toHHMMSS } from "../utils";
import Slider from "@react-native-community/slider";
function getGroups(str) {
  var groups = str.match(/(?:^|[()])[^()]+/g);
  if (!groups) return [];
  var parenLevel = 0;
  return groups.map(function (v) {
    if (v[0] === "(") {
      parenLevel++;
    } else if (v[0] === ")") {
      parenLevel--;
    }
    v = v.replace(/[()]/, "");
    return parenLevel > 0 ? "(" + v + ")" : v;
  });
}
const CustomText = (props) => {
  let text = props.text;
  return (
    <Text>
      {getGroups(text).map((e, i) => {
        if (e.includes("("))
          return (
            <Text key={i} style={[styles.text, { color: "#007b65" }]}>
              {e.replaceAll(".", ".\n")}
            </Text>
          );
        else
          return (
            <Text key={i} style={[styles.text]}>
              {e.replaceAll(".", ".\n")}
            </Text>
          );
      })}
    </Text>
  );
};

export default function Lictury1({ route, navigation }) {
  const theme = useTheme();
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [BackHandlerSub, setBackHandler] = React.useState({});
  const [loader, setLoader] = useState(false);

  const itemData = route.params.nawawia;
  function back() {
    navigation.navigate("Lictury");
  }
  useState(() => {
    navigation.addListener("focus", () => {
      setLoader(itemData.FilePath.includes("https://"));
      setBackHandler(
        BackHandler.addEventListener("hardwareBackPress", function () {
          if (route.name == "Lictury1") {
            navigation.navigate("Lictury");
            return true;
          }
        })
      );
      setTimeout(() => {
        navigation.setOptions({
          title: itemData.Lectures,
          headerRight: ({ tintColor }) => (
            <Ionicons
              onPress={back}
              color={tintColor}
              size={30}
              name="arrow-back"
            ></Ionicons>
          ),
        });
      }, 100);
    });
  });
  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setTimeout(() => {
        if (video.current) video.current.pauseAsync();
        if (BackHandlerSub && BackHandlerSub.remove) BackHandlerSub.remove();
      }, 10);
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <>
      {loader && (
        <View style={[styles.overlay]}>
          <ActivityIndicator size="large" color="gold" />
        </View>
      )}
      <ScrollView
        ref={(r) => {
          setTimeout(() => {}, 2000);
        }}
        style={{
          backgroundColor: theme["background-basic-color-2"],
          padding: 5,
          height: Dimensions.get("screen").height,
        }}
      >
        <Text
          key={1}
          style={{
            fontFamily: "font1",
            fontSize: 25,
            color: "#ff6200",
            textAlign: "center",
          }}
        >
          {itemData.Lectures}
        </Text>
        <Text
          key={2}
          style={{
            fontFamily: "font1",
            fontSize: 20,
            color: "#ff6200",
            textAlign: "center",
          }}
        >
          {itemData.Author}
        </Text>
        {itemData.FilePath.includes("https://") ? (
          <Video
            ref={video}
            style={{
              height: 400,
              borderColor: "#005547",
              borderStyle: "dashed",
              borderWidth: 2,
            }}
            source={{
              uri: itemData.FilePath,
            }}
            onLoad={(e) => {
              video.current.setPositionAsync(0);
              setLoader(false);
            }}
            useNativeControls={true}
            focusable={true}
            shouldPlay={true}
            rate={1}
            positionMillis={0}
            resizeMode={ResizeMode.CONTAIN}
            isLooping={false}
            onPlaybackStatusUpdate={(status) => setStatus(() => status)}
          />
        ) : (
          <YoutubePlayer
            onReady={() => setLoader(false)}
            height={300}
            play={true}
            videoId={itemData.FilePath}
          />
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "font2",
    fontSize: 23,
    textAlign: "center",
    lineHeight: 45,
  },
  contanier: {
    height: 100,
    width: "100%",
    alignItems: "center",
  },
  slider_view: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
  },
  slider_style: {
    flex: 1,
  },
  slider_time: {
    fontSize: 15,
    color: "#808080",
  },
  overlay: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: "#000000e6",
    zIndex: 999999999999999999999999999999,
    opacity: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  functions_view: {
    flexDirection: "row",
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
