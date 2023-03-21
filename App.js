import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/screens/Login';
import NewAccount from './src/screens/NewAccount';
import HomePage from './src/screens/HomePage';

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
