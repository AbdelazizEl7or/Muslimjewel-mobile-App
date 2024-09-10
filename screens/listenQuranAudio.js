import {
  Avatar,
  Button,
  ListItem,
  Text,
  useTheme,
} from "@ui-kitten/components";
import {
  ActivityIndicator,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useState } from "react";
import { BaseUrl, Mans, Soars, numto3 } from "../data/MoshafAudio";
import { Ionicons } from "@expo/vector-icons";
import { CustomListItem } from "../components/listItem";
import { FlashList } from "@shopify/flash-list";
import Player from "../components/player";
import { useTranslation } from "react-i18next";
import { ImageBackground } from "expo-image";

let selectedIndex = 0;
let selectedMan = Mans[0];
export default function ListenQuranAudio({ navigation }) {
  const theme = useTheme();
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isListMansOpen, setIsListMansOpen] = useState(false);
  const [isLoad, setIsLoad] = useState(true);
  const [uri, setUri] = useState();
  const { t } = useTranslation();

  useState(async () => {
    await load();
  });
  async function load() {
    setIsLoad(true);
    const url = selectedMan.url ? selectedMan.url : BaseUrl;
    let uri = url + selectedMan.id + "/" + numto3(selectedIndex + 1) + ".mp3";
    if (selectedMan.id == "Abbadi-Houssem-Eddine" && selectedIndex == 1)
      uri = "https://abdiin.surge.sh/002.mp3";
    setUri({ uri });
    setTimeout(() => {
      setIsLoad(false);
    }, 1000);
  }
  async function onChangeMan(m) {
    selectedMan = m;
    setIsListMansOpen(false);
    await load();
  }
  async function onChangeIndex(m) {
    selectedIndex = m.id;
    setIsListModalOpen(false);
    await load();
  }
  const styles = StyleSheet.create({
    modal: {
      backgroundColor: "#101426",
      flex: 1,
    },
    titleCont: {
      flexDirection: "row-reverse",
      justifyContent: "space-between",
    },
    titleAll: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 23,
      fontFamily: t("font"),
    },
    picker: {
      flex: 1,
    },
    tab: {
      height: "90%",
      alignItems: "center",
      justifyContent: "center",
      flex: 1,
      backgroundColor: "white",
    },
    image: { width: "100%", height: "100%" },
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
    listItemText: {
      marginRight: 15,
      fontFamily: t("font"),
      fontSize: 33,
    },
    tafsr: {
      width: "100%",
      textAlign: "center",
      padding: 10,
      borderRadius: 20,
      backgroundColor: "black",
      marginVertical: 5,
      fontFamily: t("font"),
      fontSize: 23,
    },
    zekr: {
      width: "100%",
      textAlign: "center",
      borderRadius: 10,
      backgroundColor: "black",
      marginVertical: 5,
    },
    inAz: {
      fontSize: 23,
      fontFamily: t("font"),
      padding: 15,
    },
    inAztext: {
      fontSize: 23,
      fontFamily: "font1",
    },
    textTitle: {
      color: "#c70000",
      fontSize: 25,
      fontFamily: "font1",
    },
    textCont: {
      backgroundColor: "#1a1a1c",
      margin: 5,
      borderRadius: 4,
      padding: 6,
      fontSize: 20,
      fontFamily: t("font"),
      lineHeight: 25,
      flexDirection: "column",
      flex: 1,
    },
    text: {
      fontSize: 20,
      fontFamily: t("font"),
      lineHeight: 25,
    },
    select: {
      flex: 0.8,
      margin: 5,
    },
  });
  return (
    <>
      <Modal visible={isListModalOpen} animationType={"slide"}>
        <View
          style={[
            styles.modal,
            { backgroundColor: theme["background-basic-color-2"] },
          ]}
        >
          <View style={styles.titleCont}>
            <Ionicons
              onPress={setIsListModalOpen.bind(this, false)}
              style={styles.icon}
              name="close"
              size={30}
              color={theme["text-basic-color"]}
            ></Ionicons>
            <Text style={styles.title}>{t("sohra")}</Text>
          </View>
          <FlashList
            data={Soars}
            estimatedItemSize={200}
            renderItem={(itemData) => {
              return (
                <ListItem
                  onPress={onChangeIndex.bind(this, itemData.item)}
                  key={itemData.item.id}
                  accessoryRight={() => (
                    <>
                      <Text style={styles.listItemText}>
                        {JSON.parse(t("qouran"))[itemData.index]}
                      </Text>
                      <Avatar
                        style={[styles.itemImage]}
                        source={
                          itemData.item.place == "Makah"
                            ? require("../assets/Makah.png")
                            : require("../assets/Mdina.png")
                        }
                      />
                      <Button appearance="ghost" style={{ marginLeft: 5 }}>
                        {itemData.item.id + 1}
                      </Button>
                    </>
                  )}
                />
              );
            }}
          />
        </View>
      </Modal>
      <Modal visible={isListMansOpen} animationType={"slide"}>
        <View
          style={[
            styles.modal,
            { backgroundColor: theme["background-basic-color-2"] },
          ]}
        >
          <View style={styles.titleCont}>
            <Ionicons
              onPress={setIsListMansOpen.bind(this, false)}
              style={styles.icon}
              name="close"
              size={30}
              color={theme["text-basic-color"]}
            ></Ionicons>
            <Text style={styles.title}>{t("qare")}</Text>
          </View>
          <View
            style={{
              height: Dimensions.get("screen").height,
              width: Dimensions.get("screen").width,
            }}
          >
            <FlashList
              data={Mans}
              estimatedItemSize={200}
              renderItem={(itemData) => {
                return (
                  <CustomListItem
                    onPress={onChangeMan.bind(this, itemData.item)}
                    key={itemData.item.id}
                    id={itemData.item.id}
                    title={itemData.item.name}
                    description={""}
                    image={{ uri: itemData.item.image }}
                  ></CustomListItem>
                );
              }}
            />
          </View>
        </View>
      </Modal>
      {!isLoad ? (
        <ImageBackground
          style={{ backgroundColor: "black" }}
          imageStyle={{ opacity: 0.7 }}
          source={require("../assets/backs.jpg")}
        >
          <ScrollView
            style={{
              paddingTop: 10,
              height: Dimensions.get("screen").height,
            }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Pressable
                style={{
                  width: 100,
                  paddingVertical: 5,
                  backgroundColor: "#002b38",
                  borderRadius: 6,
                  alignItems: "center",
                }}
                status="success"
                onPress={setIsListMansOpen.bind(this, true)}
              >
                <Text
                  style={{
                    fontSize: 23,
                    fontFamily: t("font"),
                    color: "white",
                  }}
                >
                  {t("qare")}
                </Text>
              </Pressable>
              <Pressable
                style={{
                  width: 100,
                  paddingVertical: 5,
                  backgroundColor: "#002b38",
                  borderRadius: 6,
                  alignItems: "center",
                }}
                status="success"
                onPress={setIsListModalOpen.bind(this, true)}
              >
                <Text
                  style={{
                    fontSize: 23,
                    fontFamily: t("font"),
                    color: "white",
                  }}
                >
                  {t("sohra")}
                </Text>
              </Pressable>
            </View>
            <View
              style={{
                width: "100%",
                alignItems: "center",
                flexDirection: "row",
                justifyContent: "space-between",
                marginVertical: 20,
              }}
            >
              <CustomListItem
                onPress={console.log}
                key={selectedMan.id}
                id={selectedMan.id}
                title={selectedMan.name}
                description={""}
                image={{ uri: selectedMan.image }}
              ></CustomListItem>
            </View>
            <Text
              style={[
                styles.text,
                {
                  textAlign: "center",
                  fontSize: 33,
                  paddingVertical: 20,
                  textShadowColor: "black",
                  textShadowOffset: { height: 2, width: 2 },
                  textShadowRadius: 6,
                },
              ]}
            >
              {JSON.parse(t("qouran"))[selectedIndex]}
            </Text>
            <Player audio={uri} navigation={navigation}></Player>
          </ScrollView>
        </ImageBackground>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: Dimensions.get("screen").height,
            backgroundColor: theme["background-basic-color-2"],
            width: "100%",
          }}
        >
          <ActivityIndicator color={"gold"} size={100}></ActivityIndicator>
        </View>
      )}
    </>
  );
}
