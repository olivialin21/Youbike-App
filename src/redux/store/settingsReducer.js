import {
  SET_COLOR_MODE,
  ADD_SEARCH_FILTER,
  REMOVE_SEARCH_FILTER
} from "../constants";

const initialState = {
  display: {
    colorMode: 'light'
  },
  search: {
    filter: [],  
  }
};
let searchFilterList = [];

export const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_COLOR_MODE:
      return {
        ...state,
        display: {
          colorMode: action.payload
        }
      };
    case ADD_SEARCH_FILTER:
      searchFilterList = [...state.search.filter, action.payload]
      console.log(searchFilterList);
      return {
        ...state,
        search: {
          filter: searchFilterList
        }
      };
    case REMOVE_SEARCH_FILTER:
      searchFilterList = state.search.filter.filter((x) => x !== action.payload);
      console.log(searchFilterList);
      return {
        ...state,
        search: {
          filter: searchFilterList
        }
      };
    default:
      return state;
  }
}
