import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import DataContextProvider, { storage } from "./context/data-context";
import Main from "./main";
import * as Linking from "expo-linking";
import * as Notifications from "expo-notifications";
import prayTimes from "./PrayTimes";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";
import { Azanlist } from "./components/azanMenu";
import { getNext, getNextTime } from "./screens/sala";
import { formatArabicHours, formatArabicMint } from "./utils";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";
import {
  WidgetPreview,
  requestWidgetUpdate,
} from "react-native-android-widget";
import { JoharatAlMoslim } from "./widget";
import BackgroundTimer from "react-native-background-timer";

Notifications.setNotificationHandler({
  handleError: (id, err) => {},
  handleNotification: async (notification) => {
    return {
      shouldPlaySound: true,
      shouldSetBadge: true,
      shouldShowAlert: true,
    };
  },
});
Notifications.addNotificationResponseReceivedListener((response) => {
  if (response.actionIdentifier === "close") {
    Notifications.dismissAllNotificationsAsync();
  }
});
//https://docs.expo.dev/versions/latest/sdk/filesystem/#filesystemgetcontenturiasyncfileuri
const BACKGROUND_FETCH_TASK = "background-azan-Mouqit-task-expo-fetch-prod";
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.setNotificationCategoryAsync("salat", [
    {
      buttonTitle: "إغلاق",
      identifier: "close",
      options: {
        opensAppToForeground: false,
      },
    },
  ]);
  // const storage = new Storage({
  //   size: 1000,
  //   storageBackend: AsyncStorage,
  //   enableCache: true,
  //   defaultExpires: 9999999999999999999999999999
  // });
  var azanIndex = await storage.load({ key: "azan" }).catch((e) => {
    return "bad";
  });
  let azt = await storage.load({ key: "azaningwah" }).catch(() => null);
  azt = azt
    ? JSON.parse(azt)
    : {
        az1: true,
        az2: true,
        az3: true,
        az4: true,
        az5: true,
        azNumber1: 60,
        azNumber2: 60,
        azNumber3: 60,
        azNumber4: 60,
        azNumber5: 60,
        azAll: true,
      };
  if (azanIndex !== "bad") {
    await Notifications.cancelAllScheduledNotificationsAsync();
    const allNotifis = await Notifications.getAllScheduledNotificationsAsync();
    const sound = Azanlist[+azanIndex][2];

    await Notifications.setNotificationChannelAsync("AzaningFajr", {
      name: "الفجر",
      importance: Notifications.AndroidImportance.MAX,
      sound: sound,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
    await Notifications.setNotificationChannelAsync("AzaningDohr", {
      name: "الظهر",
      importance: Notifications.AndroidImportance.MAX,
      sound: sound,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
    await Notifications.setNotificationChannelAsync("AzaningAsr", {
      name: "العصر",
      importance: Notifications.AndroidImportance.MAX,
      sound: sound,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
    await Notifications.setNotificationChannelAsync("AzaningMagrep", {
      name: "المغرب",
      importance: Notifications.AndroidImportance.MAX,
      sound: sound,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
    await Notifications.setNotificationChannelAsync("AzaningAshaa", {
      name: "العشاء",
      importance: Notifications.AndroidImportance.MAX,
      sound: sound,
      lockscreenVisibility: Notifications.AndroidNotificationVisibility.PUBLIC,
    });
    var locationPromise = await storage.load({ key: "location" }).catch(() => {
      return {};
    });
    var BeforAzan = await storage.load({ key: "BeforAzan" }).catch(() => {
      return 0;
    });
    if (locationPromise) {
      locationData = JSON.parse(locationPromise);
      const prayTimesMs = await prayTimes.getTimes(new Date(), [
        locationData[0],
        locationData[1],
      ]);
      var times = {
        fajr: [
          +prayTimesMs.fajr.split(":")[0],
          +prayTimesMs.fajr.split(":")[1],
        ],
        dohr: [
          +prayTimesMs.dhuhr.split(":")[0],
          +prayTimesMs.dhuhr.split(":")[1],
        ],
        asr: [+prayTimesMs.asr.split(":")[0], +prayTimesMs.asr.split(":")[1]],
        magrep: [
          +prayTimesMs.maghrib.split(":")[0],
          +prayTimesMs.maghrib.split(":")[1],
        ],
        ashaa: [
          +prayTimesMs.isha.split(":")[0],
          +prayTimesMs.isha.split(":")[1],
        ],
      };
      const now = new Date();
      if (+BeforAzan !== 0) {
        if (
          !allNotifis.find((e) => e.identifier == "Tweetsfajr") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.fajr[0],
                +times.fajr[1] - +BeforAzan,
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.fajr[0],
                +times.fajr[1] - +BeforAzan,
                0
              ),

              repeats: false,
            },
            content: {
              title: "إقتربت صلاة  " + "الفجر",
              body:
                "متبقي على صلاة " +
                "الفجر" +
                " " +
                formatArabicMint(+BeforAzan),
              sound: true,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "Tweetsfajr",
          });
        if (
          !allNotifis.find((e) => e.identifier == "Tweetsdohr") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.dohr[0],
                +times.dohr[1] - +BeforAzan,
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.dohr[0],
                +times.dohr[1] - +BeforAzan,
                0
              ),

              repeats: false,
            },
            content: {
              title: "إقتربت صلاة  " + "الظهر",
              body:
                "متبقي على صلاة " +
                "الظهر" +
                " " +
                formatArabicMint(+BeforAzan),
              sound: true,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "Tweetsdohr",
          });
        if (
          !allNotifis.find((e) => e.identifier == "Tweetsasr") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.asr[0],
                +times.asr[1] - +BeforAzan,
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.asr[0],
                +times.asr[1] - +BeforAzan,
                0
              ),

              repeats: false,
            },
            content: {
              title: "إقتربت صلاة  " + "العصر",
              body:
                "متبقي على صلاة " +
                "العصر" +
                " " +
                formatArabicMint(+BeforAzan),
              sound: true,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "Tweetsasr",
          });
        if (
          !allNotifis.find((e) => e.identifier == "Tweetsmagrep") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.magrep[0],
                +times.magrep[1] - +BeforAzan,
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.magrep[0],
                +times.magrep[1] - +BeforAzan,
                0
              ),

              repeats: false,
            },
            content: {
              title: "إقتربت صلاة  " + "المغرب",
              body:
                "متبقي على صلاة " +
                "المغرب" +
                " " +
                formatArabicMint(+BeforAzan),
              sound: true,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "Tweetsmagrep",
          });
        if (
          !allNotifis.find((e) => e.identifier == "Tweetsashaa") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.ashaa[0],
                +times.ashaa[1] - +BeforAzan,
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.ashaa[0],
                +times.ashaa[1] - +BeforAzan,
                0
              ),

              repeats: false,
            },
            content: {
              title: "إقتربت صلاة  " + "العشاء",
              body:
                "متبقي على صلاة " +
                "العشاء" +
                " " +
                formatArabicMint(+BeforAzan),
              sound: true,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "Tweetsashaa",
          });
      }
      if (azt.az1)
        if (
          !allNotifis.find((e) => e.identifier == "fajr") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.fajr[0],
                +times.fajr[1],
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.fajr[0],
                +times.fajr[1],
                0
              ),
              channelId: "AzaningFajr",
              repeats: false,
            },
            content: {
              title:
                "أذان " + "الفجر" + " " + `(${times.fajr[0]}:${times.fajr[1]})`,
              body: "حان وقت صلاة " + "الفجر",
              sound: true,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "fajr",
          });
      if (azt.az2)
        if (
          !allNotifis.find((e) => e.identifier == "dohr") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.dohr[0],
                +times.dohr[1],
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.dohr[0],
                +times.dohr[1],
                0
              ),
              channelId: "AzaningDohr",
              repeats: false,
            },
            content: {
              title:
                "أذان " + "الظهر" + " " + `(${times.dohr[0]}:${times.dohr[1]})`,
              body: "حان وقت صلاة " + "الظهر",
              sound: sound,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "dohr",
          });
      if (azt.az3)
        if (
          !allNotifis.find((e) => e.identifier == "asr") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.asr[0],
                +times.asr[1],
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.asr[0],
                +times.asr[1],
                0
              ),
              channelId: "AzaningAsr",
              repeats: false,
            },
            content: {
              title:
                "أذان " + "العصر" + " " + `(${times.asr[0]}:${times.asr[1]})`,
              body: "حان وقت صلاة " + "العصر",
              sound: sound,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "asr",
          });
      if (azt.az4)
        if (
          !allNotifis.find((e) => e.identifier == "magrep") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.magrep[0],
                +times.magrep[1],
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.magrep[0],
                +times.magrep[1],
                0
              ),
              channelId: "AzaningMagrep",
              repeats: false,
            },
            content: {
              title:
                "أذان " +
                "المغرب" +
                " " +
                `(${times.magrep[0]}:${times.magrep[1]})`,
              body: "حان وقت صلاة " + "المغرب",
              sound: sound,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "magrep",
          });
      if (azt.az5)
        if (
          !allNotifis.find((e) => e.identifier == "ashaa") &&
          !(
            new Date() -
              new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.ashaa[0],
                +times.ashaa[1],
                0
              ) >=
            12000
          )
        )
          await Notifications.scheduleNotificationAsync({
            trigger: {
              date: new Date(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                +times.ashaa[0],
                +times.ashaa[1],
                0
              ),
              channelId: "AzaningAshaa",
              repeats: false,
            },
            content: {
              title:
                "أذان " +
                "العشاء" +
                " " +
                `(${times.ashaa[0]}:${times.ashaa[1]})`,
              body: "حان وقت صلاة " + "العشاء",
              sound: sound,
              vibrate: false,
              color: "#002b38",
              categoryIdentifier: "salat",
            },
            identifier: "ashaa",
          });
    }
  }
  await BackgroundTimer.runBackgroundTimer(async () => {
    await requestWidgetUpdate({
      widgetName: "JoharatAlMoslim",
      renderWidget: () => <JoharatAlMoslim />,
      widgetNotFound: () => {
        BackgroundTimer.stopBackgroundTimer();
      },
    });
  }, 1000);
  // Be sure to return the successful result type!
  return BackgroundFetch.BackgroundFetchResult.Failed;
});

