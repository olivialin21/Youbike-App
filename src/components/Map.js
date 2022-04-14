import React, { useEffect, useState } from "react";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { useColorMode, HStack, Text, Box, Image, Pressable } from "native-base";
import MapView, { Marker, Circle } from 'react-native-maps';
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setBikeStations, setRegion } from "../redux/actions/mapActions";
import { Icon } from 'react-native-elements'
import { setStarList } from "../redux/actions/starActions";

const Map = ({ method }) => {
  const dispatch = useDispatch();
  const { colorMode } = useColorMode();
  const { colors, fontSizes } = useTheme();

  const filter = useSelector((state) => (state.settings.search.filter));
  const bikeStations = useSelector((state) => (state.map.bikeStations));
  const region = useSelector((state) => (state.map.region));
  // const starList = useSelector((state) => (state.star.starList));

  const [star, toggleStar] = useState(false);
  const [detailShow, toggleDetail] = useState(false);
  const [stationDetail, setStationDetail] = useState({});
  const [regionNow, setRegionNow] = useState(region);
  const [onCurrentLocation, setOnCurrentLocation] = useState(false);
  // const [marker, setMarker] = useState({
  //   coord: {
  //     longitude: 121.544637,
  //     latitude: 25.024624,
  //   }
  // });

  useEffect (() => {
    dispatch(setRegion(region));
    dispatch(setBikeStations(region,filter))
  },[])
  useEffect (() => {
    setRegionNow(region);
    dispatch(setBikeStations(region,filter))
  },[region])

  const setRegionAndMarker = (location) => {
    dispatch(setRegion(location));
    // setMarker({
    //   ...marker,
    //   coord: {
    //     longitude: location.longitude,
    //     latitude: location.latitude,
    //   },
    // });
  };

  const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status == "granted") {
      let location = await Location.getCurrentPositionAsync({});
      let locationAdd = {...location.coords, latitudeDelta: 0.005,longitudeDelta: 0.005}
      setRegionAndMarker(locationAdd);
      setOnCurrentLocation(true);
    }
  };

  const onRegionChangeComplete = (rgn) => {
    if (
      Math.abs(rgn.latitude - region.latitude) > 0.0002 ||
      Math.abs(rgn.longitude - region.longitude) > 0.0002
    ) {
      dispatch(setRegion(rgn));
      setOnCurrentLocation(false);
    }
  };

  return (
    <Box flex={1}>
      <MapView
        showsUserLocation={true}
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
        <Circle
          center={region}
          radius={250}
          strokeColor={colorMode == "light" ? colors.gray2 : "white"}
        />
        {/* <Marker
          coordinate={{
            latitude: marker.coord.latitude,
            longitude: marker.coord.longitude
          }}
          key={1}
          title="aa"
          description="aaa"
        >
        </Marker> */}
        {bikeStations.map((station) => (
          <Marker
            coordinate={{
              latitude: Number(station.StationPosition.PositionLat),
              longitude: Number(station.StationPosition.PositionLon),
            }}
            key={station.StationPosition.StationUID}
            // title={`${site.sna} ${site.sbi}/${site.tot}`}
            // description={site.ar}
            onPress={() => {
              toggleDetail(true);
              setStationDetail(station);
              // let locationAdd = {latitude:station.StationPosition.PositionLat, longitude:station.StationPosition.PositionLon , latitudeDelta: 0.005,longitudeDelta: 0.005}
              // dispatch(setRegion(locationAdd));
            }}
          >
            <Image
              alt="bikeIcon"
              source={station.ServiceType == 1 ? require("../images/btn_1.png") : require("../images/btn_2.png")}
              style={{ width: 36, height: 36 , marginBottom: 14 }}
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
            backgroundColor: colors.yellow2,
            position: "absolute",
            right: 20,
            bottom: 40,
          }}
          onPress={getLocation}
        />
      )}
      
      {detailShow ?
        <Box
          borderRadius={10}
          _dark={{ bg: colors.black1 }}
          _light={{ bg: "white" }}
          position="absolute"
          bottom="2"
          width="100%"
          onPress={() => {
            toggleDetail(false)
            console.log(detailShow)
          }}
        >
          <HStack
            paddingY={5}
            px="3"
          >
            <Pressable
              paddingTop={0.5}
              onPress={() => {
                // if (starList.includes(stationDetail)) {
                //   dispatch(setStarList(stationDetail,"remove"))
                // } else {
                //   dispatch(setStarList(stationDetail,"add"))
                // }
                // console.log(starList)
                toggleStar(!star);
              }}
            >
              <FontAwesomeIcon name="star" color={colors.gray1} size={20} />    
            </Pressable>
            <Box flex={1} marginLeft={2}>
              <HStack
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Text
                  fontSize={fontSizes.body1}
                  color={colorMode == "light" ? 'black' : "white"}
                >
                  站名{stationDetail.StationName.zh_tw}
                </Text>
                {/* <Text
                  fontSize={fontSizes.body1}
                  color={colorMode == "light" ? 'black' : "white"}
                >
                  {stationDetail.Distance}m
                </Text> */}
              </HStack>
              <HStack 
                justifyContent={"space-between"}
                alignItems={"flex-end"}
              >
                <HStack
                  marginTop={1}
                  alignItems={"center"}
                >
                  <HStack
                    // width={16}
                    alignItems={"center"}
                  >
                    <Image
                      marginRight={2}
                      alt="icon_rent"
                      source={stationDetail.ServiceType == 1 ? require('../images/icon_rent1.png') : require('../images/icon_rent2.png')}
                    />
                    <Text fontSize={fontSizes.body1}>剩餘可借車輛{stationDetail.AvailableRentBikes}</Text>
                  </HStack>
                  <HStack
                    // width={16}
                    alignItems={"center"}
                    marginLeft={2}
                  >
                    <Image
                      marginRight={2}
                      alt="icon_return"
                      source={stationDetail.ServiceType == 1 ? require('../images/icon_return1.png') : require('../images/icon_return2.png')}
                    />
                    <Text fontSize={fontSizes.body1}>剩餘還車數量{stationDetail.AvailableReturnBikes}</Text>
                  </HStack>
                </HStack>
              </HStack>
            </Box>
          </HStack>
        </Box> : <></>}
    </Box>
  );
};

export default Map;