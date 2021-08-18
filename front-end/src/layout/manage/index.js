import { Layout } from "antd";
import MyHeader from "./header.js";
import MyFooter from "./footer.js";
import MyMenu from "./menu.js";
import { renderRoutes } from "react-router-config";

const { Header, Sider, Content, Footer } = Layout;
const ManageLayout = (props) => {
  const { route } = props;
  return (
    <>
      <Layout>
        <Header><MyHeader /></Header>
        <Layout>
          <Sider theme="light"><MyMenu /></Sider>
          <Content>{renderRoutes(route.routes)}</Content>
        </Layout>
        <Footer><MyFooter /></Footer>
      </Layout>
    </>
  );
};

export default ManageLayout;
