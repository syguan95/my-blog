const initState = {
  userId: -1,
  username: "",
  userRole: 0,
  loginModalVisible: false,
}
const userReducer = (state = initState, action) => {
  console.log(action)
  const { type, payload } = action;
  switch (type) {
    case "INIT_USER_INFO":
      return {
        ...state,
        userId: payload.userId,
        username: payload.username,
        userRole: payload.role,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        userId: payload.userId,
        username: payload.username,
        userRole: payload.role,
        loginModalVisible: false,
      };
    case "SHOW_LOGIN_MODAL":
      return {
        ...state,
        loginModalVisible: true,
      };
    case "CLOSE_LOGIN_MODAL":
      return {
        ...state,
        loginModalVisible: false,
      };
    case "RESET":
      return {
        ...state,
        userId: -1,
        username: "",
        userRole: 0,
        loginModalVisible: false,
      };
    default:
      return state;
  }
}

export default userReducer;