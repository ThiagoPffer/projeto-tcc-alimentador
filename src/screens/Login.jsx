import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import defaultStyles from '../defaultStyles';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from './../config';
import { ToastAndroid } from 'react-native';
import { initializeApp } from 'firebase/app';
import PressButton from './../components/PressButton';

const Login = ({navigation}) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [isLoading, setIsLoading] = React.useState(false);
    const [userData, setUserData] = React.useState({ email: '', pass: '' })
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = React.useState(true);
    
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            navigation.navigate('HomePage', { screen: 'Login' });
        }    
    })

    function onChangeUserData(inputData) {
        let { email, pass } = inputData;
        setUserData({ email, pass });
        setIsConfirmButtonDisabled(!(userData.email && userData.pass));
    }

    function onConfirmar() {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, userData.email, userData.pass)
            .then(() => {
                setIsLoading(false);
                navigation.navigate('HomePage');
            })
            .catch( error => {
                setIsLoading(false);
                ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
            });
    }

    return (
        <View style={ styles.container }>
            <View style={ defaultStyles.inputGroup }>
                <Text style={ defaultStyles.label }>Email</Text>
                <TextInput style={ defaultStyles.input } 
                    placeholder="Insira seu email"
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    value={userData.email}
                    onChangeText={email => onChangeUserData({ ...userData, email })}>
                </TextInput>
            </View>
            <View style={ defaultStyles.inputGroup }>
                <Text style={ defaultStyles.label }>Senha</Text>
                <TextInput style={ defaultStyles.input } 
                    placeholder="Insira sua senha"
                    textContentType="password"
                    value={userData.pass}
                    onChangeText={pass => onChangeUserData({ ...userData, pass })}> 
                </TextInput>
            </View>
            <PressButton 
                onClick={() => onConfirmar()} 
                text="Confirmar"
                loading={isLoading} 
                disabled={isConfirmButtonDisabled} 
            />
            <PressButton 
                onClick={() => navigation.navigate('NewAccount')} 
                text="Nova conta"
                color="#000"
                styles={ defaultStyles.buttonOutline }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 15,
        padding: 30
    }
});


export default Login;