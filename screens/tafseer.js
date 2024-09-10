import {
  Avatar,
  Button,
  ListItem,
  Text,
  useTheme,
} from "@ui-kitten/components";
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ayahs } from "../data/ayah";
import { useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { tafseerMuisar } from "../data/tafseerMuisar";
import { Soars } from "../data/MoshafAudio";
import { useNavigation } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import Dialog from "react-native-dialog";

export default function Tafsser({ route, navigation }) {
  const theme = useTheme();
  const styles = StyleSheet.create({
    tafsr: {
      width: "100%",
      textAlign: "center",
      padding: 10,
      borderRadius: 10,
      backgroundColor: theme["background-basic-color-4"],
      marginVertical: 5,
      marginBottom: 0,
      fontFamily: "font2",
      fontSize: 23,
    },
    modal: {
      backgroundColor: "#101426",
      flex: 1,
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
    titleCont: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
    },
    titleAll: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      fontSize: 23,
      fontFamily: "font2",
    },
    textTitle: {
      color: "#c70000",
      fontSize: 25,
    },
    textCont: {
      backgroundColor: theme["background-basic-color-3"],
      margin: 5,
      borderRadius: 4,
      padding: 6,
      fontSize: 20,
      fontFamily: "normal",
      lineHeight: 25,
      flexDirection: "column",
    },
    text: {
      fontSize: 20,
      fontFamily: "font2",
      lineHeight: 25,
    },
    listItemText: {
      marginRight: 15,
      fontFamily: "font2",
      fontSize: 33,
    },
  });
  const scrollViewRef = useRef();

  const [isSoursModalOpen, setIsSoursModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [Numbs, setNumbs] = useState(0);

  function change(id) {
    setIsLoading(true);
    setTimeout(() => {
      const selectedIndex = Soars[id].startPage;
      setIsSoursModalOpen(false);
      let arr = [];
      Soars.filter(
        (e) => selectedIndex >= e.startPage && selectedIndex <= e.endPage
      ).forEach((element) => {
        arr.push({
          ...element,
          tafseers: tafseerMuisar[element.id].sort(
            (a, b) => a.ayah_number - b.ayah_number
          ),
        });
      });
      arr.forEach((s, i) => {
        s.tafseers.forEach((d, w) => {
          arr[i].tafseers[w].ayahText = Ayahs.filter(
            (e) => e.sId == s.id + 1
          ).find((e) => +e.id == +d.ayah_number)
            ? Ayahs.filter((e) => e.sId == s.id + 1).find(
                (e) => +e.id == +d.ayah_number
              ).text
            : "";
        });
      });
      setIsLoading(false);
      scrollViewRef.current.scrollToIndex({ animated: false, index: 0 });
      navigation.navigate("Tafseer", {
        souraTafseer: arr,
        page: selectedIndex + 1,
        fromMe: true,
      });
    }, 100);
  }
  function scroll(id) {
    scrollViewRef.current.scrollToIndex({ animated: true, index: id - 1 || 0 });
  }

  function back() {
    navigation.navigate("Moshaf");
  }
  function openAya() {
    setIsDialogVisible(true);
  }
  function addOne() {
    scrollViewRef.current.scrollToIndex({ animated: true, index: Numbs || 0 });
    setIsDialogVisible(false);
  }

  function search(text) {
    setText(text);
    setResults(Ayahs.filter((e) => serial(e.arab).includes(serial(text))));
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

  useNavigation().addListener("focus", () => {
    var ayah = Ayah.data.find((e) => e.page == route.params.page);
    if (route.params.souraTafseer.length == 1) {
      if (route.params.fromMe) {
        navigation.setOptions({
          headerRight: ({ tintColor }) => (
            <Ionicons
              onPress={() => navigation.navigate("Home")}
              color={tintColor}
              size={30}
              name="home"
              style={{ paddingLeft: 6 }}
            ></Ionicons>
          ),
        });
        setTimeout(() => {
          if (ayah.ayah > 2)
            scrollViewRef.current.scrollToIndex({ animated: true, index: 0 });
        }, 500);
      } else {
        setTimeout(() => {
          if (ayah.ayah > 2)
            scrollViewRef.current.scrollToIndex({
              animated: true,
              index: ayah.ayah - 1,
            });
          else
            scrollViewRef.current.scrollToIndex({ animated: true, index: 0 });
          setTimeout(() => {
            if (ayah.ayah > 2)
              scrollViewRef.current.scrollToIndex({
                animated: true,
                index: ayah.ayah - 1,
              });
            else
              scrollViewRef.current.scrollToIndex({ animated: true, index: 0 });
          }, 500);
        }, 400);
        navigation.setOptions({
          headerRight: ({ tintColor }) => (
            <Ionicons
              onPress={back}
              color={tintColor}
              size={30}
              name="arrow-back"
            ></Ionicons>
          ),
        });
      }
    }
  });
  if (route.params.souraTafseer.length != 1)
    return (
      <>
        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Title style={{ fontFamily: "font2" }}>
            أكتب رقم الأية
          </Dialog.Title>
          <Dialog.Input
            placeholder="رقم الأية"
            onChange={(e) => setNumbs(e.nativeEvent.text)}
            keyboardType="decimal-pad"
          />
          <Dialog.Button
            label="إلغاء"
            onPress={() => setIsDialogVisible(false)}
          />
          <Dialog.Button label="الذهاب" onPress={addOne} />
        </Dialog.Container>
        <Modal visible={isSoursModalOpen} animationType={"fade"}>
          <View
            style={[
              styles.modal,
              { backgroundColor: theme["background-basic-color-2"] },
            ]}
          >
            {isLoading && (
              <View style={[styles.overlay]}>
                <ActivityIndicator size="large" color="gold" />
              </View>
            )}
            <View style={styles.titleCont}>
              <Text style={styles.title}>السور</Text>
              <Ionicons
                onPress={setIsSoursModalOpen.bind(this, false)}
                style={styles.icon}
                name="arrow-back"
                size={30}
                color={theme["text-basic-color"]}
              ></Ionicons>
            </View>
            <FlashList
              data={Soars}
              estimatedItemSize={100}
              renderItem={(itemData) => {
                return (
                  <ListItem
                    onPress={change.bind(this, itemData.index)}
                    key={itemData.item.id}
                    accessoryRight={() => (
                      <>
                        <Text style={styles.listItemText}>
                          {itemData.item.name}
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
        <Pressable
          style={{
            position: "absolute",
            backgroundColor: "red",
            opacity: 1,
            borderRadius: 5,
            left: 0,
            bottom: 0,
            zIndex: 4000,
            padding: 3,
          }}
          onPress={setIsSoursModalOpen.bind(this, true)}
        >
          <Text
            style={{
              fontFamily: "font2",
              textAlign: "center",
              color: "#f89b05",
              textShadowColor: "black",
              textShadowOffset: { height: 2, width: 2 },
              textShadowRadius: 5,
              fontSize: 25,
            }}
          >
            {" "}
            تغير السورة
          </Text>
        </Pressable>
        <Pressable
          style={{
            position: "absolute",
            backgroundColor: "red",
            opacity: 1,
            borderRadius: 5,
            right: 0,
            bottom: 0,
            zIndex: 4000,
            padding: 3,
          }}
          onPress={openAya}
        >
          <Text
            style={{
              fontFamily: "font2",
              textAlign: "center",
              color: "#f89b05",
              textShadowColor: "black",
              textShadowOffset: { height: 2, width: 2 },
              textShadowRadius: 5,
              fontSize: 25,
            }}
          >
            الذهاب لأية
          </Text>
        </Pressable>
        <ScrollView
          style={{
            direction: "ltr",
            flex: 1,
            paddingBottom: 30,
            backgroundColor: theme["background-basic-color-3"],
          }}
        >
          {route.params.souraTafseer.map((item, i) => {
            return (
              <View key={i}>
                <Text style={styles.tafsr} key={item.id}>
                  {item.name}
                </Text>
                {item.tafseers.map((itemt, i) => {
                  return (
                    <View key={i} style={styles.textCont}>
                      <Text style={styles.textTitle}>{itemt.ayahText}</Text>
                      <Text style={styles.text}>{itemt.text}</Text>
                    </View>
                  );
                })}
              </View>
            );
          })}
          <View style={{ height: 30 }}></View>
        </ScrollView>
      </>
    );
  else
    return (
      <>
        <Dialog.Container visible={isDialogVisible}>
          <Dialog.Title style={{ fontFamily: "font2" }}>
            أكتب رقم الأية
          </Dialog.Title>
          <Dialog.Input
            placeholder="رقم الأية"
            onChange={(e) => setNumbs(e.nativeEvent.text)}
            keyboardType="decimal-pad"
          />
          <Dialog.Button
            label="إلغاء"
            onPress={() => setIsDialogVisible(false)}
          />
          <Dialog.Button label="الذهاب" onPress={addOne} />
        </Dialog.Container>
        <Modal visible={isSoursModalOpen} animationType={"fade"}>
          {isLoading && (
            <View style={[styles.overlay]}>
              <ActivityIndicator size="large" color="gold" />
            </View>
          )}
          <View
            style={[
              styles.modal,
              { backgroundColor: theme["background-basic-color-2"] },
            ]}
          >
            <View style={styles.titleCont}>
              <Text style={styles.title}>السور</Text>
              <Ionicons
                onPress={setIsSoursModalOpen.bind(this, false)}
                style={styles.icon}
                name="arrow-back"
                size={30}
                color={theme["text-basic-color"]}
              ></Ionicons>
            </View>
            <FlashList
              data={Soars}
              estimatedItemSize={200}
              renderItem={(itemData) => {
                return (
                  <ListItem
                    onPress={change.bind(this, itemData.index)}
                    key={itemData.item.id}
                    accessoryRight={() => (
                      <>
                        <Text style={styles.listItemText}>
                          {itemData.item.name}
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
        <View
          style={{
            backgroundColor: theme["background-basic-color-1"],
            flex: 1,
          }}
        >
          <Pressable
            style={{
              position: "absolute",
              backgroundColor: "#002b38",
              opacity: 1,
              borderRadius: 5,
              left: 0,
              bottom: 0,
              zIndex: 4000,
              padding: 3,
            }}
            onPress={setIsSoursModalOpen.bind(this, true)}
          >
            <Text
              style={{
                fontFamily: "font2",
                textAlign: "center",
                color: "#f89b05",
                textShadowColor: "black",
                textShadowOffset: { height: 2, width: 2 },
                textShadowRadius: 5,
                fontSize: 25,
              }}
            >
              {" "}
              تغير السورة
            </Text>
          </Pressable>
          <Pressable
            style={{
              position: "absolute",
              backgroundColor: "#002b38",
              opacity: 1,
              borderRadius: 5,
              right: 0,
              bottom: 0,
              zIndex: 4000,
              padding: 3,
            }}
            onPress={openAya}
          >
            <Text
              style={{
                fontFamily: "font2",
                textAlign: "center",
                color: "#f89b05",
                textShadowColor: "black",
                textShadowOffset: { height: 2, width: 2 },
                textShadowRadius: 5,
                fontSize: 25,
              }}
            >
              الذهاب لأية
            </Text>
          </Pressable>
          <Text style={styles.tafsr} key={route.params.souraTafseer[0].id}>
            {route.params.souraTafseer[0].name}
          </Text>
          <FlashList
            scrollEnabled={true}
            contentContainerStyle={{
              backgroundColor: theme["background-basic-color-1"],
            }}
            ref={scrollViewRef}
            onScrollToIndexFailed={() => {
              console.log("BAD");
            }}
            estimatedItemSize={20}
            data={route.params.souraTafseer[0].tafseers}
            renderItem={(itemData) => {
              return (
                <>
                  <View
                    style={[
                      styles.textCont,
                      route.params.souraTafseer[0].tafseers.length ==
                      itemData.index + 1
                        ? { paddingBottom: 30 }
                        : {},
                    ]}
                  >
                    <Text style={styles.textTitle}>
                      {itemData.item.ayahText}
                    </Text>
                    <Text style={styles.text}>{itemData.item.text}</Text>
                  </View>
                </>
              );
            }}
            keyExtractor={(item, i) => {
              return item.ayah_number;
            }}
          />
        </View>
      </>
    );
}
