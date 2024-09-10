import {
  Avatar,
  Button,
  Layout,
  ListItem,
  Select,
  SelectItem,
  Text,
  ViewPager,
  useTheme,
} from "@ui-kitten/components";
import React, { useContext, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  ImageBackground,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { Ayah, Ayahs } from "../data/ayah";
import { Image } from "expo-image";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { tafseerMuisar } from "../data/tafseerMuisar";
import { FlashList } from "@shopify/flash-list";
import { DataContext } from "../context/data-context";
import { Soars, numto3 } from "../data/MoshafAudio";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
let moshaf = [
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/001.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/002.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/003.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/004.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/005.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/006.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/007.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/008.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/009.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/010.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/011.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/012.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/013.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/014.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/015.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/016.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/017.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/018.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/019.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/020.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/021.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/022.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/023.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/024.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/025.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/026.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/027.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/028.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/029.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/030.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/031.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/032.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/033.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/034.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/035.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/036.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/037.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/038.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/039.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/040.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/041.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/042.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/043.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/044.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/045.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/046.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/047.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/048.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/049.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/050.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/051.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/052.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/053.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/054.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/055.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/056.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/057.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/058.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/059.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/060.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/061.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/062.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/063.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/064.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/065.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/066.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/067.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/068.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/069.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/070.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/071.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/072.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/073.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/074.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/075.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/076.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/077.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/078.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/079.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/080.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/081.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/082.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/083.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/084.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/085.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/086.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/087.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/088.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/089.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/090.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/091.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/092.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/093.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/094.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/095.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/096.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/097.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/098.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/099.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/100.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/101.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/102.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/103.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/104.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/105.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/106.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/107.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/108.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/109.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/110.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/111.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/112.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/113.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/114.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/115.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/116.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/117.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/118.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/119.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/120.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/121.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/122.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/123.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/124.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/125.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/126.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/127.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/128.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/129.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/130.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/131.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/132.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/133.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/134.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/135.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/136.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/137.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/138.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/139.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/140.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/141.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/142.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/143.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/144.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/145.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/146.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/147.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/148.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/149.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/150.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/151.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/152.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/153.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/154.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/155.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/156.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/157.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/158.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/159.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/160.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/161.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/162.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/163.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/164.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/165.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/166.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/167.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/168.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/169.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/170.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/171.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/172.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/173.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/174.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/175.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/176.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/177.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/178.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/179.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/180.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/181.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/182.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/183.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/184.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/185.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/186.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/187.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/188.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/189.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/190.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/191.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/192.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/193.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/194.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/195.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/196.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/197.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/198.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/199.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/200.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/201.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/202.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/203.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/204.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/205.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/206.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/207.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/208.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/209.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/210.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/211.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/212.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/213.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/214.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/215.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/216.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/217.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/218.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/219.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/220.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/221.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/222.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/223.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/224.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/225.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/226.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/227.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/228.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/229.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/230.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/231.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/232.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/233.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/234.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/235.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/236.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/237.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/238.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/239.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/240.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/241.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/242.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/243.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/244.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/245.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/246.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/247.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/248.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/249.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/250.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/251.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/252.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/253.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/254.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/255.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/256.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/257.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/258.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/259.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/260.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/261.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/262.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/263.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/264.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/265.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/266.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/267.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/268.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/269.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/270.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/271.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/272.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/273.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/274.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/275.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/276.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/277.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/278.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/279.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/280.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/281.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/282.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/283.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/284.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/285.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/286.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/287.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/288.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/289.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/290.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/291.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/292.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/293.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/294.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/295.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/296.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/297.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/298.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/299.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/300.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/301.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/302.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/303.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/304.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/305.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/306.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/307.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/308.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/309.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/310.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/311.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/312.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/313.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/314.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/315.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/316.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/317.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/318.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/319.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/320.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/321.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/322.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/323.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/324.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/325.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/326.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/327.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/328.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/329.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/330.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/331.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/332.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/333.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/334.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/335.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/336.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/337.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/338.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/339.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/340.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/341.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/342.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/343.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/344.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/345.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/346.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/347.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/348.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/349.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/350.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/351.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/352.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/353.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/354.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/355.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/356.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/357.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/358.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/359.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/360.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/361.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/362.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/363.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/364.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/365.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/366.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/367.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/368.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/369.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/370.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/371.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/372.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/373.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/374.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/375.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/376.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/377.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/378.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/379.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/380.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/381.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/382.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/383.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/384.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/385.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/386.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/387.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/388.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/389.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/390.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/391.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/392.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/393.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/394.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/395.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/396.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/397.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/398.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/399.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/400.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/401.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/402.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/403.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/404.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/405.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/406.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/407.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/408.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/409.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/410.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/411.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/412.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/413.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/414.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/415.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/416.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/417.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/418.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/419.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/420.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/421.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/422.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/423.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/424.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/425.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/426.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/427.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/428.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/429.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/430.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/431.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/432.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/433.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/434.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/435.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/436.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/437.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/438.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/439.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/440.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/441.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/442.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/443.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/444.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/445.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/446.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/447.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/448.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/449.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/450.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/451.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/452.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/453.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/454.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/455.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/456.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/457.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/458.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/459.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/460.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/461.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/462.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/463.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/464.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/465.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/466.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/467.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/468.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/469.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/470.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/471.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/472.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/473.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/474.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/475.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/476.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/477.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/478.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/479.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/480.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/481.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/482.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/483.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/484.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/485.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/486.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/487.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/488.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/489.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/490.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/491.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/492.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/493.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/494.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/495.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/496.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/497.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/498.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/499.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/500.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/501.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/502.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/503.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/504.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/505.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/506.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/507.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/508.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/509.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/510.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/511.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/512.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/513.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/514.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/515.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/516.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/517.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/518.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/519.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/520.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/521.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/522.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/523.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/524.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/525.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/526.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/527.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/528.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/529.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/530.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/531.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/532.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/533.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/534.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/535.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/536.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/537.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/538.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/539.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/540.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/541.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/542.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/543.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/544.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/545.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/546.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/547.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/548.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/549.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/550.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/551.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/552.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/553.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/554.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/555.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/556.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/557.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/558.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/559.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/560.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/561.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/562.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/563.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/564.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/565.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/566.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/567.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/568.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/569.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/570.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/571.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/572.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/573.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/574.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/575.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/576.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/577.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/578.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/579.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/580.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/581.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/582.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/583.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/584.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/585.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/586.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/587.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/588.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/589.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/590.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/591.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/592.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/593.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/594.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/595.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/596.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/597.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/598.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/599.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/600.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/601.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/602.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/603.jpg",
  },
  {
    uri: "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/604.jpg",
  },
];

