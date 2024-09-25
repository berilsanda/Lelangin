import { configureStore } from "@reduxjs/toolkit";
import storage from "@react-native-async-storage/async-storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import tempReducer from "./reducer/tempReducer";
import localReducer from "./reducer/persistReducer";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const localPersistReducer = persistReducer(persistConfig, localReducer);

const store = configureStore({
  reducer: {
    temp: tempReducer,
    persist: localPersistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false,
    }),
});

export const persistor = persistStore(store);

export default store;
