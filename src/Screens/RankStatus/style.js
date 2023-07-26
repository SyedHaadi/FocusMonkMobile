import { Platform, StyleSheet } from "react-native";
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
        height: height_screen * 0.74,
        width: width_screen * 0.94,
        marginHorizontal: width_screen * 0.03,
        paddingHorizontal: width_screen * 0.03,
        backgroundColor: Color.White,
        borderRadius: height_screen * 0.02,
        marginTop: height_screen * 0.01,
        paddingBottom: height_screen * 0.02,
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
        width: '99%',
        alignSelf: 'center',
        marginTop: height_screen * 0.014,
        marginBottom: height_screen * 0.004,
        paddingVertical: height_screen * 0.012,
        paddingHorizontal: width_screen * 0.032,
        borderRadius: height_screen * 0.012,
        flexDirection: 'row',
        alignItems: 'center',
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
    img: {
        height: height_screen * 0.066,
        width: height_screen * 0.066,
        borderRadius: height_screen * 0.033
    },
    nameView: {
        marginLeft: width_screen * 0.03
    },
    nameText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.018,
        color: Color.Grey,
        marginBottom: Platform.OS === 'android' ? -height_screen * 0.007 : -height_screen * 0.002
    },
    devText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.015,
        color: Color.Grey,
        marginBottom: -height_screen * 0.005
    },
    rankView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rView: {
        backgroundColor: Color.Aqua,
        paddingHorizontal: width_screen * 0.014,
        borderRadius: height_screen * 0.004,

    },
    rankText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.014,
        color: Color.Grey,
        marginRight: width_screen * 0.005
    },
    rankText2: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.013,
        color: Color.Grey,
        marginTop: height_screen * 0.0025
    },
    amtText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.022,
        color: Color.Grey
    }
})

export default styles;