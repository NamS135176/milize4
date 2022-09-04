import React, {useRef, useEffect} from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import {Box, Center, Image, Text, Pressable} from 'native-base';
import {RouteProp} from '@react-navigation/core';
import SplashScreen from 'react-native-splash-screen';
import SafeAreaView from 'react-native-safe-area-view';
import {StackNavigationProp} from '@react-navigation/stack';

interface Props {
  route: RouteProp<MainStackParamList, 'IntroCamera'>;
  navigation: StackNavigationProp<MainStackParamList, 'IntroCamera'>;
}

const slides = [
  {
    key: 'one',
    title: 'Title 1',
    text1: `保険証券を準備しましょう!`,
    text2: `契約毎に保険情報の登録を行いましょう。A3サイズ・複数枚・表裏ある証券はすべて撮影してください。`,
    image: require('../../assets/images/photographWalkthrough1.png'),
    dotImg: require('../../assets/images/dotCam1.png'),
    backgroundColor: '#fff',
    btnText1: '次へ',
    btnText2: 'スキップ',
    idx: 1,
  },
  {
    key: 'two',
    title: 'Title 2',
    text1: `家族間での保険情報の共有も可能!`,
    text2: `ファミリーシェア機能を利用することで家族の保険を共有でき、もしもの時にも備えられます。`,
    image: require('../../assets/images/photographWalkthrough3.png'),
    dotImg: require('../../assets/images/dotCam2.png'),
    backgroundColor: '#fff',
    btnText1: `それでは撮影してみましょう`,
    btnText2: '',
    idx: 2,
  },
];

export default function IntroCameraScreen({navigation}: Props) {
  useEffect(() => {
    SplashScreen.hide();
  });
  const slider = useRef(null);
  const _onDone = () => {
    // navigation.navigate('Camera', {});
  };

  const _renderItem = ({item}) => {
    return (
      <Center key={item.idx} backgroundColor="white" flex={1} paddingX={9}>
        <Image
          alt="alt"
          source={item.image}
          style={{width: 300, height: 300}}></Image>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginVertical: 20}}>
          {item.text1}
        </Text>
        <Text style={{textAlign: 'center'}}>{item.text2}</Text>
        <Box marginY={9}>
          <Image
            style={{width: 50, height: 16}}
            alt="dot"
            source={item.dotImg}></Image>
        </Box>
        <Pressable
          onPress={() => {
            if (item.idx != 2) {
              slider.current.goToSlide(item.idx);
            } else {
              navigation.navigate('Camera',{listImg:[]});
            }
          }}>
          <Box
            marginBottom={30}
            paddingX={7}
            paddingY={3}
            backgroundColor="#0666f0"
            borderRadius={50}>
            <Text style={{fontWeight: 'bold'}} color="white">
              {item.btnText1}
            </Text>
          </Box>
        </Pressable>
        {item.btnText2 != '' ? (
          <Text
            onPress={() => {
              navigation.navigate('Camera', {listImg:[]});
            }}
            style={{color: '#0666f0', fontWeight: 'bold'}}>
            {item.btnText2}
          </Text>
        ) : (
          <></>
        )}
      </Center>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box flex={1}>
        <AppIntroSlider
          dotStyle={{display: 'none'}}
          activeDotStyle={false}
          renderItem={_renderItem}
          data={slides}
          onDone={_onDone}
          ref={slider}
          showDoneButton={false}
          showNextButton={false}
        />
      </Box>
    </SafeAreaView>
  );
}
