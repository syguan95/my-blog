const API_VERSION = "/v1"

const API = {
    //用户相关接口
    LOGIN: API_VERSION + "/user/login", //登录
    REGISTER: API_VERSION + "/user/register",   //注册 
    GET_USER_LIST: API_VERSION + "/userList",//获取所有普通用户列表
    UPDATE_USER_AVAILABLE: API_VERSION + "/user/available", //修改用户是否禁言
    GET_AUTO_LOGIN: API_VERSION + "/user/autoLogin",    //自动登录，获取用户基本信息

    //文章相关接口
    GET_ARTICLE_LIST: API_VERSION + "/articleList", //获取文章列表
    CREATE_ARTICLE: API_VERSION + "/article",   //新增文章
    GET_ARTICLE_TAGS: API_VERSION + "/articleTags", //获取存量文章tags
    GET_ARTICLE_CATEGORYS: API_VERSION + "/articleCategorys",   //获取存量文章categorys
    GET_ARTICLE_DETAIL: API_VERSION + "/article",   //获取文章详细内容
    UPDATE_ARTICLE: API_VERSION + "/article",   //更新文章
    DELETE_ARTICLE: API_VERSION + "/article",   //删除文章

    //评论相关接口
    GET_COMMENT_LIST: API_VERSION + "/comment",  //获取评论列表
    CREATE_COMMENT: API_VERSION + "/comment",   //新增评论
    DELETE_COMMENT: API_VERSION + "/comment",   //删除评论
    GET_REPLY_LIST: API_VERSION + "/reply",  //获取回复列表
    CREATE_REPLY: API_VERSION + "/reply",   //新增回复
    DELETE_REPLY: API_VERSION + "/reply",   //删除回复
}

export default API;