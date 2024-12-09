import { Platform, StyleSheet } from "react-native";
import { height_screen, width_screen } from "../../Utils/Dimentions";
import Font from "../../Utils/Font";
import FontSize from "../../Utils/FontSize";
import Color from "../../Utils/Color";

const styles = StyleSheet.create({
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
    coinsView: {
        width: '100%',
        borderRadius: height_screen * 0.015,
        paddingHorizontal: '4%',
        paddingTop: height_screen * 0.025,
        paddingBottom: height_screen * 0.015,
        backgroundColor: Color.White,
        borderColor: Color.PrimaryColor,
        borderTopWidth: 2.5,
        marginTop: height_screen * 0.03,
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
        marginTop: -height_screen * 0.021,
        marginLeft: -height_screen * 0.02
    },
    extraView: {
        marginTop: height_screen * 0.02,
    },
    earnText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.016,
        color: Color.Grey,
    },
    earnText2: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.017,
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
        fontSize: height_screen * 0.02,
        alignSelf: 'flex-end'
    },
    hoursLineView: {
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
        fontSize: height_screen * 0.015,
        color: Color.Grey
    },
    extraCoinsView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    totalCoinsView: {
        marginVertical: height_screen * 0.014,
        alignSelf: 'center',
        alignItems: 'center',
    },
    tView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: height_screen * 0.01
    },
    totalCoinsText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.05,
        color: Color.Grey,
        marginBottom: Platform.OS === 'android' ? -height_screen * 0.03 : -height_screen * 0.018
    },
    coinMeterView: {
        width: '100%',
        borderRadius: height_screen * 0.015,
        paddingHorizontal: '4%',
        paddingVertical: height_screen * 0.025,
        backgroundColor: Color.White,
        marginTop: height_screen * 0.018,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    coinCircle: {
        marginLeft: 'auto',
        width: height_screen * 0.14,
        height: height_screen * 0.14,
        borderWidth: height_screen * 0.015,
        borderRadius: height_screen * 0.07,
        borderColor: '#F5E216',
        justifyContent: 'center',
        alignItems: 'center'
    },
    circleText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.027,
        color: Color.Grey,
        marginTop: height_screen * 0.0025
    },
    meterText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.022,
        color: Color.Grey
    },
    earnCoins: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dotView: {
        height: 10,
        width: 10,
        borderRadius: 5,
        marginRight: width_screen * 0.014
    },
    extraCoinsText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.015,
        color: Color.Grey,
        marginTop: height_screen * 0.0025
    },
    collectionView: {
        width: '100%',
        borderRadius: height_screen * 0.015,
        paddingHorizontal: '4%',
        paddingTop: height_screen * 0.018,
        paddingBottom: height_screen * 0.01,
        backgroundColor: Color.White,
        marginTop: height_screen * 0.014,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    collectionText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.017,
        color: Color.Grey,
        marginTop: height_screen * 0.0025
    },
    trophyContainer: {
        // marginTop: height_screen * 0.02,
    },
    achieveView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height_screen * 0.014,
        borderBottomWidth: 0.2,
        borderBottomColor: Color.Grey,
        paddingBottom: height_screen * 0.014
    },
    trophyView: {
        backgroundColor: '#ebebeb',
        // width: width_screen * 0.27,
        paddingVertical: height_screen * 0.002,
        paddingHorizontal: width_screen * 0.01,
        borderRadius: height_screen * 0.009,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    trophyView2: {
        backgroundColor: '#98ffe2',
        // width: width_screen * 0.27,
        paddingVertical: height_screen * 0.002,
        paddingHorizontal: width_screen * 0.01,
        borderRadius: height_screen * 0.009,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },
    trophyText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.016,
        color: Color.Grey,
        marginRight: width_screen * 0.02,
        marginTop: height_screen * 0.0025
    },
    trophyImg: {
        height: height_screen * 0.037,
        width: width_screen * 0.05,
        resizeMode: 'contain',
    }
})

export default styles;