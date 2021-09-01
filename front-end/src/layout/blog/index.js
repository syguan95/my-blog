import { Layout } from "antd";
import BlogHeader from "./header.js";
import BlogFooter from "./footer.js";
import BlogSider from "./sider.js";
import { renderRoutes } from "react-router-config";
import style from "./style.module.scss";

const { Header, Sider, Content, Footer } = Layout;
const BlogLayout = (props) => {
  const { route } = props;
  return (
    <div className={style.blogLayoutWrapper}>
      <Layout>
        <Header><BlogHeader /></Header>
        <Layout>
          <Sider theme="light" width={400}><BlogSider /></Sider>
          <Content>{renderRoutes(route.routes)}</Content>
        </Layout>
        <Footer><BlogFooter /></Footer>
      </Layout>
    </div>
  );
};

export default BlogLayout;
