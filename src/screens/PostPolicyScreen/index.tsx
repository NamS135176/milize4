import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  Box,
  Center,
  Flex,
  Icon,
  Image,
  Input,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  Text,
  VStack,
} from 'native-base';
import React, {useState} from 'react';
import {Alert, Dimensions, TouchableOpacity} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import SafeAreaView from 'react-native-safe-area-view';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
} from 'react-native-simple-radio-button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {CreatePolicy, updateImagePolicy} from '~/services/policyService';
import postStyles from './PostStyle';
import AddSVG from '~/assets/add.svg';

interface Props {
  route: RouteProp<MainStackParamList, 'PostPolicy'>;
  navigation: StackNavigationProp<MainStackParamList, 'PostPolicy'>;
}

export default function PostPolicyScreen({route, navigation}: Props) {
  const company: ICompanyState = useSelector((state: IAllState) => {
    return state.company;
  });
  console.log('ccccc', route.params.c);
  console.log('ididid', route.params.id);
  const {imgList} = route.params;
  const [showModal, setShowModal] = useState(false);
  const [itemSelect, setItemSelect] = useState(null);
  const [valueSelect, setValueSelect] = useState(
    route.params.c ? route.params.c : '未選択',
  );
  const [listCompany, setListCompany] = useState(company.companyList);
  const [isLoading, setIsLoading] = useState(false);
  const handleBack = () => {
    navigation.navigate('Camera', {listImg: []});
  };
  const handleCreatePolicy = async () => {
    if (valueSelect == '未選択' || imgList.length == 0) {
      Alert.alert('Please select company and take a photo');
    } else {
      setIsLoading(true);
      const res = await CreatePolicy(imgList, valueSelect);
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'CompletePostPolicy'}],
      });
    }
  };
  const handleUpdatePolicy = async () => {
    if (valueSelect == '未選択' || imgList.length == 0) {
      Alert.alert('Please select company and take a photo');
    } else {
      console.log('update');
      setIsLoading(true);
      console.log('imglist', imgList);
      console.log('r', route.params.id);
      const res = await updateImagePolicy(imgList, route.params.id);
      console.log(res);
      setIsLoading(false);
      navigation.reset({
        index: 0,
        routes: [{name: 'CompletePostPolicy'}],
      });
    }
  };

  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FAFAFA'}}>
      <Box flex={1}>
        <Spinner visible={isLoading} textStyle={{color: '#FFF'}} />
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}>
          <ScrollView horizontal={true}>
            <KeyboardAvoidingView behavior="height">
              <Flex
                width={w}
                height={h}
                paddingBottom={5}
                backgroundColor={'white'}>
                <Flex flexDirection="row" justifyContent="space-between" mt={3}>
                  <Pressable
                    p={5}
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    <Icon
                      size="sm"
                      color="black"
                      as={<Ionicons name="chevron-back-outline" />}
                    />
                  </Pressable>
                  <Text p={5} style={postStyles.boldText}>
                    保険会社を選択
                  </Text>
                  <Pressable
                    p={5}
                    onPress={() => {
                      setShowModal(false);
                    }}>
                    <Text style={postStyles.boldText}> 選択</Text>
                  </Pressable>
                </Flex>
                <VStack
                  backgroundColor="#fafafa"
                  space={2}
                  py={2}
                  px={2}
                  width={w}>
                  <Input
                    placeholder="検索"
                    variant="filled"
                    backgroundColor={'white'}
                    borderRadius={10}
                    onChangeText={e => {
                      const newCompany = company.companyList.filter(company => {
                        return company.display_name.includes(e.toUpperCase());
                      });
                      console.log('new company', newCompany);
                      setListCompany(newCompany);
                    }}
                    _focus={{
                      borderColor: 'white',
                    }}
                    py={1}
                    px={1}
                    InputLeftElement={
                      <Icon
                        size="sm"
                        ml={2}
                        size={5}
                        color="black"
                        as={<Ionicons name="search-outline" />}
                      />
                    }
                  />
                </VStack>

                <ScrollView>
                  <RadioForm animation={false}>
                    {listCompany.map((obj, i) => (
                      <TouchableOpacity
                        key={i}
                        onPress={() => {
                          setItemSelect(i);
                          setValueSelect(listCompany[i].display_name);
                        }}>
                        <RadioButton
                          style={postStyles.itemCompany}
                          labelHorizontal={true}>
                          {/*  You can set RadioButtonLabel before RadioButtonInput */}
                          <RadioButtonInput
                            obj={obj}
                            index={i}
                            isSelected={itemSelect === i}
                            onPress={() => {
                              setItemSelect(i);
                              setValueSelect(listCompany[i].display_name);
                            }}
                            borderWidth={1}
                            buttonInnerColor={'blue'}
                            buttonOuterColor={
                              itemSelect === i ? 'blue' : '#cfd4d9'
                            }
                            buttonSize={16}
                            buttonOuterSize={24}
                            buttonStyle={{}}
                            buttonWrapStyle={{marginLeft: 10, marginTop: 5}}
                          />
                          <Text
                            style={{
                              color: itemSelect === i ? 'blue' : 'black',
                              fontSize: 15,
                              marginTop: 5,
                            }}
                            marginX={7}>
                            {obj.display_name}
                          </Text>
                        </RadioButton>
                      </TouchableOpacity>
                    ))}
                  </RadioForm>
                </ScrollView>
              </Flex>
            </KeyboardAvoidingView>
          </ScrollView>
        </Modal>
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          paddingX={5}
          backgroundColor="white"
          padding={7}>
          <Text onPress={handleBack} style={postStyles.boldText}>
            再撮影
          </Text>
          <Text style={postStyles.boldText}>保險情報入力</Text>
          <Text onPress={handleCreatePolicy} style={{opacity: 0}}>
            再撮影
          </Text>
        </Flex>
        <ScrollView backgroundColor="#FAFAFA" flex={0.4} horizontal={true}>
          <Flex flexDirection="row" justifyContent="flex-start">
            {imgList.map((item, index) => (
              <Box key={index} margin={2} borderRadius={50}>
                <Image
                  alt="view"
                  source={{uri: item}}
                  style={{
                    width: 100,
                    height: '100%',
                    borderRadius: 10,
                  }}></Image>
              </Box>
            ))}
            <Pressable
              onPress={() => {
                navigation.navigate('Camera', {
                  listImg: imgList,
                  c: valueSelect,
                });
              }}>
              <Box
                margin={2}
                height="100%"
                width={100}
                padding={5}
                borderRadius={3}>
                <Center flex={1}>
                  <Box
                    style={postStyles.boxShadow}
                    padding={3}
                    backgroundColor="white"
                    borderRadius={40}>
                    <AddSVG />
                  </Box>
                </Center>
              </Box>
            </Pressable>
          </Flex>
        </ScrollView>
        <Box backgroundColor="#FAFAFA">
          <Text style={{fontSize: 10, color: '#848F97'}} padding={3}>
            書類種別
          </Text>
          <Box
            paddingY={3}
            paddingLeft={5}
            borderTopWidth={1}
            borderBottomWidth={1}
            borderColor="#ddd">
            <Flex
              flexDirection="row"
              justifyContent="flex-start"
              alignItems="center">
              <Box style={{opacity: 0.5}}>
                <Image
                  alt="doc"
                  source={require('../../assets/images/document.png')}></Image>
              </Box>
              <Text style={postStyles.textDisable}>保險証券</Text>
            </Flex>
          </Box>
        </Box>
        {route.params.c && route.params.id ? (
          <Box>
            <Box backgroundColor="#FAFAFA">
              <Text style={{fontSize: 10, color: '#848F97'}} padding={3}>
                保險会社
              </Text>
              <Box
                backgroundColor="white"
                paddingY={3}
                paddingLeft={5}
                borderTopWidth={1}
                borderBottomWidth={1}
                borderColor="#000">
                <Flex
                  flexDirection="row"
                  justifyContent="flex-start"
                  alignItems="center">
                  <Image
                    alt="doc"
                    source={require('../../assets/images/company.png')}></Image>
                  <Text style={postStyles.textShow}>{valueSelect}</Text>
                </Flex>
              </Box>
            </Box>
          </Box>
        ) : (
          <Pressable
            onPress={() => {
              setListCompany(company.companyList);
              setShowModal(true);
            }}>
            <Box backgroundColor="#FAFAFA">
              <Text style={{fontSize: 10, color: '#848F97'}} padding={3}>
                保險会社
              </Text>
              <Box
                backgroundColor="white"
                paddingY={3}
                paddingLeft={5}
                borderTopWidth={1}
                borderBottomWidth={1}
                borderColor="#000">
                <Flex
                  flexDirection="row"
                  justifyContent="flex-start"
                  alignItems="center">
                  <Image
                    alt="doc"
                    source={require('../../assets/images/company.png')}></Image>
                  <Text style={postStyles.textShow}>{valueSelect}</Text>
                </Flex>
              </Box>
            </Box>
          </Pressable>
        )}
        <Center backgroundColor="#FAFAFA">
          {valueSelect === '未選択' ? (
            <Pressable disabled={true}>
              <Box
                marginBottom={30}
                marginTop={30}
                paddingX={7}
                paddingY={3}
                backgroundColor={
                  valueSelect === '未選択' ? '#99BFF6' : '#0666f0'
                }
                borderRadius={50}>
                <Text style={{fontWeight: 'bold'}} color="white">
                  登錄
                </Text>
              </Box>
            </Pressable>
          ) : (
            <Pressable
              onPress={() => {
                route.params.c && route.params.id
                  ? handleUpdatePolicy()
                  : handleCreatePolicy();
              }}>
              <Box
                marginBottom={30}
                marginTop={30}
                paddingX={7}
                paddingY={3}
                backgroundColor="#0666f0"
                borderRadius={50}>
                <Text style={{fontWeight: 'bold'}} color="white">
                  登錄
                </Text>
              </Box>
            </Pressable>
          )}
        </Center>
      </Box>
    </SafeAreaView>
  );
}
