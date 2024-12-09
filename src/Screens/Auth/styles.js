import { StyleSheet } from "react-native";
import { height_screen, width_screen } from "../../Utils/Dimentions";
import Font from "../../Utils/Font";
import FontSize from "../../Utils/FontSize";
import Color from "../../Utils/Color";

const styles = StyleSheet.create({
    cardView: {
        marginVertical: height_screen * 0.01,
        height: height_screen * 0.65,
        width: width_screen * 0.86,
        marginHorizontal: width_screen * 0.07,
        borderRadius: height_screen * 0.02,
        backgroundColor: Color.White,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        alignItems: 'center'
    },
    SignInText: {
        fontFamily: Font.Bold,
        fontSize: height_screen * 0.022,
        marginTop: height_screen * 0.1
    },
    txtView: {
        marginBottom: height_screen * 0.05
    },
    txt: {
        fontFamily: Font.Light,
        fontSize: height_screen * 0.015
    },
    forgotView: {
        marginBottom: height_screen * 0.015,
        marginTop: height_screen * 0.09
    },
    accView: {
        marginVertical: height_screen * 0.01,
    },
    forgotText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.015,
    },
    SocialView: {
        height: height_screen * 0.05,
        width: '50%',
        marginHorizontal: '10%',
        borderRadius: height_screen * 0.1,
        borderWidth: 0.1,
        borderColor: Color.Grey,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.BtnColor2,
        marginBottom: height_screen * 0.02,
        flexDirection: 'row',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
    },
    SocialText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.011,
        color: Color.Black
    },
    socialImgView: {
        height: height_screen * 0.02,
        width: width_screen * 0.04,
        resizeMode: 'contain',
        marginRight: width_screen * 0.014
    },


    // Forgot Password Styling .....

    ForgotText: {
        fontFamily: Font.Bold,
        fontSize: height_screen * 0.018,
        marginTop: height_screen * 0.1
    },
    verifyText: {
        fontFamily: Font.Light,
        fontSize: height_screen * 0.014
    },
    backText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.014
    },
    signText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.018,
        color: Color.PrimaryColor
    },
    dropdown: {
        width: width_screen * 0.34,
        marginTop: height_screen * 0.01,
    },
    placeholderStyle: {
        fontSize: 14,
    },
    selectedTextStyle: {
        fontSize: height_screen * 0.018,
        fontFamily: Font.Medium,
        textAlign: 'right'
    },
    iconStyle: {
        width: 25,
        height: 25,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 14,
    },
});

export default styles;