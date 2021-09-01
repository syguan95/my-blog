import { Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";
import style from "./style.module.scss";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";

const ManageHeader = (props) => {

  const history = useHistory();

  const backToHome = () => {
    history.push("/manage/articleList");
  }

  const backToBlog = () => {
    history.push("/blog");
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <div onClick={backToBlog}>返回博客</div>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={style.headerWrapper}>
      <div className={style.systemName} onClick={backToHome}>博客后台管理</div>
      <div className={style.userInfo}>
        {
          props.userId > -1 &&
          <>
            <div className={style.userAvatar}>logo</div>
            <div className={style.userName}>{props.username}</div>
            <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter" >
              <div><DownOutlined style={{ color: "white" }} /></div>
            </Dropdown>
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

}
)(ManageHeader);