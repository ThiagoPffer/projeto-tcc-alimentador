import React, { useEffect } from 'react';
import { Pressable } from 'react-native';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import defaultStyles from '../defaultStyles';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseConfig from './../config';
import { ToastAndroid } from 'react-native';
import { initializeApp } from 'firebase/app';

const Login = ({navigation}) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const [userData, setUserData] = React.useState({ email: '', pass: '' })
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = React.useState(true);
    
    useEffect(() => {
        const currentUser = auth.currentUser;
        console.log(currentUser);
        if (currentUser) {
            navigation.navigate('HomePage');
        }    
    })

    function onChangeUserData(inputData) {
        let { email, pass } = inputData;
        setUserData({ email, pass });
        setIsConfirmButtonDisabled(!(userData.email && userData.pass));
    }

    function onConfirmar() {
        signInWithEmailAndPassword(auth, userData.email, userData.pass)
            .then(credentials => {
                console.log('Logando...', credentials)
                navigation.navigate('HomePage');
            })
            .catch( error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER));
    }

    function onNovaConta() {
        navigation.navigate('NewAccount');
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
            <Pressable onPress={ () => onConfirmar() }
                style={({pressed}) => [
                    { backgroundColor: pressed ? '#6BA6FF' : '#4790FD' },
                    { opacity: isConfirmButtonDisabled ? 0.6 : 1 },       
                    defaultStyles.button 
                ]}
                disabled={isConfirmButtonDisabled} >
                <Text style={ defaultStyles.buttonText }>Confirmar</Text>
            </Pressable>
            <Pressable onPress={ () => onNovaConta() }
                style={({pressed}) => [
                    { opacity: pressed ? 0.6 : 1 },
                    defaultStyles.buttonOutline 
                ]}>
                <Text style={ defaultStyles.buttonOutlineText }>Nova conta</Text>
            </Pressable>
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