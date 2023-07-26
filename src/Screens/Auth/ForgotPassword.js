import React, { useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    Keyboard,
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
import { forgotAction } from '../../redux/Auth/authAction';
import Toast from 'react-native-toast-message';

const ForgotPassword = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();

    const onSubmit = () => {

        if (email === '') {
            Toast.show({
                type: 'error',
                text1: 'Please enter a valid email !'
            })
            return;
        }

        dispatch(forgotAction({ email: email }));
        // navigation.navigate('RecoverPassword');
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
                            <Text style={styles.ForgotText}>Forgot Password ?</Text>

                            <View style={styles.txtView}>
                                <Text style={styles.verifyText}>Enter your Email and verify yourself</Text>
                            </View>

                            <InputText
                                onChangeText={(email) => setEmail(email)}
                                value={email}
                                placeholder='Enter your Email'
                                placeholderTextColor={Color.LightGrey}
                                icon='user'
                                secureTextEntry={false}
                            />

                            <View style={{ marginTop: height_screen * 0.04 }} ></View>
                            <Button text='Submit' onSubmit={onSubmit} />

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


export default ForgotPassword;
