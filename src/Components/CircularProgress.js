import React from 'react';
import { View, StyleSheet } from 'react-native';
import Color from '../Utils/Color';
/**
* Override styles that get passed from props
**/
const propStyle = (percent, base_degrees) => {
    const rotateBy = base_degrees + (percent * 3.6);
    return {
        transform: [{ rotateZ: `${rotateBy}deg` }]
    };
}

const renderThirdLayer = (percent) => {
    if (percent > 50) {
        /**
        * Third layer circle default is 45 degrees, so by default it occupies the right half semicircle.
        * Since first 50 percent is already taken care  by second layer circle, hence we subtract it
        * before passing to the propStyle function
        **/
        return <View style={[styles.secondProgressLayer, propStyle((percent - 50), 45)]}></View>
    } else {
        return <View style={styles.offsetLayer}></View>
    }
}

const CircularProgress = ({ percent }) => {

    let firstProgressLayerStyle;
    if (percent > 50) {
        firstProgressLayerStyle = propStyle(50, -135);
    } else {
        firstProgressLayerStyle = propStyle(percent, -135);
    }

    return (
        <View style={styles.container}>
            <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
            {renderThirdLayer(percent)}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 120,
        height: 120,
        borderTopWidth: 12,
        borderRightWidth: 12,
        borderBottomWidth: 12,
        borderLeftWidth: 12,
        borderRadius: 60,
        borderColor: Color.PrimaryColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstProgressLayer: {
        width: 120,
        height: 120,
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        borderRadius: 60,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'red',
        borderTopColor: 'red',
        transform: [{ rotateZ: '-135deg' }]
    },
    secondProgressLayer: {
        width: 120,
        height: 120,
        position: 'absolute',
        borderTopWidth: 10,
        borderRightWidth: 10,
        borderBottomWidth: 10,
        borderLeftWidth: 10,
        borderRadius: 60,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'black',
        borderTopColor: 'black',
        transform: [{ rotateZ: '45deg' }]
    },
    offsetLayer: {
        width: 120,
        height: 120,
        position: 'absolute',
        borderWidth: 20,
        borderRadius: 60,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: 'grey',
        borderTopColor: 'grey',
        transform: [{ rotateZ: '-135deg' }]
    }
});

export default CircularProgress;