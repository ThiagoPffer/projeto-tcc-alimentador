
import { Icon } from '@rneui/themed';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useState, useEffect } from 'react';

const AlimentadorListItem = props => {

    const [alimentador, setAlimentador] = useState({});
    useEffect(() => {
        setAlimentador(props.alimentador);
    }, [])

    return (
        <Pressable onPress={() => props.navigation.navigate('PainelAlimentador', alimentador)} key={alimentador.id} style={
            ({ pressed }) => [
                { opacity: pressed ? 0.6 : 1 },
                { backgroundColor: pressed ? '#f3f3f3' : '#fff' },
                styles.listItem
            ]
        }>
            <View style={{ flex: 1 }}>
                <Text style={styles.listItemTitle}>{alimentador.apelido}</Text>
            </View>
            <View style={ styles.listItemArrow }>
                <Icon
                    name="chevron-right"
                    type="material-community-light" 
                />
            </View>
        </Pressable>
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
        borderRadius: 4,
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

export default AlimentadorListItem;