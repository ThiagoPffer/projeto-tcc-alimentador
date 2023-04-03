import { Pressable, View, TextInput, StyleSheet } from "react-native";
import { Icon } from '@rneui/themed';
import defaultStyles from "../defaultStyles";

const Dosagem = props => {

    const {doses, setDoses} = props;

    function increaseOrDecrease(value) {
        if(value >= 1 && value <= 10) {
            setDoses(value.toString());
        }
    }

    return (
        <View style={{ flexDirection: 'row', gap: 15 }}>
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
    );
}

const styles = StyleSheet.create({
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

export default Dosagem;