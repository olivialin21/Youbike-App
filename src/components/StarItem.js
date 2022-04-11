import React from "react";
import { Image, Box, Text, HStack, Pressable } from "native-base";
// import AntDesign from "react-native-vector-icons/AntDesign";

const StarItem = ({ data, navigation }) => {

  return (
    <Pressable 
    //  onPress={() => navigation.navigate('Detail', album)}
    >
      <Box 
        marginTop={3}
        paddingX={6}
      >
        <HStack 
          justifyContent={"space-between"}
        >
          <Text fontSize={20}>{data.StationName.zh_tw}</Text>
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
