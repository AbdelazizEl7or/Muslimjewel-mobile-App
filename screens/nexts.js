import { Text, useTheme } from "@ui-kitten/components";
import { useTranslation } from "react-i18next";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { kuwaiticalendar } from "../utils";
import { useState } from "react";
import { ImageBackground } from "expo-image";
export default function Nexts() {
  const theme = useTheme();
  const [ramadn, setRmdan] = useState({});
  const [fitr, setFitr] = useState({});
  const [adha, setAdha] = useState({});
  const { t } = useTranslation();
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
  let arrHigry = [];
  useState(() => {
    for (let i = -10; i < 370; i++) {
      let e = new Date();
      e.setDate(e.getDate() + i);
      e.setSeconds(Math.floor(Math.random() * 50));
      e.setHours(0);
      e.setMinutes(Math.floor(Math.random() * 11));
      arrHigry.push([e.getTime(), writeIslamicDate(e)]);
    }
    setInterval(() => {
      setRmdan(calcRamadans());
      setFitr(calcFitrs());
      setAdha(calcAdha());
    }, 1000);
  });

  function calcRamadans() {
    var dateFuture = new Date(arrHigry.find((e) => e[1].includes("رمضان"))[0]);
    dateFuture.setDate(dateFuture.getDate() - 1);
    var dateNow = new Date();

    // var seconds = Math.floor((dateFuture - dateNow) / 1000);
    // var minutes = Math.floor(seconds / 60);
    // var hours = Math.floor(minutes / 60);
    // var days = Math.floor(hours / 24);

    // hours = hours - days * 24;
    // minutes = minutes - days * 24 * 60 - hours * 60;
    // seconds = seconds - days * 24 * 60 * 60 - hours * 60 * 60 - minutes * 60;
    // dateRmdan = console.log(dateRmdan);
    var d = Math.abs(dateFuture - dateNow) / 1000; // delta
    var r = {}; // result
    var s = {
      // structure
      y: 31536000,
      m: 2592000,
      d: 86400, // feel free to add your own row
      h: 3600,
      mi: 60,
      s: 1,
    };

    Object.keys(s).forEach(function (key) {
      r[key] = Math.floor(d / s[key]);
      d -= r[key] * s[key];
    });
    return r;
  }
  //https://www.freepik.com/collection?query=eid%20al%20adha%20banner&id=568
  function calcFitrs() {
    var dateFuture = new Date(arrHigry.find((e) => e[1].includes("شوال"))[0]);
    dateFuture.setDate(dateFuture.getDate() - 1);
    var dateNow = new Date();
    var d = Math.abs(dateFuture - dateNow) / 1000; // delta
    var r = {}; // result
    var s = {
      // structure
      y: 31536000,
      m: 2592000,
      d: 86400, // feel free to add your own row
      h: 3600,
      mi: 60,
      s: 1,
    };

    Object.keys(s).forEach(function (key) {
      r[key] = Math.floor(d / s[key]);
      d -= r[key] * s[key];
    });
    return r;
  }

  function calcAdha() {
    var dateFuture = new Date(
      arrHigry.find((e) => e[1].includes("10  ذو الحجة"))[0]
    );
    dateFuture.setDate(dateFuture.getDate() - 1);
    var dateNow = new Date();
    var d = Math.abs(dateFuture - dateNow) / 1000; // delta
    var r = {}; // result
    var s = {
      // structure
      y: 31536000,
      m: 2592000,
      d: 86400, // feel free to add your own row
      h: 3600,
      mi: 60,
      s: 1,
    };

    Object.keys(s).forEach(function (key) {
      r[key] = Math.floor(d / s[key]);
      d -= r[key] * s[key];
    });
    return r;
  }
  return (
    <ScrollView
      style={{
        backgroundColor: theme["background-basic-color-3"],
        width: "100%",
        height: "100%",
        flexDirection: "column",
        flex: 1,
      }}
    >
      <ImageBackground
        style={{ height: Dimensions.get("screen").height }}
        source={require("../assets/rmadan.png")}
        imageStyle={{ opacity: 0.6 }}
      >
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "font1",
              color: "#ff6200",

              textShadowColor: "#000c0f",
              textShadowOffset: { height: 3, width: 3 },
              textShadowRadius: 5,
              alignItems: "center",
              textAlign: "center",
              fontSize: 30,

              textShadowColor: "#000c0f",
              textShadowOffset: { height: 3, width: 3 },
              textShadowRadius: 5,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            بقى على رمضان
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {ramadn.m}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  شهور
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {ramadn.d}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  أيام
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {ramadn.h}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  ساعات
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {ramadn.mi}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  دقائق
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {ramadn.s}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  ثواني
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <ImageBackground
        style={{ height: Dimensions.get("screen").height }}
        source={require("../assets/fitr.jpg")}
        imageStyle={{ opacity: 0.6 }}
      >
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "font1",
              color: "#ff6200",

              textShadowColor: "#000c0f",
              textShadowOffset: { height: 3, width: 3 },
              textShadowRadius: 5,
              alignItems: "center",
              textAlign: "center",
              fontSize: 30,
            }}
          >
            بقى على عيد الفطر
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {fitr.m}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  شهور
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {fitr.d}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  أيام
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {fitr.h}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  ساعات
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {fitr.mi}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  دقائق
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {fitr.s}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  ثواني
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
      <ImageBackground
        style={{ height: Dimensions.get("screen").height }}
        source={require("../assets/adha.png")}
        imageStyle={{ opacity: 0.6 }}
      >
        <View
          style={{ justifyContent: "center", flex: 1, alignItems: "center" }}
        >
          <Text
            style={{
              fontFamily: "font1",
              color: "#ff6200",

              textShadowColor: "#000c0f",
              textShadowOffset: { height: 3, width: 3 },
              textShadowRadius: 5,
              alignItems: "center",
              textAlign: "center",
              fontSize: 30,
            }}
          >
            بقى على عيد الأضحى
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {adha.m}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  شهور
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {adha.d}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  أيام
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {adha.h}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  ساعات
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {adha.mi}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  دقائق
                </Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                paddingHorizontal: 6,
              }}
            >
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  {adha.s}
                </Text>
              </View>
              <View>
                <Text
                  style={{
                    fontFamily: "font2",
                    color: "#09a9ff",

                    textShadowColor: "#000c0f",
                    textShadowOffset: { height: 3, width: 3 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                    fontSize: 30,
                  }}
                >
                  ثواني
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
