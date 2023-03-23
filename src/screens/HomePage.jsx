import { Pressable, StyleSheet, Text, View } from "react-native"
import { getAuth } from 'firebase/auth';
import firebaseConfig from './../config';
import { initializeApp } from 'firebase/app';
import defaultStyles from './../defaultStyles';
import { child, get, getDatabase, ref } from 'firebase/database';
import { useState } from 'react';
import { ScrollView } from "react-native";
import moment from "moment/moment";

const HomePage = ({ navigation }) => {

    const app = initializeApp(firebaseConfig);
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const [alimentadores, setAlimentadores] = useState([
        {
            id: 1,
            apelido: 'Pote sala',
            nivel: 50.0,
            agendamentos: [
                {
                    descricao: 'Jantar',
                    horario: '21:30',
                    doses: 3
                },
                {
                    descricao: 'Café da manhã',
                    horario: '10:00',
                    doses: 3
                },
                {
                    descricao: 'Almoço',
                    horario: '12:00',
                    doses: 3
                }
            ],
            status: 'CONECTADO'
        },
    ]);

    function loadAlimentadores() {
        const dbRef = ref(getDatabase(app));
        get(child(dbRef, `usuarios/${currentUser.uid}/alimentadores`))
        .then( snapshot => {
            if (snapshot.exists()) {
                // console.log(snapshot)
            }
        })
        .catch( error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER));
    }

    function getNextHorarioFromAgendamentos(agendamentos) {
        const today = moment().toLocaleString();
        const next = agendamentos.find( agendamento => {
            return moment(today).isBefore(moment(`${moment().toDate().toLocaleDateString()} ${agendamento.horario}`, 'DD/MM/YYYY HH:mm'));
        });
        return next || agendamentos.sort((a, b) => {
            if (moment(`${moment().toDate().toLocaleDateString()} ${a.horario}`, 'DD/MM/YYYY HH:mm')
            .isBefore(moment(`${moment().toDate().toLocaleDateString()} ${b.horario}`, 'DD/MM/YYYY HH:mm'))) {
                return -1;
            }
            if (moment(`${moment().toDate().toLocaleDateString()} ${a.horario}`, 'DD/MM/YYYY HH:mm')
            .isAfter(moment(`${moment().toDate().toLocaleDateString()} ${b.horario}`, 'DD/MM/YYYY HH:mm'))) {
                return 1;
            }
            return 0;
        })[0];
    }

    function getProximaDosagemFromAlimentador(alimentador) {
        const nextHour = getNextHorarioFromAgendamentos(alimentador.agendamentos);
        return nextHour.horario;
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
            <ScrollView style={styles.listContainer}>
                {
                    alimentadores.map(alimentador => (
                        <View key={alimentador.id} style={styles.listItem}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.listItemTitle}>{alimentador.apelido}</Text>
                                <Text>Nível de ração: {alimentador.nivel}%</Text>
                                <Text>Próx. dosagem: { getProximaDosagemFromAlimentador(alimentador) }</Text>
                            </View>
                            <View style={ styles.listItemArrow }>
                                <Text>a</Text>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
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
    listContainer: {
        width: '100%'
    },
    listItem: {
        flexDirection: 'row',
        width: '100%',
        borderBottomColor: '#f3f3f3',
        borderBottomWidth: 1,
        gap: 5 ,
        padding: 10
    },
    listItemTitle: {
        fontSize: 18,
        fontWeight: '500'
    },
    listItemArrow: {
        width: 40,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default HomePage;