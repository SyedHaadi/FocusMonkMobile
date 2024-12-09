import { StyleSheet } from "react-native";
import { height_screen, width_screen } from "../../Utils/Dimentions";
import Font from "../../Utils/Font";
import FontSize from "../../Utils/FontSize";
import Color from "../../Utils/Color";

const styles = StyleSheet.create({
    bodyView: {
        width: width_screen * 0.94,
        marginHorizontal: width_screen * 0.03,
        paddingHorizontal: width_screen * 0.01,
        marginTop: height_screen * 0.01,
    },
    profileMainView: {
        width: '100%',
        borderRadius: height_screen * 0.015,
        paddingHorizontal: '5%',
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
    profileView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    proText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.017,
        color: Color.Grey
    },
    delView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: height_screen * 0.006,
        paddingHorizontal: height_screen * 0.02,
        borderRadius: height_screen * 0.02,
        backgroundColor: Color.BtnColor
    },
    delText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.013,
        color: Color.White,
        marginRight: height_screen * 0.005
    },
    ImgView: {
        height: height_screen * 0.14,
        width: height_screen * 0.14,
        borderRadius: height_screen * 0.07,
        borderStyle: 'dashed',
        borderWidth: 3,
        borderColor: Color.PrimaryColor,
        alignItems: 'center',
        justifyContent: 'center'
    },
    img: {
        height: height_screen * 0.12,
        width: height_screen * 0.12,
        borderRadius: height_screen * 0.06
    },
    takeView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height_screen * 0.004,
        paddingHorizontal: height_screen * 0.025,
        borderRadius: height_screen * 0.04,
        borderWidth: 1,
        borderColor: Color.PrimaryColor
    },
    takeText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.015,
        color: Color.PrimaryColor,
        marginTop: height_screen * 0.002
    },
    SelectView: {
        marginTop: height_screen * 0.01,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height_screen * 0.0055,
        paddingHorizontal: height_screen * 0.025,
        borderRadius: height_screen * 0.02,
        backgroundColor: Color.PrimaryColor
    },
    SelectText: {
        fontFamily: Font.Light,
        fontSize: height_screen * 0.015,
        color: Color.White,
        marginRight: height_screen * 0.005,
        marginTop: height_screen * 0.002
    },
    FormView: {
        marginVertical: height_screen * 0.01,
        paddingBottom: height_screen * 0.01,
    },
    BtnView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: height_screen * 0.01,
        paddingHorizontal: height_screen * 0.05,
        marginTop: height_screen * 0.02,
        borderRadius: height_screen * 0.033,
        backgroundColor: Color.PrimaryColor,
        alignSelf: 'center'
    },
    BtnText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.021,
        color: Color.White,
        marginTop: height_screen * 0.002
    },

    modalBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: height_screen * 0.022,
        alignSelf: 'flex-start',
        fontFamily: Font.Bold,
        marginBottom: height_screen * 0.005,
    },
    modalDescription: {
        fontSize: height_screen * 0.016,
        alignSelf: 'flex-start',
        fontFamily: Font.Regular,
        marginBottom: height_screen * 0.02,
    },
    okButton: {
        backgroundColor: Color.PrimaryColor,
        padding: 10,
        borderRadius: 5,
        width: width_screen * 0.14,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: height_screen * 0.016,
        color: Color.White,
        fontFamily: Font.Regular,
    }
})

export default styles;