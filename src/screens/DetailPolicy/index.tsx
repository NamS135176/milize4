import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Box,
  Center,
  Flex,
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Dimensions, Linking} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import AddSVG from '~/assets/add.svg';
import BackSVG from '~/assets/back.svg';
import DeleteSVG from '~/assets/delete.svg';
import WalkthroughtSVG from '~/assets/images/photographWalkthrough3.svg';
import ShareSVG from '~/assets/images/share.svg';
import UserSVG from '~/assets/user.svg';
import {deletePolicyDetail, getPolicyDetail} from '~/services/policyService';
import {renderUnit} from '~/utils/renderUnit';
import RenderImage from '../InsuranceScreen/RenderImage';
import detailPolicyStyles from './DetailPolicyStyles';
import HeaderLoad from './HeaderLoad';
import InfoInsuranceLoad from './InfoInsuranceLoad';
import LabelLoad from './LabelLoad';
import PolicyImage from './PolicyImage';
import PriceLoad from './PriceLoad';
export default function Index(props: any) {
  const {insuranceId} = props.route.params;
  const [insurance, setInsurance] = useState<any>(null);
  const [insuranceImage, setInsuranceImage] = useState<any>(null);
  const [showShare, setShowShare] = useState<boolean>(false);
  const w = Dimensions.get('window').width;
  const h = Dimensions.get('window').height;
  const handleUpdateImage = () => {
    console.log('qweqweqwe');
    if (insurance.is_mine) {
      props.navigation.navigate('Camera', {
        c: insurance.company,
        id: insuranceId,
        listImg: [],
      });
    } else {
      setModalErrorShare(true);
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

  useEffect(() => {
    const getData = async () => {
      try {
        const p: any = await getPolicyDetail(insuranceId);
        setInsurance(p);
      } catch (e) {
        dialogErrorRequest('Get Policy');
        console.log(e.message);
      }
    };
    getData();
  }, []);

  const arrInsuranceLabel = [
    '??????',
    '??????',
    '??????',
    '??????',
    '??????',
    '????????????',
    '????????????',
    '????????????',
    '??????',
    '????????????',
    '????????????',
    '?????????',
    '????????????',
  ];

  const [showModalShare, setShowModalShare] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [modalErrorShare, setModalErrorShare] = useState(false);

  const handleToShare = async () => {
    const firstShare = await AsyncStorage.getItem('firstShare');
    console.log(firstShare);
    // setShowModalShare(true);
    if (insurance.is_mine) {
      if (firstShare) {
        props.navigation.navigate('Share', {id: insurance.id});
      } else {
        await AsyncStorage.setItem('firstShare', 'firstShare');
        setShowModalShare(true);
      }
    } else {
      setModalErrorShare(true);
    }
  };
  const handleUpdateWebPhone = () => {
    if (insurance.is_mine) {
      props.navigation.navigate('UpdateDetailPolicy', {
        id: insuranceId,
        company: insurance.company,
      });
    } else {
      setModalErrorShare(true);
    }
  };

  const header = (insurance: any) => (
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
      <Text p={0} style={detailPolicyStyles.boldText}>
        {insurance.insurance_name
          ? insurance.insurance_name
          : insurance.insurance_type}
      </Text>
      <Pressable onPress={handleToShare}>
        <ShareSVG size={24}></ShareSVG>
      </Pressable>
    </Flex>
  );
  const infoInsurance = (insurance: any) => (
    <Box>
      <Flex direction="row" justify="space-between">
        <Text style={detailPolicyStyles.fontSmall}>{insurance.company}</Text>
        <Text style={detailPolicyStyles.fontSmall}>
          {insurance.insurance_type}
        </Text>
      </Flex>
      <Flex px={5} align="center" direction="row" justify="space-between">
        <Box>
          <Flex align="center" justify="space-between" direction="row" py={1}>
            <Box>
              <Box p={1}>
                <Text style={detailPolicyStyles.fontSmallP0}>????????????</Text>
              </Box>
              <Box p={1} py={2}>
                <Text style={detailPolicyStyles.fontSmallP0}>????????????</Text>
              </Box>

              <Box p={1}>
                <Text style={detailPolicyStyles.fontSmallP0}>?????????</Text>
              </Box>
            </Box>
            <Box px={3}>
              <Box p={1}>
                <Text style={detailPolicyStyles.fontNormal}>
                  {insurance.policy_number}
                </Text>
              </Box>

              <Box p={1} py={2}>
                <Text style={detailPolicyStyles.fontNormal}>
                  {insurance.insured_age_contracted_on}???~
                  {insurance.insurance_period_whole_life
                    ? '??????'
                    : `${insurance.insurance_period_age}?????????`}
                </Text>
              </Box>

              <Box p={1}>
                <Text style={detailPolicyStyles.fontNormal}>
                  {insurance.premium} {insurance.premium_unit}/
                  {renderUnit(insurance.premium_payment_method_ja)}
                </Text>
              </Box>
            </Box>
          </Flex>
        </Box>
        <RenderImage width={200} height={120} type={insurance.display_type} />
      </Flex>
      <Flex align="flex-start" justify="space-around" direction="row" py={4}>
        <Flex style={{flexBasis: 200, paddingHorizontal: 30}} align="center">
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#6C7883'}}>
            ????????????
          </Text>
          <Box py={2}>
            <UserSVG />
          </Box>
          <Text style={detailPolicyStyles.fontNormal}>{insurance.insured}</Text>
        </Flex>
        <Flex
          style={{
            flexBasis: 200,
            paddingHorizontal: 30,
          }}
          align="center">
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#6C7883'}}>
            ?????????
          </Text>
          <Box py={2}>
            <UserSVG />
          </Box>
          <Text style={detailPolicyStyles.fontNormal}>{insurance.payee}</Text>
        </Flex>
        <Flex style={{flexBasis: 200, paddingHorizontal: 30}} align="center">
          <Text style={{fontSize: 12, fontWeight: 'bold', color: '#6C7883'}}>
            ?????????
          </Text>
          <Box py={2}>
            <UserSVG />
          </Box>
          <Text style={detailPolicyStyles.fontNormal}>
            {insurance.contractor}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
  const insuranceLabel = (insurance: any) => (
    <Box>
      <Box py={3}>
        <Text style={detailPolicyStyles.fontSmallP0}>????????????</Text>
      </Box>
      <Flex flexWrap="wrap" direction="row">
        {arrInsuranceLabel.map((item, index) => {
          const changeColor = insurance.insurance_labels?.find(
            (e: any) => e.label_ja === item,
          );
          let color = changeColor ? '#0766EF' : '#b1cef7';
          return (
            <Box
              key={index}
              borderRadius={5}
              style={{
                backgroundColor: color,
                margin: 3,
                paddingRight: 4,
                paddingLeft: 4,
                paddingTop: 2,
                paddingBottom: 2,
              }}>
              <Text style={{color: 'white', fontSize: 12}}>{item}</Text>
            </Box>
          );
        })}
      </Flex>
    </Box>
  );
  const insurancePrice = (insurance: any) => (
    <Box style={{marginBottom: 32}}>
      <Box pt={2}>
        <Text py={4} style={detailPolicyStyles.fontSmallP0}>
          ????????????
        </Text>
        {insurance.insurance_details?.map((item: any) => (
          <Flex
            key={item.id}
            py={3}
            direction="row"
            justify="space-between"
            align="center">
            <Text style={detailPolicyStyles.fontNormal}>
              {item.detail_name_ja}
            </Text>
            <Flex direction="row" align="center">
              <Text style={detailPolicyStyles.fontSmallP0}>
                {item.receive_method}
              </Text>
              <Text px={2} style={{fontSize: 20, fontWeight: 'bold'}}>
                {item.receive_amount}
              </Text>
              <Text style={detailPolicyStyles.fontSmallP0}>
                {item.receive_amount_unit}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Box>
      <Box pt={2}>
        <Text py={1} style={detailPolicyStyles.fontSmallP0}>
          ?????????????????????????????????
        </Text>
        <Flex py={3} direction="row" justify="space-between" align="center">
          <Text style={detailPolicyStyles.fontNormal}>
            {insurance.insured_age_contracted_on}???~
            {insurance.premium_payment_whole_life
              ? '??????'
              : `${insurance.premium_payment_age}?????????`}
          </Text>
          <Flex direction="row" align="center">
            <Text
              px={2}
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'red',
              }}>
              {insurance.lifetime_premium}
            </Text>
            <Text style={detailPolicyStyles.fontSmallP0}>
              {insurance.lifetime_premium_unit}
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Box pt={2}>
        <Text py={1} style={detailPolicyStyles.fontSmallP0}>
          ???????????????????????????
        </Text>
        <Flex py={2} direction="row" justify="space-between" align="center">
          <Text style={detailPolicyStyles.fontNormal}>
            {insurance.cash_surrender_age}???????????????
          </Text>
          <Flex direction="row" align="center">
            <Text px={2} style={{fontSize: 20, fontWeight: 'bold'}}>
              {insurance.cash_surrender_value}
            </Text>
            <Text style={detailPolicyStyles.fontSmallP0}>
              {insurance.cash_surrender_unit}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
  const insuranceUpdateImage = (insurance: any) => (
    <Box>
      <Box py={2}>
        <Text style={detailPolicyStyles.fontSmallP0}>??????????????????????????????</Text>
      </Box>
      <ScrollView height={150} horizontal={true}>
        <Flex flexDirection="row" justifyContent="flex-start">
          {insuranceImage.images?.map((item: any) => (
            <Pressable
              position="relative"
              onPress={() => {
                props.navigation.navigate('ShowImageScreen', {
                  dataImg: item.image_bin,
                });
              }}
              key={item.id}
              margin={2}
              borderRadius={50}>
              <Image
                alt="view"
                source={{
                  uri: `data:image/jpeg;base64,${item.image_bin}`,
                }}
                style={{
                  width: 100,
                  height: '100%',
                  borderRadius: 10,
                }}
              />
              <Box
                borderBottomLeftRadius={10}
                borderBottomRadius={10}
                opacity={0.8}
                backgroundColor="#0E263F"
                paddingY={1}
                bottom={0}
                left={0}
                position="absolute"
                width="100%">
                <Text
                  style={{fontSize: 12, textAlign: 'center', color: 'white'}}>
                  ???????????????
                </Text>
              </Box>
              <Box
                borderBottomLeftRadius={10}
                borderBottomRadius={10}
                opacity={0.8}
                backgroundColor="transparent"
                paddingY={1}
                bottom={0}
                left={0}
                position="absolute"
                width="100%">
                <Text
                  style={{fontSize: 12, textAlign: 'center', color: 'white'}}>
                  ???????????????
                </Text>
              </Box>
            </Pressable>
          ))}
          <Pressable
            onPress={() => {
              console.log('qweqwe');
            }}>
            <Box
              margin={2}
              height="100%"
              width={100}
              padding={5}
              borderRadius={3}>
              <Center flex={1}>
                <Box
                  style={detailPolicyStyles.boxShadow}
                  padding={2}
                  backgroundColor="white"
                  borderRadius={40}>
                  <AddSVG />
                </Box>
              </Center>
            </Box>
          </Pressable>
        </Flex>
      </ScrollView>
    </Box>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box backgroundColor="white" flex={1}>
        {!insurance ? (
          <Box flex={1}>
            <Box style={{backgroundColor: '#fafafa'}} flex={1}>
              <Box backgroundColor="white">
                <HeaderLoad />
                <ScrollView>
                  <InfoInsuranceLoad />
                  <Box px={5} backgroundColor="#fafafa">
                    <LabelLoad />
                    <PriceLoad />
                    {/* <UpdateImageLoad /> */}
                  </Box>
                  <Box backgroundColor="#fafafa" h={100}></Box>
                </ScrollView>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box flex={1}>
            <Modal
              isOpen={modalErrorShare}
              onClose={() => setModalErrorShare(false)}>
              <Modal.Content maxWidth="80%">
                <Text style={{fontSize: 20}}>?????????</Text>
                <Text
                  style={{paddingRight: 30, paddingTop: 20, paddingBottom: 35}}>
                  ????????????????????????????????????????????????????????????
                </Text>
                <Text
                  onPress={() => {
                    setModalErrorShare(false);
                  }}
                  style={{
                    textAlign: 'right',
                    paddingHorizontal: 15,
                    paddingVertical: 20,
                    color: '#2097f3',
                  }}>
                  ?????????
                </Text>
              </Modal.Content>
            </Modal>
            <Modal
              // style={detailPolicyStyles.modalShare}
              isOpen={showModalShare}
              onClose={() => {}}>
              <Box backgroundColor="white" width={w} height={h}>
                <Flex
                  justifyContent="space-between"
                  flexDirection="row"
                  paddingY={5}
                  paddingX={5}>
                  <Pressable
                    onPress={() => {
                      setShowModalShare(false);
                    }}>
                    <Image
                      alt="noti"
                      source={require('~/assets/images/back.png')}></Image>
                  </Pressable>
                  <Text style={{fontWeight: 'bold'}}>????????????????????????</Text>
                  <Image
                    style={{opacity: 0}}
                    alt="noti"
                    source={require('~/assets/images/cancel.png')}></Image>
                </Flex>
                <Center>
                  {' '}
                  <WalkthroughtSVG></WalkthroughtSVG>
                  <Text style={detailPolicyStyles.textShare}>
                    ???????????????????????????????????? ???????????????????????????????????????
                  </Text>
                  <Pressable
                    onPress={() => {
                      setShowModalShare(false);
                      props.navigation.navigate('Share', {id: insuranceId});
                    }}>
                    <Box
                      // marginBottom={30}
                      marginTop={31}
                      paddingX={7}
                      paddingY={3}
                      backgroundColor="#0666f0"
                      borderRadius={50}>
                      <Text style={{fontWeight: 'bold'}} color="white">
                        ??????
                      </Text>
                    </Box>
                  </Pressable>
                </Center>
              </Box>
            </Modal>
            <Modal
              isOpen={showModalDelete}
              onClose={() => setShowModalDelete(false)}>
              <Modal.Content maxWidth="80%">
                <Text style={{fontSize: 20}}>??????????????? </Text>
                <Text
                  style={{paddingRight: 30, paddingTop: 20, paddingBottom: 35}}>
                  ???????????????????????????????????????????
                </Text>
                <Flex direction="row" justifyContent="flex-end">
                  <Text
                    onPress={() => {
                      setShowModalDelete(false);
                    }}
                    style={{
                      textAlign: 'right',
                      paddingHorizontal: 15,
                      paddingVertical: 20,
                      color: '#2097f3',
                    }}>
                    ???????????????
                  </Text>
                  <Text
                    onPress={async () => {
                      try {
                        await deletePolicyDetail(insuranceId);
                        props.navigation.reset({
                          index: 0,
                          routes: [{name: 'Main'}],
                        });
                      } catch (e) {
                        dialogErrorRequest('Delete Policy');
                        console.log(e.message);
                      }
                    }}
                    style={{
                      textAlign: 'right',
                      paddingHorizontal: 15,
                      paddingVertical: 20,
                      color: '#2097f3',
                    }}>
                    ??????
                  </Text>
                </Flex>
              </Modal.Content>
            </Modal>
            <Box style={{backgroundColor: '#fafafa'}} flex={1}>
              <Box backgroundColor="white">
                {header(insurance)}
                <ScrollView>
                  {infoInsurance(insurance)}
                  <Box px={5} backgroundColor="#fafafa">
                    <Box pt={2}>
                      <Text py={1} style={detailPolicyStyles.fontSmallP0}>
                        ???????????????
                      </Text>
                      <Flex
                        py={3}
                        direction="row"
                        justify="space-between"
                        align="center">
                        <Text style={detailPolicyStyles.fontNormal}>
                          {insurance.saving_amount_age}???
                        </Text>
                        <Flex direction="row" align="center">
                          <Text
                            px={2}
                            style={{
                              fontSize: 20,
                              fontWeight: 'bold',
                            }}>
                            {insurance.saving_amount}
                          </Text>
                          <Text style={detailPolicyStyles.fontSmallP0}>
                            {insurance.saving_amount_unit}
                          </Text>
                        </Flex>
                      </Flex>
                    </Box>
                    {insuranceLabel(insurance)}

                    {insurancePrice(insurance)}
                    {/* {insuranceUpdateImage(insurance)} */}
                    <PolicyImage
                      insuranceId={insuranceId}
                      company={insurance.company}
                      navigation={props.navigation}
                      handleUpdate={() => {
                        handleUpdateImage();
                      }}
                    />
                    <Flex py={3} pt={7} direction="row" justify="space-between">
                      <Text style={detailPolicyStyles.fontSmallP0}>
                        ???????????????
                      </Text>
                      <Pressable onPress={handleUpdateWebPhone}>
                        <Text
                          style={{
                            fontSize: 12,
                            color: '#0B61DD',
                            fontWeight: 'bold',
                          }}>
                          ??????
                        </Text>
                      </Pressable>
                    </Flex>
                    <Flex
                      flex={1}
                      direction="row"
                      align="center"
                      justify="space-between">
                      <Flex flex={1} direction="row" align="center" pr={6}>
                        <Image
                          alt="doc"
                          source={require('../../assets/images/company.png')}
                        />
                        <Text
                          numberOfLines={2}
                          paddingX={3}
                          style={detailPolicyStyles.fontNormal}>
                          {insurance.company}
                        </Text>
                      </Flex>
                      <Flex
                        direction="row"
                        flex={1}
                        ml={2}
                        justifyContent="flex-end"
                        align="center">
                        <Pressable
                          onPress={() => {
                            if (insurance.website) {
                              Linking.openURL(`${insurance.website}`);
                            }
                          }}
                          borderWidth={1}
                          borderColor="#0B61DD"
                          p={2}
                          px={5}
                          mx={2}
                          borderRadius={50}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#0B61DD',
                              fontWeight: 'bold',
                            }}>
                            web?????????
                          </Text>
                        </Pressable>
                        <Pressable
                          onPress={() => {
                            Linking.openURL(`tel:${insurance.billing_phone}`);
                          }}
                          borderWidth={1}
                          borderColor="#0B61DD"
                          p={2}
                          px={5}
                          borderRadius={50}>
                          <Text
                            style={{
                              fontSize: 12,
                              color: '#0B61DD',
                              fontWeight: 'bold',
                            }}>
                            ??????
                          </Text>
                        </Pressable>
                      </Flex>
                    </Flex>

                    <Flex
                      py={5}
                      pt={8}
                      direction="row"
                      justify="center"
                      align="center">
                      <Pressable
                        onPress={() => {
                          if (insurance.is_mine) {
                            setShowModalDelete(true);
                          } else {
                            setModalErrorShare(true);
                          }
                        }}>
                        <Flex direction="row" align="center">
                          <DeleteSVG width={30} height={30} />
                          <Text
                            style={{
                              color: '#0B61DD',
                              fontSize: 12,
                              fontWeight: 'bold',
                            }}>
                            ?????????????????????
                          </Text>
                        </Flex>
                      </Pressable>
                    </Flex>
                    <Box backgroundColor="#EDEEED" p={2} px={3}>
                      <Text style={{fontSize: 10}}>
                        ???1?????????=110???/1?????????=375?????????????????????????????????????????????
                      </Text>
                      <Text style={{fontSize: 10}}>
                        ??????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????????
                        ?????????????????????
                      </Text>
                    </Box>
                  </Box>
                  <Box backgroundColor="#fafafa" h={100}></Box>
                </ScrollView>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </SafeAreaView>
  );
}
