import { TextInput, View, Text, StyleSheet } from "react-native";
import PressButton from "./PressButton";
import defaultStyles from "../defaultStyles";
import { Pressable } from "react-native";
import { Icon } from '@rneui/themed';
import { useState } from "react";
import { getDatabase, ref, update } from 'firebase/database';
import EnumStatus from './../utils/enumStatus';
import Dosagem from "./Dosagem";

const DosagemPanel = props => {

    const { alimentadorId, status } = props;
    const [doses, setDoses] = useState("1");
    const [isLoading, setIsLoading] = useState(false);

    function onIniciarDosagem() {
        setIsLoading(true);
        const db = getDatabase();
        const dbRef = ref(db, `alimentadores/${alimentadorId}`);
        update(dbRef, { dosagem: parseInt(doses), status: 'Dosagem pendente' }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <View style={styles.panel}>
            <Text style={defaultStyles.defaultTitle}>Selecione a quantidade de doses:</Text>
            <Dosagem doses={doses} setDoses={setDoses} />
            <PressButton
                onClick={() => onIniciarDosagem()}
                text="Iniciar dosagem"
                loading={isLoading}
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