import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import Login from './src/screens/Login';
import NewAccount from './src/screens/NewAccount';
import HomePage from './src/screens/HomePage';
import NewAlimentador from './src/screens/NewAlimentador';
import NewAlimentadorInfo from './src/screens/NewAlimentadorInfo';
import PainelAlimentador from './src/screens/PainelAlimentador';
import NovoAgendamento from './src/screens/NovoAgendamento';

export default function App() {

    const Stack = createNativeStackNavigator();

    const [fontsLoaded] = useFonts({
        'OpenSans': require('./assets/fonts/OpenSans.ttf')
    })

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
                <Stack.Screen name="NewAccount" component={NewAccount} options={{ 
                    headerShadowVisible: false, 
                    headerTitleAlign: 'center',
                    title: 'Nova conta',
                    headerTitleStyle: {fontFamily: 'OpenSans'}
                }} />
                <Stack.Screen name="HomePage" component={HomePage} options={{ 
                    headerShadowVisible: false, 
                    headerBackVisible: false,
                    headerTitleAlign: 'center',
                    title: 'Home page',
                    headerTitleStyle: {fontFamily: 'OpenSans'}
                }} />
                <Stack.Screen name="NewAlimentador" component={NewAlimentador} options={{ 
                    headerShadowVisible: false, 
                    headerBackVisible: true,
                    headerTitleAlign: 'center',
                    title: 'Novo alimentador',
                    headerTitleStyle: {fontFamily: 'OpenSans'}
                }} />
                <Stack.Screen name="NewAlimentadorInfo" component={NewAlimentadorInfo} options={{ 
                    headerShadowVisible: false,
                    headerBackVisible: false,
                    headerTitleAlign: 'center',
                    title: 'Novo alimentador',
                    headerTitleStyle: {fontFamily: 'OpenSans'}
                }} />
                <Stack.Screen name="PainelAlimentador" component={PainelAlimentador} options={{ 
                    headerShadowVisible: false,
                    headerBackVisible: true,
                    headerTitleAlign: 'center',
                    title: 'Painel',
                    headerTitleStyle: {fontFamily: 'OpenSans'}
                }} />
                <Stack.Screen name="NovoAgendamento" component={NovoAgendamento} options={{ 
                    headerShadowVisible: false,
                    headerBackVisible: true,
                    headerTitleAlign: 'center',
                    title: 'Novo agendamento',
                    headerTitleStyle: {fontFamily: 'OpenSans'}
                }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
