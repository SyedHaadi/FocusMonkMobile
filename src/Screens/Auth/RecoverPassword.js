import React, { useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { RecoverPasswordAction } from '../../redux/Auth/authAction';
import Toast from 'react-native-toast-message';


const RecoverPassword = ({ navigation, route }) => {

    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const { params } = route;
    const dispatch = useDispatch();

    const onSubmit = () => {

        if (otp === '') {
            Toast.show({
                type: 'error',
                text1: 'Please enter your OTP !'
            })
            return;
        }
        if (password === '') {
            Toast.show({
                type: 'error',
                text1: 'Please enter a password !'
            })
            return;
        }
        if (confirmPassword === '') {
            Toast.show({
                type: 'error',
                text1: 'Please re-enter your password !'
            })
            return;
        }
        if (password !== confirmPassword) {
            Toast.show({
                type: 'error',
                text1: 'Your password does not match !'
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ zIndex: 1 }}>
                        <Toast position='top' />
                    </View>

                    <Image style={{ height: height_screen * 0.14, width: width_screen * 0.4, resizeMode: 'contain', alignSelf: 'center', marginTop: height_screen * 0.03 }} source={require('../../Assets/icons/icon.png')} />

                    <ImageBackground style={{ height: height_screen * 1, width: width_screen * 1 }} source={require('../../Assets/icons/background.png')}>
                        <View style={styles.cardView}>
                            <Text style={styles.ForgotText}>Enter New Password</Text>

                            <View style={styles.txtView}>
                                <Text style={styles.verifyText}>Please create secure password</Text>
                            </View>

                            <InputText
                                onChangeText={(otp) => setOtp(otp)}
                                value={otp}
                                placeholder='Enter your OTP'
                                placeholderTextColor={Color.LightGrey}
                                icon='key'
                            />

                            <InputText
                                onChangeText={(password) => setPassword(password)}
                                value={password}
                                placeholder='Create Password'
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
                                placeholder='Confirm Password'
                                placeholderTextColor={Color.LightGrey}
                                icon='lock'
                                passwordField2={true}
                                secureTextEntry={!showPassword2}
                                showPassword={showPassword2}
                                onPress={() => setShowPassword2(!showPassword2)}
                            />

                            <View style={{ marginTop: height_screen * 0.04 }} ></View>

                            <Button text='Update' onSubmit={onSubmit} />
                            <View style={{ marginTop: 'auto', marginBottom: height_screen * 0.05, alignItems: 'center' }} >
                                <Text style={styles.backText} >Go back to sign in page ?</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                                    <Text style={styles.signText} >Sign In</Text>
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
