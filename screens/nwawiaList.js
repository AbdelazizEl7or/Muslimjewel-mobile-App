import { Text, Card, useTheme } from '@ui-kitten/components';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';
import { list40Nawawia } from '../data/hadith';


export default function NwawiaList({ route, navigation }) {
    const theme = useTheme();
    function openNawawia(i) {
        navigation.navigate('Nawawia1', { nawawia: list40Nawawia[i] });
    }
    return (
        <View style={{ direction: 'ltr', flex: 1, backgroundColor: theme['background-basic-color-3'] }}>
            <FlatList style={{ flex: 1 }} initialNumToRender={20} data={list40Nawawia} renderItem={itemData => {
                return (
                    <View key={itemData.index}>
                        <Pressable style={styles.inAz} android_ripple={{ color: '#10151f' }}>
                            <Card onPress={openNawawia.bind(this, itemData.index)} style={styles.card} status='info'>
                                <Text style={styles.inAztext} key={itemData.index}>{itemData.item.key} : <Text style={[styles.inAz, { color: '#ff6200' }]}>{itemData.item.nameHadith}</Text></Text>
                            </Card>
                        </Pressable>
                    </View>
                );
            }}
                keyExtractor={(item, i) => { return i }}
            />
        </View>
    );
}
const styles = StyleSheet.create({
    zekr: {
        width: '100%',
        textAlign: 'center',
        borderRadius: 10,
        backgroundColor: 'black',
        marginVertical: 5,

    },
    inAz: {
        fontSize: 23,
        fontFamily: 'font1',
        padding: 15,
    },
    inAztext: {
        fontSize: 23,
        fontFamily: 'font2',
    },
});
