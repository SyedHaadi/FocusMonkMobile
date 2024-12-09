import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    ImageBackground,
    PermissionsAndroid,
    SafeAreaView,
    ScrollView,
    Pressable,
    StatusBar,
    ToastAndroid,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
    Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { height_screen, width_screen } from '../../Utils/Dimentions';
import Color from '../../Utils/Color';
import {
    launchCamera,
    launchImageLibrary
} from 'react-native-image-picker';
import CircularProgress from '../../Components/CircularProgress';
import Header from '../../Components/Header';
import EditInput from '../../Components/EditInput';
import { getUserData, updateUserData } from '../../redux/User/UserActions';
import { setAppLoading } from '../../redux/AppLoader/appLoaderAction';
import { useDispatch, useSelector } from 'react-redux';
import { getLocalStorage } from '../../shared/functions';
import axios from 'axios';
import { baseUrl } from '../../config/http';
import { STORAGE_KEYS } from '../../shared/constants';
import Loader from '../../Components/Loader';

const ProfileSetting = ({ navigation }) => {


    const languageData = useSelector((state) => state?.language?.language_data);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [position, setPosition] = useState('');
    const [number, setNumber] = useState('');
    const [email, setEmail] = useState('');
    const [filePath, setFilePath] = useState({});
    const [imageUri, setImageUri] = useState('https://w7.pngwing.com/pngs/419/473/png-transparent-computer-icons-user-profile-login-user-heroes-sphere-black-thumbnail.png');
    const [isImgUpdate, setIsImgUpdate] = useState(false);
    const [imgResponsePath, setImgResponsePath] = useState('');
    const dispatch = useDispatch();
    const user = useSelector((state) => state.userData.user);
    const loading = useSelector((state) => state?.appLoading?.loading);
    const [load, setLoad] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    //Getting User Data ....... 

    // const setData = () => {
    //     setFirstName(user?.first_name);
    //     setLastName(user?.last_name);
    //     setEmail(user?.email);
    //     setPosition(user?.designation);
    //     const num = JSON.stringify(user?.phonenumber);
    //     setNumber(num);
    //     setImageUri(user?.image);
    // }

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            setIsImgUpdate(false);
            dispatch(getUserData());
        });
        return () => {
            unsubscribe;
        };
    }, [navigation])

    useEffect(() => {
        console.log("Image .......", user?.image)
        setFirstName(user?.first_name);
        setLastName(user?.last_name);
        setEmail(user?.email);
        setPosition(user?.designation);
        const num = JSON.stringify(user?.phonenumber);
        setNumber(num);
        setImageUri(user?.image);

    }, [user])


    // Requesting Camera Permissions .......

    const requestCameraPermission = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.CAMERA,
                    {
                        title: 'Camera Permission',
                        message: 'App needs camera permission',
                    },
                );
                // If CAMERA Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                return false;
            }
        } else return true;
    };
    const requestExternalWritePermission = async () => {
        if (Platform.OS === 'android') {
            if (Number(Platform.Version) >= 33) {
                return true;
            }

            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'External Storage Write Permission',
                        message: 'App needs write permission',
                    },
                );
                // If WRITE_EXTERNAL_STORAGE Permission is granted
                return granted === PermissionsAndroid.RESULTS.GRANTED;
            } catch (err) {
                console.warn(err);
                alert('Write permission err', err);
            }
            return false;
        } else return true;
    };

    const captureImage = async (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
            saveToPhotos: true,
        };
        let isCameraPermitted = await requestCameraPermission();
        let isStoragePermitted = await requestExternalWritePermission();
        if (isCameraPermitted && isStoragePermitted) {
            launchCamera(options, (response) => {
                console.log('Response = ', response);

                if (response.didCancel) {
                    if (Platform.OS === 'android') {
                        ToastAndroid.show(languageData?.imageNotSelected, ToastAndroid.SHORT);
                    }
                    else {
                        // alert(languageData?.IMAGE_PICKER_CANCELLED);
                    }
                    return;
                } else if (response.errorCode == 'camera_unavailable') {
                    alert(languageData?.CAMERA_NOT_AVAILABLE);
                    return;
                } else if (response.errorCode == 'permission') {
                    alert(languageData?.PERMISSION_NOT_SATISFIED);
                    return;
                } else if (response.errorCode == 'others') {
                    alert(response.errorMessage);
                    return;
                }

                setFilePath(response?.assets[0]);
                setImageUri(response?.assets[0]?.uri);
                setIsImgUpdate(true);
            });
        }
    };

    const chooseFile = (type) => {
        let options = {
            mediaType: type,
            maxWidth: 300,
            maxHeight: 550,
            quality: 1,
        };
        launchImageLibrary(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                if (Platform.OS === 'android') {
                    ToastAndroid.show(languageData?.imageNotSelected, ToastAndroid.SHORT);
                }
                else {
                    // alert(languageData?.IMAGE_PICKER_CANCELLED);
                }
                return;
            } else if (response.errorCode == 'camera_unavailable') {
                alert(languageData?.CAMERA_NOT_AVAILABLE);
                return;
            } else if (response.errorCode == 'permission') {
                alert(languageData?.PERMISSION_NOT_SATISFIED);
                return;
            } else if (response.errorCode == 'others') {
                alert(response.errorMessage);
                return;
            }

            setFilePath(response?.assets[0]);
            setImageUri(response?.assets[0]?.uri);
            setIsImgUpdate(true);
        });
    };

    const onSubmit = async () => {
        setLoad(false);
        let imgPath;

        if (firstName === '' || lastName === '' || number === '' || position === '') {
            ToastAndroid.show('Please fill all the fields !', ToastAndroid.LONG);
            return;
        }

        if (firstName === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.firstName,
            });
            return;
        }
        if (lastName === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.lastName,
            });
            return;
        }
        if (number === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.phoneNumber,
            });
            return;
        }
        if (position === '') {
            Toast.show({
                type: 'error',
                text1: languageData?.enter_position,
            });
            return;
        }

        if (isImgUpdate) {

            // Delete Old Image First ....
            dispatch(setAppLoading(true));
            const token = await getLocalStorage(STORAGE_KEYS.TOKEN);
            const data = new FormData();
            data.append('image', imageUri);
            try {
                const response = await axios.post(`${baseUrl}/upload/delete`, data, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'x-access-token': token
                    }
                }
                );
                if (response?.status === 200) {
                    // console.log("Image Deleted successfully ......");
                }
            } catch (error) {
                // console.log("Image Upload Catch Error .......", error.response.data.message);
            }

            //Upload the image here .....

            const formData = new FormData();
            formData.append('image', {
                uri: imageUri,
                type: 'image/jpeg',
                name: 'photo.jpg'
            });

            try {
                const response = await axios.post(`${baseUrl}/upload/addimage`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        'x-access-token': token
                    }
                }
                );
                dispatch(setAppLoading(false));

                if (response?.status === 200) {
                    imgPath = response?.data?.path;
                    // console.log("Image Uploaded successfully ......")
                }

            } catch (error) {
                dispatch(setAppLoading(false));
                if (error?.response?.status == 504) {
                    Toast.show({
                        type: 'error',
                        text1: "Network Error",
                    });
                    return;
                }
                if (error?.response?.data) {
                    Toast.show({
                        type: 'error',
                        text1: error?.response?.data?.message,
                    });
                }
                return;
            }
        }
        let data = {
            "first_name": firstName,
            "last_name": lastName,
            "phonenumber": number,
            "designation": position,
        }

        if (isImgUpdate) {
            data = { ...data, "image": imgPath }
        }
        // console.log("User Data ...", isImgUpdate, data)


        const res = await dispatch(updateUserData(data));

        if (res) {
            setModalVisible(true);
        }
    }

    const closeAlert = () => {
        setModalVisible(false);
        // navigation.navigate('DashBoard')
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>

            {
                loading && load && !user ?
                    <Loader />
                    :
                    null
            }

            {/* <View style={{ zIndex: 1 }}>
                <Toast position='top' />
            </View> */}

            <Header title='Profile Setting' navigation={navigation} />

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: height_screen * 0.01 }}>
                <View style={styles.bodyView} >

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={closeAlert}
                    >
                        <View style={styles.modalBackground}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modalTitle}>Success!</Text>
                                <Text style={styles.modalDescription}>
                                    Your profile has been updated successfully.
                                </Text>

                                <Pressable style={styles.okButton} onPress={closeAlert}>
                                    <Text style={styles.buttonText}>OK</Text>
                                </Pressable>
                            </View>
                        </View>
                    </Modal>

                    <View style={styles.profileMainView}>
                        <View style={styles.profileView}>
                            <Text style={styles.proText}>{languageData?.set_profile_image}</Text>
                            {/* <TouchableOpacity style={styles.delView}>
                                <Text style={styles.delText}>Remove Image</Text>
                                <Icon name='trash' size={height_screen * 0.016} color={Color.White} />
                            </TouchableOpacity> */}
                        </View>

                        <View style={[styles.profileView, { marginTop: height_screen * 0.01 }]}>

                            <View style={styles.ImgView}>
                                <Image source={{ uri: imageUri }} style={styles.img} />
                            </View>
                            <View>
                                <TouchableOpacity style={styles.takeView} onPress={() => captureImage('photo')}>
                                    <Text style={styles.takeText}>{languageData?.take_photo}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.SelectView} onPress={() => chooseFile('photo')}>
                                    <Text style={styles.SelectText}>{languageData?.select_from_gallery}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={styles.FormView}>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: '2.5%' }}>
                            <EditInput
                                onChangeText={(firstName) => setFirstName(firstName)}
                                value={firstName}
                                placeholder={languageData?.enter_first_name}
                                placeholderTextColor={Color.LightGrey}
                                width='45'
                                title={languageData?.first_name}
                                editable={true}
                            // onPress={() => setShowPassword(!showPassword)}
                            />
                            <EditInput
                                onChangeText={(lastName) => setLastName(lastName)}
                                value={lastName}
                                placeholder={languageData?.enter_last_name}
                                placeholderTextColor={Color.LightGrey}
                                width='45'
                                title={languageData?.last_name}
                                editable={true}
                            // onPress={() => setShowPassword(!showPassword)}
                            />
                        </View>

                        <EditInput
                            onChangeText={(position) => setPosition(position)}
                            value={position}
                            placeholder={languageData?.enter_designation}
                            placeholderTextColor={Color.LightGrey}
                            width='95'
                            title={languageData?.position}
                            editable={true}
                        // onPress={() => setShowPassword(!showPassword)}
                        />
                        <EditInput
                            onChangeText={(number) => setNumber(number)}
                            value={number}
                            placeholder={languageData?.enter_phone_number}
                            placeholderTextColor={Color.LightGrey}
                            width='95'
                            title={languageData?.phone_number}
                            editable={true}
                            keyBoardType='number-pad'
                            maxDigits={15}
                        // onPress={() => setShowPassword(!showPassword)}
                        />
                        <EditInput
                            onChangeText={(email) => setEmail(email)}
                            value={email}
                            placeholder={languageData?.enter_email}
                            placeholderTextColor={Color.LightGrey}
                            width='95'
                            title={languageData?.email}
                            editable={false}
                        // onPress={() => setShowPassword(!showPassword)}
                        />

                        <TouchableOpacity disabled={loading} style={styles.BtnView} onPress={() => onSubmit()}>
                            <Text style={styles.BtnText}>{languageData?.submit}</Text>
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


        </SafeAreaView >
    );
}


export default ProfileSetting;
