'use strict';
import { StyleSheet } from 'react-native';

const defaultStyles = StyleSheet.create({
    input: {
        width: '100%',
        height: 45,
        borderStyle: 'solid',
        borderColor: '#BCBCBC',
        borderRadius: 4,
        borderWidth: 1,
        paddingHorizontal: 15,
        fontFamily: 'OpenSans',
        fontSize: 16
    },
    label: {
        textAlign: 'left',
        marginRight: 'auto',
        fontSize: 18
    },
    inputGroup: {
        width: '100%',
        gap: 5
    },
    button: {
        width: '100%',
        height: 45,
        textTransform: 'capitalize',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonText: {
        color: '#fff',
        fontSize: 16
    },
    buttonOutline: {
        width: '100%',
        height: 45,
        backgroundColor: '#fff',
        textTransform: 'capitalize',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#4790FD',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonOutlineText: {
        color: '#000',
        fontSize: 16
    }
});

export default defaultStyles;