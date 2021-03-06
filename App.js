import React, { Component, useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { render } from 'react-dom';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';

export default function App() {
   
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  
  const takePicture = async () => {
    console.log('say cheese');
    if (this.camera) {
      console.log(this.camera);
      let photo = await this.camera.takePictureAsync();
      console.log(photo);
    }
  }

  useEffect(() => {
    console.log('asking for permission');
    (async () => {
      if (Platform.OS === 'ios') {
        const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }

      const { status } = await Camera.requestPermissionsAsync();
      console.log(status);
      setHasPermission(status === 'granted');
    })();
  }, []);
  
  if (hasPermission === null) {
    return <View></View>;
  }
  if (hasPermission === false) {
    return <Text>Cannot access camera.</Text>
  }

  return (
    <View style={{flex: 1}}>
      <Camera style={{flex: 1}} type={cameraType} ref={ref => {
        this.camera = ref;
      }}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', margin: 40}}>
          <TouchableOpacity 
          style={{ 
            alignSelf: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'transparent'
          }} 
          onPress={() => {
            setCameraType(
              cameraType === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
            );
          }}>
            <Text style={{ fontSize: 18, color: 'white'}}>
             flip 
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignSelf: 'flex-end',
              alignItems: 'center',
              backgroundColor: 'transparent'
            }}
            onPress={ takePicture }>
            <Text style={{ fontSize: 18, color: 'white' }}>
              capture
            </Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )










  // return (
  //   <View style={{ flex: 1}}>
  //     <Camera style={{flex: 1,}} type={cameraType}>
  //       <View
  //         style={{
  //           flex: 1,
  //           backgroundColor: 'transparent',
  //           flexDirection: 'row',
  //         }}>
  //         <TouchableOpacity
  //           style={{
  //             flex: 0.2,
  //             alignSelf: 'flex-end',
  //             alignItems: 'center'
  //           }}
  //           onPress={() => {
  //             setCameraType(
  //               cameraType === Camera.Constants.Type.back
  //                 ? Camera.Constants.Type.front
  //                 : Camera.Constants.Type.back
  //             );
  //           }}>
  //           <Text style={{ fontSize: 18, marginBottom: 40, color: 'white' }}> Flip </Text>
  //         </TouchableOpacity>
  //         <Camera
  //           ref={ref => {
  //             this.camera = ref;
  //           }}>
  //           <TouchableOpacity
  //             style={{
  //               flex: 0.6,
  //               alignSelf: 'flex-end',
  //               alignItems: 'center'
  //             }}
  //             onPress={() => takePicture }>
  //             <Text style={{ fontSize: 18, marginBottom: 40, color: 'white' }}> Capture </Text>
  //           </TouchableOpacity>
  //         </Camera>
  //       </View>
  //     </Camera>
  //   </View>
  // )
}