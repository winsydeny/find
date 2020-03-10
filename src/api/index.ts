export const saveImg = (path: string) => {
  fetch('www.vanlansh.wang/api/upload?image=true', {
    method: 'POST',
  }).then((res: any) => {
    if (res.status === 0) {
      return 'upload Success';
    } else {
      return 'upload Failed';
    }
  });
};
