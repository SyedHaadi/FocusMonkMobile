import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height_screen, width_screen } from '../Utils/Dimentions'
import Color from '../Utils/Color';
import Icon from 'react-native-vector-icons/FontAwesome';

const InputText = (props) => {
    return (
        <View style={styles.inputView}>
            <Icon name={props.icon} size={height_screen * 0.026} color={Color.Grey} />
            <TextInput
                style={{ marginLeft: width_screen * 0.02, width: '75%', height: height_screen * 0.06 }}
                onChangeText={props.onChangeText}
                value={props.value}
                placeholder={props.placeholder}
                placeholderTextColor={props.placeholderTextColor}
                secureTextEntry={props.secureTextEntry}
            />
            {
                props.passwordField ?
                    <TouchableOpacity onPress={props.onPress} style={{ marginLeft: height_screen * 0.02 }} >
                        <Icon name={props.showPassword ? 'eye' : 'eye-slash'} size={height_screen * 0.025} color={Color.Grey} />
                    </TouchableOpacity>
                    :
                    null
            }
            {
                props.passwordField2 ?
                    <TouchableOpacity onPress={props.onPress} style={{ marginLeft: height_screen * 0.02 }} >
                        <Icon name={props.showPassword ? 'eye' : 'eye-slash'} size={height_screen * 0.025} color={Color.Grey} />
                    </TouchableOpacity>
                    :
                    null
            }
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        height: height_screen * 0.06,
        width: '80%',
        marginHorizontal: '10%',
        borderRadius: height_screen * 0.1,
        borderWidth: 0.1,
        borderColor: Color.Grey,
        backgroundColor: Color.White,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width_screen * 0.04,
        marginBottom: height_screen * 0.02,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    }
})

export default InputText;