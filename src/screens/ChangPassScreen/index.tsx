import React, {useState} from 'react';
import {
  Box,
  Center,
  Text,
  Image,
  Pressable,
  Modal,
  Button,
  Flex,
  Spacer,
  FormControl,
  Input,
} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import api from '../../api/api';
import PasswordSVG from '~/assets/images/password.svg'
import Spinner from 'react-native-loading-spinner-overlay';
import OTPTextInput from 'react-native-otp-textinput';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {changePassword} from '~/services/userService';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import SafeAreaView from 'react-native-safe-area-view';
interface Props {
  route: RouteProp<MainStackParamList, 'ChangePass'>;
  navigation: StackNavigationProp<MainStackParamList, 'ChangePass'>;
}

export default function ChangePassScreen({route, navigation}: Props) {
  const [isInvalidPass, setIsInvalidPass] = useState(false);
  const [isInvalidCfPass, setIsInvalidCfPass] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalBtn, setModalBtn] = useState('');
  const [show, setShow] = useState(false);
  const [showCf, setShowCf] = useState(false);
  const [password, setPassword] = useState('');
  const [cfPassword, setCfPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [colorEye1, setColorEye1] = useState('#ccc')
  const [colorEye2, setColorEye2] = useState('#ccc')
  const handleChangePass = (txt: string) => setPassword(txt);
  const handleChangeCfPass = (txt: string) => setCfPassword(txt);

  const handleResetPass = async () => {
    setIsInvalidPass(false);
    setIsInvalidCfPass(false);
    if (password.length < 8) {
      setIsInvalidPass(true);
    } else if (cfPassword.length < 8) {
      setIsInvalidCfPass(true);
    } else {
      setIsLoading(true);
      console.log('xxx');
      const dataToken: any = await AsyncStorage.getItem('dataToken');
      const res = await changePassword(
        JSON.parse(dataToken).access_token,
        password,
        cfPassword,
      );
      setIsLoading(false);
      if (res.status != 204) {
        setShowModal(true);
        setModalTitle('失敗');
        setModalMessage('パスワードの変更に失敗しました');
        setModalBtn('閉じる');
      } else {
        setShowModal(true);
        setModalTitle('成功');
        setModalMessage('パスワードの変更に成功しました。');
        setModalBtn('戻る');
      }
    }
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box backgroundColor="white" flex={1}>
        <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="80%">
            <Text style={{fontSize: 20}}>{modalTitle}</Text>
            <Text style={{paddingRight: 30, paddingTop: 20, paddingBottom: 35}}>
              {modalMessage}
            </Text>
            <Text
              onPress={() => {
                setShowModal(false);
                if (modalTitle == '成功') {
                  navigation.navigate('Main', {});
                }
              }}
              style={{
                textAlign: 'right',
                paddingHorizontal: 20,
                paddingVertical: 20,
                color: '#2097f3',
              }}>
              {modalBtn}
            </Text>
          </Modal.Content>
        </Modal>
        <Flex flexDirection={'row'} justifyContent={'space-between'}>
          <Box padding={5}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={{fontWeight: 'bold'}}>キャンセル</Text>
            </Pressable>
          </Box>

          <Box padding={5}>
            <Text style={{fontWeight: 'bold'}}>パスワードを変更する</Text>
          </Box>
          <Box padding={5}>
            <Text style={{fontWeight: 'bold', opacity: 0}}>キャンセル</Text>
          </Box>
        </Flex>
        <Box paddingX={4}>
          <FormControl isInvalid={isInvalidPass}>
            <Box marginTop={15}>
              <FormControl.Label>現在のパスワード</FormControl.Label>
              <Input
                onChangeText={handleChangePass}
                _focus={{
                  borderColor: 'blue',
                }}
                type={show ? 'text' : 'password'}
                InputLeftElement={
                  <Box paddingLeft={3} paddingY={3}>
                    <PasswordSVG/>
                  </Box>
                }
                onFocus={() => {
                  setColorEye1('#4F8EF7')
                  setColorEye2('#ccc')
                }}
                borderWidth={2}
                backgroundColor={'#f5f5f5'}
                borderColor="#f5f5f5"
                InputRightElement={
                  <Box paddingRight={3} paddingY={3}>
                    <Pressable
                      onPress={() => {
                        setShow(!show);
                      }}>
                      {show ? (
                        <Icon name="eye-off" color={colorEye1} size={30} />
                      ) : (
                        <Icon name="eye" color={colorEye1} size={30} />
                      )}
                    </Pressable>
                  </Box>
                }
                placeholder="パスワード" // mx={4}
                placeholderTextColor={'#6C7883'}
              />
            </Box>
            <Box paddingLeft={2}>
              <FormControl.ErrorMessage>
              <Text style={{fontSize:12, fontWeight:'bold', color:'red'}} > 8文字以上で入力して下さい。</Text>
               
              </FormControl.ErrorMessage>
            </Box>
          </FormControl>
          <FormControl isInvalid={isInvalidCfPass}>
            <Box marginTop={15}>
              <FormControl.Label>新しいパスワード</FormControl.Label>
              <Input
                onChangeText={handleChangeCfPass}
                _focus={{
                  borderColor: 'blue',
                  color:'blue'
                }}
                onFocus={() => {
                  setColorEye1('#ccc')
                  setColorEye2('#4F8EF7')
                }}
                type={showCf ? 'text' : 'password'}
                InputLeftElement={
                  <Box paddingLeft={3} paddingY={3}>
                   <PasswordSVG/>
                  </Box>
                }
                borderWidth={2}
                backgroundColor={'#f5f5f5'}
                borderColor="#f5f5f5"
                InputRightElement={
                  <Box paddingRight={3} paddingY={3}>
                    <Pressable
                      onPress={() => {
                        setShowCf(!showCf);
                      }}>
                      {showCf ? (
                        <Icon name="eye-off" color={colorEye2} size={30} />
                      ) : (
                        <Icon name="eye" color={colorEye2} size={30} />
                      )}
                    </Pressable>
                  </Box>
                }
                placeholder="パスワード" // mx={4}
                placeholderTextColor={'#6C7883'}
              />
            </Box>
            <Box paddingLeft={2}>
              <FormControl.ErrorMessage>
              <Text style={{fontSize:12, fontWeight:'bold', color:'red'}} > 8文字以上で入力して下さい。</Text>
               
              </FormControl.ErrorMessage>
            </Box>
          </FormControl>
        </Box>
        <Center>
          <Pressable onPress={handleResetPass}>
            <Box
              marginBottom={30}
              marginTop={30}
              paddingX={7}
              paddingY={3}
              backgroundColor="#0666f0"
              borderRadius={50}>
              <Text style={{fontWeight: 'bold'}} color="white">
                変更する
              </Text>
            </Box>
          </Pressable>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
