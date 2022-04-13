import {
  REMOVE_STAR,
  SET_STAR_SCREEN
} from "../constants";

export const setStarList = (id, method) => async (dispatch) => {
  if (method=="remove") {
    dispatch({
      type: REMOVE_STAR,
      payload: id
    })
  }
}

export const setStarScreen = () => async (dispatch) => {
  dispatch({
    type: SET_STAR_SCREEN
  })
}