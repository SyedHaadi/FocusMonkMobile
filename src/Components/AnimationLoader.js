import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    Platform,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    useColorScheme,
    View,
} from 'react-native';
import { useSelector } from 'react-redux';
import { height_screen, width_screen } from '../Utils/Dimentions';


const AnimationLoader = () => {

    const animationLoading = useSelector((state) => state?.appLoading?.AnimationLoading);

    return (
        <View style={{ position: 'absolute', marginTop: height_screen * 0.55, marginLeft: width_screen * 0.45 }}>
            {
                animationLoading ?
                    <ActivityIndicator size={height_screen * 0.05} color='black' />
                    :
                    null
            }
        </View>
    );
}

const STATUSBAR_HEIGHT = StatusBar.currentHeight;

const styles = StyleSheet.create({
    statusBar: {
        height: STATUSBAR_HEIGHT,
    },
});

export default AnimationLoader;
