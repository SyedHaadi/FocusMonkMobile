import { Platform, StyleSheet } from "react-native";
import { height_screen, width_screen } from "../../Utils/Dimentions";
import Font from "../../Utils/Font";
import FontSize from "../../Utils/FontSize";
import Color from "../../Utils/Color";

const styles = StyleSheet.create({
    bodyView: {
        height: height_screen * 0.8,
        width: width_screen * 0.94,
        marginHorizontal: width_screen * 0.03,
        paddingHorizontal: width_screen * 0.03,
        backgroundColor: Color.White,
        borderRadius: height_screen * 0.02,
        marginTop: height_screen * 0.01,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    achView: {
        alignSelf: 'center',
        alignItems: 'center',
        marginTop: height_screen * 0.03
    },
    achText1: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.02,
        color: Color.PrimaryColor
    },
    achText2: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.015,
        color: Color.Grey,
        marginTop: Platform.OS === 'android' ? -height_screen * 0.005 : -height_screen * 0.002
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: height_screen * 0.025
    },
    trackView: {
        height: height_screen * 0.33,
        width: '75%',
        borderRadius: 20,
        backgroundColor: Color.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    meterView: {
        height: height_screen * 0.33,
        // justifyContent:'center',
        width: '20%',
        borderRadius: 12,
        backgroundColor: Color.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    lineView: {
        height: '80%',
        width: height_screen * 0.01,
        borderRadius: height_screen * 0.01,
        alignSelf: 'center',
        backgroundColor: Color.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    lineSideView: {
        height: '80%',
        width: height_screen * 0.01,
        alignSelf: 'center',
    },
    coinImgView: {
        position: 'absolute',
        resizeMode: 'contain',
        marginLeft: -20,
        marginTop: -20
    },
    litView: {
        flexDirection: 'row',
        position: 'absolute',
        marginLeft: -height_screen * 0.02,
        marginTop: -5
    },
    trackImg: {
        resizeMode: 'contain',
        height: height_screen * 0.3,
        width: width_screen * 0.6,
        alignSelf: 'center'
    },
    appView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width_screen * 0.03,
        borderBottomWidth: height_screen * 0.0002,
        borderBottomColor: Color.Grey
    },
    titleView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: width_screen * 0.03,
        marginBottom: height_screen * 0.01,
        marginTop: height_screen * 0.02
    },
    iconView: {
        height: height_screen * 0.035,
        width: width_screen * 0.065,
        resizeMode: 'contain',
        marginRight: width_screen * 0.015
    },
    iconView2: {
        height: height_screen * 0.05,
        width: width_screen * 0.07,
        marginLeft: -5,
        marginTop: height_screen * 0.002
    },
    appText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.016,
        color: Color.Grey,
        textTransform: 'capitalize',
        marginTop: height_screen * 0.003
    },
    appText2: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.0155,
        color: Color.Grey,
    },
    view1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    view2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%',
    },
    view3: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%'
    },
    title1: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '50%'
    },
    title2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '30%'
    },
    title3: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '20%',
    },
    srText: {
        fontFamily: Font.Light,
        fontSize: height_screen * 0.012,
        color: Color.Grey,
        marginRight: width_screen * 0.02,
        marginLeft: -width_screen * 0.022,
        marginTop: height_screen * 0.001
    },
    statusText: {
        fontFamily: Font.Light,
        fontSize: height_screen * 0.015,
        color: Color.Grey,
    },
    titleText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.016,
        color: Color.PrimaryColor,
    },
    baseView: {
        marginLeft: -height_screen * 0.02,
        height: height_screen * 0.02,
        width: height_screen * 0.05,
        backgroundColor: Color.PrimaryColor,
        transform: [{ rotate: '-90deg' }],
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10
    },
    triangle: {
        width: 0,
        height: 0,
        marginLeft: -height_screen * 0.015,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: 7,
        borderRightWidth: 7,
        borderBottomWidth: 14,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: Color.PrimaryColor,
        transform: [
            { rotate: '90deg' }
        ],
        margin: 0,
        borderWidth: 0,
        zIndex: 5
    },
    totalText: {
        alignSelf: 'center',
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.018,
        color: Color.PrimaryColor,
        marginTop:height_screen*0.02
    }
})

export default styles;