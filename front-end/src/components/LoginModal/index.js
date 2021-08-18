import { Modal, Form, Input, Button, message } from "antd";
import style from "./index.module.scss";
import { connect } from "react-redux";
import { login, closeLoginModal, autoLogin } from "../../redux/user/action";
import { useEffect } from "react";
import myAxios from "../../utils/request";
import API from "../../utils/api";

const LoginModal = (props) => {

  const [form] = Form.useForm();

  useEffect(() => {
    props.autoLogin();
  }, [])

  const loginHandler = () => {
    var data = {
      username: form.getFieldValue("username"),
      password: form.getFieldValue("password"),
    }
    props.login(data);
  }

  return (
    <Modal title="登录" centered={true} footer={null} destroyOnClose={true} visible={props.loginModalVisible} onCancel={props.closeLoginModal} className={style.loginModal}>
      <Form
        form={form}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={loginHandler}
        autoComplete="off"
        preserve={false}
      >
        <Form.Item
          label="用户名"
          name="username"
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="密码"
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 0 }}
          wrapperCol={{ span: 24 }}
        >
          <Button onClick={loginHandler}>登录</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default connect((state) => {
  return {
    loginModalVisible: state.user.loginModalVisible,
  }
}, {
  login,
  closeLoginModal,
  autoLogin,
}
)(LoginModal);