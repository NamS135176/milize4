import React, {useRef} from 'react';
import {
  Container,
  Text,
  Button,
  Center,
  Image,
  Pressable,
  Box,
} from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
import {StyleSheet, LogBox} from 'react-native';
// import SvgUri from 'react-native-svg-uri';
import {SvgUri} from 'react-native-svg';
import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
// import useFcm from '../../hooks/useFcm';
import LottieView from 'lottie-react-native';

LogBox.ignoreAllLogs();
const styles = StyleSheet.create({
  textDes: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    paddingVertical:3
  },
});
interface Props {
  route: RouteProp<MainStackParamList, 'IntroSlider'>;
  navigation: StackNavigationProp<MainStackParamList, 'IntroSlider'>;
}
export default function IntroSlideScreen({navigation}: Props) {
  const slider = useRef(null);
  // useFcm();
  const slides = [
    {
      key: 'one',
      title: 'Title 1',
      text1: `保険はチリツモで`,
      text2: `高い買い物になりがち`,
      text3: ``,
      image: require('~/assets/lottie/miruho_WS01.json'),
      dotImg: require('~/assets/images/dot1.png'),
      backgroundColor: '#fff',
      btnText: '次へ',
      idx: 1,
    },
    {
      key: 'two',
      title: 'Title 1',
      text1: `自分や家族の保険は`,
      text2: `把握しづらい`,
      text3: ``,
      image: require('~/assets/lottie/miruho_WS02.json'),
      dotImg: require('~/assets/images/dot2.png'),
      backgroundColor: '#fff',
      btnText: '次へ',
      idx: 2,
    },
    {
      key: 'three',
      title: 'Title 1',
      text1: `保障や保険料が`,
      text2: `自分の身の丈に合っているか`,
      text3: `わからない`,
      image: require('~/assets/lottie/miruho_WS03.json'),
      dotImg: require('~/assets/images/dot3.png'),
      backgroundColor: '#fff',
      btnText: '次へ',
      idx: 3,
    },
    {
      key: 'four',
      title: 'Title 1',
      text1: `あっ!!と思ったあなた、`,
      text2: `保険を見える化してみませんか?`,
      text3: ``,
      image: require('~/assets/lottie/miruho_WS04.json'),
      dotImg: require('~/assets/images/dot4.png'),
      backgroundColor: '#fff',
      btnText: '次へ',
      idx: 4,
    },
    {
      key: 'five',
      title: 'Title 1',
      text1: `保険の無駄に気づけるかも!!`,
      text2: `さあ、miruhoをはじめよう。`,
      text3: ``,
      image: require('~/assets/lottie/miruho_WS05.json'),
      dotImg: require('~/assets/images/dot5.png'),
      backgroundColor: '#fff',
      btnText: 'miruhoを始める',
      idx: 5,
    },
  ];
  const _renderItem = ({item}) => {
    return (
      <Center backgroundColor={item.backgroundColor} flex={1}>
        {/* <Image source={item.image} alt="Alternate Text" size={300} /> */}
        <LottieView
          style={{width: 300}}
          source={item.image}
          // source={require('~/assets/lottie/miruho_WS05.json')}
          autoPlay
          loop
        />

        <Box marginY={50}>
          <Text style={styles.textDes}>{item.text1}</Text>
          <Text style={styles.textDes}>{item.text2}</Text>
          {item.text3 != '' ? (
            <Text style={styles.textDes}>{item.text3}</Text>
          ) : (
            <></>
          )}
        </Box>
        <Image
          style={{width: '30%'}}
          source={item.dotImg}
          alt="Alternate Text"
          resizeMode="contain"
        />
        <Pressable
          onPress={() => {
            if (item.idx != 5) {
              slider.current.goToSlide(item.idx);
            } else {
              // navigation.navigate('Details')
              navigation.reset({
                index: 0,
                routes: [{name: 'Selection'}],
              });
            }
          }}>
          <Box
            marginBottom={100}
            marginTop={30}
            paddingX={5}
            paddingY={2}
            backgroundColor="#0666f0"
            borderRadius={50}>
            <Text color="white" style={{fontWeight:"bold"}}>{item.btnText}</Text>
          </Box>
        </Pressable>
      </Center>
    );
  };

  const _onDone = () => {
    navigation.navigate('Selection', {});
  };

  return (
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
  );
  // return <LottieView source={require('~/assets/lottie/miruho_WS01.json')} autoPlay loop />;
}
