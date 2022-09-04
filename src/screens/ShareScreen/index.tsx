import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Box,
  Center,
  Flex,
  FormControl,
  Input,
  Modal,
  Pressable,
  ScrollView,
  Text,
  Actionsheet,
} from 'native-base';
import {KeyboardAvoidingView} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SafeAreaView from 'react-native-safe-area-view';
import SelectMultiple from 'react-native-select-multiple';
import MailSVG from '~/assets/images/mail.svg';
import {
  getRequest,
  createRequest,
  createListRequest,
} from '~/services/shareService';
import ModalAni from './ModalAni';
import Cancel from '../../assets/images/cancel.svg';
import {useSelector} from 'react-redux';
import api from '~/api/api';

interface Props {
  route: RouteProp<MainStackParamList, 'Share'>;
  navigation: StackNavigationProp<MainStackParamList, 'Share'>;
}
export default function ShareScreen({route, navigation}: Props) {
  const w = Dimensions.get('window').width;
  const [mail, setMail] = useState('');
  const [isInvalid, setIsInvalid] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [listRequest, setListRequest] = useState(null);
  const [listSelect, setListSelect] = useState([]);
  const [show, setShow] = useState(false);
  const [showTap, setShowTap] = useState(false);
  const [tapText, setTapText] = useState('');
  const [tapBtnText, setTapBtnText] = useState('')
  const [tapColor, setTapColor] = useState('#F53D5E')
  const [listLimit, setListLimit] = useState([])
  const [aniText, setAniText] = useState('')
  const {id} = route.params;
  //   console.log(id);

  const storeDataToListLimit = (data) => {
    if(data.length<4){
      setListLimit(
        data.map(item => {
          return {
            label: item.shared_email,
            value: item,
          };
        }),
      )
    }
    else{
      setListLimit(
        data.slice(0,3).map(item => {
          return {
            label: item.shared_email,
            value: item,
          };
        }),
      )
    }
  }

  const getReq = async () => {
    setIsLoading(true);
    const data: any = await getRequest(id);
    console.log(data);
    setListRequest(
      data.map(item => {
        return {
          label: item.shared_email,
          value: item,
        };
      }),
    );
storeDataToListLimit(data)
    setIsLoading(false);
  };

  useEffect(() => {
    getReq();
  }, []);

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  const handleChangeMail = (txt: string) => {
    setIsInvalid(!validateEmail(txt));
    setMail(txt);
  };

  const handleCreateShareRequset = async () => {
    console.log(listSelect.length);
    if (listSelect.length != 0) {
      const list = listSelect.map(item => {
        return item.value.shared_email;
      });
      // console.log(list);
      setShowModal(false);
      const res = await createListRequest(id, list);
      
      if (validateEmail(mail)) {
        const res = await createRequest(id, mail);
      }
      const data: any = await getRequest(id);
      console.log(data.length);
      setListRequest(
        data.map(item => {
          return {
            label: item.shared_email,
            value: item,
          };
        }),
      );
      storeDataToListLimit(data)
      setShow(true);
      setAniText('リクエストメールを送信しました')
      setTimeout(() => {
        setShow(false);
      }, 1000);
      setListSelect([]);
    } else {
      if (validateEmail(mail)) {
        setShowModal(false);
        setListSelect([]);
        const res = await createRequest(id, mail);
        console.log(res);

        const data: any = await getRequest(id);
        console.log(data.length);
        setListRequest(
          data.map(item => {
            return {
              label: item.shared_email,
              value: item,
            };
          }),
        );
        storeDataToListLimit(data)
        setShow(true);
        setAniText('リクエストメールを送信しました')
        setTimeout(() => {
          setShow(false);
        }, 1000);
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
      <Actionsheet isOpen={showTap} onClose={() => setShowTap(false)}>
        <Actionsheet.Content>
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingHorizontal: 43,
            }}>
            {tapText}
          </Text>
          <Center>
            <Pressable
              onPress={() => {
                setShowTap(false);
                setShow(true)
                setTimeout(() => {
                  setShow(false)
                },1000)
              }}>
              <Box
                marginBottom={31}
                marginTop={28}
                paddingX={7}
                paddingY={3}
                // backgroundColor="#0666f0"
                borderWidth={1}
                borderColor={tapColor}
                borderRadius={50}>
                <Text style={{fontWeight: 'bold'}} color={tapColor}>
                  {tapBtnText}
                </Text>
              </Box>
            </Pressable>
          </Center>
        </Actionsheet.Content>
      </Actionsheet>
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}>
        {/* <KeyboardAvoidingView behavior="height"> */}
        <Box
          paddingX={18}
          borderBottomWidth={1}
          borderColor="#ccc"
          width={w}
          position="absolute"
          bottom={0}
          left={0}
          backgroundColor="white"
          borderRadius={10}>
          <KeyboardAvoidingView behavior="height">
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingTop: 24,
              }}>
              共有したい人の
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingBottom: 24,
              }}>
              メールアドレスを入力してください。
            </Text>
            <FormControl isInvalid={isInvalid}>
              <Box marginTop={15}>
                <Input
                  type="email"
                  _focus={{
                    borderColor: 'blue',
                  }}
                  InputLeftElement={
                    <Box paddingLeft={3} paddingY={3}>
                      <MailSVG width={30} height={30}></MailSVG>
                    </Box>
                  }
                  onChangeText={handleChangeMail}
                  borderWidth={2}
                  backgroundColor={'#f5f5f5'}
                  borderColor="#f5f5f5"
                  placeholder="メールアドレス" // mx={4}
                  placeholderTextColor={'#6C7883'}
                />
              </Box>
              <Box paddingLeft={2}>
                <FormControl.ErrorMessage>
                  <Text
                    style={{fontSize: 12, fontWeight: 'bold', color: 'red'}}>
                    メールアドレスが正しくないようです。再度入力してください。
                  </Text>
                </FormControl.ErrorMessage>
              </Box>
            </FormControl>
            {listRequest?.length != 0 ? (
              <Text style={{fontSize: 12, paddingTop: 24, paddingBottom: 8}}>
                直近共有したメールアドレス
              </Text>
            ) : (
              <></>
            )}
            {listRequest ? (
              <SelectMultiple
                items={listLimit}
                rowStyle={{
                  borderBottomWidth: 0,
                  padding: 0,
                  marginVertical: 5,
                }}
                checkboxSource={require('~/assets/images/checkbox_default.png')}
                checkboxStyle={{
                  width: 25,
                  height: 25,
                }}
                onSelectionsChange={selected => {
                  setListSelect(selected);
                }}
                selectedCheckboxSource={require('~/assets/images/checkbox_active.png')}
                selectedItems={listSelect}
              />
            ) : (
              <></>
            )}
            <Flex flexDirection="row" justifyContent="center">
              <Pressable
                onPress={() => {
                  setShowModal(false);
                }}>
                <Box
                  marginBottom={31}
                  marginTop={31}
                  paddingX={7}
                  paddingY={3}
                  marginRight={3}
                  borderColor="#0666f0"
                  borderWidth={1}
                  borderRadius={50}>
                  <Text style={{fontWeight: 'bold'}} color="#0666f0">
                    閉じる
                  </Text>
                </Box>
              </Pressable>
              {validateEmail(mail) || listSelect.length != 0 ? (
                <Pressable onPress={handleCreateShareRequset}>
                  <Box
                    marginLeft={3}
                    marginBottom={31}
                    marginTop={31}
                    paddingX={7}
                    paddingY={3}
                    backgroundColor="#0666f0"
                    borderRadius={50}>
                    <Text style={{fontWeight: 'bold'}} color="white">
                      送信
                    </Text>
                  </Box>
                </Pressable>
              ) : (
                <Pressable disabled={true}>
                  <Box
                    marginLeft={3}
                    marginBottom={31}
                    marginTop={31}
                    paddingX={7}
                    paddingY={3}
                    backgroundColor={'#99BFF6'}
                    borderRadius={50}>
                    <Text style={{fontWeight: 'bold'}} color="white">
                      送信
                    </Text>
                  </Box>
                </Pressable>
              )}
            </Flex>
          </KeyboardAvoidingView>
        </Box>
        {/* </KeyboardAvoidingView> */}
      </Modal>
      <Flex
        backgroundColor="white"
        flexDirection="row"
        justifyContent="space-between"
        padding={3}>
        <Pressable
          onPress={() => {
            // navigation.reset({
            //     index: 0,
            //     routes: [{ name: 'Main' }],
            // });
            navigation.goBack();
          }}>
          <Cancel></Cancel>
        </Pressable>
        <ModalAni show={show} text={aniText}></ModalAni>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>ファミリーシェア</Text>
        <Box opacity={0}>
          <Cancel></Cancel>
        </Box>
      </Flex>
      <Box style={{paddingTop: 12, flex: 1}}>
        {listRequest ? (
          <FlatList
            data={listRequest}
            keyExtractor={(item, index) => index}
            renderItem={({item}) => {
              return (
                <Box
                  style={{
                    marginVertical: 4,
                    marginHorizontal: 8,
                    borderRadius: 8,
                    paddingVertical: 20,
                    paddingHorizontal: 16,
                    backgroundColor: 'white',
                    shadowColor: '#000',
                    shadowOffset: {
                      width: 0,
                      height: 7,
                    },
                    shadowOpacity: 0.43,
                    shadowRadius: 9.51,
                    elevation: 3,
                  }}>
                  <Flex
                    flexDirection="row"
                    justifyContent="space-between"
                    alignItems="center">
                    <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                      {item.value.shared_email}
                    </Text>
                    {item.value.status == 'waiting' ? (
                      <Text
                        onPress={() => {
                          setTapText(
                            `${item.value.shared_email}さんにメールを再送しますか？`,
                          );
                          setTapBtnText('再送')
                          setShowTap(true);
                          setTapColor("#0666f0")
                          // setShow(true)
                          setAniText('共有を解除しました')
                        }}
                        style={{
                          fontSize: 12,
                          color: '#F5963E',
                          width: 84,
                          textAlign: 'center',
                          paddingVertical: 2,
                          borderWidth: 1,
                          borderRadius: 4,
                          borderColor: '#F5963E',
                        }}>
                        リクエスト中
                      </Text>
                    ) : (
                      <Text
                      onPress={() => {
                        setTapText(
                          `${item.value.shared_email}さんと共有を解除しますか？`,
                        );
                        setTapBtnText('解除')
                        setShowTap(true);
                        setAniText('リクエストメールを送信しました')
                        // setTapColor("#F53D5E")
                      }}
                        style={{
                          fontSize: 12,
                          color: '#6C7883',
                          width: 84,
                          textAlign: 'center',
                          paddingVertical: 2,
                          borderWidth: 1,
                          borderRadius: 4,
                          borderColor: '#6C7883',
                        }}>
                        共有中
                      </Text>
                    )}
                  </Flex>
                </Box>
              );
            }}></FlatList>
        ) : (
          <></>
        )}
        <Center>
          <Pressable
            onPress={() => {
              setShowModal(true);
            }}>
            <Box
              marginBottom={31}
              marginTop={28}
              paddingX={7}
              paddingY={3}
              backgroundColor="#0666f0"
              borderRadius={50}>
              <Text style={{fontWeight: 'bold'}} color="white">
                共有相手を登録
              </Text>
            </Box>
          </Pressable>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
