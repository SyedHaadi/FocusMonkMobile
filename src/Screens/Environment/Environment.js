import React, { useEffect, useState } from 'react';
import {
    Image,
    ImageBackground,
    Platform,
    SafeAreaView,
    NativeModules,
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
import { setApps } from '../../redux/Apps/AppsAction';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { getLocalStorage } from '../../shared/functions';
import { STORAGE_KEYS } from '../../shared/constants';
const { CalendarModule } = NativeModules;


const Environment = ({ navigation }) => {

    let apps = [];
    let urls = [];
    const dispatch = useDispatch();
    apps = useSelector((state) => state.apps.appsList);
    urls = useSelector((state) => state.apps.urlsList);
    const environment = useSelector((state) => state.apps.environment);
    const loading = useSelector((state) => state?.appLoading?.loading);
    const [showApps, setShowApps] = useState(true);

    useEffect(() => {

        const unsubscribe = navigation.addListener('focus', () => {
            dispatch(setApps());
        });
        return () => {
            unsubscribe;
        };

    }, [navigation]);

    const onClick = async (value) => {

        if (Platform.OS === 'android') {
            CalendarModule.createCalendarEvent('openApps', value.android);
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

            <Header title='Apps Control' navigation={navigation} />

            <View style={styles.bodyView} >

                <View style={styles.coinsView} >
                    <View style={styles.blockMainView}>
                        <Text style={styles.envText}>Mode :</Text>
                        <View style={styles.blockView}>
                            <Text style={styles.blockText}>{environment}</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.tabView}>
                    <TouchableOpacity onPress={() => setShowApps(true)} style={[styles.tab, { backgroundColor: showApps ? Color.PrimaryColor : Color.LightGrey }]}>
                        <Text style={[styles.tabText, { color: showApps ? Color.Grey : Color.White, marginTop: height_screen * 0.002 }]}>Apps</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setShowApps(false)} style={[styles.tab, { backgroundColor: showApps ? Color.LightGrey : Color.PrimaryColor }]}>
                        <Text style={[styles.tabText, { color: showApps ? Color.White : Color.Grey, marginTop: height_screen * 0.0025 }]}>Urls</Text>
                    </TouchableOpacity>
                </View>

                {
                    showApps ?
                        <>
                            <View style={styles.listTitleView}>
                                <Text style={styles.titleText1}>Focusmonk Apps</Text>
                                <Text style={styles.titleText2}>See your monk apps list below</Text>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: height_screen * 0.09 }}>
                                {
                                    apps?.map((value, index) => (
                                        <TouchableOpacity onPress={() => onClick(value)} key={index} style={styles.appView}>
                                            <Image source={{ uri: value.image }} style={styles.iconView} />
                                            <Text style={styles.appText}>{value.name}</Text>
                                        </TouchableOpacity>
                                    ))
                                }
                            </ScrollView>
                        </>
                        :
                        <>
                            <View style={styles.listTitleView}>
                                <Text style={styles.titleText1}>Focusmonk Urls</Text>
                                <Text style={styles.titleText2}>See your monk urls list below</Text>
                            </View>
                            <ScrollView showsVerticalScrollIndicator={false} style={{ marginBottom: height_screen * 0.09 }}>
                                {
                                    urls?.map((value, index) => (
                                        <View key={index} style={styles.appView}>
                                            {/* <Image source={{ uri: value.image }} style={styles.iconView} /> */}
                                            <Text style={styles.appText}>{value}</Text>
                                        </View>
                                    ))
                                }
                            </ScrollView>
                        </>
                }

            </View>


        </SafeAreaView>
    );
}


export default Environment;
