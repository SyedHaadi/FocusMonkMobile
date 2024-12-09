import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height_screen, width_screen } from '../Utils/Dimentions'
import Color from '../Utils/Color';
import FontSize from '../Utils/FontSize';
import Icon from 'react-native-vector-icons/FontAwesome';
import Font from '../Utils/Font';
import { useSelector } from 'react-redux';

const Button = ({ size, text, onSubmit }) => {

    const loading = useSelector((state) => state?.appLoading?.loading);

    return (
        <TouchableOpacity disabled={loading} onPress={onSubmit} style={styles.BtnView}>
            <Text style={[styles.BtnText, { fontSize: size ? height_screen * size : height_screen * 0.022 }]} >{text}</Text>
            {
                loading ?
                    !size ?
                        <ActivityIndicator size={17} color={Color.White} style={{ position: 'absolute', right: 12 }} />
                        :
                        null
                    :
                    null
            }
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    BtnView: {
        height: height_screen * 0.054,
        width: '52%',
        marginHorizontal: '10%',
        borderRadius: height_screen * 0.1,
        borderWidth: 0.1,
        borderColor: Color.Grey,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.BtnColor,
        marginBottom: height_screen * 0.01,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    BtnText: {
        fontFamily: Font.Medium,
        color: Color.White,
        marginTop: height_screen * 0.002
    }
})

export default Button;