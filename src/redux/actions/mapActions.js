import {
  SET_REGION,
  SET_BIKE_STATIONS
} from "../constants";

import {
  getBikeStations,
} from "../api"

export const setRegion = (region) => async (dispatch) => {
  dispatch({
    type: SET_REGION,
    payload: region
  })
}

export const setBikeStations = (location) => async (dispatch) => {
  let bikeStations = await getBikeStations(location);
  dispatch({
    type: SET_BIKE_STATIONS,
    payload: bikeStations.data
  })
}