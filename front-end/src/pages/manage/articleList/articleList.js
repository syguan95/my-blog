import { useState, useEffect } from "react";
import { Table, Space, Button, message, Popconfirm } from 'antd';
import moment from "moment";
import myAxios from "../../../utils/request";
import API from "../../../utils/api";
import style from "./articleList.module.scss";

const pageSize = 5;


const ArticleList = (props) => {

  const [articleList, setArticleList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articleCount, setArticleCount] = useState(1);

  useEffect(() => {
    getArticleByPageNO(currentPage)
  }, [currentPage])

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const getArticleByPageNO = async (page) => {
    try {
      var data = await myAxios.get(API.GET_ARTICLE_LIST, { currentPage: page });
      setArticleList([...data.articles]);
      setCurrentPage(data.currentPage)
      setArticleCount(data.totalElements);
    } catch (error) {
      message.error(error.message)
    }
  }

  const onCreateArticle = () => {
    props.history.push("/manage/addArticle");
  }

  const onEditBtnClicked = (articleId) => {
    props.history.push({
      pathname: "/manage/addArticle",
      state: {
        articleId: articleId,
      }
    });
  }

  const onDeleteArtilce = async (articleId) => {
    try {
      await myAxios.delete(API.DELETE_ARTICLE, { articleId: articleId });
      message.success("删除成功")
      getArticleByPageNO(articleList.length > 1 ? currentPage : currentPage - 1)
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
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      render: text => <div>{text}</div>
    }, {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: text => <div>{moment(text).format("YYYY-MM-DD")}</div>
    }, {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record) => <Space size="middle">
        <Button onClick={() => onEditBtnClicked(record.key)}>编辑</Button>
        <Popconfirm title="是否删除该文章?" onConfirm={() => onDeleteArtilce(record.key)} okText="确定" cancelText="取消" >
          <Button>删除</Button>
        </Popconfirm>
      </Space>
    },
  ];

  const tableData = articleList.map((elem, index) => {
    return {
      key: elem.id,
      index: pageSize * (currentPage - 1) + index + 1,
      title: elem.title,
      updateTime: elem.updatedAt,
    }
  });

  return (
    <div>
      <div className={style.btnContainer}>
        <Button type="primary" onClick={onCreateArticle}>新增文章</Button>
      </div>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: articleCount,
          onChange: onPageChange,
        }}
      />
    </div>
  )
}

export default ArticleList;