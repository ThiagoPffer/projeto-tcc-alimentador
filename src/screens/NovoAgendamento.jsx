import { Text, View, TextInput } from "react-native";
import defaultStyles from './../defaultStyles';
import { useState } from "react";
import { StyleSheet } from "react-native";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import PressButton from "../components/PressButton";
import { Pressable } from "react-native";
import { getDatabase, ref, set } from "firebase/database";
import GenerateUUID from 'react-native-uuid';
import { ToastAndroid } from "react-native";

const NovoAgendamento = ({ route, navigation }) => {

    const { alimentadorId, usuarioAlimentadorId, agendamentos } = route.params;
    const [isLoading, setIsLoading] = useState(false);
    const [titulo, setTitulo] = useState('');
    const [horario, setHorario] = useState(new Date());

    const openDatePicker = () => {
        DateTimePickerAndroid.open({
            value: horario,
            mode: "time",
            is24Hour: true,
            display: 'spinner',
            onChange: (event, date) => { if (date) { setHorario(date) } }
        });
    }

    const formatAgendamentosToObj = (agendamentos) => {
        let agendamentosObj = {};
        agendamentos.forEach(agendamento => {
            const agId = agendamento.id;
            delete agendamento.id;
            agendamentosObj[agId] = agendamento;
        });
        return agendamentosObj;
    }

    const onSalvar = () => {
        setIsLoading(true);
        
        let agendamentosSave = formatAgendamentosToObj(agendamentos);
        agendamentosSave[GenerateUUID.v4()] = {titulo, hora: horario.getHours(), minuto: horario.getMinutes()};
        
        const db = getDatabase();
        set(ref(db, `alimentadores/${alimentadorId}/agendamentos/`), agendamentosSave).then(() => {
            navigation.navigate('PainelAlimentador', {
                alimentadorId, 
                id: usuarioAlimentadorId
            });
        }).catch(error => {
            ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
        }).finally(() => setIsLoading(false));
    }

    return (
        <View style={styles.container}>
            <View style={styles.panel}>
                <View style={defaultStyles.inputGroup}>
                    <Text style={defaultStyles.label}>Título</Text>
                    <TextInput style={defaultStyles.input}
                        placeholder="Insira um título"
                        keyboardType='default'
                        value={titulo}
                        onChangeText={text => setTitulo(text)}>
                    </TextInput>
                </View>
            </View>
            <View style={styles.panel}>
                <Text style={{ fontSize: 18, fontWeight: '500' }}>Selecione um horário:</Text>
                <Pressable
                    onPress={() => openDatePicker()}
                    style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }, styles.timeDisplay]}>
                    <Text style={{ fontSize: 65 }}>
                        {horario.getHours() < 10 ? '0' + horario.getHours() : horario.getHours()}
                    </Text>
                    <Text style={{ fontSize: 65 }}>:</Text>
                    <Text style={{ fontSize: 65 }}>
                        {horario.getMinutes() < 10 ? '0' + horario.getMinutes() : horario.getMinutes()}
                    </Text>
                </Pressable>
            </View>
            <PressButton 
                onClick={() => onSalvar()} 
                text="Salvar"
                loading={isLoading}
                disabled={!titulo}
            />
            <PressButton
                onClick={() => navigation.navigate('PainelAlimentador', {
                    alimentadorId, 
                    id: usuarioAlimentadorId
                })}
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
        justifyContent: 'flex-start',
        gap: 15,
        paddingTop: 30,
        paddingHorizontal: 30
    },
    panel: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3',
        paddingBottom: 15,
        gap: 15
    },
    listContainer: {
        flexDirection: 'column',
        width: '100%',
        gap: 15
    },
    timeDisplay: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default NovoAgendamento;