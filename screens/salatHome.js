import { Card, Text, useTheme } from "@ui-kitten/components";
import React, { useState, useContext, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { DataContext, storage } from "../context/data-context";
import * as Notifications from "expo-notifications";
import * as Location from "expo-location";
import * as Linking from "expo-linking";
import * as SplashScreen from "expo-splash-screen";
import prayTimes from "../PrayTimes";
import { Image } from "expo-image";
import { listBack } from "./settings";
import { useTranslation } from "react-i18next";
import { kuwaiticalendar, translateWithLang } from "../utils";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { hadith } from "../data/hadith";
let all = null;
let locationing = null;
let INlocationing = null;
let hadithDay = hadith[Math.floor(Math.random() * hadith.length)];

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
            <Text
              key={i}
              style={[
                {
                  fontFamily: "font2",
                  fontSize: 20,
                  textAlign: "center",
                  lineHeight: 25,
                },
                { color: "#007b65" },
              ]}
            >
              {e.replaceAll(".", ".\n")}
            </Text>
          );
        else
          return (
            <Text
              key={i}
              style={[
                {
                  fontFamily: "font2",
                  fontSize: 20,
                  textAlign: "center",
                  lineHeight: 25,
                },
              ]}
            >
              {e.replaceAll(".", ".\n")}
            </Text>
          );
      })}
    </Text>
  );
};
//https://iconscout.com/icon-pack/islam-12
//https://iconscout.com/icon-pack/islamic-2
export default function SalatHome({ navigation, route }) {
  const [time, setTime] = useState("");
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isListModal, setIsListModal] = useState("fajr");
  const [Back, setBack] = useState(require("../assets/images/z-2.jpg"));

  const [times, setTimes] = useState();
  const [timePar, setTimePar] = useState({ az: 1 });
  const [locationPlace, setLocationPlace] = useState("");
  const [location, setLocation] = useState(null);
  const DataCtx = useContext(DataContext);
  const theme = useTheme();
  const { t } = useTranslation();

  useState(async () => {
    setInterval(() => {
      const now = new Date();
      setTime(formatAMPM(now));
    }, 1000);
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
    await notifi();
  });
  const [aziAl, setAziAl] = useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      if (!INlocationing) {
        INlocationing = true;
        let locationPromise = await DataCtx.getLocation();
        if (
          JSON.stringify(locationing) !== JSON.parse(locationPromise) ||
          locationPromise == null
        ) {
          setTimes(null);
          setTimePar(null);
          locationPromise = await DataCtx.getLocation();
          if (locationPromise) {
            let locationData = JSON.parse(locationPromise);
            const prayTimesMs = await prayTimes.getTimes(
              new Date(),
              locationData
            );
            var all = {
              fajr: [
                ((+prayTimesMs.fajr.split(":")[0] + 11) % 12) + 1,
                +prayTimesMs.fajr.split(":")[1],
                +prayTimesMs.fajr.split(":")[0],
              ],
              shrock: [
                (+(+prayTimesMs.sunrise.split(":")[0] + 11) % 12) + 1,
                +prayTimesMs.sunrise.split(":")[1],
                +prayTimesMs.sunrise.split(":")[0],
              ],
              dohr: [
                +(((+prayTimesMs.dhuhr.split(":")[0] + 11) % 12) + 1),
                +prayTimesMs.dhuhr.split(":")[1],
                +prayTimesMs.dhuhr.split(":")[0],
              ],
              asr: [
                +(((+prayTimesMs.asr.split(":")[0] + 11) % 12) + 1),
                +prayTimesMs.asr.split(":")[1],
                +prayTimesMs.asr.split(":")[0],
              ],
              magrep: [
                +(((+prayTimesMs.maghrib.split(":")[0] + 11) % 12) + 1),
                +prayTimesMs.maghrib.split(":")[1],
                +prayTimesMs.maghrib.split(":")[0],
              ],
              ashaa: [
                +(((+prayTimesMs.isha.split(":")[0] + 11) % 12) + 1),
                +prayTimesMs.isha.split(":")[1],
                +prayTimesMs.isha.split(":")[0],
              ],
            };
            setTimes({
              fajr: [
                ((+prayTimesMs.fajr.split(":")[0] + 11) % 12) + 1,
                +prayTimesMs.fajr.split(":")[1],
                +prayTimesMs.fajr.split(":")[0],
              ],
              shrock: [
                (+(+prayTimesMs.sunrise.split(":")[0] + 11) % 12) + 1,
                +prayTimesMs.sunrise.split(":")[1],
                +prayTimesMs.sunrise.split(":")[0],
              ],
              dohr: [
                +(((+prayTimesMs.dhuhr.split(":")[0] + 11) % 12) + 1),
                +prayTimesMs.dhuhr.split(":")[1],
                +prayTimesMs.dhuhr.split(":")[0],
              ],
              asr: [
                +(((+prayTimesMs.asr.split(":")[0] + 11) % 12) + 1),
                +prayTimesMs.asr.split(":")[1],
                +prayTimesMs.asr.split(":")[0],
              ],
              magrep: [
                +(((+prayTimesMs.maghrib.split(":")[0] + 11) % 12) + 1),
                +prayTimesMs.maghrib.split(":")[1],
                +prayTimesMs.maghrib.split(":")[0],
              ],
              ashaa: [
                +(((+prayTimesMs.isha.split(":")[0] + 11) % 12) + 1),
                +prayTimesMs.isha.split(":")[1],
                +prayTimesMs.isha.split(":")[0],
              ],
            });
            if (all) {
              if (getNext(all) == "الفجر") {
                setTimePar({ az: 1 });
              }
              if (getNext(all) == "الظهر") {
                setTimePar({ az: 2 });
              }
              if (getNext(all) == "العصر") {
                setTimePar({ az: 3 });
              }
              if (getNext(all) == "المغرب") {
                setTimePar({ az: 4 });
              }
              if (getNext(all) == "العشاء") {
                setTimePar({ az: 5 });
              }
            }
          }
          await onLoad();
        }
        INlocationing = false;
      }
    });
    return unsubscribe;
  }, [navigation]);

  async function notifi() {
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
        setLocation([23.31667, 58.01667]);
        locationPor = [23.31667, 58.01667];
        if (!DataCtx.location) DataCtx.setLocation([23.31667, 58.01667]);
      } else {
        var myLoc = await Location.getCurrentPositionAsync({});
        locationPor = [myLoc.coords.latitude, myLoc.coords.longitude];
        setLocation(myLoc);
        if (!DataCtx.location)
          DataCtx.setLocation([myLoc.coords.latitude, myLoc.coords.longitude]);
      }
    }
    let locationData =
      location || JSON.parse(locationPromise || "[23.31667, 58.01667]");
    locationing = locationData;
    const prayTimesMs = await prayTimes.getTimes(new Date(), locationData);
    all = {
      fajr: [
        ((+prayTimesMs.fajr.split(":")[0] + 11) % 12) + 1,
        +prayTimesMs.fajr.split(":")[1],
        +prayTimesMs.fajr.split(":")[0],
      ],
      shrock: [
        (+(+prayTimesMs.sunrise.split(":")[0] + 11) % 12) + 1,
        +prayTimesMs.sunrise.split(":")[1],
        +prayTimesMs.sunrise.split(":")[0],
      ],
      dohr: [
        +(((+prayTimesMs.dhuhr.split(":")[0] + 11) % 12) + 1),
        +prayTimesMs.dhuhr.split(":")[1],
        +prayTimesMs.dhuhr.split(":")[0],
      ],
      asr: [
        +(((+prayTimesMs.asr.split(":")[0] + 11) % 12) + 1),
        +prayTimesMs.asr.split(":")[1],
        +prayTimesMs.asr.split(":")[0],
      ],
      magrep: [
        +(((+prayTimesMs.maghrib.split(":")[0] + 11) % 12) + 1),
        +prayTimesMs.maghrib.split(":")[1],
        +prayTimesMs.maghrib.split(":")[0],
      ],
      ashaa: [
        +(((+prayTimesMs.isha.split(":")[0] + 11) % 12) + 1),
        +prayTimesMs.isha.split(":")[1],
        +prayTimesMs.isha.split(":")[0],
      ],
    };
    setTimes({
      fajr: [
        ((+prayTimesMs.fajr.split(":")[0] + 11) % 12) + 1,
        +prayTimesMs.fajr.split(":")[1],
        +prayTimesMs.fajr.split(":")[0],
      ],
      shrock: [
        (+(+prayTimesMs.sunrise.split(":")[0] + 11) % 12) + 1,
        +prayTimesMs.sunrise.split(":")[1],
        +prayTimesMs.sunrise.split(":")[0],
      ],
      dohr: [
        +(((+prayTimesMs.dhuhr.split(":")[0] + 11) % 12) + 1),
        +prayTimesMs.dhuhr.split(":")[1],
        +prayTimesMs.dhuhr.split(":")[0],
      ],
      asr: [
        +(((+prayTimesMs.asr.split(":")[0] + 11) % 12) + 1),
        +prayTimesMs.asr.split(":")[1],
        +prayTimesMs.asr.split(":")[0],
      ],
      magrep: [
        +(((+prayTimesMs.maghrib.split(":")[0] + 11) % 12) + 1),
        +prayTimesMs.maghrib.split(":")[1],
        +prayTimesMs.maghrib.split(":")[0],
      ],
      ashaa: [
        +(((+prayTimesMs.isha.split(":")[0] + 11) % 12) + 1),
        +prayTimesMs.isha.split(":")[1],
        +prayTimesMs.isha.split(":")[0],
      ],
    });
    if (all) {
      if (getNext(all) == t("fajr")) {
        setTimePar({ az: 1 });
      }
      if (getNext(all) == t("dohr")) {
        setTimePar({ az: 2 });
      }
      if (getNext(all) == t("asr")) {
        setTimePar({ az: 3 });
      }
      if (getNext(all) == t("magrip")) {
        setTimePar({ az: 4 });
      }
      if (getNext(all) == t("ashaa")) {
        setTimePar({ az: 5 });
      }
    }
    var LocationPlace = await storage
      .load({ key: "LocationPlace" })
      .catch((e) => {
        return "لم يتم التعيين";
      });
    setLocationPlace(LocationPlace);
    if (LocationPlace == "لم يتم التعيين") {
      let address = await axios.get(
        "https://geocode.maps.co/reverse?lat=" +
          locationData[0] +
          "&lon=" +
          locationData[1] +
          "&api_key=65b875f4b9ddb952607663okpee73b0"
      );
      let addressTr = await translateWithLang(address.data.display_name);
      storage.save({ key: "LocationPlace", data: addressTr });
      setLocationPlace(addressTr);
    }
  }
  function getNext(e) {
    if (e.fajr[2] >= new Date().getHours()) {
      if (e.fajr[2] != new Date().getHours()) return t("fajr");
      else if (e.fajr[1] <= new Date().getMinutes()) return t("dohr");
      return t("fajr");
    }
    if (e.dohr[2] >= new Date().getHours()) {
      if (e.dohr[2] != new Date().getHours()) return t("dohr");
      else if (e.dohr[1] <= new Date().getMinutes()) return t("asr");
      return t("dohr");
    }
    if (e.asr[2] >= new Date().getHours()) {
      if (e.asr[2] != new Date().getHours()) return t("asr");
      else if (e.asr[1] <= new Date().getMinutes()) return t("magrip");
      return t("asr");
    }
    if (e.magrep[2] >= new Date().getHours()) {
      if (e.magrep[2] != new Date().getHours()) return t("magrip");
      else if (e.magrep[1] <= new Date().getMinutes()) return t("ashaa");
      return t("magrip");
    }
    if (e.ashaa[2] >= new Date().getHours()) {
      if (e.ashaa[2] != new Date().getHours()) return t("ashaa");
      else if (e.ashaa[1] <= new Date().getMinutes()) return t("fajr");
      return t("ashaa");
    }
    return t("fajr");
  }
  function getNextTime(e, isSeconds = true) {
    if (getNext(e) == t("fajr")) {
      const futureDate = new Date();
      futureDate.setHours(e.fajr[2]);
      futureDate.setMinutes(e.fajr[1]);
      futureDate.setSeconds(0);
      let timeleft = futureDate.getTime() - new Date().getTime();
      let days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      if (days == -1) {
        futureDate.setDate(futureDate.getDate() + 1);
        timeleft = futureDate.getTime() - new Date().getTime();
        days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      }
      const hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      return hours + ":" + minutes + (isSeconds ? ":" + seconds : "");
    }
    if (getNext(e) == t("dohr")) {
      const futureDate = new Date();
      futureDate.setHours(e.dohr[2]);
      futureDate.setMinutes(e.dohr[1]);
      futureDate.setSeconds(0);
      const timeleft = futureDate.getTime() - new Date().getTime();
      const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      return hours + ":" + minutes + (isSeconds ? ":" + seconds : "");
    }
    if (getNext(e) == t("asr")) {
      const futureDate = new Date();
      futureDate.setHours(e.asr[2]);
      futureDate.setMinutes(e.asr[1]);
      futureDate.setSeconds(0);
      const timeleft = futureDate.getTime() - new Date().getTime();
      const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      return hours + ":" + minutes + (isSeconds ? ":" + seconds : "");
    }
    if (getNext(e) == t("magrip")) {
      const futureDate = new Date();
      futureDate.setHours(e.magrep[2]);
      futureDate.setMinutes(e.magrep[1]);
      futureDate.setSeconds(0);
      const timeleft = futureDate.getTime() - new Date().getTime();
      const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      return hours + ":" + minutes + (isSeconds ? ":" + seconds : "");
    }
    if (getNext(e) == t("ashaa")) {
      const futureDate = new Date();
      futureDate.setHours(e.ashaa[2]);
      futureDate.setMinutes(e.ashaa[1]);
      futureDate.setSeconds(0);
      const timeleft = futureDate.getTime() - new Date().getTime();
      const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
      return hours + ":" + minutes + (isSeconds ? ":" + seconds : "");
    }
    const futureDate = new Date();
    futureDate.setHours(e.fajr[2]);
    futureDate.setMinutes(e.fajr[1]);
    futureDate.setSeconds(0);
    const timeleft = futureDate.getTime() - new Date().getTime();
    const days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    return hours + ":" + minutes + (isSeconds ? ":" + seconds : "");
  }
  function DoneNow(props) {
    return (
      <Pressable onPress={props.onPress} style={styles.shadow}>
        <View
          style={[
            {
              borderColor: "white",
              borderWidth: 2,
              justifyContent: "space-between",
              marginTop: 20,
              flexDirection: "row",
              textAlign: "center",
              color: theme["color-primary-100"],
              backgroundColor: "#dc454c",
              width: "100%",
              height: 60,
              alignItems: "center",
              textAlignVertical: "center",
              padding: 10,
              borderRadius: 10,
            },
            styles.shadow,
          ]}
        >
          <Text
            style={{
              fontSize: 23,
              fontFamily: t("font"),
              color: "white",
              textShadowColor: theme["background-basic-color-4"],
              textShadowOffset: { height: 1, width: 0 },
              textShadowRadius: 5,
              width: 80,
            }}
          >
            {props.name}
          </Text>
          <Ionicons
            color={"white"}
            size={30}
            name="information-circle-outline"
          ></Ionicons>
          <Text
            style={{
              fontSize: 23,
              fontFamily: t("font"),
              color: "white",
              textShadowColor: theme["background-basic-color-4"],
              textShadowOffset: { height: 1, width: 0 },
              textShadowRadius: 5,
              width: 80,
            }}
          >
            {props.time}
          </Text>
        </View>
      </Pressable>
    );
  }
  function Done(props) {
    return (
      <Pressable onPress={props.onPress}>
        <View
          style={[
            {
              borderColor: "white",
              borderWidth: 2,
              marginTop: 20,
              justifyContent: "space-between",
              flexDirection: "row",
              textAlign: "center",
              color: theme["color-primary-100"],
              backgroundColor: theme["background-basic-color-1"],
              width: "100%",
              height: 60,
              alignItems: "center",
              textAlignVertical: "center",
              padding: 10,
              borderRadius: 10,
            },
            styles.shadow,
          ]}
        >
          <Text
            style={{
              fontSize: 23,
              fontFamily: t("font"),
              textShadowColor: theme["background-basic-color-4"],
              textShadowOffset: { height: 1, width: 0 },
              textShadowRadius: 5,
              width: 80,
            }}
          >
            {props.name}
          </Text>
          <Ionicons
            color={theme["text-basic-color"]}
            size={30}
            name="information-circle-outline"
          ></Ionicons>
          <Text
            style={{
              fontSize: 23,
              fontFamily: t("font"),
              textShadowColor: theme["background-basic-color-4"],
              textShadowOffset: { height: 1, width: 0 },
              textShadowRadius: 5,
              width: 80,
            }}
          >
            {props.time}
          </Text>
        </View>
      </Pressable>
    );
  }
  function NotDone(props) {
    return (
      <Pressable onPress={props.onPress}>
        <View
          style={[
            {
              borderColor: "white",
              borderWidth: 2,
              justifyContent: "space-between",
              marginTop: 20,
              flexDirection: "row",
              textAlign: "center",
              color: theme["color-primary-100"],
              backgroundColor: "#002b38",
              width: "100%",
              height: 60,
              alignItems: "center",
              textAlignVertical: "center",
              padding: 10,
              borderRadius: 10,
            },
            styles.shadow,
          ]}
        >
          <Text
            style={{
              fontSize: 23,
              fontFamily: t("font"),
              color: "white",
              textShadowColor: theme["background-basic-color-4"],
              textShadowOffset: { height: 1, width: 0 },
              textShadowRadius: 5,
              width: 80,
            }}
          >
            {props.name}
          </Text>
          <Ionicons
            color={"white"}
            size={30}
            name="information-circle-outline"
          ></Ionicons>
          <Text
            style={{
              fontSize: 23,
              fontFamily: t("font"),
              color: "white",
              textShadowColor: theme["background-basic-color-4"],
              textShadowOffset: { height: 1, width: 0 },
              textShadowRadius: 5,
              width: 80,
            }}
          >
            {props.time}
          </Text>
        </View>
      </Pressable>
    );
  }
  function openFau(params) {
    setIsListModal(params);
    setIsListModalOpen(true);
  }
  function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? t("pm") : t("am");
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
    return strTime;
  }

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
    desc: {},
    modal: {
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
      fontFamily: "font2",
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
      fontFamily: "font2",
      fontSize: 33,
    },
    tafsr: {
      width: "100%",
      textAlign: "center",
      padding: 10,
      borderRadius: 20,
      backgroundColor: "black",
      marginVertical: 5,
      fontFamily: "font2",
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
      fontFamily: "font2",
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
      fontFamily: "font2",
      lineHeight: 25,
      flexDirection: "column",
      flex: 1,
    },
    text: {
      fontSize: 20,
      fontFamily: "font2",
      lineHeight: 25,
    },
    select: {
      flex: 0.8,
      margin: 5,
    },
    shadow: {
      shadowColor: theme["text-basic-color"],
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
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
            <Text style={styles.title}>
              {isListModal == "fajr"
                ? "صلاة الفجر"
                : isListModal == "dohr"
                ? "صلاة الظهر"
                : isListModal == "asr"
                ? "صلاة العصر"
                : isListModal == "magrep"
                ? "صلاة المغرب"
                : isListModal == "ashaa"
                ? "صلاة العشاء"
                : "وقت الشروق"}
            </Text>
          </View>
          <ScrollView>
            {isListModal == "fajr" ? (
              <Text
                style={{ fontFamily: t("font"), fontSize: 23, lineHeight: 45 }}
              >
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  صلاة الفجر
                </Text>
                {"\n"}
                صلاة الفجر أو صلاة الصبح هي أوّل الصلوات الخمس المفروضات على
                جميع المسلمين، وهي صلاة جهرية تتكوّن من ركعتين مفروضة وركعتين
                سنة قبلها وتسمّى سنة الفجر أو ركعتا الفجر وهي سنة مؤكّدة واظب
                عليها الرسول - صلى الله عليه وسلم-، وقد سُمّيت صلاة الفجر بهذا
                الاسم نسبةً إلى وقتها من الصبح الذي ينجلي فيه الظلام وينتشر
                الضوء في جميع الآفاق فقد سٌمّي فجرًا لانفجار الضوء وزوال العتمة
                والليل.
                {"\n"}
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  فضل صلاة الفجر في وقتها
                </Text>
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  1
                </Text>
                . من فضل صلاة الفجر في وقتها أنها تجلب الرزق الواسع يقول عليه
                الصلاة والسلام: «اللهم بارِكْ لأمتي في بكورها، وكان إذا بعث
                سَرِيَّةً أو جيشًا بعثهم أولَ النهارِ، قال : وكان صخرٌ تاجرًا
                فكان يبعثُ في تجارتِه أولَ النهارِ فأثْرَى وكثُرَ مالُه.» سنن
                أبي داود.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  2
                </Text>
                . تطرح البركة في الرزق.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  3
                </Text>
                . طيب النفس وصفائها.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  4
                </Text>
                . حصد الحسنات صلاة الفجر في وقتها وفي جماعة لها فضل وثواب عظيم
                كما أنها من أسباب تحصيل الأجر الجزيل العظيم.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  5
                </Text>
                . الحفظ في ذمّة الله، فهو ضمان الله -سبحانه وتعالى- وأمانه
                وعهده، وليس لأحدٍ أن يتعرّض للمصلّي بسوء.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  6
                </Text>
                . شهادة الملائكة له وتشريف من الملائكة برفع أسماء من صلّى الفجر
                لله عز وجل.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  7
                </Text>
                . دعاء الملائكة واستغفارها لمن يصلي الفجر.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  8
                </Text>
                . أجر قيام الليل فصلاة الفجر تعدل قيام ليلة كاملة.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  9
                </Text>
                . دخول الجنة لمن يصلّي الفجر، يقول عليه الصلاة والسلام: (مَن
                صَلَّى البَرْدَيْنِ دَخَلَ الجَنَّةَ).{" "}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#DE0A57",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  {" "}
                  رواه البخاري
                </Text>
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  10
                </Text>
                . أجر حجة وعمرة .{"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  11
                </Text>
                . صلاة الفجر تجعل الإنسان فى ذمه لله طوال اليوم.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  12
                </Text>
                . رؤية الله سبحانه وتعالى فصلاة الفجر لها في الإسلام مكانةٌ
                عظيمةٌ؛ فهي من أهمّ الصلوات المكتوبة وأقربها إلى رب العزة تبارك
                وتعالى، فـ صلاة الفجر تُظهر قُرب المسلم من خالقه؛ حين يقوم
                وينهضُ من نومه في وقت الفجر «وهو وقت يكون الناس فيه نيامًا»،
                فيقوم ويتوضّأ ويَخرج في هذا الوقت في ظُلمةِ الليل متجاوزًا برد
                الشتاء وحر الصيف؛ ليُطيع الله تعالى، وليقوم بما أمره به ربُّ
                العزة تبارك وتعالى من صلاة الفجر .{"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  13
                </Text>
                .هي خير من الدنيا وما فيها إذا التزم المسلم بها؛ وذلك لِعِظَم
                فضلها وأجرها عند الله سبحانه وتعالى، فقد وَرَدَ عن النبي -صلى
                الله عليه وسلم- أنه قال: «ركعَتا الفَجْرِ خَيرٌ مِنَ الدُنيا وما
                فيْها »
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#DE0A57",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  {" "}
                  رواه مسلم
                </Text>
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  14
                </Text>
                . صلاة الفجر في جماعة أنها النّور التّام للعبد المسلم المؤمن يوم
                القيامة، وهذا الفضل والأجر لمن يشهد صلاة الفجر مع الجماعة، فقد
                جاء عن النبي -صلى الله عليه وسلم- أنه قال: «بشّرِ المَشائيْنَ
                فيْ الظُلمِ إلى المَسَاجدِ بالنُور التّامِ يومَ القيْامَة»
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#DE0A57",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  {" "}
                  صحيح ابي داود
                </Text>
                .{"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  15
                </Text>
                . صلاة الفجر تجعل المسلم بحماية الله ورعايته، فقد رُوِيَ عن
                النبيّ -عليه الصّلاة والسّلام- أنه قال: «مَنْ صَلّى الصُبحَ
                فَهوَ فيْ ذِمَة الله»
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#DE0A57",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  {" "}
                  رواه مسلم
                </Text>
                .{"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  16
                </Text>
                . صلاة الفجر من أسباب النّجاة من النّار.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  17
                </Text>
                . فيها البشارة بدخول الجنّة؛ فقد ورد عن النبي -صلّى الله عليه
                وسلّم- أنه قال:«مَن صلَّى البردَينِ دخَل الجنةَ»، متفق عليه،
                والمقصود بالبردين هنا هما صلاتي الصّبح والعصر، وقد ثبت الترغيب
                في أن يؤدّي المسلم صلاة الصّبح في جماعة.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  18
                </Text>
                . أنها ضمانُ للمسلم -بالتزامه بـ صلاة الفجر - بقاءه في صفّ
                الإيمان والأمن من النفاق.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  19
                </Text>
                . صلاة الفجر تقي من عذاب الله وغضبه وعقابه.
                {"\n"}
              </Text>
            ) : isListModal == "dohr" ? (
              <Text
                style={{ fontFamily: t("font"), fontSize: 23, lineHeight: 45 }}
              >
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  صلاة الظهر
                </Text>
                {"\n"}
                صلاة الظهر لها فضل عظيم حيث كان النبي صلى الله عليه وسلم يصليها
                دائمًا ولا يتركها. وكان يصلي قبل الظهر أربع ركعات، وبعد الظهر
                ركعتين. وقد ذكر عبد الله بن السائب رضي الله عنه أن النبي صلى
                الله عليه وسلم قال إن صلاة الظهر لها ساعة تفتح فيها أبواب
                السماء، فأحب أن يصعد له فيها عمل صالح.
                {"\n"}
                وتأتي صلاة الظهر في وقتٍ يكون الناس منهمكين بأشغالهم وأعمالهم،
                وبأدائهم لها تطمئن قلوبهم، وتسكن أرواحهم التي قد يعتريها التوتر
                والتعب أثناء العمل، كما أنّ وقت الظهر يوافق في كثيرٍ من المناطق
                أجواءً حارَّةً؛ فإذا أدّوها في هذا الوقت تذكروا حرّ جهنّم؛
                فاستعاذوا بالله منها، ودعوه أن يقيهم حرّها وعذابها،[٧] وأمّا من
                حيث الفضيلة والثواب والأجر؛ فلم يرد في صلاة الظهر شيءٌ مخصوصٌ،
                إلّا أنّها داخلةٌ ومشمولةٌ في عموم فضل أداء الصلوات الفرائض
                مطلقًا،
              </Text>
            ) : isListModal == "asr" ? (
              <Text
                style={{ fontFamily: t("font"), fontSize: 23, lineHeight: 45 }}
              >
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  صلاة العصر
                </Text>
                {"\n"}
                صلاة العصْر هي الصلاة الوُسطى التي خصّها الله -سُبحانه وتعالى-
                بالذِّكر في كتابه الحكيم؛ تشريفاً لها، وتمييزاً وتفضيلاً لها على
                غيرها، وأمر بالمحافظة عليها، فقال -سُبحانه-: (حَافِظُوا عَلَى
                الصَّلَوَاتِ وَالصَّلَاةِ الْوُسْطَىٰ وَقُومُوا لِلَّـهِ
                قَانِتِينَ)،{"\n"} وممّا يدلُّ على أنّ الصلاة الوُسطى هي صلاة
                العَصْر؛ قَوْلُ النبيّ -صلّى الله عليه وسلّم- يوم الخندق:
                (مَلَأَ اللَّهُ قُبُورَهُمْ وبُيُوتَهُمْ نَارًا، كما شَغَلُونَا
                عن صَلَاةِ الوُسْطَى حتَّى غَابَتِ الشَّمْسُ وهي صَلَاةُ
                العَصْرِ)،{"\n"} وقال الإمام النوويّ -رحمه الله- تعليقاً على
                الحديث السابق: "الَّذِي تَقْتَضِيهِ الأَْحَادِيثُ الصَّحِيحَةُ:
                إِنَّ الصَّلاَةَ الْوُسْطَى هِيَ الْعَصْرُ".{"\n"} بيَّن النبيُّ
                -صلّى الله عليه وسلّم- أنّ المحافظةَ على صلاة العصر سببٌ لدخول
                الجنَّة، فقال: (مَن صَلَّى البَرْدَيْنِ دَخَلَ الجَنَّةَ)،{"\n"}{" "}
                والبردان هما: الصُّبح والعَصْر،[٦] وحذّر من تضييعها، والتهاونِ
                في أدائها، وبيّن أنّ مَن تركها فقد حبِطَ عملُه، فقال: (مَن
                تَرَكَ صَلَاةَ العَصْرِ فقَدْ حَبِطَ عَمَلُهُ)،{"\n"} وما
                شُدِّدَ في أمر صلاة العصْر إلّا أنّها عُرضت على الأُمم السابقة
                فما قاموا بحقِّها؛ لأنَّ وقت العصر كان زمانَ سُوقهم، وأوانَ
                أشغالِهِم، قال النبيّ -صلّى الله عليه وسلّم-: (إنَّ هذِه
                الصَّلَاةَ عُرِضَتْ علَى مَن كانَ قَبْلَكُمْ فَضَيَّعُوهَا، فمَن
                حَافَظَ عَلَيْهَا كانَ له أَجْرُهُ مَرَّتَيْنِ، وَلَا صَلَاةَ
                بَعْدَهَا حتَّى يَطْلُعَ الشَّاهِدُ وَالشَّاهِدُ:
                النَّجْمُ).[٨][٩]
              </Text>
            ) : isListModal == "magrep" ? (
              <Text
                style={{ fontFamily: t("font"), fontSize: 23, lineHeight: 45 }}
              >
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  صلاة المغرب
                </Text>
                {"\n"}
                فضل صلاة المغرب في وقتها ، قد ورد فيه عن رسول الله -صلى الله
                عليه وسلم- أنه أوصى بصلاة المغرب في وقتها لاغتنام فضلها العظيم،
                ومنه:
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  1
                </Text>
                - من يُصلي المغرب حاضرًا لن يدخل النار.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  2
                </Text>
                - سيدخل الجنة مباشرة دون سابقة عذاب ولا عقاب .{"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  3
                </Text>
                - صلاة المغرب هي آخر صلوات النهار ، كما أنها وتر النهار.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  4
                </Text>
                - طيب النفس وصفاؤها.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  5
                </Text>
                - حصد الحسنات صلاة المغرب في وقتها وفي جماعة لها فضل وثواب عظيم
                كما أنها من أسباب تحصيل الأجر الجزيل العظيم.5- والدعاء بعد صلاة
                المغرب مستجاب، حيث إن الدعاء بعد الصلوات المكتوبة مستجاب.
              </Text>
            ) : isListModal == "ashaa" ? (
              <Text
                style={{ fontFamily: t("font"), fontSize: 23, lineHeight: 45 }}
              >
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  صلاة العشاء
                </Text>
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  1
                </Text>
                - هي من أحبّ الصّلوات.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  2
                </Text>
                - صلاة العشاء أكثرها أجرًا.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  3
                </Text>
                - وجاء في الحديث الصّحيح قول المُصطفى صلّى الله عليه وسلّم: (مَن
                صلَّى صلاةَ العشاءِ والصُّبحِ في جماعةٍ فَهوَ كقيامِ ليلةٍ،
                وقالَ عبدُ الرَّحمنِ: من صلَّى العشاءَ في جماعةٍ فَهوَ كقيامِ
                نِصفِ ليلةٍ، ومن صلَّى الصُّبحَ في جماعةٍ فَهوَ كَقيامِ ليلةٍ)،
                ويدلّ ذلك على أفضليّة صلاة العشاء ومكانتها؛ فأداؤُها جماعةً يقوم
                مقام قيام نصف الليل، ومعلومٌ أنّ قيام الليل له من الفضل والأجر
                ما له.
                {"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  4
                </Text>
                - الدعاء بعدها مستجاب ، لأنها من الصلوات المكتوبة.
              </Text>
            ) : (
              <Text
                style={{ fontFamily: t("font"), fontSize: 23, lineHeight: 45 }}
              >
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#f89b05",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  فضل صلاة الشروق
                </Text>
                {"\n"}
                صلاة الشروق داخلة في صلاة الضحى، والفرق بينها وبين صلاة الضحى
                أنّها تُصلى بعد شروق الشمس بمقدار ربع إلى ثلث ساعة، وهي صلاة
                مستحبة وليست واجبة، وجاء في فضلها قول النبي عليه الصلاة والسلام:
                (مَن صلى الفجرَ في جماعةٍ، ثمّ قَعَد يَذْكُرُ اللهَ حتّى
                تَطْلُعَ الشمسُ، ثمّ صلى ركعتينِ، كانت له كأجرِ حَجَّةٍ
                وعُمْرَةٍ تامَّةٍ، تامَّةٍ ، تامَّةٍ)،{"\n"}
                <Text
                  style={{
                    fontFamily: "font1",
                    color: "#DE0A57",
                    width: 100,
                    marginBottom: 10,
                    fontSize: 23,
                    textAlign: "center",
                  }}
                >
                  {" "}
                  رواه الألباني،
                </Text>{" "}
                . {"\n"} ووقت صلاة الضحى من بعد ارتفاع الشمس بمقدار رمح في
                السماء إلى ما قبل زوال الشمس.[٢]
              </Text>
            )}
          </ScrollView>
        </View>
      </Modal>
      <ScrollView
        style={{ backgroundColor: theme["background-basic-color-3"] }}
      >
        <View>
          <View style={{ flex: 1 }}>
            {times && timePar && (
              <>
                <ImageBackground
                  source={Back}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Text
                    style={{
                      fontSize: 33,
                      textAlign: "center",
                      fontFamily: t("font"),
                      color: "#DE0A57",
                      textShadowColor: "black",
                      textShadowOffset: { height: 1, width: 0 },
                      textShadowRadius: 5,
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {writeIslamicDate(null)}
                    {"\n"}
                    {time}
                    {"\n"}
                    <Text
                      style={{
                        color: "#006c8d",
                        fontSize: 33,
                        textAlign: "center",
                        fontFamily: t("font"),
                      }}
                    >
                      {locationPlace}
                    </Text>
                    {"\n"}
                    {locationPlace && (
                      <Text
                        onPress={navigation.navigate.bind(this, "Settings")}
                        style={{
                          fontFamily: t("font"),
                          fontSize: 23,
                          color: "#009ac9",
                          textShadowColor: "#c70000",
                          textShadowOffset: { height: 1, width: 0 },
                          textShadowRadius: 5,
                        }}
                      >
                        تغير
                      </Text>
                    )}
                  </Text>
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      padding: 0,
                    }}
                  >
                    <ImageBackground
                      source={
                        timePar.az == 1
                          ? require("../assets/images/fajr.png")
                          : timePar.az == 2
                          ? require("../assets/images/dhuhr.png")
                          : timePar.az == 3
                          ? require("../assets/images/asr.png")
                          : timePar.az == 4
                          ? require("../assets/images/maghrib.png")
                          : timePar.az == 5
                          ? require("../assets/images/isha.png")
                          : require("../assets/images/fajr.png")
                      }
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: 200,
                        height: 200,
                        borderRadius: 10,
                        backgroundColor: theme["background-basic-color-2"],
                        borderColor: theme["text-basic-color"],
                        borderWidth: 0,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: t("font"),
                          fontSize: 23,
                          color: "white",
                          textShadowColor: "#c70000",
                          textShadowOffset: { height: 1, width: 0 },
                          textShadowRadius: 5,
                        }}
                      >
                        {t("stayOn")} {getNext(times)}
                      </Text>
                      <Text
                        style={{
                          fontFamily: t("font"),
                          fontSize: 23,
                          color: "white",
                          textShadowColor: "#c70000",
                          textShadowOffset: { height: 1, width: 0 },
                          textShadowRadius: 5,
                        }}
                      >
                        {" "}
                        {getNextTime(times)}
                      </Text>
                    </ImageBackground>
                  </View>
                  <ScrollView style={{ padding: 10, paddingTop: 40 }}>
                    {timePar.az == 1 ? (
                      <DoneNow
                        name={t("fajr")}
                        onPress={openFau.bind(this, "fajr")}
                        time={times.fajr[0] + ":" + times.fajr[1]}
                      ></DoneNow>
                    ) : (
                      <Done
                        name={t("fajr")}
                        onPress={openFau.bind(this, "fajr")}
                        time={times.fajr[0] + ":" + times.fajr[1]}
                      ></Done>
                    )}
                    <Done
                      name={t("shrok")}
                      onPress={openFau.bind(this, "shrock")}
                      time={times.shrock[0] + ":" + times.shrock[1]}
                    ></Done>
                    {timePar.az == 2 ? (
                      <DoneNow
                        name={t("dohr")}
                        onPress={openFau.bind(this, "dohr")}
                        time={times.dohr[0] + ":" + times.dohr[1]}
                      ></DoneNow>
                    ) : timePar.az > 2 ? (
                      <Done
                        name={t("dohr")}
                        onPress={openFau.bind(this, "dohr")}
                        time={times.dohr[0] + ":" + times.dohr[1]}
                      ></Done>
                    ) : (
                      <NotDone
                        name={t("dohr")}
                        onPress={openFau.bind(this, "dohr")}
                        time={times.dohr[0] + ":" + times.dohr[1]}
                      ></NotDone>
                    )}
                    {timePar.az == 3 ? (
                      <DoneNow
                        name={t("asr")}
                        onPress={openFau.bind(this, "asr")}
                        time={times.asr[0] + ":" + times.asr[1]}
                      ></DoneNow>
                    ) : timePar.az > 3 ? (
                      <Done
                        name={t("asr")}
                        onPress={openFau.bind(this, "asr")}
                        time={times.asr[0] + ":" + times.asr[1]}
                      ></Done>
                    ) : (
                      <NotDone
                        name={t("asr")}
                        onPress={openFau.bind(this, "asr")}
                        time={times.asr[0] + ":" + times.asr[1]}
                      ></NotDone>
                    )}
                    {timePar.az == 4 ? (
                      <DoneNow
                        name={t("magrip")}
                        onPress={openFau.bind(this, "magrep")}
                        time={times.magrep[0] + ":" + times.magrep[1]}
                      ></DoneNow>
                    ) : timePar.az > 4 ? (
                      <Done
                        name={t("magrip")}
                        onPress={openFau.bind(this, "magrep")}
                        time={times.magrep[0] + ":" + times.magrep[1]}
                      ></Done>
                    ) : (
                      <NotDone
                        name={t("magrip")}
                        onPress={openFau.bind(this, "magrep")}
                        time={times.magrep[0] + ":" + times.magrep[1]}
                      ></NotDone>
                    )}
                    {timePar.az == 5 ? (
                      <DoneNow
                        name={t("ashaa")}
                        onPress={openFau.bind(this, "ashaa")}
                        time={times.ashaa[0] + ":" + times.ashaa[1]}
                      ></DoneNow>
                    ) : timePar.az > 5 ? (
                      <Done
                        name={t("ashaa")}
                        onPress={openFau.bind(this, "ashaa")}
                        time={times.ashaa[0] + ":" + times.ashaa[1]}
                      ></Done>
                    ) : (
                      <NotDone
                        name={t("ashaa")}
                        onPress={openFau.bind(this, "ashaa")}
                        time={times.ashaa[0] + ":" + times.ashaa[1]}
                      ></NotDone>
                    )}
                  </ScrollView>
                </ImageBackground>
              </>
            )}
            {(!times || !timePar) && (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  height: Dimensions.get("screen").height,
                  backgroundColor: theme["background-basic-color-2"],
                  width: "100%",
                }}
              >
                <ImageBackground
                  style={{ width: 90, height: 90 }}
                  source={require("../assets/load.gif")}
                ></ImageBackground>
              </View>
            )}
          </View>
        </View>
        <Card
          onPress={async () =>
            await Share.share({
              message: hadithDay,
            })
          }
          style={{ marginBottom: 30 }}
          header={
            <Text>
              <Text style={[{ fontFamily: "font1", fontSize: 15 }]}>
                حديث اليوم
              </Text>
            </Text>
          }
        >
          <Text style={[{ fontFamily: "font1", fontSize: 10, lineHeight: 1 }]}>
            <CustomText text={hadithDay}></CustomText>
          </Text>
        </Card>
      </ScrollView>
    </>
  );
}