export default function Moshaf({ route, navigation }) {
  const DataCtx = useContext(DataContext);
  const theme = useTheme();
  const [loader, setLoader] = useState(true);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const [isSoursModalOpen, setIsSoursModalOpen] = useState(false);
  const [isJuzModalOpen, setIsJuzModalOpen] = useState(false);
  //   const [moshaf, setMoshaf] = useState([
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //     {
  //       uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //     },
  //   ]);
  const Juz = [];
  for (let i = 0; i < 30; ) {
    var e = Ayah.data.find((e) => e.juz == i + 1);
    Juz.push({
      id: i + 1,
      name: e.arab.slice(0, 30),
      soura: Soars[+e.surah - 1],
      page: +e.page,
    });
    i++;
  }

  //   async function toDataUrl(i) {
  //     let e = moshaf;
  //     e[i] = {
  //       uri:
  //         "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/" +
  //         numto3(i + 2) +
  //         ".jpg",
  //     };
  //     setMoshaf(e);

  //     setTimeout(() => {
  //       let e = moshaf;
  //       e[i] = {
  //         uri:
  //           "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/" +
  //           numto3(i + 2) +
  //           ".jpg",
  //       };
  //       setMoshaf(e);
  //     }, 50);
  //     setTimeout(() => {
  //       let e = moshaf;
  //       e[i] = {
  //         uri:
  //           "https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/" +
  //           numto3(i + 2) +
  //           ".jpg",
  //       };
  //       setMoshaf(e);
  //     }, 300);
  //     // if (moshaf[i] && moshaf[i].uri == 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif') {
  //     //     let myBase64 = await axios.get('https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/' + numto3(i + 1) + '.jpg', {
  //     //         responseType: 'blob'
  //     //     })
  //     //     var reader = new FileReader();
  //     //     reader.onloadend = function () {
  //     //         let e = moshaf;
  //     //         e[i] = { uri: reader.result }
  //     //         setMoshaf(e);
  //     //     }
  //     //     reader.readAsDataURL(myBase64.data);
  //     // }
  //     // if (moshaf[i + 1] && moshaf[i + 1].uri == 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif') {
  //     //     let myBase64 = await axios.get(, {
  //     //         responseType: 'blob'
  //     //     })
  //     //     var reader = new FileReader();
  //     //     reader.onloadend = function () {
  //     //         let e = moshaf;
  //     //         e[i + 1] = { uri: reader.result }
  //     //         setMoshaf(e);
  //     //     }
  //     //     reader.readAsDataURL(myBase64.data);
  //     // }
  //     // if (moshaf[i - 1] && moshaf[i - 1].uri == 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif') {
  //     //     let myBase64 = await axios.get('https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/' + numto3(i) + '.jpg', {
  //     //         responseType: 'blob'
  //     //     })
  //     //     var reader = new FileReader();
  //     //     reader.onloadend = function () {
  //     //         let e = moshaf;
  //     //         e[i - 1] = { uri: reader.result }
  //     //         setMoshaf(e);
  //     //     }
  //     //     reader.readAsDataURL(myBase64.data);
  //     // }
  //     // if (moshaf[i + 2] && moshaf[i + 2].uri == 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif') {
  //     //     let myBase64 = await axios.get('https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/' + numto3(i + 3) + '.jpg', {
  //     //         responseType: 'blob'
  //     //     })
  //     //     var reader = new FileReader();
  //     //     reader.onloadend = function () {
  //     //         let e = moshaf;
  //     //         e[i + 2] = { uri: reader.result }
  //     //         setMoshaf(e);
  //     //     }
  //     //     reader.readAsDataURL(myBase64.data);
  //     // }
  //     // if (moshaf[i - 2] && moshaf[i - 2].uri == 'https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif') {
  //     //     let myBase64 = await axios.get('https://easyquran-eg.com/qrhafs/assets/frontend/dist/img/' + numto3(i - 1) + '.jpg', {
  //     //         responseType: 'blob'
  //     //     })
  //     //     var reader = new FileReader();
  //     //     reader.onloadend = function () {
  //     //         let e = moshaf;
  //     //         e[i - 2] = { uri: reader.result }
  //     //         setMoshaf(e);
  //     //     }
  //     //     reader.readAsDataURL(myBase64.data);
  //     // }
  //     moshaf.forEach((e, ind) => {
  //       if (ind >= i + 4 || ind < i - 4) {
  //         let e = moshaf;
  //         e[ind] = {
  //           uri: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Youtube_loading_symbol_1_(wobbly).gif",
  //         };
  //         setMoshaf(e);
  //       }
  //     });
  //   }
  const shouldLoadComponent = (index) =>
    index === selectedIndex ||
    index === selectedIndex + 1 ||
    index === selectedIndex - 1;
  //|| index === selectedIndex + 2 || index === selectedIndex - 2;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    enableCache: true,
    defaultExpires: 9999999999999999999999999999,
  });

  function back() {
    setIsListModalOpen(false);
    navigation.navigate("Home");
  }

  async function openModal() {
    setIsListModalOpen(true);
  }
  async function onSelect(index) {
    if (!loader) {
      var e = Ayah.data.find((e) => e.page == index);
      setSelectedIndex(index);
      storage.save({
        key: "index",
        data: index,
      });
    }
  }

  useNavigation().addListener("focus", () => {
    navigation.setOptions({
      headerRight: () => {
        return (
          <Ionicons
            name="list"
            onPress={openModal}
            color={theme["text-basic-color"]}
            size={30}
          ></Ionicons>
        );
      },
    });
  });
  function gotoPage(i) {
    onSelect(i - 1 || 0);
    setIsListModalOpen(false);
    setIsSoursModalOpen(false);
    setIsJuzModalOpen(false);
  }
  useState(async () => {
    storage
      .load({ key: "index" })
      .then((v) => {
        setSelectedIndex(v);
        setTimeout(() => {
          navigation.setOptions({
            headerRight: () => {
              return (
                <Ionicons
                  name="list"
                  onPress={openModal}
                  color={theme["text-basic-color"]}
                  size={30}
                ></Ionicons>
              );
            },
          });
          setLoader(false);
        }, 100);
      })
      .catch(() => {
        navigation.setOptions({
          headerRight: () => {
            return (
              <Ionicons
                name="list"
                onPress={openModal}
                color={theme["text-basic-color"]}
                size={30}
              ></Ionicons>
            );
          },
        });
        setSelectedIndex(0);
        setLoader(false);
      });
  });
  function openTaffser() {
    setLoader(true);
    setTimeout(() => {
      setIsListModalOpen(false);
      setLoader(false);
      let arr = [];
      Soars.filter(
        (e) =>
          selectedIndex + 1 >= e.startPage && selectedIndex + 1 <= e.endPage
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
      navigation.navigate("Tafseer", {
        souraTafseer: arr,
        page: selectedIndex + 1,
        fromMe: false,
      });
    }, 10);
  }
  function openAzkar() {
    setIsListModalOpen(false);
    navigation.navigate("Azkar");
  }
  function openMoton() {
    setIsListModalOpen(false);
    navigation.navigate("Moton");
  }
  function openEnd() {
    setIsListModalOpen(false);
    navigation.navigate("EndOfQuran");
  }
  function openNwawiaList() {
    setIsListModalOpen(false);
    navigation.navigate("NwawiaList");
  }
  function openSearch() {
    setIsListModalOpen(false);
    navigation.navigate("Search", { moshaf: route.params.moshaf });
  }
  return (
    <>
      {loader && (
        <View style={[styles.overlay]}>
          <ActivityIndicator size="large" color="gold" />
        </View>
      )}
      <Modal visible={isListModalOpen} animationType={"slide"}>
        {loader && (
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
            <Text style={styles.title}>القائمة الرئيسية</Text>
            <Ionicons
              onPress={setIsListModalOpen.bind(this, false)}
              style={styles.icon}
              name="close"
              size={30}
              color={theme["text-basic-color"]}
            ></Ionicons>
          </View>
          <View style={{ direction: "rtl" }}>
            <ScrollView>
              <ListItem
                onPress={setIsSoursModalOpen.bind(this, true)}
                key={1}
                accessoryLeft={({ props }) => (
                  <>
                    <Ionicons
                      name="list-circle-outline"
                      size={40}
                      color={theme["text-basic-color"]}
                    ></Ionicons>
                    <Text
                      style={[
                        styles.listItemText,
                        { fontFamily: "font1", marginLeft: 50 },
                      ]}
                    >
                      السور
                    </Text>
                  </>
                )}
              />
              <ListItem
                onPress={setIsJuzModalOpen.bind(this, true)}
                key={1000}
                accessoryLeft={({ props }) => (
                  <>
                    <Ionicons
                      name="pie-chart-outline"
                      size={40}
                      color={theme["text-basic-color"]}
                    ></Ionicons>
                    <Text
                      style={[
                        styles.listItemText,
                        { fontFamily: "font1", marginLeft: 50 },
                      ]}
                    >
                      الأجزاء
                    </Text>
                  </>
                )}
              />
              <ListItem
                onPress={openTaffser}
                key={2}
                accessoryLeft={({ props }) => (
                  <>
                    <Ionicons
                      name="book-outline"
                      size={40}
                      color={theme["text-basic-color"]}
                    ></Ionicons>
                    <Text
                      style={[
                        styles.listItemText,
                        { fontFamily: "font1", marginLeft: 50 },
                      ]}
                    >
                      التفسير الميسر
                    </Text>
                  </>
                )}
              />
              <ListItem
                onPress={back}
                key={24}
                accessoryLeft={({ props }) => (
                  <>
                    <Ionicons
                      name="home"
                      size={40}
                      color={theme["text-basic-color"]}
                    ></Ionicons>
                    <Text
                      style={[
                        styles.listItemText,
                        { fontFamily: "font1", marginLeft: 50 },
                      ]}
                    >
                      الرئيسية
                    </Text>
                  </>
                )}
              />
              {/*
                            <ListItem onPress={openAzkar} key={3}
                                accessoryRight={({ props }) =>
                                    <><Text style={[styles.listItemText, { fontFamily: 'normal' }]}> الأذكار</Text>
                                        <Ionicons name='copy-outline' size={40} color={theme['text-basic-color']}></Ionicons>
                                    </>}
                            />
                            <ListItem onPress={openMoton} key={4}
                                accessoryRight={({ props }) =>
                                    <><Text style={[styles.listItemText, { fontFamily: 'normal' }]}> المتون القراَنية</Text>
                                        <Entypo name='text' size={40} color={theme['text-basic-color']}></Entypo>
                                    </>}
                            />
                            <ListItem onPress={openEnd} key={5}
                                accessoryRight={({ props }) =>
                                    <><Text style={[styles.listItemText, { fontFamily: 'normal' }]}>دعاء ختم القراَن</Text>
                                        <FontAwesome5 name="hand-holding" size={40} color={theme['text-basic-color']} />
                                    </>}
                            />
                            <ListItem onPress={openNwawiaList} key={6}
                                accessoryRight={({ props }) =>
                                    <><Text style={[styles.listItemText, { fontFamily: 'normal' }]}>الأربعون النووية</Text>
                                        <Entypo name='open-book' size={40} color={theme['text-basic-color']}></Entypo>
                                    </>}
                            />
                            <ListItem onPress={openSearch} key={7}
                                accessoryRight={({ props }) =>
                                    <><Text style={[styles.listItemText, { fontFamily: 'normal' }]}> بحث عن أية</Text>
                                        <Ionicons name='search-outline' size={40} color={theme['text-basic-color']}></Ionicons>
                                    </>}
                            /> */}
              {/* <ListItem key={100}
                                accessoryRight={({ props }) =>
                                    <><Text style={[{ color: 'transparent' }]}>empty</Text>
                                        <Ionicons name='search-outline' size={40} color={'transparent'}></Ionicons>
                                    </>}
                            /> */}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal visible={isSoursModalOpen} animationType={"fade"}>
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
            getItemType={(item) => {
              return Image;
            }}
            renderItem={(itemData) => {
              return (
                <ListItem
                  onPress={gotoPage.bind(this, itemData.item.page)}
                  key={itemData.item.id}
                  accessoryRight={() => (
                    <>
                      <Text
                        style={[styles.listItemText, { fontFamily: "font2" }]}
                      >
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
      <Modal visible={isJuzModalOpen} animationType={"slide"}>
        <View
          style={[
            styles.modal,
            { backgroundColor: theme["background-basic-color-2"] },
          ]}
        >
          <View style={styles.titleCont}>
            <Text style={styles.title}>الأجزاء</Text>
            <Ionicons
              onPress={setIsJuzModalOpen.bind(this, false)}
              style={styles.icon}
              name="arrow-back"
              size={30}
              color={theme["text-basic-color"]}
            ></Ionicons>
          </View>
          <FlashList
            data={Juz}
            estimatedItemSize={200}
            renderItem={(itemData) => {
              return (
                <ListItem
                  onPress={gotoPage.bind(this, itemData.item.page)}
                  key={itemData.item.id}
                  accessoryRight={() => (
                    <View
                      style={{
                        justifyContent: "space-around",
                        flexDirection: "row",
                        width: "100%",
                      }}
                    >
                      <Text
                        style={{
                          marginRight: 10,
                          fontSize: 20,
                          fontFamily: "font2",
                          color: "#910000",
                        }}
                      >
                        {itemData.item.soura.name}
                      </Text>
                      <Text style={styles.listItemText}>
                        {itemData.item.name}
                      </Text>
                      <Button appearance="ghost">{itemData.item.id}</Button>
                    </View>
                  )}
                />
              );
            }}
          />
        </View>
      </Modal>
      <ImageBackground
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        imageStyle={{
          width: 100,
          height: 100,
          alignSelf: "center",
          marginTop: Dimensions.get("screen").height / 2 - 100,
          marginStart: Dimensions.get("screen").width / 2 - 40,
        }}
        source={require("../assets/load.gif")}
      >
        <View style={{ flex: 1 }}>
          <ViewPager
            style={{ flex: 1, direction: "ltr" }}
            selectedIndex={selectedIndex}
            shouldLoadComponent={shouldLoadComponent}
            onSelect={(index) => onSelect(index)}
          >
            {moshaf.map((v, i) => {
              return (
                <Layout key={i} level="2" style={styles.tab}>
                  {Dimensions.get("screen").height >
                  Dimensions.get("screen").width ? (
                    <Image contentFit="fill" style={styles.image} source={v} />
                  ) : (
                    <ScrollView style={{ flex: 1 }}>
                      <Image
                        style={[
                          styles.image,
                          {
                            flex: 1,
                            width: Dimensions.get("screen").width,
                            height:
                              Dimensions.get("screen").width +
                              Dimensions.get("screen").height,
                          },
                        ]}
                        source={v}
                      />
                    </ScrollView>
                  )}
                </Layout>
              );
            })}
          </ViewPager>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  tab: {
    height: "90%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "transparent",
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
  modal: {
    backgroundColor: "#101426",
    flex: 1,
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
  icon: {},
  listItemText: {
    marginRight: 15,
    fontSize: 33,
  },
  tafsr: {
    width: "100%",
    textAlign: "center",
    padding: 10,
    borderRadius: 20,
    backgroundColor: "black",
    marginVertical: 5,
    fontFamily: "normal",
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
    fontFamily: "normal",
    padding: 15,
  },
  inAztext: {
    fontSize: 23,
    fontFamily: "normal",
  },
  textTitle: {
    color: "#c70000",
    fontSize: 25,
    fontFamily: "normal",
  },
  textCont: {
    backgroundColor: "#1a1a1c",
    margin: 5,
    borderRadius: 4,
    padding: 6,
    fontSize: 20,
    fontFamily: "normal",
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
});
