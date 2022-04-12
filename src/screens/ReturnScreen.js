import React, { useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Box } from "native-base";
import MapView from 'react-native-maps';
import { useSelector } from "react-redux";

const ReturnScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const region = useSelector((state) => (state.map.region));
  console.log(region)

  return (
    <Box
    flex={1}
    _dark={{ bg: colors.black1 }}
    _light={{ bg: "white" }}
    >
      <MapView 
        region={region}
        flex={1}
        provider="google"
      />
  </Box>
  );
};

export default ReturnScreen;