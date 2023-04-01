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
        flexDirection: 'row',
        gap: 15,
        width: '100%',
        height: 45,
        textTransform: 'capitalize',
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4790FD'
    },
    buttonText: {
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
    errorContainer: {
        flex: 1,
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    errorText: {
        textAlign: 'center',
        color: 'gray',
        fontSize: 16,
        marginVertical: 15
    },
    badge: {
        paddingHorizontal: 15,
        paddingVertical: 2,
        borderRadius: 4
    },
    defaultText: {
        fontSize: 16
    },
    defaultTitle: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5
    }
});

export default defaultStyles;