import React from "react";
import { Image, Box, Text, HStack, Pressable } from "native-base";
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from "react-redux";
import { setStarList } from '../redux/actions/bikeActions'

const StarItem = ({ data, navigation }) => {
  const dispatch = useDispatch();
  const { colors } = useTheme();

  const onRemoveStar = (id) => {
    dispatch(setStarList(id,"remove"))
  }

  return (
    <Pressable 
      onPress={() => {
        // navigation.navigate('Detail', album)}
      }}
    >
      <Box 
        paddingTop={4}
        paddingX={6}
      >
        <HStack 
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <HStack
            alignItems={"center"}
          >
            <Pressable 
             onPress={() => onRemoveStar(data.StationUID)}
            >
              <FontAwesomeIcon name="star" color={colors.yellow2} size={20} />    
            </Pressable>
            <Text fontSize={20} marginLeft={2}>{data.StationName.zh_tw}</Text>
          </HStack>
          <Text fontSize={20}>{data.Distance}m</Text>
        </HStack>
        <HStack 
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <HStack
            marginTop={1}
          >
            <HStack
              width={16}
              alignItems={"center"}
            >
              <Image
                marginRight={2}
                alt="icon_rent"
                source={data.ServiceType == 1 ? require('../images/icon_rent1.png') : require('../images/icon_rent2.png')}
              />
              <Text fontSize={20}>{data.AvailableRentBikes}</Text>
            </HStack>
            <HStack
              width={16}
              alignItems={"center"}
            >
              <Image
                marginRight={2}
                alt="icon_return"
                source={data.ServiceType == 1 ? require('../images/icon_return1.png') : require('../images/icon_return2.png')}
              />
              <Text fontSize={20}>{data.AvailableReturnBikes}</Text>
            </HStack>
          </HStack>
          <Text
            paddingTop={1}
            fontSize={12}
          >
          {data.StationAdress}</Text>
        </HStack>
      </Box>
    </Pressable>
  );
};

export default StarItem;
