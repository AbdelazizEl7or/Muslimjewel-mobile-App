import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useState } from "react";
import Storage from "react-native-storage";
import axios from "axios";
export const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    enableCache: true,
    defaultExpires: 9999999999999999999999999999
});
export const DataContext = createContext({
    setTheme: (theme = themeType.dark) => Promise,
    getTheme: () => Promise,
    setLocation: (location) => Promise,
    getLocation: () => Promise,
    setAzan: (azan) => Promise,
    getAzan: () => Promise,
    set: (key, value) => Promise,
    get: (key) => Promise,
    get: (key) => Promise,
    // getTr: (key) => Promise,
});
let s = [
    'Al-Fatihah',
    ' Al-Baqarah',
    ' Aali Imran',
    ' An-Nisa',
    ' Al-Ma`idah',
    ' Al-An`am',
    ' Al-A`raf',
    ' Al-Anfal',
    ' At-Tawbah',
    ' Yunus',
    ' Hud',
    ' Yusuf',
    ' Ar-Ra`d',
    ' Ibrahim',
    ' Al-Hijr',
    ' An-Nahl',
    ' Al-Isra',
    ' Al-Kahf',
    ' Maryam',
    ' Ta-Ha',
    ' Al-Anbiya',
    ' Al-Hajj',
    ' Al-Mu`minun',
    ' An-Nur',
    ' Al-Furqan',
    ' Ash-Shu`ara',
    ' An-Naml',
    ' Al-Qasas',
    ' Al-Ankabut',
    ' Ar-Rum',
    ' Luqman',
    ' As-Sajda',
    ' Al-Ahzab',
    ' Saba',
    ' Fatir',
    ' Ya-Sin',
    ' As-Saffat',
    ' Sad',
    ' Az-Zumar',
    ' Ghafir',
    ' Fussilat',
    ' Ash-Shura',
    ' Az-Zukhruf',
    ' Ad-Dukhan',
    ' Al-Jathiyah',
    ' Al-Ahqaf',
    ' Muhammad',
    ' Al-Fath',
    ' Al-Hujurat',
    ' Qaf',
    ' Adh-Dhariyat',
    ' At-Tur',
    ' An-Najm',
    ' Al-Qamar',
    ' Ar-Rahman',
    ' Al-Waqi`ah',
    ' Al-Hadid',
    ' Al-Mujadila',
    ' Al-Hashr',
    ' Al-Mumtahina',
    ' As-Saff',
    ' Al-Jumu`ah',
    ' Al-Munafiqun',
    ' At-Taghabun',
    ' At-Talaq',
    ' At-Tahrim',
    ' Al-Mulk',
    ' Al-Qalam',
    ' Al-Haqqah',
    ' Al-Ma`arij',
    ' Nuh',
    ' Al-Jinn',
    ' Al-Muzzammil',
    ' Al-Muddathir',
    ' Al-Qiyamah',
    ' Al-Insan',
    ' Al-Mursalat',
    ' An-Naba',
    ' An-Nazi`at',
    'Abasa',
    ' At-Takwir',
    ' Al-Infitar',
    ' Al-Mutaffifin',
    ' Al-Inshiqaq',
    ' Al-Buruj',
    ' At-Tariq',
    ' Al-Ala',
    ' Al-Ghashiyah',
    ' Al-Fajr',
    ' Al-Balad',
    ' Ash-Shams',
    ' Al-Lail',
    ' Ad-Duha',
    ' Ash-Sharh',
    ' At-Tin',
    ' Al-Alaq',
    ' Al-Qadr',
    ' Al-Bayyinah',
    ' Az-Zalzalah',
    ' Al-Adiyat',
    ' Al-Qari`ah',
    ' At-Takathur',
    ' Al-Asr',
    ' Al-Humazah',
    ' Al-Fil',
    ' Quraysh',
    ' Al-Ma`un',
    ' Al-Kawthar',
    ' Al-Kafirun',
    ' An-Nasr',
    ' Al-Masad',
    ' Al-Ikhlas',
    ' Al-Falaq',
    ' An-Nas',
]

export default function DataContextProvider({ children }) {

    async function setTheme(theme) {
        return storage.save({ key: 'theme', data: theme });
    }
    function getTheme() {
        return storage.load({ key: 'theme' }).catch(() => {
            return themeType.dark;
        });
    }

    async function setLang(Lang) {
        return storage.save({ key: 'Lang', data: Lang });
    }
    function getLang() {
        return storage.load({ key: 'Lang' }).catch(() => {
            return 'ar';
        });
    }

    function getTheme() {
        return storage.load({ key: 'theme' }).catch(() => {
            return themeType.dark;
        });
    }

    async function setLocation(location) {
        //        await AsyncStorage.setItem('location', JSON.stringify(location));
        return storage.save({
            key: 'location',
            data: JSON.stringify(location),
        });
    }

    async function setAzan(index) {
        return storage.save({ key: 'azan', data: index, });
    }

    function getAzan() {
        return storage.load({ key: 'azan' }).catch(() => 0);
    }



    async function set(key, value) {
        return storage.save({
            key: key,
            data: value,
        });
    }

    function get(key) {
        return storage.load({ key: key }).catch(() => {
            return null;
        });
    }

    // function getTr(key, lang) {
    //     if (Lang == 'ar') {
    //         console.log(key)
    //         return key;
    //     }
    //     else
    //         return axios.post("https://translation.googleapis.com/language/translate/v2",
    //             {
    //                 "q": key,
    //                 "source": "auto",
    //                 "target": "en",
    //                 "format": "text"
    //             }, { headers: { "Content-Type": "application/text" } }).then((e) => e.data)
    // }

    function getLocation() {
        return storage.load({ key: 'location' }).catch(() => {
            return null;
        });
    }

    const value = {
        setTheme: setTheme,
        getTheme: getTheme,
        setLocation: setLocation,
        getLocation: getLocation,
        setAzan: setAzan,
        getAzan: getAzan,
        set: set,
        get: get,
        // getTr: getTr,
    }

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>

}
export const themeType = { dark: 'DARK', light: 'LIGHT' };