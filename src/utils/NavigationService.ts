import React from 'react';
import {NavigationContainerRef} from '@react-navigation/native';

const navigationRef = React.createRef<NavigationContainerRef>();

function navigate(name: string, params?: any) {
  navigationRef.current?.navigate(name, params);
}

function replace(name: string, params?: any) {
  navigationRef.current?.reset({
    index: 0,
    routes: [{name, params}],
  });
}

function goBack() {
  navigationRef.current?.goBack();
}

export default {
  navigationRef,
  navigate,
  replace,
  goBack,
};
