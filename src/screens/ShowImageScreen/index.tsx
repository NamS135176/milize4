import React from 'react';
import {Box, Image} from 'native-base';
import SafeAreaView from 'react-native-safe-area-view';
import ImageViewer from 'react-native-image-zoom-viewer';
export default function Index(props: any) {
  const {dataImg} = props.route.params;
  console.log(dataImg.length);
  
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Box flex={1}>
      {/* <ImageViewer enableImageZoom={false} imageUrls={[{url:`data:image/jpeg;base64,${dataImg}`}]}/> */}
      <ImageViewer enableImageZoom={false} imageUrls={dataImg.map((item:any) => {
        return {
          url:`data:image/jpeg;base64,${item.image_bin}`
        }
      })}/>
      </Box>
    </SafeAreaView>
  );
}
