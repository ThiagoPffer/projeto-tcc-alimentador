
import { View, StyleSheet, ToastAndroid } from 'react-native';
import PressButton from '../components/PressButton';
import defaultStyles from './../defaultStyles';
import AgendamentosPanel from './../components/AgendamentosPanel';
import { deleteDoc, doc, getFirestore } from 'firebase/firestore';
import DosagemPanel from '../components/DosagemPanel';
import InfoPanel from '../components/InfoPanel';

const PainelAlimentador = ({route, navigation}) => {

    const { id: usuarioAlimentadorId, alimentadorId } = route.params;

    function onExcluirAlimentador() {
        const db = getFirestore();
        deleteDoc(doc(db, 'usuarioAlimentadores', usuarioAlimentadorId)).then(() => {
            navigation.navigate('HomePage', { screen: 'PainelAlimentador' });
        })
        .catch(error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER));
    }

    return (
        <View style={styles.container}>
            <InfoPanel alimentadorId={alimentadorId} />
            <DosagemPanel alimentadorId={alimentadorId} />
            <AgendamentosPanel alimentadorId={alimentadorId} />
            <PressButton
                color="red"
                onClick={() => onExcluirAlimentador()} 
                text="Excluir alimentador"
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