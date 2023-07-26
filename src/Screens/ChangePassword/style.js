import { StyleSheet } from "react-native";
import { height_screen, width_screen } from "../../Utils/Dimentions";
import Font from "../../Utils/Font";
import FontSize from "../../Utils/FontSize";
import Color from "../../Utils/Color";

const styles = StyleSheet.create({
    bodyView: {
        height: height_screen * 0.74,
        width: width_screen * 0.94,
        marginHorizontal: width_screen * 0.03,
        paddingHorizontal: width_screen * 0.01,
        marginTop: height_screen * 0.01,
    },
    profileMainView: {
        width: '100%',
        borderRadius: height_screen * 0.015,
        paddingVertical: height_screen * 0.035,
        backgroundColor: Color.White,
        borderColor: Color.PrimaryColor,
        borderTopWidth: 2.5,
        marginTop: height_screen * 0.02,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    createView: {
        marginTop: height_screen * 0.014,
        marginBottom: height_screen * 0.04,
        alignSelf: 'center'
    },
    createText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.02,
        color: Color.Grey
    },
    currentView: {

    },
    currView: {
        marginLeft: '15%',
        marginBottom: height_screen * 0.007
    },
    currText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.017,
        color: Color.Grey
    },
    BtnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height_screen * 0.007,
        paddingHorizontal: height_screen * 0.035,
        borderRadius: height_screen * 0.03,
        backgroundColor: Color.BtnColor,
        alignSelf: 'center',
        marginTop: height_screen * 0.07,
        marginBottom: height_screen * 0.04
    },
    BtnText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.022,
        color: Color.White,
        marginTop: height_screen * 0.003
    },

})

export default styles;