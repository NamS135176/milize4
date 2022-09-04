import React, {useState, useEffect} from 'react';
import {
  Box,
  Text,
  ScrollView,
  Flex,
  Pressable,
  Image,
  Center,
} from 'native-base';
import {getPolicyImages} from '~/services/policyService';
import detailPolicyStyles from './DetailPolicyStyles';
import AddSVG from '~/assets/add.svg';
import UpdateImageLoad from './UpdateImageLoad';
export default function PolicyImage(props: any) {
  const [insuranceImage, setInsuranceImage] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const handleUpdateImage = () => {
    // props.navigation.navigate('Camera', {
    //   c: props.company,
    //   id: props.insuranceId,
    //   listImg:[]
    // });
    props.handleUpdate();
  };
  useEffect(() => {
    const getImage = async () => {
      try {
        const p: any = await getPolicyImages(props.insuranceId);
        console.log(p.images);
        setInsuranceImage(p);
        setIsLoading(false);
      } catch (e) {
        // dialogErrorRequest('Get Policy Image');
        console.log(e.message);
      }
    };
    getImage();
  }, []);
  return (
    <Box>
      {isLoading ? (
        <UpdateImageLoad />
      ) : (
        <Box>
          <Box py={2}>
            <Text style={detailPolicyStyles.fontSmallP0}>
              保険証券など書類原本
            </Text>
          </Box>
          <ScrollView height={150} horizontal={true}>
            <Flex flexDirection="row" justifyContent="flex-start">
              {insuranceImage?.images?.map((item: any) => (
                <Pressable
                  position="relative"
                  onPress={() => {
                    props.navigation.navigate('ShowImageScreen', {
                      dataImg: insuranceImage.images,
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
                      style={{
                        fontSize: 12,
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      保険証原本
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
                      style={{
                        fontSize: 12,
                        textAlign: 'center',
                        color: 'white',
                      }}>
                      保険証原本
                    </Text>
                  </Box>
                </Pressable>
              ))}
              <Pressable onPress={handleUpdateImage}>
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
      )}
    </Box>
  );
}
