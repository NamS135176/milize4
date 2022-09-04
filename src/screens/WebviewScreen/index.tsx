import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Box,
  Center,
  Flex,
  Image,
  Pressable,
  Text,
  TextArea,
  FormControl,
  Modal,
  Stack,
} from 'native-base';
import {Dimensions} from 'react-native';
import React, {useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {WebView} from 'react-native-webview';
import {postInquiries} from '~/services/userService';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';
import webStyles from './WebViewStyle';
import {Keyboard} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import Textarea from 'react-native-textarea';
import {async} from 'q';
interface Props {
  route: RouteProp<MainStackParamList, 'WebView'>;
  navigation: StackNavigationProp<MainStackParamList, 'WebView'>;
}

export default function WebViewScreen({route, navigation}: Props) {
  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const {item} = route.params;
  const userInfo: IUserInfoData = useSelector((state: IAllState) => {
    return state.user.userInfo;
  });
  const handleChangeInquiries = (txt: string) => setContent(txt);
  const createInquiries = async () => {
    Keyboard.dismiss();
    setIsInvalid(false);
    if (content == '') {
      setIsInvalid(true);
    } else {
      setShowModal(true);
    }
  };
  const handleCreateInquiries = async () => {
    setIsLoading(true);
    const res = await postInquiries(userInfo.email, content);
    setIsLoading(false);
    navigation.reset({
      index: 0,
      routes: [{name: 'CompletePostInquiries'}],
    });
  };
  console.log(item);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
      <Box flex={1} backgroundColor="white">
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}>
          <Box backgroundColor="white" width={w} height={h}>
            <Flex
              justifyContent="space-between"
              flexDirection="row"
              paddingY={5}
              paddingX={5}>
              <Pressable
                onPress={() => {
                  setShowModal(false);
                }}>
                <Image
                  alt="noti"
                  source={require('~/assets/images/back.png')}></Image>
              </Pressable>
              <Text style={webStyles.boldText}>お問い合わせ(確認)</Text>
              <Image
                style={{opacity: 0}}
                alt="noti"
                source={require('~/assets/images/cancel.png')}></Image>
            </Flex>
            <Box flex={1} paddingTop={5} backgroundColor={'#FAFAFA'}>
              <Center>
                <Text style={{color: '#8D8D8D', fontSize: 15}}>確認</Text>
                <Text style={{color: '#8D8D8D', fontSize: 15}}>
                  お問い合わせ内容
                </Text>
                <Text style={{fontSize: 16, marginTop: 15}} paddingBottom={10}>
                  {content}
                </Text>
                <Pressable onPress={handleCreateInquiries}>
                  <Box
                    marginBottom={30}
                    paddingX={7}
                    paddingY={3}
                    backgroundColor="#0666f0"
                    borderRadius={50}>
                    <Text style={{fontWeight: 'bold'}} color="white">
                      問い合わせる
                    </Text>
                  </Box>
                </Pressable>
              </Center>
            </Box>
          </Box>
        </Modal>
        <Flex
          justifyContent="space-between"
          flexDirection="row"
          paddingY={5}
          paddingX={5}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              alt="noti"
              source={require('~/assets/images/back.png')}></Image>
          </Pressable>
          <Text style={webStyles.boldText}>{item.title}</Text>
          <Image
            style={{opacity: 0}}
            alt="noti"
            source={require('~/assets/images/cancel.png')}></Image>
        </Flex>
        {item.link == '' ? (
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
            paddingY={5}>
            <FormControl isRequired isInvalid={isInvalid}>
              <Center>
                <Stack>
                  {/* <TextArea
                    onChangeText={handleChangeInquiries}
                    paddingY={5}
                    value={content}
                    borderWidth={2}
                    w="90%"
                    h={150}
                    placeholder="お問い合わせ内容"
                  /> */}
                  <Textarea
                    containerStyle={{
                      height: 200,
                      width: w * 0.9,
                      padding: 5,
                      backgroundColor: '#F5F5F5',
                    }}
                    style={{
                      textAlignVertical: 'top', // hack android
                      height: 170,
                      fontSize: 14,
                      color: '#333',
                    }}
                    onChangeText={handleChangeInquiries}
                    defaultValue={content}
                    placeholder={'お問い合わせ内容'}
                    placeholderTextColor={'#6C7883'}
                    underlineColorAndroid={'transparent'}
                  />
                </Stack>
              </Center>
              <Box paddingLeft={8}>
                <FormControl.ErrorMessage>
                  <Text
                    style={{fontSize: 12, fontWeight: 'bold', color: 'red'}}>
                    お問い合わせ内容を入力してください。
                  </Text>
                </FormControl.ErrorMessage>
              </Box>
            </FormControl>

            <Center>
              <Pressable onPress={createInquiries}>
                <Box
                  marginBottom={30}
                  marginTop={30}
                  paddingX={7}
                  paddingY={3}
                  backgroundColor="#0666f0"
                  borderRadius={50}>
                  <Text style={{fontWeight: 'bold'}} color="white">
                    確認画面へ
                  </Text>
                </Box>
              </Pressable>
            </Center>
          </Flex>
        ) : (
          <WebView source={{uri: item.link}} style={{flex: 1}} />
        )}
      </Box>
    </SafeAreaView>
  );
}
