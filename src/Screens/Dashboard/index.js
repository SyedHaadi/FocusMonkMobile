import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    NativeModules,
    Text,
    TouchableOpacity,
    useColorScheme,
    ActivityIndicator,
    View,
    Platform,
    Alert,
} from 'react-native';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import { height_screen } from '../../Utils/Dimentions';
import Color from '../../Utils/Color';
import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getTimeData, getUserData } from '../../redux/User/UserActions';
import { setSchedule } from '../../redux/Schedule/ScheduleActions';
import { getRankStatus, setApps } from '../../redux/Apps/AppsAction';
import { CommonActions } from '@react-navigation/native';

import Loader from '../../Components/Loader';
import BackgroundService from 'react-native-background-actions';
import { getLocalStorage, setLocalStorage, removeLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
import { setAppLoading } from '../../redux/AppLoader/appLoaderAction';
import axios from 'axios';
import { baseUrl } from '../../config/http';
import Toast from 'react-native-toast-message';
import DeviceInfo from 'react-native-device-info';
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

    const loading = useSelector((state) => state?.appLoading?.loading);

    const scaleable = scaleableData?.scaleable;

    const test = 'FocusMonk';
    let coinsum;

    useEffect(() => {
        checkSchedule();
    }, [emptySchedule])

    useEffect(() => {
        checkApps();
    }, [emptyApps, canCheckApps])

    useEffect(() => {

        setIds();
        startBackgroundService();
        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getUserData(navigation));
            dispatch(getRankStatus());
            dispatch(getTimeData());
            dispatch(setApps());
        });
        return () => {
            unsubscribe;
        };
    }, [navigation]);

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
            Alert.alert(`The Schedule is not Found.\n\n ${isAdmin == true
                ? "Please ask your manager to add your Duty schedule."
                : "Please add your schedule to the dashboard."
                }`);
            return;
        }
        setCanCheckApps(true);
    }

    const checkApps = async () => {

        const isAdmin = await getLocalStorage(STORAGE_KEYS.IS_ADMIN);

        if (canCheckApps) {
            if (!emptySchedule) {
                if (emptyApps) {
                    Alert.alert(`The Apps Environment is not Found.\n\n ${isAdmin == true
                        ? "Please ask your manager to add your Apps Environment."
                        : "Please add your Apps Environment to the dashboard."
                        }`);
                }
            }
        }
    }

    const cronJobFunction = async () => {
        const checklogin = await getLocalStorage(STORAGE_KEYS.TOKEN);
        if (checklogin) {
            let status = await calculate_schedule();

            console.log("Duty Time: ", status);

            setTimeout(async () => {
                if (status == true) {
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
                        });
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
                        console.log("In the Catch ....");
                        console.log("...." + error);

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
                                console.log("In the Conditions ....");
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
                            return false;
                        }
                    } else if (index == lastindex) {
                        let y = current_hour + ":" + check[0].end_minute;
                        let z = current_hour + ":" + current_minute;
                        if (z >= y) {
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
                            return false;
                        }
                    } else {
                        return calculate_break(check);
                    }
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
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
        // console.log("This is the device and user Data to send .....", deviceId, userToken)

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
            const totalper = (coindiff / scalediff) * 100;
            totalCoins = scaleable[3];
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ?
                    <Loader />
                    :
                    null
            }

            <Header title='My Performance' navigation={navigation} />

            <View style={styles.bodyView} >
                <View style={styles.profileView}>

                    <View style={styles.ImgView}>
                        <Image source={{ uri: userData?.image }} style={styles.img} />
                    </View>

                    <View style={styles.nameView}>
                        <Text style={styles.nameText} >
                            {
                                userData ?
                                    ((userData?.first_name + userData?.last_name)?.length > 22) ?
                                        (((userData?.first_name + userData?.last_name)?.substring(0, 22 - 3)) + ' ...') :
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
                                    <Text style={styles.companyText} >Company Name: <Text style={[styles.companyText, { color: Color.PrimaryColor, fontSize: height_screen * 0.018, }]} >
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
                        <Text style={styles.rankText} >Rank</Text>
                    </View>
                    <View style={styles.rView} >
                        <Text style={styles.rankText2} ># {userRank}</Text>
                    </View>
                    <View>
                        <Text style={styles.rankText} >Focus Level</Text>
                    </View>
                    {
                        userTrophy ?
                            Object.keys(userTrophy)?.length !== 0 ?
                                <View style={styles.trophyView} >
                                    <Text style={styles.trophyText} >{userTrophy?.title}</Text>
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

                <View style={styles.coinsView} >
                    <View>
                        <Text style={styles.coinsText} >Earning Coins Status</Text>
                    </View>
                    <View>
                        <Text style={styles.perText} >{percentage()?.toFixed(0)}%</Text>
                    </View>

                    <View style={{position:'relative'}}>
                        <View style={styles.lineView}>
                            <View style={{ height: '100%', width: `${percentage()?.toFixed(0)}%`, backgroundColor: Color.PrimaryColor, borderRadius: height_screen * 0.01, }}></View>
                        </View>
                        <Image source={require('../../Assets/icons/coin.png')} style={styles.coinImgView} />
                    </View>

                    <View style={styles.totalCoinsView}>
                        <View>
                            <Text style={styles.earnText}>Total Earnings</Text>
                            <Text style={styles.earnText2}>{scaleableData?.user[0]?.coins ? scaleableData?.user[0]?.coins + scaleableData?.user[0]?.extracoins : 0}</Text>
                        </View>
                        <View>
                            <Text style={styles.earnText}>Next Goal</Text>
                            <Text style={[styles.earnText2, { alignSelf: 'flex-end' }]}>{scaleableData?.scaleable[3]}</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.dutyTimeView}>
                    <View style={{ backgroundColor: '#d2f8d2', paddingHorizontal: height_screen * 0.009, paddingVertical: height_screen * 0.005, borderRadius: 7, marginTop: height_screen * 0.01 }}>
                        <Image source={require('../../Assets/icons/Clock2.png')} />
                    </View>
                    <View style={{ marginLeft: -5 }}>
                        <View style={{ width: '90%', alignSelf: 'flex-end', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[styles.timeText, { marginRight: 'auto', marginLeft: -height_screen * 0.015 }]}>Focus Time</Text>
                            <Text style={[styles.hoursText, { color: Color.Green }]} >
                                {timeData?.time
                                    ? timeData?.time?.hours_save + " hours"
                                    : "0 hours"}
                                &nbsp;
                                {timeData?.time
                                    ? timeData?.time?.minutes_save + " minutes"
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
                            <Text style={[styles.timeText, { marginRight: 'auto', marginLeft: -height_screen * 0.015 }]}>Distract Time</Text>
                            <Text style={[styles.hoursText, { color: Color.LightRed }]} >
                                {timeData?.time
                                    ? timeData?.time?.distracthour + " hours"
                                    : "0 hours"}
                                &nbsp;
                                {timeData?.time
                                    ? timeData?.time?.distractmin + " minutes"
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


        </SafeAreaView>
    );
}


export default Dashboard;
