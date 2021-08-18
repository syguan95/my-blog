import { FileOutlined, TeamOutlined } from "@ant-design/icons";
export const menu = [{  //管理后台菜单
  title: "文章管理",
  key: "article",
  icon: <FileOutlined />,
  submenu: [{
    title: "文章列表",
    key: "/manage/articleList",
  }, {
    title: "新增文章",
    key: "/manage/addArticle",
  }]
}, {
  title: "用户管理",
  key: "user",
  icon: <TeamOutlined />,
  submenu: [{
    title: "用户列表",
    key: "/manage/userList",
  }]
}]

