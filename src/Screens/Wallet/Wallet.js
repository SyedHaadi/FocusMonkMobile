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
import Icon from 'react-native-vector-icons/FontAwesome';
import { height_screen, width_screen } from '../../Utils/Dimentions';
import Color from '../../Utils/Color';
// import PieChart from 'react-native-pie-chart';
import CircularProgress from '../../Components/CircularProgress';
import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getCoinsTrophies } from '../../redux/Apps/AppsAction';


const Wallet = ({ navigation }) => {

    const array = [1, 2];
    const dispatch = useDispatch();
    const wallet = useSelector((state) => state?.apps?.wallet);
    const loading = useSelector((state) => state?.appLoading?.loading);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getCoinsTrophies());
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

            <Header title='My Wallet' navigation={navigation} />

            <View style={styles.bodyView} >

                <View style={styles.coinsView} >
                    <View style={styles.totalCoinsView}>
                        <View>
                            {
                                wallet?.coins ?
                                    <Text style={styles.totalCoinsText}>{wallet?.coins + wallet?.extracoins}</Text>
                                    :
                                    <Text style={styles.totalCoinsText}>0</Text>
                            }
                        </View>
                        <View style={styles.tView}>
                            <Text style={styles.earnText}>Total Coins</Text>
                            <Image source={require('../../Assets/icons/coin.png')} style={{ height: height_screen * 0.05, width: width_screen * 0.07, resizeMode: 'cover', marginTop: height_screen * 0.0055 }} />
                        </View>
                    </View>

                    <View style={{ width: '100%', borderBottomWidth: 1.2, marginTop: 10, borderColor: Color.PrimaryColor, alignSelf: 'center' }}></View>

                    <View style={styles.extraView}>
                        <View style={styles.extraCoinsView}>
                            <Text style={styles.earnText}>Extra Coins :</Text>
                            <Text style={[styles.earnText2, { alignSelf: 'flex-end' }]}>{wallet?.extracoins}</Text>

                        </View>
                        {/* <View style={styles.extraCoinsView}>
                            <Text style={styles.earnText}>Deducted Coins :</Text>
                            <Text style={styles.earnText2}>100</Text>

                        </View> */}
                    </View>

                </View>


                <View style={styles.coinMeterView} >

                    <View style={styles.meterView}>
                        <Text style={styles.meterText}>Today's Earnings</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: - height_screen * 0.03 }}>
                        {/* <View style={{ marginTop: 'auto' }}>
                            <View style={styles.earnCoins}>
                                <View style={[styles.dotView, { backgroundColor: Color.PrimaryColor }]}></View>
                                <Text style={styles.extraCoinsText}>Earned Coins</Text>
                            </View>
                            <View style={styles.earnCoins}>
                                <View style={[styles.dotView, { backgroundColor: Color.Yellow }]}></View>
                                <Text style={styles.extraCoinsText}>Extra Coins</Text>
                            </View>
                        </View> */}
                        <View style={styles.coinCircle}>
                            <Text style={styles.circleText}>{wallet?.daily_coins
                                ? wallet?.daily_coins
                                : "0"}</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.collectionView} >
                    <View>
                        <Text style={[styles.meterText, { color: Color.PrimaryColor }]}>Focus Level</Text>
                    </View>

                    <View style={styles.achieveView}>

                        <View>
                            <Text style={styles.collectionText}>Current</Text>
                        </View>

                        {
                            wallet?.before?.length === 0 ?
                                <View style={styles.trophyContainer}>
                                    <Text style={styles.extraCoinsText}>You didn't get any trophy yet !</Text>
                                </View>
                                :
                                <View style={styles.trophyContainer}>
                                    <View style={styles.trophyView} >
                                        <Text style={styles.trophyText} >{wallet?.before[0]?.title}</Text>
                                        <Image source={{ uri: wallet?.before[0]?.image }} style={styles.trophyImg} />
                                    </View>
                                </View>

                        }

                    </View>

                    <View style={[styles.achieveView, { borderBottomWidth: 0 }]}>

                        <View>
                            <Text style={styles.collectionText}>Next To Achieve</Text>
                        </View>

                        {
                            wallet?.after?.length === 0 ?
                                <View style={styles.trophyContainer}>
                                    <Text style={styles.extraCoinsText}>You didn't get any trophy yet !</Text>
                                </View>
                                :
                                <View style={styles.trophyContainer}>
                                    <View style={styles.trophyView2} >
                                        <Text style={styles.trophyText} >{wallet?.after[0]?.title}</Text>
                                        <Image source={{ uri: wallet?.after[0]?.image }} style={styles.trophyImg} />
                                    </View>
                                </View>
                        }

                    </View>
                </View>


            </View>


        </SafeAreaView>
    );
}


export default Wallet;
