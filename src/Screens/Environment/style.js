import { StyleSheet } from "react-native";
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
        paddingHorizontal: '5%',
        paddingVertical: height_screen * 0.035,
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
    blockMainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    envText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.022,
        color: Color.Grey,
        marginTop: height_screen * 0.0025
    },
    blockView: {
        paddingVertical: height_screen * 0.002,
        paddingHorizontal: width_screen * 0.05,
        backgroundColor: Color.PrimaryColor,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    blockText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.017,
        color: Color.Grey,
        marginTop: height_screen * 0.0025
    },
    listTitleView: {
        marginTop: height_screen * 0.03,
        paddingBottom: height_screen * 0.018,
    },
    tabView: {
        marginTop: height_screen * 0.03,
        paddingBottom: height_screen * 0.018,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    tab: {
        height: height_screen * 0.035,
        width: width_screen * 0.27,
        borderRadius: height_screen * 0.1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 0.5,
        borderColor: Color.Grey,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,

        elevation: 2,
    },
    tabText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.017,
    },
    titleText1: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.022,
        color: Color.PrimaryColor
    },
    titleText2: {
        fontFamily: Font.Light,
        fontSize: height_screen * 0.0165,
        color: Color.Grey,
        marginTop: -height_screen * 0.005
    },
    appView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: width_screen * 0.03,
        paddingVertical: height_screen * 0.013,
        borderTopWidth: height_screen * 0.00025,
        borderTopColor: Color.Grey
    },
    iconView: {
        marginRight: width_screen * 0.02,
        height: height_screen * 0.024,
        width: height_screen * 0.024,
        borderRadius: 2
    },
    appText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.016,
        color: Color.Black,
        marginTop: height_screen * 0.005
    },
})

export default styles;