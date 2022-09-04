import { Box, Flex, Skeleton, Text } from 'native-base';
import React from 'react';
import UserSVG from '~/assets/user.svg';
import detailPolicyStyles from './DetailPolicyStyles';
export default function InfoInsuranceLoad() {
  return (
    <Box>
      <Flex direction="row" justify="space-between">
        <Skeleton
          style={{
            backgroundColor: '#fafafa',
            marginVertical: 20,
            height: 20,
            width: 100,
          }}></Skeleton>
        <Skeleton
          style={{
            backgroundColor: '#fafafa',
            marginVertical: 20,
            height: 20,
            width: 100,
          }}></Skeleton>
      </Flex>
      <Flex px={5} align="center" direction="row" justify="space-between">
        <Box>
          <Flex align="center" justify="space-between" direction="row" py={1}>
            <Box>
              <Text py={3} style={detailPolicyStyles.fontSmallP0}>
                証券番号
              </Text>
              <Text style={detailPolicyStyles.fontSmallP0}>保障期間</Text>
              <Text py={3} style={detailPolicyStyles.fontSmallP0}>
                保険料
              </Text>
            </Box>
            <Box px={3}>
              <Skeleton
                style={{
                  backgroundColor: '#fafafa',
                  height: 80,
                  width: 100,
                }}></Skeleton>
            </Box>
          </Flex>
        </Box>
        <Skeleton
          style={{
            backgroundColor: '#fafafa',
            height: 80,
            width: 200,
          }}></Skeleton>
      </Flex>
      <Flex align="center" justify="space-around" direction="row" py={4}>
        <Flex align="center">
          <Text style={{fontSize: 12}}>被保険者</Text>
          <Box py={2}>
            <UserSVG />
          </Box>
          <Skeleton
            style={{
              backgroundColor: '#fafafa',

              height: 20,
              width: 100,
            }}></Skeleton>
        </Flex>
        <Flex align="center">
          <Text style={{fontSize: 12}}>受取人</Text>
          <Box py={2}>
            <UserSVG />
          </Box>
          <Skeleton
            style={{
              backgroundColor: '#fafafa',

              height: 20,
              width: 100,
            }}></Skeleton>
        </Flex>
        <Flex align="center">
          <Text style={{fontSize: 12}}>契約者</Text>
          <Box py={2}>
            <UserSVG />
          </Box>
          <Skeleton
            style={{
              backgroundColor: '#fafafa',

              height: 20,
              width: 100,
            }}></Skeleton>
        </Flex>
      </Flex>
    </Box>
  );
}
