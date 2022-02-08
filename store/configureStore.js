import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './rootReducer'; // the value from combineReducers
import { nextReduxCookieMiddleware, wrapMakeStore } from "next-redux-cookie-wrapper";
import cartReducer from './cart';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// const initStore = () => {
//   return createStore(rootReducer, bindMiddleware([thunkMiddleware]));
// };

const makeStore = wrapMakeStore(() =>
  createStore(
    rootReducer,
    bindMiddleware([
      nextReduxCookieMiddleware({
        compress: true,
        subtrees: [
          "cart",
          "userAccount.user",
          "userAccount.favorites",
          "profile.address",
          "order.orders",
          "category.categories"
        ]
      }),
      thunkMiddleware
    ])
  )
);
export const wrapper = createWrapper(makeStore, { debug: true });
