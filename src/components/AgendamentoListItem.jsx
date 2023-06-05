
import { Icon } from '@rneui/themed';
import { View, Text, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';

const AgendamentoListItem = props => {

    const [agendamento, setAgendamento] = useState(props.agendamento);
    const [horario, setHorario] = useState('new Date()');

    useEffect(() => {
        setAgendamento(props.agendamento)
        setHorario(getHorarioFromAgendamento(agendamento.hora, agendamento.minuto))
    }, [props]);

    function getHorarioFromAgendamento(hora, minuto) {
        return `${hora < 10 ? '0' + hora : hora}:${minuto < 10 ? '0' + minuto : minuto}`
    }

    return (
        <View style={styles.listItem}>
            <View style={{ flex: 1 }}>
                <Text style={styles.listItemTitle}>{horario}</Text>
                <Text>{agendamento.titulo}</Text>
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