import React, {useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {
  Box,
  Button,
  Flex,
  Pressable,
  Text,
  FormControl,
  Center,
  Input,
} from 'native-base';
import { Alert } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {useSelector} from 'react-redux';
import {RouteProp} from '@react-navigation/core';
import MailSVG from '~/assets/images/mail.svg';
import {StackNavigationProp} from '@react-navigation/stack';
import { changeMail } from '~/services/userService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {fontSize} from 'styled-system';
import { async } from 'q';

interface Props {
  route: RouteProp<MainStackParamList, 'ChangeEmail'>;
  navigation: StackNavigationProp<MainStackParamList, 'ChangeEmail'>;
}
export default function ChangeEmailScreen({navigation}: Props) {
  const userInfo: IUserInfoData = useSelector((state: IAllState) => {
    return state.user.userInfo;
  });

  function validateEmail(email: string) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const [newMail, setNewMail] = useState('')
  const [isInvalidPass, setIsInvalidPass] = useState(false)
  const [isLoading, setIsLoading] = useState(false);

  const handleChange =txt => setNewMail(txt)

  const handleChangeEmail = async () => {
      setIsLoading(true)
     setIsInvalidPass(false)
     if(validateEmail(newMail)){
       try {
        const res = await changeMail(newMail)
        // await AsyncStorage.setItem('updating','updating')
        setIsLoading(false)
        navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          });
       } catch (error) {
           setIsLoading(false)
           Alert.alert(error.message)
       }
     }
     else{
         setIsInvalidPass(true)
     }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box backgroundColor="white" flex={1}>
        <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />

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
            <Text style={{fontWeight: 'bold'}}>メールアドレスを変更する</Text>
          </Box>
          <Box padding={5}>
            <Text style={{fontWeight: 'bold', opacity: 0}}>キャンセル</Text>
          </Box>
        </Flex>
        <Box padding={5}>
          <Text style={{color: '#6C7883', fontSize: 12, fontWeight:'bold'}}>
            変更前メールアドレス
          </Text>
          <Text
            style={{
              color: '#0B1D31',
              fontSize: 14,
              fontWeight: 'bold',
              paddingVertical: 20,
            }}>
            {userInfo.email}
          </Text>
          <Text style={{color: '#6C7883', fontSize: 12, marginTop:20,fontWeight:'bold'}}>
            変更後メールアドレス
          </Text>
          <FormControl isInvalid={isInvalidPass}>
            <Box marginTop={15}>
              <Input onChangeText={handleChange}
                _focus={{
                  borderColor: 'blue',
                }}
                type="email"
                InputLeftElement={
                  <Box paddingLeft={3} paddingY={3}>
                    <MailSVG></MailSVG>
                  </Box>
                }
                borderWidth={2}
                backgroundColor={'#f5f5f5'}
                borderColor="#f5f5f5"
                placeholder="変更後のメールアドレス" // mx={4}
                placeholderTextColor={'#6C7883'}
              />
            </Box>
            <Box paddingLeft={2}>
              <FormControl.ErrorMessage>
              <Text style={{fontSize:12, fontWeight:'bold', color:'red'}} >メールアドレスが正しくないようです。再度入力してください。</Text>
              </FormControl.ErrorMessage>
            </Box>
          </FormControl>
        </Box>
        <Center>
          <Pressable onPress={handleChangeEmail}>
            <Box
              marginBottom={30}
              marginTop={30}
              paddingX={7}
              paddingY={3}
              backgroundColor="#0666f0"
              borderRadius={50}>
              <Text style={{fontWeight: 'bold'}} color="white">
                認証コード送信
              </Text>
            </Box>
          </Pressable>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
