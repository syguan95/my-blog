import { DownOutlined } from "@ant-design/icons";
import style from "./style.scss";

const MyHeader = () => {
  return (
    <div className={style.headerWrapper}>
      <div className={style.systemName}>博客后台管理</div>
      <div>
        <div>gsy</div>
        <div>管世昱</div>
        <DownOutlined />
      </div>
    </div>
  );
};

export default MyHeader;
