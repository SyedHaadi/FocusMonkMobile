import { StyleSheet, Platform } from "react-native";
import { height_screen, width_screen } from "../../Utils/Dimentions";
import Font from "../../Utils/Font";
import FontSize from "../../Utils/FontSize";
import Color from "../../Utils/Color";

const styles = StyleSheet.create({
    headerView: {
        height: height_screen * 0.15,
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
        marginLeft: width_screen * 0.05
    },
    iconsView: {
        flexDirection: 'row',

    },
    bodyView: {
        height: Platform.OS === 'android' ? height_screen * 0.79 : height_screen * 0.78,
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
    profileView: {
        width: '100%',
        marginTop: height_screen * 0.03,
        flexDirection: 'row',
        alignItems: 'center'
    },
    ImgView: {
        height: height_screen * 0.1,
        width: height_screen * 0.1,
        borderRadius: height_screen * 0.05,
        // padding: height_screen * 0.001,
        borderWidth: 2,
        borderColor: Color.PrimaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: height_screen * 0.09,
        width: height_screen * 0.09,
        borderRadius: height_screen * 0.045
    },
    nameView: {
        marginLeft: width_screen * 0.03
    },
    nameText: {
        fontFamily: Font.Bold,
        fontSize: height_screen * 0.019,
        color: Color.Grey,
        marginBottom: Platform.OS === 'android' ? -height_screen * 0.007 : 0,
        textTransform: 'capitalize'
    },
    devText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.018,
        color: Color.Grey,
        marginBottom: Platform.OS === 'android' ? -height_screen * 0.005 : 0,
        textTransform: 'capitalize'
    },
    companyText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.016,
        color: Color.Grey,
        textTransform: 'capitalize'
    },
    rankView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: height_screen * 0.025,
        marginBottom: height_screen * 0.025
    },
    rView: {
        backgroundColor: Color.PrimaryColor,
        paddingHorizontal: width_screen * 0.017,
        paddingVertical: height_screen * 0.002,
        borderRadius: height_screen * 0.008,

    },
    rankText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.016,
        color: Color.Grey,
        marginTop: height_screen * 0.002

    },
    rankText2: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.014,
        color: Color.Grey,
        marginTop: height_screen * 0.002
    },
    trophyView: {
        backgroundColor: Color.Pink,
        paddingHorizontal: width_screen * 0.017,
        paddingVertical: height_screen * 0.002,
        borderRadius: height_screen * 0.008,
        flexDirection: 'row',
        alignItems: 'center'

    },
    trophyText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.014,
        color: Color.Red,
        marginRight: width_screen * 0.025,
        marginTop: height_screen * 0.002
    },
    coinsView: {
        width: '100%',
        borderRadius: height_screen * 0.015,
        paddingHorizontal: '5%',
        paddingTop: height_screen * 0.025,
        paddingBottom: height_screen * 0.015,
        backgroundColor: Color.White,
        borderColor: Color.PrimaryColor,
        borderTopWidth: 2.5,
        marginBottom: height_screen * 0.02,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4,
    },
    coinsText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.017,
        color: Color.Grey
    },
    perText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.016,
        color: Color.Grey,
        alignSelf: 'flex-end'
    },
    lineView: {
        height: height_screen * 0.012,
        width: '100%',
        borderRadius: height_screen * 0.01,
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
    coinImgView: {
        position: 'absolute',
        resizeMode: 'contain',
        zIndex: 1,
        marginTop: -height_screen * 0.019,
        marginLeft: -height_screen * 0.022
    },
    totalCoinsView: {
        marginTop: height_screen * 0.035,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    earnText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.015,
        color: Color.Grey
    },
    earnText2: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.019,
        color: Color.Grey
    },
    dutyTimeView: {
        width: '100%',
        paddingHorizontal: '5%',
        paddingVertical: height_screen * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height_screen * 0.007
    },
    hoursText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.017,
        alignSelf: 'flex-end'
    },
    hoursLineView: {
        height: height_screen * 0.008,
        width: '95%',
        alignSelf: 'flex-end',
        borderWidth: 0.1,
        marginTop: Platform.OS === 'ios' ? height_screen * 0.001 : 0,
        marginBottom: -height_screen * 0.0025,
        borderColor: Color.Grey,
        borderRadius: height_screen * 0.01,
        backgroundColor: Color.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 1,
    },
    hoursTextView: {
        height: height_screen * 0.008,
        width: '95%',
        alignSelf: 'flex-end',
        borderWidth: 0.1,
        borderColor: Color.Grey,
        borderRadius: height_screen * 0.01,
        backgroundColor: Color.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.00,

        elevation: 1,
    },
    timeText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.0152,
        color: Color.Grey
    },
    trophyImg: {
        height: height_screen * 0.025,
        width: width_screen * 0.04,
        resizeMode: 'contain',
    }
})

export default styles;