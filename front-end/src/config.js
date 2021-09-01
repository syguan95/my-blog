import { FileOutlined, TeamOutlined } from "@ant-design/icons";
import avatar from "./assets/blog/avatar.jpeg";
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
}];

export const personalInfo = {
  name: "Shiyu Guan",
  avatar: avatar,
  introduction: "这里是个人简介！这里是个人简介！这里是个人简介！",
  githubName: "syguan95",
  githubAdd: "https://github.com/syguan95/my-blog",
}

export const categoryColor = "#2db7f5";

export const tagColor = ["magenta", "green", "blue", "gold", "purple"]

