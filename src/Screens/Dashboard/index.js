import React, { useEffect, useState, useRef } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    NativeModules,
    Text,
    AppState,
    TouchableOpacity,
    useColorScheme,
    Modal,
    ActivityIndicator,
    View,
    Platform,
    Alert,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { height_screen, width_screen } from '../../Utils/Dimentions';
import Color from '../../Utils/Color';
import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { checkDistraction, getTimeData, getUserData } from '../../redux/User/UserActions';
import { setSchedule } from '../../redux/Schedule/ScheduleActions';
import { getRankStatus, setApps } from '../../redux/Apps/AppsAction';
import { CommonActions } from '@react-navigation/native';
import KeepAwake from 'react-native-keep-awake';

import Loader from '../../Components/Loader';
import BackgroundService from 'react-native-background-actions';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
import { setAppLoading } from '../../redux/AppLoader/appLoaderAction';
import axios from 'axios';
import { baseUrl } from '../../config/http';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
import Font from '../../Utils/Font';
import { changeLanguage } from '../../redux/language/language.actions';
const { CalendarModule } = NativeModules;


const Dashboard = ({ navigation }) => {

    const dispatch = useDispatch();

    const userData = useSelector((state) => state?.userData?.user);
    const timeData = useSelector((state) => state?.userData?.timeData);
    const userRank = useSelector((state) => state?.apps?.userRank);
    const userTrophy = useSelector((state) => state?.apps?.userTrophy);
    const scaleableData = useSelector((state) => state?.apps?.scaleable);
    const emptySchedule = useSelector((state) => state.schedule.emptySchedule);
    const emptyApps = useSelector((state) => state.apps.emptyApps);
    const [canCheckApps, setCanCheckApps] = useState(false);
    const [checkAdmin, setCheckAdmin] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const engLanguage = { label: 'English', value: 'English' }
    const espLanguage = { label: 'Spanish', value: 'Spanish' }
    const prlanguage = { label: 'Portuguese', value: 'Portuguese' }
    const languageData = useSelector((state) => state?.language?.language_data);
    const [selectedLanguage, setSelectedLanguage] = useState('');
    const [status, setStatus] = useState(true);
    const [text, setText] = useState("");
    const [totalSeconds, setTotalSeconds] = useState();
    const [minutes, setMinutes] = useState();
    const [seconds, setSeconds] = useState();
    const [hours, sethours] = useState();
    const [counter, setCounter] = useState(0);
    const [appStatus, setAppStatus] = useState('');
    const prevAppState = useRef(AppState.currentState);
    const [isLocked, setIsLocked] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false)
    const [showAlert, setShowAlert] = useState(false);

    const setTrophy = async () => {
        const check = await getLocalStorage(STORAGE_KEYS.Current_Trophy);
        if (!check) {
            setLocalStorage(STORAGE_KEYS.Current_Trophy, userTrophy?.title)
        }
    }

    useEffect(() => {
        if (userTrophy) {
            setTrophy()
        }
    }, [userTrophy])


    const loading = useSelector((state) => state?.appLoading?.loading);

    const scaleable = scaleableData?.scaleable;
    const isIPhone = Platform.OS === 'ios';

    const test = 'FocusMonk';
    let coinsum;

    const distractionFunc = async (status) => {
        if (Platform.OS === 'ios') {
            const deviceId = await DeviceInfo.getUniqueId();
            const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
            const userId = await getLocalStorage(STORAGE_KEYS.USER_ID);
            const dutyDay = await getLocalStorage(STORAGE_KEYS.Duty_Day);

            const currState = AppState.currentState;

            let newStatus;
            if (Platform.OS === 'ios') {
                if (currState === 'active') {
                    newStatus = status;
                } else {
                    if (isLocked) {
                        newStatus = status;
                    } else if (!isLocked && currState === 'background') {
                        newStatus = false;
                    } else {
                        newStatus = status;
                    }
                }
            } else {
                newStatus = status;
            }

            const body = {
                status: newStatus,
                company_id: companyId,
                device: `${deviceId}-IOS`,
                employee_id: userId,
                dutyDay: dutyDay,
            };

            if (dutyDay) {
                dispatch(checkDistraction(body))
            }
        }
    }

    // useEffect(() => {
    //     if (Platform.OS == 'ios') {
    //         setAlertOpen(true);
    //         Alert.alert(languageData?.COINS_PROMPT, languageData?.Keep_Active, [
    //             { text: 'OK', onPress: () => setAlertOpen(false) },
    //         ]);
    //     }
    // }, [])

    // useEffect(() => {
    //     if (showAlert && Platform.OS === 'ios') {
    //         Alert.alert(
    //             languageData?.COINS_PROMPT,
    //             languageData?.Keep_Active,
    //             [
    //                 {
    //                     text: 'OK',
    //                     onPress: () => {
    //                         setAlertOpen(false);
    //                         setShowAlert(false);
    //                     },
    //                 },
    //             ],
    //             { cancelable: false }
    //         );
    //     }
    // }, [showAlert]);

    useEffect(() => {
        const appStateSubscription = AppState.addEventListener('change', async (nextAppState) => {
            setCounter((prevState) => prevState + 1);
            // setAppStatus(nextAppState);

            if (nextAppState !== 'active') {
                // if (Platform.OS == 'ios') {
                //     if (!alertOpen) {
                //         setAlertOpen(true);
                //         Alert.alert(`Don't Miss Out on Coins!`, 'Keep the app active and stay engaged to earn your coins.', [
                //             { text: 'OK', onPress: () => setAlertOpen(false) },
                //         ]);
                //     }
                // }
                if (!alertOpen) {
                    setAlertOpen(true);
                    setShowAlert(true);
                }
            }

            if (nextAppState === 'active' && prevAppState.current == 'background') {
                if (Platform.OS === 'ios') {
                    const ch = await getLocalStorage(STORAGE_KEYS.Counter);
                    const check = JSON.parse(ch);
                    if (!check) {
                        const d = new Date();
                        setLocalStorage(STORAGE_KEYS.Counter, JSON.stringify(true));
                        setLocalStorage(STORAGE_KEYS.Counter_Date, JSON.stringify(d));
                    }
                    setCounter(0);
                }
            }
            prevAppState.current = nextAppState;

        });

        return () => appStateSubscription.remove();
    }, []);

    useEffect(() => {
        KeepAwake.activate();
    }, [])

    useEffect(() => {
        if (counter >= 2) {
            if (Platform.OS === 'ios') {
                const d = new Date();
                setLocalStorage(STORAGE_KEYS.Counter, JSON.stringify(false));
                setLocalStorage(STORAGE_KEYS.Counter_Date, JSON.stringify(d));
                setIsLocked(true);
            }
        } else {
            setIsLocked(false);
        }
    }, [counter])

    useEffect(() => {
        checkSchedule();
    }, [emptySchedule])

    useEffect(() => {
        checkApps();
    }, [emptyApps, canCheckApps])

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

        setIds();
        startBackgroundService();
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getRankStatus());
            dispatch(getTimeData());
            dispatch(setApps());
            dispatch(getUserData(navigation));
        });
        return () => {
            unsubscribe;
        };
    }, [navigation]);

    // Timer Calculator .....

    useEffect(() => {
        const timer = setInterval(async () => {

            const a = await getLocalStorage(STORAGE_KEYS.Counter)
            const b = await getLocalStorage(STORAGE_KEYS.Counter_Date)
            let data = JSON.parse(a)
            let d = JSON.parse(b);

            let x = new Date(d);
            let y = new Date();

            let s = Math.floor(Math.abs(x - y) / 1000);
            let ss = await calculate_schedule();

            setStatus(ss);
            if (data == false || ss == false) {
                setTotalSeconds(0);
                setMinutes(0);
                setSeconds(0);
            } else {
                setTotalSeconds(s);
            }
        }, 1200);

        // Clear the interval when the component is unmounted
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Calculate minutes and seconds from totalSeconds
        let calculatedMinutes = Math.floor(totalSeconds / 60);
        const calculatedHours = Math.floor(totalSeconds / 3600);
        const calculatedSeconds = totalSeconds % 60;

        if (calculatedHours > 0) {
            let totalhour = calculatedHours * 60;
            calculatedMinutes = calculatedMinutes - totalhour;
        }

        // Update the separate minute and second states
        setMinutes(calculatedMinutes);
        setSeconds(calculatedSeconds);
        sethours(calculatedHours);

        // if (calculatedMinutes >= 1) {
        //     window?.electron?.store?.set("counterdate", new Date());
        // }

        // Reset the timer to 1 minute if totalSeconds reaches 0
        if (totalSeconds === 0) {
            setTotalSeconds(0);
            setMinutes(0);
            setSeconds(0);
        }
    }, [totalSeconds]);

    const sleep = (time) => new Promise((resolve) => setTimeout(() => resolve(), time));

    const veryIntensiveTask = async (taskDataArguments) => {
        // Example of an infinite loop task
        const { delay } = taskDataArguments;
        await new Promise(async (resolve) => {
            for (let i = 0; BackgroundService.isRunning(); i++) {
                cronJobFunction();
                await sleep(delay);
            }
        });
    };

    const checkSchedule = async () => {

        const isAdmin = await getLocalStorage(STORAGE_KEYS.IS_ADMIN);

        if (emptySchedule) {
            Alert.alert(languageData?.SCHEDULE_NOT_FOUND, isAdmin == true
                ? languageData?.Add_Schedule
                : languageData?.ADD_SCHEDULE_TO_DASHBOARD
            );
            return;
        }
        setCanCheckApps(true);
    }

    const checkApps = async () => {

        const isAdmin = await getLocalStorage(STORAGE_KEYS.IS_ADMIN);

        if (canCheckApps) {
            if (!emptySchedule) {
                if (emptyApps) {
                    Alert.alert(languageData?.APPS_NOT_FOUND, isAdmin == true
                        ? languageData?.Add_Apps
                        : languageData?.ADD_ENVIRONMENT_TO_DASHBOARD
                    );
                }
            }
        }
    }

    const cronJobFunction = async () => {
        const checklogin = await getLocalStorage(STORAGE_KEYS.TOKEN);
        if (checklogin) {
            let status = await calculate_schedule();

            setTimeout(async () => {
                if (status == true) {

                    const ch = await getLocalStorage(STORAGE_KEYS.Counter);
                    const check = JSON.parse(ch);
                    if (!check) {
                        const d = new Date();
                        setLocalStorage(STORAGE_KEYS.Counter, JSON.stringify(true));
                        setLocalStorage(STORAGE_KEYS.Counter_Date, JSON.stringify(d));
                    }
                    distractionFunc(true);

                    const companyId = await getLocalStorage(STORAGE_KEYS.COMPANY_ID);
                    const userId = await getLocalStorage(STORAGE_KEYS.USER_ID);
                    const token = await getLocalStorage(STORAGE_KEYS.TOKEN);
                    const date = new Date();
                    let current_day = date.getDay();

                    try {
                        const body = {
                            "id": userId,
                            "company_id": companyId,
                            "day": current_day
                        }
                        const response = await axios.post(`${baseUrl}/managment/calculation`, body, {
                            headers: {
                                'x-access-token': token
                            }
                        })
                        if (response?.status === 200) {
                            if (response?.data?.coin) {
                                Toast.show({
                                    type: 'success',
                                    text1: response?.data?.message,
                                });

                                dispatch(getRankStatus(true));
                                dispatch(getTimeData(true));
                                dispatch(setApps(true));

                            }
                        }

                    } catch (error) {
                        dispatch(setAppLoading(false));

                        if (error.toJSON().message === 'Network Error') {
                            Toast.show({
                                type: 'error',
                                text1: 'No internet connection !',
                            });
                        }
                        else if (error?.response) {
                            if (
                                error?.response?.data?.message == "Unauthorized" ||
                                error?.response?.status == 401
                            ) {
                                try {

                                    removeLocalStorage(STORAGE_KEYS.TOKEN);
                                    CalendarModule.createCalendarEvent('clear', "");

                                    stopBackgroundService();
                                    navigation.dispatch(
                                        CommonActions.reset({
                                            index: 1,
                                            routes: [
                                                { name: 'Login' },
                                            ],
                                        })
                                    );
                                } catch (err) {
                                    console.log(err);
                                }

                            }
                        }
                    }

                }

            }, 2000);

        }
    }

    const options = {
        taskName: test,
        taskTitle: test,
        taskDesc: 'FocusMonk Running in Background',
        taskIcon: {
            name: 'splashscreen',
            type: 'drawable',
            package: 'com.focusmonk'
        },
        color: '#ff00ff',
        linkingURI: 'yourSchemeHere://chat/jane', // See Deep Linking for more info
        parameters: {
            delay: 60000,
        },
    };

    // const removeNotification = async () => {
    //     try {
    //         await BackgroundService.removeNotification();
    //         console.log('Notification removed successfully');
    //     } catch (error) {
    //         console.log('Error removing notification:', error);
    //     }
    // };

    async function calculate_schedule() {
        let d = await getLocalStorage(STORAGE_KEYS.ScheduleData);
        const schedule = JSON.parse(d);

        const date = new Date();
        let current_hour = date.getHours();
        let current_minute = date.getMinutes();
        let current_day = date.getDay();

        let check = schedule?.filter((element) => {
            return element?.day == current_day ? true : false;
        });

        if (check) {
            if (check[0]?.day) {

                setLocalStorage(STORAGE_KEYS.Duty_Day, JSON.stringify(check[0]?.day));
                let hours = check[0].duty_hours;

                if (hours.includes(current_hour)) {
                    let index = hours.indexOf(current_hour);
                    let lastindex = hours.length - 1;

                    if (lastindex == 0) {
                        let y = current_hour + ":" + check[0].start_minute;
                        let z = current_hour + ":" + check[0].end_minute;
                        let x = current_hour + ":" + current_minute;
                        if (x >= y && x < z) {
                            return calculate_break(check);
                        } else {
                            setText(languageData?.duty_time_over);
                            return false;
                        }
                    } else if (index == lastindex) {
                        let y = current_hour + ":" + check[0].end_minute;
                        let z = current_hour + ":" + current_minute;
                        if (z >= y) {
                            setText(languageData?.duty_time_over);
                            return false;
                        } else {
                            return calculate_break(check);
                        }
                    } else if (index == 0) {
                        let y = current_hour + ":" + check[0].start_minute;
                        let z = current_hour + ":" + current_minute;

                        if (z >= y) {
                            return calculate_break(check);
                        } else {
                            setText(languageData?.duty_time_over);
                            return false;
                        }
                    } else {
                        return calculate_break(check);
                    }
                } else {
                    setText(languageData?.duty_time_over);
                    return false;
                }
            } else {
                setText(languageData?.today_holiday);
                return false;
            }
        } else {
            setText(languageData?.today_holiday);
            return false;
        }
    }

    function calculate_break(check) {
        let date = new Date();
        let current_hour = date.getHours();
        let current_minute = date.getMinutes();
        let break_hours = check[0].break_hours;

        if (break_hours.includes(current_hour)) {
            let lastindex = break_hours.length - 1;

            let y = break_hours[0] + ":" + check[0].break_start_minute;
            let z = break_hours[lastindex] + ":" + check[0].break_end_minute;
            let x = current_hour + ":" + current_minute;

            if (x >= y && x < z) {
                setText(languageData?.break_time);
                return false;
            } else {
                return true;
            }

        } else {
            return true;
        }
    }


    async function setIds() {
        const deviceId = await DeviceInfo.getUniqueId();
        const userToken = await getLocalStorage(STORAGE_KEYS.TOKEN);
        const iAdmin = await getLocalStorage(STORAGE_KEYS.IS_ADMIN);
        setCheckAdmin(iAdmin);

        if (Platform.OS == 'android') {
            CalendarModule.createCalendarEvent('token', userToken);
            CalendarModule.createCalendarEvent('device', deviceId);
        }
    }

    const percentage = () => {
        if (scaleableData) {
            const scalediff = scaleable[3];
            coinsum = scaleableData.user[0]?.coins + scaleableData.user[0]?.extracoins;
            const coindiff = coinsum - scaleable[0];
            const totalper = (coinsum / scalediff) * 100;
            return totalper;
        }
        else {
            return 0;
        }
    }

    function calculate_percent(hour, minute) {
        let a = hour * 60;
        let b = minute;
        let final = a + b;
        let total = 24 * 60;
        let totalTime = final / total;
        let per = totalTime * 100;

        return per;
    }

    const startBackgroundService = async () => {
        if (!BackgroundService.isRunning()) {
            await BackgroundService.start(veryIntensiveTask, options);
        }

    }

    const stopBackgroundService = async () => {
        await BackgroundService.stop();
    }

    const languageChanger = () => {

    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading && !userData ?
                    <Loader />
                    :
                    null
            }

            <View style={{ flex: 1 }}>
                <View style={{ zIndex: 1 }}>
                    <Toast position='top' />
                </View>

                <Header heading="Dashboard" title={languageData?.my_performance} navigation={navigation} onPress={() => setModalVisible(true)} />

                <View style={styles.bodyView} >
                    <View style={styles.profileView}>

                        <View>
                            <Modal
                                animationType="slide"
                                transparent={true}
                                visible={modalVisible}
                                onRequestClose={() => {
                                    setModalVisible(false)
                                }}>
                                <TouchableOpacity onPress={() => setModalVisible(false)} style={{ zIndex: 10, position: 'absolute', right: 0, marginRight: width_screen * 0.03, marginTop: height_screen * 0.14 }}>
                                    <Ionicons name='close-circle-outline' color={Color.Black} size={height_screen * 0.036} />
                                </TouchableOpacity>
                                <View style={styles.centeredView}>

                                    <View style={{ backgroundColor: Color.White, height: height_screen * 0.3, width: width_screen * 0.7, borderRadius: 10, justifyContent: 'space-around' }}>
                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(false);
                                            dispatch(changeLanguage(engLanguage))
                                        }} style={{ backgroundColor: Color.PrimaryColor, padding: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width_screen * 0.05 }}>
                                            <Text style={{ fontFamily: Font.Medium, color: Color.White, fontSize: height_screen * 0.02 }}>English</Text>
                                            <Image source={require('../../Assets/icons/en.png')} style={styles.flagView} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(false)
                                            dispatch(changeLanguage(espLanguage))
                                        }} style={{ backgroundColor: Color.PrimaryColor, padding: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width_screen * 0.05 }}>
                                            <Text style={{ fontFamily: Font.Medium, color: Color.White, fontSize: height_screen * 0.02 }}>Spanish</Text>
                                            <Image source={require('../../Assets/icons/sp.png')} style={styles.flagView} />
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => {
                                            setModalVisible(false)
                                            dispatch(changeLanguage(prlanguage))
                                        }} style={{ backgroundColor: Color.PrimaryColor, padding: 5, width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: width_screen * 0.05 }}>
                                            <Text style={{ fontFamily: Font.Medium, color: Color.White, fontSize: height_screen * 0.02 }}>Portuguese</Text>
                                            <Image source={require('../../Assets/icons/pr.png')} style={styles.flagView} />
                                        </TouchableOpacity>

                                    </View>

                                </View>
                            </Modal>
                        </View>

                        <View style={styles.ImgView}>
                            <Image source={{ uri: userData?.image }} style={styles.img} />
                        </View>

                        <View style={styles.nameView}>
                            <Text style={styles.nameText} >
                                {
                                    userData ?
                                        ((userData?.first_name + userData?.last_name)?.length > 22) ?
                                            (((userData?.first_name + " " + userData?.last_name)?.substring(0, 22 - 3)) + ' ...') :
                                            userData?.first_name + ' ' + userData?.last_name
                                        :
                                        null
                                }
                            </Text>
                            <Text style={styles.devText} >
                                {
                                    ((userData?.designation)?.length > 27) ?
                                        (((userData?.designation)?.substring(0, 27 - 3)) + ' ...') :
                                        userData?.designation
                                }
                            </Text>
                            {
                                userData ?
                                    userData?.company_id?.isCompanyadmin ?
                                        <Text style={styles.companyText} >{languageData?.company_name} <Text style={[styles.companyText, { color: Color.PrimaryColor, fontSize: height_screen * 0.018, }]} >
                                            {
                                                ((userData?.company_id?.companyname)?.length > 15) ?
                                                    (((userData?.company_id?.companyname)?.substring(0, 15 - 3)) + ' ...') :
                                                    userData?.company_id?.companyname
                                            }
                                        </Text>
                                        </Text>
                                        :
                                        null
                                    :
                                    null
                            }
                        </View>
                    </View>

                    <View style={styles.rankView} >
                        <View>
                            <Text style={styles.rankText} >{languageData?.rank}</Text>
                        </View>
                        <View style={styles.rView} >
                            <Text style={[styles.rankText2, { fontSize: height_screen * 0.013 }]} ># {userRank}</Text>
                        </View>
                        <View>
                            <Text style={styles.rankText} >{languageData?.focus_level}</Text>
                        </View>
                        {
                            userTrophy ?
                                Object.keys(userTrophy)?.length !== 0 ?
                                    <View style={styles.trophyView} >
                                        <Text style={[styles.trophyText, { fontSize: height_screen * 0.013 }]} >{userTrophy?.title}</Text>
                                        <Image source={{ uri: userTrophy?.image }} style={styles.trophyImg} />
                                    </View>
                                    :
                                    <View>
                                        <Text style={styles.earnText}>No Trophy Yet !</Text>
                                    </View>
                                :
                                null
                        }
                    </View>

                    {status == false ?
                        <View style={{ alignSelf: 'center', backgroundColor: Color.PrimaryColor, paddingHorizontal: width_screen * 0.02, paddingVertical: height_screen * 0.005, borderRadius: 5 }}>
                            <Text style={[styles.currText, { color: Color.White }]}>{text}</Text>
                        </View>
                        :
                        <View style={{ paddingVertical: height_screen * 0.005 }}>
                            <Text style={styles.currText}>{languageData?.current_focus_time}</Text>
                        </View>
                    }

                    <View style={{ flexDirection: 'row', marginTop: height_screen * 0.005, justifyContent: 'space-between', alignItems: 'center', }}>
                        <View style={{ width: width_screen * 0.2, alignItems: 'center' }}>
                            <Text style={styles.timerTitle}>{languageData?.hours}</Text>

                        </View>

                        <View style={{ width: width_screen * 0.2, alignItems: 'center' }}>
                            <Text style={styles.timerTitle}>{languageData?.minutes}</Text>

                        </View>

                        <View style={{ width: width_screen * 0.2, alignItems: 'center' }}>
                            <Text style={styles.timerTitle}>{languageData?.seconds}</Text>

                        </View>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: height_screen * 0.02 }}>
                        <View style={{ width: width_screen * 0.2, alignItems: 'center' }}>
                            <View style={styles.timerView}>
                                <Text style={[styles.timerText, { color: status == false ? Color.Grey : Color.Black }]}>{hours ? (hours < 10 ? "0" + hours : hours) : "00"}</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: Font.Bold, fontSize: height_screen * 0.02 }}>:</Text>

                        <View style={{ width: width_screen * 0.2, alignItems: 'center' }}>
                            <View style={styles.timerView}>
                                <Text style={[styles.timerText, { color: status == false ? Color.Grey : Color.Black }]}>{minutes ? (minutes < 10 ? "0" + minutes : minutes) : "00"}</Text>
                            </View>
                        </View>
                        <Text style={{ fontFamily: Font.Bold, fontSize: height_screen * 0.02 }}>:</Text>

                        <View style={{ width: width_screen * 0.2, alignItems: 'center' }}>
                            <View style={styles.timerView}>
                                <Text style={[styles.timerText, { color: status == false ? Color.Grey : Color.Black }]}>{seconds ? (seconds < 10 ? "0" + seconds : seconds) : "00"}</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.coinsView} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: height_screen * 0.02 }}>
                            <Text style={styles.coinsText} >{languageData?.focus_level}</Text>
                            <Text style={styles.perText} >{percentage()?.toFixed(0)}%</Text>
                        </View>

                        <View style={{ position: 'relative' }}>
                            <View style={styles.lineView}>
                                <View style={{ height: '100%', width: `${percentage()?.toFixed(0)}%`, backgroundColor: Color.PrimaryColor, borderRadius: height_screen * 0.01, }}></View>
                                <Image source={require('../../Assets/icons/cn.png')} style={[styles.coinImgView, { left: `${percentage()?.toFixed(0)}%`, }]} />
                            </View>
                        </View>

                        <View style={styles.totalCoinsView}>
                            <View>
                                <Text style={styles.earnText}>{languageData?.total_earnings}</Text>
                                <Text style={styles.earnText2}>{scaleableData?.user[0]?.coins ? (scaleableData?.user[0]?.coins + scaleableData?.user[0]?.extracoins).toLocaleString("en-US") : 0}</Text>
                            </View>
                            <View>
                                <Text style={styles.earnText}>{languageData?.next_goal}</Text>
                                <Text style={[styles.earnText2, { alignSelf: 'flex-end' }]}>{scaleableData?.scaleable[3].toLocaleString("en-US")}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={styles.dutyTimeView}>
                        <View style={{ backgroundColor: '#d2f8d2', paddingHorizontal: height_screen * 0.009, paddingVertical: height_screen * 0.005, borderRadius: 7, marginTop: height_screen * 0.01 }}>
                            <Image source={require('../../Assets/icons/Clock2.png')} />
                        </View>
                        <View style={{ marginLeft: -5 }}>
                            <View style={{ width: '90%', alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[styles.timeText, { marginRight: 'auto', marginLeft: -height_screen * 0.015 }]}>{languageData?.focus_time}</Text>
                                <Text style={[styles.hoursText, { color: Color.Green }]} >
                                    {timeData?.time
                                        ? timeData?.time?.hours_save + " " + languageData?.hours
                                        : "0 " + languageData?.hours}
                                    &nbsp;
                                    {timeData?.time
                                        ? timeData?.time?.minutes_save + " " + languageData?.minutes
                                        : ""}
                                </Text>
                            </View>

                            <View style={styles.hoursLineView}>
                                <View style={{ height: '100%', width: timeData ? `${calculate_percent(timeData?.time?.hours_save, timeData?.time?.minutes_save)}%` : 0, backgroundColor: Color.Green, borderRadius: height_screen * 0.01, }}></View>
                            </View>
                        </View>
                    </View>


                    <View style={{ width: '90%', borderBottomWidth: 0.22, borderColor: Color.Grey, alignSelf: 'center' }}></View>
                    <View style={{ width: '90%', borderBottomWidth: 0.2, borderColor: Color.Grey, alignSelf: 'center' }}></View>

                    <View style={styles.dutyTimeView}>
                        <View style={{ backgroundColor: '#FED6D6', paddingHorizontal: height_screen * 0.009, paddingVertical: height_screen * 0.005, borderRadius: 7, marginTop: height_screen * 0.01 }}>
                            <Image source={require('../../Assets/icons/Clock3.png')} />
                        </View>
                        <View style={{ marginLeft: -5 }}>
                            <View style={{ width: '90%', alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Text style={[styles.timeText, { marginRight: 'auto', marginLeft: -height_screen * 0.015 }]}>{languageData?.distract_time}</Text>
                                <Text style={[styles.hoursText, { color: Color.LightRed }]} >
                                    {timeData?.time
                                        ? timeData?.time?.distracthour + " " + languageData?.hours
                                        : "0 " + languageData?.hours}
                                    &nbsp;
                                    {timeData?.time
                                        ? timeData?.time?.distractmin + " " + languageData?.minutes
                                        : ""}
                                </Text>
                            </View>
                            <View style={styles.hoursLineView}>
                                <View style={{ height: '100%', width: timeData ? `${calculate_percent(timeData?.time?.distracthour, timeData?.time?.distractmin)}%` : 0, backgroundColor: Color.LightRed, borderRadius: height_screen * 0.01, }}></View>
                            </View>
                        </View>
                    </View>



                    {/* <View style={styles.dutyTimeView}>
                    <View style={{ backgroundColor: '#FED6D6', paddingHorizontal: height_screen * 0.009, paddingVertical: height_screen * 0.005, borderRadius: 7, marginTop: height_screen * 0.01 }}>
                        <Image source={require('../../Assets/icons/Clock3.png')} />
                    </View>
                    <View style={{ marginLeft: -5 }}>
                        <View style={{ width: '90%', alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[styles.timeText, { marginRight: 'auto', marginLeft: -height_screen * 0.015 }]}>Total Duty Time</Text>
                            <Text style={[styles.hoursText, { color: Color.LightRed }]} >6 hours</Text>
                        </View>

                        <View style={styles.hoursLineView}>
                            <View style={{ height: '100%', width: '40%', backgroundColor: Color.LightRed, borderRadius: height_screen * 0.01, }}></View>
                        </View>
                    </View>
                </View> */}
                    {/* <View style={{ width: '90%', borderBottomWidth: 0.2, borderColor: Color.Grey, alignSelf: 'center' }}></View> */}


                </View>
            </View>


        </SafeAreaView >
    );
}


export default Dashboard;
