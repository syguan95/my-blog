const jwt = require("jsonwebtoken");
const { SECURE_CODE, EXPIRE_TIME } = require("../config");

const getToken = (payload) => {
  return jwt.sign(payload, SECURE_CODE, { expiresIn: EXPIRE_TIME });
};

const checkToken = (token) => {
  return jwt.verify(token.split(" ")[1], SECURE_CODE);
};

const getOperation = (url, method) => {
  console.log(url, method)
  var operation = "";
  if (url === "/article" && method === "GET") {
    operation = "GET_ARTICLE_DETAIL";
  } else if (url === "/article" && method === "POST") {
    operation = "ADD_ARTICLE";
  } else if (url === "/article" && method === "PUT") {
    operation = "EDIT_ARTICLE";
  } else if (url === "/article" && method === "DELETE") {
    operation = "DELETE_ARTICLE";
  } else if (url === "/articleList" && method === "GET") {
    operation = "GET_ARTICLE_LIST";
  }
  return operation;
};

module.exports = {
  getToken,
  checkToken,
  getOperation,
};
