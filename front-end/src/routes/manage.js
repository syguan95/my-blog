import loadable from "@loadable/component";
import { Redirect } from "react-router-dom";
const ManageLayout = loadable(() => import("../layout/manage"))
const AddArticle = loadable(() => import("../pages/manage/addArticle/addArticle"))
const ArticleList = loadable(() => import("../pages/manage/articleList/articleList"))
const UserList = loadable(() => import("../pages/manage/userList/userList"))

const manageRoute = [
  {
    path: "/manage",
    component: ManageLayout,
    routes: [{
      path: "/manage",
      exact: true,
      render: () => <Redirect to={"/manage/articleList"} />
    }, {
      path: "/manage/addArticle",
      component: AddArticle,
      exact: true,
    }, {
      path: "/manage/articleList",
      component: ArticleList,
      exact: true,
    }, {
      path: "/manage/userList",
      component: UserList,
      exact: true,
    }],
  }
];

export default manageRoute;
