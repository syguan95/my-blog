import { Layout } from "antd";
import ManageHeader from "./header.js";
import ManageFooter from "./footer.js";
import ManageMenu from "./menu.js";
import { renderRoutes } from "react-router-config";
import style from "./style.module.scss";

const { Header, Sider, Content, Footer } = Layout;
const ManageLayout = (props) => {
  const { route } = props;
  return (
    <div className={style.manageLayoutWrapper}>
      <Layout>
        <Header><ManageHeader /></Header>
        <Layout>
          <Sider theme="light"><ManageMenu /></Sider>
          <Content>{renderRoutes(route.routes)}</Content>
        </Layout>
        <Footer><ManageFooter /></Footer>
      </Layout>
    </div>
  );
};

export default ManageLayout;
