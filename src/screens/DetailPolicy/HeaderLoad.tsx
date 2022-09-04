import {Flex, Pressable, Skeleton} from 'native-base';
import React from 'react';
import BackSVG from '~/assets/back.svg';
import ShareSVG from '~/assets/images/share.svg';
export default function HeaderLoad() {
  return (
    <Flex
      paddingX={5}
      paddingY={5}
      flexDirection="row"
      justifyContent="space-between">
      <Pressable p={0} onPress={() => {}}>
        <BackSVG />
      </Pressable>
      <Skeleton
        style={{
          backgroundColor: '#fafafa',
          height: 20,
          width: 100,
        }}></Skeleton>
      <Pressable onPress={() => {}}>
        <ShareSVG></ShareSVG>
      </Pressable>
    </Flex>
  );
}
