import { Button, Pressable, StyleSheet, Text, View } from "react-native"
import { getAuth } from 'firebase/auth';
import firebaseConfig from './../config';
import { initializeApp } from 'firebase/app';
import defaultStyles from './../defaultStyles';

const HomePage = ({ navigation }) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    function onNovoAlimentador() {
        console.log(currentUser);
    }


    return (
        <View style={styles.container}>
            <Pressable onPress={() => onNovoAlimentador()}
                style={({ pressed }) => [
                    { backgroundColor: pressed ? '#6BA6FF' : '#4790FD' },
                    defaultStyles.button
                ]} >
                <Text style={defaultStyles.buttonText}>Novo alimentador</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 15,
        paddingHorizontal: 30
    }
});

export default HomePage;