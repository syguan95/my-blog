import { useState, useEffect } from "react";
import { EyeOutlined } from "@ant-design/icons";
import style from "./articleList.module.scss";
import { message, Tag, Pagination } from "antd";
import { categoryColor, tagColor } from "../../../config";
import myAxios from "../../../utils/request";
import API from "../../../utils/api";
import moment from "moment";

const pageSize = 5;

const articleList = [{
  id: 1,
  title: "标题",
  content: "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
  view: 100,
  updatedAt: "2021-08-19",
  categorys: ["分类1", "分类2", "分类3"],
  tags: ["标签1", "标签2", "标签3"]
}, {
  id: 2,
  title: "标题",
  content: "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
  view: 100,
  updatedAt: "2021-08-19",
  categorys: ["分类1", "分类2", "分类3"],
  tags: ["标签1", "标签2", "标签3"]
}, {
  id: 3,
  title: "标题",
  content: "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
  view: 100,
  updatedAt: "2021-08-19",
  categorys: ["分类1", "分类2", "分类3"],
  tags: ["标签1", "标签2", "标签3"]
}, {
  id: 4,
  title: "标题",
  content: "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
  view: 100,
  updatedAt: "2021-08-19",
  categorys: ["分类1", "分类2", "分类3"],
  tags: ["标签1", "标签2", "标签3"]
}, {
  id: 5,
  title: "标题",
  content: "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
  view: 100,
  updatedAt: "2021-08-19",
  categorys: ["分类1", "分类2", "分类3"],
  tags: ["标签1", "标签2", "标签3"]
}, {
  id: 6,
  title: "标题",
  content: "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容",
  view: 100,
  updatedAt: "2021-08-19",
  categorys: ["分类1", "分类2", "分类3"],
  tags: ["标签1", "标签2", "标签3"]
}]

const ArticleList = (props) => {

  const [articleList, setArticleList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [articleCount, setArticleCount] = useState(1);

  useEffect(() => { //mark 翻页逻辑可以提取成自定义hook
    getArticleByPageNO(currentPage)
  }, [currentPage])

  useEffect(() => {
    setCurrentPage(1)
  }, [props.match.params.category])

  const onPageChange = (page) => {
    setCurrentPage(page)
  }

  const getArticleByPageNO = async (page) => {
    try {
      var query = {
        currentPage: page,
      }
      if (props.match.params.category && props.match.params.category !== "all") {
        query.category = props.match.params.category
      }
      var data = await myAxios.get(API.GET_ARTICLE_LIST, query);
      setArticleList([...data.articles]);
      setCurrentPage(data.currentPage)
      setArticleCount(data.totalElements);
    } catch (error) {
      message.error(error.message)
    }
  }

  const onArticleItemClicked = (articleId) => {
    props.history.push(`/blog/article/${articleId}`);
  }

  return (
    <div className={style.articleListWrapper}>
      {
        articleList.length > 0 && <>
          <div className={style.articleList}>
            {
              articleList.map((article, index) => {
                return (
                  <div className={style.articleItem} key={article.id} onClick={() => onArticleItemClicked(article.id)}>
                    <div className={style.articleInfo}>
                      <div className={style.articleTime}>{moment(article.updatedAt).format("YYYY-MM-DD")}</div>
                      <div className={style.articleCategory}>
                        {
                          article.categorys.split(",").map((category, index) => {
                            return <Tag color={categoryColor} key={index}>{category}</Tag>
                          })
                        }
                      </div>
                      <div className={style.articleTag}>
                        {
                          article.tags.split(",").map((tag, index) => {
                            return <Tag color={tagColor[index]} key={index}>{tag}</Tag>
                          })
                        }
                      </div>
                    </div>
                    <div className={style.articleTitle}>{article.title}</div>
                    <div className={style.articleContent}>{article.content}</div>
                    <div className={style.articleFooter}>
                      <div className={style.articleView}>
                        <EyeOutlined /><span>{article.viewCount}</span>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
          <div className={style.pagination}>
            <Pagination current={currentPage} pageSize={pageSize} total={articleCount} onChange={onPageChange} />
          </div>
        </>
      }
    </div>
  )
}

export default ArticleList