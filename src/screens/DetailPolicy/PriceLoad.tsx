import { Box, Flex, Skeleton, Text } from 'native-base';
import React from 'react';
import detailPolicyStyles from './DetailPolicyStyles';
export default function PriceLoad() {
  return (
    <Box>
      <Box pt={2}>
        <Text py={4} style={detailPolicyStyles.fontSmallP0}>
          保障内容
        </Text>
        <Skeleton
          style={{
            backgroundColor: '#fafafa',
            height: 50,
            width: '100%',
          }}></Skeleton>
      </Box>
      <Box pt={2}>
        <Text py={4} style={detailPolicyStyles.fontSmallP0}>
          総支払い保険料
        </Text>
        <Flex py={3} direction="row" justify="space-between" align="center">
          <Text style={detailPolicyStyles.fontNormal}>0歳~ 歳まで</Text>
          <Flex direction="row" align="center">
            <Text
              px={2}
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: 'red',
              }}></Text>
            <Skeleton
              style={{
                backgroundColor: '#fafafa',
                height: 20,
                width: 50,
              }}></Skeleton>
          </Flex>
        </Flex>
      </Box>
      <Box pt={2}>
        <Text py={4} style={detailPolicyStyles.fontSmallP0}>
          解約返戻金（概算）
        </Text>
        <Flex py={3} direction="row" justify="space-between" align="center">
          <Text style={detailPolicyStyles.fontNormal}>歳で解約時</Text>
          <Flex direction="row" align="center">
            <Text px={2} style={{fontSize: 20, fontWeight: 'bold'}}></Text>
            <Skeleton
              style={{
                backgroundColor: '#fafafa',
                height: 20,
                width: 50,
              }}></Skeleton>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}
