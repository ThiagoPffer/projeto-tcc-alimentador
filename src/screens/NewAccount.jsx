import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, TextInput, ToastAndroid } from "react-native";
import { Pressable, StyleSheet, View } from "react-native"
import { ScrollView } from "react-native";
import defaultStyles from "../defaultStyles";
import firebaseConfig from "./../config";
import { initializeApp } from 'firebase/app';

const NewAccount = ({ navigation }) => {

    const app = initializeApp(firebaseConfig);
    const [newUser, setNewUser] = useState({});
    const [confirmPass, setConfirmPass] = useState('');
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true);
    
    function onConfirmar() {
        console.log({newUser})
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, newUser.email, newUser.pass)
            .then(credentials => {
                ToastAndroid.showWithGravity('Conta criada com sucesso!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                navigation.navigate('HomePage');
            })
            .catch(error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER));
    }

    function onCancelar() { navigation.navigate('Login'); }

    function onChangeNewUser(user) {
        let { name, email, pass } = user;
        setNewUser({ name, email, pass });
    }

    function validateForm(confirmPass) {
        let condition = (!(newUser.name && newUser.email && newUser.pass) || confirmPass !== newUser.pass);
        console.log({confirmPass});
        setConfirmPass(confirmPass);
        setIsConfirmButtonDisabled(condition);
    }

    return (
        <ScrollView style={ styles.mainContainer }>
            <View style={ styles.container }>
                <View style={ defaultStyles.inputGroup }>
                    <Text style={ defaultStyles.label }>Nome</Text>
                    <TextInput style={ defaultStyles.input } 
                        placeholder="Insira seu nome"
                        textContentType='name'
                        keyboardType='default'
                        value={newUser.name}
                        onChangeText={name => onChangeNewUser({ ...newUser, name })}>
                    </TextInput>
                </View>
                <View style={ defaultStyles.inputGroup }>
                    <Text style={ defaultStyles.label }>Email</Text>
                    <TextInput style={ defaultStyles.input } 
                        placeholder="Insira seu email"
                        textContentType='emailAddress'
                        keyboardType='email-address'
                        value={newUser.email}
                        onChangeText={email => onChangeNewUser({ ...newUser, email })}>
                    </TextInput>
                </View>
                <View style={ defaultStyles.inputGroup }>
                    <Text style={ defaultStyles.label }>Senha</Text>
                    <TextInput style={ defaultStyles.input } 
                        placeholder="Insira uma senha"
                        textContentType='password'
                        keyboardType='default'
                        value={newUser.pass}
                        onChangeText={pass => onChangeNewUser({ ...newUser, pass })}>
                    </TextInput>
                </View>
                <View style={ defaultStyles.inputGroup }>
                    <Text style={ defaultStyles.label }>Confirmar senha</Text>
                    <TextInput style={ defaultStyles.input } 
                        placeholder="Repita a mesma senha"
                        textContentType='newPassword'
                        keyboardType='default'
                        value={confirmPass}
                        onChangeText={pass => validateForm(pass)}>
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
                <Pressable onPress={() => onCancelar()}
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.6 : 1 },
                        defaultStyles.buttonOutline
                    ]}>
                    <Text style={defaultStyles.buttonOutlineText}>Cancelar</Text>
                </Pressable>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
    },
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

export default NewAccount;