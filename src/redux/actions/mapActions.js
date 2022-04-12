import {
  SET_REGION
} from "../constants";

export const setRegion = (region) => async (dispatch) => {
  dispatch({
    type: SET_REGION,
    payload: region
  })
}
