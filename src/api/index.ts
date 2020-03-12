const url = 'https://www.vanlansh.wang/api';
export const saveImg = (path: string) => {
  fetch(`${url}/upload?image=true`, {
    method: 'POST',
  }).then((res: any) => {
    if (res.status === 0) {
      return 'upload Success';
    } else {
      return 'upload Failed';
    }
  });
};
export const request = (path: string) => fetch(`${url}/${path}`);
