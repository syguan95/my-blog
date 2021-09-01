import loadable from "@loadable/component";
import { Redirect } from "react-router-dom";
const BlogLayout = loadable(() => import("../layout/blog"))
const ArticleList = loadable(() => import("../pages/blog/articleList/articleList"));
const ArticleDetail = loadable(() => import("../pages/blog/articleDetail/articleDetail"));


const blogRoute = [
  {
    path: "/",
    exact: true,
    render: () => <Redirect to={"/blog/articleList/all"} />
  }, {
    path: "/blog",
    component: BlogLayout,
    routes: [{
      path: "/blog",
      exact: true,
      render: () => <Redirect to={"/blog/articleList/all"} />
    }, {
      path: "/blog/articleList/:category",
      component: ArticleList,
      exact: true,
    }, {
      path: "/blog/article/:id",
      component: ArticleDetail,
      exact: true,
    }],
  }
];

export default blogRoute;