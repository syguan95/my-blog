import { Layout, Button } from "antd";
import MyHeader from "./header.js"

const { Header, Sider, Content, Footer } = Layout;
const ManageLayout = (props) => {
  return (
    <>
      <Layout>
        <Header><MyHeader/></Header>
        <Layout>
          <Sider>sider</Sider>
          <Content>content</Content>
        </Layout>
        <Footer>footer</Footer>
      </Layout>
    </>
  );
};

export default ManageLayout;
