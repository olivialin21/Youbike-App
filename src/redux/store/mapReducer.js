import {
  SET_REGION
} from "../constants";

const initialState = {
  region: {
    longitude: 121.544637,
    latitude: 25.024624,
    longitudeDelta: 0.01,
    latitudeDelta: 0.02
  }
};

export const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_REGION:
      return {
        ...state,
        region: { ...action.payload }
      }
    default:
      return state;
  }
}
