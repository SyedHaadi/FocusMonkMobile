import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { height_screen, width_screen } from '../Utils/Dimentions'
import Color from '../Utils/Color';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Font from '../Utils/Font';

const EditInput = (props) => {
    return (
        <View style={[styles.inputView, { width: `${props.width}%`, }]}>
            <Text style={styles.titleText}>{props.title}</Text>
            <View style={styles.textInputView}>
                <TextInput
                    style={{ paddingBottom: -height_screen * 0.01, paddingLeft: -height_screen * 0.01, width: '80%' }}
                    onChangeText={props.onChangeText}
                    value={props.value}
                    placeholder={props.placeholder}
                    placeholderTextColor={props.placeholderTextColor}
                    secureTextEntry={props.secureTextEntry}
                    editable={props.editable}
                    keyboardType={props.keyBoardType}
                />
                {
                    props.editable ?
                        <View style={styles.iconView}>
                            <Icon name='pen' size={height_screen * 0.016} color={Color.PrimaryColor} />
                            <Text style={styles.edittext}>Edit</Text>
                        </View> :
                        null
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    inputView: {
        alignSelf: 'center',
        borderBottomWidth: 0.2,
        borderBottomColor: Color.Grey,
        marginVertical: height_screen * 0.02,
        paddingRight: width_screen * 0.02,
    },
    titleText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.018,
        color: Color.Grey,
        marginBottom: Platform.OS === 'android' ? -height_screen * 0.015 : height_screen * 0.005
    },
    textInputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    iconView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    edittext: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.014,
        color: Color.PrimaryColor,
        marginLeft: height_screen * 0.002
    }
})

export default EditInput;