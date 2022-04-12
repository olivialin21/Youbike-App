import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';

import { accountReducer } from "./accountReducer";
import { settingsReducer } from "./settingsReducer";
import { bikeReducer } from "./bikeReducer";
import { mapReducer } from "./mapReducer";

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const reducer = combineReducers({
  account: persistReducer(persistConfig, accountReducer),
  settings: persistReducer(persistConfig, settingsReducer),
  bike: persistReducer(persistConfig, bikeReducer),
  map: persistReducer(persistConfig, mapReducer)
});

export const store = createStore(
  reducer,
  applyMiddleware(thunk)
);

export const persistor = persistStore(store);


