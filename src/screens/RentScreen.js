import React, { useEffect, useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Box } from "native-base";
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from "react-redux";
import { setRegion } from "../redux/actions/mapActions";

const RentScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const region = useSelector((state) => (state.map.region));
  const [regionNow, setRegionNow] = useState(region);
  useEffect (() => {
    setRegionNow(region)
  },[region])
  const onRegionChangeComplete = (rgn) => {
    if (
      Math.abs(rgn.latitude - region.latitude) > 0.0002 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0002
    ) {
      dispatch(setRegion(rgn));
      setRegionNow(rgn);
    }
  };

  return (
    <Box flex={1}>
      <MapView
        region={regionNow}
        flex={1}
        provider="google"
        onRegionChangeComplete={onRegionChangeComplete}
      />
  </Box>
  );
};

export default RentScreen;