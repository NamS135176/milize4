import React,{useRef} from 'react'
import { Box, Modal, Text, Center, Pressable, Flex } from 'native-base'
import AppIntroSlider from 'react-native-app-intro-slider'
import ShareSVG from '~/assets/images/sharingRequest.svg';
import useShareReceive from '~/hooks/useShareReceive';
import { acceptRequest, denyRequset } from '~/services/shareService';
import { Dimensions } from 'react-native';

export default function ModalAccept(Props) {
  const w = Dimensions.get('window').width
    const slider = useRef(null);
    const {loading, sModal, listR, setShow} = useShareReceive()
    const _renderItem = ({item, index}) => {
        return (
          <Box
            flex={1}
            backgroundColor="white"
            style={{paddingHorizontal: 16, paddingVertical: 24}}>
            <Center backgroundColor="white">
              <Text
                style={{
                  fontSize: 20,
                  textAlign: 'center',
                  fontWeight: 'bold',
                  marginBottom: 15,
                }}>
                保険情報の共有依頼が届いてます。{' '}
              </Text>
              <ShareSVG></ShareSVG>

              <Text style={{fontSize: 16, textAlign: 'center', lineHeight:30}}>
                {item.sharee_email}
                さんからミルホ生命の保険情報共有依頼が届いてます。許可しますか？
              </Text>
              <Box
                  marginY={5}
                  paddingX={3}
                  paddingY={1}
                  borderRadius={20}
                  backgroundColor="#F5F6F7">
                  <Text style={{fontSize: 16}}>
                    {index + 1}/{listR.length}
                  </Text>
                </Box>
              <Text style={{fontSize: 12, textAlign: 'center', color: '#6C7883', fontWeight:'bold'}}>
                受諾するとあなたの保険情報に表示されます。
              </Text>
            </Center>
            <Flex flexDirection="row" justifyContent="center">
              <Pressable
                onPress={async () => {
                  if (index != listR.length - 1) {
                    slider.current.goToSlide(index + 1);
                    const res = await denyRequset(
                      item.insurance_policy_id,
                      item.share_key,
                      item.sharee_email,
                      item.sharee_id,
                    );
                  } else {
                   setShow(false)
                    const res = await denyRequset(
                      item.insurance_policy_id,
                      item.share_key,
                      item.sharee_email,
                      item.sharee_id,
                    );
                  }
                }}>
                <Box
                  marginBottom={30}
                  marginTop={30}
                  paddingX={7}
                  paddingY={3}
                  marginRight={3}
                  borderWidth={1}
                  borderColor="#0666f0"
                  borderRadius={50}>
                  <Text style={{fontWeight: 'bold'}} color="#0666f0">
                    いいえ
                  </Text>
                </Box>
              </Pressable>
              <Pressable
                onPress={async () => {
                  if (index != listR.length - 1) {
                    slider.current.goToSlide(index + 1);
                    const res = await acceptRequest(
                      item.insurance_policy_id,
                      item.share_key,
                      item.sharee_email,
                      item.sharee_id,
                    );
                  } else {
                    // dispatch({
                    //   type: 'CLOSE_ACCEPT_MODAL',
                    // });
                    setShow(false)
                    const res = await acceptRequest(
                      item.insurance_policy_id,
                      item.share_key,
                      item.sharee_email,
                      item.sharee_id,
                    );
                   Props.setComplete(true)
                  }
                }}>
                <Box
                  marginBottom={30}
                  marginTop={30}
                  paddingX={7}
                  paddingY={3}
                  marginLeft={3}
                  backgroundColor="#0666f0"
                  borderRadius={50}>
                  <Text style={{fontWeight: 'bold'}} color="white">
                    はい
                  </Text>
                </Box>
              </Pressable>
            </Flex>
          </Box>
        );
      };
    return (
        <Modal
        style={{
          backgroundColor: 'transparent',
          flex: 0.8,
          width: w - 50,
          // marginHorizontal: 20,
          alignSelf: 'center',
          marginTop: w / 4,
        }}
        isOpen={sModal}
        onClose={() => {}}>
        <AppIntroSlider
          style={{width: w - 50, flex: 1}}
          dotStyle={{display: 'none'}}
          activeDotStyle={false}
          renderItem={_renderItem}
          data={listR}
          // onDone={_onDone}
          ref={slider}
          showDoneButton={false}
          showNextButton={false}
        />
      </Modal>
    )
}
