import {Flex, Pressable, Text, Box, Skeleton} from 'native-base';
import React from 'react';
import BackSVG from '~/assets/back.svg';
import totalPolicyStyles from './TotalPolicyStyle';
import TotalSVG from '~/assets/total.svg';
export default function HeaderLoad() {
  return (
    <Box>
      <Flex
        backgroundColor="white"
        flexDirection="row"
        justifyContent="space-between"
        paddingX={5}
        paddingY={2}
        paddingTop={5}>
        <Pressable p={0} onPress={() => {}}>
          <BackSVG />
        </Pressable>
        <Text p={0} style={totalPolicyStyles.boldText}>
          年間合計保険料
        </Text>
        <Text style={{opacity: 0}}>1</Text>
      </Flex>
      <Box
        style={{
          height: 120,
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          backgroundColor: 'white',
        }}>
        <TotalSVG />
        <Skeleton
          style={{
            position: 'absolute',
            height: 20,
            width: 100,
          }}></Skeleton>
      </Box>
      <Text style={{fontSize: 12, color: '#6C7883', padding: 16}}>
        各契約の年間保険料
      </Text>
    </Box>
  );
}
