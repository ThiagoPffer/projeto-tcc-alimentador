import { View, Text, ToastAndroid } from 'react-native';
import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import defaultStyles from './../defaultStyles';
import { TextInput } from 'react-native';
import PressButton from './../components/PressButton';
import { BackHandler } from 'react-native';
import { getFirestore, addDoc, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const NewAlimentadorInfo = ({ route, navigation }) => {

    const { alimentadorId } = route.params;
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const [userAlimentador, setUserAlimentador] = useState({ 
        usuarioId: currentUser.uid,
        alimentadorId
    })
    const [apelido, setApelido] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove();
    }, []);

    function onContinuar() {
        setIsLoading(true);
        const db = getFirestore();
        addDoc(collection(db, 'usuarioAlimentadores'), { ...userAlimentador, apelido })
            .then(() => navigation.navigate('HomePage', { screen: 'NewAlimentadorInfo' }))
            .catch(error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER))
            .finally(() => setIsLoading(false));
    }
    
    return (
        <View style={styles.container}>
            <View style={defaultStyles.inputGroup}>
                <Text style={defaultStyles.label}>Apelido</Text>
                <TextInput style={defaultStyles.input}
                    placeholder="Insira um apelido para o alimentador"
                    value={userAlimentador.apelido}
                    onChangeText={text => setApelido(text)}>
                </TextInput>
            </View>
            <PressButton
                onClick={() => onContinuar()}
                text="Continuar"
                loading={isLoading}
            />
            <PressButton 
                onClick={() => navigation.navigate('HomePage')} 
                text="Cancelar"
                color="#000"
                styles={ defaultStyles.buttonOutline }
            />
        </View>
    );
}

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

export default NewAlimentadorInfo;