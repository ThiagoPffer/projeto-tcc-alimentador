
import { View, StyleSheet, ToastAndroid, SafeAreaView } from 'react-native';
import PressButton from '../components/PressButton';
import defaultStyles from './../defaultStyles';
import AgendamentosPanel from './../components/AgendamentosPanel';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import DosagemPanel from '../components/DosagemPanel';
import InfoPanel from '../components/InfoPanel';
import { useCallback, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { RefreshControl } from 'react-native';

const PainelAlimentador = ({route, navigation}) => {

    const { id: usuarioAlimentadorId, alimentadorId } = route.params;
    const [refreshing, setRefreshing] = useState(false);
    const [refresh, setRefresh] = useState(0);

    const onRefresh = useCallback(() => {
        setRefresh(refresh+1);
    });

    function onExcluirAlimentador() {
        const db = getFirestore();
        deleteDoc(doc(db, 'usuarioAlimentadores', usuarioAlimentadorId)).then(() => {
            navigation.navigate('HomePage', { screen: 'PainelAlimentador' });
        })
        .catch(error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER));
    }

    return (
        <ScrollView style={styles.container} 
            contentContainerStyle={{alignItems: 'center', justifyContent: 'flex-start', gap: 15}}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }>
            <InfoPanel alimentadorId={alimentadorId} />
            <DosagemPanel alimentadorId={alimentadorId} />
            <AgendamentosPanel 
                navigation={navigation} 
                alimentadorId={alimentadorId} 
                usuarioAlimentadorId={usuarioAlimentadorId}
                refresh={refresh}
            />
            <PressButton
                color="red"
                onClick={() => onExcluirAlimentador()} 
                text="Excluir alimentador"
                styles={ defaultStyles.buttonOutline }
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 30
    },
    panel: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3',
        paddingBottom: 15,
        gap: 15
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    listContainer: {
        width: '100%'
    }
});

export default PainelAlimentador;