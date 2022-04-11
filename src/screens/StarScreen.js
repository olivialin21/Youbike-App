import React, { useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Box} from "native-base";
import StarList from '../components/StarList'
import StarData from '../json/starList.json';

const StarScreen = ({ navigation }) => {
  const { colors } = useTheme();

  return (
    <Box
    flex={1}
    _dark={{ bg: colors.black1 }}
    _light={{ bg: "white" }}
  >
    <StarList
      list={StarData}
      navigation={navigation}
    />
  </Box>
  );
};

export default StarScreen;