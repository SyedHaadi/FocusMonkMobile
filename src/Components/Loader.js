import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height_screen, width_screen } from '../Utils/Dimentions'
import Color from '../Utils/Color';
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';

const Loader = (props) => {
    return (
        <View style={styles.loaderView}>
            <View style={styles.loaderInnerView}>
                <BarIndicator color={Color.PrimaryColor} count={4} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    loaderView: {
        padding: 10,
        backgroundColor: 'rgba(148, 224, 218, 0.1)',
        position: 'absolute',
        zIndex: 1,
        alignSelf: 'center',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'

    },
    loaderInnerView: {
        backgroundColor: 'rgba(148, 224, 218, 0.1)',
        height: 50,
        width: 50,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,

        elevation: 0.05,
    }
})

export default Loader;