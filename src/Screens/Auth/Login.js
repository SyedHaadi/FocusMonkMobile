import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    BackHandler,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Keyboard,
    Linking,
    ActivityIndicator,
    NativeModules,
    TouchableOpacity,
    TouchableWithoutFeedback,
    useColorScheme,
    View,
    Platform,
    Alert,
} from 'react-native';
import Font from '../../Utils/Font';
import Color from '../../Utils/Color';
import { height_screen, width_screen } from '../../Utils/Dimentions';
import FontSize from '../../Utils/FontSize';
import styles from './styles';
import InputText from '../../Components/InputText';
import Button from '../../Components/Button';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, loginWithGoogleAction } from '../../redux/Auth/authAction';
import Toast from 'react-native-toast-message';
import { setAppLoading } from '../../redux/AppLoader/appLoaderAction';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import { baseUrl } from '../../config/http';
import { Dropdown } from 'react-native-element-dropdown';
import { getLocalStorage, setLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
import { GET_LANGUAGE } from '../../redux/actionTypes';
import { changeLanguage } from '../../redux/language/language.actions';
import { WebView } from 'react-native-webview';

const firebaseConfig = {
    apiKey: "AIzaSyCHiPBEXx8aAJoQVVV6LGQNsVHN5j0QqqE",
    authDomain: "focusmonk-76224.firebaseapp.com",
    databaseURL: "https://focusmonk-76224-default-rtdb.firebaseio.com",
    projectId: "focusmonk-76224",
    storageBucket: "focusmonk-76224.appspot.com",
    messagingSenderId: "247340478733",
    appId: "1:247340478733:web:76c81aee0d4cdf77200044",
    measurementId: "G-WBE9TTC7VV"
};

const Login = ({ navigation }) => {
    const dispatch = useDispatch();

    const [isFocus, setIsFocus] = useState(false);
    const languageData = useSelector((state) => state?.language?.language_data);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [openWeb, setOpenWeb] = useState(false);

    const { CalendarModule } = NativeModules;
    const languages = [{ label: 'English', value: 'English' }, { label: 'Spanish', value: 'Spanish' }, { label: 'Portuguese', value: 'Portuguese' }]
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const isValidEmail = (email) => {
        return emailRegex.test(email);
    };

    useEffect(() => {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(firebaseConfig);
            }
            console.log("Initialinze Success .....");
        } catch (error) {
            console.log("Initiazling Error .....", error);
        }
    }, [])

    useEffect(() => {
        // Initialize GoogleSignin
        GoogleSignin.configure({
            webClientId: '247340478733-41gdunt3jitl82hqoc8o2398voe2va6e.apps.googleusercontent.com', // Your web client ID from Google Cloud Console
        });
    }, []);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            selectFunction();
        });
        return () => {
            unsubscribe;
        };

    }, [navigation]);

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

    useEffect(() => {
        const backAction = () => {
            if (openWeb) {
                setOpenWeb(false);
                return true; // Prevent default back action
            }
            return false; // Allow default back action
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

        return () => backHandler.remove();
    }, [openWeb]);

    const onSubmit = async () => {
        if (email === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.email_required
            })
            return;
        }

        if (!isValidEmail(email)) {
            Toast.show({
                type: 'error',
                text1: languageData?.invalidEmail
            })
            return;
        }

        if (password === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.password_required
            })
            return;
        }

        dispatch(loginAction({ email: email.trim(), password: password, navigation: navigation }));
    }

    const openURLInBrowser = (url) => {
        Linking.openURL(url)
            .then((supported) => {
                if (!supported) {
                    console.error('Opening URL in browser is not supported');
                } else {
                    console.log('URL opened in browser');
                }
            })
            .catch((err) => console.error('Error occurred while opening URL:', err));
    };

    const signInWithGoogle = async () => {

        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            // Get the users ID token
            const userData = await GoogleSignin.signIn();
            console.log("User Data Response .....", userData);
            const idToken = userData?.idToken;
            // Create a Google credential with the token
            const googleCredential = await auth.GoogleAuthProvider.credential(idToken);

            // Sign-in the user with the credential
            await auth().signInWithCredential(googleCredential);

            if (idToken) {
                dispatch(loginWithGoogleAction({ type: "Google", device: 'app', token: idToken, navigation: navigation }))
            }

        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // User canceled the sign-in process
                console.log('Sign-in canceled');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // Another sign-in process is already in progress
                console.log('Sign-in in progress');
            } else {
                // Other errors
                console.error('Sign-in Error:', error);
            }
        }
    }

    const handleNavigationStateChange = (navState) => {
        const { url } = navState;
        // Replace with the actual URL where the user is redirected after a successful registration
        const successUrl = 'https://focusmonk.app/register';

        if (url !== successUrl) {
            setOpenWeb(false); // Close the WebView
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} style={{ flex: 1 }}>

                {
                    openWeb ?
                        <WebView
                            style={{ flex: 1 }}
                            source={{ uri: 'https://focusmonk.app/register' }}
                            onNavigationStateChange={handleNavigationStateChange}
                        />
                        :
                        <View style={{ flex: 1 }}>
                            <View style={{ zIndex: 1 }}>
                                <Toast position='top' />
                            </View>
                            <Image style={{ height: height_screen * 0.14, width: width_screen * 0.4, resizeMode: 'contain', alignSelf: 'center', marginTop: height_screen * 0.03 }} source={require('../../Assets/icons/icon.png')} />

                            <View style={{ position: 'absolute', right: 0, marginRight: width_screen * 0.04 }}>
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
                                    <Text style={styles.SignInText}>{languageData?.sign_in}</Text>

                                    <View style={styles.txtView}>
                                        <Text style={styles.txt}>{languageData?.please_sign_in}</Text>
                                    </View>

                                    <InputText
                                        onChangeText={(email) => setEmail(email)}
                                        value={email}
                                        placeholder={languageData?.enter_your_email}
                                        placeholderTextColor={Color.LightGrey}
                                        icon='user'
                                        secureTextEntry={false}
                                    />
                                    <InputText
                                        onChangeText={(password) => setPassword(password)}
                                        value={password}
                                        placeholder={languageData?.enter_your_password}
                                        placeholderTextColor={Color.LightGrey}
                                        icon='lock'
                                        passwordField={true}
                                        secureTextEntry={!showPassword}
                                        showPassword={showPassword}
                                        onPress={() => setShowPassword(!showPassword)}
                                    />

                                    <TouchableOpacity style={[styles.forgotView, { marginTop: height_screen * 0.04 }]} onPress={() => navigation.navigate('ForgotPassword')} >
                                        <Text style={styles.forgotText} >{languageData?.forgot_password}</Text>
                                    </TouchableOpacity>

                                    <Button text={languageData?.login} onSubmit={onSubmit} />


                                    {
                                        Platform.OS === 'android'
                                            ?
                                            <Button size="0.015" text={languageData?.Signin_Google} onSubmit={signInWithGoogle} />

                                            :
                                            null
                                    }

                                    {/* <GoogleSigninButton
                                style={{ width: width_screen * 0.52, height: height_screen * 0.06 }}
                                size={GoogleSigninButton.Size.Wide}
                                color={GoogleSigninButton.Color.Dark}
                                onPress={signInWithGoogle}
                            /> */}

                                    <TouchableOpacity style={styles.accView} onPress={() => setOpenWeb(true)} >
                                        <Text style={styles.forgotText} >{languageData?.not_have_account}</Text>
                                    </TouchableOpacity>

                                    {/* <TouchableOpacity style={styles.SocialView}>
                                <Image source={require('../../Assets/icons/google.png')} style={styles.socialImgView} />
                                <Text style={styles.SocialText} >Continue with Google</Text>
                            </TouchableOpacity> */}

                                </View>
                            </ImageBackground>
                        </View>
                }

            </TouchableWithoutFeedback >
        </SafeAreaView >
    );
}


export default Login;
