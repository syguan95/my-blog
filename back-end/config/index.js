module.exports = {
  PORT: 8888,
  DATABASE: {
    username: "root",
    password: "19950212",
    dbname: "my_blog",
    config: {
      hostname: "localhost",
      port: 3306,
      dialect: "mysql",
      // logging: false, //是否在控制台打印SQL语句
      define: {
        underscored: false,
        freezeTableName: true,
        charset: "utf8",
        dialectOptions: {
          collate: "utf8_general_ci",
        },
        timestamps: false, //是否自动添加createAt,updateAt
      },
      sync: { force: false },
      pool: {
        //连接池设置
        max: 5, //最大连接数
        min: 0, //最小连接数
        idle: 10000,
      },
    },
  },
  HTTPCODE: {
    SUCCESS: 10000,   //操作成功
    WRONG_PARAM: 10001, //参数错误
    DATABASE_FAIL: 10002, //数据库操作错误
    UNAUTHORIZED: 10003,  //权限不足
    UNLOGIN: 10004, //未登录
  },
  SECURE_CODE: "myblog",
  EXPIRE_TIME: "720h",
  AUTHORITY: {
    0:['GET_ARTICLE_LIST','GET_ARTICLE_DETAIL'],//游客权限
    1:['GET_ARTICLE_LIST','GET_ARTICLE_DETAIL'],//普通用户权限
    2:['GET_ARTICLE_LIST','GET_ARTICLE_DETAIL','ADD_ARTICLE','EDIT_ARTICLE','DELETE_ARTICLE'],//博主权限
  }
};
