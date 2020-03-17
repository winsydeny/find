import {ToastAndroid, BackHandler} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import AsyncStorage from '@react-native-community/async-storage';
export const _storeData = async (key: string, value: string) => {
  try {
    console.log('soter', key, value);
    await AsyncStorage.setItem('@find_' + key, value);
    // ToastAndroid.show('success', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show('存储失败', ToastAndroid.SHORT);
    // Error saving data
  }
};
export const _retrieveData = async (key: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const value = await AsyncStorage.getItem('@find_' + key);
      // if (value !== null) {
      resolve(value);
      // }
    } catch (error) {
      reject(error);
      ToastAndroid.show('读取失败', ToastAndroid.SHORT);
    }
  });
};
export const toast = (data: string) => {
  ToastAndroid.show(data, ToastAndroid.SHORT);
};
export const _getAllKey = () => {
  AsyncStorage.getAllKeys((err: any, keys: any) => {
    if (err) {
      ToastAndroid.show('error', ToastAndroid.SHORT);
    }
    console.log(keys);
  });
};
export const _remove = async (key: string) => {
  try {
    // console.log('soter', key, value);
    await AsyncStorage.removeItem('@find_' + key);
    // ToastAndroid.show('success', ToastAndroid.SHORT);
  } catch (error) {
    ToastAndroid.show('清除缓存失败', ToastAndroid.SHORT);
    // Error saving data
  }
};

export const reset = (navigation: any, routeName: string) => {
  const resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({routeName})],
  });
  navigation.dispatch(resetAction);
};
// export const HardBack = (_this: any) => {
//   BackHandler.addEventListener('hardwareBackPress', () => {
//     _this.props.naivigation.pop();
//   });
// };

// export const loading = {
//       showLoading(timeOut = 10000){
//         global.mLoadingComponentRef && global.mLoadingComponentRef.showLoading();
//         this.timerLoading = setTimeout(() => {
//             this.dismissLoading();
//         }, timeOut);

//     },
//     dismissLoading(){
//         global.mLoadingComponentRef && global.mLoadingComponentRef.dismissLoading();
//         this.timerLoading && clearTimeout(this.timerLoading);

//     },
// }
