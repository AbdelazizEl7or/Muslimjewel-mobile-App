import { ApplicationProvider, useTheme } from '@ui-kitten/components';
import { StatusBar } from 'expo-status-bar';
import { ImageBackground, StyleSheet, Text } from 'react-native';
import Home from './screens/home';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Sala from './screens/sala';
import SalatHome from './screens/salatHome';
import { useTranslation } from 'react-i18next';

const Tab = createBottomTabNavigator();
//const Tab = createMaterialBottomTabNavigator();

export default function Navigation(props) {
    const theme = useTheme();
    const { t } = useTranslation()
    return (
        <>
            <Tab.Navigator initialRouteName='salatHome' screenOptions={{
                headerShown: false,
                tabBarActiveBackgroundColor: theme['background-basic-color-4'],
                tabBarInactiveBackgroundColor: theme['background-basic-color-2'],
                tabBarActiveTintColor: theme['text-basic-color'],
                tabBarInactiveTintColor: theme['text-basic-color'],
                tabBarLabelStyle: { fontFamily: 'font1', fontSize: 15 },
            }}>
                <Tab.Screen
                    options={{
                        tabBarIcon: () => <Ionicons color={'#00556f'} name='today' size={20}></Ionicons>,
                        title: t('today'),
                    }}
                    name="SalatHome"
                    component={SalatHome}
                />
                <Tab.Screen
                    options={{
                        tabBarIcon: () => <Ionicons color={'#00556f'} name='calendar' size={20}></Ionicons>,
                        title: t('mowaqit')
                    }}
                    name="Sala"
                    component={Sala}
                />
            </Tab.Navigator>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 200,
        flex: 1
    },
    background: {
        flex: 1,
    },
});