// ErrorUtils.setGlobalHandler(function (e) {
//   Alert.alert('err');
//   Alert.alert(e);
// });
export async function registerBackgroundFetchAsync(isFromHome = false) {
  Notifications.cancelAllScheduledNotificationsAsync();
  if (!isFromHome) {
    BackgroundTimer.stopBackgroundTimer();
    BackgroundTimer.runBackgroundTimer(async () => {
      await requestWidgetUpdate({
        widgetName: "JoharatAlMoslim",
        renderWidget: () => <JoharatAlMoslim />,
        widgetNotFound: () => {
          BackgroundTimer.stopBackgroundTimer();
        },
      });
    }, 1000);
  }
  // // Cancel the timer when you are done with it
  // BackgroundTimer.clearInterval(intervalId);
  if (await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK)) {
    return true;
  } else
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
      minimumInterval: 2,
      stopOnTerminate: false,
      startOnBoot: true,
    });
}

export default function App() {
  useEffect(() => {
    return async () => {
      await SplashScreen.preventAutoHideAsync();
    };
  });

  const [fontsLoaded] = useFonts({
    font1: require("./assets/fonts/font1.ttf"),
    font2: require("./assets/fonts/font2.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
    await registerBackgroundFetchAsync(true);
  }, [fontsLoaded]);

  return (
    <>
      {fontsLoaded && (
        <View style={{ flex: 1 }}>
          <DataContextProvider>
            <I18nextProvider i18n={i18n}>
              <View
                style={styles.container}
                onLayoutRootView={onLayoutRootView}
              >
                <WidgetPreview
                  renderWidget={() => <JoharatAlMoslim />}
                  width={280}
                  height={280}
                />
              </View>
              <Main onLayoutRootView={onLayoutRootView}></Main>
            </I18nextProvider>
          </DataContextProvider>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
