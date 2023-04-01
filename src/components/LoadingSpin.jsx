import React from 'react'
import { Animated, Easing } from 'react-native';
import { Icon } from '@rneui/themed';
import { useRef, useEffect } from 'react';

export const LoadingSpin = (props) => {

    const spinValue = useRef(new Animated.Value(0)).current;
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    useEffect(() => {
        Animated.loop(
            Animated.timing(spinValue, {
                toValue: 1,
                duration: 500,
                easing: Easing.linear,
                useNativeDriver: true,
            }),
        ).start();
    }, [spinValue])

    return (
        <Animated.View style={{ transform: [{ rotate: spin }] }} >
            <Icon
                name="loading"
                color={props.color || '#fff'}
                type="material-community"
            ></Icon>
        </Animated.View>
    );
}