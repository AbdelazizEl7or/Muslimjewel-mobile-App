import {
  Button,
  Calendar,
  Card,
  Datepicker,
  Layout,
  NativeDateService,
  Text,
  ViewPager,
  useTheme,
} from "@ui-kitten/components";
import {
  Alert,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import prayTimes from "../PrayTimes";
import { ImageBackground } from "expo-image";
import { DataContext } from "../context/data-context";
import { Ionicons } from "@expo/vector-icons";
import { kuwaiticalendar, writeHijri } from "../utils";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";

const i18nAr = {
  dayNames: {
    short: ["ح", " ن", "ث", "ر", " خ", "ج", "س"],
    long: [
      "الاحد",
      " الاثنين",
      "الثلاثاء",
      "الاربعاء",
      " الخميس",
      "الجمعة",
      "السبت",
    ],
  },
  monthNames: {
    short: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
    long: [
      "يناير",
      "فبراير",
      "مارس",
      "أبريل",
      "مايو",
      "يونيو",
      "يوليو",
      "أغسطس",
      "سبتمبر",
      "أكتوبر",
      "نوفمبر",
      "ديسمبر",
    ],
  },
};
const i18nEn = {
  dayNames: {
    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    long: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
  },
  monthNames: {
    short: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    long: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
};

const localeDateService = new NativeDateService("ru", {
  i18n: i18n.language == "ar" ? i18nAr : i18nEn,
  startDayOfWeek: 1,
});
export default function Sala() {
  const DataCtx = useContext(DataContext);
  const theme = useTheme();
  const [date, setDate] = useState(new Date());
  const [times, setTimes] = useState(null);
  const { t } = useTranslation();

  useState(async () => {
    let locationPromise = await DataCtx.getLocation();
    if (locationPromise) {
      const prayTimesMs = await prayTimes.getTimes(
        new Date(),
        JSON.parse(locationPromise)
      );
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
        date: new Date(),
      });
    }
  });
  let min = new Date();
  min.setFullYear(1999);
  let max = new Date();
  max.setFullYear(3000);
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

  return (
    <ScrollView style={{ backgroundColor: theme["background-basic-color-3"] }}>
      <Calendar
        style={{
          width: "100%",
          backgroundColor: theme["background-basic-color-1"],
        }}
        dateService={localeDateService}
        date={date}
        min={min}
        max={max}
        onSelect={async (nextDate) => {
          let locationPromise = await DataCtx.getLocation();
          if (locationPromise) {
            setDate(nextDate);
            const prayTimesMs = await prayTimes.getTimes(
              new Date(nextDate),
              JSON.parse(locationPromise)
            );
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
              date: new Date(nextDate),
            });
          }
        }}
      />
      {times && (
        <View style={{}}>
          <Text
            style={{ fontSize: 23, fontFamily: t("font"), textAlign: "center" }}
          >
            <Text
              style={{
                fontSize: 23,
                fontFamily: t("font"),
                textAlign: "center",
              }}
            >
              {writeIslamicDate(times.date)}
            </Text>
          </Text>
          <View
            style={{
              justifyContent: "space-evenly",
              flexDirection: "column",
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                fontSize: 23,
                fontFamily: t("font"),
                textAlign: "center",
              }}
            >
              {t("fajr")} : {times.fajr[0] + ":" + times.fajr[1]}
            </Text>
            <Text
              style={{
                fontSize: 23,
                fontFamily: t("font"),
                textAlign: "center",
              }}
            >
              {t("shrok")} : {times.shrock[0] + ":" + times.shrock[1]}
            </Text>
            <Text
              style={{
                fontSize: 23,
                fontFamily: t("font"),
                textAlign: "center",
              }}
            >
              {t("dohr")} : {times.dohr[0] + ":" + times.dohr[1]}
            </Text>
            <Text
              style={{
                fontSize: 23,
                fontFamily: t("font"),
                textAlign: "center",
              }}
            >
              {t("asr")} : {times.asr[0] + ":" + times.asr[1]}
            </Text>
            <Text
              style={{
                fontSize: 23,
                fontFamily: t("font"),
                textAlign: "center",
              }}
            >
              {t("magrip")} : {times.magrep[0] + ":" + times.magrep[1]}
            </Text>
            <Text
              style={{
                fontSize: 23,
                fontFamily: t("font"),
                textAlign: "center",
              }}
            >
              {t("ashaa")} :{times.ashaa[0] + ":" + times.ashaa[1]}
            </Text>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "#101426",
    flex: 1,
  },
  titleCont: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  titleAll: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 23,
    fontFamily: "normal",
  },
  picker: {
    flex: 1,
  },
});
export function getNext(e) {
  if (e.fajr[2] >= new Date().getHours()) {
    if (e.fajr[2] != new Date().getHours()) return "الفجر";
    else if (e.fajr[1] <= new Date().getMinutes()) return "الظهر";
    return "الفجر";
  }
  if (e.dohr[2] >= new Date().getHours()) {
    if (e.dohr[2] != new Date().getHours()) return "الظهر";
    else if (e.dohr[1] <= new Date().getMinutes()) return "العصر";
    return "الظهر";
  }
  if (e.asr[2] >= new Date().getHours()) {
    if (e.asr[2] != new Date().getHours()) return "العصر";
    else if (e.asr[1] <= new Date().getMinutes()) return "المغرب";
    return "العصر";
  }
  if (e.magrep[2] >= new Date().getHours()) {
    if (e.magrep[2] != new Date().getHours()) return "المغرب";
    else if (e.magrep[1] <= new Date().getMinutes()) return "العشاء";
    return "المغرب";
  }
  if (e.ashaa[2] >= new Date().getHours()) {
    if (e.ashaa[2] != new Date().getHours()) return "العشاء";
    else if (e.ashaa[1] <= new Date().getMinutes()) return "الفجر";
    return "العشاء";
  }
  return "الفجر";
}
export function getNextTime(e, isSeconds = true) {
  if (getNext(e) == "الفجر") {
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
  if (getNext(e) == "الظهر") {
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
  if (getNext(e) == "العصر") {
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
  if (getNext(e) == "المغرب") {
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
  if (getNext(e) == "العشاء") {
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
export function formatAMPM(date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var ampm = hours >= 12 ? "مساء" : "صباحا";
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? "0" + minutes : minutes;
  var strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;
  return strTime;
}
