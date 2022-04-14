import React from "react";
import MapView, { Marker, Circle } from 'react-native-maps';
import { Box, useColorMode } from "native-base";

const StarMapScreen = ({ route }) => {
  const {colorMode} =useColorMode()
  console.log(route)
  const { 
    PositionLat,
    PositionLon
  } = route.params.StationPosition;
  return (
    <Box flex={1}>
      <MapView
        showsUserLocation={true}
        initialRegion={{
          longitude: PositionLat,
          latitude: PositionLon,
          longitudeDelta: 0.01,
          latitudeDelta: 0.02,
        }}
        flex={1}
        mapType="mutedStandard"
        userInterfaceStyle={colorMode == "light" ? "light" : "dark"}
      >
        <Marker
          coordinate={{
            latitude: PositionLat,
            longitude: PositionLon
          }}
          key={1}
          title="aa"
          description="aaa"
        >
        </Marker>
      </MapView>
    </Box>
  );
};

export default StarMapScreen;