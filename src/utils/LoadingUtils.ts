let globalLoading: any = null;
const setGlobal = (value: any) => {
  globalLoading = value;
};
let LoadingUtil = {
  print() {
    // console.log(globalLoading);
  },
  showLoading() {
    globalLoading.show();
  },
  hideLoading() {
    globalLoading.hide();
  },
};
export {setGlobal, LoadingUtil};
