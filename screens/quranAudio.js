import { Dimensions, ScrollView, StyleSheet, View } from 'react-native';
import { CustomListItem } from '../components/listItem';
import { Mans } from '../data/MoshafAudio';
import { useTheme } from '@ui-kitten/components';

export default function QuranAudio(props) {
    const theme = useTheme();

    function onPress(id) {
        props.navigation.navigate('listenQuranAudio', { id });
    }

    return (
        <>
            <ScrollView style={{ height: Dimensions.get('screen').height, backgroundColor: theme['background-basic-color-3'] }}>
                {Mans.map((m) => {
                    return <CustomListItem onPress={onPress} key={m.id} id={m.id} title={m.name} description={''} image={{ uri: m.image }}></CustomListItem>
                })}
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
});