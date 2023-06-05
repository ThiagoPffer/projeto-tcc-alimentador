import { RefreshControl, StyleSheet, Text, ToastAndroid } from 'react-native';
import { View } from 'react-native';
import defaultStyles from './../defaultStyles';
import { ScrollView } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import { getDatabase, ref, child, get, } from 'firebase/database';
import { LoadingSpin } from '../components/LoadingSpin';

const Historico = ({ route, navigation }) => {

    const { alimentadorId } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [dosagens, setDosagens] = useState([]);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        loadDosagens();
    }, [alimentadorId]);

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await loadDosagens();
        setRefreshing(false);
    });

    async function loadDosagens() {
        setIsLoading(true);
        const dbRef = ref(getDatabase());
        get(child(dbRef, `alimentadores/${alimentadorId}/historico`)).then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const list = [];
                Object.keys(data).map(key => list.push({...data[key], id: key }))
                setDosagens(list);
            }
        }).catch(error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
        ).finally(() => setIsLoading(false));
    }

    function getDateFromDosagem(dosagem) {
        return `${formatZero(dosagem.dia)}/${formatZero(dosagem.mes)}/${dosagem.ano} ${formatZero(dosagem.horas)}:${formatZero(dosagem.minutos)}`
    }

    function formatZero(number) {
        return number < 10 ? '0'+number : number;
    }

    return (
        <View style={styles.container}>
            <Text style={defaultStyles.defaultTitle}>Dosagens realizadas:</Text>
            {
                isLoading ?
                <LoadingSpin color="#000"></LoadingSpin> :
                <ScrollView 
                    style={styles.listContainer} 
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }>
                    {
                        dosagens.length > 0 ?
                        dosagens.map(dosagem => (
                            <View style={styles.historicoItem}>
                                <Text>{
                                    `${getDateFromDosagem(dosagem)}`
                                }</Text>
                                <Text style={{fontWeight: 'bold'}}>{dosagem.acao}</Text>
                                <Text>{`${dosagem.nivel}%`}</Text>
                            </View>
                        )) :
                        <Text style={defaultStyles.errorText}>Nenhuma dosagem realizada</Text>
                    }
                </ScrollView>
            }
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
    },
    panel: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3',
        maxHeight: 350,
        paddingBottom: 15,
        gap: 15
    },
    listContainer: {
        flexDirection: 'column',
        width: '100%',
        gap: 15
    },
    historicoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        gap: 15,
        paddingVertical: 15,
        borderBottomColor: '#f5f5f5',
        borderBottomWidth: 1
    }
});

export default Historico