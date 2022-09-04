import AsyncStorage from '@react-native-async-storage/async-storage';
import {RouteProp, useIsFocused} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {Box, Center, Flex, Modal, Pressable, Text, FlatList} from 'native-base';
// import {FlatList} from 'react-native';
import React, {useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import Spinner from 'react-native-loading-spinner-overlay';
import SafeAreaView from 'react-native-safe-area-view';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';
import {useDispatch, useSelector} from 'react-redux';
import FilterSVG from '~/assets/filter.svg';
import CheckSVG from '~/assets/check.svg';
import AddSVG from '~/assets/images/add_insurance_information.svg';
import NotificationSVG from '~/assets/images/notification.svg';
import ShareDoneSVG from '~/assets/images/shareDone.svg';
import ManageSVG from '~/assets/manage.svg';
import SortSVG from '~/assets/sort.svg';
import TeleSVG from '~/assets/tele.svg';
import ModalAccept from '~/components/ModalAccept';
import useShareReceive from '~/hooks/useShareReceive';
import insuranceStyles from './InsuranceStyle';
import Policy from './Policy';
interface Props {
  route: RouteProp<MainStackParamList, 'Insurance'>;
  navigation: StackNavigationProp<MainStackParamList, 'Insurance'>;
}

var radio_props = [
  {label: '登録日順', value: 'sort_by_default'},
  {label: '保険料順', value: 'sort_by_fee_expensive'},
  {label: '契約日順', value: 'sort_by_contract_newer'},
];

export default function InsuranceScreen({navigation, route}: Props) {
  const policiesData: IPolicyState = useSelector((state: IAllState) => {
    return state.policy;
  });

  const userInfo: IUserInfoState = useSelector((state: IAllState) => {
    return state.user;
  });
  // console.log('ahihi', policiesData.policiesData.insurance_policies);
  const isFocus = useIsFocused();
  const [isRotate, setIsRotate] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemSelect, setItemSelect] = useState(0);
  const [valueSelect, setValueSelect] = useState('sort_by_default');
  const [goDetail, setGoDetail] = useState(false);
  const [isShowComplete, setIsShowComplet] = useState(false);
  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  const slider = useRef(null);
  const {loading, sModal, listR, setShow} = useShareReceive();

  const dispatch = useDispatch();
  if (route.params?.reset) {
    dispatch({type: 'GET_POLICIES'});
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box flex={1} backgroundColor="white">
        <Spinner
          visible={policiesData.loading || goDetail}
          textStyle={{color: '#FFF'}}
        />
        <Modal
          style={{
            height: 300,
            position: 'absolute',
            backgroundColor: 'white',
            bottom: 0,
          }}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}>
          <Flex alignItems="center">
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
              }}>
              並び替え
            </Text>
          </Flex>
          <Flex px={7} alignSelf="flex-start">
            <RadioForm animation={true}>
              {radio_props.map((obj, i) => (
                <Pressable py={1} key={i} onPress={() => {}}>
                  <RadioButton
                    // style={postStyles.itemCompany}
                    labelHorizontal={true}>
                    {/*  You can set RadioButtonLabel before RadioButtonInput */}
                    <RadioButtonInput
                      obj={obj}
                      index={i}
                      isSelected={itemSelect === i}
                      onPress={() => {
                        setItemSelect(i);
                        setValueSelect(obj.value);
                      }}
                      borderWidth={1}
                      buttonInnerColor={'#0766EF'}
                      buttonOuterColor={
                        itemSelect === i ? '#0766EF' : '#cfd4d9'
                      }
                      buttonSize={16}
                      buttonOuterSize={24}
                      buttonStyle={{}}
                      buttonWrapStyle={{marginLeft: 10, marginTop: 5}}
                    />
                    <Text
                      style={{
                        color: itemSelect === i ? '#0766EF' : 'black',
                        fontSize: 15,
                        marginTop: 5,
                      }}
                      marginX={2}>
                      {obj.label}
                    </Text>
                  </RadioButton>
                </Pressable>
              ))}
            </RadioForm>
          </Flex>
          <Pressable
            onPress={() => {
              setShowModal(false);
              navigation.reset({
                index: 0,
                routes: [{name: 'Main', params: {sort: valueSelect}}],
              });
            }}>
            <Box
              marginBottom={30}
              marginTop={30}
              paddingX={7}
              paddingY={3}
              backgroundColor="#0666f0"
              borderRadius={50}>
              <Text style={{fontWeight: 'bold'}} color="white">
                決定
              </Text>
            </Box>
          </Pressable>
        </Modal>

        {isFocus ? (
          <ModalAccept setComplete={setIsShowComplet}></ModalAccept>
        ) : (
          <></>
        )}

        <Modal
          style={{
            backgroundColor: 'white',
            flex: 0.65,
            width: w - 50,
            // marginHorizontal: 20,
            alignSelf: 'center',
            marginTop: w / 4,
          }}
          isOpen={isShowComplete}
          onClose={() => {
            setIsShowComplet(false);
          }}>
          <Box
            flex={1}
            style={{paddingVertical: 24, paddingHorizontal: 16}}
            backgroundColor="white">
            <Text
              style={{textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>
              保険情報が共有されました！
            </Text>
            <Center paddingTop={5}>
              <ShareDoneSVG></ShareDoneSVG>
              <Text
                style={{
                  textAlign: 'center',
                  paddingHorizontal: 50,
                  marginTop: 25,
                }}>
                ベクトルXの保険情報が
                father@miruho.comさんに保険情報が共有されました。
              </Text>
              <Pressable
                onPress={() => {
                  setIsShowComplet(false);
                  dispatch({
                    type: 'GET_POLICIES',
                    payload: {
                      oldList: policiesData.policiesData.insurance_policies,
                    },
                    sort: 'sort_by_default',
                  });
                }}>
                <Box
                  marginBottom={30}
                  marginTop={30}
                  paddingX={7}
                  paddingY={3}
                  borderWidth={1}
                  borderColor="#0666f0"
                  // backgroundColor="#0666f0"
                  borderRadius={50}>
                  <Text style={{fontWeight: 'bold'}} color="#0666f0">
                    閉じる
                  </Text>
                </Box>
              </Pressable>
            </Center>
          </Box>
        </Modal>
        <Modal
          style={{
            backgroundColor: 'red',
            flex: 0.7,
            width: w - 50,
            // marginHorizontal: 20,
            alignSelf: 'center',
            marginTop: w / 4,
          }}
          isOpen={policiesData.isShowModal}
          onClose={() => {
            dispatch({
              type: 'UPDATE_LOADING_MODAL',
              payload: false,
            });
          }}>
          <Box
            style={{
              backgroundColor: 'white',
              flex: 1,
              width: '100%',
              alignItems: 'center',
              paddingVertical: 30,
            }}>
            <Box style={{alignItems: 'center'}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                お待たせしました！
              </Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                {' '}
                保険情報データ化完了です！
              </Text>
              <TeleSVG />
              <Flex alignItems="center" pt={10}>
                <Text style={{fontSize: 16}}>
                  保険情報のデータ化が完了しました！
                </Text>
                <Text style={{fontSize: 16}}>
                  もしもの時や保険を見直す時など
                </Text>
                <Text style={{fontSize: 16}}>miruhoをご活用ください！</Text>
              </Flex>
            </Box>
            <Flex py={7} alignItems="center">
              <Text style={{fontSize: 12, color: '#6C7883'}}>
                1米ドル=110円、1豪ドル=80円で金額表示しています。
              </Text>
            </Flex>
            <Flex alignItems="center">
              <Pressable
                onPress={() => {
                  dispatch({
                    type: 'UPDATE_LOADING_MODAL',
                    payload: false,
                  });
                }}>
                <Box
                  paddingX={7}
                  paddingY={3}
                  borderColor="#0B61DD"
                  borderWidth={1}
                  borderRadius={50}>
                  <Text
                    style={{fontWeight: 'bold', color: '#0B61DD'}}
                    color="white">
                    閉じる
                  </Text>
                </Box>
              </Pressable>
            </Flex>
          </Box>
        </Modal>

        <Flex
          flexDirection="row"
          justifyContent="space-between"
          paddingX={5}
          paddingY={5}>
          <Pressable
            onPress={() => {
              navigation.navigate('Notices', {});
            }}>
            <NotificationSVG />
          </Pressable>
          <Text style={insuranceStyles.boldText}>保険証券一覧</Text>
          <Pressable
            onPress={async () => {
              const firstCam = await AsyncStorage.getItem('firstCam');
              if (firstCam) {
                navigation.navigate('Camera', {listImg: []});
              } else {
                await AsyncStorage.setItem('firstCam', 'firstCam');
                navigation.navigate('IntroCamera', {});
              }
            }}>
            <AddSVG />
          </Pressable>
        </Flex>
        {!policiesData.policiesData.insurance_policies.length ? (
          <Flex
            alignItems="center"
            flexDirection="column"
            justifyContent="flex-start">
            <ManageSVG width="70%" />
            <Text py={3} style={insuranceStyles.boldText}>
              保険証券を撮影して
            </Text>
            <Text style={insuranceStyles.boldText}>一括管理しましょう。</Text>
          </Flex>
        ) : (
          <Flex
            style={{backgroundColor: '#fafafa'}}
            flex={1}
            direction="column">
            <FlatList
              ListHeaderComponent={
                <Flex px={3} py={1} direction="row" justify="space-between">
                  <Pressable
                    onPress={() => {
                      setShowModal(true);
                    }}
                    style={{padding: 10}}>
                    <FilterSVG />
                  </Pressable>
                  <Pressable
                    onPress={() => {
                      setIsRotate(!isRotate);
                      dispatch({type: 'REVERSE'});
                    }}
                    style={{
                      padding: 10,
                      transform: [{rotate: isRotate ? '0deg' : '180deg'}],
                    }}>
                    <SortSVG />
                  </Pressable>
                </Flex>
              }
              contentContainerStyle={{paddingBottom: 100}}
              data={policiesData.policiesData.insurance_policies}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <Box>
                  {item.status === 'waiting' ? (
                    <Flex style={insuranceStyles.itemPolicy} direction="row">
                      <CheckSVG width={50} height={50} />
                      <Box px={4}>
                        <Text
                          pb={1}
                          style={{
                            fontSize: 12,
                            color: '#6C7883',
                            fontWeight: 'bold',
                          }}>
                          {item.company}
                        </Text>
                        <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                          データ化までしばらくお待ちください
                        </Text>
                      </Box>
                    </Flex>
                  ) : (
                    <Flex
                      key={item.company}
                      style={insuranceStyles.itemPolicy}
                      flexDirection="row">
                      <Pressable
                        flex={1}
                        onPress={async () => {
                          navigation.navigate('DetailPolicy', {
                            insuranceId: item.id,
                          });
                        }}>
                        <Policy idUser={userInfo.userInfo.id} item={item} />
                      </Pressable>
                    </Flex>
                  )}
                </Box>
              )}
            />

            <Box
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Pressable
                onPress={() => {
                  navigation.navigate('TotalPolicy', {
                    listItem: policiesData.policiesData.insurance_policies,
                    annual_premium_sum:
                      policiesData.policiesData.annual_premium_sum,
                    annual_premium_sum_unit:
                      policiesData.policiesData.annual_premium_sum_unit,
                  });
                }}
                style={insuranceStyles.cost}>
                <Text
                  style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
                  年間合計保険料
                </Text>
                <Flex direction="row" alignItems="center">
                  <Text
                    style={{fontSize: 20, color: 'red', fontWeight: 'bold'}}>
                    {policiesData.policiesData.annual_premium_sum}
                  </Text>
                  <Text style={{fontSize: 12, marginLeft: 4}}>
                    {policiesData.policiesData.annual_premium_sum_unit}
                  </Text>
                </Flex>
              </Pressable>
            </Box>
          </Flex>
        )}
      </Box>
    </SafeAreaView>
  );
}
