import { View, Text, StyleSheet } from "react-native";
import PressButton from "./PressButton";
import defaultStyles from "../defaultStyles";
import { useState } from "react";
import { getDatabase, ref, update } from 'firebase/database';

const DosagemPanel = ({ alimentadorId, navigation }) => {

    const [isLoading, setIsLoading] = useState(false);

    function onIniciarDosagem() {
        setIsLoading(true);
        const db = getDatabase();
        const dbRef = ref(db, `alimentadores/${alimentadorId}/dosagem`);
        update(dbRef, { status: 'Dosagem pendente' }).finally(() => {
            setIsLoading(false);
        });
    }
    
    return (
        <View style={styles.panel}>
            <Text style={defaultStyles.defaultTitle}>Dosagem:</Text>
            <PressButton
                onClick={() => onIniciarDosagem()}
                text="Iniciar dosagem"
                loading={isLoading}
            />
            <PressButton
                onClick={() => navigation.navigate('Historico', { alimentadorId })}
                text="Histórico"
                color="#000"
                styles={ defaultStyles.buttonOutline }
            />
        </View>
    )
}

const styles = StyleSheet.create({
    panel: {
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3',
        paddingBottom: 15,
        gap: 15
    }
});

export default DosagemPanel;