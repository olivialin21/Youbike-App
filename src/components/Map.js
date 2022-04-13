import React, { useEffect, useState } from "react";
import { useTheme } from '@react-navigation/native';
import { Box } from "native-base";
import MapView from 'react-native-maps';
import { useDispatch, useSelector } from "react-redux";
import { setRegion } from "../redux/actions/mapActions";

const Map = ({ method }) => {
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
        initialRegion={{
          longitude: 121.544637,
          latitude: 25.024624,
          longitudeDelta: 0.01,
          latitudeDelta: 0.02,
        }}
        region={regionNow}
        flex={1}
        provider="google"
        onRegionChangeComplete={onRegionChangeComplete}
      >
        {/* {ubike.map((site) => (
          <Marker
            coordinate={{
              latitude: Number(site.lat),
              longitude: Number(site.lng),
            }}
            key={site.sno}
            title={`${site.sna} ${site.sbi}/${site.tot}`}
            description={site.ar}
          />
        ))} */}
      </MapView>
    </Box>
  );
};

export default Map;