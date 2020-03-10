import {AsyncStorage, ToastAndroid} from 'react-native';

export const _storeData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem('@find' + key, value);
  } catch (error) {
    ToastAndroid.show('存储失败', ToastAndroid.SHORT);
    // Error saving data
  }
};
export const _retrieveData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem('@find' + key);
    if (value !== null) {
      return value;
    }
  } catch (error) {
    ToastAndroid.show('读取失败', ToastAndroid.SHORT);
    // Error retrieving data
  }
};
export const toast = (data: string) => {
  ToastAndroid.show(data, ToastAndroid.SHORT);
};
