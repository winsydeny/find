/**
 * store.js
 */

import { createStore } from "redux";
import reducers from "./reducers";

// 定义初始值
const initialState = {
  userInfo: {
    name: "小光",
    gender: "男"
  }
};

const store = createStore(reducers, initialState);

export default store;