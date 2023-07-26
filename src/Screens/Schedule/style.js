import { StyleSheet } from "react-native";
import { height_screen, width_screen } from "../../Utils/Dimentions";
import Font from "../../Utils/Font";
import FontSize from "../../Utils/FontSize";
import Color from "../../Utils/Color";

const styles = StyleSheet.create({
    bodyView: {
        height: Platform.OS === 'android' ? height_screen * 0.79 : height_screen * 0.78 ,
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
    dutyView: {
        width: '94%',
        marginHorizontal: '3%',
        marginTop: height_screen * 0.04,
        marginBottom: height_screen * 0.09
    },
    dutyText: {
        fontFamily: Font.Medium,
        fontSize: height_screen * 0.018,
        color: Color.Grey
    },
    dutyHeaderView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height_screen * 0.025,
        marginBottom: height_screen * 0.015

    },
    dayView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    dayText: {
        fontFamily: Font.Regular,
        fontSize: height_screen * 0.017,
        color: Color.Grey
    },
    dutyBodyView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: height_screen * 0.001
    },
    bodyText: {
        fontSize: height_screen * 0.018,
        color: Color.Grey
    },
    centerLine: {
        width: '50%',
        alignSelf: 'center',
        marginVertical: height_screen * 0.05,
        borderBottomWidth: 0.9,
        borderBottomColor: Color.Grey
    }
})

export default styles;