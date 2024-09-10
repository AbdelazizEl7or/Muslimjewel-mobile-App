import { Text, Card, useTheme, Input } from "@ui-kitten/components";
import {
  ActivityIndicator,
  BackHandler,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { useEffect, useState } from "react";
import { listLucy } from "../data/lictlist";
import { useNavigation } from "@react-navigation/native";
const roundList = listLucy
  .map((value) => ({ value, sort: Math.random() }))
  .sort((a, b) => a.sort - b.sort)
  .map(({ value }) => value);

export default function Lictury({ route, navigation }) {
  const theme = useTheme();
  const [hadithsAlls, sethadithsAlls] = useState(roundList);
  const [loader, setLoader] = useState(false);
  useNavigation().addListener("focus", () => {
    BackHandler.addEventListener("hardwareBackPress", function () {
      navigation.navigate("Home");
      return true;
    });
  });

  function openNawawia(i) {
    navigation.navigate("Lictury1", {
      nawawia: hadithsAlls[i],
    });
  }
  function serial(text) {
    text = text.replace(
      /([^\u0621-\u063A\u0641-\u064A\u0660-\u0669a-zA-Z 0-9])/g,
      ""
    );
    //normalize Arabic
    text = text.replace(/(آ|إ|أ)/g, "ا");
    text = text.replace(/(ة)/g, "ه");
    text = text.replace(/(ئ|ؤ)/g, "ء");
    text = text.replace(/(ى)/g, "ي");
    //convert arabic numerals to english counterparts.
    var starter = 0x660;
    for (var i = 0; i < 10; i++) {
      text.replace(
        String.fromCharCode(starter + i),
        String.fromCharCode(48 + i)
      );
    }
    return text;
  }

  function search(text) {
    console.log(text);
    setLoader(true);
    setTimeout(() => {
      let h = roundList;
      h = h.filter(
        (e) =>
          serial(e.Lectures).includes(serial(text)) ||
          (e.Author && serial(e.Author).includes(serial(text)))
      );
      sethadithsAlls(h);
    }, 0);
    setTimeout(() => {
      setLoader(false);
    }, 1000);
  }
  return (
    <>
      {loader && (
        <View style={[styles.overlay]}>
          <ActivityIndicator size="large" color="gold" />
        </View>
      )}
      <View
        style={{
          direction: "ltr",
          flex: 1,
          backgroundColor: theme["background-basic-color-3"],
        }}
      >
        <View style={{ height: 40 }}>
          <Input
            keyboardType="web-search"
            placeholder={"بحث"}
            style={{ flex: 1 }}
            onSubmitEditing={(e) => search(e.nativeEvent.text)}
          />
        </View>
        <FlatList
          style={{ flex: 1 }}
          initialNumToRender={20}
          data={hadithsAlls}
          renderItem={(itemData) => {
            return (
              <View key={itemData.index}>
                <Pressable
                  style={styles.inAz}
                  android_ripple={{ color: "#10151f" }}
                >
                  <Card
                    onPress={openNawawia.bind(this, itemData.index)}
                    style={styles.card}
                    status="info"
                  >
                    <Text style={styles.inAztext} key={itemData.index}>
                      <Text style={[styles.inAz, { color: "#ff6200" }]}>
                        {itemData.item.Lectures}
                      </Text>
                      {"\n"}
                      <Text
                        style={[
                          styles.inAz,
                          { color: "#ff6200", fontSize: 10 },
                        ]}
                      >
                        {itemData.item.Author}
                      </Text>
                    </Text>
                  </Card>
                </Pressable>
              </View>
            );
          }}
          keyExtractor={(item, i) => {
            return i;
          }}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  zekr: {
    width: "100%",
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "black",
    marginVertical: 5,
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
  inAz: {
    fontSize: 23,
    fontFamily: "font1",
    padding: 15,
  },
  inAztext: {
    fontSize: 23,
    fontFamily: "font2",
  },
});
