import { StyleSheet, Text, ToastAndroid } from 'react-native';
import { View } from 'react-native';
import defaultStyles from './../defaultStyles';
import { ScrollView } from 'react-native';
import PressButton from './PressButton';
import { useState, useEffect } from 'react';
import AgendamentoListItem from './AgendamentoListItem';
import { getDatabase, ref, child, get, remove } from 'firebase/database';
import { LoadingSpin } from './LoadingSpin';

const AgendamentosPanel = ({ navigation, alimentadorId, usuarioAlimentadorId, refresh }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [agendamentos, setAgendamentos] = useState([]);

    useEffect(() => loadAgendamentos(), [alimentadorId, refresh]);

    const onDeleteAgendamento = (agendamentoId) => {
        const db = getDatabase();
        const docRef = ref(db, `alimentadores/${alimentadorId}/agendamentos/${agendamentoId}`);
        remove(docRef).then(() => {
            setAgendamentos(agendamentos.filter(ag => ag.id !== agendamentoId))
        });
    }

    function loadAgendamentos() {
        setIsLoading(true);
        const dbRef = ref(getDatabase());
        get(child(dbRef, `alimentadores/${alimentadorId}/agendamentos`)).then(snapshot => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const list = [];
                Object.keys(data).map(key => list.push({...data[key], id: key }))
                setAgendamentos(list);
            }
        }).catch(error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER)
        ).finally(() => setIsLoading(false));
    }

    return (
        <View style={styles.panel}>
            <Text style={defaultStyles.defaultTitle}>Dosagens agendadas:</Text>
            {
                isLoading ?
                <LoadingSpin color="#000"></LoadingSpin> :
                agendamentos.length > 0 ?
                <ScrollView style={styles.listContainer} >
                    {
                        agendamentos.map(agendamento => (
                            <AgendamentoListItem 
                                key={agendamento.id}
                                agendamento={agendamento} 
                                alimentadorId={alimentadorId} 
                                onDelete={onDeleteAgendamento}
                            />
                        ))
                    }
                </ScrollView> :
                <Text style={defaultStyles.errorText}>Nenhum agendamento</Text>
            }
            <PressButton
                onClick={() => navigation.navigate('NovoAgendamento', {usuarioAlimentadorId, alimentadorId})}
                text="Novo agendamento"
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
    }
});

export default AgendamentosPanel