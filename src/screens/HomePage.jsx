import { StyleSheet, View } from "react-native"
import { getAuth } from 'firebase/auth';
import firebaseConfig from './../config';
import { initializeApp } from 'firebase/app';
import { query } from 'firebase/database';
import { useState, useEffect, React, useCallback } from 'react';
import { ScrollView } from "react-native";
import PressButton from './../components/PressButton';
import AlimentadorListItem from "../components/AlimentadorListItem";
import { getFirestore, collection, where, getDocs } from 'firebase/firestore';
import { Text } from "react-native";
import { BackHandler } from "react-native";
import defaultStyles from './../defaultStyles';
import { RefreshControl } from "react-native";
import { LoadingSpin } from "../components/LoadingSpin";

const HomePage = ({ route, navigation }) => {

    const { screen } = route.params;
    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const [alimentadores, setAlimentadores] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadAlimentadores();
        const backHandler = BackHandler.addEventListener('hardwareBackPress', () => true)
        return () => backHandler.remove();
    }, [screen]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadAlimentadores();
        setRefreshing(false);
    });

    async function loadAlimentadores() {
        setIsLoading(true);
        const db = getFirestore(app);
        const q = query(collection(db, 'usuarioAlimentadores'), where('usuarioId', '==', currentUser.uid));
        const snapshot = await getDocs(q);
        let list = snapshot.docs.map(doc => { return { ...doc.data(), id: doc.id }});
        setAlimentadores(list || []);
        setIsLoading(false);
    }

    return (
        <View style={styles.container}>
            {
                alimentadores.length > 0 ?
                <ScrollView
                    style={styles.listContainer}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    } >
                    {  
                        alimentadores.map(alimentador => (
                            <AlimentadorListItem key={alimentador.id} alimentador={alimentador} navigation={navigation} />
                        ))
                    }
                </ScrollView> :
                <View style={defaultStyles.errorContainer}>
                    {
                        isLoading ?
                        <LoadingSpin color="#000" /> :
                        <Text style={defaultStyles.errorText}>Nenhum alimentador cadastrado</Text>
                    }
                </View>
            }
            <PressButton 
                onClick={() => navigation.navigate('NewAlimentador')} 
                text="Novo alimentador"
                icon={{ name: 'plus' }}
            />
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
        paddingHorizontal: 30,
        paddingBottom: 30
    },
    listContainer: {
        width: '100%'
    }
});

export default HomePage;