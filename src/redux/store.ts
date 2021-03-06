import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { createLogger } from 'redux-logger';
import reduxThunk  from 'redux-thunk';
import promise from 'redux-promise';
import rootReducer from './store/root-reducer';

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "rssReducer",
    "articlesReducer"
  ],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const logger = createLogger();
const middleWares = compose(applyMiddleware(reduxThunk, promise, logger))

const store = createStore(
  persistedReducer,
  middleWares,
);

let persistor = persistStore(store);

export { store, persistor };