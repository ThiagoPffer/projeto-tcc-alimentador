
import { Icon } from '@rneui/themed';
import defaultStyles from './../defaultStyles';
import { Pressable, Text } from 'react-native';
import { LoadingSpin } from './LoadingSpin';

const PressButton = props => {
    return (
        <Pressable onPress={() => props.onClick()}
            style={({ pressed }) => [
                { opacity: pressed || props.disabled || props.loading ? 0.6 : 1 },  
                props.styles || defaultStyles.button
            ]} 
            disabled={ props.disabled || props.loading } >
            { props.icon ? <Icon name={props.icon.name} color={props.icon.color || '#fff'} type="material-community" /> : '' }
            <Text style={[{color: props.color || '#fff'}, defaultStyles.buttonText]}>{
                props.loading ? <LoadingSpin color={props.color || '#fff'} /> : props.text
            }</Text>
        </Pressable>
    )
}

export default PressButton;