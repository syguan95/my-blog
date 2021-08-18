import { useState, useEffect } from "react";
import { message, Table, Switch } from "antd";
import myAxios from "../../../utils/request";
import API from "../../../utils/api";

const pageSize = 5;

const UserList = (props) => {

  const [userList, setUserList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [userCount, setUserCount] = useState(1);

  useEffect(() => {
    getUserByPageNO(currentPage)
  }, [currentPage])

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const getUserByPageNO = async (page) => {
    try {
      var data = await myAxios.get(API.GET_USER_LIST, { currentPage: page });
      setUserList([...data.users]);
      setCurrentPage(data.currentPage)
      setUserCount(data.totalElements);
    } catch (error) {
      message.error(error.message)
    }
  }

  const onChangeUserAvailable = async (id, checked) => {
    try {
      await myAxios.put(API.UPDATE_USER_AVAILABLE, {
        userId: id,
        available: !checked,
      })
      message.success(checked ? "已禁言该用户" : "已取消该用户禁言");
      getUserByPageNO(currentPage)
    } catch (error) {
      message.error(error.message)
    }
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      key: 'index',
      render: text => <div>{text}</div>
    }, {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      render: text => <div>{text}</div>
    }, {
      title: '是否禁言',
      dataIndex: 'available',
      key: 'available',
      render: (text, record) => <Switch checked={text === 1 ? false : true} onChange={(checked) => onChangeUserAvailable(record.key, checked)} />
    },
  ];

  const tableData = userList.map((elem, index) => {
    return {
      key: elem.id,
      index: pageSize * (currentPage - 1) + index + 1,
      username: elem.username,
      available: elem.available,
    }
  });


  return (
    <div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: userCount,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}

export default UserList