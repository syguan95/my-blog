const jwt = require("jsonwebtoken");
const { SECURE_CODE, EXPIRE_TIME, API_VERSION } = require("../config");

const getToken = (payload) => {
  return jwt.sign(payload, SECURE_CODE, { expiresIn: EXPIRE_TIME });
};

const checkToken = (token) => {
  return jwt.verify(token.split(" ")[1], SECURE_CODE);
};

const getOperation = (url, method) => {
  console.log(url, method)
  url = url.split("?")[0];
  var operation = "";
  if (url === API_VERSION + "/article" && method === "GET") {
    operation = "GET_ARTICLE_DETAIL";
  } else if (url === API_VERSION + "/article" && method === "POST") {
    operation = "ADD_ARTICLE";
  } else if (url === API_VERSION + "/article" && method === "PUT") {
    operation = "EDIT_ARTICLE";
  } else if (url === API_VERSION + "/article" && method === "DELETE") {
    operation = "DELETE_ARTICLE";
  } else if (url === API_VERSION + "/articleList" && method === "GET") {
    operation = "GET_ARTICLE_LIST";
  } else if (url === API_VERSION + "/userList" && method === "GET") {
    operation = "GET_USER_LIST";
  } else if (url === API_VERSION + "/user/available" && method === "PUT") {
    operation = "UPDATE_USER_AVAILABLE";
  } else if (url === API_VERSION + "/comment" && method === "GET") {
    operation = "GET_COMMENT_LIST";
  } else if (url === API_VERSION + "/comment" && method === "POST") {
    operation = "ADD_COMMENT";
  } else if (url === API_VERSION + "/comment" && method === "DELETE") {
    operation = "DELETE_COMMENT";
  } else if (url === API_VERSION + "/reply" && method === "GET") {
    operation = "GET_REPLY_LIST";
  } else if (url === API_VERSION + "/reply" && method === "POST") {
    operation = "ADD_REPLY";
  } else if (url === API_VERSION + "/reply" && method === "DELETE") {
    operation = "DELETE_REPLY";
  }
  return operation;
};

module.exports = {
  getToken,
  checkToken,
  getOperation,
};
