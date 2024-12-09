import { StyleSheet, Text, View, TouchableOpacity, Image, Platform } from 'react-native';
import React from 'react';
import Font from '../Utils/Font';
import FontSize from '../Utils/FontSize';
import Color from '../Utils/Color';
import { height_screen, width_screen } from '../Utils/Dimentions';
import { useSelector } from 'react-redux';

const DashboardHeader = ({
  navigation,
  fromMain,
  heading,
  profile,
  color,
  rightIcon,
  rightIconColor,
  dots,
  onDotsPress,
}) => {

  const userData = useSelector((state) => state?.userData?.user);
  const languageData = useSelector((state) => state?.language?.language_data);

  return (
    <View style={styles.mainView} >
      <View style={styles.profileView}>
        {
          userData ?
            <View style={styles.ImgView}>
              <Image source={{ uri: userData?.image }} style={styles.img} />
            </View>
            :
            null
        }

        {
          userData ?
            <View style={styles.nameView}>
              <Text style={styles.nameText} >
                {((userData?.first_name + userData?.last_name)?.length > 18) ?
                  (((userData?.first_name + " " + userData?.last_name)?.substring(0, 18 - 3)) + ' ...') :
                  userData?.first_name + ' ' + userData?.last_name}
              </Text>
              <Text style={styles.devText} >
                {((userData?.designation)?.length > 22) ?
                  (((userData?.designation)?.substring(0, 22 - 3)) + ' ...') :
                  userData?.designation}
              </Text>

              {userData?.company_id?.isCompanyadmin ?
                <Text style={styles.companyText} >{languageData?.company_name}: <Text style={[styles.companyText, { color: Color.White }]} >
                  {((userData?.company_id?.companyname)?.length > 14) ?
                    (((userData?.company_id?.companyname)?.substring(0, 14 - 3)) + ' ...') :
                    userData?.company_id?.companyname}
                </Text>
                </Text>

                :
                null
              }
            </View>
            :
            null
        }
      </View>

    </View>
  );
};

export default DashboardHeader;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Color.PrimaryColor,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  mainView: {
    width: '100%',
    height: height_screen * 0.2,
    backgroundColor: Color.PrimaryColor,
    paddingLeft: width_screen * 0.05,
    paddingTop: height_screen * 0.045
  },
  profileView: {
    width: '100%',
    marginTop: height_screen * 0.03,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ImgView: {
    height: height_screen * 0.09,
    width: height_screen * 0.09,
    borderRadius: height_screen * 0.045,
    // padding: height_screen * 0.001,
    borderWidth: 2,
    borderColor: Color.White,
    alignItems: 'center',
    justifyContent: 'center'
  },
  img: {
    height: height_screen * 0.08,
    width: height_screen * 0.08,
    borderRadius: height_screen * 0.04
  },
  nameView: {
    marginLeft: width_screen * 0.014
  },
  nameText: {
    fontFamily: Font.Medium,
    fontSize: height_screen * 0.02,
    color: Color.White,
    marginBottom: Platform.OS === 'android' ? -height_screen * 0.005 : -height_screen * 0.002,
    textTransform: 'capitalize'
  },
  devText: {
    fontFamily: Font.Light,
    fontSize: height_screen * 0.017,
    color: Color.White,
    marginBottom: Platform.OS === 'android' ? -height_screen * 0.005 : -height_screen * 0.002,
    textTransform: 'capitalize'
  },
  companyText: {
    fontFamily: Font.Medium,
    fontSize: height_screen * 0.014,
    color: Color.White,
    textTransform: 'capitalize'
  },
});
