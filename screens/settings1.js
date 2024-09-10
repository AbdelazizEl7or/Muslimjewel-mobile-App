import { useTheme } from '@ui-kitten/components';
import { Dimensions, View } from 'react-native';

import AzanMenu from '../components/azanMenu';


export default function Settings1(props) {
    const theme = useTheme();
    return (
        <>
            <View style={[{ height: Dimensions.get('screen').height, backgroundColor: theme['background-basic-color-3'], padding: 0 }]}>
                <AzanMenu load={console.log} close={props.navigation.navigate.bind(this, 'Home')} closeTrue={true}></AzanMenu>
            </View>
        </>);
}
