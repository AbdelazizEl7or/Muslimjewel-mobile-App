import { FlashList } from '@shopify/flash-list';
import { ProgressBar, Text, useTheme } from '@ui-kitten/components';
import { Image, ImageBackground } from 'expo-image';
import { useContext, useRef, useState } from 'react';
import { Alert, Dimensions, Modal, Pressable, ScrollView, StyleSheet, ToastAndroid, Vibration, View } from 'react-native';
import { Entypo, FontAwesome5, Ionicons, AntDesign, EvilIcons, Feather } from '@expo/vector-icons';
import Dialog from "react-native-dialog";
import { useNavigation } from '@react-navigation/native';
import { DataContext } from '../context/data-context';

export default function Sebha() {
    const theme = useTheme();
    const [Min, setMin] = useState(0)
    const [Num, setNum] = useState(0)
    const [Max, setMax] = useState(33)
    const [text, setText] = useState('سبحان الله وبحمده')
    const [visibleList, setVisibleList] = useState(false);
    const [dialogVisible, setDialogVisible] = useState(false);
    const [name, setName] = useState(false);
    const [numbs, setNumbs] = useState(false);
    const [err, seterr] = useState(false);
    const [list, setList] = useState(false);

    const DataCtx = useContext(DataContext);
    useNavigation().addListener('focus', async () => {
        let lsit = JSON.parse((await DataCtx.get('ListSebh'))) || [
            { name: 'سبحان الله', count: 33 },
            { name: 'الحمد لله', count: 33 },
            { name: 'الله أكبر', count: 33 },
            { name: 'لا إله إلا الله وحده لا شريك له', count: 100 },
            { name: 'لا إله إلا الله وحده لا شريك له له الملك وله الحمد وهو على كل شيئ قدير', count: 10 },
            { name: 'سبحان الله وبحمده', count: 33 },
            { name: 'سبحان الله العظيم', count: 33 },
            { name: 'اللهم صلي وسلم على نبينا محمد', count: 33 },
        ];
        setList(lsit);
    })
    function add() {
        setMin((n) => n + 1);
        if (Min + 1 >= Max) {
            setNum((n) => n + 1)
            Vibration.vibrate();
            setTimeout(() => {
                setMin(0);
            }, 100);
        }
    }
    function select(e) {
        setNum(0)
        setMin(0);
        setText(e.name)
        setMax(e.count)
        setVisibleList(false)
    }

    function reset() {
        setMin(0);
        setNum(0);
    }

    async function addOne(e) {
        seterr('')
        if (name && numbs && typeof +numbs == 'number' && +numbs >= 1) {
            select({ name: name, count: numbs });
            setDialogVisible(false);
            await DataCtx.set('ListSebh', JSON.stringify([{ name: name, count: numbs }, ...list]));
            setList((v) =>
                [{ name: name, count: numbs }, ...v]
            );
            setName('')
            setNumbs(0);
        }
        else {
            setTimeout(() => {
                seterr('بالرجاء كتابة المدخلات صحيحة')
            }, 100);
            setDialogVisible(true);
        }
    }
    async function deletet(i) {
        let lsit = list;
        lsit.splice(i, 1);
        setList(lsit);
        await DataCtx.set('ListSebh', JSON.stringify(lsit));
        setVisibleList(false)
        ToastAndroid.show('تم الحذف !', 1000)
    }


    return (
        <>
            <Dialog.Container visible={dialogVisible}>
                <Dialog.Title style={{ fontFamily: 'font2' }}>إضافة حلقة تسبيح</Dialog.Title>
                <Dialog.Description style={{ fontFamily: 'font2', color: 'red' }}>
                    {err}
                </Dialog.Description>
                <Dialog.Input placeholder='الأسم' onChange={(e) => setName(e.nativeEvent.text)} />
                <Dialog.Input placeholder='العدد' onChange={(e) => setNumbs(e.nativeEvent.text)} keyboardType='decimal-pad' />
                <Dialog.Button label="إلغاء" onPress={() => setDialogVisible(false)} />
                <Dialog.Button label="حفظ" onPress={addOne} />
            </Dialog.Container>
            <Modal visible={visibleList} animationType={'slide'}>
                <View style={[styles.modal, { backgroundColor: theme['background-basic-color-2'], width: '100%', height: Dimensions.get('window').height - 70, padding: 7 }]}>
                    <View style={styles.titleCont}>
                        <Ionicons onPress={setVisibleList.bind(this, false)} style={styles.icon} name='close' size={30} color={theme['text-basic-color']}></Ionicons>
                        <Text style={[styles.title, { fontSize: 20 }]}>
                            أنقر مطولا للمسح
                        </Text>
                        <Ionicons onPress={() => setDialogVisible(true)} style={styles.icon} name='add-circle' size={30} color={theme['text-basic-color']}></Ionicons>
                        <Text style={styles.title}>
                            حلقة التسبيح
                        </Text>
                    </View>
                    <FlashList
                        data={list}
                        estimatedItemSize={200}
                        renderItem={itemData => {
                            return (
                                <Pressable onLongPress={deletet.bind(this, itemData.index)} onPress={select.bind(this, itemData.item)} >
                                    <View style={{ width: '100%', marginVertical: 20, justifyContent: 'space-between', padding: 16, alignItems: 'center', backgroundColor: theme['background-basic-color-4'], borderRadius: 8, borderColor: theme['text-basic-color'], color: theme['text-basic-color'], borderWidth: 2, elevation: 10 }}>
                                        <Text style={{ fontFamily: 'font1', fontSize: 23, textAlign: 'center' }}>{itemData.item.name}</Text>
                                        <Text style={{ fontFamily: 'font1', fontSize: 23, textAlign: 'center' }}>{itemData.item.count}</Text>
                                    </View>
                                </Pressable>
                            )
                        }} />
                </View>
            </Modal>
            <ScrollView style={{ backgroundColor: theme['background-basic-color-3'], height: Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height - 70 : 600, }}>
                <ImageBackground style={{ width: '100%', padding: 5, height: Dimensions.get('window').height > Dimensions.get('window').width ? Dimensions.get('window').height - 70 : 600, }} source={require('../assets/tasb.jpg')}>
                    <ScrollView>
                        <Pressable onPress={setVisibleList.bind(this, true)} >
                            <View style={{ width: '100%', marginVertical: 20, paddingHorizontal: 30, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', backgroundColor: '#dc454c', borderRadius: 10 }}>
                                <Text numberOfLines={1} style={{ fontFamily: 'font1', fontSize: 23, textAlign: 'center', }}>{text}</Text>
                                <Ionicons style={{ paddingRight: 30 }} name='list' color={theme['text-basic-color']} size={30}></Ionicons>
                            </View>
                        </Pressable>
                        <View style={{ width: '100%', marginVertical: 6, justifyContent: 'center', alignItems: 'center', borderRadius: 40 }}>
                            <Text style={{ fontFamily: 'font1', fontSize: 23, textAlign: 'center', textShadowColor: theme['background-basic-color-4'], textShadowOffset: { height: 1, width: 0 }, textShadowRadius: 5 }}>عدد المجموعات : {Num}</Text>
                        </View>
                        <View style={{ width: '100%', marginVertical: 20, justifyContent: 'space-between', flexDirection: 'row' }}>
                            <Text style={{ fontFamily: 'font1', fontSize: 23, textAlign: 'center', color: 'white', textShadowColor: theme['background-basic-color-4'], textShadowOffset: { height: 1, width: 0 }, textShadowRadius: 5, backgroundColor: '#002b38', color: 'white', padding: 10, borderRadius: 6 }}>{Max}</Text>
                            <Text style={{ fontFamily: 'font1', fontSize: 23, textAlign: 'center' }}></Text>
                        </View>
                        <ProgressBar
                            progress={(Min / Max * 100) / 100}
                            style={{ height: 30, borderRadius: 8 }}
                        />
                        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                            <View style={{ width: '20%', marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Pressable onPress={reset} style={{ width: 50, backgroundColor: theme['background-basic-color-4'], height: 50, borderRadius: 125, borderColor: theme['text-basic-color'], borderWidth: 4, alignItems: 'center', justifyContent: 'center' }}>
                                    <Feather name='rotate-cw' color={theme['text-basic-color']} size={30}></Feather>
                                </Pressable>
                            </View>
                            <View style={{ width: '70%', marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                                <Pressable onPress={add} style={{ width: 240, backgroundColor: theme['background-basic-color-4'], height: 240, borderRadius: 125, borderColor: theme['text-basic-color'], borderWidth: 4, alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontFamily: 'font1', fontSize: 50, textAlign: 'center' }}>{Min}</Text>
                                </Pressable>
                            </View>
                        </View>
                    </ScrollView>
                </ImageBackground>
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    modal: {
        backgroundColor: '#101426',
        flex: 1
    },
    titleCont: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between',

    },
    titleAll: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 23,
        fontFamily: 'font2'
    },
    picker: {
        flex: 1,
    },
    tab: {
        height: '90%',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white'
    },
    image: { width: '100%', height: '100%' },
    overlay: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: '#000000e6',
        zIndex: 999999999999999999999999999999,
        opacity: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listItemText: {
        marginRight: 15,
        fontFamily: 'font2',
        fontSize: 33
    }
    , tafsr: {
        width: '100%',
        textAlign: 'center',
        padding: 10,
        borderRadius: 20,
        backgroundColor: 'black',
        marginVertical: 5,
        fontFamily: 'font2',
        fontSize: 23
    },
    zekr: {
        width: '100%',
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: 'black',
        marginVertical: 5,

    },
    inAz: {
        fontSize: 23,
        fontFamily: 'font2',
        padding: 15,
    },
    inAztext: {
        fontSize: 23,
        fontFamily: 'font1',
    },
    textTitle: {
        color: '#c70000',
        fontSize: 25,
        fontFamily: 'font1',
    },
    textCont: {
        backgroundColor: '#1a1a1c',
        margin: 5,
        borderRadius: 4,
        padding: 6,
        fontSize: 20,
        fontFamily: 'font2',
        lineHeight: 25,
        flexDirection: 'column',
        flex: 1
    },
    text: {
        fontSize: 20,
        fontFamily: 'font2',
        lineHeight: 25,
    },
    select: {
        flex: 0.8,
        margin: 5,
    },
});
