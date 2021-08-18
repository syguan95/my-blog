import { Button, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import style from "./style.module.scss";
import { useHistory } from "react-router-dom";
import LoginModal from "../../components/LoginModal";
import { connect } from "react-redux";
import { openLoginModal, reset } from "../../redux/user/action";

const MyHeader = (props) => {

  const history = useHistory();

  const backToHome = () => {
    history.push("/manage/articleList");
  }

  const logout = () => {
    window.localStorage.removeItem("token");
    props.reset();
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={logout}>退出登录</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.headerWrapper}>
      <LoginModal />
      <div className={style.systemName} onClick={backToHome}>博客后台管理</div>
      <div className={style.userInfo}>
        {
          props.userId > -1 ?
            <>
              <div className={style.userAvatar}>gsy</div>
              <div className={style.userName}>{props.username}</div>
              <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" >
                <div><DownOutlined style={{ color: "white" }} /></div>
              </Dropdown>
            </>
            :
            <>
              <Button type="text" className={style.loginBtn} onClick={props.openLoginModal}>登录</Button>
            </>
        }
      </div>
    </div>
  );
};

export default connect((state) => {
  return {
    userId: state.user.userId,
    username: state.user.username,
  }
}, {
  openLoginModal,
  reset,
}
)(MyHeader);