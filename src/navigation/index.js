import React from 'react';
import { Platform } from 'react-native';
import { useSelector } from "react-redux";

import { NativeBaseProvider, extendTheme, KeyboardAvoidingView } from 'native-base';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar, useColorMode } from 'native-base';

import MyTheme from '../Theme';
import { MyTabs } from './MyTabs';
import { MyDrawer } from './MyDrawers';

const Navigation = () => {
  const { colorMode } = useColorMode();
  const { display } = useSelector((state) => state.settings);

  // Define the config
  const config = {
    useSystemColorMode: false,
    initialColorMode: display.colorMode,
  };

  // extend the theme
  const customTheme = extendTheme({ config });

  return (
    <NativeBaseProvider theme={customTheme}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={Platform.select({ ios: 0, android: -500 })}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        flex={1}
      >
        <NavigationContainer theme={MyTheme} >
          <StatusBar
            barStyle={colorMode == "light" ? "dark-content" : "light-content"}
            backgroundColor={colorMode == "light" ? "white" : "black"}
          />
          {Platform.OS == 'ios' ?
            <MyTabs /> :
            <MyDrawer />
          }
        </NavigationContainer>
      </KeyboardAvoidingView>
    </NativeBaseProvider>

  );
}

export default Navigation;