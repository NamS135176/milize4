import {
  Box,
  Center,
  Flex,
  Image,
  Pressable,
  ScrollView,
  Text,
} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {RNCamera} from 'react-native-camera';
import SafeAreaView from 'react-native-safe-area-view';
import Icon from 'react-native-vector-icons/Ionicons';
import cameraStyles from './cameraStyle';
import TakeAPhotoSVG from '~/assets/photo.svg';
import ImageEditor from '@react-native-community/image-editor';
export default function CameraComponent(Props: any) {
  const w = Dimensions.get('window').width;
  const cameraRef: any = useRef();
  const [uri, setUri] = useState(Props.listImg);
  const [showTut, setShowTut] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowTut(false);
    }, 5000);
  }, []);
  const takePicture = async () => {
    if (cameraRef) {
      const options = {quality: 0.7, base64: true};
      const data = await cameraRef.current.takePictureAsync(options);
      const {  width, height } = data;

          const cropData = {
            offset: { x: 0, y: 0 },
            size: { width, height },
            displaySize: { width: 1080, height: 720 },
          };

          ImageEditor.cropImage(data.uri, cropData).then(url => {
            setUri([...uri, url]);
          })
      
    }
  };

  const handleToPost = () => {
    console.log('handleToPost... ', Props.route.params);
    console.log('cc',Props.route.params.c)
    console.log('id',Props.route.params.id)
    Props.navigation.navigate('PostPolicy', {
      imgList: uri,
      c: Props.route.params.c,
      id: Props.route.params?.id ?? undefined,
    });
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'black'}}>
      <Box flex={1} backgroundColor="#071424">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          paddingX={5}
          padding={7}>
          <Text
            onPress={() => {
              Props.navigation.navigate('Main', {});
            }}
            style={cameraStyles.boldText}>
            キャンセル
          </Text>
          <Text style={cameraStyles.boldText}>保険証券撮影</Text>
          <Pressable onPress={handleToPost}>
            <Text style={cameraStyles.boldText}>次へ</Text>
          </Pressable>
        </Flex>
        <Box flex={1} width={w} height={w} backgroundColor="#071424">
          <Box position="relative">
            <RNCamera
              ref={cameraRef}
              style={{height: w, width: w}}
              ratio="1:1"
              type={RNCamera.Constants.Type.back}
              flashMode={RNCamera.Constants.FlashMode.off}
              androidCameraPermissionOptions={{
                title: 'Permission to use camera',
                message: 'We need your permission to use your camera',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
              androidRecordAudioPermissionOptions={{
                title: 'Permission to use audio recording',
                message: 'We need your permission to use your audio',
                buttonPositive: 'Ok',
                buttonNegative: 'Cancel',
              }}
            />
            <Box
              width={20}
              height={20}
              position="absolute"
              top={5}
              left={5}
              borderTopWidth={5}
              borderLeftWidth={5}
              borderColor="white"
              zIndex={10}></Box>
            <Box
              width={20}
              height={20}
              position="absolute"
              top={5}
              right={5}
              borderTopWidth={5}
              borderRightWidth={5}
              borderColor="white"
              zIndex={10}></Box>
            <Box
              width={20}
              height={20}
              position="absolute"
              bottom={5}
              left={5}
              borderBottomWidth={5}
              borderLeftWidth={5}
              borderColor="white"
              zIndex={10}></Box>
            <Box
              width={20}
              height={20}
              position="absolute"
              bottom={5}
              right={5}
              borderBottomWidth={5}
              borderRightWidth={5}
              borderColor="white"
              zIndex={10}></Box>
            {showTut ? (
              <Center
                animation=""
                width="100%"
                height="100%"
                position="absolute"
                bottom={0}
                right={0}
                zIndex={10}>
                <Box
                  style={{
                    opacity: 1,
                    borderRadius: 30,
                    width: '70%',
                    padding: 25,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      opacity: 1,
                    }}>
                    <Icon name="warning" color="blue" size={20} />{' '}
                    miruhoからのお願い
                  </Text>
                  <Text style={{fontWeight: 'bold', paddingVertical: 3}}>
                    ・保険証券全体が見えるように 撮影してください
                  </Text>
                  <Text style={{fontWeight: 'bold', paddingVertical: 3}}>
                    ・書類の周りに他のモノが映ら ないようにしてください
                  </Text>
                  <Text style={{fontWeight: 'bold', paddingVertical: 3}}>
                    ・明るい場所で撮影してくださ い
                  </Text>
                </Box>
              </Center>
            ) : (
              <></>
            )}
            {showTut ? (
              <Center
                width="100%"
                height="100%"
                position="absolute"
                bottom={0}
                right={0}
                zIndex={9}>
                <Box
                  style={{
                    opacity: 0.8,
                    borderRadius: 30,
                    width: '70%',
                    backgroundColor: 'white',
                    padding: 25,
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: 'white',
                    }}>
                    <Icon name="warning" color="blue" size={20} />{' '}
                    miruhoからのお願い
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingVertical: 3,
                      color: 'white',
                    }}>
                    ・保険証券全体が見えるように 撮影してください
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingVertical: 3,
                      color: 'white',
                    }}>
                    ・書類の周りに他のモノが映ら ないようにしてください
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      paddingVertical: 3,
                      color: 'white',
                    }}>
                    ・明るい場所で撮影してくださ い
                  </Text>
                </Box>
              </Center>
            ) : (
              <></>
            )}
          </Box>

          <ScrollView horizontal={true} paddingTop={5}>
            <Flex flexDirection="row" justifyContent="flex-start">
              {uri.map((item, index) => (
                <Box key={index} margin={2} borderRadius={50}>
                  <Image
                    alt="view"
                    source={{uri: item}}
                    style={{width: 50, height: 70, borderRadius: 10}}></Image>
                </Box>
              ))}
            </Flex>
          </ScrollView>
        </Box>
        <Center paddingY={5}>
          <Pressable onPress={takePicture}>
            <TakeAPhotoSVG />
          </Pressable>
        </Center>
      </Box>
    </SafeAreaView>
  );
}
