import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native';
import Loader from '../../Components/Loader';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { height_screen, width_screen } from '../../Utils/Dimentions';
import Color from '../../Utils/Color';
// import PieChart from 'react-native-pie-chart';
import CircularProgress from '../../Components/CircularProgress';
import Header from '../../Components/Header';
import { FlatList } from 'react-native/Libraries/Lists/FlatList';
import { setSchedule } from '../../redux/Schedule/ScheduleActions';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import moment from 'moment';
import Font from '../../Utils/Font';


const Schedule = ({ navigation }) => {

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dispatch = useDispatch();
    const schedule = useSelector((state) => state.schedule.schedule);
    const loading = useSelector((state) => state?.appLoading?.loading);
    const [day, setDay] = useState('');
    const languageData = useSelector((state) => state?.language?.language_data);



    useEffect(() => {
        const d = new Date();
        setDay(weekday[d.getDay()]);

        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setSchedule());
        });
        return () => {
            unsubscribe;
        };

    }, [navigation]);

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading && !schedule ?
                    <Loader />
                    :
                    null
            }

            <View style={{ flex: 1 }}>
                <View style={{ zIndex: 1 }}>
                    <Toast position='top' />
                </View>

                <Header title={languageData?.focus_schedule_title} navigation={navigation} />

                <View style={styles.bodyView} >

                    <ScrollView style={styles.dutyView} showsVerticalScrollIndicator={false} >
                        <Text style={styles.dutyText}>{languageData?.duty_time}:</Text>

                        {
                            schedule?.length != 0 ?
                                <View>
                                    <View style={styles.dutyHeaderView}>

                                        <View style={styles.dayView}>
                                            <Icon name='calendar' size={height_screen * 0.024} Color='grey' color={Color.PrimaryColor} style={{ marginRight: 5 }} />
                                            <Text style={styles.dayText}>{languageData?.days}</Text>
                                        </View>
                                        <View style={styles.dayView}>
                                            <Icon name='clock' size={height_screen * 0.024} Color='grey' color={Color.PrimaryColor} style={{ marginRight: 5 }} />
                                            <Text style={styles.dayText}>{languageData?.time}</Text>
                                        </View>

                                    </View>

                                    {/* <View style={styles.dutyBodyView}>
                            <View>
                                <Text style={styles.bodyText}>Monday</Text>
                            </View>
                            <View>
                                <Text style={styles.bodyText}>9 AM - 5 PM</Text>
                            </View>
                        </View> */}

                                    {
                                        schedule?.map((value, index) => {
                                            return (
                                                value?.status === true ?
                                                    <View key={index} style={styles.dutyBodyView}>
                                                        <View>
                                                            <Text style={[styles.bodyText, { fontFamily: (value?.days) == day ? Font.Bold : Font.Regular }]}>{value?.days}</Text>
                                                        </View>
                                                        <View>
                                                            <Text style={[styles.bodyText, { fontFamily: (value?.days) == day ? Font.Bold : Font.Regular }]}>{moment(value?.start_time).format("hh:mm A")} - {moment(value?.end_time).format("hh:mm A")} </Text>
                                                        </View>
                                                    </View>
                                                    :
                                                    null
                                            )
                                        })
                                    }

                                    <View style={styles.centerLine}></View>
                                    <View>
                                        <Text style={styles.dutyText}>{languageData?.break_time}:</Text>

                                        <View>
                                            <View style={styles.dutyHeaderView}>

                                                <View style={styles.dayView}>
                                                    <Icon name='calendar' size={height_screen * 0.024} Color='grey' color={Color.PrimaryColor} style={{ marginRight: 5 }} />
                                                    <Text style={styles.dayText}>{languageData?.days}</Text>
                                                </View>
                                                <View style={styles.dayView}>
                                                    <Icon name='clock' size={height_screen * 0.024} Color='grey' color={Color.PrimaryColor} style={{ marginRight: 5 }} />
                                                    <Text style={styles.dayText}>{languageData?.time}</Text>
                                                </View>

                                            </View>

                                            {
                                                schedule?.map((value, index) => {
                                                    return (
                                                        value.status === true ?
                                                            <View key={index} style={styles.dutyBodyView}>
                                                                <View>
                                                                    <Text style={[styles.bodyText, { fontFamily: (value?.days) == day ? Font.Bold : Font.Regular }]}>{value.days}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={[styles.bodyText, { fontFamily: (value?.days) == day ? Font.Bold : Font.Regular }]}>{moment(value?.break_timestart).format("hh:mm A")} - {moment(value?.break_timeend).format("hh:mm A")} </Text>
                                                                </View>
                                                            </View>
                                                            :
                                                            null
                                                    )
                                                })
                                            }

                                        </View>
                                    </View>

                                    <View style={styles.centerLine}></View>

                                    <View>
                                        <Text style={styles.dutyText}>{languageData?.schedule_holiday}:</Text>

                                        <View>
                                            <View style={styles.dutyHeaderView}>

                                                <View style={styles.dayView}>
                                                    <Icon name='calendar' size={height_screen * 0.024} Color='grey' color={Color.PrimaryColor} style={{ marginRight: 5 }} />
                                                    <Text style={styles.dayText}>{languageData?.days}</Text>
                                                </View>

                                            </View>

                                            {
                                                schedule?.map((value, index) => {
                                                    return (
                                                        value.status === false ?
                                                            <View key={index} style={styles.dutyBodyView}>
                                                                <View>
                                                                    <Text style={[styles.bodyText, { fontFamily: (value?.days) == day ? Font.Bold : Font.Regular }]}>{value.days}</Text>
                                                                </View>
                                                                <View>
                                                                    <Text style={[styles.bodyText, { fontFamily: (value?.days) == day ? Font.Bold : Font.Regular }]}>{languageData?.schedule_holiday}</Text>
                                                                </View>
                                                            </View>
                                                            :
                                                            null
                                                    )
                                                })
                                            }

                                        </View>
                                    </View>

                                </View>
                                :
                                <Text style={[styles.bodyText, { fontFamily: Font.Bold, alignSelf: 'center', marginTop: height_screen * 0.05 }]}>Schedule is not added yet!</Text>
                        }
                    </ScrollView>


                </View>
            </View>


        </SafeAreaView>
    );
}


export default Schedule;
