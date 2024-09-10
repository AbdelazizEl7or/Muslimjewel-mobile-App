import React, { useContext, useState } from "react";
import {
  IndexPath,
  Menu,
  MenuGroup,
  MenuItem,
  Text,
  Button,
} from "@ui-kitten/components";
import { DataContext, storage } from "../context/data-context";
import { Audio } from "expo-av";
import * as BackgroundFetch from "expo-background-fetch";
import * as Notifications from "expo-notifications";
import { View } from "react-native";
import { registerBackgroundFetchAsync } from "../App";
const BACKGROUND_FETCH_TASK = "background-azan-Mouqit-task-expo-fetch-prod";
let playbackObject = new Audio.Sound();
export const Azanlist = [
  [require("../assets/audios/azan1.mp3"), "أذان التطبيق 1", "azan1.mp3"],
  [require("../assets/audios/azan2.mp3"), "أذان التطبيق 2", "azan2.mp3"],
  [require("../assets/audios/azan3.mp3"), " منصور الزهراني", "azan3.mp3"],
  [require("../assets/audios/azan4.mp3"), "الله اكبر الله اكبر", "azan4.mp3"],
  [require("../assets/audios/azan5.mp3"), "أحمد الكوردي", "azan5.mp3"],
  [require("../assets/audios/azan7.mp3"), "ناصر القطامي", "azan7.mp3"],
  [require("../assets/audios/azan8.mp3"), "إسلام صبحي", "azan8.mp3"],
  [require("../assets/audios/azan9.mp3"), "حسام الدين عبادي", "azan9.mp3"],
  [require("../assets/audios/azan10.mp3"), "أذان المسجد الحرام", "azan10.mp3"],
];
export default function AzanMenu(props) {
  const DataCtx = useContext(DataContext);
  const [selectedIndex, setSelectedIndex] = React.useState(new IndexPath(0));
  useState(async () => {
    setSelectedIndex(new IndexPath(+(await DataCtx.getAzan())));
  });

  async function onSelect(index) {
    setSelectedIndex(index);
    await playbackObject.unloadAsync();
    const { sound } = await Audio.Sound.createAsync(Azanlist[index.row][0]);
    playbackObject = sound;
    await sound.playAsync();
  }
  async function save() {
    props.load(true);
    await playbackObject.unloadAsync();
    await DataCtx.setAzan(selectedIndex.row);
    await Notifications.dismissAllNotificationsAsync();
    await Notifications.cancelAllScheduledNotificationsAsync();
    await Notifications.deleteNotificationChannelAsync("AzaningFajr");
    await Notifications.deleteNotificationChannelAsync("AzaningDohr");
    await Notifications.deleteNotificationChannelAsync("AzaningAsr");
    await Notifications.deleteNotificationChannelAsync("AzaningMagrep");
    await Notifications.deleteNotificationChannelAsync("AzaningAshaa");
    await Notifications.deleteNotificationCategoryAsync("salat");
    await registerBackgroundFetchAsync(false);
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
      const sound = Azanlist[+azanIndex][2];

      await Notifications.setNotificationChannelAsync("AzaningFajr", {
        name: "الفجر",
        importance: Notifications.AndroidImportance.MAX,
        sound: sound,
        lockscreenVisibility:
          Notifications.AndroidNotificationVisibility.PUBLIC,
      });
      await Notifications.setNotificationChannelAsync("AzaningDohr", {
        name: "الظهر",
        importance: Notifications.AndroidImportance.MAX,
        sound: sound,
        lockscreenVisibility:
          Notifications.AndroidNotificationVisibility.PUBLIC,
      });
      await Notifications.setNotificationChannelAsync("AzaningAsr", {
        name: "العصر",
        importance: Notifications.AndroidImportance.MAX,
        sound: sound,
        lockscreenVisibility:
          Notifications.AndroidNotificationVisibility.PUBLIC,
      });
      await Notifications.setNotificationChannelAsync("AzaningMagrep", {
        name: "المغرب",
        importance: Notifications.AndroidImportance.MAX,
        sound: sound,
        lockscreenVisibility:
          Notifications.AndroidNotificationVisibility.PUBLIC,
      });
      await Notifications.setNotificationChannelAsync("AzaningAshaa", {
        name: "العشاء",
        importance: Notifications.AndroidImportance.MAX,
        sound: sound,
        lockscreenVisibility:
          Notifications.AndroidNotificationVisibility.PUBLIC,
      });
    }
    props.close();
    props.load(false);
  }
  async function close() {
    await playbackObject.unloadAsync();
    props.close();
  }

  return (
    <View>
      <Menu selectedIndex={selectedIndex} onSelect={(index) => onSelect(index)}>
        {Azanlist.map((e) => {
          return (
            <MenuItem
              key={e}
              title={() => (
                <Text
                  style={{ width: "100%", fontSize: 25, fontFamily: "font2" }}
                >
                  {e[1]}
                </Text>
              )}
            />
          );
        })}
      </Menu>
      <View style={{ justifyContent: "space-around", flexDirection: "row" }}>
        {!props.closeTrue && (
          <Button
            onPress={close}
            status="danger"
            style={{ marginTop: 20, minWidth: 130 }}
          >
            إغلاق
          </Button>
        )}
        <Button onPress={save} style={{ marginTop: 20, minWidth: 130 }}>
          حفظ
        </Button>
      </View>
    </View>
  );
}
