import { TextInput, View, Text, StyleSheet } from "react-native";
import PressButton from "./PressButton";
import defaultStyles from "../defaultStyles";
import { Pressable } from "react-native";
import { Icon } from '@rneui/themed';
import { useState } from "react";
import { getDatabase, ref, update } from 'firebase/database';
import EnumStatus from './../utils/enumStatus';

const DosagemPanel = props => {

    const { alimentadorId, status } = props;
    const [doses, setDoses] = useState("1");
    const [isLoading, setIsLoading] = useState(false);

    function increaseOrDecrease(value) {
        if(value >= 1 && value <= 10) {
            setDoses(value.toString());
        }
    }

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
            <View style={{flexDirection: 'row', gap: 15}}>
                <Pressable onPress={() => increaseOrDecrease(parseInt(doses) - 1)}
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.6 : 1 },  
                        styles.inputButton
                    ]}>
                    <Icon name="minus" color="#fff" type="material-community" />
                </Pressable>
                <TextInput 
                    style={[defaultStyles.input, { flex: 1, textAlign: 'center', color: '#000' }]}
                    editable={false} 
                    value={doses} />
                <Pressable onPress={() => increaseOrDecrease(parseInt(doses) + 1)}
                    style={({ pressed }) => [
                        { opacity: pressed ? 0.6 : 1 },  
                        styles.inputButton
                    ]}>
                    <Icon name="plus" color="#fff" type="material-community" />
                </Pressable>
            </View>
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
    },
    inputButton: {
        flex: 1,
        flexDirection: 'row',
        height: 45,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4790FD'
    }
});

export default DosagemPanel;