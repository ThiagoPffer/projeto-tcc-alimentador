import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Text, TextInput, ToastAndroid } from "react-native";
import { StyleSheet, View } from "react-native"
import { ScrollView } from "react-native";
import defaultStyles from "../defaultStyles";
import firebaseConfig from "./../config";
import { initializeApp } from 'firebase/app';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import PressButton from './../components/PressButton';

const NewAccount = ({ navigation }) => {

    const app = initializeApp(firebaseConfig);
    const [isLoading, setIsLoading] = useState(false);
    const [newUser, setNewUser] = useState({ alimentadores: {} });
    const [confirmPass, setConfirmPass] = useState('');
    const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true);
    
    async function onConfirmar() {
        setIsLoading(true);
        const auth = getAuth();
        const database = getFirestore(app);

        createUserWithEmailAndPassword(auth, newUser.email, newUser.pass)
            .then(credentials => {
                setIsLoading(false);
                delete newUser.pass;
                newUser.uid = credentials.user.uid;
                addDoc(collection(database, 'usuarios'), newUser);
                ToastAndroid.showWithGravity('Conta criada com sucesso!', ToastAndroid.SHORT, ToastAndroid.CENTER);
                navigation.navigate('HomePage');
            })
            .catch(error => {
                setIsLoading(false);
                ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
            });
    }

    function onChangeNewUser(user) {
        let { name, email, pass } = user;
        setNewUser({ name, email, pass });
    }

    function validateForm(confirmPass) {
        let condition = (!(newUser.name && newUser.email && newUser.pass) || confirmPass !== newUser.pass);
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
                <PressButton 
                    onClick={() => onConfirmar()} 
                    text="Confirmar"
                    loading={isLoading} 
                    disabled={isConfirmButtonDisabled} 
                />
                <PressButton
                    onClick={() => navigation.navigate('Login')} 
                    text="Cancelar"
                    color="#000"
                    styles={ defaultStyles.buttonOutline }
                />
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