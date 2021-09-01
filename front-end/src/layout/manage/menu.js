import { Menu, Button } from 'antd';
import { menu } from "../../config";
import { useHistory, useLocation } from "react-router-dom";

const { SubMenu } = Menu;

const ManageMenu = (props) => {

  const history = useHistory();

  const location = useLocation();

  const onSelectHandler = ({ key }) => {
    history.push(key)
  }

  return (
    <div>
      <Menu
        // defaultSelectedKeys={[menu[0].submenu[0].key]}
        defaultOpenKeys={[].concat(location.pathname.indexOf("article") > -1 || location.pathname.indexOf("Article") > -1 ? "article" : "user")}
        selectedKeys={[].concat(location.pathname)}
        // openKeys={[].concat(location.pathname.indexOf("article") > -1 || location.pathname.indexOf("Article") > -1 ? "article" : "user")}
        mode="inline"
        theme="ligh"
        onSelect={onSelectHandler}
      >
        {
          menu.map(elem => {
            return <SubMenu key={elem.key} title={elem.title} icon={elem.icon}>
              {
                elem.submenu.map(item => {
                  return <Menu.Item key={item.key}>{item.title}</Menu.Item>
                })
              }
            </SubMenu>
          })
        }
      </Menu>
    </div>
  )
}
export default ManageMenu;