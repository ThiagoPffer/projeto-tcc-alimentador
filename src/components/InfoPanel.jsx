import { View, Text, StyleSheet } from 'react-native';
import defaultStyles from '../defaultStyles';
import { useEffect, useState } from 'react';
import getBadgeColor from './../utils/badgeColor';
import { getDatabase, onValue, ref, update } from 'firebase/database';
import { ToastAndroid } from 'react-native';
import { LoadingSpin } from './LoadingSpin';
import EnumStatus from './../utils/enumStatus';
import { Icon } from '@rneui/themed';

const InfoPanel = ({ alimentadorId }) => {

    const db = getDatabase();
    const dbRef = ref(db, `alimentadores/${alimentadorId}`);
    const [isLoading, setIsLoading] = useState(false);
    const [alimentador, setAlimentador] = useState({});
    const [badgeColor, setBadgeColor] = useState('');

    useEffect(() => loadAlimentador(), [ alimentadorId ])

    function loadAlimentador() {
        setIsLoading(true);
        onValue(dbRef, snapshot => {
            const data = snapshot.val();
            setAlimentador(data);
            setBadgeColor(getBadgeColor(data.status));
            setIsLoading(false);
        });
    }

    function updateStatus() {
        setIsLoading(true);
        update(dbRef, { status: EnumStatus.CONECTADO })
            .catch(error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER))
            .finally(() => setIsLoading(false));
    }

    return (
        <View style={[styles.panel]}>
            {
                !isLoading ? (
                    <View style={{gap: 5, flex: 1}}>
                        <View style={styles.row}>
                            <Text style={defaultStyles.defaultText}>Status: </Text>
                            <View style={[defaultStyles.badge, {backgroundColor: badgeColor}]}>
                                <Text style={defaultStyles.defaultText}>{alimentador.status}</Text>
                            </View>
                        </View>
                        <View style={styles.row}>
                            <Text style={defaultStyles.defaultText}>Nível de ração: </Text>
                            <Text style={defaultStyles.defaultText}>{alimentador.nivel+'%'}</Text>
                        </View>
                    </View>
                ) : (<LoadingSpin color='#000' />)
            }
            {
                alimentador.status === EnumStatus.INATIVO ? (
                    <Icon
                        onPress={() => updateStatus()}
                        style={{padding: 5, borderRadius: 4}}
                        name="reload"
                        type="material-community" 
                    />
                ) : ''
            }
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
    panel: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#f3f3f3',
        paddingBottom: 15,
        gap: 15
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
});

export default InfoPanel;