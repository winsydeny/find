import {Alert} from 'react-native';
import {_retrieveData} from '../assets/utils';
import fetchJsonp from 'fetch-jsonp';
interface Params {
  keyword: string;
  page?: number;
  size?: number;
}
// const BASE_URL = 'https://www.vanlansh.wang/api';
const BASE_URL = 'http://192.168.1.160:3000/api';
export const saveImg = async (data: any) => {
  const access_token = await _retrieveData('access_token');
  const formData = new FormData();
  formData.append('files', {
    uri: data,
    type: 'multipart/form-data',
    name: 'image.jpeg',
  });
  return fetch(`${BASE_URL}/upload?token=${access_token}`, {
    method: 'POST',
    headers: {
      // 'content-type': 'multipart/form-data',
    },
    body: formData,
  }).then((res: any) => res.json());
};

export const getData = async (path: string, params: any) => {
  const access_token = await _retrieveData('access_token');
  let last = [];
  for (let key in params) {
    last.push(`${key}=${params[key]}`);
  }
  const url = `${BASE_URL}/${path}?token=${access_token}&${last.join('&')}`;
  console.log('get_path:', url);
  return fetch(url).then(res => res.json());
};

export const postData = async (path: string, data: any) => {
  const access_token = await _retrieveData('access_token');
  data['token'] = access_token;
  return fetch(`${BASE_URL}/${path}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => response.json());
};

export const xhr = (method: any, params: any) => {
  params['method'] = method;
  //基本参数version，还可以放些其他的基本参数
  params['version'] = '1.0';
  //结合Promise来使用，可以异步处理，无需再写cb；并且可以结合ES6,的then链式调用，使用方便
  return new Promise((resolve, reject) => {
    fetch(BASE_URL, {
      method: 'POST', //定义请求方式，POST、GET、PUT等
      headers: {
        Accept: 'application/json', // 提交参数的数据方式,这里以json的形式
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params), //提交的参数
    })
      .then(response => response.json()) //数据解析的方式，json解析
      .then(responseJson => {
        var code = responseJson.code; //返回直接映射完的数据，可以直接使用
        switch (
          code //做一些简单的处理
        ) {
          case 0: {
            resolve(responseJson);
            break;
          }
          case 10001: {
            Alert.alert('提示', '登录过期或在其他设备登录，是否重新登录', [
              {text: '取消', onPress: () => console.log('Cancel Pressed!')},
              {text: '登录', onPress: () => console.log('OK Pressed!')},
            ]);
            break;
          }
          default: {
            Alert.alert('提示', responseJson.msg, [
              {text: '确定', onPress: () => console.log('OK Pressed!')},
            ]);
          }
        }
      })
      .catch(error => {
        console.error(error);
      });
  });
};
export const suggest = (keyword: string) => {
  return fetchJsonp(
    `http://suggestion.baidu.com/su?wd=${keyword}&p=3&cb=window.bdsug.sug`,
  ).then(response => response.json());
};
