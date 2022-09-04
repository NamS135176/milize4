import React, {useState, useEffect, useCallback} from 'react';
import {Box, Text, Image, Modal, Center, Pressable, Alert} from 'native-base';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Dimensions} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';
import LottieView from 'lottie-react-native';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';
import {RNCamera} from 'react-native-camera';
import {setAccessToken} from '~/api/api';
import SafeAreaView from 'react-native-safe-area-view';
import ProfileScreen from '../ProfileScreen';
import ProfileSVG from '~/assets/images/profile.svg';
import ProfileCurrentSVG from '~/assets/images/profile_current.svg';
import InsuranceSVG from '~/assets/images/insurance_information.svg';
import InsuranceCurrentSVG from '~/assets/images/insurance_information_current.svg';
import InsuranceScreen from '../InsuranceScreen';
import MainInsurance from '../InsuranceScreen/MainInsurance';
import {GET_POLICIES} from '~/actions/action_types';
import useFcm from '../../hooks/useFcm';
const Tab = createBottomTabNavigator();
export default function MainScreen(props: any) {
  useFcm();
  const dispatch = useDispatch();
  const sort = props.route.params?.sort || 'sort_by_default';
  const userInfo: IUserInfoState = useSelector((state: IAllState) => {
    return state.user;
  });
  const policiesData: IPolicyState = useSelector((state: IAllState) => {
    return state.policy;
  });

  const getUserInfo = async () => {
    const token: any = await AsyncStorage.getItem('dataToken');
    dispatch({
      type: 'GET_INFO',
      payload: {
        access_token: JSON.parse(token).id_token,
      },
    });
    dispatch({
      type: 'GET_COMPANIES',
    });
    dispatch({
      type: 'GET_POLICIES',
      payload: {
        oldList: policiesData.policiesData.insurance_policies,
      },
      sort,
    });
  };

  const checkFirst = async () => {
    const first = await AsyncStorage.getItem('first');
    if (first) {
      setShowModal(false);
    } else {
      setShowModal(true);
      await AsyncStorage.setItem('first', 'first');
    }
  };

  useEffect(() => {
    checkFirst();
    getUserInfo();
    request(PERMISSIONS.ANDROID.CAMERA).then(result => {
      console.log(result);
    });
  }, []);

  const w = Dimensions.get('window').width;
  const [showModal, setShowModal] = useState(false);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box flex={1}>
        {/* <Spinner
          visible={userInfo.loading && policiesData.loading}
          textStyle={{color: '#FFF'}}
        /> */}
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}>
          <Center>
            <Box backgroundColor={'white'}>
              <LottieView
                style={{width: w - 80}}
                source={require('../../assets/lottie/DesignRenewal.json')}
                // source={require('~/assets/lottie/miruho_WS05.json')}
                autoPlay
                loop
              />
            </Box>
            <Box
              width={w - 80}
              paddingTop={10}
              paddingBottom={5}
              paddingX={5}
              backgroundColor={'white'}>
              <Text
                style={{textAlign: 'center', fontWeight: 'bold', fontSize: 17}}>
                デザインをリニューアルしました!
              </Text>
              <Text style={{textAlign: 'center', padding: 20}}>
                保険情報をより見やすくするため より使いやすくするため
                全体のデザインを見直しました
              </Text>
              <Center>
                <Pressable
                  onPress={() => {
                    setShowModal(false);
                  }}>
                  <Box
                    paddingX={7}
                    paddingY={3}
                    borderWidth={1}
                    borderColor="#0666f0"
                    borderRadius={50}>
                    <Text style={{fontWeight: 'bold'}} color="#0666f0">
                      閉じる
                    </Text>
                  </Box>
                </Pressable>
              </Center>
            </Box>
          </Center>
        </Modal>
        <Tab.Navigator
          initialRouteName="MainInsurance"
          tabBarOptions={{
            activeTintColor: 'blue',
            // style: {
            //   height: 55,
            // },
            // labelStyle: {
            //   paddingBottom: 5,
            // },
          }}>
          <Tab.Screen
            name="MainInsurance"
            component={MainInsurance}
            listeners={{
              tabPress: e => {
                console.log(e);
                dispatch({
                  type: 'GET_POLICIES',
                  payload: {
                    oldList: policiesData.policiesData.insurance_policies,
                  },
                  sort,
                });
                props.navigation.navigate('MainInsurance');
                // dispatch({
                //   type: 'GET_SHARE_RECEIVE',
                // });
              },
            }}
            options={{
              tabBarLabel: '保險一覽',

              tabBarIcon: ({color, size}) => {
                if (color == 'blue') {
                  return <InsuranceCurrentSVG></InsuranceCurrentSVG>;
                } else {
                  return <InsuranceSVG></InsuranceSVG>;
                }
              },
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: 'プロフィール',
              tabBarIcon: ({color, size}) => {
                if (color == 'blue') {
                  return <ProfileCurrentSVG></ProfileCurrentSVG>;
                } else {
                  return <ProfileSVG></ProfileSVG>;
                }
              },
            }}
          />
        </Tab.Navigator>
      </Box>
    </SafeAreaView>
  );
}
