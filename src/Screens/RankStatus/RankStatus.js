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
import { height_screen } from '../../Utils/Dimentions';
import Color from '../../Utils/Color';
import Header from '../../Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getRankStatus } from '../../redux/Apps/AppsAction';
import { getLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';


const RankStatus = ({ navigation }) => {

    const dispatch = useDispatch();
    const rankList = useSelector((state) => state.apps.rankList);
    const [userId, setUserId] = useState('');
    const loading = useSelector((state) => state?.appLoading?.loading);

    const getUserId = async () => {
        const id = await getLocalStorage(STORAGE_KEYS.USER_ID);
        setUserId(id);
    }

    useEffect(() => {
        getUserId();

        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(getRankStatus());
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

            <Header title='Rank Status' navigation={navigation} />

            <View style={styles.bodyView} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        rankList?.map((value, index) => (
                            <View key={index} style={[styles.profileView, value?.emp_id[0]?._id === userId ? { borderRightWidth: 7, borderRightColor: Color.PrimaryColor, borderLeftWidth: 7, borderLeftColor: Color.PrimaryColor } : null]}>
                                <View>
                                    <Image source={{ uri: value?.emp_id[0]?.image }} style={styles.img} />
                                </View>

                                <View style={styles.nameView}>
                                    <Text style={styles.nameText} >
                                        {((value?.emp_id[0]?.first_name + value?.emp_id[0]?.last_name)?.length > 20) ?
                                            (((value?.emp_id[0]?.first_name + value?.emp_id[0]?.last_name)?.substring(0, 20 - 3)) + ' ...') :
                                            value?.emp_id[0]?.first_name + ' ' + value?.emp_id[0]?.last_name}
                                    </Text>
                                    <Text style={styles.devText}>
                                        {((value?.emp_id[0]?.designation)?.length > 25) ?
                                            (((value?.emp_id[0]?.designation)?.substring(0, 25 - 3)) + ' ...') :
                                            value?.emp_id[0]?.designation}
                                    </Text>
                                </View>

                                <View style={{ marginLeft: 'auto', alignItems: 'flex-end' }}>
                                    <View style={styles.rankView}>
                                        <Text style={styles.rankText} >Rank : </Text>
                                        <View style={styles.rView} >
                                            <Text style={styles.rankText2} ># {value?.rank}</Text>
                                        </View>
                                    </View>
                                    <View style={styles.rankView}>
                                        <View>
                                            <Image source={require('../../Assets/icons/coin.png')} style={{ height: 35, width: 35, resizeMode: 'contain' }} />
                                        </View>
                                        <Text style={styles.amtText} >{value?.coins}</Text>
                                    </View>

                                </View>
                            </View>
                        ))
                    }

                </ScrollView>


            </View>


        </SafeAreaView>
    );
}


export default RankStatus;
