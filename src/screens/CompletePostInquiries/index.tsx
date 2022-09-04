import React from 'react';
import SafeAreaView from 'react-native-safe-area-view';
import {Center, Box, Text, Flex, Pressable} from 'native-base';
import DoneSVG from '~/assets/images/done.svg';

import {RouteProp} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
interface Props {
  route: RouteProp<MainStackParamList, 'CompletePostInquiries'>;
  navigation: StackNavigationProp<MainStackParamList, 'CompletePostInquiries'>;
}
export default function CompletePostInquiries({navigation}: Props) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Flex flex={1}>
        <Center flex={1}>
          <DoneSVG width={100} height={100}></DoneSVG>
        </Center>
        <Box flex={1}>
          <Center>
            <Text>お問い合わせを受付けました。</Text>
            <Text marginY={5}>ミルホ運営事務局より</Text>
            <Text>2~3日営業日以内にご返信いたします。</Text>
            <Pressable
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Main'}],
                });
                navigation.navigate('Main', {screen:'Profile'})
              }}>
              <Box
                marginBottom={30}
                marginTop={100}
                paddingX={7}
                paddingY={3}
                backgroundColor="#0666f0"
                borderRadius={50}>
                <Text style={{fontWeight: 'bold'}} color="white">
                  戻る
                </Text>
              </Box>
            </Pressable>
          </Center>
        </Box>
        <Box flex={1}>
          <Center></Center>
        </Box>
      </Flex>
    </SafeAreaView>
  );
}
