import React, { useEffect, useState, useRef } from 'react';
import {
    FlatList,
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
// import PieChart from 'react-native-pie-chart';
import CircularProgress from '../../Components/CircularProgress';
import Header from '../../Components/Header';
import Ruler from 'react-native-animated-ruler';
import { useDispatch, useSelector } from 'react-redux';
import { getRoadMap } from '../../redux/RoadMap/RoadMapActions';
import { getRankStatus } from '../../redux/Apps/AppsAction';


const Achievements = ({ navigation }) => {

    const dispatch = useDispatch();
    const roadMap = useSelector((state) => state?.roadMap?.roadMap);
    const userCoins = useSelector((state) => state?.apps?.userCoins);
    const scaleableData = useSelector((state) => state?.apps?.scaleable);
    const rankStatus = useSelector((state) => state?.apps?.rankList)
    const loading = useSelector((state) => state?.appLoading?.loading);
    const [goalCoins, setGoalCoins] = useState('');
    const scrollViewRef = useRef();
    const scaleable = scaleableData?.scaleable;
    let coinsum;
    let totalCoins;

    useEffect(() => {
        dispatch(getRoadMap());
        scrollViewRef.current.scrollToEnd({ animated: false })

        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getRankStatus());
        });
        return () => {
            unsubscribe;
        };

    }, [navigation]);

    const percentage = () => {

        if (scaleableData) {
            const scalediff = scaleable[3] - scaleable[0];
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

    return (
        <SafeAreaView style={{ flex: 1 }}>
            {
                loading ?
                    <Loader />
                    :
                    null
            }

            <Header title='Achievements' navigation={navigation} />

            <View style={styles.bodyView} >

                <View style={styles.achView}>
                    <Text style={styles.achText1}>Achievements</Text>
                    <Text style={styles.achText2}>Focus Monk Daily Milestones</Text>
                </View>

                {/* <FlatList
                    data={array}
                    renderItem={({ item }) => (
                        <View>
                            <View style={{ zIndex: 10 }}>
                                <Image source={require('../../Assets/icons/coin.png')} style={{ position: 'absolute', marginTop: -height_screen * 0.025, right: 0, marginRight: height_screen * 0.005 }} />
                            </View>
                            <View style={{ height: height_screen * 0.06, width: width_screen * 0.35, borderBottomWidth: 7, borderLeftWidth: 7, borderTopWidth: 7, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, borderColor: Color.LightGrey, marginBottom: -7, right: 20 }}>
                            </View>
                            <View style={{ zIndex: 10 }}>
                                <Image source={require('../../Assets/icons/coin.png')} style={{ position: 'absolute', marginTop: -height_screen * 0.025, marginLeft: -height_screen * 0.02 }} />
                            </View>
                            <View style={{ height: height_screen * 0.06, width: width_screen * 0.35, borderBottomWidth: 7, borderRightWidth: 7, borderTopWidth: 7, borderTopRightRadius: 25, borderBottomRightRadius: 25, borderColor: Color.PrimaryColor, marginBottom: -7 }}>
                            </View>
                            <View style={{ zIndex: 10 }}>
                                <Image source={require('../../Assets/icons/coin.png')} style={{ position: 'absolute', bottom: 0, marginBottom: -height_screen * 0.04, right: 0, marginRight: height_screen * 0.005 }} />
                            </View>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                /> */}


                <View style={styles.mainView}>
                    <View style={[styles.trackView, { justifyContent: 'flex-end', paddingBottom: height_screen * 0, alignItems: 'center' }]}>
                        <ScrollView
                            overScrollMode='never'
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            ref={scrollViewRef}
                            onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: false })}
                            contentContainerStyle={{ width: Platform.OS === 'android' ? width_screen * 0.7 : width_screen * 0.6, alignItems: 'center', paddingVertical: height_screen * 0.034, marginTop: roadMap.length <= 2 ? 'auto' : 0, marginLeft: Platform.OS === 'android' ? 0 : height_screen * 0.025 }}>
                            {
                                roadMap?.map((value, index) => (
                                    <View>

                                        {index % 2 !== 0 ?
                                            <View>
                                                <View style={{ zIndex: 10 }}>
                                                    <Image source={{ uri: value?.image }} style={{ height: height_screen * 0.035, width: height_screen * 0.035, position: 'absolute', marginTop: -height_screen * 0.0125, right: 0, marginRight: height_screen * 0.018 }} />
                                                </View>
                                                <View style={{ zIndex: 1, height: height_screen * 0.06, width: width_screen * 0.43, borderBottomWidth: 7, borderLeftWidth: 7, borderTopWidth: 7, borderTopLeftRadius: 25, borderBottomLeftRadius: 25, borderColor: userCoins >= value?.coins ? Color.PrimaryColor : Color.barGrey, marginBottom: -7, right: 20 }}>
                                                </View>
                                            </View>
                                            :
                                            <View>
                                                {
                                                    index === 0 ?
                                                        <View style={{ zIndex: 11 }}>
                                                            <Image source={{ uri: value?.image }} style={{ height: height_screen * 0.035, width: height_screen * 0.035, position: 'absolute', marginTop: -height_screen * 0.0125, marginLeft: -width_screen * 0.007 }} />
                                                        </View>
                                                        :
                                                        <View style={{ zIndex: 11 }}>
                                                            <Image source={{ uri: value?.image }} style={{ height: height_screen * 0.035, width: height_screen * 0.035, position: 'absolute', marginTop: -height_screen * 0.0125, marginLeft: -width_screen * 0.007 }} />
                                                        </View>
                                                }
                                                <View style={{ zIndex: -1, height: height_screen * 0.06, width: width_screen * 0.43, borderBottomWidth: 7, borderRightWidth: 7, borderTopWidth: 7, borderTopRightRadius: 25, borderBottomRightRadius: 25, borderColor: userCoins >= value?.coins ? Color.PrimaryColor : Color.barGrey, marginBottom: -7 }}>
                                                </View>
                                                {/* <View style={{ zIndex: 10 }}>
                                                    <Image source={{ uri: value?.image }} style={{ position: 'absolute', bottom: 0, marginBottom: -height_screen * 0.04, right: 0, marginRight: height_screen * 0.005 }} />
                                                </View> */}
                                            </View>
                                        }
                                    </View>
                                ))
                            }
                        </ScrollView>

                    </View>

                    <View style={styles.meterView}>
                        <Text style={styles.totalText}>{scaleable ? scaleable[3] : null}</Text>
                        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                            <View style={styles.lineSideView}>
                                {
                                    scaleableData ?
                                        <View style={[styles.litView, { top: `${100 - percentage()?.toFixed(2)}%` }]}>
                                            <View style={styles.baseView}>
                                                <View >
                                                    <Text style={{ fontWeight: '600', paddingHorizontal: height_screen * 0.004, fontSize: height_screen * 0.011, backgroundColor: Color.White, alignSelf: 'center' }}>{coinsum}</Text>
                                                </View>
                                            </View>
                                            <View style={styles.triangle}></View>
                                        </View>
                                        :
                                        null
                                }
                            </View>
                            <View style={styles.lineView}>
                                <View style={{ marginTop: 'auto', height: `${percentage()?.toFixed(2)}%`, width: '100%', backgroundColor: Color.PrimaryColor, borderRadius: height_screen * 0.01, }}></View>
                                <View>
                                    <Image source={require('../../Assets/icons/coin.png')} style={styles.coinImgView} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                <View style={styles.titleView}>
                    <View style={styles.title1}>
                        <Text style={styles.titleText}>Focus Level</Text>
                    </View>
                    <View style={styles.title2}>
                        <Text style={styles.titleText}>Coins</Text>
                    </View>
                    <View style={styles.title3}>
                        <Text style={styles.titleText}>Status</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: height_screen * 0.01 }}>
                    {
                        roadMap?.map((value, index) => (
                            <View key={index} style={styles.appView}>
                                <View style={styles.view1}>
                                    <Text style={styles.srText}>{index + 1}</Text>
                                    <Image source={{ uri: value?.image }} style={[styles.iconView, { marginLeft: index === 0 ? height_screen * 0.0035 : 0 }]} />
                                    <Text style={styles.appText}>{value?.title}</Text>
                                </View>
                                <View style={styles.view2}>
                                    <Image source={require('../../Assets/icons/coin.png')} style={styles.iconView2} />
                                    <Text style={styles.appText2}>{value?.coins}</Text>
                                </View>
                                <View style={styles.view3}>
                                    <Text style={[styles.appText2, { fontSize: height_screen * 0.014 }]}>{userCoins >= value?.coins ? 'Complete' : 'Pending'}</Text>
                                </View>
                            </View>
                        ))
                    }
                </ScrollView>

            </View>
        </SafeAreaView>
    );
}


export default Achievements;
