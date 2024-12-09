import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    ToastAndroid,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { height_screen, width_screen } from '../../Utils/Dimentions';
import Color from '../../Utils/Color';
// import PieChart from 'react-native-pie-chart';
import CircularProgress from '../../Components/CircularProgress';
import Header from '../../Components/Header';
import EditInput from '../../Components/EditInput';
import InputText from '../../Components/InputText';
import Button from '../../Components/Button';
import { getLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
import { useSelector, useDispatch } from 'react-redux';
import { ChangePasswordAction } from '../../redux/Auth/authAction';
import Toast from 'react-native-toast-message';


const ChangePassword = ({ navigation }) => {

    const dispatch = useDispatch();
    const loading = useSelector((state) => state?.appLoading?.loading);

    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);
    const [userId, setUserId] = useState('');
    const languageData = useSelector((state) => state?.language?.language_data);


    const getUserId = async () => {
        const id = await getLocalStorage(STORAGE_KEYS.USER_ID);
        setUserId(id);
    }

    useEffect(() => {
        getUserId();
    }, [])

    const setValuesNull = () => {
        setCurrentPassword('');
        setPassword('');
        setConfirmPassword('');
    }

    const onSubmit = async () => {

        if (currentPassword === '' || password === '' || confirmPassword === '') {
            ToastAndroid.show('Please fill all the fields !', ToastAndroid.LONG);
            return;
        }

        if (currentPassword === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.currentPassword,
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
        if (password.length < 8) {
            Toast.show({
                type: 'error',
                text1: languageData?.passwordLength
            })
            return;
        }
        if (currentPassword == password) {
            Toast.show({
                type: 'error',
                text1: languageData?.oldPasswordError
            })
            return;
        }

        const data = {
            '_id': userId,
            'oldpassword': currentPassword,
            'password': password
        }
        const get = await dispatch(ChangePasswordAction(data));

        if (get) {
            setValuesNull();
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={{ flex: 1 }}>

                <View style={{ zIndex: 10 }}>
                    <Toast position='top' />
                </View>

                <Header title={languageData?.change_password_title} navigation={navigation} />

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.bodyView} >

                        <View style={styles.profileMainView}>

                            <View style={styles.createView}>
                                <Text style={styles.createText}>{languageData?.create_new_password}</Text>
                            </View>

                            <View style={{ marginTop: height_screen * 0.01 }}>
                                <View style={styles.currView}>
                                    <Text style={styles.currText}>{languageData?.enter_current_password}</Text>
                                </View>
                                <InputText
                                    onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
                                    value={currentPassword}
                                    placeholder={languageData?.enter_current_password}
                                    placeholderTextColor={Color.LightGrey}
                                    icon='lock'
                                    passwordField={true}
                                    secureTextEntry={!showPassword3}
                                    showPassword={showPassword3}
                                    onPress={() => setShowPassword3(!showPassword3)}
                                />
                            </View>

                            <View style={{ marginTop: height_screen * 0.01 }}>
                                <View style={styles.currView}>
                                    <Text style={styles.currText}>{languageData?.rest_password_title}</Text>
                                </View>
                                <InputText
                                    onChangeText={(password) => setPassword(password)}
                                    value={password}
                                    placeholder={languageData?.rest_new_password}
                                    placeholderTextColor={Color.LightGrey}
                                    icon='lock'
                                    passwordField={true}
                                    secureTextEntry={!showPassword}
                                    showPassword={showPassword}
                                    onPress={() => setShowPassword(!showPassword)}
                                />
                            </View>

                            <View style={{ marginTop: height_screen * 0.01 }}>
                                <View style={styles.currView}>
                                    <Text style={styles.currText}>{languageData?.confirm_new_password}</Text>
                                </View>
                                <InputText
                                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                                    value={confirmPassword}
                                    placeholder={languageData?.confirm_password_placeholder}
                                    placeholderTextColor={Color.LightGrey}
                                    icon='lock'
                                    passwordField2={true}
                                    secureTextEntry={!showPassword2}
                                    showPassword={showPassword2}
                                    onPress={() => setShowPassword2(!showPassword2)}
                                />
                            </View>

                            <TouchableOpacity disabled={loading} style={styles.BtnView} onPress={onSubmit} >
                                <Text style={styles.BtnText}>{languageData?.update_btn}</Text>
                                {
                                    loading ?
                                        <ActivityIndicator size={17} color={Color.White} style={{ position: 'absolute', right: 7 }} />
                                        :
                                        null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView >
    );
}


export default ChangePassword;
