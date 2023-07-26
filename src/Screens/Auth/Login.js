import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Keyboard,
    NativeModules,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
    Platform,
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
import { loginAction } from '../../redux/Auth/authAction';
import Toast from 'react-native-toast-message';

import { setAppLoading } from '../../redux/AppLoader/appLoaderAction';


const Login = ({ navigation }) => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { CalendarModule } = NativeModules;

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (Platform.OS == 'android') {
                CalendarModule.createCalendarEvent('clear', "");
            }
            setEmail('');
            setPassword('');
            dispatch(setAppLoading(false));
        });
        return () => {
            unsubscribe;
        };
    }, [navigation])

    const onSubmit = () => {

        if (email === '') {
            Toast.show({
                type: 'error',
                text1: 'Please enter a valid email !'
            })
            return;
        }
        if (password === '') {
            Toast.show({
                type: 'error',
                text1: 'Please enter a valid password !'
            })
            return;
        }

        dispatch(loginAction({ email: email.trim(), password: password, navigation: navigation }));
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
                            <Text style={styles.SignInText}>Sign In</Text>

                            <View style={styles.txtView}>
                                <Text style={styles.txt}>Please sign in your account</Text>
                            </View>

                            <InputText
                                onChangeText={(email) => setEmail(email)}
                                value={email}
                                placeholder='Enter your Email'
                                placeholderTextColor={Color.LightGrey}
                                icon='user'
                                secureTextEntry={false}
                            />
                            <InputText
                                onChangeText={(password) => setPassword(password)}
                                value={password}
                                placeholder='Enter your Password'
                                placeholderTextColor={Color.LightGrey}
                                icon='lock'
                                passwordField={true}
                                secureTextEntry={!showPassword}
                                showPassword={showPassword}
                                onPress={() => setShowPassword(!showPassword)}
                            />

                            <TouchableOpacity style={styles.forgotView} onPress={() => navigation.navigate('ForgotPassword')} >
                                <Text style={styles.forgotText} >Forgot Password?</Text>
                            </TouchableOpacity>

                            <Button text='Login' onSubmit={onSubmit} />

                            {/* <TouchableOpacity style={styles.SocialView}>
                                <Image source={require('../../Assets/icons/google.png')} style={styles.socialImgView} />
                                <Text style={styles.SocialText} >Continue with Google</Text>
                            </TouchableOpacity> */}

                        </View>
                    </ImageBackground>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}


export default Login;
