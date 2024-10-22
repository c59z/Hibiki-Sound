// 封装ls存取token

const clientKey = "client-key"; // 客户端key
const tokenKey = "token-key"; // 用户登录后的key
const setClientAuthentication = (token) => {
  return window.localStorage.setItem(clientKey, token);
};

const getClientAuthentication = () => {
  return window.localStorage.getItem(clientKey);
};

const removeClientAuthentication = () => {
  return window.localStorage.removeItem(clientKey);
};

export {
  setClientAuthentication,
  getClientAuthentication,
  removeClientAuthentication,
};
