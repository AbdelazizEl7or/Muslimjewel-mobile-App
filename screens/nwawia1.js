import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Text, useTheme } from "@ui-kitten/components";
import React, { useRef, useState } from "react";
import RN, { ScrollView, StyleSheet, View } from "react-native";
function getGroups(str) {
  var groups = str.match(/(?:^|[{}])[^{}]+/g);
  if (!groups) return [];
  var parenLevel = 0;
  return groups.map(function (v) {
    if (v[0] === "{") {
      parenLevel++;
    } else if (v[0] === "}") {
      parenLevel--;
    }
    v = v.replace(/[{}]/, "");
    return parenLevel > 0 ? "{" + v + "}" : v;
  });
}
const CustomText = (props) => {
  let text = props.text;
  return (
    <Text>
      {getGroups(text).map((e, i) => {
        if (e.includes("{"))
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

export default function Nawawia1({ route, navigation }) {
  const theme = useTheme();
  const itemData = route.params.nawawia;
  function back() {
    navigation.navigate("NwawiaList");
  }
  useNavigation().addListener("focus", () => {
    navigation.setOptions({
      title: itemData.nameHadith,
      headerRight: ({ tintColor }) => (
        <Ionicons
          onPress={back}
          color={tintColor}
          size={30}
          name="arrow-back"
        ></Ionicons>
      ),
    });
  });
  return (
    <ScrollView
      ref={(r) => {
        setTimeout(() => {
          if (r) r.scrollTo({ x: 0, y: 0, animated: false });
        }, 200);
      }}
      style={{ backgroundColor: theme["background-basic-color-2"], padding: 5 }}
    >
      <Text
        key={1}
        style={{
          fontFamily: "font1",
          fontSize: 33,
          color: "#ff6200",
          textAlign: "center",
        }}
      >
        {itemData.nameHadith}
      </Text>
      <CustomText key={2} text={itemData.textHadith}></CustomText>
      <Text
        key={3}
        style={{
          fontFamily: "font1",
          fontSize: 33,
          color: "#ff6200",
          textAlign: "center",
        }}
      >
        شرح الحديث
      </Text>
      <CustomText key={4} text={itemData.explanationHadith}></CustomText>
      <Text
        key={5}
        style={{
          fontFamily: "font1",
          fontSize: 33,
          color: "#ff6200",
          textAlign: "center",
        }}
      >
        ترجمة الراوي
      </Text>
      <CustomText key={6} text={itemData.translateNarrator}></CustomText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: "font2",
    fontSize: 23,
    textAlign: "center",
    lineHeight: 45,
  },
});
