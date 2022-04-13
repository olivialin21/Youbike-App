import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { useTheme } from '@react-navigation/native';
import { useColorMode, Box, Image } from "native-base";
import MapView, { Marker } from 'react-native-maps';
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setBikeStations, setRegion } from "../redux/actions/mapActions";
import { Icon } from 'react-native-elements'

const Map = ({ method }) => {
  const { colorMode } = useColorMode();
  const dispatch = useDispatch();
  const filter = useSelector((state) => (state.settings.search.filter));
  const bikeStations = useSelector((state) => (state.map.bikeStations));
  const region = useSelector((state) => (state.map.region));
  const [regionNow, setRegionNow] = useState(region);
  const [onCurrentLocation, setOnCurrentLocation] = useState(false);
  const [marker, setMarker] = useState({
    coord: {
      longitude: 121.544637,
      latitude: 25.024624,
    }
  });

  useEffect (() => {
    dispatch(setBikeStations(region))
  },[])
  useEffect (() => {
    setRegionNow(region);
    dispatch(setBikeStations(region))
  },[region])

  const setRegionAndMarker = (location) => {
    console.log(location)
    dispatch(setRegion(location));
    setMarker({
      ...marker,
      coord: {
        longitude: location.longitude,
        latitude: location.latitude,
      },
    });
  };

  const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
      let location = await Location.getCurrentPositionAsync({});
      let locationAdd = {...location.coords, latitudeDelta: 0.005,longitudeDelta: 0.005}
      setRegionAndMarker(locationAdd);
      dispatch(setRegion(locationAdd));
      setRegionNow(locationAdd);
      setOnCurrentLocation(true);
    }
  };

  const onRegionChangeComplete = (rgn) => {
    if (
      Math.abs(rgn.latitude - region.latitude) > 0.0002 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0002
    ) {
      dispatch(setRegion(rgn));
      setRegionNow(rgn);
      setOnCurrentLocation(false);
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
        mapType="mutedStandard"
        // provider="google"
        userInterfaceStyle={colorMode == "light" ? "light" : "dark"}
        onRegionChangeComplete={onRegionChangeComplete}
      >
        <Marker
          coordinate={{
            latitude: marker.coord.latitude,
            longitude: marker.coord.longitude
          }}
          key={1}
          title="aa"
          description="aaa"
        >
        </Marker>
        {bikeStations.map((station) => (
          <Marker
            coordinate={{
              latitude: Number(station.StationPosition.PositionLat),
              longitude: Number(station.StationPosition.PositionLon),
            }}
            key={station.StationPosition.StationUID}
            // title={`${site.sna} ${site.sbi}/${site.tot}`}
            // description={site.ar}
          >
            <Image
              alt="bikeIcon"
              source={station.ServiceType == 1 ? require("../images/btn_1.png") : require("../images/btn_2.png")}
              style={{ width: 26, height: 28 }}
              resizeMode="contain"
            />
          </Marker>
        ))}
      </MapView>
      {!onCurrentLocation && (
        <Icon
          raised
          name="ios-locate"
          type="ionicon"
          color="black"
          containerStyle={{
            backgroundColor: "#517fa4",
            position: "absolute",
            right: 20,
            bottom: 40,
          }}
          onPress={getLocation}
        />
      )}
    </Box>
  );
};

export default Map;