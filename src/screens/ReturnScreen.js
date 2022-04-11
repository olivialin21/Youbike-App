import React, { useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Box } from "native-base";
import MapView from 'react-native-maps';

const ReturnScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <Box
    flex={1}
    _dark={{ bg: colors.black1 }}
    _light={{ bg: "white" }}
    >
      <MapView 
        mapType="mutedStandard"
        flex={1}
      />
  </Box>
  );
};

export default ReturnScreen;