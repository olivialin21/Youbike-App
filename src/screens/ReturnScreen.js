import React from "react";
import Map from "../components/Map"
import { Box } from "native-base";

const RentScreen = ({ navigation }) => {
  return (
    <Box flex={1}>
      <Map method="return"/>
    </Box>
  );
};

export default RentScreen;