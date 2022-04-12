import {
  
} from "../constants";

const initialState = {
  region: {
    longtitude: 121.544637,
    latitude: 25.024624,
    longtitudeDelta: 0.01,
    latitudeDelta: 0.02
  }
};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
