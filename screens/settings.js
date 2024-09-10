import {
  Button,
  Card,
  Input,
  Text,
  Toggle,
  useTheme,
} from "@ui-kitten/components";
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import StreetView from "react-native-streetview";
import Toast from "react-native-toast-message";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { DataContext, storage, themeType } from "../context/data-context";
import { createRef, useContext, useEffect, useRef, useState } from "react";
import * as Location from "expo-location";
import AzanMenu from "../components/azanMenu";
import { EvilIcons, Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import Dialog from "react-native-dialog";
import { getAutoComplete, translateWithLang } from "../utils";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import { PROVIDER_GOOGLE } from "react-native-maps";
import axios from "axios";
import Slider from "@react-native-community/slider";
import Navigation from "../navigation";
import { openURL } from "expo-linking";

let styleMap = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8ec3b9",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1a3646",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#64779e",
      },
    ],
  },
  {
    featureType: "administrative.province",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#4b6878",
      },
    ],
  },
  {
    featureType: "landscape.man_made",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#334e87",
      },
    ],
  },
  {
    featureType: "landscape.natural",
    elementType: "geometry",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#6f9ba5",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3C7680",
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    stylers: [
      {
        weight: 8,
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "geometry",
    stylers: [
      {
        weight: 8,
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "geometry.fill",
    stylers: [
      {
        weight: 8,
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "geometry.stroke",
    stylers: [
      {
        weight: 8,
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "labels.icon",
    stylers: [
      {
        color: "#ff0000",
      },
      {
        visibility: "on",
      },
      {
        weight: 8,
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "labels.text",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "labels.text.fill",
    stylers: [
      {
        weight: 4.5,
      },
    ],
  },
  {
    featureType: "poi.place_of_worship",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#532222",
      },
      {
        weight: 6,
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#304a7d",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#2c6675",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#255763",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#b0d5ce",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#023e58",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#98a5be",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1d2c4d",
      },
    ],
  },
  {
    featureType: "transit.line",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#283d6a",
      },
    ],
  },
  {
    featureType: "transit.station",
    elementType: "geometry",
    stylers: [
      {
        color: "#3a4762",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#0e1626",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2c77a5",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#ffffff",
      },
      {
        weight: 1,
      },
    ],
  },
];
export default function Settings(props) {
  const DataCtx = useContext(DataContext);
  const theme = useTheme();
  const [visibleList, setVisibleList] = useState(false);
  const [visibleList4, setVisibleList4] = useState(false);
  const [visibleList5, setVisibleList5] = useState(false);
  const [visibleList6, setVisibleList6] = useState(false);
  const [location, setLocation] = useState("");
  const [visibleMap, setVisibleMap] = useState(false);
  const [Numbs, setNumbs] = useState(0);
  const [Is, setIs] = useState(false);
  const [Load, setLoad] = useState(false);
  const [visibleListAz, setVisibleListAz] = useState(false);
  const [az1, setAz1] = useState(false);
  const [az2, setAz2] = useState(false);
  const [az3, setAz3] = useState(false);
  const [az4, setAz4] = useState(false);
  const [az5, setAz5] = useState(false);
  const [azNumber1, setAzNumber1] = useState(60);
  const [azNumber2, setAzNumber2] = useState(60);
  const [azNumber3, setAzNumber3] = useState(60);
  const [azNumber4, setAzNumber4] = useState(60);
  const [azNumber5, setAzNumber5] = useState(60);
  const [azall, setazall] = useState(false);
  const [aziAl, setAziAl] = useState(false);
  const [mapType, setmapType] = useState("standard");
  const navigation = useNavigation();
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      var loc = await DataCtx.getLocation();
      setLocation(JSON.parse(loc));
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
      setazall(azt);
      setAz1(azt.az1);
      setAz2(azt.az2);
      setAz3(azt.az3);
      setAz4(azt.az4);
      setAz5(azt.az5);
      setAzNumber1(azt.azNumber1);
      setAzNumber2(azt.azNumber2);
      setAzNumber3(azt.azNumber3);
      setAzNumber4(azt.azNumber4);
      setAzNumber5(azt.azNumber5);
      setAziAl(azt.azAll);
    });
    return unsubscribe;
  }, [navigation]);

  async function setAzi1(params) {
    setAz1(params);
    let as = azall;
    as.az1 = params;
    await storage.save({ key: "azaningwah", data: JSON.stringify(as) });
  }
  async function setAziNumb(params1, params) {
    let as = azall;
    if (params1 == "1") {
      setAzNumber1(params);
      as.azNumber1 = params;
    }
    if (params1 == "2") {
      setAzNumber2(params);
      as.azNumber2 = params;
    }
    if (params1 == "3") {
      setAzNumber3(params);
      as.azNumber3 = params;
    }
    if (params1 == "4") {
      setAzNumber4(params);
      as.azNumber4 = params;
    }
    if (params1 == "5") {
      setAzNumber5(params);
      as.azNumber5 = params;
    }
    setazall(as);
    setAz1(as.az1);
    setAz2(as.az2);
    setAz3(as.az3);
    setAz4(as.az4);
    setAz5(as.az5);
    setAzNumber1(as.azNumber1);
    setAzNumber2(as.azNumber2);
    setAzNumber3(as.azNumber3);
    setAzNumber4(as.azNumber4);
    setAzNumber5(as.azNumber5);
    setAziAl(as.azAll);
    await storage.save({ key: "azaningwah", data: JSON.stringify(as) });
  }
  async function setAziAll(params) {
    setAziAll(params);
    let as = azall;
    as.azAll = params;
    await storage.save({ key: "azaningwah", data: JSON.stringify(as) });
  }
  async function setAzi2(params) {
    setAz2(params);
    let as = azall;
    as.az2 = params;
    await storage.save({ key: "azaningwah", data: JSON.stringify(as) });
  }
  async function setAzi3(params) {
    setAz3(params);
    let as = azall;
    as.az3 = params;
    await storage.save({ key: "azaningwah", data: JSON.stringify(as) });
  }
  async function setAzi4(params) {
    setAz4(params);
    let as = azall;
    as.az4 = params;
    await storage.save({ key: "azaningwah", data: JSON.stringify(as) });
  }
  async function setAzi5(params) {
    setAz5(params);
    let as = azall;
    as.az5 = params;
    await storage.save({ key: "azaningwah", data: JSON.stringify(as) });
  }
  async function onDrag(params, e, text) {
    if (!e)
      Toast.show({
        type: "info",
        text1: "جار تحديث الموقع",
        text2: "جار تحديث الموقع للمكان المختار",
      });
    setLocation(params);
    await DataCtx.setLocation(params);
    if (!text) {
      let address = await axios.get(
        "https://geocode.maps.co/reverse?lat=" +
          params[0] +
          "&lon=" +
          params[1] +
          "&api_key=65b875f4b9ddb952607663okpee73b0"
      );
      let addressTr = await translateWithLang(address.data.display_name);
      await storage.save({ key: "LocationPlace", data: addressTr });
    } else await storage.save({ key: "LocationPlace", data: text });
    if (!e)
      Toast.show({
        type: "info",
        text1: " تم تحديث الموقع",
        text2: "",
      });
    Notifications.cancelAllScheduledNotificationsAsync();
  }
  useState(async () => {
    var loc = +(await DataCtx.get("BeforAzan")) || 0;
    if (loc == 0) setIs(false);
    else {
      setIs(true);
      setNumbs(+loc);
    }
  });

  async function onLoad() {
    Toast.show({
      type: "info",
      text1: "جار تحديث الموقع",
      text2: "جار تحديث الموقع للمكان المختار",
      autoHide: false,
    });
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "تم رفض إذن الوصول إلى الموقع",
        "سنقوم بإختيار موقع عشوائي ويمكنك تغيره فيما بعد",
        [{ text: "حسنا" }]
      );
      ToastAndroid.show("تم رفض إذن الوصول إلى الموقع", 1000);
    } else {
      var myLoc = await Location.getCurrentPositionAsync({});
      Toast.hide();
      Toast.show({
        type: "info",
        text1: "تم تحديث الموقع",
        text2: "",
        autoHide: true,
      });
      await onDrag([myLoc.coords.latitude, myLoc.coords.longitude], true);
    }
  }
  const ref = useRef();
  const mapRef = createRef();
  async function addOne() {
    if (Is)
      if (typeof +Numbs == "number") {
        await DataCtx.set("BeforAzan", Numbs);
        setVisibleList4(false);
      } else {
        await DataCtx.set("BeforAzan", 0);
      }
  }

  async function openStreet() {
    setVisibleList6(true);
    console.log("openStreet");
  }

  function changeTypeMap() {
    let nowMap = mapType;
    if (nowMap == "hybrid") setmapType("none");
    if (nowMap == "none") setmapType("sattelite");
    if (nowMap == "sattelite") setmapType("standard");
    if (nowMap == "standard") setmapType("hybrid");
  }
  return (
    <>
      <Modal
        style={{ width: "100%", height: "100%", padding: 0 }}
        visible={visibleList6}
        animationType="slide"
      >
        <View
          style={[
            styles.modal,
            { backgroundColor: theme["background-basic-color-2"], padding: 0 },
          ]}
        >
          <View
            style={{
              padding: 0,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Ionicons
              onPress={setVisibleList6.bind(this, false)}
              style={{ padding: 0 }}
              name="close"
              size={30}
              color={theme["text-basic-color"]}
            ></Ionicons>
          </View>
          <StreetView
            style={{ width: "100%", height: "100%" }}
            allGesturesEnabled={true}
            coordinate={{
              latitude: location[0],
              longitude: location[1],
            }}
            pov={{
              tilt: parseFloat(0),
              bearing: parseFloat(0),
              zoom: parseInt(1),
            }}
          />
        </View>
      </Modal>
      <Modal
        style={{ width: "100%", height: "100%", padding: 0 }}
        visible={visibleMap}
        animationType="slide"
      >
        <View
          style={[
            styles.modal,
            { backgroundColor: theme["background-basic-color-2"], padding: 0 },
          ]}
        >
          <View
            style={{
              padding: 0,
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Ionicons
              onPress={setVisibleMap.bind(this, false)}
              style={{ padding: 0 }}
              name="close"
              size={30}
              color={theme["text-basic-color"]}
            ></Ionicons>
            <Pressable onPress={changeTypeMap}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "font2" }}>تغير شكل الخريطه</Text>

                <Ionicons
                  onPress={changeTypeMap}
                  style={{ padding: 0 }}
                  name="refresh-circle"
                  size={30}
                  color={theme["text-basic-color"]}
                ></Ionicons>
              </View>
            </Pressable>
            <Pressable onPress={openStreet}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={{ fontFamily: "font2" }}>
                  {"                   "}
                </Text>

                <Ionicons
                  onPress={openStreet}
                  style={{ padding: 0 }}
                  name="man"
                  size={30}
                  color={theme["text-basic-color"]}
                ></Ionicons>
              </View>
            </Pressable>
          </View>
          <Text style={{ fontFamily: "font1" }}>
            أنقر نقرتين في أي مكان لإختياره
          </Text>
          <GooglePlacesAutocomplete
            listViewDisplayed={false}
            ref={ref}
            placeholder="بحث عن مكان"
            fetchDetails={true}
            styles={{
              container: {
                flex: 1,
                zIndex: 999999,
                position: "absolute",
                top: 60,
                width: "100%",
              },
            }}
            onFail={(err) => {
              console.log(err);
              ToastAndroid.show("حدث خطأ بالرجاء المحاولة مره أخرى", 2000);
            }}
            onNotFound={() => {
              ToastAndroid.show("لا يوجد مكان بهذا الإسم", 2000);
            }}
            onPress={async (data, details) => {
              setVisibleMap(false);
              Toast.show({
                type: "info",
                text1: "جار تحديث الموقع",
                text2: "جار تحديث الموقع للمكان المختار",
                autoHide: false,
              });
              setTimeout(() => {
                setVisibleMap(true);
              }, 1000);
              // await getAutoComplete();
              // 'details' is provided when fetchDetails = true
              if (mapRef && mapRef.current)
                mapRef.current.animateToRegion({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  latitudeDelta: 0.1,
                  longitudeDelta: 0.1,
                });
              await onDrag(
                [details.geometry.location.lat, details.geometry.location.lng],
                false,
                details.description
              );
              setVisibleMap(false);
              Toast.hide();
              Toast.show({
                type: "info",
                text1: " تم تحديث الموقع",
                text2: "",
                autoHide: true,
              });
              setTimeout(() => {
                setVisibleMap(true);
              }, 1000);
            }}
            keepResultsAfterBlur={true}
            query={{
              key: "AIzaSyCIC1Zs4tQBH7tMwbMTPTaX1P724ArgYxg",
              language: "ar",
            }}
          />
          <MapView
            ref={mapRef}
            customMapStyle={styleMap}
            provider={PROVIDER_GOOGLE}
            mapType={mapType}
            style={{
              width: "100%",
              height: "100%",
              marginTop: 43,
            }}
            loadingBackgroundColor="#006161"
            onDoublePress={(e) =>
              onDrag(
                [
                  e.nativeEvent.coordinate.latitude,
                  e.nativeEvent.coordinate.longitude,
                ],
                false
              )
            }
            initialRegion={{
              latitude: location[0],
              longitude: location[1],
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            loadingEnabled={true}
            showsUserLocation={true}
            showsTraffic={true}
            showsIndoorLevelPicker={true}
          >
            <Marker
              draggable={true}
              coordinate={{
                latitude: location[0],
                longitude: location[1],
              }}
              title={" الموقع المحفوظ  ...انقر مطولا واسحب للتغير الموقع"}
              onDragEnd={(e) =>
                onDrag(
                  [
                    e.nativeEvent.coordinate.latitude,
                    e.nativeEvent.coordinate.longitude,
                  ],
                  false
                )
              }
            ></Marker>
            <Marker
              coordinate={{
                latitude: 21.422487,
                longitude: 39.826206,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/Makah.png")}
                ></Image>
                <Text
                  style={{
                    fontFamily: "font2",
                    textShadowColor: "#DE0A57",
                    textShadowOffset: { height: 1, width: 0 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  مكة
                </Text>
              </View>
            </Marker>
            <Marker
              coordinate={{
                latitude: 24.470901,
                longitude: 39.612236,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/Mdina.png")}
                ></Image>
                <Text
                  style={{
                    fontFamily: "font2",
                    textShadowColor: "#DE0A57",
                    textShadowOffset: { height: 1, width: 0 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  المدينه
                </Text>
              </View>
            </Marker>
            <Marker
              coordinate={{
                latitude: 31.7762844,
                longitude: 35.2363268,
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  style={{ width: 40, height: 40 }}
                  source={require("../assets/quds.png")}
                ></Image>
                <Text
                  style={{
                    fontFamily: "font2",
                    textShadowColor: "#DE0A57",
                    textShadowOffset: { height: 1, width: 0 },
                    textShadowRadius: 5,
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  القدس
                </Text>
              </View>
            </Marker>
          </MapView>
        </View>
      </Modal>
      <Modal
        style={{ width: "100%", height: "100%", padding: 0 }}
        visible={visibleListAz}
        animationType="slide"
      >
        <View
          style={[
            styles.modal,
            { backgroundColor: theme["background-basic-color-2"], padding: 0 },
          ]}
        >
          <View style={{ padding: 0 }}>
            <Ionicons
              onPress={setVisibleListAz.bind(this, false)}
              style={{ padding: 0 }}
              name="close"
              size={30}
              color={theme["text-basic-color"]}
            ></Ionicons>
          </View>
          <Text style={{ fontFamily: "font1" }}>الأذان والتنبيهات</Text>
          <View style={{ alignItems: "flex-start", padding: 20 }}>
            <Toggle
              style={{ marginBottom: 20 }}
              checked={az1}
              onChange={setAzi1}
            >
              <Text>
                <Text style={{ fontFamily: "font2", fontSize: 20 }}>الفجر</Text>
              </Text>
            </Toggle>
            <Toggle
              style={{ marginBottom: 20 }}
              checked={az2}
              onChange={setAzi2}
            >
              <Text>
                <Text style={{ fontFamily: "font2", fontSize: 20 }}>الظهر</Text>
              </Text>
            </Toggle>
            <Toggle
              style={{ marginBottom: 20 }}
              checked={az3}
              onChange={setAzi3}
            >
              <Text>
                <Text style={{ fontFamily: "font2", fontSize: 20 }}>العصر</Text>
              </Text>
            </Toggle>
            <Toggle
              style={{ marginBottom: 20 }}
              checked={az4}
              onChange={setAzi4}
            >
              <Text>
                <Text style={{ fontFamily: "font2", fontSize: 20 }}>
                  المغرب
                </Text>
              </Text>
            </Toggle>
            <Toggle
              style={{ marginBottom: 20 }}
              checked={az5}
              onChange={setAzi5}
            >
              <Text>
                <Text style={{ fontFamily: "font2", fontSize: 20 }}>
                  العشاء
                </Text>
              </Text>
            </Toggle>
          </View>
          {/* <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Toggle
              style={{ marginBottom: 20 }}
              checked={aziAl}
              onChange={setAziAll}
            >
              <Text>
                <Text style={{ fontFamily: "font2", fontSize: 20 }}>
                  إظهار في الصلاة القادمة قائمة الإشعارات
                </Text>
              </Text>
            </Toggle>
          </View> */}
          <Card
            style={styles.card}
            onPress={setVisibleList5.bind(this, true)}
            status="primary"
          >
            <Text
              style={{ fontFamily: "font2", fontSize: 20, textAlign: "center" }}
            >
              تعديل أوقات الصلاة يدوياََ
            </Text>
          </Card>
          <Card
            style={styles.card}
            onPress={setVisibleList.bind(this, true)}
            status="primary"
          >
            <Text
              style={{ fontFamily: "font2", fontSize: 20, textAlign: "center" }}
            >
              صوت الأذان
            </Text>
          </Card>
          <Card
            style={styles.card}
            onPress={setVisibleList4.bind(this, true)}
            status="primary"
          >
            <Text
              style={{ fontFamily: "font2", fontSize: 20, textAlign: "center" }}
            >
              تنبيه قبل الأذان
            </Text>
          </Card>
        </View>
      </Modal>
      <Modal
        style={{ width: "100%", height: "100%", padding: 0 }}
        visible={visibleList5}
        animationType="slide"
      >
        <View
          style={[
            styles.modal,
            { backgroundColor: theme["background-basic-color-2"], padding: 0 },
          ]}
        >
          <View style={{ padding: 0 }}>
            <Ionicons
              onPress={setVisibleList5.bind(this, false)}
              style={{ padding: 0 }}
              name="close"
              size={30}
              color={theme["text-basic-color"]}
            ></Ionicons>
          </View>
          <Text style={{ fontFamily: "font1" }}>
            تعديل أوقات الصلاة يدوياََ
          </Text>
          <View style={{ alignItems: "flex-start", padding: 20 }}>
            <Text style={{ fontFamily: "font2", fontSize: 20 }}>الفجر</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ width: "97%", flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>60</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="plus"
                    size={30}
                    onPress={() => {
                      setAzNumber1(azNumber1 + 1);
                      setAziNumb("1", azNumber1 + 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>0</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="minus"
                    size={30}
                    onPress={() => {
                      setAzNumber1(azNumber1 - 1);
                      setAziNumb("1", azNumber1 - 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>-60</Text>
                </View>
                <Slider
                  style={{ width: "97%" }}
                  minimumValue={0}
                  maximumValue={120}
                  minimumTrackTintColor={theme["color-info-800"]}
                  maximumTrackTintColor="#6d6d6d"
                  thumbTintColor={theme["color-info-800"]}
                  step={1}
                  onValueChange={(v) => {
                    setAziNumb("1", v);
                  }}
                  value={azNumber1 || 60}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>
                    {azNumber1 - 60}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ fontFamily: "font2", fontSize: 20 }}>الظهر</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ width: "97%", flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>60</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="plus"
                    size={30}
                    onPress={() => {
                      setAzNumber2(azNumber2 + 1);
                      setAziNumb("2", azNumber2 + 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>0</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="minus"
                    size={30}
                    onPress={() => {
                      setAzNumber2(azNumber2 - 1);
                      setAziNumb("2", azNumber2 - 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>-60</Text>
                </View>
                <Slider
                  style={{ width: "97%" }}
                  minimumValue={0}
                  maximumValue={120}
                  minimumTrackTintColor={theme["color-info-800"]}
                  maximumTrackTintColor="#6d6d6d"
                  thumbTintColor={theme["color-info-800"]}
                  step={1}
                  onValueChange={(v) => {
                    setAziNumb("2", v);
                  }}
                  value={azNumber2 || 60}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>
                    {azNumber2 - 60}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ fontFamily: "font2", fontSize: 20 }}>العصر</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ width: "97%", flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>60</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="plus"
                    size={30}
                    onPress={() => {
                      setAzNumber3(azNumber3 + 1);
                      setAziNumb("3", azNumber3 + 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>0</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="minus"
                    size={30}
                    onPress={() => {
                      setAzNumber3(azNumber3 - 1);
                      setAziNumb("3", azNumber3 - 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>-60</Text>
                </View>
                <Slider
                  style={{ width: "97%" }}
                  minimumValue={0}
                  maximumValue={120}
                  minimumTrackTintColor={theme["color-info-800"]}
                  maximumTrackTintColor="#6d6d6d"
                  thumbTintColor={theme["color-info-800"]}
                  step={1}
                  onValueChange={(v) => {
                    setAziNumb("3", v);
                  }}
                  value={azNumber3 || 60}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>
                    {azNumber3 - 60}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ fontFamily: "font2", fontSize: 20 }}>المغرب</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ width: "97%", flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>60</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="plus"
                    size={30}
                    onPress={() => {
                      setAzNumber4(azNumber4 + 1);
                      setAziNumb("4", azNumber4 + 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>0</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="minus"
                    size={30}
                    onPress={() => {
                      setAzNumber4(azNumber4 - 1);
                      setAziNumb("4", azNumber4 - 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>-60</Text>
                </View>
                <Slider
                  style={{ width: "97%" }}
                  minimumValue={0}
                  maximumValue={120}
                  minimumTrackTintColor={theme["color-info-800"]}
                  maximumTrackTintColor="#6d6d6d"
                  thumbTintColor={theme["color-info-800"]}
                  step={1}
                  onValueChange={(v) => {
                    setAziNumb("4", v);
                  }}
                  value={azNumber4 || 60}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>
                    {azNumber4 - 60}
                  </Text>
                </View>
              </View>
            </View>
            <Text style={{ fontFamily: "font2", fontSize: 20 }}>العشاء</Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <View style={{ width: "97%", flex: 1 }}>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>60</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="plus"
                    size={30}
                    onPress={() => {
                      setAzNumber5(azNumber5 + 1);
                      setAziNumb("5", azNumber5 + 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>0</Text>
                  <EvilIcons
                    color={theme["text-basic-color"]}
                    name="minus"
                    size={30}
                    onPress={() => {
                      setAzNumber5(azNumber5 - 1);
                      setAziNumb("5", azNumber5 - 1);
                    }}
                  ></EvilIcons>
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>-60</Text>
                </View>
                <Slider
                  style={{ width: "97%" }}
                  minimumValue={0}
                  maximumValue={120}
                  minimumTrackTintColor={theme["color-info-800"]}
                  maximumTrackTintColor="#6d6d6d"
                  thumbTintColor={theme["color-info-800"]}
                  step={1}
                  onValueChange={(v) => {
                    setAziNumb("5", v);
                  }}
                  value={azNumber5 || 60}
                />
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontFamily: "font2", fontSize: 20 }}>
                    {azNumber5 - 60}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {Load && (
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
      <Dialog.Container visible={visibleList4}>
        <Dialog.Title style={{ fontFamily: "font2" }}>
          تنبيه قبل الأذان
        </Dialog.Title>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          <Text style={{ fontFamily: "font2", fontSize: 20, color: "black" }}>
            تنبيه قبل الأذان
          </Text>
          <Toggle checked={Is} onChange={setIs}></Toggle>
        </View>
        {Is && (
          <Text style={{ fontFamily: "font2", color: "black" }}>
            التنبيه قبل الأذان بكم دقيقة
          </Text>
        )}
        {Is && (
          <Dialog.Input
            style={{ fontFamily: "font2", color: "black", direction: "ltr" }}
            value={Numbs ? Numbs.toString() : null}
            placeholder="عدد الدقائق"
            onChange={(e) => setNumbs(e.nativeEvent.text)}
            keyboardType="decimal-pad"
          />
        )}
        <Dialog.Button label="إلغاء" onPress={() => setVisibleList4(false)} />
        <Dialog.Button label="حفظ" onPress={addOne} />
      </Dialog.Container>
      <Modal
        style={{ width: "100%", height: "100%", padding: 0 }}
        visible={visibleList}
        animationType="slide"
      >
        <View
          style={[
            styles.modal,
            {
              height: Dimensions.get("screen").height,
              backgroundColor: theme["background-basic-color-3"],
              padding: 0,
            },
          ]}
        >
          <AzanMenu
            load={setLoad}
            closeTrue={false}
            close={() => {
              setVisibleList(false);
            }}
          ></AzanMenu>
        </View>
      </Modal>
      <ScrollView
        style={{
          paddingTop: 10,
          backgroundColor: theme["background-basic-color-3"],
        }}
      >
        {/* <Text style={{ fontFamily: 'font2', fontSize: 23, paddingVertical: 10 }}> الموقع <Text style={{ fontFamily: 'font1', fontSize: 10 }}> يستخدم لتحديد مواقيت الصلاة</Text></Text>
                <Button style={{ fontFamily: 'font2', fontSize: 20, marginTop: 20 }} onPress={setMyLocation}> تحديث الموقع </Button> */}
        <Card style={styles.card} onPress={onLoad} status="primary">
          <Text
            style={{ fontFamily: "font2", fontSize: 20, textAlign: "center" }}
          >
            تحديث الموقع
          </Text>
        </Card>
        <Card
          style={styles.card}
          onPress={setVisibleMap.bind(this, true)}
          status="primary"
        >
          <Text
            style={{ fontFamily: "font2", fontSize: 20, textAlign: "center" }}
          >
            تحديد الموقع
          </Text>
        </Card>
        <Card
          style={styles.card}
          onPress={setVisibleListAz.bind(this, true)}
          status="primary"
        >
          <Text
            style={{ fontFamily: "font2", fontSize: 20, textAlign: "center" }}
          >
            الأذان والتنبيهات
          </Text>
        </Card>
      </ScrollView>
      <Toast visibilityTime={5000} />
    </>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  card: {
    marginVertical: 20,
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
});
