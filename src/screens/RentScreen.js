import React, { useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Box } from "native-base";
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from "react-redux";
import { setRegion } from "../redux/actions/mapActions";

const RentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const region = useSelector((state) => (state.map.region));
  console.log(region)
  const onRegionChangeComplete = (rgn) => {
    if (
      Math.abs(rgn.latitude - region.latitude) > 0.0002 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0002
    ) {
      dispatch(setRegion(rgn));
    }
  };

  return (
    <Box flex={1}>
      <MapView
        region={region}
        flex={1}
        provider="google"
        onRegionChangeComplete={onRegionChangeComplete}
      />
  </Box>
  );
};

export default RentScreen;