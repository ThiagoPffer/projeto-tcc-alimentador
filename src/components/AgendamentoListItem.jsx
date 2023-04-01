
import { Icon } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const AgendamentoListItem = props => {

    const [agendamento, setAgendamento] = useState(props.agendamento);

    useEffect(() => setAgendamento(props.agendamento), [props]);

    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
                <Text style={styles.listItemTitle}>{`${agendamento.horario} (${agendamento.doses} doses)`}</Text>
                <Text>{agendamento.descricao}</Text>
            </View>
            <View>
                <Icon
                    onPress={() => props.onDelete(agendamento.id)}
                    style={{padding: 5, borderRadius: 4}}
                    name="delete-outline"
                    type="material-community-light" 
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        gap: 5 ,
        padding: 10
    },
    listItemTitle: {
        fontSize: 18,
        fontWeight: '500'
    }
});

export default AgendamentoListItem;