import {
  ApplicationProvider,
  Toggle,
  useTheme,
  Text,
  Button,
  Card,
} from "@ui-kitten/components";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  Animated,
  BackHandler,
  Dimensions,
  Easing,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import * as eva from "@eva-design/eva";
import * as Linking from "expo-linking";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useState, useEffect } from "react";
import { DataContext, storage, themeType } from "./context/data-context";
import {
  DrawerToggleButton,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import Navigation from "./navigation";
import Qipla from "./screens/qipla";
import Azkar from "./screens/azkar";
import Settings from "./screens/settings";
import ListenQuranAudio from "./screens/listenQuranAudio";
import Home from "./screens/home";
import Sebha from "./screens/sebha";
import Moshaf from "./screens/moshaf";
import Assma from "./screens/assma";
import Nexts from "./screens/nexts";
import { Image } from "expo-image";
import Doaa from "./screens/doaa";
import { Ionicons } from "@expo/vector-icons";
import NwawiaList from "./screens/nwawiaList";
import Nawawia1 from "./screens/nwawia1";
import Tafsser from "./screens/tafseer";
import Lictury from "./screens/lictury";
import Lictury1 from "./screens/lictury1";
import { useTranslation } from "react-i18next";
import i18n from "./i18n";
import Settings1 from "./screens/settings1";
import HadithList from "./screens/hadithList";
import Hadith1 from "./screens/hadith1";
const Drawer = createDrawerNavigator();
///exp://192.168.0.103:8081
export default function Main(props) {
  const DataCtx = useContext(DataContext);
  const [theme, setTheme] = useState(themeType.dark);
  const [Load, setLoad] = useState(false);
  const [HomeRoute, setHomeRoute] = useState(null);
  const { t } = useTranslation();
  useState(async () => {
    var azanIndex = await storage.load({ key: "azan" }).catch((e) => {
      return "bad";
    });
    setHomeRoute(azanIndex == "bad" ? "Settings1" : "Home");
  });

  async function onLayoutRootView() {
    var the = await DataCtx.getTheme();
    setTheme(the || themeType.dark);
    props.onLayoutRootView();
  }

  function SettingsComp() {
    const themeColors = useTheme();
    const [checked, setChecked] = useState(DataCtx.theme == themeType.dark);
    useNavigation().addListener("focus", async () => {
      var the = await DataCtx.getTheme();
      setChecked(the != themeType.light);
      setTheme(the || themeType.dark);
    });
    useState(async () => {
      var the = await DataCtx.getTheme();
      setChecked(the != themeType.light);
      setTheme(the || themeType.dark);
    });
    async function onCheckedChange(isChecked) {
      setLoad(true);
      setTimeout(async () => {
        setChecked(isChecked);
        if (isChecked) {
          setTheme(themeType.dark);
          await DataCtx.setTheme(themeType.dark);
          setLoad(false);
        } else {
          setTheme(themeType.light);
          await DataCtx.setTheme(themeType.light);
          setLoad(false);
        }
        setChecked(isChecked);
      }, 100);
    }

    return (
      <>
        {Load && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: Dimensions.get("screen").height,
              backgroundColor: themeColors["background-basic-color-2"],
              width: "100%",
            }}
          >
            <ActivityIndicator color={"gold"} size={100}></ActivityIndicator>
          </View>
        )}
        <ScrollView
          style={{
            paddingTop: 10,
            backgroundColor: themeColors["background-basic-color-3"],
            flex: 1,
          }}
        >
          <Card onPress={() => onCheckedChange(!checked)} status="info">
            <Text
              style={{ fontFamily: "font2", textAlign: "center", fontSize: 20 }}
            >
              {checked ? t("selectlight") : t("selectDark")}
            </Text>
          </Card>
          <Settings></Settings>
        </ScrollView>
      </>
    );
  }
  return (
    <>
      <StatusBar style={"light"} />
      <LinearGradient
        colors={
          theme == themeType.dark
            ? ["#021d43", "#021d43", "#021d43", "#021d43"]
            : ["#F2F6FF", "#D9E4FF", "#A6C1FF", "#598BFF"]
        }
        style={styles.background}
      >
        <ImageBackground
          imageStyle={{
            opacity: theme == themeType.dark ? 0.65 : 0.1,
            flex: 1,
          }}
          style={{ flex: 1 }}
          source={require("./assets/tasb2.jpg")}
        >
          <ApplicationProvider
            style={{ padding: 10, flex: 1 }}
            {...eva}
            theme={{ ...(theme == themeType.dark ? eva.dark : eva.light) }}
          >
            {HomeRoute && (
              <NavigationContainer onReady={onLayoutRootView}>
                <Drawer.Navigator
                  initialRouteName={HomeRoute}
                  screenOptions={({ navigation }) => {
                    return {
                      headerTitleAlign: "center",
                      headerStyle: { backgroundColor: "#002b38" },
                      headerTitleStyle: { fontFamily: "font1" },
                      headerTintColor: "#F7F9FC",
                      headerRight: ({ tintColor }) =>
                        navigation.canGoBack() ? (
                          <Ionicons
                            onPress={navigation.goBack}
                            color={tintColor}
                            size={30}
                            name="home"
                            style={{ paddingLeft: 6 }}
                          ></Ionicons>
                        ) : (
                          <View></View>
                        ),
                      swipeEnabled: true,
                      swipeEdgeWidth: 50,
                      drawerLabelStyle: { fontSize: 15, fontFamily: "font1" },
                      drawerInactiveTintColor:
                        theme == themeType.dark ? "#F7F9FC" : "#1A2138",
                      drawerType: "slide",
                      drawerStatusBarAnimation: "slide",
                      drawerContentStyle: {
                        backgroundColor:
                          theme == themeType.dark ? "#1A2138" : "#F7F9FC",
                      },
                      drawerStyle: { backgroundColor: "red" },
                    };
                  }}
                >
                  <Drawer.Screen
                    name="Home"
                    options={{
                      animation: "slide_from_right",
                      title: t("home"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/home.png")}
                          style={{ width: size * 2, height: size * 2 }}
                        ></Image>
                      ),
                    }}
                    component={Home}
                  />
                  <Drawer.Screen
                    name="Container"
                    options={{
                      animation: "slide_from_right",
                      title: t("salat"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/mosque.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={Navigation}
                  />
                  <Drawer.Screen
                    name="Qipla"
                    options={{
                      animation: "slide_from_right",
                      title: t("qipla"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/kabah.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={Qipla}
                  />
                  <Drawer.Screen
                    name="listenQuranAudio"
                    options={{
                      animation: "slide_from_right",
                      title: t("listn"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/al-quran.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={ListenQuranAudio}
                  />
                  <Drawer.Screen
                    name="Moshaf"
                    options={{
                      animation: "slide_from_right",
                      title: t("moshaf"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/al-quran-book.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={Moshaf}
                  />
                  <Drawer.Screen
                    name="Azkar"
                    options={{
                      animation: "slide_from_right",
                      title: t("azkar"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/azkar.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={Azkar}
                  />

                  <Drawer.Screen
                    name="Sebha"
                    options={{
                      animation: "slide_from_right",
                      title: t("sebha"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/beads.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={Sebha}
                  />
                  <Drawer.Screen
                    name="NwawiaList"
                    options={{
                      animation: "slide_from_right",
                      title: t("nwawia"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/hadith.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={NwawiaList}
                  />
                  <Drawer.Screen
                    name="HadithList"
                    options={{
                      animation: "slide_from_right",
                      title: t("HadithList"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/hadith.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={HadithList}
                  />
                  <Drawer.Screen
                    name="Lictury"
                    options={{
                      animation: "slide_from_right",
                      title: t("Lictury"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/vid.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={Lictury}
                  />
                  <Drawer.Screen
                    name="Assma"
                    options={{
                      animation: "slide_from_right",
                      title: t("asmaa"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/allah.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={Assma}
                  />
                  <Drawer.Screen
                    name="Doaa"
                    options={{
                      animation: "slide_from_right",
                      title: t("doaa"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/doaa.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={Doaa}
                  />
                  <Drawer.Screen
                    name="Tafseer"
                    options={{
                      animation: "slide_from_right",
                      title: t("tafsir"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/tafsir.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    initialParams={{
                      page: 1,
                      fromMe: true,
                      souraTafseer: [
                        {
                          name: `الفاتحه`,
                          page: 1,
                          place: `Makah`,
                          id: 0,
                          startPage: 1,
                          endPage: 1,
                          tafseers: [
                            {
                              tafseer_id: 1,
                              tafseer_name: `التفسير الميسر`,
                              ayah_url: `/quran/1/1/`,
                              ayah_number: 1,
                              text: `سورة الفاتحة سميت هذه السورة بالفاتحة؛ لأنه يفتتح بها القرآن العظيم، وتسمى المثاني؛ لأنها تقرأ في كل ركعة، ولها أسماء أخر. أبتدئ قراءة القرآن باسم الله مستعينا به، (اللهِ) علم على الرب -تبارك وتعالى- المعبود بحق دون سواه، وهو أخص أسماء الله تعالى، ولا يسمى به غيره سبحانه. (الرَّحْمَنِ) ذي الرحمة العامة الذي وسعت رحمته جميع الخلق، (الرَّحِيمِ) بالمؤمنين، وهما اسمان من أسمائه تعالى، يتضمنان إثبات صفة الرحمة لله تعالى كما يليق بجلاله.`,
                              ayahText: `بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ`,
                            },
                            {
                              tafseer_id: 1,
                              tafseer_name: `التفسير الميسر`,
                              ayah_url: `/quran/1/2/`,
                              ayah_number: 2,
                              text: `(الحَمْدُ للهِ رَبِّ العَالَمِينَ) الثناء على الله بصفاته التي كلُّها أوصاف كمال، وبنعمه الظاهرة والباطنة، الدينية والدنيوية، وفي ضمنه أَمْرٌ لعباده أن يحمدوه، فهو المستحق له وحده، وهو سبحانه المنشئ للخلق، القائم بأمورهم، المربي لجميع خلقه بنعمه، ولأوليائه بالإيمان والعمل الصالح.`,
                              ayahText: `اَلْحَمْدُ لِلّٰهِ رَبِّ الْعٰلَمِيْنَۙ`,
                            },
                            {
                              tafseer_id: 1,
                              tafseer_name: `التفسير الميس
                            ر`,
                              ayah_url: `/quran/1/3/`,
                              ayah_number: 3,
                              text: `(الرَّحْمَنِ) الذي وسعت رحمته جميع الخلق، (الرَّحِيمِ)، بالمؤمنين، وهما اسمان من أسماء الله تعالى.`,
                              ayahText: `الرَّحْمٰنِ الرَّحِيْمِۙ`,
                            },
                            {
                              tafseer_id: 1,
                              tafseer_name: `التفسير الميسر`,
                              ayah_url: `/
                            quran/1/4/`,
                              ayah_number: 4,
                              text: `وهو سبحانه وحده مالك يوم القيامة، وهو يوم الجزاء على الأعمال. وفي قراءة المسلم لهذه الآية في كل ركعة من صلواته تذكير له باليوم الآخر، وحثٌّ له على الاستعداد بالعمل الصالح، والكف عن المعاصي والسيئات.`,
                              ayahText: `ملِكِ يَوْمِ الدِّيْنِۗ`,
                            },
                            {
                              tafseer_id: 1,
                              tafseer_name: `التفسير الميسر`,
                              ayah_url: `/
                            quran/1/5/`,
                              ayah_number: 5,
                              text: `إنا نخصك وحدك بالعبادة، ونستعين بك وحدك في جميع أمورنا، فالأمر كله بيدك، لا يملك منه أحد مثقال ذرة. وفي هذه الآية دليل على أن العبد لا يجوز له أن يصرف شيئًا من أنواع العبادة كالدعاء والاستغاثة والذبح والطواف إلا لله وحده، وفيها شفاء القلوب من داء التعلق بغير الله، ومن أمراض الرياء والعجب، والكبرياء.`,
                              ayahText: `اِيَّاكَ نَعْبُدُ وَاِيَّاكَ نَسْتَعِيْنُۗ`,
                            },
                            {
                              tafseer_id: 1,
                              tafseer_name: `التفسير الميسر`,
                              ayah_url: `/quran/1/6/`,
                              ayah_number: 6,
                              text: `دُلَّنا، وأرشدنا، ووفقنا إلى الطريق المستقيم، وثبتنا عليه حتى نلقاك، وهو الإسلام، الذي هو الطريق الواضح الموصل إلى رضوان الله وإلى جنته، الذي دلّ عليه خاتم رسله وأنبيائه محمد صلى الله عليه وسلم، فلا سبيل إلى سعادة العبد إلا بالاستقامة عليه.`,
                              ayahText: `اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيْمَۙ`,
                            },
                            {
                              tafseer_id: 1,
                              tafseer_name: `التفسير الميسر`,
                              ayah_url: `/quran/1/7/`,
                              ayah_number: 7,
                              text: `طريق الذين أنعمت عليهم من النبيين والصدِّيقين والشهداء والصالحين، فهم أهل الهداية والاستقامة، ولا تجعلنا ممن سلك طريق المغضوب عليهم، الذين عرفوا الحق ولم يعملوا به، وهم اليهود، ومن كان على شاكلتهم، والضالين، وهم الذين لم يهتدوا، فضلوا الطريق، وهم النصارى، ومن اتبع سنتهم. وفي هذا الدعاء شفاء لقلب المسلم من مرض الجحود والجهل والضلال، ودلالة على أن أعظم نعمة على الإطلاق هي نعمة الإسلام، فمن كان أعرف للحق وأتبع له، كان أولى بالصراط المستقيم، ولا ريب أن أصحاب رسول الله صلى الله عليه وسلم هم أولى الناس بذلك بعد الأنبياء عليهم السلام، فدلت الآية                             على فضلهم، وعظيم منزلتهم، رضي الله عنهم. ويستحب للقارئ أن يقول في الصلاة بعد قراءة الفاتحة: (آمين)، ومعناها: اللهم استجب، وليست آية من سورة الفاتحة باتفاق العلماء؛ ولهذا أجمعوا على عدم كتابتها في المصاحف.`,
                              ayahText: `صِرَاطَ الَّذِيْنَ اَنْعَمْتَ عَلَيْهِمْ ەۙ غَيْرِ الْمَغْضُوْبِ عَلَيْهِمْ وَلَا الضَّاۤلِّيْنَ ࣖ`,
                            },
                          ],
                        },
                      ],
                    }}
                    component={Tafsser}
                  />
                  <Drawer.Screen
                    name="Nexts"
                    options={{
                      animation: "slide_from_right",
                      title: "كم بقى",
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/nexts.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={Nexts}
                  />
                  <Drawer.Screen
                    name="Settings"
                    options={{
                      animation: "slide_from_right",
                      title: t("setting"),
                      headerShown: true,
                      drawerIcon: ({ color, size, focused }) => (
                        <Image
                          source={require("./assets/setting.png")}
                          style={{ width: size * 1.7, height: size * 1.7 }}
                        ></Image>
                      ),
                    }}
                    component={SettingsComp}
                  />
                  <Drawer.Screen
                    name="Nawawia1"
                    options={{
                      headerShown: true,
                      drawerLabel: () => null,
                      title: "",
                      drawerIcon: () => null,
                      drawerItemStyle: { height: 0 },
                    }}
                    component={Nawawia1}
                  />
                  <Drawer.Screen
                    name="Hadith1"
                    options={{
                      headerShown: true,
                      drawerLabel: () => null,
                      title: "",
                      drawerIcon: () => null,
                      drawerItemStyle: { height: 0 },
                    }}
                    component={Hadith1}
                  />
                  <Drawer.Screen
                    name="Lictury1"
                    options={{
                      headerShown: true,
                      drawerLabel: () => null,
                      title: "",
                      drawerIcon: () => null,
                      drawerItemStyle: { height: 0 },
                    }}
                    component={Lictury1}
                  />
                  <Drawer.Screen
                    name="Settings1"
                    options={{
                      headerShown: true,
                      drawerLabel: () => null,
                      title: "إختيار صوت الأذان",
                      headerLeft: () => null,
                      headerRight: () => null,
                      drawerIcon: () => null,
                      drawerItemStyle: { height: 0 },
                    }}
                    component={Settings1}
                  />
                </Drawer.Navigator>
              </NavigationContainer>
            )}
          </ApplicationProvider>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 200,
    flex: 1,
  },
  background: {
    flex: 1,
  },
});
