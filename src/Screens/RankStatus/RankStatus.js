import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    Platform,
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
import Icon from 'react-native-vector-icons/FontAwesome';
import { height_screen, width_screen } from '../../Utils/Dimentions';
import Color from '../../Utils/Color';
import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getTotalRank, getTodayRank, getWeeklyRank, getMonthlyRank } from '../../redux/Apps/AppsAction';
import { getLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
import Font from '../../Utils/Font';
import Toast from 'react-native-toast-message';


const RankStatus = ({ navigation }) => {

    const dispatch = useDispatch();
    const rankList = useSelector((state) => state.apps.rankList);
    const [userId, setUserId] = useState('');
    const loading = useSelector((state) => state?.appLoading?.loading);
    const [selectedTab, setSelectedTab] = useState('Daily');
    const languageData = useSelector((state) => state?.language?.language_data);



    const getUserId = async () => {
        const id = await getLocalStorage(STORAGE_KEYS.USER_ID);
        setUserId(id);
    }

    const clickTab = (value) => {
        setSelectedTab(value);

        if (value == 'Daily') {
            dispatch(getTodayRank());
        } else if (value == 'Week') {
            dispatch(getWeeklyRank());
        } else if (value == 'Monthly') {
            dispatch(getMonthlyRank());
        } else {
            dispatch(getTotalRank());
        }
    }

    useEffect(() => {
        getUserId();

        const unsubscribe = navigation.addListener('focus', () => {
            setSelectedTab('Daily');
            dispatch(getTodayRank());

        });
        return () => {
            unsubscribe;
        };

    }, [navigation]);


    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ?
                    <Loader />
                    :
                    null
            }

            <View style={{ flex: 1 }}>

                <View style={{ zIndex: 1 }}>
                    <Toast position='top' />
                </View>

                <Header title={languageData?.rank_status} navigation={navigation} />

                <View style={styles.barView}>
                    <TouchableOpacity onPress={() => clickTab('Daily')} style={{ backgroundColor: selectedTab === "Daily" ? Color.PrimaryColor : null, borderTopLeftRadius: height_screen * 0.025, borderBottomLeftRadius: height_screen * 0.025, width: width_screen * 0.17, borderRightColor: Color.Grey, height: '100%', borderRightWidth: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Font.Medium, fontSize: height_screen * 0.018, color: selectedTab === "Daily" ? Color.White : Color.Grey, marginTop: Platform.OS === 'ios' ? height_screen * 0.0015 : height_screen * 0.0025 }} >{languageData?.daily}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => clickTab('Week')} style={{ backgroundColor: selectedTab === "Week" ? Color.PrimaryColor : null, width: width_screen * 0.17, borderRightColor: Color.Grey, height: '100%', borderRightWidth: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Font.Medium, fontSize: height_screen * 0.018, color: selectedTab === "Week" ? Color.White : Color.Grey, marginTop: Platform.OS === 'ios' ? height_screen * 0.0015 : height_screen * 0.0025 }}>{languageData?.week}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => clickTab('Monthly')} style={{ backgroundColor: selectedTab === "Monthly" ? Color.PrimaryColor : null, width: width_screen * 0.17, borderRightColor: Color.Grey, height: '100%', borderRightWidth: 0.7, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Font.Medium, fontSize: height_screen * 0.018, color: selectedTab === "Monthly" ? Color.White : Color.Grey, marginTop: Platform.OS === 'ios' ? height_screen * 0.0015 : height_screen * 0.0025 }}>{languageData?.monthly}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => clickTab('Total')} style={{ backgroundColor: selectedTab === "Total" ? Color.PrimaryColor : null, borderTopRightRadius: height_screen * 0.025, borderBottomRightRadius: height_screen * 0.025, width: width_screen * 0.166, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: Font.Medium, fontSize: height_screen * 0.018, color: selectedTab === "Total" ? Color.White : Color.Grey, marginTop: Platform.OS === 'ios' ? height_screen * 0.0015 : height_screen * 0.0025 }}>{languageData?.total}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.bodyView}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {
                            loading ?
                                null :
                                rankList?.length !== 0 ?
                                    rankList?.map((value, index) => (
                                        <View key={index} style={[styles.profileView, value?.emp_id[0]?._id === userId ? { borderRightWidth: 7, borderRightColor: Color.PrimaryColor, borderLeftWidth: 7, borderLeftColor: Color.PrimaryColor } : null]}>
                                            <View>
                                                <Image source={{ uri: value?.emp_id[0]?.image }} style={styles.img} />
                                            </View>

                                            <View style={styles.nameView}>
                                                <Text style={styles.nameText} >
                                                    {((value?.emp_id[0]?.first_name + value?.emp_id[0]?.last_name)?.length > 17) ?
                                                        (((value?.emp_id[0]?.first_name + value?.emp_id[0]?.last_name)?.substring(0, 17 - 3)) + ' ...') :
                                                        value?.emp_id[0]?.first_name + ' ' + value?.emp_id[0]?.last_name}
                                                </Text>
                                                <Text style={styles.devText}>
                                                    {((value?.emp_id[0]?.designation)?.length > 17) ?
                                                        (((value?.emp_id[0]?.designation)?.substring(0, 17 - 3)) + ' ...') :
                                                        value?.emp_id[0]?.designation}
                                                </Text>
                                            </View>

                                            <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
                                                <View style={styles.rankView}>
                                                    <Text style={styles.rankText} >{languageData?.rank} : </Text>
                                                    <View style={styles.rView} >
                                                        <Text style={styles.rankText2} ># {value?.rank}</Text>
                                                    </View>
                                                </View>
                                                <View style={styles.rankView}>
                                                    <View>
                                                        <Image source={require('../../Assets/icons/coin.png')} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
                                                    </View>
                                                    <Text style={styles.amtText} >{value?.coins.toLocaleString("en-US")}</Text>
                                                </View>

                                            </View>
                                        </View>
                                    ))
                                    :
                                    <View style={{ width: '100%', alignItems: 'center', marginTop: height_screen * 0.02 }}>
                                        <Text>No record found!</Text>
                                    </View>
                        }

                    </ScrollView>


                </View>

            </View>

        </SafeAreaView>
    );
}


export default RankStatus;
