import { View, Text, ToastAndroid } from 'react-native';
import { useState, useEffect } from 'react';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { StyleSheet } from 'react-native';
import { getDatabase, ref, child, get } from 'firebase/database';
import { LoadingSpin } from '../components/LoadingSpin';

const NewAlimentador = ({ navigation }) => {

    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        const getBarCodeScannerPermissions = async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === 'granted');
        };
        getBarCodeScannerPermissions();
    }, []);

    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        getAlimentador(data);
    };

    const getAlimentador = (id) => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `alimentadores/${id}`))
            .then(snapshot => {
                if (snapshot.exists()) {
                    navigation.navigate('NewAlimentadorInfo', { alimentadorId: id });
                }
            })
            .catch(error => ToastAndroid.showWithGravity(error.message, ToastAndroid.SHORT, ToastAndroid.CENTER));
    }

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
                style={StyleSheet.absoluteFillObject}
            />
            <View>
                { 
                    scanned ? 
                    <View style={styles.loading}><LoadingSpin color="#000"></LoadingSpin></View> : 
                    <View style={styles.qrCodeBox}></View> 
                }
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    qrCodeBox: {
        width: 250,
        height: 250,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff',
    },
    loading: {
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 4
    }
});

export default NewAlimentador;