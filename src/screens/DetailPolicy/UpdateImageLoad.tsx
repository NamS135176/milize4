import {
    Box,
    Center, Flex, Image, Pressable, ScrollView, Skeleton, Text
} from 'native-base';
import React from 'react';
import detailPolicyStyles from './DetailPolicyStyles';
export default function UpdateImageLoad() {
  return (
    <Box>
      <Box py={2}>
        <Text style={detailPolicyStyles.fontSmallP0}>保険証券など書類原本</Text>
      </Box>
      <ScrollView height={150} horizontal={true}>
        <Flex flexDirection="row" justifyContent="flex-start">
          <Skeleton
            style={{
              height: '100%',
              width: 100,
              borderRadius: 10,
              backgroundColor: '#fafafa',
            }}></Skeleton>
          <Pressable onPress={() => {}}>
            <Box
              margin={2}
              height="100%"
              width={100}
              padding={5}
              borderRadius={3}>
              <Center flex={1}>
                <Box
                  style={detailPolicyStyles.boxShadow}
                  padding={4}
                  backgroundColor="white"
                  borderRadius={40}>
                  <Image
                    alt="add"
                    source={require('../../assets/images/add.png')}></Image>
                </Box>
              </Center>
            </Box>
          </Pressable>
        </Flex>
      </ScrollView>
    </Box>
  );
}
