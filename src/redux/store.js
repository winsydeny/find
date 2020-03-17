/**
 * store.js
 */

import createStore from 'redux';
import reducers from './reducers';

// 定义初始值
const initialState = {
  userInfo: {
    name: '小光',
    gender: '男',
  },
};

export const store: any = createStore(reducers, initialState);
