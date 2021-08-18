import axios from "axios";
import store from "../redux/index";
import { reset } from "../redux/user/action";

const HTTPCODE = {
  SUCCESS: 10000,   //操作成功
  WRONG_PARAM: 10001, //参数错误
  DATABASE_FAIL: 10002, //数据库操作错误
  UNAUTHORIZED: 10003,  //权限不足
  UNLOGIN: 10004, //未登录
};

let instance;
if (!instance) {
  instance = axios.create({
    baseURL: window.location.protocol + "//" + window.location.host,
    timeout: 10000,
  });
}

instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  if (config.method === "GET" || config.method === "DELETE") {
    config.headers = {
      "Content-Type": "application/x-wwww-form-urlencoded"
    }
  } else {
    config.headers = {
      "Content-Type": "application/json"
    }
  }
  if (config.url.indexOf("login") < 0 && config.url.indexOf("register") < 0) {
    let token = window.localStorage.getItem("token") ? window.localStorage.getItem("token") : ""; //mark
    config.headers.Authorization = token;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

const myAxios = {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      instance.get(url, { params: params }).then(res => {
        if (res.data.code === HTTPCODE.SUCCESS) {
          resolve(res.data.data ? res.data.data : {})
        } else if (res.data.code === HTTPCODE.UNLOGIN) {
          window.localStorage.removeItem("token")
          store.dispatch(reset());
          reject(new Error("用户未登录"))
        } else if (res.data.code === HTTPCODE.WRONG_PARAM) {
          reject(new Error("参数错误"))
        } else if (res.data.code === HTTPCODE.DATABASE_FAIL) {
          reject(new Error("数据库操作错误"))
        } else if (res.data.code === HTTPCODE.UNAUTHORIZED) {
          reject(new Error("权限不足"))
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      instance.post(url, params).then(res => {
        if (res.data.code === HTTPCODE.SUCCESS) {
          resolve(res.data.data ? res.data.data : {})
        } else if (res.data.code === HTTPCODE.UNLOGIN) {
          window.localStorage.removeItem("token")
          store.dispatch(reset());
          reject(new Error("用户未登录"))
        } else if (res.data.code === HTTPCODE.WRONG_PARAM) {
          reject(new Error("参数错误"))
        } else if (res.data.code === HTTPCODE.DATABASE_FAIL) {
          reject(new Error("数据库操作错误"))
        } else if (res.data.code === HTTPCODE.UNAUTHORIZED) {
          reject(new Error("权限不足"))
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  put: (url, params) => {
    return new Promise((resolve, reject) => {
      instance.put(url, params).then(res => {
        if (res.data.code === HTTPCODE.SUCCESS) {
          resolve(res.data.data ? res.data.data : {})
        } else if (res.data.code === HTTPCODE.UNLOGIN) {
          window.localStorage.removeItem("token")
          store.dispatch(reset());
          reject(new Error("用户未登录"))
        } else if (res.data.code === HTTPCODE.WRONG_PARAM) {
          reject(new Error("参数错误"))
        } else if (res.data.code === HTTPCODE.DATABASE_FAIL) {
          reject(new Error("数据库操作错误"))
        } else if (res.data.code === HTTPCODE.UNAUTHORIZED) {
          reject(new Error("权限不足"))
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  delete: (url, params) => {
    return new Promise((resolve, reject) => {
      instance.delete(url, { params: params }).then(res => {
        if (res.data.code === HTTPCODE.SUCCESS) {
          resolve(res.data.data ? res.data.data : {})
        } else if (res.data.code === HTTPCODE.UNLOGIN) {
          window.localStorage.removeItem("token")
          store.dispatch(reset());
          reject(new Error("用户未登录"))
        } else if (res.data.code === HTTPCODE.WRONG_PARAM) {
          reject(new Error("参数错误"))
        } else if (res.data.code === HTTPCODE.DATABASE_FAIL) {
          reject(new Error("数据库操作错误"))
        } else if (res.data.code === HTTPCODE.UNAUTHORIZED) {
          reject(new Error("权限不足"))
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
}

export default myAxios;
