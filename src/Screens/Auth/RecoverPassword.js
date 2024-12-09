import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    Keyboard,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
} from 'react-native';
import Font from '../../Utils/Font';
import Color from '../../Utils/Color';
import { height_screen, width_screen } from '../../Utils/Dimentions';
import FontSize from '../../Utils/FontSize';
import styles from './styles';
import InputText from '../../Components/InputText';
import Button from '../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { RecoverPasswordAction } from '../../redux/Auth/authAction';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { STORAGE_KEYS } from '../../shared/constants';
import { getLocalStorage } from '../../shared/functions';
import { Dropdown } from 'react-native-element-dropdown';
import { changeLanguage } from '../../redux/language/language.actions';



const RecoverPassword = ({ navigation, route }) => {

    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const languageData = useSelector((state) => state?.language?.language_data);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const languages = [{ label: 'English', value: 'English' }, { label: 'Spanish', value: 'Spanish' }, { label: 'Portuguese', value: 'Portuguese' }]

    const { params } = route;
    const dispatch = useDispatch();

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            selectFunction();
        });
        return () => {
            unsubscribe;
        };

    }, [navigation]);

    const onSubmit = () => {

        if (otp === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.otp
            })
            return;
        }
        if (password === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.password
            })
            return;
        }
        if (password.length < 8) {
            Toast.show({
                type: 'error',
                text1: languageData?.passwordLength
            })
            return;
        }
        if (confirmPassword === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.reEnterPassword
            })
            return;
        }
        if (password !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: languageData?.passwordMismatch
            })
            return;
        }

        const data = {
            'email': params,
            'password': password,
            'token': otp
        }
        dispatch(RecoverPasswordAction(data));
    }

    const selectFunction = async () => {
        const langType = await getLocalStorage(STORAGE_KEYS.Language_Type);
        if (langType == 'en') {
            setSelectedLanguage('English')
        } else if (langType == 'es') {
            setSelectedLanguage("Spanish")
        } else if (langType == 'pr') {
            setSelectedLanguage("Portuguese")
        } else {
            setSelectedLanguage("English")
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ zIndex: 10 }}>
                        <Toast position='top' />
                    </View>

                    <Image style={{ height: height_screen * 0.14, width: width_screen * 0.4, resizeMode: 'contain', alignSelf: 'center', marginTop: height_screen * 0.03 }} source={require('../../Assets/icons/icon.png')} />

                    <View style={{ position: 'absolute', right: 0, marginRight: width_screen * 0.03 }}>
                        <Dropdown
                            style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                            placeholderStyle={styles.placeholderStyle}
                            selectedTextStyle={styles.selectedTextStyle}
                            inputSearchStyle={styles.inputSearchStyle}
                            iconStyle={styles.iconStyle}
                            data={languages}
                            maxHeight={175}
                            labelField="label"
                            valueField="value"
                            placeholder={!isFocus ? 'Select Language' : '...'}
                            searchPlaceholder="Search..."
                            value={selectedLanguage}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                            onChange={item => {
                                dispatch(changeLanguage(item)),
                                    setSelectedLanguage(item)
                                setIsFocus(false);
                            }}
                        />
                    </View>

                    <ImageBackground style={{ height: height_screen * 1, width: width_screen * 1 }} source={require('../../Assets/icons/background.png')}>
                        <View style={styles.cardView}>
                            <Text style={styles.ForgotText}>{languageData?.enter_new_password}</Text>

                            <View style={styles.txtView}>
                                <Text style={styles.verifyText}>{languageData?.create_secure_password}</Text>
                            </View>

                            <InputText
                                onChangeText={(otp) => setOtp(otp)}
                                value={otp}
                                placeholder={languageData?.enter_otp}
                                placeholderTextColor={Color.LightGrey}
                                icon='key'
                            />

                            <InputText
                                onChangeText={(password) => setPassword(password)}
                                value={password}
                                placeholder={languageData?.create_password}
                                placeholderTextColor={Color.LightGrey}
                                icon='lock'
                                passwordField={true}
                                secureTextEntry={!showPassword}
                                showPassword={showPassword}
                                onPress={() => setShowPassword(!showPassword)}
                            />

                            <InputText
                                onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                                value={confirmPassword}
                                placeholder={languageData?.confirm_password}
                                placeholderTextColor={Color.LightGrey}
                                icon='lock'
                                passwordField2={true}
                                secureTextEntry={!showPassword2}
                                showPassword={showPassword2}
                                onPress={() => setShowPassword2(!showPassword2)}
                            />

                            <View style={{ marginTop: height_screen * 0.04 }} ></View>

                            <Button text={languageData?.submit} onSubmit={onSubmit} />
                            <View style={{ marginTop: 'auto', marginBottom: height_screen * 0.05, alignItems: 'center' }} >
                                <Text style={styles.backText} >{languageData?.back_to_signin}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.signText} >{languageData?.sign_in}</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}


export default RecoverPassword;
