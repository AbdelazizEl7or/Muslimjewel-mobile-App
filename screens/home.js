import { Card, Text, useTheme } from "@ui-kitten/components";
import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  BackHandler,
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DataContext, storage } from "../context/data-context";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import { kuwaiticalendar, writeDate } from "../utils";
import prayTimes from "../PrayTimes";
import { formatAMPM, getNext, getNextTime } from "./sala";
import { Image } from "expo-image";
import { hadith } from "../data/hadith";
import { listBack } from "./settings";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import axios from "axios";
//https://www.flaticon.com/free-animated-icons/islam
//https://iconscout.com/icon-pack/islam-12
//https://iconscout.com/icon-pack/islamic-2
//https://unsplash.com/s/photos/islamic
//https://www.reshot.com/free-svg-icons/islam/
//https://www.freepik.com/search?format=search&query=islam&type=vector

export default function Home({ navigation, route }) {
  const DataCtx = useContext(DataContext);
  const theme = useTheme();
  // const [Back, setBack] = useState(require("../assets/5127481.jpg"));
  const [Back, setBack] = useState(require("../assets/masgedBack.jpg"));
  const { t } = useTranslation();

  async function notifi() {
    await Notifications.setNotificationChannelAsync("salat", {
      name: "default",
      importance: Notifications.AndroidImportance.HIGH,
      sound: true,
    });
    const settings = await Notifications.getPermissionsAsync();
    try {
      if (settings.status == "denied") {
        const { status } = await Notifications.requestPermissionsAsync({
          android: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowAnnouncements: true,
          },
        }).catch(async () => {
          await SplashScreen.hideAsync();
        });
        if (status !== "granted") {
          Alert.alert(
            "لقد تم منع الإشعارات لن نقوم بإرسال إشعار عندما يحين وقت الصلاة",
            "",
            [{ text: "حسنا" }]
          );
        }
      }
      await SplashScreen.hideAsync();
    } catch (error) {
      await SplashScreen.hideAsync();
    }
  }
  useNavigation().addListener("focus", async () => {
    var azanIndex = await storage.load({ key: "azan" }).catch((e) => {
      return "bad";
    });
    if (azanIndex == "bad") {
      navigation.navigate("Settings1");
      ToastAndroid.show("لا بد من إختيار صوت الأذان اولا !", 2000);
    } else onLoad();
  });
  async function onLoad() {
    let locationPromise = await DataCtx.getLocation();
    if (!locationPromise || locationPromise == "[23.31667, 58.01667]") {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "تم رفض إذن الوصول إلى الموقع",
          "سنقوم بإختيار موقع عشوائي ويمكنك تغيره فيما بعد",
          [{ text: "حسنا" }]
        );
        if (!DataCtx.location) {
          DataCtx.setLocation([23.31667, 58.01667]);
        }
      } else {
        var myLoc = await Location.getCurrentPositionAsync({});
        if (!DataCtx.location)
          DataCtx.setLocation([myLoc.coords.latitude, myLoc.coords.longitude]);
      }
    }
    let locationPromise2 = await DataCtx.getLocation();
    let address = await axios.get(
      "https://geocode.maps.co/reverse?lat=" +
        locationPromise2[0] +
        "&lon=" +
        locationPromise2[1] +
        "&api_key=65b875f4b9ddb952607663okpee73b0"
    );
    let addressTr = await translateWithLang(address.data.display_name);
    storage.save({ key: "LocationPlace", data: addressTr });
  }

  useState(async () => {
    await notifi();
    await onLoad();
    BackHandler.addEventListener("hardwareBackPress", function () {
      if (route.name == "Home") {
        Alert.alert("! انتظر", "هل أنت متأكد من أنك تريد الخروج؟", [
          {
            text: "إلغاء",
            onPress: () => null,
            style: "cancel",
          },
          { text: "نعم", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
      return false;
    });
  });

  function writeIslamicDate(date) {
    var wdNames = JSON.parse(t("wdNamesInCorr"));
    var iMonthNames = JSON.parse(t("islamicMoth"));
    var iDate = kuwaiticalendar(date);
    var outputIslamicDate =
      wdNames[iDate[4]] +
      ", " +
      iDate[5] +
      " " +
      iMonthNames[iDate[6]] +
      " " +
      iDate[7];
    return outputIslamicDate;
  }
  function writeDate() {
    var wdNames = JSON.parse(t("wdNamesCorr"));
    var iMonthNames = JSON.parse(t("noislamicMonth"));
    var iDate = new Date();
    const currentDayOfWeek = wdNames[iDate.getDay()];

    var outputIslamicDate =
      currentDayOfWeek +
      ", " +
      iDate.getDate() +
      " " +
      iMonthNames[iDate.getMonth()] +
      " " +
      iDate.getFullYear();
    return outputIslamicDate;
  }
  const styles = StyleSheet.create({
    cont: {
      flex: 1,
      flexDirection: "row-reverse",
      flexWrap: "wrap",
      paddingVertical: 25,
    },
    card: {
      flex: 1,
      margin: 2,
    },
    name: {
      fontFamily: "normal",
      fontSize: 24,
      textAlign: "center",
    },
    shadow: {
      shadowColor: theme["text-basic-color"],
      backgroundColor: "#00585f",
      shadowColor: theme["text-basic-color"],
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 5.65,

      elevation: 18,
      borderWidth: 1,
    },
    tst: {
      color: "white",
      textShadowColor: "black",
      textShadowOffset: { height: 2, width: 2 },
      textShadowRadius: 5,
    },
  });
  return (
    <View
      style={{
        backgroundColor: theme["background-basic-color-4"],
        height: "100%",
      }}
    >
      <ScrollView style={{ height: "100%" }}>
        <ImageBackground
          source={Back}
          resizeMode="cover"
          imageStyle={{ opacity: 0.5 }}
          style={{
            paddingVertical: 16,
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row-reverse",
                backgroundColor: "#0090a0",
                borderRadius: 5,
                width: "80%",
                shadowColor: theme["text-basic-color"],
                shadowOffset: {
                  width: 3,
                  height: 3,
                },
                shadowOpacity: 0.1,
                shadowRadius: 5.65,

                elevation: 18,
              }}
            >
              <View
                style={{
                  fontSize: 23,
                  fontFamily: "font1",
                  textAlign: "center",
                  color: theme["color-primary-100"],
                  width: "50%",
                  alignItems: "center",
                  textAlignVertical: "center",
                  borderRadius: 10,
                }}
                imageStyle={{ flex: 1, borderRadius: 10, opacity: 0.7 }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontFamily: "font1",
                    textAlign: "center",
                    color: "white",
                    width: "100%",
                    flex: 1,
                    alignItems: "center",
                    textAlignVertical: "center",
                    padding: 10,
                    borderRadius: 10,
                    textShadowColor: "black",
                    textShadowOffset: { height: 2, width: 2 },
                    textShadowRadius: 5,
                  }}
                >
                  <Image
                    source={require("../assets/islamic-calendar.png")}
                    style={{ width: 40, height: 40 }}
                  ></Image>
                  {"\n"}
                  {writeIslamicDate(null)}
                  {"\n"}
                  {writeDate()}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              padding: 7,
              flex: 1,
              flexDirection: "row",
              paddingBottom: 20,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Container")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 20,
                  flexDirection: "row-reverse",
                  paddingHorizontal: 10,
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/mosque.png")}
                style={{ width: 40, height: 40 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                {"مواقيت" + "\n" + "الصلاة" || "t('salat')"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Qipla")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  height: 100,
                  borderRadius: 3,
                  marginVertical: 10,
                  borderColor: "black",
                  borderWidth: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/kabah.png")}
                style={{ width: 60, height: 60 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                {t("qipla")}
              </Text>
            </Pressable>
          </View>

          <View
            style={{
              padding: 7,
              flex: 1,
              flexDirection: "row",
              paddingBottom: 20,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("listenQuranAudio")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  height: 100,
                  marginVertical: 10,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/al-quran.png")}
                style={{ width: 40, height: 40 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                {"سماع" + "\n" + "القرآن" || "t('listn')"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Moshaf")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/al-quran-book.png")}
                style={{ width: 40, height: 40 }}
              ></Image>
              <Text
                style={[
                  { fontSize: 20, fontFamily: "font1", textAlign: "center" },
                  styles.tst,
                ]}
              >
                {t("moshaf")}{" "}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              padding: 7,
              flex: 1,
              flexDirection: "row",
              paddingBottom: 20,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Azkar")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/azkar.png")}
                style={{ width: 50, height: 50 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                {t("azkar")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Sebha")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/beads.png")}
                style={{ width: 50, height: 50 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                {t("sebha")}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              padding: 7,
              flex: 1,
              flexDirection: "row",
              paddingBottom: 20,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("HadithList")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/hadith.png")}
                style={{ width: 35, height: 35 }}
              ></Image>
              <Text style={[{ fontSize: 22, fontFamily: "font1" }, styles.tst]}>
                {t("HadithList")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("NwawiaList")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/hadith.png")}
                style={{ width: 35, height: 35 }}
              ></Image>
              <Text style={[{ fontSize: 22, fontFamily: "font1" }, styles.tst]}>
                {t("nwawia")}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              padding: 7,
              flex: 1,
              flexDirection: "row",
              paddingBottom: 20,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Tafseer")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/tafsir.png")}
                style={{ width: 35, height: 35, borderRadius: 10 }}
              ></Image>
              <Text
                style={[
                  { fontSize: 20, fontFamily: "font1", textAlign: "center" },
                  styles.tst,
                ]}
              >
                {"تفسير" + "\n" + "القرآن" || "t('tafsir')"}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Lictury")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/vid.png")}
                style={{ width: 50, height: 50 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                {t("Lictury")}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              padding: 7,
              flex: 1,
              flexDirection: "row",
              paddingBottom: 20,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() => navigation.navigate("Doaa")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/doaa.png")}
                style={{ width: 50, height: 50 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                {t("doaa")}
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Assma")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 2,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/allah.png")}
                style={{ width: 40, height: 40 }}
              ></Image>
              <Text
                style={[
                  { fontSize: 20, fontFamily: "font1", textAlign: "center" },
                  styles.tst,
                ]}
              >
                {t("asmaa")}{" "}
              </Text>
            </Pressable>
          </View>
          <View
            style={{
              padding: 7,
              flex: 1,
              flexDirection: "row",
              paddingBottom: 20,
              justifyContent: "space-between",
            }}
          >
            <Pressable
              onPress={() =>
                Linking.openURL("market://details?id=com.abdelazizel7or.salat")
              }
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/star.png")}
                style={{ width: 50, height: 50 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                تقييم {"\n"}التطبيق
              </Text>
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Nexts")}
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/nexts.png")}
                style={{ width: 50, height: 50 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                كم بقى
              </Text>
            </Pressable>
          </View>
          {/* <View
            style={{
              padding: 7,
              flex: 1,
              flexDirection: "row",
              paddingBottom: 20,
              justifyContent: "center",
            }}
          >
            <Pressable
              onPress={() =>
                Linking.openURL("market://details?id=com.abdelazizel7or.salat")
              }
              style={[
                {
                  width: "45%",
                  paddingHorizontal: 10,
                  flexDirection: "row-reverse",
                  marginVertical: 10,
                  height: 100,
                  borderRadius: 3,
                  borderColor: "black",
                  borderWidth: 3,
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: theme["background-basic-color-3"],
                  overflow: "hidden",
                },
                styles.shadow,
              ]}
              android_ripple={{ color: theme["background-basic-color-4"] }}
            >
              <Image
                source={require("../assets/star.png")}
                style={{ width: 50, height: 50 }}
              ></Image>
              <Text style={[{ fontSize: 20, fontFamily: "font1" }, styles.tst]}>
                تقييم {"\n"}التطبيق
              </Text>
            </Pressable>
          </View> */}
        </ImageBackground>
      </ScrollView>
    </View>
  );
}
