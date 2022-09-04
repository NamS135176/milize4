import {Box, Flex, Image, Input, Pressable, Text} from 'native-base';
import React, {useState} from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {updatePolicy} from '~/services/policyService';
import ModalSuccess from './ModalSuccess';
import {Alert} from 'react-native';
import BackSVG from '~/assets/back.svg';
export default function Index(props: any) {
  const {id, company} = props.route.params;
  console.log({company});
  const [phoneCompany, setPhoneCompany] = useState('');
  const [webCompany, setWebCompany] = useState('');
  const [show, setShow] = useState(false);
  const handleChangePhoneCompany = (text: string) => {
    setPhoneCompany(text);
  };
  const handleChangeWebCompany = (text: string) => {
    setWebCompany(text);
  };
  const handleUpdate = async () => {
    console.log('handle update');
    try {
      const result = await updatePolicy(id, phoneCompany, webCompany);
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1000);
    } catch (e) {
      dialogErrorRequest('Update');
      console.error(e);
    }
  };
  const dialogErrorRequest = (error: string) => {
    Alert.alert(`${error + 'Fail'}`, '', [
      {
        text: 'Close',
        onPress: () =>
          props.navigation.reset({
            index: 0,
            routes: [{name: 'Main'}],
          }),
      },
    ]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fafafa'}}>
      <ModalSuccess show={show} />
      <Box backgroundColor="white">
        <Flex
          paddingX={5}
          paddingY={5}
          flexDirection="row"
          justifyContent="space-between">
          <Pressable
            p={0}
            onPress={() => {
              props.navigation.goBack();
            }}>
            <BackSVG />
          </Pressable>
          <Text p={0} style={{fontSize: 14, fontWeight: 'bold'}}>
            請求先情報編集
          </Text>
          <Pressable onPress={handleUpdate}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>保存</Text>
          </Pressable>
        </Flex>
      </Box>
      <Box>
        <Flex px={4} py={3} direction="row">
          <Image
            alt="doc"
            source={require('../../assets/images/company.png')}
          />
          <Text px={4}>{company}</Text>
        </Flex>
        <Box backgroundColor="white">
          <Input
            onChangeText={handleChangePhoneCompany}
            isRequired={true}
            InputLeftElement={
              <Box paddingLeft={4} paddingY={3}>
                <Text
                  style={{fontSize: 12, color: '#65737F', fontWeight: 'bold'}}>
                  電話番号
                </Text>
              </Box>
            }
            _focus={{
              borderColor: 'blue',
            }}
            borderWidth={2}
            backgroundColor={'white'}
            borderColor="#f5f5f5"
            size="md"
            placeholder="" // mx={4}
            placeholderTextColor={'#6C7883'}
          />
          <Input
            onChangeText={handleChangeWebCompany}
            isRequired={true}
            InputLeftElement={
              <Box paddingLeft={4} paddingY={3}>
                <Text
                  style={{fontSize: 12, color: '#65737F', fontWeight: 'bold'}}>
                  Webサイト
                </Text>
              </Box>
            }
            _focus={{
              borderColor: 'blue',
            }}
            borderWidth={2}
            backgroundColor={'white'}
            borderColor="#f5f5f5"
            size="md"
            placeholder="" // mx={4}
            placeholderTextColor={'#6C7883'}
          />
        </Box>
      </Box>
    </SafeAreaView>
  );
}
