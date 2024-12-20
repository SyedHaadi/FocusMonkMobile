import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { height_screen, width_screen } from '../Utils/Dimentions';
import Color from '../Utils/Color';
import Font from '../Utils/Font';
import Toast from 'react-native-toast-message';
import { navigate } from '../Navigation/RootNavigator';

const Header = ({ title, navigation, onPress, heading }) => {


    return (

        <View style={styles.headerView} >
            <View style={styles.headerInnerView} >
                <TouchableOpacity style={{ padding: 10, marginLeft: -10 }} onPress={() => navigation.toggleDrawer()} >
                    <Icon name='bars' size={height_screen * 0.025} color={Color.White} />
                </TouchableOpacity>

                <Text style={styles.headerText} >{title}</Text>

                <View style={styles.iconsView} >
                    {
                        heading === "Dashboard" ?
                            <TouchableOpacity onPress={() => onPress()}>
                                <Ionicons name='globe-outline' size={height_screen * 0.025} color={Color.White} style={{ marginRight: height_screen * 0.01, marginLeft: -width_screen * 0.02 }} />
                            </TouchableOpacity>
                            :
                            title !== 'Profile Setting'
                                ?
                                <TouchableOpacity style={{ width: width_screen * 0.055 }} onPress={() => navigation.navigate('ProfileSetting')}>
                                    <Icon name='user' size={height_screen * 0.025} color={Color.White} style={{ marginRight: height_screen * 0.01 }} />
                                </TouchableOpacity>
                                :
                                <View style={{ width: width_screen * 0.055 }}></View>
                    }



                    {/* <TouchableOpacity>
                        <Icon name='bell' size={height_screen * 0.022} color={Color.White} />
                    </TouchableOpacity> */}

                </View>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    headerView: {
        height: height_screen * 0.12,
        width: '100%',
        backgroundColor: Color.PrimaryColor,
        borderBottomRightRadius: height_screen * 0.04,
        borderBottomLeftRadius: height_screen * 0.04,
    },
    headerInnerView: {
        marginTop: 'auto',
        marginBottom: height_screen * 0.02,
        paddingHorizontal: width_screen * 0.055,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.025,
        color: Color.White,
        // marginLeft: width_screen * 0.02
        marginTop: height_screen * 0.0055
    },
    iconsView: {
        flexDirection: 'row',

    },
});


export default Header;