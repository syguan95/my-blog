import myAxios from "../../utils/request";
import { message } from "antd";
import API from "../../utils/api";

export const autoLogin = () => async (dispatch) => {
  try {
    var token = window.localStorage.getItem("token");
    if (token) {
      var data = await myAxios.get(API.GET_AUTO_LOGIN);
      if (data.userId) {
        dispatch({        //自动登录，初始化用户基本信息
          type: "INIT_USER_INFO",
          payload: {
            userId: data.userId,
            username: data.username,
            role: data.userRole,
          },
        })
      }
    }
  } catch (error) {
    message.error(error.message)
  }
}

export const login = (payload) => async (dispatch) => {
  try {
    var data = await myAxios.post(API.LOGIN, payload)
    message.success("登陆成功")
    window.localStorage.setItem("token", data.token) //登录成功，将token保存在localStorage中
    dispatch({        //将用户信息保存在store中
      type: "LOGIN_SUCCESS",
      payload: data,
    })
  } catch (error) {
    message.error(error.message);
  }
}

export const openLoginModal = () => {
  return {
    type: "SHOW_LOGIN_MODAL",
  }
}

export const closeLoginModal = () => {
  return {
    type: "CLOSE_LOGIN_MODAL",
  }
}

export const reset = () => {
  return {
    type: "RESET",
  }
}