import React, { Component, useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { render } from 'react-dom';
import { Camera } from 'expo-camera';

export default function App() {
  
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  
  const takePicture = async () => {
    if (this.camera) {
      this.camera.takePictureAsync(photo => {
        console.log(photo);
      });
    }
  }

  useEffect(() => {
    console.log('asking for permission');
    (async () => {
      console.log('butnothingishappening');
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
    <View style={{ flex: 1}}>
      <Camera style={{flex: 1,}} type={cameraType}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            style={{
              flex: 0.2,
              alignSelf: 'flex-end',
              alignItems: 'center'
            }}
            onPress={() => {
              setCameraType(
                cameraType === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Text style={{ fontSize: 18, marginBottom: 40, color: 'white' }}> Flip </Text>
          </TouchableOpacity>
          {/* <Camera>
            ref={ref => {
              this.camera = ref;
            }}
          </Camera> */}
            <TouchableOpacity
              style={{
                flex: 0.6,
                alignSelf: 'flex-end',
                alignItems: 'center'
              }}
              onPress={ takePicture }>
              <Text style={{ fontSize: 18, marginBottom: 40, color: 'white' }}> Capture </Text>
            </TouchableOpacity>
        </View>
      </Camera>
    </View>
  )
}